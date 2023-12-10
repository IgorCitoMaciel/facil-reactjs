import React, { useContext, useState } from "react";
import { GetServerSideProps, GetStaticPathsContext, GetServerSidePropsResult} from "next";
import { parseCookies } from "nookies";





//funcao para paginas que só pode ser acessadas por visitantes
export function canSSRGuest(fn){
  //console.log('caiu aqui')

  return async (ctx) => {
    const cookies = parseCookies(ctx); // parseCookies pega os cookies salvos
    
    // Se o cara tentar acessar a pagina, porem tendo já um login salvo, redirecionamos
    if(cookies['@facil.token']){
      
      return {
        redirect:{
          //destination: '/Home',
          destination: '/',
          permanent: false,
        }
      }
    }
    return await fn(ctx);
  }
}

