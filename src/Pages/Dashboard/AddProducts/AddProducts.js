import React from 'react';
import { useForm } from "react-hook-form";
import {useQuery} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();

    const {data: products, isLoading} = useQuery({
        queryKey: ['newProduct'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/addproduct');
            const data = await res.json();
            return data;
        }
    })

    const handleAddDoctor = data => {
        console.log(data)
    }

    return (
        <div className='w-[450px] mx-auto shadow-xl p-7 my-5'>
            <h2 className='text-xl'>Add A Doctor</h2>

            <form onSubmit={handleSubmit(handleAddDoctor)}>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text"
                        {...register("name", { required: "Name is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.name && <p className='text-error'>{errors.name?.message}</p>}
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email"
                        {...register("email", { required: "Email Address is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                </div>


                

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="file"
                        {...register("image", { required: "Image is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.img && <p className='text-error'>{errors.img?.message}</p>}
                </div>

                <input type="submit" className='btn btn-accent w-full mt-9 mb-3' value='Add' />

            </form>
        </div>
    );
};

export default AddProducts;