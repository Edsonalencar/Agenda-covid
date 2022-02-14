<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { userState } from '../state-store'

  // Components Plugins
  import { CalendarIcon } from '@heroicons/vue/outline'

  //My Component
  import HeaderVue from '../components/Header.vue'
  import SectionTransparencia from '../components/SectionTransparencia.vue'

  const router = useRouter()
  const store = userState()
  const register_email = ref('')

  const Email = () => {
    store.user_email = register_email.value
    router.push('/register')
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
        class="h-48 w-full object-cover object-center lg:h-full"
      />
      <div class="absolute top-0 h-full w-full lg:bg-wallpapper-blue">
        <SectionTransparencia parent="/register/email" />

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

                  <form class="space-y-6" @submit.prevent="Email">
                    <div class="-space-y-px rounded-md shadow-sm">
                      <div class="mb-4">
                        <label class="text-xl" for="email">Email</label>
                        <input
                          name="email"
                          type="email"
                          autocomplete="email"
                          placeholder="Digite seu Email"
                          required
                          class="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-xl text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink focus:outline-none focus:ring-pink"
                          v-model="register_email"
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        class="group hover:bg-Pink-400 relative flex w-full justify-center rounded-md border border-transparent bg-pink py-2 px-4 text-xl font-medium text-white hover:cursor-pointer hover:bg-light-pink hover:drop-shadow-xl focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2"
                      >
                        Continuar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div
                class="absolute top-[26rem] flex h-12 w-full justify-between"
              >
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
          class="border-gray flex w-96 items-center justify-center rounded-lg border-t bg-white p-8 shadow-md"
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

            <form class="space-y-6" @submit.prevent="Email">
              <div class="-space-y-px rounded-md shadow-sm">
                <div class="mb-4">
                  <label for="email">Email</label>
                  <input
                    id="imail-adress"
                    name="email"
                    type="email"
                    autocomplete="email"
                    placeholder="Digite seu Email"
                    required
                    class="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink focus:outline-none focus:ring-pink sm:text-sm"
                    v-model="register_email"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  class="group relative flex w-full justify-center rounded-md border border-transparent bg-pink py-2 px-4 text-sm font-medium text-white hover:cursor-pointer hover:bg-light-pink hover:drop-shadow-xl focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2"
                >
                  Continuar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
