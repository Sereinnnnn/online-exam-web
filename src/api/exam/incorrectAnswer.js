import request from '@/router/axios'

const baseIncorrectAnswerUrl = '/exam/api/v1/incorrectAnswer/'

export function getIncorrectAnswerList(query) {
  return request({
    url: baseIncorrectAnswerUrl + 'incorrectAnswerList',
    method: 'get',
    params: query
  })
}
