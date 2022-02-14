<script setup lang="ts">
  import { ref } from 'vue'
  import ItemAgendamento from '../components/ItemAgendamento.vue'

  const dia = ref('')
  const mes = ref('')
  const ano = ref('')

  const props = defineProps<{
    agendamentos: { hora: number } | undefined
    local: string | undefined
    data: string | undefined
    setLocalHora: any
  }>()

  const sethorario = (horario: string) => {
    props.setLocalHora(horario, props.local, props.data)
  }

  if (props.data) {
    const dataAgendamento = props.data.split('-')

    dia.value = dataAgendamento[1]
    mes.value = dataAgendamento[0]
    ano.value = dataAgendamento[2]
  }
</script>

<template>
  <strong class="text-md font-medium text-blue">
    {{ local }} | {{ `${dia}/${mes}/${ano}` }} | Covid-19 | 8h as 16h
  </strong>
  <div class="agendamentos-grid-controler mx-auto mt-3 grid grid-cols-1 gap-3">
    <div v-for="(vaga, index) in agendamentos" :key="index">
      <ItemAgendamento :hora="index" :vagas="vaga" :setHorario="sethorario" />
    </div>
  </div>
  <hr class="my-5 w-full border-t border-gray-400" />
</template>

<style lang="scss" scoped>
  // Agendamentos Response Controler

  @media (min-width: 106px) {
    #agendamentos-disponiveis {
      padding: 1.25rem 1.45rem;
    }
    .agendamentos-grid-controler {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      gap: 4;

      .button-agendamentos-controler {
        width: 9rem;
      }
    }
  }

  @media (min-width: 406px) {
    #agendamentos-disponiveis {
      padding: 1.25rem 2rem;
    }
    .agendamentos-grid-controler {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));

      .button-agendamentos-controler {
        width: 7rem;
      }
    }
  }

  @media (min-width: 545px) {
    .agendamentos-grid-controler {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (min-width: 716px) {
    .agendamentos-grid-controler {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  @media (min-width: 1022px) {
    .agendamentos-grid-controler {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (min-width: 1103px) {
    .agendamentos-grid-controler {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  @media (min-width: 1232px) {
    .agendamentos-grid-controler {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }
</style>
