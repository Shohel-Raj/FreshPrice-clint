import axios from 'axios'
import useAuth from './useAuth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const useAxiosSecure = () => {
  const navigate = useNavigate()
  const { logOut } = useAuth()

  useEffect(() => {
    // 🔐 Add token to all requests
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth-token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    // 🛑 Handle auth errors globally
    axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        console.log('Error caught from axios interceptor -->', error.response)
        if (error.response.status === 401 || error.response.status === 403) {
          logOut()
          navigate('/login')
        }
        return Promise.reject(error)
      }
    )
  }, [logOut, navigate])
4
  return axiosSecure
}

export default useAxiosSecure
