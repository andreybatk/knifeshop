import { useNavigate } from "react-router-dom";
import { API } from '../../config';
import { checkAdmin } from "../Auth/AuthUtils";
import { useState, useEffect } from "react";

export default function ShopCard(props) {
    const {
        id,
        title,
        category,
        description,
        image,
        price,
        isOnSale,
    } = props;

    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/knifes/${id}`);
    };

    const handleEditClick = () => {
        navigate(`/knifes/${id}/edit`);
    };

    const defaultImage = "/default-knife.jpg";

    // Предположим, что флаг администратора приходит через пропсы или из контекста
    const [isAdmin, setIsAdmin] = useState(false);
    
        useEffect(() => {
            const fetchRole = async () => {
                const isAdmin = await checkAdmin();
                setIsAdmin(isAdmin);
            };
    
            fetchRole();
        }, []);

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
                    onClick={isAdmin ? handleEditClick : undefined}
                    style={{ cursor: isAdmin ? 'pointer' : 'default' }}
                >
                    {title}
                    <i className="material-icons right">more_vert</i>
                </span>
                <p>Категория: {category}</p>
                <p>Цена: {price} руб. {!isOnSale && <span className="sale-tag">(Нет в наличии)</span>}</p>
            </div>
            <div className="card-action">
                <button className="btn-small blue darken-5">Купить</button>
                <button className="btn-small right blue darken-2" onClick={handleDetailsClick}>
                    Подробнее
                </button>
            </div>
        </div>
    );
}
