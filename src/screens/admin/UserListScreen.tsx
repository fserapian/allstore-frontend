import { ReactElement } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTimes, FaTrash, FaCheck } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
    useGetUsersQuery,
} from '../../slices/usersApiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import MessageAlert from '../../components/MessageAlert';
import { UserInfoInterface } from '../../types/UserInfoInterface';

const UserListScreen = (): ReactElement => {
    const {
        data: users,
        isLoading: loadingUsers,
        error: errorGetUsers,
        refetch: refreshUsers,
    } = useGetUsersQuery();

    console.log('data', users);

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Users</h1>
                </Col>
                <Col className="text-end">
                    <Button className="btn-sm m-3" variant="dark">
                        <FaEdit /> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingUsers ? (
                <LoadingSpinner />
            ) : errorGetUsers ? (
                <MessageAlert variant="danger">Error loading users</MessageAlert>
            ) : (
                <Table striped hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user: UserInfoInterface) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin ? <FaCheck /> : <FaTimes />}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button className="btn-sm mx-2" variant="dark">
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        className="btn-sm mx-2"
                                        variant="danger"
                                        onClick={() => {}}
                                    >
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UserListScreen;
