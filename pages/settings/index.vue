<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="updateUserInfo">
            <fieldset>
              <fieldset class="form-group">
                <input v-model="userInfo.image" class="form-control" type="text" placeholder="URL of profile picture" />
              </fieldset>
              <fieldset class="form-group">
                <input v-model="userInfo.username" class="form-control form-control-lg" type="text" placeholder="Your Name" />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="userInfo.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="userInfo.email" class="form-control form-control-lg" type="text" placeholder="Email" />
              </fieldset>
              <fieldset class="form-group">
                <input v-model="pwd" class="form-control form-control-lg" type="password" placeholder="Password" />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { updateUser, getCurrentUser } from '@/api/user'

export default {
  name: 'SettingIndex',
  data() {
    return {
      pwd: 'lt123321'
    }
  },
  async asyncData(){
    const { data } =  await getCurrentUser()
    return {
      userInfo: data.user
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapMutations(['setUser']),
    async updateUserInfo(){
      await updateUser({
        user: {
          ...this.userInfo,
          password: this.pwd
        }
      })
    }
  }
};
</script>

<style>
</style>