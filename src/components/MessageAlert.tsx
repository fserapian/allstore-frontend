import { ReactElement, ReactNode } from 'react';
import { Alert } from 'react-bootstrap';

type MessageAlertProps = {
    variant?: string,
    children: ReactNode,
};

const MessageAlert = ({ variant = 'info', children }: MessageAlertProps): ReactElement => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    );
};

export default MessageAlert;
