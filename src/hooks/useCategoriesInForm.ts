import { computed } from "vue";
import useLookup from "./useLookup";

export default function useCategoriesInForm() {
  const { data: categories } = useLookup("categories");
  const options = computed(() => {
    if (categories.value) {
      return categories.value.data.map((e: any) => ({
        label: e.name,
        value: e.id,
      }));
    }
    return [];
  });

  return { options };
}
