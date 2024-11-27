<template>
  <div class="charts-container">
    <Filter @filter="handleFilter" />
    <div class="charts">
      <BarChart :filters="filters" />
      <PieChart :filters="filters" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import Filter from '../components/Filters/Filter.vue';
import PieChart from '../components/Chart/PieChart.vue';
import BarChart from '../components/Chart/BarChart.vue';
export default defineComponent({
  components: {
    Filter,
    BarChart,
    PieChart,
  },
  setup() {
    const filters = ref<{ dateRange: string }>({ dateRange: '7_days' });

    const handleFilter = (newFilters: { dateRange: string }) => {
      filters.value = newFilters;
    };

    return { filters, handleFilter };
  },
});
</script>

<style scoped>
.charts-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.charts {
  display: flex;
  gap: 2rem;
}
</style>
