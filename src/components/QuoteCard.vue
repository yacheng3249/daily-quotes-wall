<script lang="ts" setup>
defineProps<{
  emotion: string;
  text: string;
  author: string;
}>();
const emit = defineEmits(["toggle-favorite"]);
const cardColors: Record<string, string> = {
  Happy: "happy-card",
  Chill: "chill-card",
  Angry: "angry-card",
  Sad: "sad-card",
};
const tagColors: Record<string, string> = {
  Happy: "happy-tag",
  Chill: "chill-tag",
  Angry: "angry-tag",
  Sad: "sad-tag",
};
</script>

<template>
  <div class="quote-card" :class="cardColors[emotion]">
    <span class="emotion-tag" :class="tagColors[emotion]">{{ emotion }}</span>
    <button class="unfavorite-btn" @click="emit('toggle-favorite')">
      取消收藏
    </button>
    <p class="quote-text">{{ text }}</p>
    <p class="quote-author">- {{ author }}</p>
  </div>
</template>

<style scoped lang="scss">
.quote-card {
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  position: relative;

  &.happy-card {
    background-color: $happy-light;
  }

  &.chill-card {
    background-color: $chill-light;
  }

  &.angry-card {
    background-color: $angry-light;
  }

  &.sad-card {
    background-color: $sad-light;
  }

  .emotion-tag {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
    border-radius: 8px;

    &.happy-tag {
      background-color: $happy-dark;
    }

    &.chill-tag {
      background-color: $chill-dark;
    }

    &.angry-tag {
      background-color: $angry-dark;
    }

    &.sad-tag {
      background-color: $sad-dark;
    }
  }

  .unfavorite-btn {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    background-color: transparent;
    border: none;
    font-size: 0.8rem;
    color: #b91c1c;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #7f1d1d;
    }
  }

  .quote-text {
    font-size: 1.3rem;
    font-weight: bold;
    line-height: 1.5;
    margin: 2rem 0 0.8rem;
    white-space: pre-line;
  }

  .quote-author {
    font-size: 0.95rem;
    color: #666;
  }
}
</style>
