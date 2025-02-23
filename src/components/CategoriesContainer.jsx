import { useDispatch, useSelector } from 'react-redux';

import {
  selectCategory,
  loadRestaurants,
} from '../redux/slice/restaurantSlice';

import { get } from '../utils/utils';

export default function CategoriesContainer() {
  const dispatch = useDispatch();

  const categories = useSelector(
    get({ sliceName: 'restaurantSlice', key: 'categories' })
  );
  const selectedCategory = useSelector(
    get({ sliceName: 'restaurantSlice', key: 'selectedCategory' })
  );

  function handleClick(categoryId) {
    dispatch(selectCategory(categoryId));
    dispatch(loadRestaurants());
  }

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>
          <button type="button" onClick={() => handleClick(category.id)}>
            {category.name}
            {selectedCategory ? (
              <>{category.id === selectedCategory.id ? '(V)' : null}</>
            ) : null}
          </button>
        </li>
      ))}
    </ul>
  );
}
