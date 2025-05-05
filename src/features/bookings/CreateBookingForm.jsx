import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Select from '../../ui/Select';
import Textarea from '../../ui/Textarea';

function CreateBookingForm({ onCloseModal }) {
    const {
        register,
        handleSubmit,
        // reset,
        //  getValues,
        formState,
    } = useForm({
        // defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;
    // const { isAdding, addCabin } = useAddBooking(); later
    const isAdding = true;

    function onSubmit() {}
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Start Date" error={errors?.startDate?.message}>
                <Input
                    type="datetime-local"
                    id="startDate"
                    disabled={isAdding}
                    {...register('startDate', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>
            <FormRow label="End Date" error={errors?.endDate?.message}>
                <Input
                    type="datetime-local"
                    id="endDate"
                    disabled={isAdding}
                    {...register('endDate', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>
            <FormRow
                label="Number of nights"
                error={errors?.numNights?.message}
            >
                <Input
                    type="number"
                    id="numNights"
                    disabled={isAdding}
                    {...register('numNights', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>
            <FormRow
                label="Number of guests"
                error={errors?.numGuests?.message}
            >
                <Input
                    type="number"
                    id="numGuests"
                    disabled={isAdding}
                    {...register('numGuests', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>
            <FormRow label="Cabin price" error={errors?.cabinPrice?.message}>
                <Input
                    type="number"
                    id="cabinPrice"
                    disabled={isAdding}
                    {...register('cabinPrice', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>
            <FormRow label="Extras price" error={errors?.extrasPrice?.message}>
                <Input
                    type="number"
                    id="extrasPrice"
                    disabled={isAdding}
                    {...register('extrasPrice', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>
            <FormRow label="Status" error={errors?.status?.message}>
                <Select
                    options={[
                        { value: 'checked-in', label: 'Checked in' },
                        { value: 'unconfirmed', label: 'Unconfirmed' },
                    ]}
                    id="status"
                    disabled={isAdding}
                    {...register('status', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>
            <FormRow
                label="Has breakfast?"
                error={errors?.hasBreakfast?.message}
            >
                <Select
                    options={[
                        { value: false, label: 'No' },
                        { value: true, label: 'Yes' },
                    ]}
                    id="hasBreakfast"
                    disabled={isAdding}
                    {...register('hasBreakfast', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>
            <FormRow label="Is Paid?" error={errors?.isPaid?.message}>
                <Select
                    options={[
                        { value: false, label: 'No' },
                        { value: true, label: 'Yes' },
                    ]}
                    id="isPaid"
                    disabled={isAdding}
                    {...register('isPaid', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>
            <FormRow label="Observations" error={errors?.observations?.message}>
                <Textarea
                    id="observations"
                    disabled={isAdding}
                    {...register('observations', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>
            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                    size="medium"
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button
                    variation="primary"
                    type="submit"
                    size="medium"
                    disabled={isAdding}
                >
                    Add booking
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateBookingForm;
