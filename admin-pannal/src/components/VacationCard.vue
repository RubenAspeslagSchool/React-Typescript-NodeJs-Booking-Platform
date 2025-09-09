<template>
    <div class="vacation-card">
      <img :src="image" alt="Vacation Image">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <p>Price: ${{ price }}</p>
      <button @click="toggleFollow">{{ isFollowing ? 'Unfollow' : 'Follow' }}</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue"
  
  // Props
  interface Props {
    image: string
    title: string
    description: string
    price: number
  }
  
  const props = defineProps<Props>()
  
  // Local state
  const isFollowing = ref(false)
  
  // Methods
  function toggleFollow() {
    isFollowing.value = !isFollowing.value
  }
  </script>
  
  <style scoped>
  .vacation-card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 0.5rem;
    width: 200px;
  }
  .vacation-card img {
    width: 100%;
    height: auto;
  }
  </style>