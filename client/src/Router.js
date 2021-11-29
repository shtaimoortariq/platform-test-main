import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App';
import Products from './pages/Products';
import UploadProduct from './pages/uploadProduct';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="upload" element={<UploadProduct />} />
                <Route path="products" element={<Products />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router