<template>
  <div class="products-view">
    <Filter @filter="handleFilter" />
    <ProductTable :filters="filters" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProductTable from '../components/Table/ProductTable.vue';
import Filter from '../components/Filters/Filter.vue';

export default defineComponent({
  name: 'ProductsView',
  components: {
    ProductTable,
    Filter,
  },
  setup() {
    const filters = ref<{ dateRange: string }>({ dateRange: '7_days' });

    const handleFilter = (newFilters: { dateRange: string }) => {
      filters.value = newFilters;
    };

    return {
      filters,
      handleFilter,
    };
  },
});
</script>

<style scoped>
.products-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
