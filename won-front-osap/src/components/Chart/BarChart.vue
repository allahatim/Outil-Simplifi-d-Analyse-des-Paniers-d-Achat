<template>
  <div id="bar-chart">
    <apexchart
      :key="chartKey"
      type="bar"
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
  name: 'BarChart',
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

    const chartOptions = reactive({
      chart: {
        type: 'bar',
        height: 320,
      },
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: false,
        },
      },
      xaxis: {
        categories: [] as string[],
      },
      yaxis: {
        title: {
          text: 'Sales ($)',
        },
      },
      title: {
        text: 'Sales Distribution by Category',
        align: 'left',
      },
    });

    const series = ref([
      {
        name: 'Sales',
        data: [] as number[],
      },
    ]);

    const chartKey = ref(0);

    const fetchSalesData = async () => {
      const { dateRange } = props.filters;
      await analyticsStore.fetchSalesByCategory(dateRange);
      const salesData = analyticsStore.salesByCategory;

      chartOptions.xaxis.categories = salesData.map((item) => item.category);
      series.value[0].data = salesData.map((item) => {
        const percentage = parseFloat(item.percentage.replace('%', ''));
        return isNaN(percentage) ? 0 : parseFloat(percentage.toFixed(2));
      });

      chartKey.value++;
    };

    watch(
      () => props.filters,
      () => {
        fetchSalesData();
      },
      { deep: true }
    );

    onMounted(fetchSalesData);

    return {
      chartOptions,
      series,
      chartKey,
    };
  },
});
</script>

<style scoped>
#bar-chart {
  max-width: 100%;
  margin: auto;
  text-align: center;
}
</style>