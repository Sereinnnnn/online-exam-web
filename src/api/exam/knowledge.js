import request from '@/router/axios'

export function fetchKnowledgeList(query) {
  return request({
    url: '/exam/knowledge/knowledgeList',
    method: 'get',
    params: query
  })
}

export function getObj(id) {
  return request({
    url: '/exam/knowledge/' + id,
    method: 'get'
  })
}
