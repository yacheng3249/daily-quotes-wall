<script lang="ts" setup>
import { ref, watch } from "vue";
import type { Quote } from "@/types/index";
const emotionSelection = ["Happy", "Chill", "Angry", "Sad"];
const quote = ref<Quote>({
  id: "",
  text: "",
  author: "",
  emotion: "Happy",
});
const errorMessage = ref<{
  text: string;
}>({
  text: "",
});
const isValid = (): boolean => {
  if (!quote.value.text.trim()) {
    errorMessage.value.text = "請輸入語錄內容";
    return false;
  }

  if (quote.value.text.length > 200) {
    errorMessage.value.text = "語錄內容過長，請限制在200字以內";
    return false;
  }

  return true;
};
const handleSubmit = () => {
  if (!isValid()) return;
  if (quote.value.author.trim() === "") {
    quote.value.author = "匿名";
  }
  // console.log("Submitted Quote:", quote.value);
};

watch(
  () => quote.value.text,
  (newText) => {
    if (newText.trim() && errorMessage.value.text) {
      errorMessage.value.text = "";
    }
    if (newText.trim() === "") {
      errorMessage.value.text = "請輸入語錄內容";
    }
  }
);
</script>

<template>
  <div class="contribute-page">
    <h2>投稿語錄</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="quote-text" class="required">語錄內容</label>
        <textarea
          id="quote-text"
          v-model="quote.text"
          placeholder="請輸入想要分享的語錄..."
          rows="4"
        />
        <span v-if="errorMessage.text" class="error-message">{{
          errorMessage.text
        }}</span>
      </div>
      <div class="form-group">
        <label for="author">作者（可選）</label>
        <input id="author" type="text" v-model="quote.author" />
      </div>
      <div class="form-group">
        <label class="required">情緒分類</label>
        <div class="emotion-group">
          <button
            v-for="(emotion, index) in emotionSelection"
            :key="index"
            type="button"
            :class="{ selected: quote.emotion === emotion }"
            :aria-label="emotion"
            @click="quote.emotion = emotion"
          >
            {{ emotion }}
          </button>
        </div>
      </div>
      <button class="submit-btn" type="submit">送出語錄</button>
      <div v-if="quote.text.trim()" class="preview-box">
        <div class="quote">“{{ quote.text }}”</div>
        <div class="author">— {{ quote.author || "匿名" }}</div>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
$primary: #3b82f6;

.contribute-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .required {
    display: inline-flex;
    &::after {
      content: "*";
      color: red;
    }
  }

  label {
    font-weight: 500;
  }

  input[type="text"],
  textarea,
  select {
    width: 100%;
    padding: 0.75rem 1rem;
    margin-bottom: 1.5rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s;

    &:focus {
      border-color: #6366f1;
      outline: none;
    }
  }

  .error-message {
    color: red;
    font-size: 0.9rem;
    margin-top: -2rem;
    margin-bottom: 1.5rem;
  }

  .emotion-group {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;

    button {
      flex: 1;
      padding: 0.75rem;
      font-size: 1.2rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      background-color: #f9f9f9;
      cursor: pointer;
      transition: background-color 0.2s, border-color 0.2s;

      &.selected {
        background-color: #dbeafe;
        border-color: $primary;
      }
    }
  }

  .submit-btn {
    display: block;
    width: 100%;
    padding: 0.9rem;
    font-size: 1rem;
    background-color: $primary;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #2563eb;
    }
  }

  .preview-box {
    margin-top: 2rem;
    padding: 1.5rem;
    background: #f3f4f6;
    border-left: 4px solid $primary;
    border-radius: 0.5rem;

    .quote {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    .author {
      font-style: italic;
      color: #6b7280;
      text-align: right;
    }
  }
}
</style>
