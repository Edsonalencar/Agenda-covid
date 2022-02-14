<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { BarChart } from 'vue-chart-3'

  const dataValues = ref([[10, 15, 13]])

  const data = computed(() => ({
    labels: ['Antes de Ontem', 'Ontem', 'Hoje'],
    datasets: [
      {
        data: dataValues.value[0],
        backgroundColor: ['#7e1fb4', '#0ed1a5', '#1f78b4'],
      },
    ],
  }))

  const options = ref({
    plugins: {
      title: 'Testando',
    },
  })

  const OpenNotification = ref(false)
  const Notification = () => {
    OpenNotification.value = true

    setTimeout(() => {
      OpenNotification.value = false
    }, 2000)
  }
</script>

<template>
  <div class="relative h-screen w-screen">
    <transition
      v-enter-active="OpenNotification"
      as="template"
      enter="transform transition ease-in-out duration-500 sm:duration-700"
      enter-from="translate-x-full"
      enter-to="translate-x-0"
      leave="transform transition ease-in-out duration-500 sm:duration-700"
      leave-from="translate-x-0"
      leave-to="translate-x-full"
    >
      <div
        class="absolute top-6 right-3 flex h-14 w-60 items-center justify-start rounded-xl border border-sky-400 bg-white p-3 shadow-lg"
      >
        <fa icon="check" class="mr-5 h-8 w-8 text-green" />
        <strong class="inline-block text-base font-medium text-gray-700"
          >Usuário Cadastrado com Sucesso</strong
        >
      </div>
    </transition>

    <BarChart :chart-data="data" :options="options" css-classes="container" />
    <button @click="Notification">Teste</button>
  </div>
</template>

<style lang="scss" scoped></style>
