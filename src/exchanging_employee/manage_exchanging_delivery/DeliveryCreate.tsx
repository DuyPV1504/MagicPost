import * as React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    DateInput,
    SelectInput,
    useRedirect,
    useNotify,
    required,
    useGetList,
} from 'react-admin';
import { Box, Typography, TextField } from '@mui/material';
import { useWatch } from 'react-hook-form';
import { SpeedSharp } from '@mui/icons-material';
import { selIds } from '../manage_exchanging_package/PackageList';
import { package_receive_point_id } from '../manage_exchanging_package/CreateDeliveryButton';
export const validateForm = (
    values: Record<string, any>
): Record<string, any> => {
    const errors = {} as any;
    if (!values.create_date) {
        errors.create_date = 'ra.validation.required';
    }
    if (!values.begin_date) {
        errors.begin_date = 'ra.validation.required';
    }

    if (!values.expected_date) {
        errors.expected_date = 'ra.validation.required';
    }
    if (!values.current_from) {
        errors.current_from = 'ra.validation.required';
    }
    if (!values.from_point_id) {
        errors.from_point_id = 'ra.validation.required';
    }
    if (!values.current_dest) {
        errors.current_dest = 'ra.validation.required';
    }
    else if (values.current_dest === 'receiver') {
        if (!values.receive_name) {
            errors.receive_name = 'ra.validation.required';
        }
        if (!values.receive_phone) {
            errors.receive_phone = 'ra.validation.required';
        }
        if (!values.receive_address) {
            errors.receive_address = 'ra.validation.required';
        }
    }
    else if (values.current_dest !== 'gathering') {
        errors.current_dest = 'Điểm đến không hợp lệ';
    }
    return errors;
};

const DeliveryCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const transform = (data: any) => {
        if (data.current_dest !== "receiver") {
            data.current_dest = 'gathering';
        }
        if (localStorage.getItem("current_delivery_mode") === "1") {
            data.packages = selIds;
        }
        return data;
    }
    const onSuccess = (data: any) => {
        localStorage.removeItem("current_package_id");
        localStorage.removeItem("current_receive_name");
        localStorage.removeItem("current_receive_phone");
        localStorage.removeItem("current_receive_address");
        localStorage.removeItem("current_delivery_mode");
        notify(`Tạo đơn hàng thành công. Mã đơn hàng: ${data.delivery_id}`, {type: 'success'});

        redirect('/exchangingDelivery');
    }
    const { data: pointList, isLoading: isLoading } = useGetList("points");
    if (isLoading) {
        return null;
    }
    for (let i = 0; i < pointList?.length; ++i) {
        if (pointList[i].id === localStorage.getItem("current_point_id")) {
            localStorage.setItem("link_point_id", pointList[i].link_point_id);
            break;
        }
    }

    return (
        <Create
            sx={{
                [`& .RaCreate-main`]: {
                    width: '50%',
                },
            }}
            transform={transform}
            title='Ghi nhận đơn hàng mới'
            redirect="../"
            mutationOptions={{ onSuccess }}

        >

            <SimpleForm
                validate={validateForm}
                defaultValues={{
                    packages: [localStorage.getItem('current_package_id')],
                    package_id: localStorage.getItem('current_package_id'),
                    create_date: new Date(),
                    begin_date: new Date(),
                    expected_date: new Date(),
                    current_dest: 'gathering',
                    current_from: 'exchanging',
                    status: 'not-resolved',
                    is_delivered: 0,
                    from_point_id: localStorage.getItem('point_reference') === null ? "" : localStorage.getItem('point_reference'),
                    dest_point_id: localStorage.getItem('link_point_id') === null ? "" : localStorage.getItem('link_point_id'),
                    receive_name: localStorage.getItem('current_receive_name') === null ? "" : localStorage.getItem('current_receive_name'),
                    receive_phone: localStorage.getItem('current_receive_phone') === null ? "" : localStorage.getItem('current_receive_phone'),
                    receive_address: localStorage.getItem('current_receive_address') === null ? "" : localStorage.getItem('current_receive_address'),
                }}>
                <SectionTitle label="Thông tin chung" />
                {selIds.length === 0 || localStorage.getItem("current_delivery_mode") !== "1" ? (
                    <Box display={{ xs: 'block', sm: 'flex', width: '40%' }}>
                        <TextInput label="Mã hàng" source="package_id" isRequired fullWidth disabled />
                    </Box>
                ) : null}

                <Box display={{ xs: 'block', sm: 'flex', width: '50%' }}>
                    <Box flex={0.5} mr={{ xs: 0, sm: '1em' }}>
                        <DateInput label="Ngày tạo" source="create_date" isRequired disabled />
                    </Box>
                    <Box flex={1} mr={{ xs: 1, sm: '2em' }}>
                        <DateInput label="Ngày gửi" source="begin_date" isRequired />
                    </Box>
                    <Box flex={2.5} mr={{ xs: 1, sm: '2em' }}>
                        <DateInput label="Dự kiến" source="expected_date" isRequired />
                    </Box>
                </Box>
                <Box display={{ xs: 'block', sm: 'flex', width: '50%' }}>
                    <SendFromField />
                </Box>
                <Separator />
                {selIds.length === 0 || localStorage.getItem("current_delivery_mode") !== "1"? (
                    <SelectInput
                        label="Chuyển đến"
                        source="current_dest"
                        choices={[
                            { id: 'gathering', name: 'Điểm tập kết' },
                            { id: 'receiver', name: 'Người nhận' },
                        ]}
                        validate={required()}
                    />) : (
                    <SelectInput
                        label="Chuyển đến"
                        source="current_dest"
                        choices={[
                            { id: 'gathering', name: 'Điểm tập kết' },
                        ]}
                        validate={required()}
                    />
                )}
                <SpecialNotify />
                <SendToField />
                <Separator />
                <Box display={{ width: '100%' }}>
                    <TextInput
                        source="note"
                        multiline
                        fullWidth
                        helperText={false}
                        label='Ghi chú'
                    />
                </Box>
            </SimpleForm>

        </Create>
    );
}

