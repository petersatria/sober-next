import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResult from '../../components/SearchBar/SearchResult';

function index() {
    return (
        <div className="tw-relative">
            <SearchBar />
            <SearchResult />
        </div>
    );
}

export default index;
