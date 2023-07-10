import { FormEvent, ReactElement, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';

import FormContainer from '../components/FormContainer';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { useAppDispatch } from '../hooks';
import { setCredentials } from '../slices/authSlice';
import { UserInfoInterface } from '../types/UserInfoInterface';
import { toast } from 'react-toastify';

const RegisterScreen = (): ReactElement => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const userInfo: UserInfoInterface = await register({ name, email, password }).unwrap();
            dispatch(setCredentials(userInfo));
            navigate('/');
        } catch (err: any) {
            toast.error(err?.data?.message || err.error || 'Some error!');
        }
    };

    return (
        <FormContainer>
            <h1>Sign up</h1>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <Form onSubmit={handleRegister}>
                        <Form.Group controlId="name" className="my-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                placeholder="Enter name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className="my-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="my-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                placeholder="Enter password"
                                autoComplete="on"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword" className="my-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                placeholder="Enter password confirmation"
                                autoComplete="on"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="my-3">Sign Up</Button>
                    </Form>
                    <Row>
                        <Col>
                            Already have an account? <Link to="/login">Login</Link>
                        </Col>
                    </Row>
                </>
            )}
        </FormContainer>
    );
};

export default RegisterScreen;
