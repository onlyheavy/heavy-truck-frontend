import { useContext, createContext, useMemo } from 'react';

const CategoryContext = createContext();

export const CategoryProvider = ({ children, initialData }) => {
  const value = useMemo(() => ({
    categoryData: initialData?.categoryData || [],
    alterNative: initialData?.alterNative || [],
    loading: false,
    error: initialData?.error || null,
    slug: initialData?.slug
  }), [initialData]);

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
