import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Header,
  SearchForm,
  SearchBtn,
  SearchInput,
  SearchIcon,
} from './Searchbar.styled.jsx';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInput = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query.toLowerCase().trim());
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <SearchIcon />
        </SearchBtn>

        <SearchInput
          name="query"
          type="text"
          value={query}
          onChange={handleInput}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
