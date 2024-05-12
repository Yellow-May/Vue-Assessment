import { useCookies } from "vue3-cookies";
import { cookie_keys } from "@/constants";

export type User = {
  id: number;
  email: string;
  name: string;
} | null;

export default function useAuth() {
  const { cookies } = useCookies();

  const user = cookies.get(cookie_keys.AUTH_USER_KEY) as unknown as User;
  const token = cookies.get(cookie_keys.AUTH_TOKEN_KEY);

  return { user, token };
}
