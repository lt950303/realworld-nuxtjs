<template>
  <div>
    <div v-for="commont in comments" :key="commont.id" class="card">
              <div class="card-block">
                <p
                  class="card-text"
                  v-html="commont.body"
                ></p>
              </div>
              <div class="card-footer">
                <nuxt-link :to="{
                  name: 'profile',
                  params: {
                    username: commont && commont.author.username
                  }
                }" class="comment-author">
                  <img :src="commont.author.image" class="comment-author-img" />
                </nuxt-link>
                &nbsp;
                <a href class="comment-author">{{commont.author.username}}</a>
                <span class="date-posted">{{commont.createdAt | data('MMM DD, YYYY')}}</span>
                <span class="mod-options">
                  <i class="ion-edit"></i>
                  <i class="ion-trash-a"></i>
                </span>
              </div>
      </div>
    </div>
</template>

<script>
import { getArticleComments } from '@/api/article'
import MarkdownIt from 'markdown-it'

export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      comments: []
    }
  },
  async mounted(){
    const { data } =  await getArticleComments(this.article.slug)
    const md = new MarkdownIt()
    data.comments.forEach(comment => {
      comment.body =  md.render(comment.body)
    })
    this.comments = data.comments
    // console.log(data);
  },
  methods: {
    
  }
}
</script>

<style>

</style>