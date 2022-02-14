<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue'
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import { BarChart, PieChart } from 'vue-chart-3'

  import { userState } from '../state-store'
  import SectionTransparencia from '../components/SectionTransparencia.vue'
  import CovidAPI from '../providers/CovidAPI.provider'
  import {
    TypeTransparencia,
    TypeAgendamentos,
  } from 'src/providers/types/types.CovidAPI'

  const open = ref(false)
  const filterOn = ref(false)
  const notificationFilter = ref(false)
  const doses = ref<TypeTransparencia>({})
  const agendamentosData = ref<TypeAgendamentos>([{}])
  const checkpoint = userState().checkpoint
  const textFilter = ref('Filtrar')

  const municipio = ref('Natal')
  const search = ref('')

  const ActiveFilter = () => {
    if (!filterOn.value) {
      Filter('Natal')
      open.value = true
      filterOn.value = true
      textFilter.value = 'Remover'
    } else {
      open.value = false
      filterOn.value = false
      textFilter.value = 'Filtrar'
    }
  }

  const Notification = () => {
    notificationFilter.value = true
    setTimeout(() => {
      notificationFilter.value = false
    }, 1500)
  }

  const FilterSearch = async () => {
    const agendamentosLocalizacao = await CovidAPI.AgendamentosLocalizacao(
      search.value
    )
      .then((res) => {
        if (res.data) agendamentosData.value = res.data
      })
      .catch((err) => console.log(`Error ao acessar o servidor: ${err}`))

    FilterGraficosMount()
    search.value = ''
  }

  const Filter = async (selectMunicipio: string) => {
    municipio.value = selectMunicipio

    const agendamentosPorMunicipio = await CovidAPI.AgendamentosMunicipio(
      selectMunicipio
    )
      .then((res) => {
        if (res.data) {
          agendamentosData.value = res.data
        }
      })
      .catch((err) => console.log(`Error ao acessar o servidor: ${err}`))

    FilterGraficosMount()
  }

  const FilterGraficosMount = () => {
    if (!agendamentosData.value[0]) Notification()

    const VacinaRTPC = ref(0)
    const VacinaAntigeno = ref(0)
    const AgendamentosMaioresde75 = ref(0)
    const AgendamentosMaioresde18 = ref(0)

    agendamentosData.value.map((item) => {
      if (item.tipo_exame == 'ANTÍGENO') VacinaAntigeno.value++
      if (item.tipo_exame == 'RT-PC') VacinaRTPC.value++
      if (item.grupo_atendimento_id) {
        if (item.grupo_atendimento_id == 1) AgendamentosMaioresde75.value++
        if (item.grupo_atendimento_id > 1 && item.grupo_atendimento_id < 6)
          AgendamentosMaioresde18.value++
      }
    })

    tipoExameMunicipio.value = [VacinaRTPC.value, VacinaAntigeno.value]
    GAtendimentoMunicipio.value = [
      AgendamentosMaioresde75.value,
      AgendamentosMaioresde18.value,
    ]

    const data = new Date()
    const dia = data.getDate()
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const ano = data.getFullYear()

    const hoje = String(dia).padStart(2, '0')
    const ontem = String(dia - 1).padStart(2, '0')
    const antesOntem = String(dia - 2).padStart(2, '0')

    const dataHoje = `${mes}-${hoje}-${ano}`
    const dataOntem = `${mes}-${ontem}-${ano}`
    const dataAntesOntem = `${mes}-${antesOntem}-${ano}`

    const agendamentosHoje = ref(0)
    const agendamentosOtem = ref(0)
    const agendamentosAntesOtem = ref(0)

    agendamentosData.value.map((item) => {
      if (item.data == dataHoje) agendamentosHoje.value++
      if (item.data == dataOntem) agendamentosOtem.value++
      if (item.data == dataAntesOntem) agendamentosAntesOtem.value++
    })

    AgendamentosMunicipio.value = [
      agendamentosAntesOtem.value,
      agendamentosOtem.value,
      agendamentosHoje.value,
    ]
  }

  // GRAFICOS TRANSPARENCIA PADRÃO
  //Grafico - Doses Recebidas
  const dosesRecebidasValues = ref([50, 50])

  const dataDosesRecebidas = computed(() => ({
    labels: ['Pfizer', 'CoronaVAC'],
    datasets: [
      {
        label: 'Doses Recebidas',
        data: dosesRecebidasValues.value,
        backgroundColor: ['RGB(58, 12, 163)', 'RGB(247, 37, 133)'],
        hoverOffset: 4,
      },
    ],
  }))

  const optionsDosesRecebidas = ref({
    plugins: {
      responsive: true,
      title: {
        display: true,
        text: 'Doses Recebidas',
      },
    },
  })

  // Doses Aplicadas
  const dosesAplicadasValues = ref([
    [1, 2, 3], // Dados D1
    [10, 15, 13], // Dados D2
    [10, 15, 13], // Dados D3
  ])

  const dataDosesAplicadas = computed(() => ({
    labels: ['5 a 11', '12 a 17 Anos', '+18 Anos'],
    datasets: [
      {
        label: 'D1',
        data: dosesAplicadasValues.value[0],
        backgroundColor: '#7e1fb4',
      },
      {
        label: 'D2',
        data: dosesAplicadasValues.value[1],
        backgroundColor: '#0ed1a5',
      },
      {
        label: 'D3',
        data: dosesAplicadasValues.value[2],
        backgroundColor: '#1f78b4',
      },
    ],
  }))

  const optionsDosesAplicadas = ref({
    plugins: {
      responsive: true,
      title: {
        display: true,
        text: 'Doses Aplicadas',
      },
    },
  })

  // Vacinados Geral
  const dosesVacinadosValues = ref([10, 15, 13])

  const dataVacinados = computed(() => ({
    labels: ['D1', 'D2', 'D3'],
    datasets: [
      {
        label: 'Aplicadas',
        data: dosesVacinadosValues.value,
        backgroundColor: ['#7e1fb4', '#0ed1a5', '#1f78b4'],
      },
    ],
  }))

  const optionsVacinados = ref({
    plugins: {
      responsive: true,
      title: {
        display: true,
        text: 'Total de Vacinados',
        fontSize: 20,
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    },
  })

  //GRAFICOS TRANSPARENCIA FILTROS
  //Tipo de Exame - Municipio
  const tipoExameMunicipio = ref([50, 50])

  const datatipoExameMunicipio = computed(() => ({
    labels: ['RT-PC', 'Antígeno'],
    datasets: [
      {
        data: tipoExameMunicipio.value,
        backgroundColor: ['RGB(247, 37, 133)', 'RGB(58, 12, 163)'],
        hoverOffset: 4,
      },
    ],
  }))

  const optionstipoExameMunicipio = ref({
    plugins: {
      responsive: true,
    },
  })

  //Grupo de Atendimento - Municipio
  const GAtendimentoMunicipio = ref([50, 50])

  const dataGAtendimentoMunicipio = computed(() => ({
    labels: ['Acima de 75 anos', '+18'],
    datasets: [
      {
        data: GAtendimentoMunicipio.value,
        backgroundColor: ['RGB(247, 37, 133)', 'RGB(58, 12, 163)'],
        hoverOffset: 4,
      },
    ],
  }))

  const optionsGAtendimentoMunicipio = ref({
    plugins: {
      responsive: true,
    },
  })

  // Agendamentos - Municipio
  const AgendamentosMunicipio = ref([10, 15, 13])

  const dataAgendamentosMunicipio = computed(() => ({
    labels: ['Antes de Ontem', 'Ontem', 'Hoje'],
    datasets: [
      {
        label: 'Vacinados',
        data: AgendamentosMunicipio.value,
        backgroundColor: ['#7e1fb4', '#0ed1a5', '#1f78b4'],
      },
    ],
  }))

  const optionsAgendamentosMunicipio = ref({
    plugins: {
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    },
  })

  onMounted(async () => {
    await CovidAPI.Transparencia()
      .then((res) => {
        if (res.data) {
          doses.value = res.data
        }
      })
      .catch((err) =>
        console.error(
          `Ocorreu um erro ao acessar os dados de transparencia: ${err}`
        )
      )

    const coronaVac = doses.value.doses?.recebidas.coronavac.split('%')
    const pfizer = doses.value.doses?.recebidas.pfizer.split('%')

    if (coronaVac && pfizer) {
      dosesRecebidasValues.value = [Number(coronaVac[0]), Number(pfizer[0])]
    }

    const d1 = doses.value.doses?.aplicadas.map((item) => item.doses.d1)
    const d2 = doses.value.doses?.aplicadas.map((item) => item.doses.d2)
    const d3 = doses.value.doses?.aplicadas.map((item) => item.doses.d3)

    if (d1 && d2 && d3) {
      dosesAplicadasValues.value = [d1, d2, d3]
    }

    const VacinadosD1 = ref(0)
    const VacinadosD2 = ref(0)
    const VacinadosD3 = ref(0)

    doses.value.vacinacao?.map((item) => {
      VacinadosD1.value += item.doses.d1
      VacinadosD2.value += item.doses.d2
      VacinadosD3.value += item.doses.d3
    })

    dosesVacinadosValues.value = [
      VacinadosD1.value,
      VacinadosD2.value,
      VacinadosD3.value,
    ]
  })
</script>

<template>
  <div
    class="h-screen w-screen overflow-hidden bg-white lg:grid lg:grid-cols-12"
  >
    <!-- Grid 1 -->
    <div class="relative col-span-3 hidden h-full w-full lg:block">
      <img
        src="../assets/img-login2.jpg"
        alt="Seção de agendamento"
        class="h-full w-full object-cover object-center"
      />
      <div class="absolute top-0 h-full w-full bg-wallpapper-blue">
        <SectionTransparencia parent="/transparencia" />
      </div>
    </div>

    <!-- Grid 2-->
    <div
      class="col-span-12 flex h-full w-full flex-col overflow-y-scroll bg-white lg:col-span-9"
    >
      <div class="my-2 flex h-12 w-full items-center justify-between px-5">
        <h1 class="ml-8 text-2xl font-bold text-blue">Transparência</h1>
        <div class="hidden sm:flex">
          <a
            @click="ActiveFilter"
            class="rounded-lg bg-blue py-1 px-8 text-base font-medium text-white hover:cursor-pointer hover:opacity-80 hover:drop-shadow-xl focus:ring-2 focus:ring-blue focus:ring-offset-2"
          >
            {{ textFilter }}
          </a>
          <router-link
            :to="checkpoint"
            class="ml-3 rounded-lg bg-blue py-1 px-8 text-base font-medium text-white hover:cursor-pointer hover:opacity-80 hover:drop-shadow-xl focus:ring-2 focus:ring-blue focus:ring-offset-2"
          >
            Voltar
          </router-link>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-4 px-6 md:px-10 md:grid-cols-2 lg:grid-cols-3">
        <div
          :class="[
            filterOn ? 'h-60' : 'h-56',
            'border-gray max-w-72 mt-3 flex flex-col items-center justify-start rounded-lg border-t bg-white px-4 shadow-xl',
          ]"
        >
          <PieChart
            :chart-data="dataDosesRecebidas"
            :options="optionsDosesRecebidas"
            css-classes="max-h-[13.5rem] w-full inline-block"
            :class="[filterOn ? 'hidden' : 'block']"
          />
          <div
            :class="[
              filterOn ? 'block' : 'hidden',
              'text-center text-sm font-semibold text-gray-600',
            ]"
          >
            <strong class="mt-1 font-semibold">
              Agendamentos em {{ municipio }}
            </strong>
            <p>Tipo de exame</p>
          </div>
          <PieChart
            :chart-data="datatipoExameMunicipio"
            :options="optionstipoExameMunicipio"
            css-classes="max-h-48 w-full inline-block"
            :class="[filterOn ? 'block' : 'hidden']"
          />
        </div>

        <div
          :class="[
            filterOn ? 'h-60' : 'h-56',
            'border-gray max-w-72 mt-3 flex flex-col items-center justify-start rounded-lg border-t bg-white px-4 shadow-xl',
          ]"
        >
          <BarChart
            :chart-data="dataDosesAplicadas"
            :options="optionsDosesAplicadas"
            css-classes="max-h-[14rem] w-full inline-block"
            :class="[filterOn ? 'hidden' : 'block']"
          />
          <div
            :class="[
              filterOn ? 'block' : 'hidden',
              'text-center text-sm font-semibold text-gray-600',
            ]"
          >
            <strong class="mt-1 font-semibold">
              Agendamentos em {{ municipio }}
            </strong>
            <p>Grupos de atendimento</p>
          </div>
          <PieChart
            :chart-data="dataGAtendimentoMunicipio"
            :options="optionsGAtendimentoMunicipio"
            css-classes="max-h-48 w-full inline-block"
            :class="[filterOn ? 'block' : 'hidden']"
          />
        </div>

        <div v-if="open" class="max-w-72 mt-3 h-48 hidden lg:block"></div>

        <div
          :class="[
            filterOn ? 'h-60' : 'h-56',
            'border-gray max-w-72 mt-3 flex flex-col items-center justify-start rounded-lg border-t bg-white px-4 shadow-xl',
          ]"
        >
          <BarChart
            :chart-data="dataVacinados"
            :options="optionsVacinados"
            css-classes="max-h-[13.5rem] w-full inline-block"
            :class="[filterOn ? 'hidden' : 'block']"
          />
          <div
            :class="[
              filterOn ? 'block' : 'hidden',
              'text-center text-sm font-semibold text-gray-600',
            ]"
          >
            <strong class="mt-1 font-semibold">
              Agendamentos em {{ municipio }}
            </strong>
            <p>Ultimos 3 dias</p>
          </div>
          <BarChart
            :chart-data="dataAgendamentosMunicipio"
            :options="optionsAgendamentosMunicipio"
            css-classes="max-h-48 w-full inline-block"
            :class="[filterOn ? 'block' : 'hidden']"
          />
        </div>
          <div class="mt-10 mb-4 flex h-12 w-full items-center justify-center px-5 sm:hidden">
            <div>
              <a
                @click="ActiveFilter"
                class="rounded-lg bg-blue py-3 px-8 text-base font-medium text-white hover:cursor-pointer hover:opacity-80 hover:drop-shadow-xl focus:ring-2 focus:ring-blue focus:ring-offset-2"
              >
                {{ textFilter }}
              </a>
              <router-link
                :to="checkpoint"
                class="ml-3 rounded-lg bg-blue py-3 px-8 text-base font-medium text-white hover:cursor-pointer hover:opacity-80 hover:drop-shadow-xl focus:ring-2 focus:ring-blue focus:ring-offset-2"
              >
                Voltar
              </router-link>
            </div>
          </div>
      </div>
      <TransitionRoot as="template" :show="open" class="transition">
        <Dialog
          as="div"
          class="fixed inset-0 overflow-hidden"
          @close="open = false"
        >
          <div class="overflow-hidden">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-500"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-500"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <DialogOverlay class="absolute inset-0 transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as="template"
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
              >
                <div class="relative h-full w-72">
                  <div>
                    <fa
                      icon="xmark"
                      class="absolute top-3 right-3 cursor-pointer text-xl text-white"
                      @click="open = false"
                    />
                  </div>
                  <div class="flex h-full flex-col bg-blue py-6 px-8 shadow-xl">
                    <DialogTitle class="text-xl font-medium text-white">
                      Filtros
                    </DialogTitle>
                    <div class="mt-4">
                      <input
                        id="filter"
                        name="filter"
                        type="text"
                        placeholder="Pesquise Aqui"
                        class="text-md relative block h-10 w-full appearance-none rounded-md border border-gray-300 px-2 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue focus:outline-none focus:ring-blue"
                        v-model="search"
                        @keyup.enter="FilterSearch"
                      />
                    </div>
                    <div
                      class="my-8 flex h-10 w-full items-center justify-start rounded-md bg-pink"
                    >
                      <strong class="p-4 text-base font-medium text-white"
                        >Municipios</strong
                      >
                    </div>
                    <div class="flex flex-col justify-start gap-2">
                      <div>
                        <input
                          type="radio"
                          class="form-radio float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top text-pink transition duration-200 checked:border-pink checked:bg-pink focus:outline-none"
                          name="municipio"
                          value="Natal"
                          v-model="municipio"
                          @input="Filter('Natal')"
                        />
                        <label class="form-check-label inline-block text-white">
                          Natal
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          class="form-radio float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top text-pink transition duration-200 checked:border-pink checked:bg-pink focus:outline-none"
                          name="municipio"
                          value="Parnamirim"
                          @input="Filter('Parnamirim')"
                        />
                        <label class="form-check-label inline-block text-white">
                          Parnamirim
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          class="form-radio float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top text-pink transition duration-200 checked:border-pink checked:bg-pink focus:outline-none"
                          name="municipio"
                          value="Mossoró"
                          @input="Filter('Mossoró')"
                        />
                        <label class="form-check-label inline-block text-white">
                          Mossoró
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          class="form-radio float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top text-pink transition duration-200 checked:border-pink checked:bg-pink focus:outline-none"
                          name="municipio"
                          value="São Gonçalo"
                          @input="Filter('São Gonçalo')"
                        />
                        <label class="form-check-label inline-block text-white">
                          São Gonçalo
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          class="form-radio float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top text-pink transition duration-200 checked:border-pink checked:bg-pink focus:outline-none"
                          name="municipio"
                          value="Acari"
                          @input="Filter('Acari')"
                        />
                        <label class="form-check-label inline-block text-white">
                          Acari
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          class="form-radio float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top text-pink transition duration-200 checked:border-pink checked:bg-pink focus:outline-none"
                          name="municipio"
                          value="Caicó"
                          @input="Filter('Caicó')"
                        />
                        <label class="form-check-label inline-block text-white">
                          Caicó
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

      <TransitionRoot
        as="template"
        :show="notificationFilter"
        class="transition"
      >
        <Dialog
          as="div"
          class="fixed inset-0 overflow-hidden"
          @close="notificationFilter = false"
        >
          <div class="overflow-hidden">
            <div class="fixed top-0 right-16 sm:right-96 flex max-w-full pl-10">
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
                    <fa icon="bell" class="mx-5 h-8 w-8 text-red" />
                    <strong
                      class="inline-block text-base font-medium text-gray-700"
                    >
                      Nenhum Resultado Encontrado
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

<style lang="scss" scoped></style>
