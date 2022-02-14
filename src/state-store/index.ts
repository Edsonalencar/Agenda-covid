import { defineStore } from 'pinia'

export const userState = defineStore('useState', {
  state: () => {
    return {
      checkpoint: '',
      user_email: '',
      accessToken: '',
      user: {
        email: '',
        nome: '',
        data_nascimento: '',
        id: 0,
      },
    }
  },
})
