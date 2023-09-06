import { useEffect } from 'react';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import { useParams, Link } from 'react-router-dom';
import MessageAlert from '../components/MessageAlert';
import LoadingSpinner from '../components/LoadingSpinner';
import {
    usePayOrderMutation,
    useGetPayPalClientIdQuery,
    useDeliverOrderMutation,
} from '../slices/ordersApiSlice';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useAppSelector } from '../hooks';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const {
        data: order,
        error,
        isLoading,
        refetch,
    } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPayOrder }] = usePayOrderMutation();

    const [deliverOrder, { isLoading: loadingDeliverOrder }] = useDeliverOrderMutation();

    const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();

    const {
        data: dataPayPal,
        isLoading: loadingPayPal,
        error: errorPayPal,
    } = useGetPayPalClientIdQuery();

    const { userInfo } = useAppSelector((state) => state.auth);

    const onApproveTest = async () => {
        await payOrder({ orderId, details: { payer: {} } });
        refetch();
        toast.success('Payment successful');
    };

    const createOrder = (data: any, actions: any) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order?.totalPrice,
                    },
                },
            ],
        }).then((orderId: any) => {
            return orderId;
        });
    };

    const onApprove = (data: any, actions: any) => {
        return actions.order.capture().then(async function (details: any) {
            try {
                await payOrder({ orderId, details });
                refetch();
                toast.success('Payment successful');
            } catch (err) {
                toast.error('Error on payment');
            }
        });
    };

    const onError = (err: any) => {
        toast.error('ERROR ' + err.message);
    };

    const handleDeliverOrder = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order delivered');
        } catch (err) {
            toast.error('Cannot deliver order');
        }
    };

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && dataPayPal?.clientId) {
            const loadPayPalScript = async () => {
                payPalDispatch({
                    type: 'resetOptions',
                    value: {
                        clientId: dataPayPal.clientId,
                        currency: 'CAD',
                    },
                });
                // @ts-ignore
                payPalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            };

            if (order && !order.isPaid) {
                if (!window.paypal) {
                    void loadPayPalScript();
                }
            }
        }
    }, [dataPayPal?.clientId, errorPayPal, loadingPayPal, order, payPalDispatch]);

    if (error && 'status' in error) return <MessageAlert>{(error.data as any).message}</MessageAlert>;
    if (isLoading) return <LoadingSpinner />;

    return (
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name: </strong> {order?.user?.name}
                        </p>
                        <p>
                            <strong>Email: </strong> {order?.user?.email}
                        </p>
                        <p>
                            <strong>Address: </strong>
                            {order?.shippingAddress.address},{' '}
                            {order?.shippingAddress.city},{' '}
                            {order?.shippingAddress.postalCode},{' '}
                            {order?.shippingAddress.country}
                        </p>
                        {order?.isDelivered ?
                            <MessageAlert variant="success">Delivered at {order?.deliveredAt}</MessageAlert> :
                            <MessageAlert variant="danger">Not Delivered</MessageAlert>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong> {order?.paymentMethod}
                        </p>
                        {order?.isPaid ?
                            <MessageAlert variant="success">Paid at {order?.paidAt}</MessageAlert> :
                            <MessageAlert variant="danger">Not Paid</MessageAlert>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order?.orderItems.map((orderItem) => (
                            <ListGroup.Item key={orderItem._id}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={orderItem.image} alt={orderItem.name} fluid rounded />
                                    </Col>
                                    <Col>
                                        <Link to={`/product/${orderItem.product}`}>
                                            {orderItem.name}
                                        </Link>
                                    </Col>
                                    <Col md={4}>
                                        {orderItem.qty} * ${orderItem.price} = ${orderItem.qty * orderItem.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order?.itemsPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order?.shippingPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order?.taxPrice}</Col>
                            </Row>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order?.totalPrice}</Col>
                            </Row>
                            {!order?.isPaid && (
                                <ListGroup.Item>
                                    {loadingPayOrder && <LoadingSpinner />}
                                    {isPending ? <LoadingSpinner /> : (
                                        <div>
                                            <Button onClick={onApproveTest} className="mb-3">
                                                Test pay order
                                            </Button>
                                            <div>
                                                <PayPalButtons
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                >
                                                </PayPalButtons>
                                            </div>
                                        </div>
                                    )}
                                </ListGroup.Item>
                            )}
                            {loadingDeliverOrder && <LoadingSpinner />}
                            {userInfo && userInfo.isAdmin && order?.isPaid && !order?.isDelivered && (
                                <ListGroup.Item>
                                    <Button
                                        variant="dark"
                                        type="button"
                                        className="btn btn-block"
                                        onClick={handleDeliverOrder}
                                    >
                                        Mark as delivered
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default OrderScreen;
