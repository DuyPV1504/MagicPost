import Button from '@mui/material/Button';

import {
    useRecordContext,
    useDataProvider,
    useNotify,
    useRefresh,
} from 'react-admin';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const RejectButton = () => {
    const record = useRecordContext();
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const refresh = useRefresh();
    const handleClick = () => {
        dataProvider.getOne(
            "reject",
            {
                delivery_id: record.id,
            }
        ).then(res => {
            notify(`Đơn hàng ${record.delivery_id} không chuyển thành công`, { type: 'error' });
            refresh();
        })
    }
    return record && ( (record.status === 'not-resolved') && (record.current_dest === 'receiver') && record.from_point_id === localStorage.getItem("point_reference"))
    ? (
        <Button
            variant="contained"
            color="error"
            size="small"
            onClick={handleClick}
            startIcon={
                <CloseOutlinedIcon />
            }
        >
            Không nhận được
        </Button>
    ) : null;
}

export default RejectButton;