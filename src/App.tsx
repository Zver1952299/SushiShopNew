import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';
import './scss/libs/_normalize.scss';

import Header from './components/Header/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Product from './pages/Product';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
