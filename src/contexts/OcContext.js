import {createContext, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

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
      id: item.id,
      numero_parcela: item.number,
      valor_parcela: item.value,
      data_vencimento: item.date_expire,
      pagamento: !item.payment,
    }

    if (!(user.category?.name === 'Desenvolvimento') && !(user.category?.name === 'Master')) {
      toast.error('Usuário não autorizado!')
      return
    }
    try {
      const result = await axios.put('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/edit_installment/', data)
      await listagemOcAprovada();

      console.log('result', result)

      // setParcelas(parcelas => parcelas.map((parcela)=> {
      //   if(parcela.id === item.id){
      //     return { ...parcela, payment: !parcela.payment }
      //   }
      //   return parcela
      // }))
      
      setParcelas(parcelas => parcelas.map((parcela)=> {
        if(parcela.id === item.id){
          return result.data.installment[0]
        }
        console.log("parcela SETPARCELAS",result.data.installment[0])
        return parcela
      }))
      toast.success('Pagamento parcela alterado com sucesso!');

    } catch (error) {
      console.log('MEU ERRO EditCr =', error);
      toast.error('Erro ao editar ordem de compra!');

    }
  }

  async function listagemOcAprovada() {
    const result = await axios.get('https://app-facil-1cc4efc41cdc.herokuapp.com/finance/list_all_cost_center/?page=' + `${page}` + '&status=True')

    try {
      console.log('CAIU NOS 200 OC APROVADAS', result.data.list_cost_center[1].installment_fk )
      setListaOc(result.data.list_cost_center)
      setMaxPage(result.data.pagination.pages)
      setCount(result.data.pagination.count)
    } catch (error) {
      console.log('CAIU NO ERRO OC APROVADAS')
      console.log('MEU ERRO ListagemOC =', error);
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