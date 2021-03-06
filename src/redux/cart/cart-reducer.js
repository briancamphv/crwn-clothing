import CardActionTypes from './cart.types';

import { addItemToCart,removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    cartItem: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CardActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case CardActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItem: addItemToCart(state.cartItem, action.payload)
            }
        case CardActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItem: removeItemFromCart(state.cartItem, action.payload)
            }
        case CardActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItem: state.cartItem.filter(cartItem => cartItem.id !== action.payload.id)
            }
            case CardActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItem: []
            }
        default:
            return state;
    }
}

export default cartReducer;