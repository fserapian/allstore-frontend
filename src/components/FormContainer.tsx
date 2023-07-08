import { ReactElement, ReactNode } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type FormContainerProps = {
    children: ReactNode,
};

const FormContainer = ({ children }: FormContainerProps): ReactElement => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};

export default FormContainer;
