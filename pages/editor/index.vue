<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form >
            <fieldset>
              <fieldset class="form-group">
                <input v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title" />
              </fieldset>
              <fieldset class="form-group">
                <input v-model="article.description" type="text" class="form-control" placeholder="What's this article about?" />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="tagsStr" type="text" class="form-control" placeholder="Enter tags" />
                <div class="tag-list"></div>
              </fieldset>
              <button @click="addOrUpdateArticle" class="btn btn-lg pull-xs-right btn-primary" type="button">{{isEditArticle ? 'Update Article' : 'Publish Article'}}</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
										
<script>
import { getArticle, addArticle, updateArticle } from '@/api/article'

export default {
  middleware: ['authenticated'],
  name: 'EditorIndex',
  data(){
    return {
      // 以逗号分隔的字符串
      tagsStr: ''
    }
  },
  async asyncData({params}){
    const slug = params.slug || ''
    let isEditArticle = true
    let article = {}
    let tagsStr = ''
    if(slug){
      const { data } = await getArticle(slug)
      article = data.article
       tagsStr = article.tagList.toString()
    }else{
      isEditArticle = false
    }

    return {
      slug,
      article,
      tagsStr,
      isEditArticle
    }
  },
  computed: {
    tagstrList(){
      return this.tagsStr.split(',')
    }
  },
  methods: {
    async addOrUpdateArticle(){
      if(this.isEditArticle){
        await updateArticle({
          slug: this.slug,
          body:{
              "article": {
                ...this.article,
                "tagList": this.tagstrList
            }
          }
        })
      }else{
          await addArticle({
            "article": {
              ...this.article,
              "tagList": this.tagstrList
            }
          })
      }

      this.$router.push({
        name: 'home'
      })
    }
  }
};
</script>

<style>
</style>