import React from 'react';
import Card from './Card';

const Cards = ({products}) => {
    // const {image, productName, productBrand, location, resalePrice, originalPrice, yearsOfUse, email, data, _id} = products;
    console.log(products)
    return (
        <div className='grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-3'>
            {
              products.map(product => <Card key={product._id} product={product}></Card>)  
            }
        </div>
    );
};

export default Cards;