import * as React from 'react';
import PackageStatistic from './PackageStatistic';
import { useGetList } from 'react-admin';
const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const DashboardGatheringManager = () => {
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
    const { data: curDelivery1, isLoading: isLoading1 } = useGetList('delivery',
        {
            filter: {
                dest_point_id: localStorage.getItem("point_reference"),
            },
            pagination: {
                page: 1,
                perPage: 100000,
            }
        });
    if (isLoading || isLoading1) {
        return (
            <></>
        );
    }
    var smallestYear = 9999;
    for (let i = 0; i < curDelivery.length; ++i) {
        if ((new Date(curDelivery[i].begin_date)).getFullYear() < smallestYear) {
            smallestYear = (new Date(curDelivery[i].begin_date)).getFullYear();
        }
    }
    for (let i = 0; i < curDelivery1.length; ++i) {
        if ((new Date(curDelivery1[i].begin_date)).getFullYear() < smallestYear) {
            smallestYear = (new Date(curDelivery1[i].begin_date)).getFullYear();
        }
    }
    return (
        <>
            <div style={styles.flexColumn as React.CSSProperties}>
                <div style={styles.singleCol}>
                    <PackageStatistic smallestYear={smallestYear} />
                </div>
            </div>

        </>
    );
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

export default DashboardGatheringManager;