import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import { Switch, Route, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'
import { render } from '@testing-library/react';
import { canConstructResponseFromBodyStream } from 'workbox-core/_private';


class App extends React.Component {


  unsubsribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;

    this.unsubsribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {

        const userRef = await createUserProfileDocument(userAuth);


        userRef.onSnapshot(snapShot => {

          setCurrentUser({

            id: snapShot.id,
            ...snapShot.data()

          });

        })



      } else {

        setCurrentUser(userAuth);

      }


    })
  }

  componentWillUnmount() {
    this.unsubsribeFromAuth();
  }

  render() {

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={() =>
            this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)
          } />
        </Switch>
      </div>
    );

  }

}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
