import axios from 'axios'

const baseUrlDev = 'http://127.0.0.1:3000/dev/'

const baseUrl = process.env.REACT_APP_API_BASE_URL ? process.env.REACT_APP_API_BASE_URL : baseUrlDev

export const axiosInstance = axios.create({
  baseURL: baseUrl,
})

/**
 * @param  url - URL without params - Ex:- /user
 * @param  params - params that needs to be attached to URL - Ex:- [1,3]
 * @returns URL padded with params i.e /user/1/3
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addParamsToUrl = (url: string, params: any[]) => {
  let urlWithParams = url
  if (Array.isArray(params)) {
    params.forEach((param) => {
      urlWithParams = `${urlWithParams}/${param}`
    })
  }
  return urlWithParams
}

export const useFetch = () => {


  const fetchRest = async (
    request: {
      url: string
      method: 'GET' | 'POST' | 'DELETE' | 'PUT'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params?: any[]
      queryParams?: any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data?: any
      isFullUrl?: boolean
      headers?: any
    },
  ) => {
    const {
      url,
      method = 'GET',
      params = [],
      queryParams = {},
      data,
      headers = {},
    } = request
    const headersWithAuthorization =headers
    let urlWithParams = params ? addParamsToUrl(url, params) : url
    try {
      const response = await axiosInstance.request({
        method,
        url: urlWithParams,
        params: queryParams,
        data: method !== 'GET' ? data : undefined,
        headers: headersWithAuthorization,
      })
      if (response.data) {
        return await Promise.resolve(response)
      }
      return await Promise.reject(response)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  return { fetchRest }
}
