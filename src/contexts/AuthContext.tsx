import { createUserWithEmailAndPassword, onAuthStateChanged, onIdTokenChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Router from "next/router";
import nookies, { setCookie } from "nookies";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authClient } from "../services/firebaseClient";

interface AuthProviderProps {
  children: ReactNode
}

type AuthContextData = {
  createNewUser: (credentials: UserCredentials) => void
  login: (credentials: UserCredentials) => void
  user?: User | null
  logout: () => void
}

type UserCredentials = {
  email: string
  password: string
}

type User = {
  userEmail: string,
  uid: string
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>()  

  // useEffect(() => {
  //   return onAuthStateChanged(authClient, async (user) => {
  //     console.log(user)
  //     if (!user) {
  //       console.log("here")
  //       setUser(null)
  //       nookies.destroy({}, "words.token")
  //     }
  //   })
  // }, [])

  useEffect(() => {
    return onIdTokenChanged(authClient, async (user) => {
      if (!user) {
        setUser(null)
        nookies.destroy(undefined, "words.token", {
          path: "/"
        })
        return
      } 


      const { token } = await user.getIdTokenResult()
      setCookie(undefined, "words.token", token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/"
      })
      setUser({ uid: user?.uid!, userEmail: user?.email! })
      }
    )
  }, [])

  // force refresh the token every 15 seconds
  // useEffect(() => {
  //   const handle = setInterval(async () => {
  //     console.log(`refreshing token...`);
  //     const user = authClient.currentUser;
  //     console.log("User: ", user)
  //     if (user) await user.getIdToken(true);
  //   }, 20 * 1000);
  //   return () => clearInterval(handle);
  // }, []);

  const createNewUser = async ({ email, password }: UserCredentials) => {
    try {
      const { user } = await createUserWithEmailAndPassword(authClient, email, password)
      setUser({ userEmail: user.email!,  uid: user.uid })

      const { token } = await user.getIdTokenResult()
      setCookie(undefined, "words.token", token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/"
      })
      Router.push("/")
    } catch (error) {
      console.log(error)
    }
  }

  const login = async ({ email, password}: UserCredentials) => {
    try {
      const { user } = await signInWithEmailAndPassword(authClient, email, password)
      setUser({ userEmail: user.email!, uid: user.uid}) 

      Router.push("/")
    } catch (error) {
      console.log(error)
    }
      
  }

  const logout = async () => {
    try {
      nookies.destroy({}, "words.token", {
        path: "/"
      })
      await signOut(authClient)
      Router.push("/account/login")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <AuthContext.Provider value={{ createNewUser, login, user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useUser = () => useContext(AuthContext)