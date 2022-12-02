import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { FaRegCheckCircle } from 'react-icons/fa'
import Loading from '../Loading/Loading';

const Card = ({ product, modalOpen, setProduct }) => {
    const { image, productName, productBrand, location, resalePrice, originalPrice, yearsOfUse, sellerName, email, date, _id } = product;
    // console.log(product)
    // console.log('modalOpen', modalOpen);

    const { data: sellerInfo, isLoading, refetch } = useQuery({
        queryKey: ['sellerInfo'],
        queryFn: async () => {
            try {
                const res = await fetch(` https://used-product-resale-market-server-roan.vercel.app/users/role/${email}`);
                const data = await res.json();
                console.log('sellerInfo: ', data);
                return data;
            }
            catch (error) {
                console.error(error);
            }
        }
    });


    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div className="card card-compact shadow-md hover:shadow-lg">
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
                    </ul>

                    <h3>
                        {
                            sellerInfo?.verify === 'true' ?
                                <div className='flex align-middle font-bold mt-3'>
                                    <h5>Seller: {sellerName} </h5>
                                    <FaRegCheckCircle className='ml-1 mt-1 text-primary text-lg' />
                                </div>
                                :
                                <h5 className='font-bold mt-3'>Seller: {sellerName}</h5>
                        }
                    </h3>
                </div>
                <div className="card-actions justify-center">
                    {/* <button className="btn btn-primary text-white px-12">Book Now</button> */}

                    {
                        modalOpen ?
                            <>
                                {/* The button to open modal */}
                                <label
                                    onClick={() => setProduct(product)}
                                    htmlFor="booking-modal"
                                    className="btn btn-primary bg-gradient-to-r from-primary to-secondary px-12 text-white uppercase">
                                    Book Now
                                </label>
                            </>
                            :
                            <button className="btn btn-primary text-white px-12">Book Now</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Card;