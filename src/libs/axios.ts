import { env } from "@/common";
import { getIdToken } from "@/modules/auth";
import Axios from "axios";

const idToken = await getIdToken();

export const api = Axios.create({
  baseURL: env.API_URL,
  headers: {
    Authorization: `Bearer ${idToken}`,
  },
});
