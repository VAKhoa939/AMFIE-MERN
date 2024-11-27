import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  exp: number;
}

export const checkTokenExpiration = (token: string): boolean => {
  const { exp } = jwtDecode<TokenPayload>(token);
  if (Date.now() >= exp * 1000) {
    return true;
  }
  return false;
};
