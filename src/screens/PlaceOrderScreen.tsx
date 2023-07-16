import { ReactElement, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import CheckoutSteps from '../components/CheckoutSteps';
import MessageAlert from '../components/MessageAlert';
import { useAppSelector, useAppDispatch } from '../hooks';
import { CartItemInterface } from '../types/CartItemInterface';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { OrderInterface } from '../types/OrderInterface';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = (): ReactElement => {
    const {
        shippingAddress,
        paymentMethod,
        cartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    } = useAppSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        } else if (!paymentMethod) {
            navigate('/payment');
        }
    }, [navigate, paymentMethod, shippingAddress.address]);

    const handlePlaceOrder = async () => {
        const newOrder: OrderInterface = {
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        };
        const createdOrder = await createOrder(newOrder).unwrap();
        dispatch(clearCartItems());
        navigate(`/order/${createdOrder._id}`);
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item className="py-4">
                            <h2>Shipping</h2>
                            <strong>Address: </strong>
                            <span>
                                {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}, {shippingAddress.country}
                            </span>
                        </ListGroup.Item>
                        <ListGroup.Item className="py-4">
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            <span>{paymentMethod}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="py-4">
                            <h2>Order Items</h2>
                            {cartItems.length === 0 ? (
                                <MessageAlert>Your cart is empty</MessageAlert>
                            ) : (
                                <ListGroup variant="flush">
                                    {cartItems.map((cartItem: CartItemInterface) => (
                                        <ListGroup.Item key={cartItem._id}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={cartItem.image}
                                                        alt={cartItem.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${cartItem._id}`}>{cartItem.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {cartItem.qty} x {cartItem.price} = ${cartItem.qty * cartItem.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && (
                                    <MessageAlert>An error here</MessageAlert>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cartItems.length === 0}
                                    onClick={handlePlaceOrder}
                                >
                                    Place Order
                                </Button>
                                {isLoading && (
                                    <LoadingSpinner />
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
