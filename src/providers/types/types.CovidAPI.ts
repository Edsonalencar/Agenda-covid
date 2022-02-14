export type TypeTransparencia = {
  doses?: {
    recebidas: {
      coronavac: string
      pfizer: string
    }
    aplicadas: [
      {
        faixa: string
        doses: {
          d1: number
          d2: number
          d3: number
        }
      }
    ]
  }
  vacinacao?: [
    {
      faixa: string
      doses: {
        d1: number
        d2: number
        d3: number
      }
    }
  ]
}

export type TypeAgendamentos = [
  {
    id?: number
    usuario_id?: number
    campanha_id?: number
    grupo_atendimento_id?: number
    municipio?: string
    localizacao?: string
    data?: string
    hora?: string
    status?: string
    tipo_exame?: string
  }
]

export type TypeAgendamentosCadastro = {
  usuario_id: number
  campanha_id: number
  grupo_atendimento_id: number
  municipio: string
  localizacao: string
  data: string
  hora: string
  status: string
  tipo_exame: string
}

export type UserData = {
  accessToken: string
  user: {
    email: string
    nome: string
    data_nascimento?: string
    id: number
  }
}

export type AgendamentosDisponiveis = [
  {
    id?: number
    municipio?: string
    localizacao?: string
    data?: string
    vagas?: {
      hora: number
    }
  }
]

export type GAtendimentos = [
  {
    id?: number
    nome?: string
    idade_minima?: number
  }
]
