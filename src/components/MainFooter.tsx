import { Container, Row, Col } from 'react-bootstrap';

const MainFooter = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; ProShop
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default MainFooter;
