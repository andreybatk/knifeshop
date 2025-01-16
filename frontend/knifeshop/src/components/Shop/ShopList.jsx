import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material';
import { API_URL_KNIFES_PAGES } from '../../config';
import Preloader from '../Preloader';
import ShopCard from './ShopCard';

export default function ShopList() {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [sortItem, setSortItem] = useState('date'); // Сортировка по умолчанию
  const [sortOrder, setSortOrder] = useState('asc'); // Порядок сортировки по умолчанию
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const [totalItems, setTotalItems] = useState(0); // Общее количество товаров
  const itemsPerPage = 12; // Количество товаров на странице

  useEffect(() => {
    const fetchItems = async () => {
      setIsSearchLoading(true);
      try {
        const response = await axios.get(API_URL_KNIFES_PAGES, {
          params: {
            Search: searchText,
            SortItem: sortItem,
            SortOrder: sortOrder,
            Page: currentPage, // Передаём текущую страницу
            PageSize: itemsPerPage, // Размер страницы
          },
        });

        if (response.data?.items) {
          setItems(response.data.items); // Сохраняем текущую страницу товаров
          setTotalItems(response.data.totalCount); // Сохраняем общее количество товаров
        } else {
          console.error('Unexpected API response format', response.data);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setIsSearchLoading(false);
      }
    };

    fetchItems();
  }, [searchText, sortItem, sortOrder, currentPage]);

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

  const handlePageChange = (event, page) => {
    setCurrentPage(page); // Меняем текущую страницу
  };

  return (
    <main className="container">
      <h1>Каталог</h1>
      <div className="shop-list-container">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Поиск по товарам"
        />
        <select
          className="browser-default black-text"
          name="sortItem"
          value={sortItem}
          onChange={handleSortChange}
        >
          <option value="date">Дата</option>
          <option value="title">Название</option>
          <option value="price">Цена</option>
        </select>
        <select
          className="browser-default black-text"
          name="sortOrder"
          value={sortOrder}
          onChange={handleSortChange}
        >
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
          {isSearchLoading ? (
            <Preloader />
          ) : items.length ? (
            <>
              {items.map((knife) => (
                <ShopCard key={knife.id} {...knife} />
              ))}
            <Pagination
              count={Math.ceil(totalItems / itemsPerPage)} // Количество страниц
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              sx={{
                margin: '20px auto',
                display: 'flex',
                justifyContent: 'center',
                '& .MuiPagination-root': {
                    backgroundColor: 'transparent', // Уберите красный цвет
                },
            }}
            />
            </>
          ) : (
            <p>Не удалось загрузить список товаров</p>
          )}
      </div>
    </main>
  );
}
