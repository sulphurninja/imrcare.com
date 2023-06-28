import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const CategoriesCards = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/getCategories');
        setCategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return ( 
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-4 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link key={category._id} href={`/category/${category._id}`}>
            <div className="relative  rounded-lg overflow-hidden cursor-pointer bg-white hover:bg-[#F6F4EE]">
              <div className="relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-fill  h-20  sm:h-48 w-full"
                />
                <div className="absolute  inset-0 bg-black opacity-0 hover:opacity-25 transition duration-300"></div>
                <div className="absolute bottom-0 p-4 ">
                  <h2 className="hidden lg:block  lg:text-2xl font-bold text-white text-center font-darkage">
                    {category.name}
                  </h2>
                </div>
              </div>
           </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesCards;
