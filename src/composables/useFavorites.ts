import { onMounted, ref } from "vue";
import type { Quote } from "@/types/index";

export function useFavorites() {
  const STORAGE_KEY = "favorites";
  const favoriteQuotes = ref<Quote[]>([]);

  const getFavorites = (): Quote[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  };

  const isFavorited = (quoteId: string): boolean => {
    return favoriteQuotes.value.some((quote: Quote) => quote.id === quoteId);
  };

  const handleToggleFavorite = (data: Quote): void => {
    const newList = isFavorited(data.id)
      ? favoriteQuotes.value.filter((q: Quote) => q.id !== data.id)
      : [...favoriteQuotes.value, data];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    favoriteQuotes.value = newList;
  };

  onMounted(() => {
    favoriteQuotes.value = getFavorites();
  });

  return {
    favoriteQuotes,
    isFavorited,
    handleToggleFavorite,
  };
}
