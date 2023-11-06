import axios, { AxiosResponse } from 'axios'
import { instance } from 'configs/axios'
import { Result, ContactInputValue } from 'types/setting'

export const advertise = {
  async sendEmail(name: string, email: string): Promise<Result> {
    try {
      await instance('/api/advertise/email/send', {
        method: 'POST',
        data: {
          name: name,
          email: email,
        },
      })
      return {
        result: 'success',
        message: '이메일이 발송되었습니다. 메일함을 확인해주세요.',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          result: 'fail',
          message: '이메일 발송에 실패하였습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },

  async confirmEmail(name: string, email: string, code: string): Promise<Result> {
    try {
      /* const response: AxiosResponse =  */ await instance(
        '/api/advertise/email/confirm',
        {
          method: 'GET',
          params: {
            name: name,
            email: email,
            code: code,
          },
        },
      )
      //if (response.data.isEmailTokenValid) {
      return { result: 'success', message: '인증이 완료되었습니다.' }
      /* } else {
        return { result: 'fail', message: '인증번호가 일치하지 않습니다.' }
      } */
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          result: 'fail',
          message: '인증번호 확인에 실패하였습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },

  async addAdvertise(body: ContactInputValue): Promise<Result> {
    try {
      await instance('/api/advertise/add', {
        method: 'POST',
        data: body,
      })
      return {
        result: 'success',
        message: '광고/제휴문의 등록이 완료되었습니다.',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          result: 'fail',
          message: '광고/제휴문의 등록에 실패하였습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },
}
