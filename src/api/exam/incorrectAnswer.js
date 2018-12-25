import request from '@/router/axios'

export function getIncorrectAnswerList(query) {
  return request({
    url: '/exam/incorrectAnswer/incorrectAnswerList',
    method: 'get',
    params: query
  })
}
