import {createSelector} from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItem
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItem => cartItem.reduce((accumulatedQuanity,cartItem) => accumulatedQuanity + cartItem.quantity
    ,0)
)

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItem => cartItem.reduce((accumulatedQuanity,cartItem) => accumulatedQuanity + cartItem.quantity * cartItem.price
    ,0)


)