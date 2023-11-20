import { instance } from 'configs/axios'

interface getUrlParam {
  aptId: string
  file: any
}

export const utilService = {
  async getImgUrl(param: getUrlParam) {
    const { aptId, file } = param
    console.log('전송되는 폼 객체', file)
    console.log('스프레드 연산자로 열어보기', [...file])

    try {
      const response = await instance(`/api/${aptId}/attach`, {
        method: 'post',
        data: file,
        headers: {
          'Cpmtent-Type': 'multipart/form-data',
        },
      })
      console.log('제발', response)
    } catch (error) {
      console.error(error)
    }
  },
}
