<script setup lang="ts">
import { ref, onMounted } from "vue"
import VacationCard from "./VacationCard.vue"
import { api } from "../data/apiWrapper"

// state
const vacations = ref<any[]>([])

// load vacations from API
onMounted(async () => {
  vacations.value = await api.vacations.getAll()
})
</script>

<template>
  <div>
    <h1>Vacations</h1>
    <div id="vacations-container">
      <VacationCard
        v-for="vac in vacations"
        :key="vac.id"
        :image="vac.imageUrl"
        :title="vac.title"
        :description="vac.description"
        :price="vac.price"
      />
    </div>
  </div>
</template>

<style scoped>
#vacations-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>