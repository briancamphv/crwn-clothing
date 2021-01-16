import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { render } from '@testing-library/react';
import { canConstructResponseFromBodyStream } from 'workbox-core/_private';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubsribeFromAuth = null;

  componentDidMount() {
    this.unsubsribeFromAuth=auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
       
        const userRef = await createUserProfileDocument(userAuth);
        
        
        userRef.onSnapshot( snapShot => {

          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
          console.log(this.state.currentUser);
        })

        

      } else {

        this.setState({currentUser: userAuth});

      }
      
   
    })
  }

  componentWillUnmount() {
    this.unsubsribeFromAuth();
  }

  render() {

    return (
      <div>
        <Header currentUser= {this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );

  }
  
}

export default App;
