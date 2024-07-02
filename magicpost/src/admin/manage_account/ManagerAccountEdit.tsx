import * as React from 'react';
import {
    TextInput,
    SelectInput,
    SimpleForm,
    Edit,
    ListButton,
    TopToolbar,
    Toolbar,
    SaveButton,
    DateInput,
    PasswordInput,
    required,
    email,
    DeleteWithConfirmButton,
} from 'react-admin';
import { Grid, Box, Typography } from '@mui/material';

import PointNameField from './PointNameField';


const ManagerAccountEditActions = () => (
    <TopToolbar>
        <ListButton />
    </TopToolbar>
);

const FormEditToolBar = () => (
    <Toolbar>
        <SaveButton />
        <DeleteWithConfirmButton
            mutationMode='pessimistic'
            confirmTitle='Xóa tài khoản'
            confirmContent='Bạn có chắc chắc muốn xóa tài khoản này?'
        />
    </Toolbar>
)

export const validateForm = (
    values: Record<string, any>
): Record<string, any> => {
    const errors = {} as any;
    if (!values.name) {
        errors.name = 'ra.validation.required';
    }
    if (!values.sex) {
        errors.sex = 'ra.validation.required';
    }
    if (!values.email) {
        errors.email = 'ra.validation.required';
    } else {
        const error = email()(values.email);
        if (error) {
            errors.email = error;
        }
    }
    return errors;
};

const PointEdit = () => {
    const transform = (data: any) => {
        return data;
    };
    return (
        <Edit
            transform={transform}
            title={<ManagerAccountEditActions />}
            mutationMode='pessimistic'
            sx={{
                [`& .RaEdit-main`]: {
                    width: '45%',
                },
            }}
        >
            <SimpleForm validate={validateForm} toolbar={<FormEditToolBar />}>
                <Grid container width={{ xs: '100%', xl: 800 }} spacing={2}>
                    <Grid item xs={12} md={8}>
                        <SectionTitle label="Thông tin chung" />
                        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                            <Box flex={1} mr={{ xs: 0, sm: '1em' }}>
                                <TextInput label="Tên" source="name" isRequired fullWidth />
                            </Box>
                            <Box flex={1} mr={{ xs: 0, sm: '0.2em' }}>
                                <SelectInput
                                    label="Giới tính"
                                    source="sex"
                                    choices={[
                                        { id: 'male', name: 'Nam' },
                                        { id: 'female', name: 'Nữ' },
                                    ]}
                                    validate={required()}
                                />
                            </Box>
                        </Box>
                        <TextInput type="email" source="email" isRequired fullWidth />
                        <DateInput source="birthday" label='Ngày sinh' />
                        <Separator />
                    </Grid>
                </Grid>
            </SimpleForm>
        </Edit>
    );
};

const SectionTitle = ({ label }: { label: string }) => {

    return (
        <Typography variant="h6" gutterBottom>
            {label}
        </Typography>
    );
};

const Separator = () => <Box pt="1em" />;

const PointTitle = () => <PointNameField sx={{ fontSize: '1.1rem' }} />;

export default PointEdit;
