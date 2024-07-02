import polyglotI18nProvider from 'ra-i18n-polyglot';
import {
    Admin,
    CustomRoutes,
    Resource,
    localStorageStore,
    useStore,
    StoreContextProvider,
    useLogin,
    NotFound,
} from 'react-admin';
import { Route } from 'react-router';
import { Box } from '@mui/material';
import authProvider from './authProvider';
import DashboardExchanging from './exchanging_employee/analytic/DashboardExchanging';
import dataProvider from './dataProvider';
import rest from './fakeServer/rest'
import vnMessages from './i18n/vn';
import { Layout, Login } from './layout';
import ChangePassword from './layout/ChangePassword';
import DashboardExchangingManager from './exchanging_manager/analytic/DashboardExchangingManager';
import manage_exchanging_delivery from './exchanging_employee/manage_exchanging_delivery';
import manage_exchanging_package from './exchanging_employee/manage_exchanging_package';
import manage_gathering_delivery from './gathering_employee/manage_gathering_delivery';
import manage_gathering_package from './gathering_employee/manage_gathering_package';
import manage_employee_exchange from "./exchanging_manager/manage_account";
import manage_account from './gathering_manager/manage_account';
import DashboardGatheringManager from './gathering_manager/analytic/DashboardGatheringManager';
import GatheringPackageList from './gathering_manager/analytic/GatheringPackageList';
import DashboardAdmin from './admin/analytic/DashboardAdmin';
import Search from './guest/search/Search';
import points from './admin/manage_point';
import managerAccounts from './admin/manage_account';
import { themes, ThemeName } from './themes/themes';
import ExchangingPackageList from './exchanging_manager/analytic/ExchangingPackageList';
import DashboardGathering from './gathering_employee/analytic/DashboardGathering';
import { Dashboard } from './dashboard';

const i18nProvider = polyglotI18nProvider(
    locale => {
        // Always fallback on english
        return vnMessages;
    },
    'vn',
    [
        { locale: 'vn', name: 'Vietnamese' },
    ]
);

const store = localStorageStore(undefined, 'MagicPost');


const App = () => {
    const [themeName] = useStore<ThemeName>('themeName', 'soft');
    const lightTheme = themes.find(theme => theme.name === themeName)?.light;
    const darkTheme = themes.find(theme => theme.name === themeName)?.dark;

    const appRoleSwitch = (param: string) => {
        switch (param) {
            case 'guest':
                return (
                    <>
                        <CustomRoutes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/search" element={<Search />} />
                        </CustomRoutes>
                    </>
                );
            case 'admin':
                return (
                    <>
                        <CustomRoutes>
                            <Route path='/' element={<DashboardAdmin />} />
                        </CustomRoutes>
                        <Resource name="points" {...points} />
                        <Resource name="managerAccounts" {...managerAccounts} />
                    </>
                );
            case 'exchanging_manager':
                return (
                    <>
                        <CustomRoutes>
                            <Route path="/" element={<DashboardExchangingManager />} />
                            <Route path="/exchangingPackageList" element={<ExchangingPackageList />} />
                        </CustomRoutes>
                        <Resource name="exchangingEmployeeAccounts" {...manage_employee_exchange} />
                    </>
                );
            case 'exchanging_employee':
                return (
                    <>
                        <CustomRoutes>
                            <Route path="/" element={<DashboardExchanging />} />
                        </CustomRoutes>
                        <Resource name="exchangingPackage" {...manage_exchanging_package} />
                        <Resource name="exchangingDelivery" {...manage_exchanging_delivery} />
                    </>
                )
            case 'gathering_employee':
                return (
                    <>
                        <CustomRoutes>
                            <Route path="/" element={<DashboardGathering />} />
                        </CustomRoutes>
                        <Resource name="gatheringPackage" {...manage_gathering_package} />
                        <Resource name="gatheringDelivery" {...manage_gathering_delivery} />
                    </>
                )
            case 'gathering_manager':
                return (
                    <>
                        <CustomRoutes>
                            <Route path="/" element={<DashboardGatheringManager />} />
                            <Route path="/gatheringPackageList" element={<GatheringPackageList />} />
                        </CustomRoutes>
                        <Resource name="gatheringEmployeeAccounts" {...manage_account} />
                    </>
                );
        }
    }

    return (
        <Admin
            title=""
            dataProvider={dataProvider}
            store={store}
            loginPage={Login}
            layout={Layout}
            i18nProvider={i18nProvider}
            disableTelemetry
            lightTheme={lightTheme}
            darkTheme={darkTheme}
            defaultTheme="light"
            authProvider={authProvider}
        >
            {permissions => (
                <>
                    <CustomRoutes>
                        <Route path="/search" element={<Search />} />
                    </CustomRoutes>
                    {appRoleSwitch(permissions)}
                </>
            )}
        </Admin>
    );
};

const AppWrapper = () => (
    <StoreContextProvider value={store}>
        <App />
    </StoreContextProvider>
);

export default AppWrapper;
