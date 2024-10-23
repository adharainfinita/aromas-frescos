import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ClientDetail from './components/ClientDetail';
import ProductDetail from './components/ProductDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/client/:id" element={<ClientDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
