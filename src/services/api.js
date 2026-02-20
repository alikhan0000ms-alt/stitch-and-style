// SECURITY: API Base URL - supports environment variable configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper to get JWT token
const getAuthHeader = () => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

// Helper function to handle API responses with SECURITY: Global 401 error handling
const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({ error: 'An error occurred' }));
  
  // SECURITY: Handle 401 Unauthorized globally - token expired or invalid
  if (response.status === 401) {
    localStorage.removeItem('jwt_token');
    window.location.href = '/login';
    throw new Error('Session expired. Please log in again.');
  }
  
  if (!response.ok) {
    throw new Error(data.error || data.details || `HTTP error! status: ${response.status}`);
  }
  return data;
};

// ==================== AUTHENTICATION ====================

export const authAPI = {
  register: async (email, password, name) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('jwt_token', data.token);
    }
    return data;
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('jwt_token', data.token);
    }
    return data;
  },

  verify: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  logout: () => {
    localStorage.removeItem('jwt_token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('jwt_token');
  },
};

// ==================== PRODUCT API ====================

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

// ==================== TRY-ON API ====================

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

// ==================== ORDER API ====================

export const orderAPI = {
  // Create new order
  create: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },

  // Get user orders
  getUserOrders: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/orders/${userId}`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  // Get all orders (admin)
  getAllOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/orders`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },
};

// ==================== USER API ====================

export const userAPI = {
  // Get user profile
  getProfile: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  // Get all users (admin)
  getAllUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },
};

// ==================== CUSTOMIZATION API ====================

export const customizationAPI = {
  // Create customization
  create: async (customData) => {
    const response = await fetch(`${API_BASE_URL}/customization`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(customData),
    });
    return handleResponse(response);
  },
};

// ==================== UTILITY ====================

// Helper function to get full image URL
export const getImageURL = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `http://localhost:5000${path}`;
};

export default {
  auth: authAPI,
  products: productAPI,
  tryon: tryonAPI,
  orders: orderAPI,
  users: userAPI,
  customization: customizationAPI,
  getImageURL,
};