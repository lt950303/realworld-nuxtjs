<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>
        <h3>&nbsp;</h3>
        <h3>{{article.description}}</h3>

        <article-meta :article="article"/>
      </div>
    </div>

    <div class="container page">
      <div v-html="article.body" class="row article-content">
        
      </div>

      <hr />

      <div class="article-actions">
          <article-meta :article="article"/>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea v-model="comment" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
              <img style="width: 40px; height: 40px;" :src="article.author.image" />
              <button class="btn btn-sm btn-primary" @click="postComments">Post Comment</button>
            </div>
          </form>

          <article-comments :article="article" />
          

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, addComments } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'

export default {
  name: 'ArticleIndex',
  components: {
    ArticleMeta,
    ArticleComments
  },
  data() {
    return {
      comment: ''
    }
  },
  async asyncData({ params }){
    const { data } = await getArticle(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article: article
    }

  },
  head() {
      return {
        title: `${this.article.title}-RealWorld`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `${this.article.description}`
          }
        ]
      }
  },
  methods: {
    async postComments(){
      await addComments({
        slug: this.article.slug,
        body: {comment:{
          body: this.comment
        }}
      })
      this.comment = ''
      // 更新评论
    }
  }
};
</script>

<style>
</style>