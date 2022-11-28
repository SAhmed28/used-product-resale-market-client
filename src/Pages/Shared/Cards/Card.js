import React from 'react';

const Card = ({ product }) => {
    const { image, productName, productBrand, location, resalePrice, originalPrice, yearsOfUse, sellerName, email, date, _id } = product;
    console.log(product)
    return (
        <div className="card card-compact shadow-xl">
            <figure><img src={image} className="h-44 w-full" alt="productImage" /></figure>
            <div className="card-body">
                <div className='ml-8'>
                    <h2 className="card-title text-primary">  {productName} </h2>
                    <ul>
                        <li>Brand: {productBrand}</li>
                        <li>location: {location}</li>
                        <li>Re-sale Price: ${resalePrice}</li>
                        <li>Original Price: ${originalPrice}</li>
                        <li>Years of use: {yearsOfUse}</li>
                        <li>Posted on: {date}</li>
                        <li>Seller: {sellerName}</li>
                    </ul>
                </div>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default Card;