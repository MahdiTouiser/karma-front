import { AuthData } from '../models/auth.models'

export function getAuthDataFromLocal(): AuthData | null {
  const authDataJson = localStorage.getItem('authData')
  if (!authDataJson) {
    return null
  }
  const authData: AuthData = JSON.parse(authDataJson)
  return authData
}

export function updateAuthDataInLocal(updatedData: Partial<AuthData>) {
  let authData = getAuthDataFromLocal()
  if (authData) {
    authData = { ...authData, ...updatedData }
    setAuthDataInLocal(authData)
  }
}

export function setAuthDataInLocal(authData: AuthData) {
  localStorage.setItem('authData', JSON.stringify(authData))
}

export function removeAuthDataFromLocal() {
  localStorage.removeItem('authData')
}
