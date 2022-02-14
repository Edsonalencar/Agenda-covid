<script setup lang="ts">
  import { ref } from 'vue'
  import { userState } from '../state-store'

  // Components Plugins
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'

  //My Componets
  import CovidAPI from '../providers/CovidAPI.provider'


  const props = defineProps<{
    id: number | undefined
    tipo: string | undefined
    status: string | undefined
    local: string | undefined
    data: string | undefined
    hora: string | undefined
    refresh?: any
  }>()

  const store = userState()
  const user_name = store.user.nome

  const openDetalhes = ref(false)
  const openCancelar = ref(false)
  const data_agendamento = ref('')

  if(props.data) {
    const dataAgendamento = props.data?.split('-')

    const dia = dataAgendamento[1]
    const mes = dataAgendamento[0]
    const ano = dataAgendamento[2]

    data_agendamento.value = `${dia}/${mes}/${ano}`

  }

  const PatchAgendamentos = async () => {
    await CovidAPI.UpdateAgendamento(props.id, 'CANCELADO')
      .then((res) => {
        if (res.status == 200) {
          props.refresh()
        }
      })
      .catch((err) => {
        console.error(`Ocorreu um erro inesperado: ${err}`)
      })

    openCancelar.value = false
    openDetalhes.value = false
  }
</script>

<template>
  <div
    class="border-gray mt-3 h-48 max-w-xs rounded-lg border-t bg-white shadow-xl md:max-w-[18rem]"
  >
    <div class="h-3/4 w-full px-4">
      <div
        class="flex h-12 items-center justify-between border-b border-gray-400"
      >
        <div class="flex h-full items-center justify-start">
          <div class="flex h-full -rotate-45 items-center justify-center">
            <fa icon="syringe" class="mr-2 h-5 w-5 text-pink" />
          </div>
          <div class="flex flex-col text-sm font-medium text-pink">
            <strong>Tipo de Exame</strong>
            <p class="font-normal">{{ tipo }}</p>
          </div>
        </div>
        <strong
          :class="[
            status != 'AGENDADO' ? 'text-red' : 'text-green',
            'text-xs font-bold ',
          ]"
        >
          {{ status }}
        </strong>
      </div>
      <div class="h-full py-3 text-sm text-blue">
        <div class="mb-6 flex">
          <fa icon="map-marker-alt" class="mr-2 h-5 w-5" />
          <p class="font-normal">{{ local }}</p>
        </div>
        <div class="item-center flex justify-between">
          <div class="flex">
            <fa icon="calendar-alt" class="mr-2 h-5 w-5" />
            <p class="font-normal">{{  data_agendamento }}</p>
          </div>

          <div class="flex">
            <fa icon="clock" class="mr-2 h-5 w-5" />
            <p class="font-normal">{{ hora }} h</p>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="[
        status != 'AGENDADO' ? 'hidden' : 'grid grid-cols-2',
        ' h-1/4 w-full',
      ]"
    >
      <button
        class="h-full w-full rounded-bl-lg bg-pink text-center text-white transition-opacity hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2"
        @click="openDetalhes = true"
      >
        Detalhes
      </button>
      <button
        class="h-full w-full rounded-br-lg bg-red text-center text-white transition-opacity hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2"
        @click="openCancelar = true"
      >
        Cancelar
      </button>
    </div>

    <!-- Modal Detalhes -->

    <TransitionRoot as="template" :show="openDetalhes">
      <Dialog
        as="div"
        class="fixed inset-0 z-10 overflow-y-auto"
        @close="openDetalhes = false"
      >
        <div
          class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:mx-8 sm:block sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
          </TransitionChild>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span
            class="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
            >&#8203;</span
          >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              class="my-8 inline-block w-full transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all sm:max-w-3xl"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="ml-4 text-left">
                    <DialogTitle
                      as="h3"
                      class="text-2xl font-bold leading-6 text-pink"
                    >
                      Comprovante de Agendamento
                    </DialogTitle>
                    <div class="mt-2 text-blue">
                      <div class="my-4 flex text-lg font-medium">
                        <strong>{{  data_agendamento }} - {{ hora }}h</strong>
                        <strong class="ml-3 text-green">Agendado</strong>
                      </div>
                      <strong class="text-md font-medium">Orientações</strong>
                      <ul class="my-3 text-sm text-red">
                        <li>
                          Caso sejam informados dados falsos relacionados ao seu
                          agendamento, ele poderá ser cancelado a criterio do
                          vacinador ou supervisor da sala de vacina (Art. 299 -
                          Código Penal)
                        </li>
                        <li class="my-2">
                          Você poderá cancelar seu agendamento com até 24h de
                          antecedência. Em caso de não comparecimento, um novo
                          agendamento será permitido após 48h do agendamento
                          anterior
                        </li>
                        <li>
                          O horário de agendamento poderá sofrer alterações,
                          caso surjam problemas logísticos indefinidos pelo
                          supervisor da sala de vacina
                        </li>
                      </ul>
                      <div class="mt-4 border-t border-gray-300 py-4">
                        <div class="flex text-base text-blue">
                          <strong class="mr-2 font-medium">Cidadão:</strong>
                          <p class="font-normal">{{ user_name }}</p>
                        </div>
                        <div class="flex text-base text-blue">
                          <strong class="mr-2 font-medium">Localização:</strong>
                          <p class="font-normal">{{ local }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-2 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="button"
                  class="bg-red-600 hover:bg-red-700 focus:ring-red-500 inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="openDetalhes = false"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-red px-4 py-2 text-base font-medium text-white shadow-sm hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="PatchAgendamentos"
                  ref="cancelButtonRef"
                >
                  Cancelar Agendamento
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Modal Confirmar Cancelamento -->

    <TransitionRoot as="template" :show="openCancelar">
      <Dialog
        as="div"
        class="fixed inset-0 z-10 overflow-y-auto"
        @close="openCancelar = false"
      >
        <div
          class="flex min-h-screen items-end justify-center px-3 pt-4 pb-20 text-center sm:block sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
          </TransitionChild>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span
            class="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
            >&#8203;</span
          >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="text-center">
                  <div class="py-2 text-center">
                    <DialogTitle
                      as="h3"
                      class="text-2xl font-bold leading-6 text-gray-900"
                    >
                      Realmente deseja cancelar este agendamento ?
                    </DialogTitle>
                    <div class="mt-4">
                      <p class="text-base text-gray-500">
                        Essa é uma ação que não poderá ser alterada!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-2 py-5 sm:flex sm:flex-row-reverse sm:items-center sm:justify-center sm:px-6"
              >
                <button
                  type="button"
                  class="bg-red-600 hover:bg-red-700 focus:ring-red-500 inline-flex w-full justify-center rounded-md border border-gray-400 px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="openCancelar = false"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-red px-4 py-2 text-base font-medium text-white shadow-sm hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="PatchAgendamentos"
                  ref="cancelButtonRef"
                >
                  Cancelar Agendamento
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<style lang="scss" scoped></style>
