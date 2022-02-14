<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  import VPagination from '@hennge/vue3-pagination'
  import '@hennge/vue3-pagination/dist/vue3-pagination.css'

  import SideBar from '../components/SideBar.vue'
  import CardAgendamentoVue from '../components/CardAgendamento.vue'
  import CovidAPI from '../providers/CovidAPI.provider'
  import { TypeAgendamentos } from 'src/providers/types/types.CovidAPI'

  const allagendamentos = ref<TypeAgendamentos>([{}])
  const allAgendamentosFilter = ref<TypeAgendamentos>([{}])
  const agendamentosPagination = ref<TypeAgendamentos>([{}])

  const locaisAtendimento = ref<(string | undefined)[]>([])
  const page = ref(1)
  const totalpage = ref(1)

  const filterAgendamentos = ref('Local de Exame')
  const textFilter = ref('Filtrar')
  const filterSelect = ref(false)

  const FatchAllAgendamentos = async () => {
    await CovidAPI.Agendamentos()
      .then((res) => {
        if (res.data) {
          allagendamentos.value = res.data
        }
      })
      .catch((err) => {
        console.error(`Ocorreu um erro inesperado: ${err}`)
      })

    locaisAtendimento.value = [
      ...new Set(allagendamentos.value.map((item) => item.localizacao)),
    ]

    const totalAgendamentos = ref(0)
    allagendamentos.value.map(() => totalAgendamentos.value++)

    const pagination = totalAgendamentos.value / 3

    totalpage.value = Math.ceil(pagination)

    FatchAgendamentosPagination(page.value)
  }

  const FatchAgendamentosPagination = async (page: number) => {
    await CovidAPI.AgendamentosPagination(page)
      .then((res) => {
        agendamentosPagination.value = res.data
      })
      .catch((err) => {
        console.error(`Ocorreu um erro inesperado: ${err}`)
      })
  }

  const FatchAgendamentosFilter = async (localFilter: string) => {
      await CovidAPI.AgendamentosLocalizacao(localFilter)
        .then((res) => {
          allAgendamentosFilter.value = res.data
          console.log(allAgendamentosFilter.value)
        })
        .catch((err) => {
          console.error(`Ocorreu um erro inesperado: ${err}`)
        })

      const totalAgendamentos = ref(0)
      allAgendamentosFilter.value.map(() => totalAgendamentos.value++)

      const pagination = totalAgendamentos.value / 1

      totalpage.value = Math.ceil(pagination)

      FatchAgendamentosFilterPagination(localFilter, page.value)
  }

  const FatchAgendamentosFilterPagination = async (
    localFilter: string,
    page: number
  ) => {
    if (filterSelect.value) {
      await CovidAPI.AgendamentosLocalizacaoPagination(localFilter, page)
        .then((res) => {
          agendamentosPagination.value = res.data
        })
        .catch((err) => {
          console.error(`Ocorreu um erro inesperado: ${err}`)
        })
    } else FatchAllAgendamentos()
  }

  const Refresh = () => {
    if (filterSelect.value) {
      FatchAgendamentosFilterPagination(filterAgendamentos.value, page.value)
    } else FatchAgendamentosPagination(page.value)
  }


  const filter = () => {
    if(textFilter.value == 'Filtrar') {
      textFilter.value = 'Remover'
      filterSelect.value = true
      FatchAgendamentosFilter(filterAgendamentos.value)
    } else {
       filterSelect.value = false
       textFilter.value = 'Filtrar'
      FatchAllAgendamentos()
    }
  }

  onMounted(async () => {
    FatchAllAgendamentos()
  })
</script>

<template>
  <div class="grid h-screen w-screen grid-cols-12 overflow-hidden bg-white">
    <!-- Grid 1 -->
    <div class="col-span-2 h-full w-full">
      <SideBar :agendamentos="true" />
    </div>

    <!-- Grid 2-->
    <div
      class="col-span-10 flex h-full w-full flex-col overflow-scroll bg-[#f1f5f9] px-6 sm:px-12"
    >
      <div class="my-2 h-12">
        <h1 class="text-2xl font-bold text-blue">Meus Agendamentos</h1>
      </div>
      <div class="xl: mb-3">
        <label
          for="exampleFormControlInput1"
          class="text-md font-normal text-blue"
        >
          Filtrar Agendamento
        </label>
        <div class="mt-2 flex items-center">
          <fa icon="filter" class="mr-2 h-8 w-8 text-blue" />
          <div class="w-48">
            <select
              class="mt-1 block h-8 w-full cursor-pointer appearance-none rounded border border-gray-400 bg-white px-2 py-1 pr-8 leading-tight shadow hover:shadow-sm focus:outline-none"
              v-model="filterAgendamentos"
            >
              <option>Local de Exame</option>
              <option
                v-for="(local, index) in locaisAtendimento"
                :key="index"
                :value="local"
              >
                {{ local }}
              </option>
            </select>
          </div>
          <button
            @click="filter"
            class="ml-1 mt-1 rounded-lg bg-pink py-1 px-2 text-sm text-white"
          >
            {{ textFilter }}
          </button>
        </div>
      </div>

      <div
        class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <div
          v-for="(agendamento, index) in agendamentosPagination"
          :key="agendamento.id"
        >
          <CardAgendamentoVue
            :id="agendamento.id"
            :tipo="agendamento.tipo_exame"
            :status="agendamento.status"
            :data="agendamento.data"
            :hora="agendamento.hora"
            :local="agendamento.localizacao"
            :refresh="Refresh"
          />
        </div>
      </div>
      <div class="mx-auto mt-auto pb-8 text-lg">
        <VPagination
          v-model="page"
          :pages="totalpage"
          :range-size="1"
          active-color="#DCEDFF"
          @update:modelValue="Refresh"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
