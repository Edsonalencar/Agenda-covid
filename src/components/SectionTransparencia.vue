<script setup lang="ts">
  import { CalendarIcon } from '@heroicons/vue/outline'
  import { userState } from '../state-store'

  const store = userState()

  defineProps<{
    parent: string
  }>()
</script>

<template>
  <div class="relative h-full w-full hidden lg:block">
    <div class="hidden items-center px-10 lg:flex lg:flex-col">
      <CalendarIcon
        class="mt-[9rem] h-[5rem] w-[5rem] text-white"
        aria-hidden="true"
      />
      <strong class="text-center text-2xl font-extrabold text-white">
        Agendamento Online
      </strong>
      <div class="text-center text-Mygray">
        <p class="my-5">Rapido e Seguro</p>
        <p>Evite filas e agromeração</p>
        <p>O seu bem, é o bem de todos</p>
      </div>
      <router-link
        to="/transparencia"
        class="group mt-6 flex w-full justify-center rounded-md border border-transparent bg-pink py-2 px-4 text-sm font-medium text-white hover:cursor-pointer hover:bg-light-pink hover:drop-shadow-xl focus:outline-none focus:ring-2 focus:ring-pink focus:ring-offset-2"
        @click="store.checkpoint = `${parent}`"
      >
        Transparência
      </router-link>
    </div>
    <div
      class="logosInSectionTransparencia absolute bottom-12 hidden h-12 w-full px-10 lg:flex lg:justify-between"
    >
      <img src="../assets/lais-logo.svg" alt="Seção de agendamento" />
      <img src="../assets/ufrn-logo.svg" alt="Seção de agendamento" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .logosInSectionTransparencia {
    img {
      height: 1.6rem;
      widows: 4rem;
    }
  }

  @media (min-width: 1120px) {
    .logosInSectionTransparencia {
      img {
        height: 1.8rem;
        widows: 4rem;
      }
    }
  }

  @media (min-width: 1260px) {
    .logosInSectionTransparencia {
      img {
        height: 2rem;
        widows: 4rem;
      }
    }
  }
</style>
