import { ReactElement, ReactNode } from 'react';
import Alert from 'react-bootstrap/Alert';

type MessageAlertProps = {
    variant?: string,
    children: ReactNode,
};

const MessageAlert = ({ variant = 'info', children }: MessageAlertProps): ReactElement => {
    return (
        <Alert variant={variant} className="m-0">
            {children}
        </Alert>
    );
};

export default MessageAlert;
