<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">真实的世界</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link 
                  class="nav-link" 
                  :class="{
                    active: tab === 'your_feed'
                  }"
                  :to="{ 
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }"
                  exact
                >
                Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link " 
                :class="{
                  active: tab === 'global_feed'
                }"
                :to="{ 
                    name: 'home',
                    query: {
                    }
                  }"
                  exact
                href>Global Feed</nuxt-link>
              </li>

              <li v-if="tab==='tag' " class="nav-item">
                <nuxt-link class="nav-link " 
                :class="{
                  active: tab === 'tag'
                }"
                :to="{ 
                    name: 'home',
                    query: {
                      tab: 'tag'
                    }
                  }"
                  exact
                href>{{tag}}</nuxt-link>
              </li>
            </ul>
          </div>

          <div v-for="article in articles" :key="article.slug" class="article-preview">
            <div class="article-meta">
              <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }" class="author">{{article.author.username}}</nuxt-link>
                <span class="date">{{article.updatedAt | data('MMM DD,YYYY')}}</span>
              </div>
              <button 
                class="btn btn-outline-primary btn-sm pull-xs-right" :class="{
                  active: article.favorited
                } "
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              
              >
                <i class="ion-heart "></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }
              }" class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- 分页 -->
          <nav>
            <ul class="pagination">
              <!-- active -->
              <li v-for="item in totalPage" :key="item" class="page-item" :class="{
                    active: item === page
                  }" >
                <nuxt-link class="page-link"
                 :to="{
                  name: 'home',
                  query: {
                    page: item,
                    tag: $route.query.tag,
                    tab
                  }
                }">{{item}}</nuxt-link>
              </li>

            </ul>
          </nav>
          <!-- /分页 -->


        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link v-for="tag in tags" :key="tag" :to="{
                name: 'home',
                query: {
                  tag: tag,
                  tab: 'tag'
                }
              }" class="tag-pill tag-default">{{tag}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  getArticles, 
  getYourFeedArticles,
  addFavorite,
  deleteFavorite
  } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
export default {
  name: 'HomePage',
  async asyncData ({ query }) {
    const page = parseInt(query.page || 1)
    const limit = 40
    const tab = query.tab || 'global_feed'
    const tag = query.tag

    const loadArticles = tab === 'your_feed' ? getYourFeedArticles : getArticles

    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag: tag 
      }),
      getTags()
    ])
    const {articles, articlesCount} = articleRes.data
    const { tags } = tagRes.data

    articles.forEach(article => article.favoriteDisabled = false)
    return {
      articles: articles, // 文章列表
      articlesCount: articlesCount, // 文章总数
      page, // 页码
      limit, // 页容量
      // 数据太多 ，随便取前29个
      tags: tags.splice(0, 20), // 标签列表
      tab, // tab 栏
      tag, // 当前标签
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage(){
      return Math.ceil( this.articlesCount / this.limit )
    }
  },
  methods: {
    async onFavorite(art){
      art.favoriteDisabled = true
      if(art.favorited){
        await deleteFavorite(art.slug)
        art.favorited = false
        art.favoritesCount += -1
      }else{
        await addFavorite(art.slug)
        art.favorited = true
        art.favoritesCount += 1
      }
      art.favoriteDisabled = false
    }
  }
};
</script>

<style>
</style>