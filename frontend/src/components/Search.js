import React from 'react';

const Search = (props) => {
  return (
    <div className="filter">
      <input
        id="search-bar"
        name='searchTerm'
        type="text"
        placeholder="Search Notes"
        onChange={props.onTextChange}
      />
    </div>
  );
}

export default Search;
