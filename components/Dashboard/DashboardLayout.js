import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dashboardActions } from '../../redux/actions/dashboardSlicer';
import HomeButton from './HomeButton';
import MenuButton from './MenuButton';
import Sidebar from './Sidebar';

function DashboardLayout({ children }) {
    const dashboardState = useSelector((state) => state.dashboard);
    const dispatch = useDispatch();

    // // Listen to screen resizing
    useEffect(() => {
        window.addEventListener('resize', () => {
            dispatch(dashboardActions.setScreen(window.innerWidth));
        });

        return () => {
            window.removeEventListener('resize', () => {
                dispatch(dashboardActions.setScreen(window.innerWidth));
            });
        };
    }, []);

    // // Set dashboard menu
    useEffect(() => {
        if (dashboardState.screen < '900' && dashboardState.screen)
            dispatch(dashboardActions.setSidebar(false));
        if (dashboardState.screen > '900') dispatch(dashboardActions.setSidebar(true));

        dispatch(dashboardActions.setScreen(window.innerWidth));
    }, [dashboardState.screen]);

    return (
        <>
            <HomeButton />
            {dashboardState.sidebar && <Sidebar />}
            {children}
            {!dashboardState.sidebar && <MenuButton />}
        </>
    );
}

export default DashboardLayout;
