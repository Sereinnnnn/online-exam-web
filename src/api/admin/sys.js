import request from '@/router/axios'

export function getSysConfig() {
  return request({
    url: '/admin/api/v1/sysConfig',
    method: 'get'
  })
}
