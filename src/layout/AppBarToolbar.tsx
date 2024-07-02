import { LoadingIndicator } from 'react-admin';
import { ChangePasswordButton } from "./ChangePasswordButton"
import { useAuthProvider } from 'react-admin';
import ProfileButton from './ProfileButton';
export const AppBarToolbar = () => {
    const auth = useAuthProvider();
    const role = auth.getRole();
    if (role === 'admin') {
        return (
            <>
                <LoadingIndicator />
                <ChangePasswordButton />
            </>);
    }
    else if (role !== 'guest') {
        return (
            <>
                <LoadingIndicator />
                <ChangePasswordButton />
                <ProfileButton />
            </>);
    }
    else {
        return (
            <>
                <LoadingIndicator />
            </>);
    }
};
