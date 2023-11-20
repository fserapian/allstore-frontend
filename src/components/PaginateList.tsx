import { ReactElement } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Pagination from 'react-bootstrap/Pagination';

type PaginateListProps = {
    page?: number;
    pages?: number;
    isAdmin?: boolean;
};

const PaginateList = ({ page, pages, isAdmin = false }: PaginateListProps): ReactElement | null => {
    return (
        pages && pages > 1 ? (
            <Pagination>
                {[...Array(pages).keys()].map((p) => (
                    <LinkContainer
                        key={p + 1}
                        to={!isAdmin ? `/page/${p + 1}` : `/admin/product-list/${p + 1}`}
                    >
                        <Pagination.Item active={p + 1 === page}>
                            {p + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        ) : null
    );
};

export default PaginateList;
