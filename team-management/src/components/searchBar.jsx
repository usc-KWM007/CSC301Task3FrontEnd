const SearchBar = ({keyword, onChange}) => {
    return (
      <input 
      id="searchBar"
       key="search-bar"
       value={keyword}
       placeholder={"search anything"}
       onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  
  export default SearchBar;