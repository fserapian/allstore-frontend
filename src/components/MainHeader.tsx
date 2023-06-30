import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { LinkContainer } from 'react-router-bootstrap';

import { useAppSelector } from '../hooks';
import { CartItemInterface } from '../types/CartItemInterface';

const MainHeader = () => {
    const { cartItems } = useAppSelector((state) => state.cart);

    const getCartItemsCount = (cartItems: CartItemInterface[]) => {
        return cartItems.reduce((acc: number, item: CartItemInterface) => acc + item.qty, 0);
    };

    return (
        <header>
            <Navbar bg="light" expand="md">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <span>Cart</span>
                                    <Badge pill bg="secondary" style={{ marginLeft: '0.2rem' }}>{cartItems.length > 0 && getCartItemsCount(cartItems)}</Badge>
                                </Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/login">
                                <Nav.Link>Sign In</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default MainHeader;
