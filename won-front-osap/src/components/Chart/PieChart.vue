<template>
  <div id="pie-chart">
    <apexchart
      :key="chartKey" 
      type="pie"
      width="520"
      height="520"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, onMounted } from 'vue';
import { useAnalyticsStore } from '../../store';
import Chart from 'vue3-apexcharts';

export default defineComponent({
  name: 'PieChart',
  components: {
    apexchart: Chart,
  },
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const analyticsStore = useAnalyticsStore();
    const chartKey = ref(0);

    const chartOptions = reactive({
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Top Selling Products',
        align: 'center',
      },
      labels: [] as string[],
    });

    const series = ref<number[]>([]);

    const fetchTopSellingProductsData = async () => {
      const { dateRange } = props.filters;
      await analyticsStore.fetchTopSellingProducts(dateRange);
      const topSellingProducts = analyticsStore.topSellingProducts;

      const labels = topSellingProducts.map(item => item.productName);

      chartOptions.labels = labels;
      series.value = topSellingProducts.map(item => item.totalQuantity);

      chartKey.value++;
    };

    watch(
      () => props.filters,
      () => {
        fetchTopSellingProductsData();
      },
      { deep: true }
    );

    onMounted(fetchTopSellingProductsData);

    return {
      chartOptions,
      series,
      chartKey,
    };
  },
});
</script>

<style scoped>
#pie-chart {
  max-width: 100%;
  margin: auto;
  text-align: center;
}
</style>