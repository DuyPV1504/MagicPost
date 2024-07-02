import * as React from 'react';
import {
    Button,
    CircularProgress,
} from '@mui/material';
import { useTranslate, Title, useNotify, useDataProvider } from 'react-admin';
import SearchIcon from './SearchIcon'
import { matchPath } from 'react-router';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { ReferenceField, useRecordContext } from 'react-admin';
import { styled } from '@mui/material/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import Stack from '@mui/material/Stack';

function gup(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}


const Search = () => {
    var pid = gup("package_id", window.location.href);
    if (pid === null) {
        pid = '';
    }
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [billID, setBillID] = React.useState(pid);
    const [billID1, setBillID1] = React.useState('');
    const notify = useNotify();
    const translate = useTranslate();


    

    const handleClick = async () => {
        setLoading(true);
        setBillID1(billID);
        setOpen(true);
    };
    return (
        <Box
            sx={{
                '& > :not(button):not(style)': { m: 1, width: '100ch' },
                '& > :is(button):not(style)': {
                    m: 1,
                },
            }}
        >
            <TextField
                autoFocus
                id="bill_id"
                label="Mã bưu gửi"
                variant="outlined"
                value={billID}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setBillID(event.target.value);
                }}
            />
            <Button
                variant="contained"
                endIcon={loading ? (<CircularProgress size={15} thickness={2} />) : (<SearchIcon />)}
                onClick={handleClick}
                disabled={loading}
            >
                Tra cứu
            </Button>
            {(pid !== '' && pid !== null && (
                <HistoryShow
                    id={pid} changeState={setBillID1} change={setLoading} change1={setOpen}
                />
            )) || (
                    open && <HistoryShow
                        id={billID1} changeState={setBillID1} change={setLoading} change1={setOpen}
                    />

                )}
        </Box>
    );
};

