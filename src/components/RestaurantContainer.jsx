import { useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import RestaurantDetail from './RestaurantDetail';
import ReviewForm from './ReviewForm';
import Reviews from './Reviews';

import { loadRestaurant } from '../redux/slice/restaurantSlice';

import { changeReviewField, sendReview } from '../redux/slice/reviewSlice';

import { get } from '../utils/utils';

export default function RestaurantContainer({ restaurantId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurant({ restaurantId }));
  }, []);

  const accessToken = useSelector(
    get({ sliceName: 'loginSlice', key: 'accessToken' })
  );
  const restaurant = useSelector(
    get({ sliceName: 'restaurantSlice', key: 'restaurant' })
  );
  const reviewFields = useSelector(
    get({ sliceName: 'reviewSlice', key: 'reviewFields' })
  );

  const handleChange = useCallback(
    ({ name, value }) => {
      dispatch(changeReviewField({ name, value }));
    },
    [dispatch]
  );

  const handleSubmit = useCallback(() => {
    dispatch(sendReview({ restaurantId }));
  }, [dispatch, restaurantId]);

  if (!restaurant) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <RestaurantDetail restaurant={restaurant} />
      {accessToken ? (
        <ReviewForm
          fields={reviewFields}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      ) : null}
      <Reviews reviews={restaurant.reviews} />
    </>
  );
}
