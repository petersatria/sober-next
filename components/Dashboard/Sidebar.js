import { useDispatch } from 'react-redux';
import { dashboardActions } from '../../redux/actions/dashboardSlicer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faXmark,
    faShirt,
    faUser,
    faBlog,
    faPlus,
    faPen,
} from '@fortawesome/free-solid-svg-icons';
import NavButton from './NavButton';

const NavProductList = [
    {
        icon: faShirt,
        title: 'Product',
        type: 'product',
    },
    {
        icon: faPlus,
        title: 'Add Product',
        type: 'add-product',
    },
    {
        icon: faPen,
        title: 'Update Product',
        type: 'update-product',
    },
];

const NavUserList = [
    {
        icon: faUser,
        title: 'User',
        type: 'user',
    },
    // {
    //     icon: faPlus,
    //     title: 'Add User',
    //     type: 'add-user',
    // },
    // {
    //     icon: faPen,
    //     title: 'Update User',
    //     type: 'update-user',
    // },
];

const NavBlogList = [
    {
        icon: faBlog,
        title: 'Blog',
        type: 'blog',
    },
    {
        icon: faPlus,
        title: 'Add Blog',
        type: 'add-blog',
    },
    {
        icon: faPen,
        title: 'Update Blog',
        type: 'update-blog',
    },
];

function Sidebar() {
    const dispatch = useDispatch();

    return (
        <div className="tw-fixed tw-z-50 tw-h-screen tw-w-72 tw-overflow-scroll tw-border  tw-border-gray-200 tw-bg-white tw-p-6">
            {/* Header */}
            <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between tw-border-b tw-border-gray-200 tw-pb-4">
                <h2 className="tw-m-0 tw-text-lg tw-font-bold">Dashboard</h2>

                <button
                    className="tw-cursor-pointer"
                    onClick={() => dispatch(dashboardActions.toggleSidebar())}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>

            {/* Product List */}
            <div className="tw-flex tw-flex-col tw-gap-y-1 tw-border-b tw-border-gray-200 tw-pb-4">
                {NavProductList.map((item) => (
                    <NavButton
                        key={item.title}
                        icon={item.icon}
                        title={item.title}
                        type={item.type}
                    />
                ))}
            </div>

            {/* User lList */}
            <div className="tw-mt-2 tw-flex tw-flex-col tw-gap-y-1 tw-border-b tw-border-gray-200 tw-pb-4">
                {NavUserList.map((item) => (
                    <NavButton
                        key={item.title}
                        icon={item.icon}
                        title={item.title}
                        type={item.type}
                    />
                ))}
            </div>

            {/* Blog lList */}
            <div className="tw-mt-2 tw-flex tw-flex-col tw-gap-y-1">
                {NavBlogList.map((item) => (
                    <NavButton
                        key={item.title}
                        icon={item.icon}
                        title={item.title}
                        type={item.type}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;