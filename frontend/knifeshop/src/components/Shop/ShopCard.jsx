import { useNavigate } from "react-router-dom";
import { API, TELEGRAM_BUY } from '../../config';
import { Button} from "@mui/material";

export default function ShopCard(props) {
    const {
        id,
        title,
        category,
        image,
        price,
        isOnSale,
    } = props;

    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/knifes/${id}`);
    };

    const handleBuyClick = () => {
        window.location.href = TELEGRAM_BUY;
    };

    const defaultImage = "/default-knife.jpg";

    return (
        <div id={`knife-${id}`} className="card">
            <div className="card-image waves-effect waves-block waves-light">
                <img
                    className="image-custom-class"
                    src={`${API}${image}`}
                    alt={title}
                    onError={(e) => { e.target.src = defaultImage; }}
                />
            </div>
            <div className="card-content">
                <span
                    className="card-title activator grey-text text-darken-4"
                    onClick={handleDetailsClick}
                >
                    {title}
                    <i className="material-icons right">more_vert</i>
                </span>
                <p>Категория: {category}</p>
                <p>Цена: {price} руб. {!isOnSale && <span className="sale-tag">(Нет в наличии)</span>}</p>
            </div>
            <div className="card-action" style={{ display: 'flex', alignItems: 'center' }}>
                <Button type="submit" variant="contained" color="primary" onClick={handleBuyClick} disabled={!isOnSale}>
                    Купить
                </Button>
                <Button
                    type="button"
                    variant="outlined"
                    color="secondary"
                    onClick={handleDetailsClick}
                    sx={{ ml: 'auto' }}
                >
                    Подробнее
                </Button>
            </div>
        </div>
    );
}
