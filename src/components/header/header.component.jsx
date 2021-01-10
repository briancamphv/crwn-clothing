import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';


const Header = ({ currentUser }) => (
    <div className="header">
        <div>
            <Link className='logo-container' to='/'>
                <Logo className="logo" />
            </Link>

        </div>
        <div className="options">
            <Link className="options" to='/shop'>
                SHOP
            </Link>
            <Link className="options" to='/shop'>
                CONTACT
            </Link>
            {currentUser ?
                <div className='option' onClick={() => auth.signOut()}>
                    SIGN OUT
                 </div>
                :
                <Link className='option' to='/signIn'>SIGN IN</Link>
            }
        </div>

    </div>


)

export default Header;
