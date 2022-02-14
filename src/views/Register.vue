<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { userState } from '../state-store'

  //Components Plugins
  import { CalendarIcon } from '@heroicons/vue/outline'
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'

  // My Componets
  import HeaderVue from '../components/Header.vue'
  import SectionTransparencia from '../components/SectionTransparencia.vue'
  import CovidAPI from '../providers/CovidAPI.provider'

  const router = useRouter()
  const store = userState()

  const open = ref(false)
  const pasword_invalidade = ref(false)
  const email_invalidade = ref(false)
  const notificationCadastro = ref(false)

  const register_email = store.user_email

  const error_password_message = ref('')
  const register_password = ref('')
  const confirm_password = ref('')
  const user_name = ref('')

  const Notification = () => {
    notificationCadastro.value = true
    setTimeout(() => {
      notificationCadastro.value = false
      router.push('/agendamentos')
    }, 1500)
  }

  const RegisterUser = () => {
    if (register_password.value === confirm_password.value) {
      CovidAPI.Register(
        register_email,
        register_password.value,
        user_name.value
      )
        .then((res) => {
          store.accessToken = res.data.accessToken
          store.user = res.data.user
          Notification()
        })
        .catch((err) => {
          console.log(err.response.data)
          if (err.response.data == 'Email already exists') {
            email_invalidade.value = true
          }
          if (err.response.data == 'Password is too short') {
            error_password_message.value = 'A senha é muito curta'
            pasword_invalidade.value = true
          }
        })
    } else {
      error_password_message.value = 'As senhas não coincidem'
      pasword_invalidade.value = true
    }
  }
</script>

