import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null);

    const closeModal = () => {
        setDeletingProduct(null);
    }

    const { data: myProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['myproducts', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/products?email=${user?.email}`);
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.error(error);
            }
        }
    });

    const handleDeleteDoctor = doctor => {
        console.log(doctor);
        fetch(`https://doctors-portal-server-swart.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Doctor ${doctor.name} deleted successfully`)
                }
            })
    }

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
                            <th>Advertise</th>
                            <th>Action</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProducts &&
                            myProducts?.map((myProduct, i) => <tr key={myProduct._id}>
                                <th>{i + 1}</th>
                                <td>{myProduct.productName}</td>
                                <td>{myProduct.resalePrice}</td>
                                <td>{myProduct.date}</td>
                                <td></td>
                                <td><label onClick={() => setDeletingProduct(myProduct)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label></td>
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
            {
                deletingProduct &&
                <ConfirmationModal
                    title={`Are you sure you want to delete`}
                    message={`If you delete ${deletingProduct.productName}, it can't be undone`}
                    successAction={handleDeleteDoctor}
                    modalData={deletingProduct}
                    closeModal={closeModal}

                ></ConfirmationModal>
            }
        </div>
    );
};

export default MyProducts;