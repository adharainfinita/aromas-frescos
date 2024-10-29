import {  Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ClientDetail from './components/ClientDetail';
import ProductDetail from './components/ProductDetail';
import PurchaseDetail from './components/PurchaseDetail';
import FormCreateProduct from './components/FormCreateProduct';
import FormCreateCustomer from './components/FormCreateCustomer';
import FormCreatePurchase from './components/FormCreatePurchase';
import Loading from './components/Loading';

function App() {
  

  return (

      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client/:id" element={<ClientDetail />} />
        <Route path='/createProduct' element={<FormCreateProduct/>}/>
        <Route path='/createCustomer' element={<FormCreateCustomer/>}/>
        <Route path='/createPurchase' element={<FormCreatePurchase/>}/>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/purchase/:id" element={<PurchaseDetail />} />
      </Routes>

  );
}

export default App;
