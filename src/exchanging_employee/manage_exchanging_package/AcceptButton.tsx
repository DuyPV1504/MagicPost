import Button from '@mui/material/Button';

import {
    useRecordContext,
    useDataProvider,
    useNotify,
    useRefresh,
} from 'react-admin';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';


const AcceptButton = () => {
    const record = useRecordContext();
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const refresh = useRefresh();
    const handleClick = () => {
        dataProvider.getOne(
            "confirm",
            {
                delivery_id: record.id,
            }
        ).then(res => {
            notify(`Xác nhận đơn hàng ${record.delivery_id} thành công`, { type: 'success' });
            refresh();
        })
    }
    return record && ((record.status === 'not-resolved') && (record.dest_point_id === localStorage.getItem("point_reference") ||
        record.current_dest === 'receiver')
    ) ? (
        <Button
            variant="contained"
            color="success"
            size="small"
            onClick={handleClick}
            startIcon={
                <CheckOutlinedIcon />
            }
        >
            Đã nhận
        </Button>
    ) : null;
}

export default AcceptButton;