import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { useDeleteCabin } from './useDeleteCabin';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import {
    HiPencil,
    HiSquare2Stack,
    HiSquare3Stack3D,
    HiTrash,
} from 'react-icons/hi2';
import { HiClipboardCopy, HiOutlineClipboardCopy } from 'react-icons/hi';
import { useAddCabin } from './useAddCabin';

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Price = styled.div`
    font-family: 'Sono';
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: 'Sono';
    font-weight: 500;
    color: var(--color-green-700);
`;
const Div = styled.div`
    display: flex;

    gap: 0.2rem;
`;
function CabinRow({ cabin }) {
    const [showForm, setShowForm] = useState(false);
    const { isAdding, addCabin } = useAddCabin();
    const { isDeleting, deleteCabin } = useDeleteCabin();
    const {
        name,
        maxCapacity,
        regularPrice,
        discount,
        description,
        image,
        id: cabinId,
    } = cabin;

    function handleDuplicateCabin() {
        addCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            description,
            image,
        });
    }
    return (
        <>
            <TableRow role="row">
                <Img src={image} />
                <Cabin>{name}</Cabin>
                <div>Fits up to {maxCapacity} guests</div>
                <Price>{formatCurrency(regularPrice)}</Price>
                {discount ? (
                    <Discount>{formatCurrency(discount)}</Discount>
                ) : (
                    <span>&mdash;</span>
                )}
                <Div>
                    <Button
                        title="add"
                        variation="primary"
                        size="small"
                        onClick={() => setShowForm((prev) => !prev)}
                    >
                        <HiPencil />
                    </Button>
                    <Button
                        title="duplicate"
                        variation="primary"
                        size="small"
                        disabled={isAdding}
                        onClick={handleDuplicateCabin}
                    >
                        <HiSquare2Stack />
                    </Button>
                    <Button
                        title="delete"
                        variation="danger"
                        size="small"
                        onClick={() => deleteCabin(cabinId)}
                        disabled={isDeleting}
                    >
                        <HiTrash />
                    </Button>
                </Div>
            </TableRow>
            {showForm && <CreateCabinForm cabinToEdit={cabin} />}
        </>
    );
}

export default CabinRow;
