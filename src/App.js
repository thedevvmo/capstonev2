
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import { Routes, Route } from 'react-router-dom';
import Shop from './routes/Shop/shop-component';
import SignIn from './routes/sign-in/sign-in.component';

const App = () => {
    
  return (
    <div>
        <Routes>
            <Route path='/' element={<Navigation />}> 
                <Route index element={<Home />} />
                <Route path='shop' element={<Shop />} />
                <Route path='signIn' element={<SignIn />} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;
