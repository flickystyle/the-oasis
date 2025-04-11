import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addOrEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

function useEditCabin() {
    const queryClient = useQueryClient();
    const { isLoading: isEditing, mutate: editCabin } = useMutation({
        mutationFn: ({ newCabinData, id }) => addOrEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success('Cabin succefully updated');
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editCabin };
}

export { useEditCabin };
