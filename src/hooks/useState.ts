import { Ref, UnwrapRef, ref } from "vue";

export default function useState<T>(initialState: T) {
  const state = ref<T>(initialState);

  const setState = (
    value: UnwrapRef<T> | ((prev: UnwrapRef<T>) => UnwrapRef<T>)
  ) => {
    if (typeof value === "function") {
      const computed_state = (value as (prev: UnwrapRef<T>) => UnwrapRef<T>)(
        state.value
      );
      state.value = computed_state;
    } else state.value = value;
  };

  return [state, setState] as [
    Ref<UnwrapRef<T>>,
    (newState: UnwrapRef<T> | ((prev: UnwrapRef<T>) => UnwrapRef<T>)) => void
  ];
}
