import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import { useCabins } from '../cabins/useCabins';

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout() {
    const { bookings, isLoading } = useRecentBookings();
    const {
        stays,
        confirmedStays,
        isLoading: isLoadingStays,
        numDays,
    } = useRecentStays();
    const { cabins, isLoading: isLoadingCabins } = useCabins();

    if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />;

    console.log(bookings);
    return (
        <StyledDashboardLayout>
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                numDays={numDays}
                cabinCount={cabins?.length}
            />
            <div>Todays act</div>
            <div>Chart stay</div>
            <div>Chart sales</div>
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
