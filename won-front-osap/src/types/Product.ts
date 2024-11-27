export interface Product {
    productId: string;
    productName: string;
    price: number;
    category: string;
    totalSales: number;
  }
  
  export interface ProductSale {
    productId: string;
    quantitySold: number;
    totalRevenue: number;
  }
  
  export interface ProductCategory {
    categoryName: string;
    totalSales: number; 
    percentage: number; 
  }
  