<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useFavorites } from "@/composables/useFavorites";
import { fetchDailyQuote, fetchQuoteByEmotion } from "@/services/quoteService";
import type { Quote } from "@/types/index";
const { handleToggleFavorite, isFavorited } = useFavorites();
const emotionTags = ["Happy", "Chill", "Angry", "Sad"];
const emotionColors: Record<string, string> = {
  Happy: "happy-bg",
  Chill: "chill-bg",
  Angry: "angry-bg",
  Sad: "sad-bg",
};
const quote = ref<Quote>({
  id: "",
  text: "",
  author: "",
  emotion: "",
});
const selectedEmotion = ref<string>("Happy");

const loadRandomQuote = async () => {
  const data = await fetchDailyQuote();
  quote.value = data;
  selectedEmotion.value = data.emotion || "Happy";
};

const handleEmotionClick = async (emotion: string) => {
  selectedEmotion.value = emotion;
  const data = await fetchQuoteByEmotion(emotion);
  if (data) {
    quote.value = data;
  }
};

onMounted(() => {
  loadRandomQuote();
});
</script>

<template>
  <div class="home" :class="emotionColors[selectedEmotion]">
    <div class="emotion-tags">
      <button
        v-for="(emotion, index) in emotionTags"
        :key="index"
        class="tag-button"
        :class="{ active: selectedEmotion === emotion }"
        @click="handleEmotionClick(emotion)"
      >
        {{ emotion }}
      </button>
    </div>
    <div class="quote-box">
      <p class="quote-text">{{ quote.text || "Loading..." }}</p>
      <p class="quote-author">— {{ quote.author }}</p>
      <button class="fav-button" @click="handleToggleFavorite(quote)">
        {{ isFavorited(quote.id) ? "⭐️ 已收藏" : "☆ 加入收藏" }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  border-radius: 10px;

  &.happy-bg {
    background: linear-gradient(135deg, $happy-light, $happy-dark);
  }

  &.chill-bg {
    background: linear-gradient(135deg, $chill-light, $chill-dark);
  }

  &.angry-bg {
    background: linear-gradient(135deg, $angry-light, $angry-dark);
  }

  &.sad-bg {
    background: linear-gradient(135deg, $sad-light, $sad-dark);
  }

  .emotion-tags {
    position: absolute;
    top: 2rem;
    display: flex;
    gap: 0.5rem;

    .tag-button {
      background-color: rgba(255, 255, 255, 0.6);
      color: #333;
      padding: 0.4rem 1rem;
      border: none;
      border-radius: 20px;
      font-size: 0.9rem;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: background-color 0.2s;

      &.active {
        background-color: #fff;
        font-weight: bold;
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  .quote-box {
    text-align: center;
    margin-top: 3rem;

    .quote-text {
      font-size: 2rem;
      font-weight: bold;
      line-height: 1.6;
      white-space: pre-line;
      margin-bottom: 1rem;
    }

    .quote-author {
      font-size: 0.95rem;
      color: #555;
    }

    .fav-button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background-color: #fff8dc;
      border: 1px solid #e0c68c;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background-color 0.2s;

      &:hover {
        background-color: #fef3c7;
      }
    }
  }
}
</style>
