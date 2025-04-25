<script lang="ts" setup>
import QuoteCard from "@/components/QuoteCard.vue";
import { useFavorites } from "@/composables/useFavorites";
const { favoriteQuotes, handleToggleFavorite } = useFavorites();
</script>

<template>
  <div class="favorites-page">
    <h2>我的收藏</h2>
    <div class="quotes-list">
      <template v-if="favoriteQuotes.length">
        <QuoteCard
          v-for="quote in favoriteQuotes"
          :key="quote.id"
          :emotion="quote.emotion"
          :text="quote.text"
          :author="quote.author"
          @toggle-favorite="handleToggleFavorite(quote)"
        />
      </template>
      <div v-else class="empty-state">還沒有收藏的語錄</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.favorites-page {
  min-height: 100vh;
  background-color: #fffdf4;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #92400e;
  }

  .quotes-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 700px;

    .empty-state {
      text-align: center;
      padding: 2rem;
      color: #666;
      font-size: 1.1rem;
    }
  }
}
</style>
