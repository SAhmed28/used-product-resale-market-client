import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../Home/BookingModal/BookingModal';
import Cards from '../Shared/Cards/Cards';

const CategoryItems = () => {
    const products = useLoaderData();
    const [product, setProduct] = useState(null)

    console.log(products);

    if (products.length === 0) {
        return <div><h2 className='text-font1 text-3xl'>No products were listed in this category</h2></div>
    }

    return (
        <div>
            <Cards products={products} modalOpen={true} setProduct={setProduct}></Cards>


            {
                products &&

                <BookingModal
                    product={product}
                    setProduct={setProduct}
                ></BookingModal>
            }
        </div>
    );
};

export default CategoryItems;