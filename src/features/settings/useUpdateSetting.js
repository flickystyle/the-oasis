import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';
import toast from 'react-hot-toast';

function useUpdateSetting() {
    const queryClient = useQueryClient();
    const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success('Setting succefully updated');
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isUpdating, updateSetting };
}

export { useUpdateSetting };
