import { Link } from 'react-router-dom';

const GameItem = props => {
    const { tokenId, name, image, saleAmount, price } = props;

    return (
        <div className="col-lg-4 col-md-4 mb-4">
            <Link to={`/buy/${ tokenId }`} className="product-item rounded p-1 bg-1 position-relative pt-5 pt-sm-2" state={{ tokenId: tokenId }}>
                <p className="fs-5 mb-1 px-2 title ls-title">
                    { name }
                </p>
                <p className="fs14 color-2 px-2">
                    Total quantity: { saleAmount }
                </p>
                <img src={ image } alt={ name } className="w-100" />
                <p className="text-center fs-6 mtmy2-15">
                    { price } LOE
                </p>
            </Link>
        </div>
    );
}

export default GameItem;