import BreadCumb from "../../components/BreadCumb";
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResult from '../../components/SearchBar/SearchResult';

function index() {
    return (
        <div className="tw-relative">
            <BreadCumb linkTo={"Search products"}
                linkRef={"/"} />
            <SearchBar />
            <SearchResult />
        </div>
    );
}

export default index;
