import React, { useContext, useState } from "react";
import Head from "next/head";
import FadeLoader from "react-spinners/BeatLoader"
import { toast } from 'react-toastify';
import { Logo } from "../components/logo/Logo";
import { motion } from "framer-motion"
import {
  Container,
  AreaLogin,
  Textlogar,
  AreaInput,
  Input,
  ButtonLogar,
  ButtonLogando,
  AreaSelect,
  Select,
  AreaTitle,
  ContainerLogin
} from '../../styles/login/styles';

import { AuthContext } from "../contexts/AuthContext";

import { canSSRGuest } from "../utils/canSSRGuest";
import { backdropClasses } from "@mui/material";
import { background } from "@chakra-ui/react";



export default function SignIn() {
  const { SignIn, load } = useContext(AuthContext)

  const carregando = load

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [company, setCompany] = useState('')


  console.log('Load', load);

  async function handleLogin(event) {
    event.preventDefault();
    if (email === '' || password === '') {
      toast.error('Preencha todos os campos!')

      console.log("Preencha todos campos")
      return;
    }
    //setLoading(true)
    let data = {
      email,
      password,
    }
    await SignIn(data);
    //setLoading(false)

  }


  // async function handleLogin(event) {
  //   event.preventDefault();
  //   if(email === '' || password === '' || company === ''){
  //     toast.error('Preencha todos os campos!')

  //     console.log("Preencha todos campos")
  //     return;
  //   }
  //   setLoading(true)
  //     let data = {
  //       email,
  //       password,
  //       company
  //     }
  //     await SignIn(data);
  //     setLoading(false)      
  // }

  return (
    <>
      <Head>
        <title>Podium - Login</title>
      </Head>
      <Container>
        <ContainerLogin onSubmit={handleLogin}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <AreaLogin >
              <AreaInput>
                <AreaTitle>
                  <Logo />
                </AreaTitle>
                <Input
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}

                />
                <Input
                  placeholder="Senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <AreaSelect>
                  <Select
                    name="Selecione a empresa"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  >
                    <option value="">Selecione a empresa</option>
                    <option value="1">Podium</option>
                  </Select>
                </AreaSelect>

                {
                  !load ?
                    (
                      <ButtonLogar type="submit">
                        <Textlogar>Acessar</Textlogar>
                      </ButtonLogar>
                    )
                    :
                    (
                      <ButtonLogando disabled={true}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Textlogar>Carregando</Textlogar>
                          <div style={{ display: 'flex', alignItems: "flex-end", justifyContent: "flex-end", height: 20 }}>
                            <FadeLoader
                              color={"#fff"}
                              size={5}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          </div>
                        </div>
                      </ButtonLogando>
                    )
                }
              </AreaInput>
            </AreaLogin>
          </motion.div>
        </ContainerLogin>
      </Container>
    </>
  )
}


export const getServerSideProps = canSSRGuest(async (ctx) => {
  // Verifique a validade do token aqui
   //const token = ctx.req.cookies.token;

  // console.log("Meu token getServerSideProps", token)

  // if (token || tokenIsExpired(token)) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: {}
  }

});


