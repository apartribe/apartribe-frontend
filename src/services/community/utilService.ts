import { instance } from 'configs/axios'

interface getUrlParam {
  aptId: string
  file: FormData
}

export const utilService = {
  async getImgUrl(param: getUrlParam) {
    const { aptId, file } = param

    try {
      const response = await instance(`/api/${aptId}/attach`, {
        method: 'post',
        data: file,
        headers: {
          'Cpmtent-Type': 'multipart/form-data',
        },
      })
      return response.data.data[0]
    } catch (error) {
      console.error(error)
    }
  },
}
