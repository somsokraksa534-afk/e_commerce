export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const calculateDiscount = (price, originalPrice) => {
  if (!originalPrice) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

export const getRandomProducts = (products, count) => {
  const shuffled = [...products];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
};

export const filterProducts = (products, filters) => {
  let filtered = [...products];
  
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(p => p.category === filters.category);
  }
  
  if (filters.priceRange) {
    filtered = filtered.filter(p => p.price <= filters.priceRange);
  }
  
  if (filters.sizes && filters.sizes.length > 0) {
    filtered = filtered.filter(p => 
      p.sizes.some(size => filters.sizes.includes(size))
    );
  }
  
  if (filters.colors && filters.colors.length > 0) {
    filtered = filtered.filter(p =>
      p.colors.some(color => filters.colors.includes(color.name))
    );
  }
  
  if (filters.rating && filters.rating > 0) {
    filtered = filtered.filter(p => p.rating >= filters.rating);
  }
  
  if (filters.search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.brand.toLowerCase().includes(filters.search.toLowerCase())
    );
  }
  
  return filtered;
};

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id);
    default:
      return sorted;
  }
};