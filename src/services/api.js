// API Base URL - change this to your backend URL
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'An error occurred' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Product API calls
export const productAPI = {
  // Get all products
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.in_stock !== undefined) params.append('in_stock', filters.in_stock);
    
    const queryString = params.toString();
    const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    return handleResponse(response);
  },

  // Get single product
  getById: async (productId) => {
    const response = await fetch(`${API_BASE_URL}/product/${productId}`);
    return handleResponse(response);
  },
};

// Try-on API calls
export const tryonAPI = {
  // Upload selfie and get try-on result
  tryOn: async (productId, selfieFile) => {
    const formData = new FormData();
    formData.append('selfie', selfieFile);

    const response = await fetch(`${API_BASE_URL}/tryon/${productId}`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse(response);
  },
};

// Order API calls
export const orderAPI = {
  // Create new order
  create: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },
};

// Customization API (you can add these endpoints to backend later)
export const customizationAPI = {
  // Create customization
  create: async (customData) => {
    const response = await fetch(`${API_BASE_URL}/customization`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customData),
    });
    return handleResponse(response);
  },
};

// Helper function to get full image URL
export const getImageURL = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `http://localhost:5000${path}`;
};

export default {
  products: productAPI,
  tryon: tryonAPI,
  orders: orderAPI,
  customization: customizationAPI,
  getImageURL,
};