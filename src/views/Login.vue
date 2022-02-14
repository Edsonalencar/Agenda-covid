<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { userState } from '../state-store'

  // Icons
  import { UserIcon, CalendarIcon } from '@heroicons/vue/outline'

  // My components
  import HeaderVue from '../components/Header.vue'
  import SectionTransparencia from '../components/SectionTransparencia.vue'
  import CovidAPI from '../providers/CovidAPI.provider'

  //Router
  const router = useRouter()
  const store = userState()

  const user_email = ref('')
  const user_password = ref('')
  const notification = ref(false)

  const Handleloguin = async () => {
      await CovidAPI.Login(user_email.value, user_password.value)
      .then((res) => {
        notification.value = false
        store.accessToken = res.data.accessToken
        store.user = res.data.user
        router.push('/agendamentos')
        })
      .catch(() => {
        console.log('Email e/ou Senha Incorretos')
      notification.value = true
      })
  }
</script>

<template>
  <div
    class="h-screen w-screen overflow-hidden bg-white lg:grid lg:grid-cols-12"
  >
    <!-- Grid 1 -->
    <div class="relative col-span-12 h-full w-full lg:col-span-3">
      <img
        src="../assets/img-login2.jpg"
        alt="Seção de agendamento"
        class="h-full w-full object-cover object-center"
      />
      <div class="absolute top-0 h-full w-full bg-wallpapper-blue">
        <SectionTransparencia parent="/login" />

        <!-- Login Responsive -->

        <div class="relative mx-auto h-full max-w-xl p-10 lg:hidden">
          <div class="flex h-8 items-center justify-between">
            <CalendarIcon class="h-12 w-12 text-white" aria-hidden="true" />
            <router-link
              to="/register/email"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              <UserIcon class="mr-2 h-4 w-4" aria-hidden="true" />
              Cadastre-se
            </router-link>
          </div>

          <form class="mt-24" @submit.prevent="Handleloguin">
            <div class="-space-y-px rounded-md shadow-sm">
              <div class="mb-4">
                <label for="email" class="text-xl text-white">Email</label>
                <input
                  id="response-email-address"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-xl text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink focus:outline-none focus:ring-pink"
                  v-model="user_email"
                />
              </div>
              <div>
                <label for="password" class="text-xl text-white">Senha</label>
                <input
                  id="response-password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-xl text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink focus:outline-none focus:ring-pink"
                  v-model="user_password"
                />
              </div>
            </div>

            <div class="my-6 flex items-center justify-end">
              <div class="text-sm">
                <a href="#" class="text-xl text-white hover:text-pink">
                  Esqueceu sua Senha ?
                </a>
              </div>
            </div>

            <div class="mb-5">
              <button
                type="submit"
                class="group hover:bg-Pink-400 relative flex w-full justify-center rounded-md border border-transparent bg-pink py-2 px-4 text-xl font-medium text-white hover:cursor-pointer hover:bg-light-pink hover:drop-shadow-xl focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2"
              >
                Entrar
              </button>
            </div>

            <div class="text-center" v-if="notification">
              <strong class="text-lg font-medium text-red"
                >Email e/ou senha inválidos</strong
              >
            </div>
          </form>
          <div class="absolute bottom-12 flex h-12 w-full justify-between">
            <img
              src="../assets/lais-logo.svg"
              alt="Seção de agendamento"
              class="h-[3rem] w-[7rem]"
            />
            <img
              src="../assets/ufrn-logo.svg"
              alt="Seção de agendamento"
              class="mr-20 h-[3rem] w-[7rem]"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Grid 2-->
    <div class="col-span-9 hidden h-full w-full bg-white lg:flex lg:flex-col">
      <HeaderVue
        msg="Não tem uma conta ?"
        buttom="Cadastre-se"
        to="/register/email"
      />

      <div class="mx-auto my-auto">
        <div
          class="border-gray flex w-96 items-center justify-center rounded-lg border-t bg-white p-8 shadow-md"
        >
          <div class="w-full max-w-md space-y-8">
            <div class="mb-11">
              <h2 class="text-center text-3xl font-extrabold text-gray-900">
                Faça Login
              </h2>
            </div>

            <form class="space-y-6" @submit.prevent="Handleloguin">
              <input type="hidden" name="remember" value="true" />
              <div class="-space-y-px rounded-md shadow-sm">
                <div class="mb-4">
                  <label for="email">Email</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink focus:outline-none focus:ring-pink sm:text-sm"
                    v-model="user_email"
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
                    v-model="user_password"
                  />
                </div>
              </div>

              <div class="flex items-center justify-end">
                <div class="text-sm">
                  <router-link
                    to="#"
                    class="font-medium text-black hover:text-pink"
                  >
                    Esqueceu sua Senha ?
                  </router-link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="group hover:bg-Pink-400 relative flex w-full justify-center rounded-md border border-transparent bg-pink py-2 px-4 text-sm font-medium text-white hover:cursor-pointer hover:bg-light-pink hover:drop-shadow-xl focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2"
                >
                  Entrar
                </button>
              </div>
              <div class="text-center" v-if="notification">
                <strong class="text-base font-medium text-red">
                  Email e/ou senha inválidos
                </strong>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
