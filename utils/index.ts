import axios from "axios";
import jwtDecode from "jwt-decode";
import { CredentialResponse } from "@react-oauth/google";

type Decoded = {
  name: string;
  sub: string;
  picture: string;
};

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: CredentialResponse, addUser: any) => {
  if (response.credential) {
    const decoded: Decoded = jwtDecode(response.credential);
    const user = {
      _id: decoded.sub,
      _type: "user",
      userName: decoded.name,
      image: decoded.picture,
    };
    addUser(user)
    await axios.post(`${BASE_URL}/api/auth`, user);
  }
};


