import { useMutation } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

function useSingup() {
    const { mutate: signUp, isPending } = useMutation({
        mutationFn: signUpApi,
        onSuccess: () => {
            toast.success(
                "Account successfully created! Please verify the new account from the user's email address."
            );
        },
        onError: (error) => {
            console.error(error.message);
            toast.error(error.message);
        },
    });

    return { signUp, isPending };
}

export default useSingup;
