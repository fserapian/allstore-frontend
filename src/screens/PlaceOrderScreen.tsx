import { ReactElement } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = (): ReactElement => {
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
