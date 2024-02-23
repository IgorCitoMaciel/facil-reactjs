import {createContext, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import { api } from '../services/apiClient';

export const OcContext = createContext({
  listagemOcAprovada:()=>{}, 
  listaOc: [], 
  maxPage:"", 
  count:0,
  page: 1,
  editParcela: (item)=> {},
  parcelas:[],
  setParcelas:[]
});

export function OcContextProvider ({children}) {
  const [ listaOc ,setListaOc] = useState([])
  const [ maxPage ,setMaxPage] = useState("")
  const [ count ,setCount] = useState(0)
  const [page, setPage] = useState(1);
  const [parcelas, setParcelas] = useState([]);

  const { user } = useContext(AuthContext)

  async function editParcela(item) {
    const data = {
      id: item.centroCustoId, // id do centro de custo
      parcelaId : Number(item.id),
      pagamento : !item.pagamento
    }

    console.log('Meu data EditarParcela', data, user)

    // if (user.userCategory?.name !== 'Desenvolvimento' && user.userCategory?.name !== 'admin') {
    //   toast.error('Usuário não autorizado!')
    //   return
    // }
    try {
      const result = await api.put('/update-centro-custo', data)
      await listagemOcAprovada();
      
      setParcelas(parcelas => parcelas.map((parcela, index)=> {
        if(parcela.id === item.id){
          // Cria uma cópia profunda de result.data.parcelas[index]
          //Essa linha de código está criando uma cópia profunda do objeto result.data.parcelas[index].

          //Em JavaScript, quando você atribui um objeto a uma nova variável, a nova variável aponta para o mesmo objeto,
          // não uma nova cópia dele. Isso significa que se você alterar o objeto original, a nova variável também será alterada,
          //e vice-versa. Isso é chamado de "passagem por referência".
          //No entanto, às vezes você quer criar uma nova cópia de um objeto 
          //que não está ligada ao objeto original. Isso é chamado de "cópia profunda". 
          //Uma maneira de fazer isso em JavaScript é usando JSON.stringify para converter 
          //o objeto em uma string JSON, e então JSON.parse para converter a string de volta
          //em um novo objeto.
          const updatedParcela = JSON.parse(JSON.stringify(result.data.parcelas[index]));
          console.log("updatedParcela = = =",updatedParcela)
          return updatedParcela;
        }
        console.log("parcela SETPARCELAS",result.data.parcelas[index])
        return parcela
      }))
      toast.success('Pagamento parcela alterado com sucesso!');

    } catch (error) {
      console.log('MEU ERRO EditCr =', error);
      toast.error('Erro ao editar ordem de compra!');

    }
  }

  async function listagemOcAprovada() {
    // const result = await api.get('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/list_all_cost_center/?page=' + `${page}` + '&status=True')

    // try {
    //   console.log('CAIU NOS 200 OC APROVADAS', result.data.list_cost_center[1].installment_fk )
    //   setListaOc(result.data.list_cost_center)
    //   setMaxPage(result.data.pagination.pages)
    //   setCount(result.data.pagination.count)
    // } catch (error) {
    //   console.log('CAIU NO ERRO OC APROVADAS')
    //   console.log('MEU ERRO ListagemOC =', error);
    // }
    try {
      const response = await api.get(`/list-centro-custo?page=${page}&pageSize=${10}`)

      setListaOc(response.data)
      setIdUser(user.id)
      setDomLoaded(false);
    } catch (error) {
      console.log('MEU ERRO ListagemOC =', error);
      // setDomLoaded(false);
    }
  }

  useEffect(()=>{
    listagemOcAprovada()
  },[])
  
  return (
    <OcContext.Provider value={{listagemOcAprovada, listaOc, maxPage, count, page, editParcela, parcelas,setParcelas}}>
      {children}
    </OcContext.Provider>
  )
}