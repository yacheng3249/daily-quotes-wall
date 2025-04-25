import { mockQuotes } from "./mockQuotes";

export const fetchDailyQuote = () => {
  const random = Math.floor(Math.random() * mockQuotes.length);
  return Promise.resolve(mockQuotes[random]);
};

export const fetchQuoteByEmotion = (emotion: string) => {
  const filteredQuotes = mockQuotes.filter((q) => q.emotion === emotion);
  const random = Math.floor(Math.random() * filteredQuotes.length);
  return Promise.resolve(filteredQuotes[random]);
};