const SpecialNotify = () => {
    const notify = useNotify();
    const curDest = useWatch({name: 'current_dest'});
    
    if (curDest === 'receiver' && package_receive_point_id !== localStorage.getItem('point_reference')) {
        notify('Chú ý điểm hiện tại không trùng khớp với mã điểm giao dịch người nhận', {type: 'error'});
        return (
            <></>
        );
    }
    return (
        <></>
    );
}
const SendFromField = () => {
    var current_from = useWatch({ name: 'current_from' });
    var name = "";
    if (current_from === 'exchanging') {
        name = "Điểm giao dịch (" + localStorage.getItem("point_reference") + ")";
    }
    return (
        <TextField
            disabled={true}
            label="Chuyển từ"
            variant="filled"
            value={name}
            required={true}
        />
    );
}

const SendToField = () => {
    var current_dest = useWatch({ name: 'current_dest' });
    var link_point_id = localStorage.getItem('link_point_id') === null ? "" : localStorage.getItem('link_point_id');

    if (current_dest === 'gathering') {
        var name = "Điểm tập kết (" + link_point_id + ")";
        return (
            <TextField
                disabled={true}
                label="Chuyển đến"
                variant="filled"
                value={name}
            />
        );
    }
    else if (current_dest === 'receiver') {
        return (
            <>
                <SectionTitle label="Người nhận hàng" />
                <Box display={{ xs: 'block', sm: 'flex', width: '80%' }}>
                    <Box flex={1.5} mr={{ xs: 0, sm: '1em' }}>
                        <TextInput label="Tên" source="receive_name" isRequired fullWidth />
                    </Box>
                    <Box flex={1} mr={{ xs: 1, sm: '2em' }}>
                        <TextInput label="SĐT" source="receive_phone" isRequired fullWidth />
                    </Box>
                </Box>
                <TextInput label="Địa chỉ" source="receive_address" isRequired fullWidth />
            </>
        );
    }
}
const SectionTitle = ({ label }: { label: string }) => {

    return (
        <Typography variant="h6" gutterBottom>
            {label}
        </Typography>
    );
};

const Separator = () => <Box pt="1em" />;

export default DeliveryCreate;
