import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/exam/examRecord/examRecordList',
    method: 'get',
    params: query
  })
}

export function getObj(id, query) {
  return request({
    url: '/exam/examRecord/' + id,
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/exam/examRecord/',
    method: 'post',
    data: obj
  })
}
