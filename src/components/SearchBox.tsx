import { useParams, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SearchBox = () => {
    const { keyword: searchKeyword } = useParams();
    const [keyword, setKeyword] = useState(searchKeyword ?? '');

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
            setKeyword('');
        } else {
            navigate('/');
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="d-flex">
            <Form.Control
                type="search"
                className="me-2"
                aria-label="Search"
                name="q"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search products..."
            />
            <Button type="submit" variant="outline-dark">Search</Button>
        </Form>
    );
};

export default SearchBox;
