import query_keys from "./query_keys";
import cookie_keys from "./cookie_keys";

const AUTH_DURATION = 60 * 60 * 24;
const PER_PAGE = +(import.meta.env.VITE_PRODUCTS_PER_PAGE ?? 2);

export { query_keys, cookie_keys, PER_PAGE, AUTH_DURATION };
