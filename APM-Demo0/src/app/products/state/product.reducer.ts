import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";

import * as AppState from '../../state/app.state';
import { Product } from '../product';
import * as ProductActions from './product.actions';

export interface State extends AppState.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: []
}

// Selector for Product feature's state
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// Selector for showProductCode
export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

// Selector for currentProduct
export const getCurrentProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
);

// Selector for products
export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductActions.toggleProductCode, (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    }),
    on(ProductActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProduct: action.product
        }
    }),
    on(ProductActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProduct: null
        }
    }),
    on(ProductActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProduct: {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            }
        }
    })
);