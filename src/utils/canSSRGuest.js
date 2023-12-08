import React, { useContext, useState } from "react";
import { GetServerSideProps, GetStaticPathsContext, GetServerSidePropsResult} from "next";
import { parseCookies } from "nookies";





//funcao para paginas que só pode ser acessadas por visitantes
export function canSSRGuest(fn){
  //console.log('caiu aqui')

  return async (ctx) => {
    const cookies = parseCookies(ctx); // parseCookies pega os cookies salvos
    
    // Se o cara tentar acessar a pagina, porem tendo já um login salvo, redirecionamos
    if(cookies['@nextauth.token']){
      
      return {
        redirect:{
          //destination: '/Home',
          destination: '/CentroCusto/OrdemCompra',
          permanent: false,
        }
      }
    }
    return await fn(ctx);
  }
}

// import React, { useContext, useState } from "react";
// import { GetServerSideProps, GetStaticPathsContext, GetServerSidePropsResult} from "next";
// import { parseCookies, destroyCookie } from "nookies";





// //funcao para paginas que só pode ser acessadas por visitantes
// export function canSSRGuest(fn){
//   //console.log('caiu aqui')

//   return async (ctx) => {
//     const cookies = parseCookies(ctx); // parseCookies pega os cookies salvos
//     const token = cookies['@facil.token']

//     if(!token){
//       return {
//         redirect:{
//           destination: '/',
//           permanent: false,
//         }
//       }
//     }

//     try{
//       return await fn(ctx);
//     }catch(err){
//       if(err instanceof AuthTokenError){
//         destroyCookie(ctx, '@facil.token', {path: '/'});
//         return {
//           redirect:{
//             destination: '/',
//             permanent: false,
//           }
//         }
//       }
//     }
    
//   }
// }