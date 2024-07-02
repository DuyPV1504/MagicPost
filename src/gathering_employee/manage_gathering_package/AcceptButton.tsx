import Button from '@mui/material/Button';

import {
    useRecordContext,
} from 'react-admin';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';


const AcceptButton = () => {
    const record = useRecordContext();
    return record && ( (record.status === 'in-transit' || record.status === 'Đang chuyển')
        && (record.save_dest === 'gathering') && (record.dest_point_id === localStorage.getItem("current_point_id"))
    ) ? (
        <Button
            variant="contained"
            color="success"
            size="small"
            startIcon={
                <CheckOutlinedIcon />
            }
        >
            Đã nhận
        </Button>
    ) : null;
}

export default AcceptButton;