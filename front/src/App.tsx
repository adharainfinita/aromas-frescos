import {  Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Dashboard from './components/Dashboard';
import ClientDetail from './components/ClientDetail';
import ProductDetail from './components/ProductDetail';
import { getAllProducts } from './services/productsServices';
import { getAllCustomers } from './services/customersService';
import { getProducts } from './redux/features/productsSlice';
import { getCustomers } from './redux/features/clientsSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductsAndClients = async () => {
      try {
        const responseProduct = await getAllProducts();
        const responseCustomer = await getAllCustomers();
        if (responseProduct) {
          console.log("Productos obtenidos en App:", responseProduct);
          dispatch(getProducts(responseProduct));
        }
        if (responseCustomer) {
          console.log("Clientes obtenidos en App:", responseCustomer);
          dispatch(getCustomers(responseCustomer));
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
      </Routes>

  );
}

export default App;
