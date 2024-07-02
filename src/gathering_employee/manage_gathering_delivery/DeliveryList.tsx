import * as React from 'react';
import { useCallback } from 'react';
import { List, ExportButton, FilterButton } from 'react-admin';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { Box, Drawer, useMediaQuery, Theme } from '@mui/material';

import ListDetail from './ListDetail';
import gatheringDeliveryFilters from './gatheringDeliveryFilters';
import DeliveryShow from './DeliveryShow';


const DeliveryListActions = () => {
    return (
        <>
            <FilterButton />
            <ExportButton />

        </>
    )
};

const DeliveryList = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleClose = useCallback(() => {
        navigate('/gatheringDelivery');
    }, [navigate]);

    const match = matchPath('/gatheringDelivery/:id', location.pathname);

    return (
        <Box display="flex">
            <List
                actions={<DeliveryListActions />}
                sx={{
                    flexGrow: 1,
                    transition: (theme: any) =>
                        theme.transitions.create(['all'], {
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    marginRight: !!match ? '400px' : 0,
                }}
                filters={gatheringDeliveryFilters}
                filterDefaultValues={{delivery_type: 0}}
                perPage={25}
                sort={{ field: 'delivery_id', order: 'DESC' }}
                title='Danh sách đơn hàng'
            >
                <ListDetail
                    selectedRow={
                        !!match
                            ? parseInt((match as any).params.id, 10)
                            : undefined
                    }
                />
            </List>
            <Drawer
                variant="persistent"
                open={!!match}
                anchor="right"
                onClose={handleClose}
                sx={{ zIndex: 100 }}
            >
                { }
                {!!match && (
                    <DeliveryShow
                        id={(match as any).params.id}
                        onCancel={handleClose}
                    />
                )}
            </Drawer>
        </Box>
    );
};

export default DeliveryList;
