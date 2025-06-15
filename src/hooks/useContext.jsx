import { useContext, createContext, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import API from '@/utils/api';


const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [alterNative, setAlternative] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { categorySlug, slug } = router.query;

  useEffect(() => {
    const fetchCategoryData = async () => {
      // Reset states when parameters change
      setCategoryData([]);
      setError(null);

      // Only fetch if both parameters are available
      if (!categorySlug || !slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('Fetching data for:', { categorySlug, slug });

        const response = await axios.get(`${API.HOST}/api/category/${categorySlug}/${slug}`);

        if (response.data && response.data.data) {
          console.log('Received data:', response.data.data);
          setCategoryData(response.data.data.existData);
          setAlternative(response.data.data.alternatives);
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
        setError(error.message || 'Failed to fetch data');
        setCategoryData([]);

        // If the error is 404, you might want to redirect to a not-found page
        if (error.response && error.response.status === 404) {
          router.push('/404'); // Make sure you have a 404 page
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categorySlug, slug, router]); // Add router to dependencies

  const value = useMemo(() => ({
    categoryData,
    alterNative,
    loading,
    error,
    categorySlug,
    slug
  }), [categoryData, loading, error, categorySlug, slug]);

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
