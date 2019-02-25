import request from '@/router/axios'

export function attachmentConfig() {
  return request({
    url: '/admin/attachment/attachmentConfig',
    method: 'get'
  })
}
