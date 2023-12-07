import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FiHome, FiTruck, FiFolder, FiShoppingCart, FiFileText, FiLayers, FiDollarSign, FiPower} from 'react-icons/fi'
import { MdOutlineMonetizationOn, MdAutoAwesomeMotion } from 'react-icons/md'
import Link from 'next/link';
import { Logo } from '../logo/Logo';
import { BtnDeslogar } from './styles';

export default function SideBar() {
  const { signOut } = useContext(AuthContext)
  return (
    <div id='header'>
      <ProSidebar>
        <Menu iconShape="square">
          <SidebarHeader style={{ backgroundColor: '#f5f5f5' }}>
            <div className="sidebar-header">
              <Logo />
            </div>
          </SidebarHeader>

          {/* <MenuItem icon={<FiBarChart2 />}>
            <Link href="/Home">Dashboard</Link>
          </MenuItem> */}
          <SubMenu icon={<MdOutlineMonetizationOn />} title="Centro de custo">
            <MenuItem icon={<FiShoppingCart />}>
              <Link href="/CentroCusto/OrdemCompra">Ordem de compra</Link>
            </MenuItem>
            <MenuItem icon={<FiFolder />}>
              <Link href="/CentroCusto/ListagemOc">Listagem OC</Link>
            </MenuItem>
            <MenuItem icon={<FiFolder />}>
              <Link href="/CentroCusto/ListagemOcAprovadas">OC Aprovadas</Link>
            </MenuItem>
            <MenuItem icon={<FiFolder />}>
              <Link href="/CentroCusto/ListagemOcPaga">OC Pagas</Link>
            </MenuItem>
          </SubMenu>

          <SubMenu icon={<FiHome />} title="Centro de resultado">
            <MenuItem icon={<FiFolder />}>
            <Link href="/CentroResultado/ListagemCr">Listagem CR</Link>
            </MenuItem>
          </SubMenu>

          <SubMenu icon={<FiFileText />} title="Documento">
            <MenuItem icon={<FiLayers />}>
            <Link href="/Documento/ListagemDoc">Listagem Documento</Link>
            </MenuItem>
          </SubMenu>

          {/* <SubMenu icon={<FiDollarSign />} title="Despesa">
            <MenuItem icon={<FiLayers />}>
            <Link href="/Despesa/ListagemDespesa">Listagem Despesa</Link>
            </MenuItem>
          </SubMenu> */}

          <SubMenu icon={<FiTruck />} title="Fornecedor">
            <MenuItem icon={<FiLayers />}>
            <Link href="/Fornecedor/ListarFornecedor">Listar Fornecedor</Link>
            </MenuItem>
          </SubMenu>

          <SubMenu icon={<MdAutoAwesomeMotion />} title="Insumo">
            <MenuItem icon={<FiLayers />}>
            <Link href="/Insumo/ListarInsumo">Listar Insumo</Link>
            </MenuItem>
          </SubMenu>

          <SubMenu icon={<FiPower />} title="Desconectar">
            <MenuItem>
              <BtnDeslogar  onClick={()=> signOut()}>Sair</BtnDeslogar>
            </MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </div>
    )
}
