import {  Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Dashboard from './components/Dashboard';
import ClientDetail from './components/ClientDetail';
import ProductDetail from './components/ProductDetail';
import PurchaseDetail from './components/PurchaseDetail';
import { getAllProducts } from './services/productsServices';
import { getAllCustomers } from './services/customersService';
import { getAllPurchases } from './services/purchasesServices';
import { getProducts } from './redux/features/productsSlice';
import { getCustomers } from './redux/features/clientsSlice';
import { getPurchases } from './redux/features/purchaseSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductsAndClients = async () => {
      try {
        const responseProduct = await getAllProducts();
        const responseCustomer = await getAllCustomers();
        const resposnePurchase = await getAllPurchases();
        if (responseProduct) {
       
          dispatch(getProducts(responseProduct));
        }
        if (responseCustomer) {
         
          dispatch(getCustomers(responseCustomer));
        }
        if(resposnePurchase) {
       
          dispatch(getPurchases(resposnePurchase));
        }
      } catch (error) {
        console.error("Error al obtener los productos o clientes:", error);
      }
    };

    fetchProductsAndClients();
  }, [dispatch]);

  return (

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/client/:id" element={<ClientDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/purchase/:id" element={<PurchaseDetail />} />
      </Routes>

  );
}

export default App;
