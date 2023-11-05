<template>
  <div class="container">
    <div class="row">
      <div class="col col-md-6 offset-md-3">
        <form class="card mt-5" @submit.prevent="submitForm">
          <div class="card-body">
            <h3 class="card-title text-center">Login</h3>
            <p class="text-danger" v-if="error">{{ error }}</p>

            <base-input label="Email" type="email" v-model="email" required></base-input>
            <base-input label="Password" type="password" v-model="password" required></base-input>
          </div>
          <div class="card-footer">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import useAuthStore from '@/store/auth'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },

  async create() {},

  computed: {
    ...mapStores(useAuthStore)
  },
  methods: {
    async submitForm() {
      if (!this.email || !this.password) return

      const dataLogin = {
        email: this.email,
        password: this.password,
        returnSecureToken: true
      }

      try {
        await this.authStore.login(dataLogin)
        this.handleError()
        this.$router.push('/')
      } catch (error) {
        // alert(error.message)
        console.log(error)
        this.error = 'Sai thông tin tài khoản hoặc mật khẩu!'
      }
    },

    handleError() {
      this.error = null
    }
  }
}
</script>

<style lang="scss" scoped></style>
