import * as React from 'react';
import {
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    List,
    BulkExportButton,
    NumberField,
    SearchInput,
    TextField,
    useRecordContext,
    SelectInput,
    ExportButton,
    Count,
    downloadCSV,
    useListContext
} from 'react-admin';

import ColoredDestField from './ColoredDestField'
import ColoredFromField from './ColoredFromField';
import ColoredStateField from './ColoredStateField';
import PackageShow from './PackageShow';
import { usePapaParse } from 'react-papaparse';
import { Divider, Tabs, Tab } from '@mui/material';
const packageFilter = [
    <SearchInput placeholder='Tìm kiếm mã hàng' source="package_id_q" alwaysOn />,
    <SearchInput placeholder='Tìm kiếm tên người gửi' source="send_name_q" alwaysOn />,
    <SelectInput
        alwaysOn
        label="Trạng thái"
        source="status"
        choices={[
            { id: 'received', name: 'Đã nhận' },
            { id: 'in-transit', name: 'Đang chuyển' },
        ]}
    />,
    <DateInput label='Ngày bắt đầu gửi' source="send_date_gte" alwaysOn />,
    <DateInput label='Ngày sau khi gửi' source="send_date_lt" alwaysOn />,
];

const BulkPackageActions = () => (
    <>
        <BulkExportButton />
    </>
);



const PackageListActions = () => {
    return (
        <>
            <ExportButton />
        </>
    )
};

const tabs = [
    { id: 'handling', name: 'Đang quản lý', val: 0 },
    { id: 'coming', name: 'Đang chuyển đến', val: 1 },
];

const TabbedDatagrid = () => {
    const listContext = useListContext();
    const { filterValues, setFilters, displayedFilters } = listContext;
    const handleChange = React.useCallback(
        (event: React.ChangeEvent<{}>, value: any) => {
            setFilters &&
                setFilters(
                    { ...filterValues, pack_type: value },
                    displayedFilters,
                    false // no debounce, we want the filter to fire immediately
                );

        },
        [displayedFilters, filterValues, setFilters]
    );

    return (
        <React.Fragment>
            <Tabs
                variant="fullWidth"
                centered
                value={filterValues.pack_type}
                indicatorColor="primary"
                onChange={handleChange}
            >
                {tabs.map(choice => (
                    <Tab
                        key={choice.id}
                        label={
                            <span>
                                {choice.name} (
                                <Count
                                    filter={{
                                        ...filterValues,
                                        pack_type: choice.val,
                                    }}
                                    sx={{ lineHeight: 'inherit' }}
                                />
                                )
                            </span>
                        }
                        value={choice.val}
                    />
                ))}
            </Tabs>
            <Divider />
            <Datagrid
                optimized
                rowClick="expand"
                expand={<PackageShow />}
                bulkActionButtons={<BulkPackageActions />}
                sx={{
                    '& .RaDatagrid-thead': {
                        borderLeftColor: 'transparent',
                        borderLeftWidth: 5,
                        borderLeftStyle: 'solid',
                    },
                }}
            >
                <TextField source='package_id' label='Mã hàng' />
                <DateField source="send_date" label='Ngày gửi' />
                <TextField source='send_name' label='Người gửi' />
                <TextField source='receive_name' label='Người nhận' />
                <CostField label='Tổng cước' />
                <ColoredFromField source='current_from' label='Chuyển từ' />
                <ColoredDestField source='current_dest' label='Điểm đến' />
                <ColoredStateField source='status' label='Trạng thái' />
            </Datagrid>
        </React.Fragment>
    );
}

const GatheringPackageList = () => {
    const { jsonToCSV } = usePapaParse();
    const exporter = (pacs) => {
        var newData = [];
        for (let i = 0; i < pacs.length; ++i) {
            newData.push({
                "Mã hàng": pacs[i].package_id,
                "Ngày gửi": (new Date(pacs[i].send_date)).toLocaleDateString(),
                "Người gửi": pacs[i].send_name,
                "Người nhận": pacs[i].receive_name,
                "Địa chỉ gửi": pacs[i].send_address,
                "Địa chỉ nhận": pacs[i].receive_address,
                "Tổng cước": pacs[i].total_cost.toLocaleString(
                    undefined,
                    {
                        style: 'currency',
                        currency: 'VND',
                    }
                ),
            })
        }
        const result = jsonToCSV(newData);
        downloadCSV(result, "danh_sách_hàng");
    };
    return (
        <List
            exporter={exporter}
            filters={packageFilter}
            filterDefaultValues={{ pack_type: 0}}
            sort={{ field: 'send_date', order: 'DESC' }}
            perPage={10}
            actions={<PackageListActions />}
            resource='package'
            title='Thống kê hàng'
        >
            <TabbedDatagrid />
        </List>
    );
};

const CostField = () => {
    const record = useRecordContext();
    return (
        <NumberField
            source='total_cost'
            options={{ style: 'currency', currency: 'VND' }}
            sx={{ color: 'red' }} />
    );
}
export default GatheringPackageList;
