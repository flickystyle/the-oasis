import styled from 'styled-components';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';
import { useDeleteCabin } from './useDeleteCabin';
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
                    <Modal>
                        <Modal.Open opens="edit">
                            <Button
                                title="add"
                                variation="primary"
                                size="small"
                            >
                                <HiPencil />
                            </Button>
                        </Modal.Open>
                        <Modal.Window name="edit">
                            <CreateCabinForm cabinToEdit={cabin} />
                        </Modal.Window>
                        <Button
                            title="duplicate"
                            variation="primary"
                            size="small"
                            disabled={isAdding}
                            onClick={handleDuplicateCabin}
                        >
                            <HiSquare2Stack />
                        </Button>
                    </Modal>
                    <Modal>
                        <Modal.Open opens="delete">
                            <Button
                                title="delete"
                                variation="danger"
                                size="small"
                                disabled={isDeleting}
                            >
                                <HiTrash />
                            </Button>
                        </Modal.Open>
                        <Modal.Window name="delete">
                            <ConfirmDelete
                                onCloseModal="close"
                                resourceName="cabin"
                                onConfirm={() => deleteCabin(cabinId)}
                                disabled={isDeleting}
                            />
                        </Modal.Window>
                    </Modal>
                </Div>
            </TableRow>
        </>
    );
}

export default CabinRow;
