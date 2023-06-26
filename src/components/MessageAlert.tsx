import { ReactElement } from 'react';
import { Alert } from 'react-bootstrap';

type MessageAlertProps = {
    variant?: string,
    children: string,
};

const MessageAlert = ({ variant = 'info', children }: MessageAlertProps): ReactElement => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    );
};

export default MessageAlert;
