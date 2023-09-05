import { ReactElement, FormEvent, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';

import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { UserInfoInterface } from '../types/UserInfoInterface';
import { useAppDispatch, useAppSelector } from '../hooks';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginScreen = (): ReactElement => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { userInfo } = useAppSelector((state) => state.auth);

    const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const userInfo: UserInfoInterface = await login({ email, password }).unwrap();
            dispatch(setCredentials(userInfo));
            navigate('/');
        } catch (err: any) {
            toast.error(err?.data?.message || err.error || 'Some error!');
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    return (
        <FormContainer>
            <h1>Sign in</h1>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <Form onSubmit={handleLogin}>
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
                        <Button type="submit" variant="primary" className="my-3">Sign In</Button>
                    </Form>
                    <Row>
                        <Col>
                            New customer? <Link to="/register">Register</Link>
                        </Col>
                    </Row>
                </>
            )}
        </FormContainer>
    );
};

export default LoginScreen;
