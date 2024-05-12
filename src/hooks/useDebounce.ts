import { Ref, UnwrapRef, watch } from "vue";
import useState from "./useState";

export default function useDebounce<T>(
  dep: Ref<UnwrapRef<T>>,
  cb: (new_val: UnwrapRef<T>, prev: UnwrapRef<T>) => void,
  delay: number = 1000
) {
  const [timeout, set_timeout] = useState<NodeJS.Timeout | null>(null);

  watch(dep, (new_val, prev) => {
    if (timeout.value !== null) {
      clearTimeout(timeout.value);
    }

    const search_timeout = setTimeout(() => {
      cb(new_val, prev);
    }, delay);

    set_timeout(search_timeout);
  });
}
