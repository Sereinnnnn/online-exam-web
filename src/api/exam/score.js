import request from '@/router/axios'

export function getScoreList(query) {
  return request({
    url: '/exam/score/scoreList',
    method: 'get',
    params: query
  })
}
