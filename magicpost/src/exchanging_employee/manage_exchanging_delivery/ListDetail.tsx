import * as React from 'react';
import {
    Identifier,
    Datagrid,
    DateField,
    TextField,
    Count,
    useListContext,
} from 'react-admin';

import rowSx from './rowSx';
import ColoredDestField from './ColoredDestField';
import ColoredFromField from './ColoredFromField';
import FinishStateField from './FinishStateField';
import StatusField from './StatusField';
export interface ListDetailProps {
    selectedRow?: Identifier;
}
import { Divider, Tabs, Tab } from '@mui/material';

const tabs = [
    { id: 'create', name: 'Đơn hàng tạo', val: 0 },
    { id: 'coming', name: 'Đơn hàng chuyển đến', val: 1 },
];


const ListDetail = ({ selectedRow }: ListDetailProps) => {
    const listContext = useListContext();
    const { filterValues, setFilters, displayedFilters } = listContext;
    const handleChange = React.useCallback(
        (event: React.ChangeEvent<{}>, value: any) => {
            setFilters &&
                setFilters(
                    { ...filterValues, delivery_type: value },
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
                value={filterValues.delivery_type}
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
                                        delivery_type: choice.val,
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
                rowClick="edit"
                rowSx={rowSx(selectedRow)}
                optimized
                bulkActionButtons={<></>}
                sx={{
                    '& .RaDatagrid-thead': {
                        borderLeftColor: 'transparent',
                        borderLeftWidth: 5,
                        borderLeftStyle: 'solid',
                    },
                    '& .column-comment': {
                        maxWidth: '18em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    },
                }}
            >
                <TextField source="delivery_id" label="Mã đơn hàng" />
                <DateField source="create_date" label="Ngày tạo" />
                <DateField source="begin_date" label="Ngày gửi" />
                <ColoredFromField source='current_from' label='Chuyển từ' />
                <ColoredDestField source='current_dest' label='Chuyển đến' />
                <StatusField label='Trạng thái' />
                <FinishStateField label='Thành công?' />

            </Datagrid>
        </React.Fragment>
    );
}
export default ListDetail;
