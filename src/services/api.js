import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { signOut } from "../contexts/AuthContext";

export function setupAPIClient(ctx = undefined) {

  const cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${cookies['@facil.token']}`
    }
  });

  api.interceptors.response.use((response) => {
    //console.log(response);
    return response;
  }, (error) => {
    if (error.response.status === 401) {
      console.log(error.response.status);
      if (typeof window === 'undefined') {
        // deslogar o usuario
        signOut();

      } else {
        return Promise.reject(new Error('Unauthorized, error with authentication token'));
      }
    }

    return Promise.reject(error);

  });
  return api;
}