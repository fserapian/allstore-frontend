import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CheckoutSteps from '../components/CheckoutSteps';
import { useAppSelector } from '../hooks';

const PlaceOrderScreen = (): ReactElement => {
    const {
        shippingAddress,
        paymentMethod,
    } = useAppSelector((state) => state.cart);
    const navigate = useNavigate();

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        } else if (!paymentMethod) {
            navigate('/payment');
        }
    }, [navigate, paymentMethod, shippingAddress.address]);

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <h1>Place Order</h1>
            <Row>
                <Col md={8}>Col1</Col>
                <Col md={4}>Col2</Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
