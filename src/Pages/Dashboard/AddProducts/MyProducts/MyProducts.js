import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';
import { AuthContext } from '../../../../contexts/AuthProvider';

const MyProducts = () => {
    const {user} = useContext(AuthContext)
    const { data: myProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['availableOptions'],
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
            <h2>This is my product</h2>
        </div>
    );
};

export default MyProducts;