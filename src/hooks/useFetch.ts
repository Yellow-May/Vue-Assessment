import { onBeforeUnmount, ref } from "vue";
import { instance } from "@/config/axios";
import { useCookies } from "vue3-cookies";
import { cookie_keys } from "@/constants";
import router from "@/router";
import useAuth from "./useAuth";

export async function logout(token: string, no_request: boolean = false) {
  const { cookies } = useCookies();

  // send logout request
  // don't make call if no_request is true
  if (!no_request) {
    await instance.delete("api/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // clear cookies
  cookies.remove(cookie_keys.AUTH_USER_KEY);
  cookies.remove(cookie_keys.AUTH_TOKEN_KEY);

  // redirect to login page
  router.push({ name: "auth.login" });
}

export default function useFetch() {
  const { token } = useAuth();
  const requestInterceptor = ref<number | null>(null);
  const responseInterceptor = ref<number | null>(null);

  requestInterceptor.value = instance.interceptors.request.use(
    (config) => {
      if (config.headers && !config.headers?.Authorization && token)
        config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    async (error) => await Promise.reject(error)
  );

  responseInterceptor.value = instance.interceptors.response.use(
    (response: any) => response,
    async (error: any) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        // logout when unauthorized 401 reponse
        return await logout(token, false);
      }
      return await Promise.reject(error);
    }
  );

  onBeforeUnmount(function () {
    requestInterceptor.value &&
      instance.interceptors.request.eject(requestInterceptor.value);
    responseInterceptor.value &&
      instance.interceptors.response.eject(responseInterceptor.value);
  });

  return instance;
}
