import * as React from 'react';
import PackageStatistic from './PackageStatistic';
import { useGetList } from 'react-admin';
import RecentDelivery from './RecentDelivery';
import OldPackage from './OldPackage';
const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const DashboardGathering = () => {
    const { data: curDelivery, isLoading: isLoading } = useGetList('delivery',
        {
            filter: {
                from_point_id: localStorage.getItem("point_reference"),
            },
            pagination: {
                page: 1,
                perPage: 100000,
            }
        });
    if (isLoading) {
        return (
            <></>
        );
    }
    var smallestYear = 9999;
    for (let i = 0; i < curDelivery.length; ++i) {
        if ((new Date(curDelivery[i].arrived_date)).getFullYear() < smallestYear) {
            smallestYear = (new Date(curDelivery[i].arrived_date)).getFullYear();
        }
    }
    return (
        <>
            <div style={styles.flex}>
                <RecentDelivery />
                <Spacer />
                <OldPackage />
            </div>

        </>
    );
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

export default DashboardGathering;