import { ReactElement, useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {
    useGetUserDetailsQuery,
    useUpdateUserMutation,
} from '../../slices/usersApiSlice';
import FormContainer from '../../components/FormContainer';
import LoadingSpinner from '../../components/LoadingSpinner';
import MessageAlert from '../../components/MessageAlert';

const UserEditScreen = (): ReactElement => {
    const { id: userId } = useParams();

    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const {
        data: user,
        isLoading: loadingUser,
        error: errorUser,
        refetch,
    } = useGetUserDetailsQuery(userId);

    const [
        updateUser,
        { isLoading: loadingUpdateUser },
    ] = useUpdateUserMutation();

    useEffect((): void => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = {
            userId,
            name,
            email,
            isAdmin,
        };

        try {
            await updateUser(userData);
            toast.success('User updated');
            navigate('/admin/user-list');
        } catch (err) {
            toast.error('Cannot update user');
        }
    };

    return (
        <>
            <Link to="/admin/user-list" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdateUser && <LoadingSpinner />}
                {loadingUser ? (
                    <LoadingSpinner />
                ) : errorUser ? (
                    <MessageAlert variant="danger">Cannot load product</MessageAlert>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name" className="my-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={name}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="email" className="my-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter email"
                                name="price"
                                value={email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="isAdmin" className="my-2">
                            <Form.Check
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setIsAdmin(e.target.checked)}
                            >
                            </Form.Check>
                        </Form.Group>
                        <Button type="submit" variant="primary" className="my-2">Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default UserEditScreen;
