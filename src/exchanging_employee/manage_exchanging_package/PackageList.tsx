import * as React from 'react';
import {
    BooleanField,
    Datagrid,
    DateField,
    useGetList,
    List,
    BulkExportButton,
    NumberField,
    SearchInput,
    TextField,
    useRecordContext,
    CreateButton,
    ExportButton,
    useGetMany,
    useListContext,
    useRedirect,
    useNotify,
    Count,
    AutocompleteInput,
} from 'react-admin';
import { Divider, Tabs, Tab } from '@mui/material';
import ColoredDestField from './ColoredDestField'
import ColoredFromField from './ColoredFromField';
import ColoredStateField from './ColoredStateField';
import PackageListAside from './PackageListAside';
import PackageShow from './PackageShow';
import green from '@mui/material/colors/green';
import orange from '@mui/material/colors/orange';
import red from '@mui/material/colors/red';
import { Button } from 'react-admin';
import { BulkActionProps } from 'react-admin';
import { LegendToggleRounded } from '@mui/icons-material';


const BulkPackageActions = () => (
    <>
        <BulkExportButton />
        <BulkActionButton />
    </>
);

export let selIds = [];
const BulkActionButton = () => {
    const { selectedIds: selectedIds } = useListContext();
    const { data: data, isLoading: isLoading } = useGetMany("package", { ids: selectedIds })
    const redirect = useRedirect();
    const notify = useNotify();
    const handleBulkClick = () => {
        selIds = selectedIds;
        var fail = 0;
        for (let i = 0; i < data?.length; ++i) {
            if (data[i].status !== 'received') {
                notify("Không thể tạo đơn với những hàng này", { type: "error" });
                fail = 1;
                break;
            }
        }
        if (!fail) {
            localStorage.setItem("current_delivery_mode", "1");
            redirect("/exchangingDelivery/create");
        }
    }
    return (
        <Button
            color="secondary"
            label={"Tạo đơn hàng"}
            onClick={handleBulkClick}
            disabled={isLoading}
        />
    );
};

const rowSx = (record: any, index: any) => {
    let style = {};
    if (!record) {
        return style;
    }
    if (record.status === 'received')
        return {
            ...style,
            borderLeftColor: green[500],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
        };
    if (record.status === 'in-transit')
        return {
            ...style,
            borderLeftColor: orange[500],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
        };
    if (record.status === 'not-received')
        return {
            ...style,
            borderLeftColor: red[500],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
        };
    else {
        return {
            ...style,
            borderLeftColor: 'transparent',
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
        };
    }
};

const PackageListActions = () => {
    return (
        <>
            <CreateButton label='Ghi nhận hàng' />
            <ExportButton />
        </>
    )
};
const PackageList = () => {

    const { data: pacs, isLoading: isLoadingChoices } = useGetList('package',
        {
            filter: {
                current_at: localStorage.getItem("point_reference"),
            },
            pagination: {
                page: 1,
                perPage: 100000,
            }
        });
    if (isLoadingChoices) {
        return (
            <></>
        );
    };

    function uniq(a) {
        var seen = {};
        return a.filter(function(item) {
            return seen.hasOwnProperty(item.receive_point_id) ? false : (seen[item.receive_point_id] = true);
        });
    }
    var pacs_uniq = uniq(pacs);
    const choices = pacs_uniq.map((pac) => ({
        id: pac.receive_point_id,
        name: pac.receive_point_id
    }));
    const packageFilter = [
        <SearchInput placeholder='Tìm kiếm mã hàng' source="package_id_q" alwaysOn />,
        <SearchInput placeholder='Tìm kiếm tên người gửi' source="send_name_q" alwaysOn />,
        <AutocompleteInput
            alwaysOn={true}
            label="Mã bưu chính người nhận"
            suggestionLimit={20}
            openText='Mở'
            source='receive_point_id_q'
            noOptionsText='Không tìm thấy mã'
            choices={choices}
            optionText="name"
            disabled={isLoadingChoices}
            isRequired
        />
    ];
    return (
        <List
            filters={packageFilter}
            filterDefaultValues={{ pack_type: 0 }}
            sort={{ field: 'package_id', order: 'DESC' }}
            perPage={25}
            title='Quản lý hàng điểm giao dịch'
            aside={<PackageListAside />}
            actions={<PackageListActions />}
        >
            <TabbedDatagrid />
        </List>
    );
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
                rowSx={rowSx}
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
const CostField = () => {
    const record = useRecordContext();
    return (
        <NumberField
            source='total_every_cost'
            options={{ style: 'currency', currency: 'VND' }}
            sx={{ color: 'red' }} />
    );
}
export default PackageList;
