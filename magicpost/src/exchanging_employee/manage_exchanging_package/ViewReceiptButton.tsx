import { Button } from '@mui/material';

import {
    useRecordContext,
} from 'react-admin';
import { Link } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { stringify } from 'query-string';


const ViewReceiptButton = () => {
    const record = useRecordContext();
    if (record.delivery_id) {
        return (

            <Button
                variant='outlined'
                size="small"
                color="primary"
                component={Link}
                startIcon={
                    <SearchOutlinedIcon />
                }
                to={{
                    pathname: '/exchangingDelivery',
                    search: stringify({
                        filter: JSON.stringify({ delivery_id_q: record.delivery_id }),
                    }),
                }}
                state={{ _scrollToTop: true }}
            >
                Xem đơn hàng
            </Button>

        );
    }
    else {
        return null;
    }

}

export default ViewReceiptButton;