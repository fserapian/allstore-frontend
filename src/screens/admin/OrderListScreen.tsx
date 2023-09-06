import { ReactElement } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import MessageAlert from '../../components/MessageAlert';

const OrderListScreen = (): ReactElement => {
    const { data: orders, isLoading, error } = useGetOrdersQuery();

    return (
        <>
            <h1>Orders</h1>
            {isLoading ? (
                <LoadingSpinner />
            ) : error ? (
                <MessageAlert variant="danger">Some error</MessageAlert>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) => (
                            <tr key={order._id}>
                                <td>{order?._id}</td>
                                <td>{order?.user?.name}</td>
                                <td>{order?.createdAt?.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? order?.paidAt?.substring(0, 10) : <FaTimes />}</td>
                                <td>{order.isDelivered ? order?.deliveredAt?.substring(0, 10) : <FaTimes />}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className="btn-sm" variant="dark">Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default OrderListScreen;
