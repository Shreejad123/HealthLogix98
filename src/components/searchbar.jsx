const SurgerySearch = ({ searchTerm, handleSearch }) => {
  return (
    <form className="form-inline my-2 my-lg-0">
      <input
        className="Searchbar"
        type="search"
        placeholder="Search for names..."
        aria-label="Search"
        title="Type in a name"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ padding: "5px", marginBottom: "10px", width: "250px" }}
      />
    </form>
  );
};

export default SurgerySearch;
