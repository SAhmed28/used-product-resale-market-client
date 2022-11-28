import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const AddProducts = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const brands = ['Apple', 'Asus', 'Dell', 'HP', 'Acer', 'Lenovo', 'Microsoft'];

    const { data: products, isLoading } = useQuery({
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
        <div className='w-[450px] mx-auto shadow-xl p-7 my-4'>
            <h2 className='text-2xl text-center text-primary font-bold'>Add A Product</h2>

            <form onSubmit={handleSubmit(handleAddDoctor)}>
                {/* product image */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Product Image</span>
                    </label>
                    <input type="file"
                        {...register("image", { required: "Image is required" })}
                        className=""
                    />
                    {errors.img && <p className='text-error'>{errors.img?.message}</p>}
                </div>

                {/* Product Name */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Product Name</span>
                    </label>
                    <input type="text"
                        {...register("productName", { required: "Name is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.productName && <p className='text-error'>{errors.productName?.message}</p>}
                </div>

                {/* Product Brand */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Product Brand</span>
                    </label>
                    <select 
                    {...register("specialty", { required: "Specialty is required" })}
                    className="select select-bordered w-full">
                        {
                            brands.map((brand, i) => 
                            <option key={i} value={brand}>{brand}</option>)
                        }
                    </select>

                    {errors.specialty && <p className='text-error'>{errors.specialty?.message}</p>}
                </div>

                {/* location */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input type="text"
                        {...register("location")}
                        className="input input-bordered w-full"
                    />
                    {errors.location && <p className='text-error'>{errors.location?.message}</p>}
                </div>

                {/* resale price */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Resale Price</span>
                    </label>
                    <input type="text"
                        {...register("resalePrice", {
                            pattern: { value: /(?=.*[0-9])/, message: 'Price must be a number' }
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.resalePrice && <p className='text-error'>{errors.resalePrice?.message}</p>}
                </div>

                {/* resale price */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Original Price</span>
                    </label>
                    <input type="text"
                        {...register("originalPrice", {
                            pattern: { value: /(?=.*[0-9])/, message: 'Price must be a number' }
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.originalPrice && <p className='text-error'>{errors.originalPrice?.message}</p>}
                </div>

                {/* Years of use */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Years of use</span>
                    </label>
                    <input type="text"
                        {...register("yearsOfUse")}
                        className="input input-bordered w-full"
                    />
                    {errors.yearsOfUse && <p className='text-error'>{errors.yearsOfUse?.message}</p>}
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Seller Name</span>
                    </label>
                    <input type="text" defaultValue={user?.displayName} disabled
                        {...register("sellerName", { required: "Name is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.sellerName && <p className='text-error'>{errors.sellerName?.message}</p>}
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" defaultValue={user?.email} disabled
                        {...register("email", { required: "Email Address is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                </div>


                <input type="submit" className='btn btn-accent w-full mt-9 mb-3' value='Add' />

            </form>
        </div>
    );
};

export default AddProducts;