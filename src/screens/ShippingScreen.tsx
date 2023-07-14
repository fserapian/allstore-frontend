import { ReactElement, FormEvent, ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import FormContainer from '../components/FormContainer';
import { useAppDispatch, useAppSelector } from '../hooks';
import { saveShippingAddress } from '../slices/cartSlice';
import { ShippingAddressInterface } from '../types/ShippingAddressInterface';

const ShippingScreen = (): ReactElement => {
    const { shippingAddress } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState<string>(shippingAddress?.address || '');
    const [city, setCity] = useState<string>(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState<string>(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState<string>(shippingAddress?.country || '');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const shippingAddress: ShippingAddressInterface = { address, city, postalCode, country };
        dispatch(saveShippingAddress(shippingAddress));
        navigate('/payment');
    };

    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="address" className="my-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        value={address}
                        placeholder="Enter address"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="city" className="my-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        value={city}
                        placeholder="Enter city"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="postalCode" className="my-3">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        value={postalCode}
                        placeholder="Enter postal code"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPostalCode(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="country" className="my-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        value={country}
                        placeholder="Enter country"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" className="my-3">Continue</Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
