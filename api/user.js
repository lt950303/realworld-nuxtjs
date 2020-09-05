import { request } from '@/plugins/request'

// 登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data,
  })
}

// 注册
export const register = (data) => {
  return request({
    method: 'POST',
    url: '/api/users',
    data,
  })
}

// 更新用户信息
export const updateUser = (data) => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data,
  })
}

// 获取当前用户信息
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/api/user'
  })
}

// 获取当前用户信息
export const getProfileUser = (username) => {
  return request({
    method: 'GET',
    url:  `/api/profiles/${username}`
  })
}

// Follow user
export const followUser = (username) => {
  return request({
    method: 'POST',
    url:  `/api/profiles/${username}/follow`,
  })
}

// Unfollow user
export const unFollowUser = (username) => {
  return request({
    method: 'DELETE',
    url:  `/api/profiles/${username}/follow`,
  })
}