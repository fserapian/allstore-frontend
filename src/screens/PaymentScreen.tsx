import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { useAppDispatch } from '../hooks';
import { savePaymentMethod } from '../slices/cartSlice';


const PaymentScreen = (): ReactElement => {
    const [paymentMethod, setPaymentMethod] = useState('paypal');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/place-order');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            className="my-2"
                            label="Paypal or Credit Card"
                            id="paypal"
                            name="paymentMethod"
                            value="paypal"
                            checked
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary" className="my-3">Continue</Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
