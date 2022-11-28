import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const {user} = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile mb-8">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content pr-4">
                    {/* page content */}
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu px-4 pb-4 text-base-content">
                        <div className='bg-accent px-8 py-4'>
                            <h2 className='text-xl font-bold text-font1'>Add / View</h2>
                        </div>
                        {
                            isAdmin && 
                            <>
                                <li><Link to='/dashboard/allusers'>All Users</Link></li>
                                <li><Link to='/dashboard/adddoctor'>Add a Doctor</Link></li>
                                <li><Link to='/dashboard/managedoctors'>Manage Doctors</Link></li>
                            </>
                        }

                        {/* Sidebar content here */}
                        <div className='bg-accent px-8 py-4'>
                            <h2 className='text-xl font-bold text-font1'>Top Categories</h2>
                        </div>
                        <li className='hover:text-primary px-8 border-b-2 border-font1 '><Link className='hover:bg-white font-semibold' to='/category/apple'>Apple</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/asus'>Asus</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/dell'>Dell</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/hp'>HP</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/acer'>Acer</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/lenovo'>Lenovo</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/microsoft'>Microsoft</Link></li>
                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;