<template>
  <div class="filter-container">
    <div class="filter-item">
      <label for="date-range">Select Date Range</label>
      <select id="date-range" v-model="filters.dateRange" @change="emitFilters">
        <option value="7_days">Last 7 Days</option>
        <option value="30_days">Last 30 Days</option>
        <option value="12_months">Last 12 Months</option>
      </select>
    </div>

    <button @click="resetFilters">Reset Filters</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FilterComponent',
  emits: ['filter'],
  setup(_, { emit }) {
    const filters = ref({
      dateRange: '7_days',
    });

    const emitFilters = () => {
      emit('filter', { ...filters.value });
    };

    const resetFilters = () => {
      filters.value.dateRange = '7_days';
      emitFilters();
    };

    return {
      filters,
      emitFilters,
      resetFilters,
    };
  },
});
</script>
<style scoped>
.filter-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: auto;
}

.filter-item {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

button:hover {
  background-color: #0056b3;
}
</style>
