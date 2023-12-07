import {createContext, useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import axios from 'axios';


//import { getSortedRoutes } from 'next/dist/shared/lib/router/utils';

export const AuthContext = createContext();

export function signOut() {
  try{
    destroyCookie(undefined, '@nextauth.token',{path: '/'});
    Router.push('/')
    console.log('Minha Rota', Router.pathname)
    console.log('Caiu no Try SignOut')
  }catch{
    console.log("Erro ao deslogar")
  }  
}



export function AuthProvider({children}){

  const [user, setUser] = useState({})
  const [load, setLoad] = useState(false)
  //const router = useRouter()

  
  function loadStorage() {    
    const storageUser = localStorage.getItem('@AuthUser')
    setUser(JSON.parse(storageUser))

    const { '@nextauth.token': token}  = parseCookies();
    console.log('Meu Token...',token)
  } 

  useEffect(()=>{   

    loadStorage();
  
  },[])


  //console.log("CHAMOU MEU CONTEXTO")
  

 async function SignIn({ email, password}){
   setLoad(true)
   var data
   data =  {
     email: email,
     password: password,
   }
  await axios.post('https://app-facil-1cc4efc41cdc.herokuapp.com/user/login/', data)
   .then( function(response) {
      if (response.status === 200) {
        //console.log('CAIU NOS 200 LOGIN', response.data.user);
        localStorage.setItem('@AuthUser', JSON.stringify(response.data.user))

        const usuario = localStorage.getItem('@AuthUser')
       // console.log('RESULT LOGIN', userStorage)
        setUser(JSON.parse(usuario))
        toast.success('Logado com sucesso!')

        const {token} = response.data
        setCookie(undefined,'@nextauth.token', token, {
          maxAge: 60 * 60 * 24 * 30, // expirar em 1 mes
          path: "/" // quais caminhos terao acesso ao cookies
        })
        //Router.push('/Home')
        Router.push('/CentroCusto/OrdemCompra')
      }
      setLoad(false)
   })
   .catch(function(error){
    toast.error('Verifique os campos digitados!')
     console.log('ERRO AO LOGAR',error);
     setLoad(false)
   })

 }

  return(
    <AuthContext.Provider value={{user,load, SignIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}