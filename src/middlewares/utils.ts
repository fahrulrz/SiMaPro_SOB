import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: number;
  email: string;
  name: string;
  role: string;
  exp: number;
  iat: number;
}

export function decodeToken(token: string): DecodedToken {
  return jwtDecode<DecodedToken>(token);
}
