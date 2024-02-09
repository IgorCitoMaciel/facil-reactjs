import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import axios from 'axios';
import { api } from '../services/apiClient';


//import { getSortedRoutes } from 'next/dist/shared/lib/router/utils';

export const AuthContext = createContext();

export function signOut() {
  try {
    destroyCookie(undefined, '@facil.token', { path: '/' });
    Router.push('/')
    console.log('Minha Rota', Router.pathname)
    console.log('Caiu no Try SignOut')
  } catch {
    console.log("Erro ao deslogar")
  }
}



export function AuthProvider({ children }) {

  const [user, setUser] = useState({})
  const [load, setLoad] = useState(false)
  //const router = useRouter()


  // function loadStorage() {
  //   const storageUser = localStorage.getItem('@AuthUser')
  //   setUser(JSON.parse(storageUser))

  //   const { '@facil.token': token } = parseCookies();
  //   console.log('Meu Token...', token)
  // }

  useEffect(() => {
    const { '@facil.token': token } = parseCookies();
    if(token){
      api.get('/me').then(response => {
        const { id, email, category_id } = response.data;
        setUser({ id, email, category_id })
      }).catch(() => {
        signOut()
      })
    }
    //loadStorage();

  }, [])


  async function SignIn({ email, password }) {
    try {
      console.log("caiu no try login")
      const response = await api.post("/session", {
        email,
        password,
      })
      console.log("meu data login", response.data)

      const { token } = response.data;

      setCookie(undefined, '@facil.token', token, {
        maxAge: 60 * 60 * 24 * 30, // expirar em 1 mes
        path: "/" // todos os caminhos terao acesso ao cookies
      })

      setUser(response.data)

      api.defaults.headers.common['Authorization'] = `Bearer ${token}` // a api utilizara nosso token
      // Router.push('/CentroCusto/OrdemCompra')

      toast.success('Logado com sucesso!')

      Router.push('/Ateste')

      // toast.success('Logado com sucesso!')
    } catch (err) {
      toast.error('Verifique os campos digitados!')
      console.log("Erro ao logar", err)

    }
  }

  return (
    <AuthContext.Provider value={{ user, load, SignIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}





// async function SignIn({ email, password}){
//   setLoad(true)
//   var data
//   data =  {
//     email: email,
//     password: password,
//   }
//  await axios.post('http://localhost:3333/session', data)
//   .then( function(response) {
//      if (response.status === 200) {
//        //console.log('CAIU NOS 200 LOGIN', response.data.user);
//        localStorage.setItem('@AuthUser', JSON.stringify(response.data.user))

//        const usuario = localStorage.getItem('@AuthUser')
//       // console.log('RESULT LOGIN', userStorage)
//        setUser(JSON.parse(usuario))
//        toast.success('Logado com sucesso!')

//        const {token} = response.data
//        setCookie(undefined,'@facil.token', token, {
//          maxAge: 60 * 60 * 24 * 30, // expirar em 1 mes
//          path: "/" // quais caminhos terao acesso ao cookies
//        })
//        //Router.push('/Home')
//        Router.push('/CentroCusto/OrdemCompra')
//      }
//      setLoad(false)
//   })
//   .catch(function(error){
//    toast.error('Verifique os campos digitados!')
//     console.log('ERRO AO LOGAR',error);
//     setLoad(false)
//   })

// }