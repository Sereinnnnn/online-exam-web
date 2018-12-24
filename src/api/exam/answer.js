import request from '@/router/axios'

export function fetchAnswerList(query) {
  return request({
    url: '/exam/answer/answerList',
    method: 'get',
    params: query
  })
}

export function getAnswer(id) {
  return request({
    url: '/exam/answer/' + id,
    method: 'get'
  })
}

export function addAnswer(obj) {
  return request({
    url: '/exam/answer/',
    method: 'post',
    data: obj
  })
}

export function putAnswer(obj) {
  return request({
    url: '/exam/answer/',
    method: 'put',
    data: obj
  })
}

export function delAnswer(id) {
  return request({
    url: '/exam/answer/' + id,
    method: 'delete'
  })
}

export function saveOrUpdate(obj) {
  return request({
    url: '/exam/answer/saveOrUpdate',
    method: 'post',
    data: obj
  })
}

export function submit(obj) {
  return request({
    url: '/exam/answer/submit',
    method: 'post',
    data: obj
  })
}
