import React from 'react';
import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { connect } from 'react-redux';

const CartDropdown = ({cartItem}) => (

    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItem.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem} />
                ))}

        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>


);

const mapStateToProps = ({ cart: { cartItem } }) => ({
    cartItem
})

export default connect(mapStateToProps)(CartDropdown);

