import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addOrEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

function useAddCabin() {
    const queryClient = useQueryClient();

    const { isLoading: isAdding, mutate: addCabin } = useMutation({
        mutationFn: addOrEditCabin,
        onSuccess: () => {
            toast.success('Cabin succefully added');
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isAdding, addCabin };
}

export { useAddCabin };
