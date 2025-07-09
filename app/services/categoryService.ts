import { config } from '../config/api';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_id?: number;
  parent_name?: string;
  status: 'active' | 'inactive';
  sort_order: number;
  products_count: number;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
  subcategories?: Category[];
}

export interface CategoryFormData {
  name: string;
  description?: string;
  parent_id?: number | null;
  status?: 'active' | 'inactive';
  sort_order?: number;
  meta_title?: string;
  meta_description?: string;
}

export interface CategoryQuery {
  page?: number;
  limit?: number;
  status?: string;
  parent_id?: string | number;
}

export interface CategoryResponse {
  categories: Category[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

class CategoryService {
  private baseURL = `${config.url}/api/categories`;

  // Get all categories with pagination and filters
  async getCategories(query: CategoryQuery = {}): Promise<CategoryResponse> {
    try {
      const params = new URLSearchParams();
      
      if (query.page) params.append('page', query.page.toString());
      if (query.limit) params.append('limit', query.limit.toString());
      if (query.status) params.append('status', query.status);
      if (query.parent_id !== undefined) params.append('parent_id', query.parent_id.toString());

      const response = await fetch(`${this.baseURL}?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Organize categories with subcategories
      const categoriesWithSubs = this.organizeCategoriesWithSubcategories(data.categories);
      
      return {
        ...data,
        categories: categoriesWithSubs
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Organize flat category list into hierarchical structure
  private organizeCategoriesWithSubcategories(categories: Category[]): Category[] {
    const categoryMap = new Map<number, Category>();
    const rootCategories: Category[] = [];

    // First pass: create map of all categories
    categories.forEach(cat => {
      categoryMap.set(cat.id, { ...cat, subcategories: [] });
    });

    // Second pass: organize hierarchy
    categories.forEach(cat => {
      const category = categoryMap.get(cat.id)!;
      
      if (cat.parent_id) {
        const parent = categoryMap.get(cat.parent_id);
        if (parent) {
          parent.subcategories = parent.subcategories || [];
          parent.subcategories.push(category);
        }
      } else {
        rootCategories.push(category);
      }
    });

    return rootCategories;
  }

  // Get single category by ID
  async getCategory(id: number): Promise<{ category: Category }> {
    try {
      const response = await fetch(`${this.baseURL}/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  }

  // Create new category
  async createCategory(data: CategoryFormData): Promise<{ message: string; category: Category }> {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  // Update existing category
  async updateCategory(id: number, data: CategoryFormData): Promise<{ message: string; category: Category }> {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  // Delete category
  async deleteCategory(id: number): Promise<{ message: string }> {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }

  // Get categories for select dropdown (only parent categories)
  async getParentCategories(): Promise<Category[]> {
    try {
      const response = await this.getCategories({ parent_id: 'null', limit: 1000 });
      return response.categories;
    } catch (error) {
      console.error('Error fetching parent categories:', error);
      throw error;
    }
  }
}

export default new CategoryService();
