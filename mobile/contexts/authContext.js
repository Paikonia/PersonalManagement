import {useContext, createContext} from 'react'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
  return (
    <AuthContext.Provider value={'Test value'}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext =()=> {
    return useContext(AuthContext)
}
