import { request } from '@/plugins/request'

export const getArticles = (data) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params: data,
  })
}

export const getYourFeedArticles = (data) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params: data,
    // headers: {
    //   Authorization: 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTEyMDgyLCJ1c2VybmFtZSI6Imx0OTUiLCJleHAiOjE2MDQyMzg2MzF9.QNx9xyEyW8vJ8Z7ngY1CCQzlfX4httAYfJLnYX5UbNk'
    // }
  })
}

// 收藏
export const addFavorite = (slug) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消收藏
export const deleteFavorite = (slug) => {
  return request({
    method: 'DELETE ',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export const getArticle = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export const getArticleComments = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 增加文章评论
export const addComments = (data) => {
  return request({
    method: 'POST',
    url: `/api/articles/${data.slug}/comments`,
    data: data.body
  })
}


