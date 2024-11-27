export interface SaleAnalytics {
    totalSales: number;
    trendingProducts: TrendingProduct[]; 
    categorySales: CategorySales[]; 
  }
  
  export interface TrendingProduct {
    productId: string;
    productName: string;
    totalQuantity: number; 
    totalRevenue: number; 
  }
  
  export interface CategorySales {
    category: string;
    totalSales: number; 
    percentage: string; 
  }
  