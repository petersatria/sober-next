import { useSelector } from 'react-redux';
import axios from 'axios';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import ProductDashboard from '../../components/Dashboard/ProductDashboard';
import UpdateProducts from '../../components/Dashboard/UpdateProducts';
import FormProduct from '../../components/Dashboard/FormProduct';
import UserDashboard from '../../components/Dashboard/UserDashboard';
import BlogDashboard from '../../components/Dashboard/BlogDashboard';
import CategoryDashboard from '../../components/Dashboard/CategoryDashboard';
import FormBlog from '../../components/Dashboard/FormBlog';
import FormCategory from '../../components/Dashboard/FormCategory';

import UpdateBlogs from '../../components/Dashboard/UpdateBlogs';
import UpdateCategories from '../../components/Dashboard/UpdateCategories';
import BannerDashboard from '../../components/Dashboard/BannerDashboard';
import FormBanner from '../../components/Dashboard/FormBanner';
import UpdateBanner from '../../components/Dashboard/UpdateBanner';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

function Dashboard({ products, users, blogs, categories, bannersData }) {
    const dashboardState = useSelector((state) => state.dashboard);
    return (
        <DashboardLayout>
            <div
                className={`${dashboardState.sidebar && 'md:tw-ml-72'
                    } overflow-scroll h-screen`}
            >
                {/* Product */}
                <div className="tw-m-2 tw-mt-2 tw-rounded-2xl tw-p-2 tw-shadow-md md:tw-m-10 md:tw-mt-5 md:tw-p-10">
                    {dashboardState.activeSection === 'product' && (
                        <ProductDashboard products={products} />
                    )}

                    {dashboardState.activeSection === 'add-product' && (
                        <FormProduct
                            header="Add Product"
                            method="POST"
                            url={`${host}api/create-product`}
                            type="add"
                        />
                    )}

                    {dashboardState.activeSection === 'update-product' && (
                        <UpdateProducts products={products} />
                    )}

                    {/* User */}

                    {dashboardState.activeSection === 'user' && (
                        <UserDashboard users={users} />
                    )}

                    {/* Banner */}
                    {dashboardState.activeSection === 'banner' && (
                        <BannerDashboard banners={bannersData} />
                    )}

                    {dashboardState.activeSection === 'add-banner' && (
                        <FormBanner
                            header="Add Banner"
                            method="POST"
                            url={`${host}api/banner/create-banner`}
                            type="add"
                        />
                    )}

                    {dashboardState.activeSection === 'update-banner' && (
                        <UpdateBanner bannersData={bannersData} />
                    )}
                    {/* Blog */}

                    {dashboardState.activeSection === 'blog' && (
                        <BlogDashboard blogs={blogs} />
                    )}

                    {dashboardState.activeSection === 'add-blog' && (
                        <FormBlog
                            header={'Add Blog'}
                            method="POST"
                            url={`${host}api/blog/create-article`}
                            type="add"
                        />
                    )}

                    {dashboardState.activeSection === 'update-blog' && (
                        <UpdateBlogs blogs={blogs} />
                    )}

                    {/* Category */}

                    {dashboardState.activeSection === 'category' && (
                        <CategoryDashboard categories={categories} />
                    )}
                    {dashboardState.activeSection === 'add-category' && (
                        <FormCategory
                            header={'Add Category'}
                            method="POST"
                            url={`${host}add-category`}
                            type="add"
                        />
                    )}

                    {dashboardState.activeSection === 'update-category' && (
                        <UpdateCategories blogs={blogs} />
                    )}


                </div>
            </div>
        </DashboardLayout>
    );
}

export async function getServerSideProps() {
    try {
        const resProducts = await axios.get(`${host}api/product`);
        const resUsers = await axios.get(`${host}api/user`);
        const resBlog = await axios.get(`${host}api/blog/articles`);
        const resCategories = await axios.get(`${host}category`)
        const resBanner = await axios.get(`${host}api/banners/all`);

        const products = resProducts.data.result.map((item) => {
            item['size-xs'] = item?.size?.xs || null;
            item['size-s'] = item?.size?.s || null;
            item['size-m'] = item?.size?.m || null;
            item['size-l'] = item?.size?.l || null;
            item['size-xl'] = item?.size?.xl || null;
            return item;
        });

        const users = resUsers?.data?.data;

        const blogs = resBlog?.data?.result;
        const banners = resBanner?.data?.result;

        const categories = resCategories?.data?.result;


        return {
            props: {
                products,
                users,
                blogs,
                categories,
                bannersData
            },
        };
    } catch (err) {
        return {
            props: {
                products: [],
                users: [],
                blogs: [],
                categories: [],
                bannersData: [],
            },
        };
    }
}

export default Dashboard;
