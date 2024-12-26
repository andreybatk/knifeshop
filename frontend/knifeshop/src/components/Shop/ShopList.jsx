import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL_KNIFES } from '../../config';
import Preloader from '../Preloader';
import ShopCard from './ShopCard';

export default function ShopList() {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [sortItem, setSortItem] = useState('date'); // Сортировка по умолчанию
  const [sortOrder, setSortOrder] = useState('asc'); // Порядок сортировки по умолчанию

  useEffect(() => {
    const fetchItems = async () => {
      setIsSearchLoading(true);
      try {
        const response = await axios.get(API_URL_KNIFES, {
          params: {
            Search: searchText,
            SortItem: sortItem,
            SortOrder: sortOrder,
          },
        });

        if (Array.isArray(response.data)) {
          setItems(response.data.slice(0, 24)); // Берём первые 24 элемента
        } else {
          console.error('Unexpected API response format', response.data);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setIsSearchLoading(false);
      }
    };

    // Запускаем запрос, если есть текст для поиска или изменился сортировочный параметр
    const debounceTimeout = setTimeout(() => {
      fetchItems();
    }, 500); // Задержка 500 мс, чтобы избежать частых запросов

    return () => clearTimeout(debounceTimeout);
  }, [searchText, sortItem, sortOrder]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSortChange = (event) => {
    const { name, value } = event.target;
    if (name === 'sortItem') {
      setSortItem(value);
    } else if (name === 'sortOrder') {
      setSortOrder(value);
    }
  };

  return (
    <div className="shop-list-container">
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Поиск по товарам"
      />
      <select class="browser-default black-text" name="sortItem" value={sortItem} onChange={handleSortChange}>
        <option value="date">Дата</option>
        <option value="title">Название</option>
        <option value="price">Цена</option>
      </select>
      <select class="browser-default black-text" name="sortOrder" value={sortOrder} onChange={handleSortChange}>
        <option value="asc">По возрастанию</option>
        <option value="desc">По убыванию</option>
      </select>
      {isSearchLoading ? (
        <Preloader />
      ) : items.length ? (
        items.map((knife) => <ShopCard key={knife.id} {...knife} />)
      ) : (
        <p>Не удалось загрузить список товаров</p>
      )}
    </div>
  );
}
