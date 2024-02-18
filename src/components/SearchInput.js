const SearchInput = (props) => {
    const { onChange } = props;
    return (
        <div className="input-group">
            <input
            onChange={onChange}
                type="text"
                className="form-control"
                placeholder="Search ..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
            />
        </div>
    );
};
export default SearchInput;