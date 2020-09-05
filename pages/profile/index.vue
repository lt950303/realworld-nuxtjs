<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{user.username}}</h4>
            <p>{{user.bio}}</p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow {{user.username}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href>My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href>Favorited Articles</a>
              </li>
            </ul>
          </div>

          <div v-for="article in articles" :key="article.slug" class="article-preview">
            <div class="article-meta">
              <nuxt-link
                :to="{
              name: 'profile',
              params:{
                username: article.author.username
              }
            }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params:{
                      username: article.author.username
                    }
                  }"
                  class="author"
                >{{article.author.username}}</nuxt-link>
                <span class="date">{{article.updatedAt | data('MMM DD, YYYY')}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <nuxt-link :to="{
              name: 'article',
               params:{
                  slug: article.slug
              }
            }" class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfileUser } from "@/api/user";
import { getArticles } from "@/api/article";

export default {
  name: "ProfileIndex",
  data() {
    return {
      articles: [],
    };
  },
  async asyncData({ params }) {
    const { data } = await getProfileUser(params.username);
    let user = data.profile;
    console.log(data);
    return {
      user,
    };
  },
  async mounted() {
    const { data } = await getArticles({
      limit: 100,
      offset: 0,
      author: this.user.username,
    });
    this.articles = data.articles;
  },
};
</script>

<style>
</style>