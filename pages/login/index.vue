<template>
  <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
        <p class="text-xs-center">
          <nuxt-link v-if="isLogin"  to="/register">Need an account?</nuxt-link>
          <nuxt-link v-else to="/login">Have an account?</nuxt-link>
        </p>

        <ul class="error-messages">
          <template v-for="(message, field) in errors">
            <li v-for="(msg ,index) in message" :key="index">{{field}}: {{msg}}</li>
          </template>
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset v-if="!isLogin" class="form-group">
            <input  v-model="user.username" class="form-control form-control-lg" type="text" required placeholder="Your Name">
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.email" class="form-control form-control-lg" type="email" required placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input  v-model="user.password" class="form-control form-control-lg" type="password" required placeholder="Password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{ isLogin ? 'Sign in' : 'Sign up' }}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { login, register } from '@/api/user'
import { mapMutations } from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: ['notAuthenticated'],
  name: 'LoginIndex',
  data () {
    return {
      user: {
        email: '15056049162@163.com',
        password: 'lt123321',
        username: 'lt95'
      },
      // 错误信息
      errors: {
      }
    }
  },
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    },
  },
  methods: {
      async onSubmit(){
        try {
          const { data } = this.isLogin ? await login({
            user: this.user
          }) : await register({
            user: this.user
          })
          // this.$store.commit('setUser', data.user)
          this.setUser(data.user)
          Cookie.set('user', data.user)
          // TODO 保存登录状态
          this.$router.push('/')
        } catch (error) {
          console.dir(error)
          this.errors = error.response.data.errors
        }
        
        
      },
      ...mapMutations(['setUser'])
      
    }
}
</script>

<style>

</style>