import axios from 'axios';
import { SaleAnalytics } from '../types/Sale';
import { Product } from '../types/Product';

const API_URL = 'http://localhost:3000/api';

export const getTotalSalesForPeriod = async (period: '7_days' | '30_days' | '12_months'): Promise<number> => {
  try {
    const response = await axios.get(`${API_URL}/sales/total/${period}`);
    return response.data.totalSales;
  } catch (error) {
    console.error('Error fetching total sales:', error);
    throw error;
  }
};

export const getTopSellingProducts = async (period: '7_days' | '30_days' | '12_months'): Promise<SaleAnalytics['trendingProducts']> => {
  try {
    const response = await axios.get(`${API_URL}/sales/top-products/${period}`);
    return response.data.topProducts;
  } catch (error) {
    console.error('Error fetching top-selling products:', error);
    throw error;
  }
};

export const getSalesByCategory = async (period: '7_days' | '30_days' | '12_months'): Promise<SaleAnalytics['categorySales']> => {
  try {
    const response = await axios.get(`${API_URL}/sales/category/${period}`);
    return response.data.salesByCategory;
  } catch (error) {
    console.error('Error fetching sales by category:', error);
    throw error;
  }
};

export const getProductsWithDetails = async (period: '7_days' | '30_days' | '12_months'): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/products/details/${period}`);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};
