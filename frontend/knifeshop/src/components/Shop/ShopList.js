import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL_LIST } from '../../config';
import Preloader from '../Preloader';
import ShopCard from '../Shop/ShopCard';

export default function ShopList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(API_URL_LIST);
                if (Array.isArray(response.data)) {
                    setItems(response.data.slice(0, 24)); // Берём первые 24 элемента
                } else {
                    console.error('Unexpected API response format', response.data);
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="shop-list-container">
            {loading ? (
                <Preloader />
            ) : items.length ? (
                items.map((knife) => (
                    <ShopCard key={knife.id} {...knife} />
                ))
            ) : (
                <p>Не удалось загрузить список товаров</p>
            )}
        </div>
    );
}
