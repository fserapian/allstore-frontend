import { ReactElement } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Col,
    Row,
    Image,
    ListGroup,
    Card,
    Button,
} from 'react-bootstrap';

import VisualRating from '../components/VisualRating';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';

const ProductDetailScreen = (): ReactElement => {
    const { id: productId } = useParams();
    const { data: product, error, isLoading } = useGetProductDetailsQuery(productId);

    if (!product) return <div>No product found</div>;

    if (error) return <div>Some error occurred!</div>

    if (isLoading) return <h2>Loading...</h2>

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
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
                                            <div>5</div>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <div className="d-grid gap-2">
                                    <Button
                                        variant="primary"
                                        disabled={product?.countInStock === 0}
                                    >
                                        Add To Card
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductDetailScreen;
