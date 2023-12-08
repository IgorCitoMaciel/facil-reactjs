import { destroyCookie, parseCookies } from "nookies";


//funcao para paginas que só users logados podem ter acesso
export function canSSRAuth(fn){
  //console.log('caiu aqui')

  return async (ctx) => {
    const cookies = parseCookies(ctx);

    const token = cookies['@facil.token']
    
    // Se o cara tentar acessar a pagina, porem tendo já um login salvo, redirecionamos
    if(!token){     
      return {
        redirect:{
          destination: '/',
          permanent: false,
        }
      }
    }
    try{
      return await fn(ctx);
    }catch(err){
      if(err){
        destroyCookie(ctx, '@facil.token');
        return {
          redirect:{
            destination: '/',
            permanent: false,
          }
        }
      }
    }
  }
}