<template>
  <div
    class="h-screen w-screen overflow-auto bg-white lg:grid lg:grid-cols-12 lg:overflow-hidden"
  >
    <!-- Grid 1 -->
    <div class="relative col-span-12 h-full w-full lg:col-span-3">
      <img
        src="../assets/img-login2.jpg"
        alt="Seção de agendamento"
        class="h-48 w-full object-cover object-center lg:h-full"
      />
      <div class="absolute top-0 h-full w-full lg:bg-wallpapper-blue">
        <SectionTransparencia parent="/register" />

        <!-- Register Email Responsive -->

        <div class="h-full w-full lg:hidden">
          <div class="flex h-48 items-center justify-center bg-wallpapper-blue">
            <CalendarIcon class="h-16 w-16 text-white" aria-hidden="true" />
            <strong
              class="strong-size ml-2 text-center font-extrabold text-white"
            >
              Agendamento Online
            </strong>
          </div>
          <div class="-mt-12 h-full w-full px-4">
            <div
              class="relative mx-auto flex h-full max-w-lg flex-col items-center justify-start"
            >
              <div
                class="border-gray flex w-full items-center justify-center rounded-lg border-t bg-white p-8 shadow-md"
              >
                <div class="w-full max-w-md space-y-8">
                  <div class="text-center">
                    <h2 class="text-2xl font-bold text-gray-600">
                      Preencha os campo a baixo
                    </h2>
                    <p class="mt-3 text-center text-zinc-600">
                      É rapido, facil e seguro
                    </p>
                  </div>

                  <form class="space-y-3" @submit.prevent="RegisterUser">
                    <div class="space-y-1 rounded-md shadow-sm">
                      <div>
                        <label for="email">Email</label>
                        <input
                          id="response-email-address"
                          name="email"
                          type="email"
                          autocomplete="email"
                          required
                          class="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink focus:outline-none focus:ring-pink sm:text-sm"
                          v-model="register_email"
                        />
                      </div>
                      <strong
                        class="ml-1 text-sm font-medium text-red"
                        v-if="email_invalidade"
                      >
                        Esse email já esta cadastrado
                      </strong>
                      <div>
                        <label for="name">Nome</label>
                        <input
                          id="response-name"
                          name="name"
                          type="name"
                          autocomplete="name"
                          required
                          class="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink focus:outline-none focus:ring-pink sm:text-sm"
                          v-model="user_name"
                        />
                      </div>
                      <div>
                        <label for="password">Senha</label>
                        <input
                          id="response-password"
                          name="password"
                          type="password"
                          autocomplete="current-password"
                          required
                          class="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink focus:outline-none focus:ring-pink sm:text-sm"
                          v-model="register_password"
                        />
                      </div>
                      <div>
                        <label for="confirm-password">Confirme sua Senha</label>
                        <input
                          id="response-confirm-password"
                          name="confirm-password"
                          type="password"
                          required
                          class="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink focus:outline-none focus:ring-pink sm:text-sm"
                          v-model="confirm_password"
                        />
                      </div>
                      <strong
                        class="ml-1 text-sm font-medium text-red"
                        v-if="pasword_invalidade"
                      >
                        {{ error_password_message }}
                      </strong>
                    </div>
                    <div>
                      <button
                        type="submit"
                        class="group hover:bg-Pink-400 relative flex w-full justify-center rounded-md border border-transparent bg-pink py-2 px-4 text-sm font-medium text-white hover:cursor-pointer hover:bg-light-pink hover:drop-shadow-xl focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2"
                      >
                        Continuar
                      </button>
                    </div>

                    <div>
                      <p class="text-center text-sm text-zinc-600">
                        Ao assinar voê concorda com os
                        <a
                          @click="open = true"
                          class="cursor-pointer underline hover:text-pink"
                        >
                          termos de serviço
                        </a>
                        e
                        <a
                          @click="open = true"
                          class="cursor-pointer underline hover:text-pink"
                        >
                          politica de privacidade
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
              <div class="mt-14 mb-3 flex h-12 w-full justify-between">
                <img
                  src="../assets/lais-logo-blue.svg"
                  alt="Seção de agendamento"
                  class="h-[3rem] w-[8rem]"
                />
                <img
                  src="../assets/ufrn-logo-blue.svg"
                  alt="Seção de agendamento"
                  class="h-[3rem] w-[8rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid 2-->
    <div class="col-span-9 hidden h-full w-full bg-white lg:flex lg:flex-col">
      <HeaderVue msg="Já tem conta ?" buttom="Entrar" to="/login" />

      <div class="mx-auto my-auto">
        <div
          class="border-gray flex w-96 items-center justify-center rounded-lg border-t bg-white p-5 shadow-md"
        >
          <div class="w-full max-w-md space-y-8">
            <div class="text-center">
              <h2 class="text-2xl font-bold text-gray-600">
                Preencha os campo a baixo
              </h2>
              <p class="mt-3 text-center text-zinc-600">
                É rapido, facil e seguro
              </p>
            </div>

            <form class="space-y-3" @submit.prevent="RegisterUser">
              <input type="hidden" name="remember" value="true" />
              <div class="space-y-1 rounded-md shadow-sm">
                <div>
                  <label for="email">Email</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink focus:outline-none focus:ring-pink sm:text-sm"
                    v-model="register_email"
                  />
                </div>
                <strong
                  class="ml-1 text-sm font-medium text-red"
                  v-if="email_invalidade"
                >
                  Esse email já esta cadastrado
                </strong>
                <div>
                  <label for="name">Nome</label>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autocomplete="name"
                    required
                    class="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink focus:outline-none focus:ring-pink sm:text-sm"
                    v-model="user_name"
                  />
                </div>
                <div>
                  <label for="password">Senha</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink focus:outline-none focus:ring-pink sm:text-sm"
                    v-model="register_password"
                  />
                </div>
                <div>
                  <label for="confirm-password">Confirme sua Senha</label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                    class="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink focus:outline-none focus:ring-pink sm:text-sm"
                    v-model="confirm_password"
                  />
                </div>
                <strong
                  class="ml-1 text-sm font-medium text-red"
                  v-if="pasword_invalidade"
                >
                  {{ error_password_message }}
                </strong>
              </div>
              <div>
                <button
                  type="submit"
                  class="group hover:bg-Pink-400 relative flex w-full justify-center rounded-md border border-transparent bg-pink py-2 px-4 text-sm font-medium text-white hover:cursor-pointer hover:bg-light-pink hover:drop-shadow-xl focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2"
                >
                  Continuar
                </button>
              </div>

              <div>
                <p class="text-center text-sm text-zinc-600">
                  Ao assinar voê concorda com os
                  <a
                    @click="open = true"
                    class="cursor-pointer underline hover:text-pink"
                  >
                    termos de serviço
                  </a>
                  e
                  <a
                    @click="open = true"
                    class="cursor-pointer underline hover:text-pink"
                  >
                    politica de privacidade
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <TransitionRoot as="template" :show="open">
      <Dialog
        as="div"
        class="fixed inset-0 z-10 overflow-y-auto"
        @close="open = false"
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
              class="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
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
                      class="mb-5 text-2xl font-extrabold leading-6 text-pink"
                    >
                      Termos e Politica de Privacidade
                    </DialogTitle>
                    <div class="mt-2 text-base font-normal text-gray-600">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </p>
                      <p class="my-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="open = false"
                  ref="cancelButtonRef"
                >
                  Fechar
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

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
                    Usuário Cadastrado com Sucesso
                  </strong>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<style lang="scss" scoped></style>
