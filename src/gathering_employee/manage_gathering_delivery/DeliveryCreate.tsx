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
    AutocompleteInput,
} from 'react-admin';
import { Box, Typography, TextField } from '@mui/material';
import { useWatch } from 'react-hook-form';
import { SpeedSharp } from '@mui/icons-material';
import { selIds } from '../manage_gathering_package/PackageList';
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
    return errors;
};

const DeliveryCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const transform = (data: any) => {
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
        notify(`Tạo đơn hàng thành công. Mã đơn hàng: ${data.delivery_id}`, { type: 'success' });

        redirect('/gatheringDelivery');
    }
    const { data: pointList, isLoading: isLoading } = useGetList("points");
    if (isLoading) {
        return null;
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
                    current_from: 'gathering',
                    status: 'not-resolved',
                    is_delivered: 0,
                    from_point_id: localStorage.getItem('point_reference') === null ? "" : localStorage.getItem('point_reference'),
                    dest_point_id: '',
                    receive_name: localStorage.getItem('current_receive_name') === null ? "" : localStorage.getItem('current_receive_name'),
                    receive_phone: localStorage.getItem('current_receive_phone') === null ? "" : localStorage.getItem('current_receive_phone'),
                    receive_address: localStorage.getItem('current_receive_address') === null ? "" : localStorage.getItem('current_receive_address'),
                }}>
                <SectionTitle label="Thông tin chung" />
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
                <SelectInput
                    label="Chuyển đến"
                    source="current_dest"
                    choices={[
                        { id: 'gathering', name: 'Điểm tập kết' },
                        { id: 'exchanging', name: 'Điểm giao dịch' },
                    ]}
                    validate={required()}
                />
                <SendToField />
                <DestPointDetail />
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

const SendFromField = () => {
    var current_from = useWatch({ name: 'current_from' });
    var name = "";
    name = "Điểm tập kết (" + localStorage.getItem("point_reference") + ")";

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

const ExchangingSelect = () => {
    const { data: points, isLoading: isLoadingChoices } = useGetList('points',
        {
            filter: {
                p_type: "1"
            },
            pagination: {
                page: 1,
                perPage: 100000,
            }
        });
    var choices = [];
    if (!isLoadingChoices) {
        var has = [];
        for (let i = 0; i < points?.length; ++i) {
            if (points[i].link_point_reference === localStorage.getItem("point_reference")) {
                has.push(points[i].reference);
            }
        }
        choices = has.map((point) => ({
            id: point,
            name: point,
        }));
    }
    return (
        <AutocompleteInput
            alwaysOn={true}
            label="Mã điểm giao dịch"
            suggestionLimit={20}
            openText='Mở'
            source='dest_point_id'
            noOptionsText='Không tìm thấy mã'
            choices={choices}
            optionText="name"
            disabled={isLoadingChoices}
            isRequired
        />
    );
}

const DestPointDetail = () => {
    const destPoint = useWatch({ name: 'dest_point_id' });
    const { data: points, isLoading: isLoadingChoices } = useGetList('points',
        {
            pagination: {
                page: 1,
                perPage: 100000,
            }
        });
    if (isLoadingChoices) {
        return (
            <></>
        );
    }
    var curPoint;
    for (let i = 0; i < points?.length; ++i) {
        if (points[i].reference === destPoint) {
            curPoint = i;
            break;
        }
    }
    if (curPoint === undefined) {
        return (
            <></>
        );
    }
    var address = `${points[curPoint].location}, ${points[curPoint].city}, ${points[curPoint].zipcode}`;
    var pName = points[curPoint].name;
    return (
        <>
            <TextField
                disabled={true}
                label="Tên điểm"
                variant="filled"
                value={pName}
            />
            <TextField
                multiline
                fullWidth
                disabled={true}
                label="Địa chỉ điểm"
                variant="filled"
                value={address}

            />
        </>
    );
}

const GatheringSelect = () => {
    const { data: points, isLoading: isLoadingChoices } = useGetList('points',
        {
            filter: {
                p_type: "0"
            },
            pagination: {
                page: 1,
                perPage: 100000,
            }
        });
    var choices = [];
    if (!isLoadingChoices) {
        choices = points.map((point) => ({
            id: point.reference,
            name: point.reference,
        }));
    }
    return (
        <AutocompleteInput
            alwaysOn={true}
            label="Mã điểm tập kết"
            suggestionLimit={20}
            openText='Mở'
            source='dest_point_id'
            noOptionsText='Không tìm thấy mã'
            choices={choices}
            optionText="name"
            disabled={isLoadingChoices}
            isRequired
        />
    );
}
const SendToField = () => {
    var current_dest = useWatch({ name: 'current_dest' });
    if (current_dest === 'gathering') {
        var name = "Điểm tập kết"
        return (
            <>
                <GatheringSelect />
            </>
        );
    }
    else if (current_dest === 'exchanging') {
        return (
            <>
                <ExchangingSelect />
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
