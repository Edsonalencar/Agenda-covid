<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { userState } from '../state-store'

  //Components Plugins
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import {
    CalendarIcon,
    LogoutIcon,
    UserIcon,
    FolderIcon,
    PencilAltIcon,
    SelectorIcon,
    DocumentSearchIcon,
  } from '@heroicons/vue/outline'

  const store = userState()
  const open = ref(false)
  const user_name = ref('')

  defineProps<{
    agendamentos?: boolean
    agendar?: boolean
  }>()

  const teste = () => {
    console.log(user_name.value)
    console.log(store.user.id)
    console.log(store.user.nome)
  }

  onMounted(() => {
    user_name.value = store.user.nome
    console.log(user_name.value)
  })
</script>

<template>
  <div class="relative h-full w-full p-2">
    <div class="h-13 -mb-4 flex w-full items-center justify-center">
      <Menu as="div" class="relative mx-2">
        <div>
          <MenuButton
            class="focus:zinc-900 flex rounded-xl bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-200 sm:px-3 md:px-5 xl:p-1"
          >
            <div class="flex flex-col items-center justify-start xl:flex-row">
              <div class="flex">
                <img
                  class="max-w-12 max-h-12 rounded-full xl:h-9 xl:w-9"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Perfil de Usuario"
                />
                <div class="ml-2 box-border hidden text-gray-700 xl:block">
                  <p>Seja Bem vindo</p>
                  <strong class="font-medium text-pink">{{ user_name }}</strong>
                </div>
              </div>
              <SelectorIcon
                class="ml-3 hidden h-4 w-4 text-gray-500 xl:block"
                aria-hidden="true"
              />
              <fa
                icon="chevron-down"
                class="mt-2 h-4 w-4 animate-bounce text-pink xl:hidden xl:text-gray-500"
              />
            </div>
          </MenuButton>
        </div>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="-right-15 absolute mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none xl:-right-2 xl:w-48"
          >
            <MenuItem>
              <router-link
                to="#"
                class="flex flex-row items-center justify-start rounded-lg px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-light-Mygray"
                @click="teste"
              >
                <UserIcon
                  class="mr-2 h-5 w-5 text-zinc-500"
                  aria-hidden="true"
                />
                Meu Perfil
              </router-link>
            </MenuItem>
            <MenuItem>
              <router-link
                to="/login"
                class="flex flex-row items-center justify-start rounded-lg px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-light-Mygray"
              >
                <LogoutIcon
                  class="mr-2 h-5 w-5 text-zinc-500"
                  aria-hidden="true"
                />
                Sair
              </router-link>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
    <div
      class="mt-6 flex h-full w-full flex-col items-start justify-start gap-3 border-t border-Mygray pt-6"
    >
      <router-link
        to="/agendamentos"
        :class="[
          agendamentos ? 'bg-light-Mygray' : '',
          'flex w-full items-center justify-center rounded-lg p-2 text-base text-blue hover:bg-light-Mygray md:flex-col xl:flex-row xl:justify-start',
        ]"
      >
        <FolderIcon
          class="h-8 w-8 text-pink md:h-6 md:w-6 xl:mr-2"
          aria-hidden="true"
        />
        <strong class="hidden font-medium xl:block">Meus Agentamentos</strong>
        <strong class="hidden text-sm font-medium md:block xl:hidden">
          Agentamentos
        </strong>
      </router-link>
      <router-link
        to="/agendar"
        :class="[
          agendar ? 'bg-light-Mygray' : '',
          'flex w-full items-center justify-center  rounded-lg p-2 text-base font-medium text-blue hover:bg-light-Mygray md:flex-col xl:flex-row xl:justify-start',
        ]"
      >
        <PencilAltIcon
          class="h-8 w-8 text-pink md:h-6 md:w-6 xl:mr-2"
          aria-hidden="true"
        />
        <strong class="hidden font-medium md:block md:text-sm xl:text-base">
          Agendar
        </strong>
      </router-link>
      <router-link
        to="/transparencia"
        @click="store.checkpoint = '/agendamentos'"
        class="flex w-full items-center justify-center rounded-lg p-2 text-base font-medium text-blue hover:bg-light-Mygray lg:hidden md:flex-col xl:flex-row xl:justify-start"
      >
        <DocumentSearchIcon
          class="h-8 w-8 text-pink md:h-6 md:w-6 xl:mr-2"
          aria-hidden="true"
        />
        <strong class="hidden font-medium md:block md:text-sm xl:text-base">
          Transparência
        </strong>
      </router-link>
    </div>
    <div class="w-68 absolute bottom-3 flex h-12 items-center justify-center">
      <CalendarIcon
        class="hidden h-12 w-12 text-pink xl:block"
        aria-hidden="true"
      />
      <strong class="ml-3 hidden text-base font-extrabold text-blue xl:block">
        Agendamento Online
      </strong>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
