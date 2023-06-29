import { LoginResponse } from '../app-type/login.type'
import { AxiosResponse, http } from './http.service'

async function login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
  return await http.post<LoginResponse>(
    import.meta.env.URL,
    {
      email: email,
      password: password,
    }
  )
}

function logout(): void {
    localStorage.removeItem('token')
}

// function getProfile() {}

export { login, logout }