const HistoryShow = ({ id, changeState, change, change1 }: any) => {
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const [record, setRecord] = React.useState(undefined);
    const [his, setHis] = React.useState(undefined);
    if (id === '') {
        return (
            <></>
        );
    }
    const getData = (pid) => {
        dataProvider.getOne(
            "getPackage",
            {
                package_id: pid,
            }
        ).then(res => {
            res = res.data;
            if (res.error) {
                notify("Không tìm thấy mã bưu gửi", { type: 'error' });
                change1(false);
                changeState("");
                change(false);

                return (
                    <></>
                );
            }
            else {
                setRecord(res.pac);
                dataProvider.getOne(
                    "getHis",
                    {
                        package_id: pid,
                    }
                ).then(res => {
                    res = res.data;
                    setHis(res.his);
                    change(false);
                })
            }

        });
    }
    const tmp = React.useMemo(() => getData(id), [id]);
    if (record === undefined || his === undefined) {
        return (
            <></>
        );
    }
    return (
        <>
            <Card sx={{ width: 900, margin: 'auto' }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" gutterBottom>
                                Người gửi:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" gutterBottom align="left">
                                Người nhận:
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography gutterBottom>
                                Họ và tên: {record.send_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom align="left">
                                Họ và tên: {record.receive_name}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography gutterBottom>
                                SĐT: {record.send_phone}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom align="left">
                                SĐT: {record.receive_phone}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography gutterBottom>
                                Địa chỉ: {record.send_address}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom align="left">
                                Địa chỉ: {record.receive_address}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography gutterBottom>
                                Mã bưu chính: {record.send_point_id}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom align="left">
                                Mã bưu chính: {record.receive_point_id}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box height={20}>&nbsp;</Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" gutterBottom align="center">
                                Ngày gửi{' '}
                            </Typography>
                            <Typography gutterBottom align="center">
                                {new Date(record.send_date).toLocaleDateString()}
                            </Typography>
                        </Grid>

                        <Grid item xs={5}>
                            <Typography variant="h6" gutterBottom align="center">
                                Mã bưu gửi
                            </Typography>
                            <Typography gutterBottom align="center">
                                {record.package_id}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Vật phẩm
                                        </TableCell>
                                        <TableCellRight>
                                            Số lượng
                                        </TableCellRight>
                                        <TableCellRight>
                                            Giá trị
                                        </TableCellRight>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {record.items.map((item: any) => (
                                        <TableRow key={item.item_name}>
                                            <TableCell>
                                                {item.item_name}
                                            </TableCell>
                                            <TableCellRight>{item.quantity}</TableCellRight>
                                            <TableCellRight>
                                                {item.value.toLocaleString(
                                                    undefined,
                                                    {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }
                                                )}
                                            </TableCellRight>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item xs={6}>
                            <Table>
                                <TableHead>
                                    <TableRow key={0}>
                                        <TableCell>
                                            Loại cước
                                        </TableCell>
                                        <TableCellRight>
                                            Giá trị
                                        </TableCellRight>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={1}>
                                        <TableCell>
                                            Cước chính
                                        </TableCell>
                                        <TableCellRight>
                                            {record.main_cost.toLocaleString(
                                                undefined,
                                                {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }
                                            )}
                                        </TableCellRight>
                                    </TableRow>
                                    <TableRow key={2}>
                                        <TableCell>
                                            Cước phụ
                                        </TableCell>
                                        <TableCellRight>
                                            {record.other_cost.toLocaleString(
                                                undefined,
                                                {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }
                                            )}
                                        </TableCellRight>
                                    </TableRow>
                                    <TableRow key={3}>
                                        <TableCell>
                                            Cước GTGT
                                        </TableCell>
                                        <TableCellRight>
                                            {record.gtgt_cost.toLocaleString(
                                                undefined,
                                                {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }
                                            )}
                                        </TableCellRight>
                                    </TableRow>
                                    <TableRow key={4}>
                                        <TableCell>
                                            Tổng cước
                                        </TableCell>
                                        <TableCellRight>
                                            {(record.total_cost).toLocaleString(
                                                undefined,
                                                {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }
                                            )}
                                        </TableCellRight>
                                    </TableRow>
                                    <TableRow key={5}>
                                        <TableCell>
                                            Thu khác
                                        </TableCell>
                                        <TableCellRight>
                                            {(record.other_service_cost).toLocaleString(
                                                undefined,
                                                {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }
                                            )}
                                        </TableCellRight>
                                    </TableRow>
                                    <TableRow key={6}>
                                        <TableCell>
                                            Tổng thu
                                        </TableCell>
                                        <TableCellRight>
                                            {(record.total_cost + record.other_service_cost).toLocaleString(
                                                undefined,
                                                {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }
                                            )}
                                        </TableCellRight>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                    <History his={his} />
                </CardContent>
            </Card>
        </>
    );
}

const History = ({ his }: any) => {

    var status = '';
    if (his[his.length - 1].finished === 3) {
        status = 'Đã chuyển thành công';
    }
    else if (his[his.length - 1].finished === 1) {
        status = 'Đang chuyển';
    }
    for (let i = 0; i < his.length; ++i) {
        if (his[i].finished === 2) {
            status = 'Chuyển không thành công và hoàn trả';
        }
    }
    return (
        <>
            <Typography variant="h5" gutterBottom>
                Trạng thái bưu gửi: {status}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Lộ trình
            </Typography>
            <Table>
                <TableHead>
                    <TableRow key={0}>
                        <TableCell>
                            Thời gian
                        </TableCell>
                        <TableCell>
                            Trạng thái
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {his.map((h: any) => (
                        <SpecialRow key={h.id} data={h} />
                    ))
                    }
                </TableBody>
            </Table>
        </>
    );
}

const SpecialRow = ({ data }: any) => {
    if (data.type === 0) {
        return (
            <>
                <TableRow key={data.id}>
                    <TableCell >
                        {`${data.begin_time.toLocaleTimeString()} ${data.begin_time.toLocaleDateString()}`}
                    </TableCell>
                    <TableCell >
                        Đã ghi nhận hàng
                    </TableCell>
                </TableRow>
            </>
        )
    }
    else {
        if (data.finished === 0) {
            return (
                <>
                    <TableRow key={data.id}>
                        <TableCell >
                            {`${data.begin_time.toLocaleTimeString()} ${data.begin_time.toLocaleDateString()}`}
                        </TableCell>
                        <TableCell >
                            Chuyển hàng từ <b>{data.from}</b> đến <b>{data.to}</b>
                        </TableCell>
                    </TableRow>
                </>
            )
        }
        if (data.finished === 1) {
            return (
                <>
                    <TableRow key={data.id}>
                        <TableCell >
                            {`${data.begin_time.toLocaleTimeString()} ${data.begin_time.toLocaleDateString()}`}
                        </TableCell>
                        <TableCell >
                            Chuyển hàng từ <b>{data.from}</b> đến <b>{data.to}</b>
                        </TableCell>
                    </TableRow>
                    <TableRow key={data.id}>
                        <TableCell >
                            {`${data.end_time.toLocaleTimeString()} ${data.end_time.toLocaleDateString()}`}
                        </TableCell>
                        <TableCell >
                            Hàng xác nhận đến <b>{data.to}</b>
                        </TableCell>
                    </TableRow>
                </>
            )
        }
        if (data.finished === 2) {
            return (
                <>
                    <TableRow key={data.id}>
                        <TableCell >
                            {`${data.begin_time.toLocaleTimeString()} ${data.begin_time.toLocaleDateString()}`}
                        </TableCell>
                        <TableCell >
                            Chuyển hàng từ <b>{data.from}</b> đến <b>{data.to}</b>
                        </TableCell>
                    </TableRow>
                    <TableRow key={data.id}>
                        <TableCell >
                            {`${data.end_time.toLocaleTimeString()} ${data.end_time.toLocaleDateString()}`}
                        </TableCell>
                        <TableCell >
                            Hàng không chuyển được đến <b>{data.to}</b> và hoàn trả.
                        </TableCell>
                    </TableRow>
                </>
            )
        }
        if (data.finished === 3) {
            return (
                <>
                    <TableRow key={data.id}>
                        <TableCell >
                            {`${data.begin_time.toLocaleTimeString()} ${data.begin_time.toLocaleDateString()}`}
                        </TableCell>
                        <TableCell >
                            Chuyển hàng từ <b>{data.from}</b> đến <b>{data.to}</b>
                        </TableCell>
                    </TableRow>
                    <TableRow key={data.id}>
                        <TableCell >
                            {`${data.end_time.toLocaleTimeString()} ${data.end_time.toLocaleDateString()}`}
                        </TableCell>
                        <TableCell >
                            Hàng hoàn thành chuyển phát đến <b>{data.to}</b>.
                        </TableCell>
                    </TableRow>
                </>
            )
        }
    }
}
const TableCellRight = styled(TableCell)({ textAlign: 'right' });
export default Search;
