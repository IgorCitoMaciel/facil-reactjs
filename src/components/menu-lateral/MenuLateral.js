import React, { useEffect, useState } from "react";
import { Divider, Drawer, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Box } from "@mui/system";
import { Logo } from "../logo/Logo";
import { useRouter } from "next/router";


export const MenuLateral = ({ children }) => {
  const { pathname } = useRouter();
  const theme = useTheme();

  useEffect(() => {
    async function carregaRota() {
      console.log("Meu pathname no menu", pathname)
      return pathname;
    }
    carregaRota();
  }, []);


  return (
    <>
      <Drawer variant='permanent'>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column" backgroundColor="#1d1d2e">
          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center" color={"#fff"}>
            <Logo />
          </Box>
          <Divider sx={{ color: "#fff", background: "#fff" }} />

          <Box flex={1}>
            {pathname === "/Home" ? (
              <ListItem component="nav" disablePadding
                selected={true}
                sx={{
                  color: "#fff",
                  opacity: 1,
                  bgcolor: "#101026",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex"
                }}>

                <ListItemButton selected={pathname === "/Home"} to="/Home"
                  sx={{ bgcolor: "#101026", height: 50, opacity: 1, }}>
                  {pathname === "/Home" ? (
                    <Box sx={{ height: 50, width: 2.5, bgcolor: "#68a7b8", marginLeft: -1.8, }} />
                  ) : (<Box sx={{ height: 50, width: 2.5, marginLeft: -1.8 }} />)}
                  <ListItemIcon sx={{ color: "#fff", marginLeft: 2 }}>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Página inicial" />
                </ListItemButton>
              </ListItem>
            ) : (
              <List component="nav" sx={{
                color: "#fff",
                opacity: 0.6,
                backgroundColor: "#101026",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                display: "flex"
              }}>

                <ListItemButton selected={pathname === "/Home"} to="/Home"
                  sx={{ bgcolor: "#101026", height: 50, }}>
                  <ListItemIcon sx={{ color: "#fff", marginLeft: 2 }}>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Página inicial" />
                </ListItemButton>
              </List>
            )}

            {pathname === "/CentroCusto" ? (
              <List component="nav" sx={{
                color: "#fff",
                opacity: 1,
                backgroundColor: "#101026",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                display: "flex"
              }}>

                <ListItemButton selected={pathname === "/CentroCusto"} to="/CentroCusto"
                  sx={{ bgcolor: "#101026", height: 50, opacity: 1 }}>
                  {pathname === "/CentroCusto" ? (
                    <Box sx={{ height: 50, width: 2.5, bgcolor: "#68a7b8", marginLeft: -1.8, }} />
                  ) : (<Box sx={{ height: 50, width: 2.5, marginLeft: -1.8 }} />)}
                  <ListItemIcon sx={{ color: "#fff", marginLeft: 2 }}>
                    <CurrencyExchangeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Centro de custo" />
                </ListItemButton>
              </List>
            ) : (
              <List component="nav" sx={{
                color: "#fff",
                opacity: 0.6,
                backgroundColor: "#101026",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                transition: "all 5s  ease-in-out",
                display: "flex"
              }}>

                <ListItemButton selected={pathname === "/CentroCusto"} to="/CentroCusto"
                  sx={{ bgcolor: "#101026", height: 50, }}>
                  {pathname === "/CentroCusto" ? (
                    <Box sx={{ height: 50, width: 10, bgcolor: "#f12", marginLeft: -1.8 }} />
                  ) : (<Box sx={{ height: 50, width: 10, marginLeft: -1.8 }} />)}
                  <ListItemIcon sx={{ color: "#fff", marginLeft: 2 }}>
                    <CurrencyExchangeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Centro de custo" />
                </ListItemButton>
              </List>
            )}

          </Box>

        </Box>
      </Drawer>
      <Box height={'100vh'} marginLeft={theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};