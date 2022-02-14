<script setup lang="ts">
  import { ref } from 'vue'

  const active_hover = ref(false)
  const active_click = ref(false)

  const AgendamentoSelect = (value: boolean) => {
    if (active_click.value) return
    active_hover.value = value
  }

  const props = defineProps<{
    hora: string
    vagas: number
    setHorario: any
  }>()

  const set = () => {
    active_click.value = !active_click.value
    props.setHorario(props.hora)
  }
</script>

<template>
  <button
    :class="[
      active_hover || active_click ? 'border-pink' : 'border-blue',
      'button-agendamentos-controler flex h-8 rounded-md border ',
    ]"
    @click="set"
    @mouseenter="AgendamentoSelect(true)"
    @mouseleave="AgendamentoSelect(false)"
  >
    <span
      :class="[
        active_hover || active_click ? 'text-pink' : 'text-blue',
        'flex h-full w-1/2 items-center justify-center rounded-l-md bg-white text-xs font-medium  ',
      ]"
    >
      {{ hora }}
    </span>
    <span
      :class="[
        active_hover || active_click ? 'bg-pink' : 'bg-blue',
        'flex h-full w-1/2 items-center justify-center rounded-r-md  text-xs font-medium text-white',
      ]"
    >
      {{ vagas }} Vagas
    </span>
  </button>
</template>

<style lang="scss" scoped>
  // Agendamentos Response Controler
  @media (min-width: 106px) {
    .agendamentos-grid-controler {
      .button-agendamentos-controler {
        width: 9rem;
      }
    }
  }

  @media (min-width: 406px) {
    .agendamentos-grid-controler {
      .button-agendamentos-controler {
        width: 7rem;
      }
    }
  }
</style>
