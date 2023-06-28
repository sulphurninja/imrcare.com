import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategoryNameById } from '../../pages/api/getCategories';

const CategoryPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;
  const [subcategories, setSubcategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`/api/getSubCategories?categoryId=${categoryId}`);
        setSubcategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategoryName = async () => {
      try {
        const response = await axios.get(`/api/getCategoriesById?categoryId=${categoryId}`);
        setCategoryName(response.data.data.name);
      } catch (error) {
        console.error(error);
      }
    };

    if (categoryId) {
      fetchSubcategories();
      fetchCategoryName();
    }
  }, [categoryId]);

  if (!categoryId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <nav className="text-sm mb-4">
          {/* ... */}
        </nav>

        <h1 className="text-2xl font-mono text-white font-bold mb-4">Category: {categoryName}</h1>

        <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 font-coffee text-center">
          {subcategories.map((subcategory) => (
            <Link key={subcategory._id} href={`/subcategory/${subcategory._id}`}>
              <div className="block rounded-lg overflow-hidden hover:shadow-md transform hover:scale-105 ">
                <div
                  className="relative h-48 w-full"
                  style={{
                    perspective: '800px',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img
                    src={subcategory.image}
                    alt={subcategory.name}
                    className="absolute top-0 left-0 w-full h-full object-contain"
                    style={{
                      transform: 'rotateY(20deg) translateZ(50px)',
                    }}
                  />
                </div>
                <div className="p-4 ">
                  <h2 className="lg:text-xl font-mono hover:text-green-300 text-white font-semibold mb-2">{subcategory.name}</h2>
                  <p className="text-gray-600">{subcategory.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
