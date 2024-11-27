<template>
  <div class="container mt-4">
    <h1>Product List</h1>
    <p>This table displays a list of products.</p>
    <DataTable
      v-if="Array.isArray(products)"
      :columns="columns"
      :data="products"
      class="table table-hover table-striped"
      width="100%"
    >
      <template #empty>
        <tr>
          <td colspan="4" class="text-center">No products available.</td>
        </tr>
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { useAnalyticsStore } from '../../store';
import { Product } from '../../types/Product';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
DataTable.use(DataTablesCore);

export default defineComponent({
  name: 'ProductTable',
  components: {
    DataTable,
  },
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const analyticsStore = useAnalyticsStore();

    const columns = [
      { data: 'productName', title: 'Product Name' },
      { data: 'category', title: 'Category' },
      { data: 'price', title: 'Price' },
      { data: 'totalSales', title: 'Total Sales' },
    ];

    const products = ref<Product[]>([]);

    const fetchProducts = async () => {
      try {
        await analyticsStore.fetchProductsWithDetails(props.filters.dateRange);
        products.value = analyticsStore.products || [];
      } catch (error) {
        console.error("Error fetching products:", error);
        products.value = [];
      }
    };

    onMounted(fetchProducts);
    watch(() => props.filters, fetchProducts, { deep: true });

    return {
      columns,
      products,
    };
  },
});
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
@import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
</style>