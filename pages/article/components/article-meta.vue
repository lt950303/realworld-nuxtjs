<template>
  <div class="article-meta">
    <a href>
      <img :src="article.author.image" />
    </a>
    <div class="info">
      <a href class="author">{{article.author.username}}</a>
      <span class="date">{{article.createdAt | data('MMM DD, YYYY')}}</span>
    </div>
    <button 
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following
      }"
      @click="follow(article)"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow {{article.author.username}}
      <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button 
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited
      }"
    >
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post
      <span class="counter">(29)</span>
    </button>
  </div>
</template>

<script>
import { followUser, unFollowUser } from '@/api/user'

export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods:{
    async follow(article) {
      if(article.author.following){
        await unFollowUser(article.author.username)
        article.author.following = false
      }else{
        await followUser(article.author.username)
        article.author.following = true
      }
      
    }
  }
};
</script>

<style>
</style>