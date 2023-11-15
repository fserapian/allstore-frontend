import { ReactElement, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    Col,
    Row,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from 'react-bootstrap';
import { toast } from 'react-toastify';

import VisualRating from '../components/VisualRating';
import { useGetProductDetailsQuery, useCreateProductReviewMutation } from '../slices/productsApiSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import MessageAlert from '../components/MessageAlert';
import { addToCart } from '../slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { CartItemInterface } from '../types/CartItemInterface';
import { ProductInterface, ReviewInterface } from '../types/ProductInterface';

const ProductDetailScreen = (): ReactElement => {
    const { id: productId } = useParams();
    const [qty, setQty] = useState<number>(1);
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { userInfo } = useAppSelector((state) => state.auth);

    const {
        data: product,
        error,
        isLoading: loadingProductDetails,
        refetch,
    } = useGetProductDetailsQuery(productId);

    const [
        createProductReview,
        { isLoading: loadingCreateReview },
    ] = useCreateProductReviewMutation();

    const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQty(Number(event.target.value));
    };

    const handleAddToCart = () => {
        const cartItem: CartItemInterface = { ...product as ProductInterface, qty };
        dispatch(addToCart(cartItem));
        navigate('/cart');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await createProductReview({
                productId,
                rating,
                comment
            }).unwrap()

            refetch();

            toast.success('Review submitted');

            setRating(0);
            setComment('');
        } catch (err: any) {
            toast.error(err.data.message ?? 'Cannot add review');
        }
    }

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {error ? (
                <MessageAlert variant="danger">Some error occurred!</MessageAlert>
            ) : loadingProductDetails ? (
                <LoadingSpinner />
            ) : (
                <>
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
                                    <VisualRating value={product?.rating ?? 1}
                                                  text={`${product?.numReviews} reviews`} />
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
                    <Row className="review">
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product?.reviews.length === 0 && <MessageAlert>No Reviews</MessageAlert>}
                            <ListGroup variant="flush">
                                {product?.reviews.map((review: ReviewInterface) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.userName}</strong>
                                        <VisualRating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a customer review</h2>
                                    {loadingCreateReview && <LoadingSpinner />}
                                    {userInfo ? (
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group controlId="rating" className="my-2">
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={
                                                        (e) =>
                                                            setRating(Number(e.target.value))
                                                    }
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="1">1 - Poor</option>
                                                    <option value="2">2 - Fair</option>
                                                    <option value="3">3 - Good</option>
                                                    <option value="4">4 - Very Good</option>
                                                    <option value="5">5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="comment" className="my-2">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={loadingCreateReview}
                                                type="submit"
                                                variant="primary"
                                            >Submit</Button>
                                        </Form>
                                    ) : (
                                        <MessageAlert>
                                            Please <Link to="/login">sign-in</Link> to write a review
                                        </MessageAlert>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductDetailScreen;
