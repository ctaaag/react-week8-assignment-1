import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import {
  loadInitialData,
  setRegions,
  setCategories,
  loadRestaurants,
  loadRestaurant,
  setRestaurants,
  setRestaurant,
} from './slice/restaurantSlice';

import { setAccessToken, requestLogin } from './slice/loginSlice';

import {
  setReviews,
  loadReview,
  sendReview,
  clearReviewFields,
} from './slice/reviewSlice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('actions', () => {
  let store;

  describe('loadInitialData', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('runs setRegions and setCategories', async () => {
      await store.dispatch(loadInitialData());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setRegions([]));
      expect(actions[1]).toEqual(setCategories([]));
    });
  });

  describe('loadRestaurants', () => {
    context('with selectedRegion and selectedCategory', () => {
      beforeEach(() => {
        store = mockStore({
          restaurantSlice: {
            selectedRegion: { id: 1, name: '서울' },
            selectedCategory: { id: 1, name: '한식' },
          },
        });
      });

      it('runs setRestaurants', async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRestaurants([]));
      });
    });

    context('without selectedRegion', () => {
      beforeEach(() => {
        store = mockStore({
          restaurantSlice: {
            selectedCategory: { id: 1, name: '한식' },
          },
        });
      });

      it("does'nt run any actions", async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });

    context('without selectedCategory', () => {
      beforeEach(() => {
        store = mockStore({
          restaurantSlice: {
            selectedRegion: { id: 1, name: '서울' },
          },
        });
      });

      it("does'nt run any actions", async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });
  });

  describe('loadRestaurant', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('dispatchs setRestaurant', async () => {
      await store.dispatch(loadRestaurant({ restaurantId: 1 }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setRestaurant(null));
      expect(actions[1]).toEqual(setRestaurant({}));
    });
  });

  describe('requestLogin', () => {
    beforeEach(() => {
      store = mockStore({
        loginSlice: {
          loginFields: { email: '', password: '' },
        },
      });
    });

    it('dispatchs setAccessToken', async () => {
      await store.dispatch(requestLogin());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setAccessToken({}));
    });
  });

  describe('loadReview', () => {
    beforeEach(() => {
      store = mockStore({
        loginSlice: {
          loginFields: { email: '', password: '' },
        },
      });
    });

    it('dispatchs setReviews', async () => {
      await store.dispatch(loadReview({ restaurantId: 1 }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setReviews());
    });
  });

  describe('sendReview', () => {
    beforeEach(() => {
      store = mockStore({
        loginSlice: {
          accessToken: '',
        },
        reviewSlice: {
          reviewFields: {
            score: 1,
            description: '',
          },
        },
      });
    });

    it('dispatchs clearReviewFields', async () => {
      await store.dispatch(sendReview({ restaurantId: 1 }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(clearReviewFields());
    });
  });
});
