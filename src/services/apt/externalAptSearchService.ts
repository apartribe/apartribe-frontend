import axios from 'axios'

interface SearchParam {
  keyword: string
  lng: number
  lat: number
}

export const externalAptSearchService = {
  async search(param: SearchParam) {
    const { keyword, lng, lat } = param
    try {
      const response = await axios({
        method: 'get',
        baseURL: 'https://hogangnono.com/api/v2/searches/suggestions/new',
        params: {
          query: keyword,
          x: lng,
          t: lat,
        },
      })
      return response.data.data.matched.apt.list
    } catch (error) {
      console.error(error)
    }
  },
}
