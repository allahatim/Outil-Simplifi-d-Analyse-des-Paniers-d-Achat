import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getTotalSalesForPeriod, getTopSellingProducts, getSalesByCategory, getProductsWithDetails } from '../services/analyticsService';
import { SaleAnalytics } from '../types/Sale';
import { Product } from '../types/Product';

export const useAnalyticsStore = defineStore('analytics', () => {
  const totalSales = ref<number>(0);
  const topSellingProducts = ref<SaleAnalytics['trendingProducts']>([]);
  const salesByCategory = ref<SaleAnalytics['categorySales']>([]);
  const products = ref<Product[]>([]);

  const fetchTotalSalesForPeriod = async (period: '7_days' | '30_days' | '12_months') => {
    try {
      totalSales.value = await getTotalSalesForPeriod(period);
    } catch (error) {
      console.error('Error fetching total sales:', error);
    }
  };

  const fetchTopSellingProducts = async (period: '7_days' | '30_days' | '12_months') => {
    try {
      topSellingProducts.value = await getTopSellingProducts(period);
    } catch (error) {
      console.error('Error fetching top-selling products:', error);
    }
  };

  const fetchSalesByCategory = async (period: '7_days' | '30_days' | '12_months') => {
    try {
      salesByCategory.value = await getSalesByCategory(period);
    } catch (error) {
      console.error('Error fetching sales by category:', error);
    }
  };

  const fetchProductsWithDetails = async (period: '7_days' | '30_days' | '12_months') => {
    try {
      products.value = await getProductsWithDetails(period);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  return {
    totalSales,
    topSellingProducts,
    salesByCategory,
    products,
    fetchTotalSalesForPeriod,
    fetchTopSellingProducts,
    fetchSalesByCategory,
    fetchProductsWithDetails
  };
});
