<template>
  <div class="error-page-wrapper">
    <img src="@/assets/404.svg" class="error-image" alt="" srcset="" />
    <div class="error-code fancy-undeline">404</div>
    <div class="error-message">not found</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@keyframes loop-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.error-page-wrapper {
  display: flex;
  flex-direction: column;
  place-items: center;
  .error-image {
    height: 500px;
    object-fit: contain;
    transform: rotate(0);
    animation: loop-rotate 60s linear infinite;
    &:hover {
      animation-play-state: pause;
    }
  }
  .error-code {
    margin-bottom: 40px;
    font-size: 120px;
    color: #322a2d;
  }
  .error-message {
    font-size: 16px;
    color: #666666;
  }
  .fancy-undeline {
    background-image: linear-gradient(120deg, #ec008c, #fc6767 100%);
    background-repeat: no-repeat;
    background-position: 0 80%;
    background-size: 100% 0.3em;
    transition: background-size 0.25s ease-in;
  }
  .fancy-undeline:hover {
    background-size: 100% 88% !important;
  }
}
</style>
