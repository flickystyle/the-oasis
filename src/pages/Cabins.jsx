import { useEffect } from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import { getCabins } from '../services/apiCabins';

function Cabins() {
    useEffect(() => {
        const f = async () => {
            getCabins().then(console.log);
        };
        f();
    }, []);

    return (
        <Row type="horizontal">
            <Heading as="h1">All cabins</Heading>
            <p>TEST</p>
            <img
                src="https://flledracehzjzjggtmnk.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg"
                alt="cabin"
            />
        </Row>
    );
}

export default Cabins;
