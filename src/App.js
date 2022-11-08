
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import { Routes, Route } from 'react-router-dom';
import Shop from './routes/Shop/shop-component';


import Authentication from './routes/authentication/authentication.component';
// import SignUpForm from './components/sign-up-form/sign-up-form.components';

const App = () => {
    
  return (
    <div>
        <Routes>
            <Route path='/' element={<Navigation />}> 
                <Route index element={<Home />} />
                <Route path='shop' element={<Shop />} />
                <Route path='auth' element={<Authentication />} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;
