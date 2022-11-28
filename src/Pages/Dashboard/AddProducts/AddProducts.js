import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const AddProducts = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const brands = ['Apple', 'Asus', 'Dell', 'HP', 'Acer', 'Lenovo', 'Microsoft'];
    const imgHostKey = process.env.REACT_APP_imgbb_key;

    console.log(process.env.REACT_APP_imgbb_key)


    let date = new Date();

    const handleAddProducts = data => {
        console.log(data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                console.log(imgData.data.url);
                const product = {
                    productName: data.productName,
                    productBrand: data.productBrand,
                    location: data.location,
                    resalePrice: data.resalePrice,
                    originalPrice: data.originalPrice,
                    yearsOfUse: data.yearsOfUse,
                    sellerName: user?.displayName,
                    email: user?.email,
                    image: imgData.data.url,
                    date
                }

                fetch('http://localhost:5000/products', {
                    method: 'POST',
                    headers: {
                        'content-type' : 'application/json'
                    },
                    body: JSON.stringify(product)
                })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    toast.success(`${data.productName} is added successfully!`);
                    navigate('/dashboard')
                })
            }
        })
    }

    return (
        <div className='w-[450px] mx-auto shadow-xl p-7 my-4'>
            <h2 className='text-2xl text-center text-primary font-bold'>Add A Product</h2>

            <form onSubmit={handleSubmit(handleAddProducts)}>
                {/* product image */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Product Image</span>
                    </label>
                    <input type="file"
                        {...register("image", { required: "Image is required" })}
                        className=""
                    />
                    {errors.image && <p className='text-error'>{errors.image?.message}</p>}
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
                    {...register("productBrand", { required: "Specialty is required" })}
                    className="select select-bordered w-full">
                        {
                            brands.map((brand, i) => 
                            <option key={i} value={brand}>{brand}</option>)
                        }
                    </select>

                    {errors.productBrand && <p className='text-error'>{errors.productBrand?.message}</p>}
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
                        <span className="label-text">Resale Price: $</span>
                    </label>
                    <input type="text"
                        {...register("resalePrice", {
                            pattern: { value: /(?=.*[0-9])/, message: 'Price must be a number' }
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.resalePrice && <p className='text-error'>{errors.resalePrice?.message}</p>}
                </div>

                {/* original price */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Original Price: $</span>
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
                        {...register("yearsOfUse", {
                            pattern: { value: /(?=.*[0-9])/, message: 'Years must be a number' }
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.yearsOfUse && <p className='text-error'>{errors.yearsOfUse?.message}</p>}
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Seller Name</span>
                    </label>
                    <input type="text" defaultValue={user?.displayName} disabled
                        className="input input-bordered w-full"
                    />
                    {errors.sellerName && <p className='text-error'>{errors.sellerName?.message}</p>}
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" defaultValue={user?.email} disabled
                        className="input input-bordered w-full"
                    />
                    {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                </div>


                <input type="submit" className='btn btn-primary text-white w-full mt-9 mb-3' value='Add' />

            </form>
        </div>
    );
};

export default AddProducts;