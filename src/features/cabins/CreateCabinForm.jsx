import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useForm } from 'react-hook-form';
import { addOrUpdateCabin } from '../../services/apiCabins';

function CreateCabinForm({ cabinToEdit = {} }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;
    const queryClient = useQueryClient();

    const { isLoading: isAdding, mutate: addCabin } = useMutation({
        mutationFn: addOrUpdateCabin,
        onSuccess: () => {
            toast.success('Cabin succefully added');
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
            reset();
        },
        onError: (err) => toast.error(err.message),
    });

    const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
        mutationFn: ({ newCabinData, id }) =>
            addOrUpdateCabin(newCabinData, id),
        onSuccess: () => {
            toast.success('Cabin succefully updated');
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
            reset();
        },
        onError: (err) => toast.error(err.message),
    });

    const isWorking = isAdding || isUpdating;

    function onSubmit(data) {
        const image =
            typeof data.image === 'string' ? data.image : data.image[0];
        if (isEditSession) {
            updateCabin({ newCabinData: { ...data, image }, id: editId });
        } else {
            addCabin({ ...data, image });
        }
    }

    function onError(errors) {
        console.error(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register('name', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register('maxCapacity', {
                        required: 'This field is required',
                        min: {
                            value: 1,
                            message: 'Capacity should be at least 1',
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register('regularPrice', {
                        required: 'This field is required',
                        min: {
                            value: 1,
                            message: 'Capacity should be at least 1',
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    disabled={isAdding}
                    {...register('discount', {
                        required: 'This field is required',
                        validate: (value) => {
                            return (
                                Number(value) <= getValues().regularPrice ||
                                'Discount should be less than regular price'
                            );
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    disabled={isWorking}
                    {...register('description', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    disabled={isWorking}
                    {...register('image')}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset" size="medium">
                    Cancel
                </Button>
                <Button
                    variation="primary"
                    type="submit"
                    size="medium"
                    disabled={isWorking}
                >
                    {isEditSession ? 'Edit cabin' : 'Add cabin'}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
