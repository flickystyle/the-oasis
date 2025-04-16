import styled from 'styled-components';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';
import { useDeleteCabin } from './useDeleteCabin';
import { useAddCabin } from './useAddCabin';
import Table from '../../ui/Table';

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
            <Table.Row>
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
            </Table.Row>
        </>
    );
}

export default CabinRow;
