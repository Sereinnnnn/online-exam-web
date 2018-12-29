import request from '@/router/axios'

export function getScoreList(query) {
  return request({
    url: '/exam/score/scoreList',
    method: 'get',
    params: query
  })
}

export function getScore(query) {
  return request({
    url: '/exam/score/score',
    method: 'get',
    params: query
  })
}
