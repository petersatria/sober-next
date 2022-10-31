import { useSelector } from 'react-redux';
import axios from 'axios';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import ProductDashboard from '../../components/Dashboard/ProductDashboard';
import UpdateProducts from '../../components/Dashboard/UpdateProducts';
import FormProduct from '../../components/Dashboard/FormProduct';
import UserDashboard from '../../components/Dashboard/UserDashboard';
import BlogDashboard from '../../components/Dashboard/BlogDashboard';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.REACT_APP_URL;

function Dashboard({ products }) {
    const dashboardState = useSelector((state) => state.dashboard);
    return (
        <DashboardLayout>
            <div
                className={`${
                    dashboardState.sidebar && 'md:tw-ml-72'
                } overflow-scroll h-screen`}
            >
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

                    {dashboardState.activeSection === 'user' && <UserDashboard />}

                    {dashboardState.activeSection === 'blog' && <BlogDashboard />}
                </div>
            </div>
        </DashboardLayout>
    );
}

export async function getServerSideProps() {
    const res = await axios.get(`${host}api/product`);

    const products = res.data.result.map((item) => {
        item['size-xs'] = item.size.xs || null;
        item['size-s'] = item.size.s || null;
        item['size-m'] = item.size.m || null;
        item['size-l'] = item.size.l || null;
        item['size-xl'] = item.size.xl || null;
        return item;
    });

    return {
        props: {
            products,
        },
    };
}

export default Dashboard;
