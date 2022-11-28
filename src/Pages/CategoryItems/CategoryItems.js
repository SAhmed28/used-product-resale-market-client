import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Cards from '../Shared/Cards/Cards';

const CategoryItems = () => {
    const products = useLoaderData();

    console.log(products);

    if(products.length === 0){
        return <div><h2 className='text-font1 text-3xl'>No products were listed in this category</h2></div>
    }

    return (
        <div>
            <Cards products={products}></Cards>
        </div>
    );
};

export default CategoryItems;