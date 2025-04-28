import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: login, isPending } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user.user);
            navigate('/dashboard', { replace: true });
        },
        onError: (err) => {
            console.error(err);
            toast.error('Provided email or password are incorrect');
        },
    });

    return { login, isPending };
}

export { useLogin };
