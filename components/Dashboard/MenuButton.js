import { useDispatch } from 'react-redux';
import { dashboardActions } from '../../redux/actions/dashboardSlicer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function MenuButton() {
    const dispatch = useDispatch();
    return (
        <button
            onClick={() => dispatch(dashboardActions.toggleSidebar())}
            className="tw-fixed tw-bottom-5 tw-right-24 tw-z-50 tw-flex tw-h-3 tw-w-3 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-bg-gray-400 tw-p-8 tw-text-gray-100 tw-shadow-lg tw-duration-200 hover:tw-bg-black"
        >
            <FontAwesomeIcon icon={faBars} />
        </button>
    );
}

export default MenuButton;
