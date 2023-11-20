import { ReactElement } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Pagination from 'react-bootstrap/Pagination';

type PaginateListProps = {
    page?: number;
    pages?: number;
};

const PaginateList = ({ page, pages }: PaginateListProps): ReactElement => {
    return (
        <Pagination>
            {[...Array(pages).keys()].map((p) => (
                <LinkContainer to={`/page/${p + 1}`} key={p + 1}>
                    <Pagination.Item active={p + 1 === page}>
                        {p + 1}
                    </Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    );
};

export default PaginateList;
