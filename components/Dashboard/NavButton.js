import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { dashboardActions } from '../../redux/actions/dashboardSlicer';

function NavButton({ icon, title, type }) {
    const dashboardState = useSelector((state) => state.dashboard);
    const dispatch = useDispatch();

    const activeBackground =
        dashboardState.activeSection === type ? 'tw-bg-gray-900 tw-text-gray-200' : '';

    const clickHandler = () => {
        dispatch(dashboardActions.setActiveSection(type));

        if (dashboardState.screen < 900) dispatch(dashboardActions.setSidebar(false));
    };
    return (
        <button
            className={`tw-flex tw-items-center tw-gap-3  hover:tw-bg-gray-900 hover:tw-text-gray-200 tw-p-2 tw-w-full tw-duration-200 tw-cursor-pointer tw-rounded-md ${activeBackground} `}
            onClick={clickHandler}
        >
            <FontAwesomeIcon className="tw-pr-2 tw-text-sm" icon={icon} />
            <h3 className="tw-m-0 tw-text-lg">{title}</h3>
        </button>
    );
}

export default NavButton;
