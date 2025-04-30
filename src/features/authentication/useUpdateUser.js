import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import toast from 'react-hot-toast';

function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isPending } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: () => {
            toast.success('User account successfully updated');
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (error) => {
            console.error(error.message);
            toast.error();
        },
    });

    return { updateUser, isPending };
}

export { useUpdateUser };
