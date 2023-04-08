import axios, { AxiosError } from 'axios'

type Issue = {
  code: string
  expected: string
  message: string
  path: string[]
  received: string
}

type ApiRequests = {
  issues?: Issue[]
}

export const api = axios.create()

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<ApiRequests>) => {
    if (error?.response?.data?.issues?.length) {
      const rawIssues = error?.response?.data?.issues
      const issues = []
      rawIssues.forEach((issue: Issue) => issues.push(issue.message))
      if (issues.length < 0) issues.push('Ocorreu um erro na requisição')
      return Promise.reject(issues)
    } else {
      const error = ['Ocorreu um erro na requisição']
      return Promise.reject(error)
    }
  },
)
