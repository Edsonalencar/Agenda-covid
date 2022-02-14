<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { userState } from '../state-store'

  //Components Plugins
  import { Dialog, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import VPagination from '@hennge/vue3-pagination'
  import '@hennge/vue3-pagination/dist/vue3-pagination.css'

  //My Components
  import SideBar from '../components/SideBar.vue'
  import {
    AgendamentosDisponiveis,
    GAtendimentos,
  } from '../providers/types/types.CovidAPI'
  import AgendamentosDisponiveisVue from '../components/AgendamentosDisponiveis.vue'
  import CovidAPI from '../providers/CovidAPI.provider'

  const store = userState()

  const GrupoAtendimentoList = ref<GAtendimentos>([{}])
  const AllAgendamentosDisponiveis = ref<AgendamentosDisponiveis>([{}])
  const municipioAtendimento = ref<(string | undefined)[]>([])
  const AgendamentosMunicipio = ref<AgendamentosDisponiveis>([{}])
  const AgendamentosPagination = ref<AgendamentosDisponiveis>([{}])

  const page = ref(1)
  const totalPage = ref(0)
  const ExibeLocalHorarioExames = ref(false)
  const notificationCadastro = ref(false)

  const user_id = store.user.id
  const campanha = ref(1)
  const municipio = ref('Natal')
  const g_atendimento = ref(1)
  const tipo_exame = ref('')
  const horario = ref('')
  const local = ref('')
  const data_user = ref('')

  const data_agendamento = ref('')

  const setLocalHora = (horaAgendamento: string, localAgendamento: string, dataAgendamento: string) => {
    horario.value = horaAgendamento
    local.value = localAgendamento
    data_agendamento.value = dataAgendamento

    console.log(`${local.value} - ${horario.value}`)
  }

  const Notification = () => {
    notificationCadastro.value = true
    setTimeout(() => {
      notificationCadastro.value = false
    }, 1500)
  }

  const agendamentoRegister = () => {
    const agendamento_data = data_user.value.split('-')
    const dia = agendamento_data[2]
    const mes = agendamento_data[1]
    const ano = agendamento_data[0]
    const data_agendamento_user = `${mes}-${dia}-${ano}`

    const hora_agendamento = horario.value.split('h')

    const dadosAgendamento = {
      usuario_id: user_id,
      campanha_id: campanha.value,
      grupo_atendimento_id: g_atendimento.value,
      municipio: municipio.value,
      localizacao: local.value,
      data: data_agendamento.value,
      hora: hora_agendamento[0],
      status: 'AGENDADO',
      tipo_exame: tipo_exame.value,
    }

    CovidAPI.RegisterAgendamento(dadosAgendamento).then(() => {
      Notification()
    }
    ).catch((err) => {
      console.log(err.response)
    })
  }

  const HandleTipoExame = (tipo: string) => {
    tipo_exame.value = tipo
  }

  const HandleGrupoAtendimentos = async () => {
    await CovidAPI.GAtendimentos()
      .then((res) => {
        GrupoAtendimentoList.value = res.data
      })
      .catch((err) =>
        console.log(`Error inesperado ao acessar o servidor: ${err}`)
      )
  }

  const HandleAgendamentos = async () => {
    await CovidAPI.AgenDisponibilidadeAll()
      .then((res) => {
        AllAgendamentosDisponiveis.value = res.data
      })
      .catch((err) =>
        console.log(`Error inesperado ao acessar o servidor: ${err}`)
      )

    municipioAtendimento.value = [
      ...new Set(
        AllAgendamentosDisponiveis.value.map((item) => item.municipio)
      ),
    ]
  }

  const HandleAgendamentosMunicipio = async (municipio: string) => {
    await CovidAPI.AgenDisponibilidadeMunicipio(municipio)
      .then((res) => {
        AgendamentosMunicipio.value = res.data
      })
      .catch((err) => console.log(`Error ao acessar o servidor: ${err}`))

    const totalAgendamentos = ref(0)
    AgendamentosMunicipio.value.map(() => totalAgendamentos.value++)
    const pagination = totalAgendamentos.value / 3
    console.log(totalAgendamentos.value)
    console.log(pagination)
    totalPage.value = Math.ceil(pagination)
    ExibeLocalHorarioExames.value = true

    HandleAgendamentosFilterPagination(municipio, page.value)
  }

  const HandleAgendamentosFilterPagination = async (
    municipio: string,
    page: number
  ) => {
    try {
      await CovidAPI.AgenDisponibilidadeMunicipioPagination(
        municipio,
        page
      ).then((res) => {
        AgendamentosPagination.value = res.data
      })
    } catch (error) {
      console.log(`Error ao acessar o servidor: ${error}`)
    }
  }

  onMounted(async () => {
    HandleGrupoAtendimentos()
    HandleAgendamentos()
  })
</script>

<template>
  <div class="grid h-screen w-screen grid-cols-12 overflow-hidden bg-white">
    <!-- Grid 1 -->
    <div class="col-span-2 h-full w-full">
      <SideBar :agendar="true" />
    </div>

    <!-- Grid 2-->
    <div
      class="col-span-10 flex h-full w-full flex-col overflow-auto bg-[#f1f5f9] px-6 sm:px-10 xl:px-14"
    >
      <div class="my-4 block h-12 sm:hidden lg:block">
        <h1 class="text-2xl font-bold text-blue">Agendar</h1>
      </div>
      <div
        class="mt-4 flex flex-col items-center justify-start lg:mt-0 lg:flex-row lg:items-start lg:justify-between"
      >
        <div
          class="my-4 hidden h-12 w-[28rem] sm:inline-block lg:hidden"
          id="title-agendar"
        >
          <h1 class="text-2xl font-bold text-blue">Agendar</h1>
        </div>

        <!-- Filtros -->
        <div
          class="filter-controler max-h-[29rem] max-w-[35rem] gap-3 rounded-lg bg-white p-4"
        >
          <div class="inline-block w-full text-blue">
            <label for="email" class="text-md">Campanha</label>
            <select
              class="mt-1 block h-8 w-full cursor-pointer appearance-none rounded border border-gray-400 bg-white px-2 py-1 pr-8 leading-tight shadow hover:shadow-sm focus:outline-none"
              v-model="campanha"
            >
              <option :value="1">Covid 19</option>
            </select>
          </div>

          <div
            class="inline-block w-full text-blue lg:my-3"
            id="filterMunicipio"
          >
            <label for="email" class="text-md">Município</label>
            <select
              class="mt-1 block h-8 w-full cursor-pointer appearance-none rounded border border-gray-400 bg-white px-2 py-1 pr-8 leading-tight shadow hover:shadow-sm focus:outline-none"
              v-model="municipio"
            >
              <option
                v-for="municipio in municipioAtendimento"
                :key="municipio"
                :value="municipio"
              >
                {{ municipio }}
              </option>
            </select>
          </div>

          <div class="inline-block w-full text-blue">
            <label for="email" class="text-md">Grupo de atendimento</label>
            <select
              class="mt-1 block h-8 w-full cursor-pointer appearance-none rounded border border-gray-400 bg-white px-2 py-1 pr-8 leading-tight shadow hover:shadow-sm focus:outline-none"
              v-model="g_atendimento"
            >
              <option
                v-for="grupo in GrupoAtendimentoList"
                :key="grupo.id"
                :value="grupo.id"
              >
                {{ grupo.nome }}
              </option>
            </select>
          </div>

          <div class="inline-block w-full text-blue lg:my-3" id="filterData">
            <label for="date-response" class="text-md">Data</label>
            <input
              id="date-response"
              name="date-response"
              type="date"
              required
              class="mt-1 block h-8 w-full cursor-pointer appearance-none rounded border border-gray-400 bg-white px-2 py-1 pr-8 leading-tight shadow hover:shadow-sm focus:outline-none"
              v-model="data_user"
            />
          </div>

          <div class="col-span-2 mb-5 inline-block w-full text-blue">
            <label for="email" class="text-md">Tipo de exame</label>
            <div class="mt-2 flex w-full lg:mt-0 lg:inline-block">
              <div class="form-check lg:mt-1">
                <input
                  class="form-check-input checked:bg-blue-600 checked:border-blue-600 float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 focus:outline-none"
                  type="checkbox"
                  id="rt-pcrCheckDefault"
                  @input="HandleTipoExame('RT-PCR')"
                />
                <label
                  class="form-check-label inline-block text-blue"
                  for="rt-pcrCheckDefault"
                >
                  RT-PCR
                </label>
              </div>

              <div class="form-check ml-3 lg:ml-0">
                <input
                  class="form-check-input checked:bg-blue-600 checked:border-blue-600 float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 focus:outline-none"
                  type="checkbox"
                  id="antigenoCheckChecked"
                  @input="HandleTipoExame('Antigeno')"
                />
                <label
                  class="form-check-label inline-block text-blue"
                  for="antigenoCheckChecked"
                >
                  Antigeno
                </label>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group hover:bg-Pink-400 text-md relative flex w-full justify-center rounded-md border border-transparent bg-pink py-2 px-4 font-medium text-white hover:cursor-pointer hover:bg-light-pink focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2"
              @click="HandleAgendamentosMunicipio(municipio)"
            >
              Procurar
            </button>
          </div>
        </div>

        <div v-if="ExibeLocalHorarioExames">
          <fa
            icon="angle-right"
            class="hidden h-6 w-6 p-5 text-gray-700 lg:mt-44 lg:block"
          />
          <fa
            icon="angle-down"
            class="mt-1 mb-3 block h-6 w-6 p-5 text-gray-700 lg:hidden"
          />
        </div>

        <div
          class="mb-12 max-h-full max-w-[43rem] rounded-lg bg-white"
          id="agendamentos-disponiveis"
          v-if="ExibeLocalHorarioExames"
        >
          <h2 class="text-2xl font-bold text-blue">
            Locais de exame
          </h2>
          <div class="mt-5">
            <div
              v-for="agendamento in AgendamentosPagination"
              :key="agendamento.id"
            >
              <AgendamentosDisponiveisVue
                :agendamentos="agendamento.vagas"
                :local="agendamento.localizacao"
                :data="agendamento.data"
                :setLocalHora="setLocalHora"
              />
            </div>
            <div class="flex items-center flex-col justify-start sm:flex-row sm:justify-between">
              <div class="mb-5 block sm:hidden">
                <VPagination
                  v-model="page"
                  :pages="totalPage"
                  :range-size="1"
                  active-color="#DCEDFF"
                  @update:modelValue="HandleAgendamentosMunicipio(municipio)"
                />
              </div>
              <div class="flex justify-between">
                <button
                  type="submit"
                  class="group hover:bg-Pink-400 text-md relative flex justify-center rounded-md border border-transparent bg-pink py-2 px-4 font-medium text-white hover:cursor-pointer hover:bg-light-pink focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2"
                  @click="agendamentoRegister"
                >
                  Confirmar
                </button>
              </div>
              <div class="hidden sm:block">
                <VPagination
                  v-model="page"
                  :pages="totalPage"
                  :range-size="1"
                  active-color="#DCEDFF"
                  @update:modelValue="HandleAgendamentosMunicipio(municipio)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <TransitionRoot
        as="template"
        :show="notificationCadastro"
        class="transition"
      >
        <Dialog
          as="div"
          class="fixed inset-0 overflow-hidden"
          @close="notificationCadastro = false"
        >
          <div class="overflow-hidden">
            <div class="fixed top-0 right-96 flex max-w-full pl-10">
              <TransitionChild
                as="template"
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enter-from="-translate-y-full"
                enter-to="translate-y-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leave-from="translate-y-0"
                leave-to="-translate-y-full"
              >
                <div class="h-16 w-60">
                  <div
                    class="flex h-full items-center rounded-lg bg-white shadow-xl"
                  >
                    <fa icon="check" class="mx-5 h-8 w-8 text-green" />
                    <strong
                      class="inline-block text-base font-medium text-gray-700"
                    >
                      Agendamento Feito com Sucesso
                    </strong>
                  </div>
                </div>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @media (min-width: 163px) {
    .filter-controler {
      display: block;

      #filterMunicipio {
        margin-top: 1rem;
        margin-bottom: 1rem;
      }

      #filterData {
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
    }
  }

  @media (min-width: 563px) {
    .filter-controler {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));

      #filterMunicipio {
        margin: 0;
      }

      #filterData {
        margin: 0;
      }
    }
  }

  @media (min-width: 649px) {
    .filter-controler {
      width: 27rem;
    }
  }

  @media (min-width: 716px) {
    .filter-controler {
      width: 35rem;
    }

    //Title page size controler
    #title-agendar {
      width: 35rem;
    }
  }

  @media (min-width: 768px) {
    .filter-controler {
      width: 35rem;
    }
  }

  @media (min-width: 1024px) {
    .filter-controler {
      display: block;
      max-width: 16rem;
      max-height: 29rem;

      #filterMunicipio {
        margin-top: 0.6rem;
        margin-bottom: 0.6rem;
      }

      #filterData {
        margin-top: 0.6rem;
        margin-bottom: 0.6rem;
      }
    }
  }

  @media (min-width: 106px) {
    #agendamentos-disponiveis {
      padding: 1.25rem 1.45rem;
    }
  }

  @media (min-width: 406px) {
    #agendamentos-disponiveis {
      padding: 1.25rem 2rem;
    }
  }
</style>
