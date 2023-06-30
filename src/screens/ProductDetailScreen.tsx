import { ReactElement, useState, ChangeEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Col,
    Row,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from 'react-bootstrap';

import VisualRating from '../components/VisualRating';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import MessageAlert from '../components/MessageAlert';
import { addToCart } from '../slices/cartSlice';
import { useAppDispatch } from '../hooks';
import { CartItemInterface } from '../types/CartItemInterface';
import { ProductInterface } from '../types/ProductInterface';

const ProductDetailScreen = (): ReactElement => {
    const { id: productId} = useParams();
    const { data: product, error, isLoading } = useGetProductDetailsQuery(productId);
    const [qty, setQty] = useState<number>(1);
    const dispatch = useAppDispatch();

    const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQty(Number(e.target.value));
    };

    const handleAddToCart = () => {
        const cartItem: CartItemInterface = { ...product as ProductInterface, qty };
        dispatch(addToCart(cartItem));
    };

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {error ? (
                <MessageAlert variant="danger">Some error occurred!</MessageAlert>
            ) : isLoading ? (
                <LoadingSpinner />
            ) : (
                <Row>
                    <Col md={6}>
                        <Image src={product?.image} alt={product?.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product?.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <VisualRating value={product?.rating ?? 1} text={`${product?.numReviews} reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product?.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product?.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product?.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product && product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product && product?.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control as="select" value={qty} onChange={handleSelectChange}>
                                                    {[...Array(product.countInStock).keys()].map((k: number) => (
                                                        <option value={k + 1} key={k + 1}>{k + 1}</option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <div className="d-grid gap-2">
                                        <Button
                                            variant="primary"
                                            disabled={product?.countInStock === 0}
                                            onClick={handleAddToCart}
                                        >
                                            Add To Card
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default ProductDetailScreen;
