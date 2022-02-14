import axios, { AxiosInstance } from 'axios'
import { TypeAgendamentosCadastro } from './types/types.CovidAPI'

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3004',
})

class CovidAPI {
  async Transparencia() {
    return await api.get('/transparencia')
  }

  async Agendamentos() {
    return await api.get(`/agendamentos`)
  }

  async AgendamentosPagination(page: number) {
    return await api.get(`/agendamentos?_page=${page}&_limit=3`)
  }

  async AgendamentosMunicipio(municipio: string) {
    return await api.get(`/agendamentos?municipio=${municipio}`)
  }

  async AgendamentosLocalizacao(localizacao: string) {
    return await api.get(`/agendamentos?localizacao=${localizacao}`)
  }

  async AgendamentosLocalizacaoPagination(localizacao: string, page: number) {
    return await api.get(`/agendamentos?localizacao=${localizacao}&_page=${page}&_limit=1`)
  }

  async GAtendimentos() {
    return await api.get('/grupos-atendimentos')
  }

  async AgenDisponibilidadeAll() {
    return await api.get(`/agendamento-disponibilidade`)
  }

  async AgenDisponibilidadePagination(page: number) {
    return await api.get(`/agendamento-disponibilidade?_page=${page}&_limit=5`)
  }

  async AgenDisponibilidadeMunicipioPagination(municipio: string, page: number) {
    return await api.get(`/agendamento-disponibilidade?municipio=${municipio}&_sort=data&_order=asc&_page=${page}&_limit=3`)
  }

  async AgenDisponibilidadeLocalização(localizacao: string) {
    return await api.get(
      `/agendamento-disponibilidade?localizacao=${localizacao}`
    )
  }

  async AgenDisponibilidadeMunicipio(municipio: string) {
    return await api.get(
      `/agendamento-disponibilidade?municipio=${municipio}`
    )
  }

  async UpdateAgendamento(id: number | undefined, status: string) {
    return await api.patch(`/agendamentos/${id}`, {
      status,
    })
  }

  async Login(email: string, password: string) {
    return await api.post('/login', {
      email,
      password,
    })
  }

  async Register(email: string, password: string, nome: string) {
    return await api.post('/users', {
      email,
      password,
      nome,
    })
  }

  async RegisterAgendamento(agendamento: TypeAgendamentosCadastro) {
    return await api.post('/agendamentos', {
      usuario_id: agendamento.usuario_id,
      campanha_id: agendamento.campanha_id,
      grupo_atendimento_id: agendamento.grupo_atendimento_id,
      municipio: agendamento.municipio,
      localizacao: agendamento.localizacao,
      data: agendamento.data,
      hora: agendamento.hora,
      status: 'AGENDADO',
      tipo_exame: agendamento.tipo_exame
    })
  }
}

export default new CovidAPI()
