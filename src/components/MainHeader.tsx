import { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { clearCredentials } from '../slices/authSlice';
import { CartItemInterface } from '../types/CartItemInterface';

const MainHeader = (): ReactElement => {
    const { cartItems } = useAppSelector((state) => state.cart);
    const { userInfo } = useAppSelector((state) => state.auth);
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const getCartItemsCount = (cartItems: CartItemInterface[]) => {
        return cartItems.reduce((acc: number, item: CartItemInterface) => acc + item.qty, 0);
    };

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(clearCredentials());
            navigate('/login');
        } catch (err) {
            console.error('Error: ', err);
        }
    };

    return (
        <header>
            <Navbar bg="light" expand="md">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>AllStore</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <span>Cart</span>
                                    <Badge pill bg="secondary"
                                           style={{ marginLeft: '0.2rem' }}>{cartItems.length > 0 && getCartItemsCount(cartItems)}</Badge>
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown
                                    id="username"
                                    title={userInfo.name}
                                    menuVariant="light"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>Sign In</Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="admin-menu">
                                    <LinkContainer to="/admin/product-list">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/user-list">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/order-list">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default MainHeader;
