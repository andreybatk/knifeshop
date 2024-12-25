import { API } from '../../config';

export default function ShopCard(props) {
    const {
        id,
        title,
        category,
        description,
        image,
        images,
        price,
        isOnSale,
        createdAt,
    } = props;

    return (
        <div id={`knife-${id}`} className="card">
            <div className="card-image waves-effect waves-block waves-light">
                <div className="image-container">
                    <img className="activator" src={`${API}${image}`} alt={title} />
                </div>
            </div>
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                    {title}
                    <i className="material-icons right">more_vert</i>
                </span>
                <p>Категория: {category}</p>
                <p>Цена: {price} руб. {!isOnSale && <span className="sale-tag">(Нет в наличии)</span>}</p>
            </div>
            <div className="card-action">
                <button className="btn-small">Купить</button>
                <button className="btn-small right">Подробнее</button>
            </div>
            <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                    {title}
                    <i className="material-icons right">close</i>
                </span>
                <p>{description || "Описание недоступно."}</p>
                <p>Добавлено: {new Date(createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
}
