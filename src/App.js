
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import { Routes, Route } from 'react-router-dom';
import Shop from './routes/shop/shop.component';
import { useEffect } from 'react';
import { onAuthStateChangedListener } from './utils/firebase/firebase.utils';
import { createUserDocumentFromAuth } from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.actions';
import Checkout from './routes/checkout/checkout.component';
import Authentication from './routes/authentication/authentication.component';
// import SignUpForm from './components/sign-up-form/sign-up-form.components';
import { useDispatch } from 'react-redux';


const App = () => {

  const dispatch = useDispatch()
   // Whenever statechanges -> display user
   useEffect(() => {
      const unsubscribe = onAuthStateChangedListener((user) => {
          if(user){
              createUserDocumentFromAuth(user)
          }
          console.log(user)
          console.log(setCurrentUser)
          dispatch(setCurrentUser(user))
      }) 
      return unsubscribe
  }, [])

  return (
    <div>
        <Routes>
            <Route path='/' element={<Navigation />}> 
                <Route index element={<Home />} />
                <Route path='shop/*' element={<Shop />} />
                <Route path='auth' element={<Authentication />} />
                <Route path='checkout' element={<Checkout />} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;
