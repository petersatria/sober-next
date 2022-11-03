import { useSelector } from 'react-redux';
import ProductList from '../../components/Home/Product/ProductList';

function SearchResult() {
    // Global State
    const searchState = useSelector((state) => state.search);

    return (
        <div className="tw-mx-auto tw-mt-5 tw-w-full tw-px-5 tw-pb-10 md:tw-px-14 lg:tw-px-20">
            <div className="tw-grid tw-grid-cols-product tw-justify-center tw-gap-7 lg:tw-gap-14">
                {searchState.result.length > 0 ? (
                    searchState.result.map((product) => (
                        <ProductList
                            key={product._id}
                            img={product.images}
                            name={product.name}
                            price={product.price}
                            hot={product.recommendation}
                            product={product}
                        />
                    ))
                ) : (
                    <p>Clothes did not exist</p>
                )}
            </div>
        </div>
    );
}

export default SearchResult;
