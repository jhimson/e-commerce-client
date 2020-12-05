import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const SearchBox = () => {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const searchHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      history.push(`/search/${search}`);
    } else {
      history.push('/');
    }
  };
  return (
    <Form onSubmit={searchHandler} inline>
      <Form.Control
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value.substr(0, 20).toLowerCase())}
        className="mr -sm-2 ml-sm-5"
      />
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};
export default SearchBox;
