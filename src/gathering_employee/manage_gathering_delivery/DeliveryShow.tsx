import * as React from 'react';
import {
    ShowBase,
    TextField,
    DateField,
    SimpleForm,
    Labeled,
    useRecordContext,
    TextInput,
    useGetMany,
} from 'react-admin';
import {
    Stack, IconButton,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ColoredFromField from './ColoredFromField';
import ColoredDestDetailField from './ColoredDestDetailField';
import AcceptButton from '../../exchanging_employee/manage_exchanging_package/AcceptButton';
import RejectButton from '../../exchanging_employee/manage_exchanging_package/RejectButton';
const TableCellRight = styled(TableCell)({ textAlign: 'right' });
const DeliveryShow = ({ id, onCancel }: any) => {

    return (
        <ShowBase id={id} disableAuthentication>
            <Box pt={5} width={{ xs: '100vW', sm: 400 }} mt={{ xs: 2, sm: 1 }}>
                <Stack direction="row" p={2}>
                    <Typography variant="h6" flex="1">
                        Thông tin đơn hàng
                    </Typography>
                    <IconButton onClick={onCancel} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <SimpleForm
                    sx={{ pt: 0, pb: 0 }}
                    toolbar={<></>}
                >
                    <Grid container rowSpacing={1} mb={1}>
                        <Grid item xs={6}>
                            <Labeled>
                                <TextField label='Mã đơn' source='delivery_id' />
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled>
                                <DateField label='Ngày tạo' source='create_date' />
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled>
                                <DateField label='Ngày gửi' source="begin_date" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={6}>
                            <Labeled>
                                <DateField label='Dự kiến' source="expected_date" />
                            </Labeled>
                        </Grid>
                        <ReceivedField />
                    </Grid>
                    <Separator />

                    <Labeled>
                        <ColoredFromField label='Chuyển từ' source='current_from' />
                    </Labeled>
                    <ReceiverDetailField />
                    <ListPackageField />
                    <TextInput
                        label='Ghi chú'
                        source="note"
                        maxRows={8}
                        multiline
                        fullWidth
                        disabled={true}
                    />
                    <Stack direction="row" spacing={2}>
                        <AcceptButton />
                        <RejectButton />
                    </Stack>
                </SimpleForm>
            </Box>
        </ShowBase>
    );
};

const PackageDetail = (record: any) => {
    record = record.record;
    return (
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
            </CardContent>
        </Card>
    );
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const ListPackageField = () => {
    const [open, setOpen] = React.useState(false);
    const [pacIdx, setPacIdx] = React.useState(0);
    const record = useRecordContext();

    const display = 'block';
    const { data: pacs, isLoading, error } = useGetMany<any>(
        'exchangingPackage',
        { ids: record.packages }
    );
    if (isLoading) {
        return (
            <></>
        );
    }
    const handleListItemClick = (id: any) => {
        for (let i = 0; i < pacs?.length; ++i) {
            if (pacs[i].id === id) {
                setPacIdx(i);
                break;
            }
        }
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <React.Fragment>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth="md"
                    scroll="body"
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Thông tin hàng
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <PackageDetail record={pacs[pacIdx]} />
                </BootstrapDialog>
            </React.Fragment>
            <List sx={{ display }}>
                {record.packages?.map((pac: any) => (
                    <ListItem
                        key={pac}
                        onClick={(event) => handleListItemClick(pac)}
                        alignItems="flex-start"
                    >
                        <ListItemText
                            secondary={`Mã hàng ${pac}`}

                        />
                    </ListItem>
                ))}
            </List>
        </>
    );
}

const ReceivedField = () => {
    const record = useRecordContext();
    if (record.is_delivered && record.status === 'resolved') {
        return (
            <Grid item xs={6}>
                <Labeled>
                    <DateField label='Ngày nhận' source="arrived_date" />
                </Labeled>
            </Grid>
        );
    }
    record.receive_date123 = 'Chưa nhận'
    return (
        <Grid item xs={6}>
            <Labeled>
                <TextField label='Ngày nhận' source="receive_date123" />
            </Labeled>
        </Grid>
    );
}

const ReceiverDetailField = () => {
    const record = useRecordContext();
    if (record.current_dest === 'receiver') {
        return (
            <>
                <Typography variant="h6">
                    Người nhận hàng
                </Typography>
                <Labeled>
                    <TextField label='Tên' source="receive_name" />
                </Labeled>
                <Labeled>
                    <TextField label='SĐT' source="receive_phone" />
                </Labeled>
                <Labeled>
                    <TextField label='Địa chỉ' source="receive_address" />
                </Labeled>
            </>
        );
    }
    record.receive_date123 = 'Chưa nhận'
    return (
        <>
            <Labeled>
                <ColoredDestDetailField label='Chuyển đến' source='current_dest' />
            </Labeled>
        </>
    );
};
const Separator = () => <Box pt="1em" />;

export default DeliveryShow;
