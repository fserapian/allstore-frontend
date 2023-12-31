import { ReactElement } from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = (): ReactElement => {
    return (
        <Spinner
            animation="border"
            role="status"
            style={{
                width: '100px',
                height: '100px',
                margin: 'auto',
                display: 'block'
            }}
        >
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
};

export default LoadingSpinner;
