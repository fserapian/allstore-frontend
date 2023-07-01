import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import MessageAlert from '../components/MessageAlert';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Form, ListGroup } from 'react-bootstrap';
import { CartItemInterface } from '../types/CartItemInterface';
import { addToCart, deleteFromCart } from '../slices/cartSlice';

const CartScreen = () => {
    const { cartItems } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    const handleChange = (item: CartItemInterface, qty: number) => {
        const cartItem: CartItemInterface = { ...item, qty };
        dispatch(addToCart(cartItem));
    };

    const handleDelete = (productId: string) => {
        dispatch(deleteFromCart(productId));
    };

    return (
        <Row>
            <Col md={8}>
                <h1 style={{ marginBottom: '1rem' }}>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <MessageAlert>Your cart is empty, <Link to="/">continue shopping</Link></MessageAlert>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item: CartItemInterface) => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control as="select" value={item.qty} onChange={(e) => handleChange(item, Number(e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map((k: number) => (
                                                <option value={k + 1} key={k + 1}>{k + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type="button" variant="light" onClick={() => handleDelete(item._id)}><FaTrash /></Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({cartItems.reduce((acc: number, item: CartItemInterface) => acc + item.qty, 0)}) items
                            </h2>
                            <div>${cartItems.reduce((acc: number, item: CartItemInterface) => acc + item.price * item.qty, 0).toFixed(2)}</div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn-block" disabled={cartItems.length === 0} variant="dark">
                                Proceed to checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
};

export default CartScreen;
