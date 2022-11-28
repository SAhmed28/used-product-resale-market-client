import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { Link } from 'react-router-dom';

const MyProducts = () => {
    const {user} = useContext(AuthContext)
    const { data: myProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['myproducts', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    console.log(myProducts)

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Re-sale Price</th>
                            <th>Date Posted</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProducts &&
                            myProducts?.map((myProduct, i) => <tr key={myProduct._id}>
                                <th>{i+1}</th>
                                <td>{myProduct.productName}</td>
                                <td>{myProduct.resalePrice}</td>
                                <td>{myProduct.date}</td>
                                <td>
                                    {
                                        myProduct?.resalePrice && !myProduct.paid &&
                                        <Link to={`/dashboard/payment/${myProduct._id}`}>
                                            <button className='btn btn-primary btn-sm'>Pay</button>
                                        </Link>
                                    }
                                    {
                                        myProduct.price && myProduct.paid && <span className='text-secondary font-bold'>Paid</span>
                                    }
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;