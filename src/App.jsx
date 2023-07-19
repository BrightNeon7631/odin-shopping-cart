import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Store, { loader as storeLoader } from './Pages/Store/Store';
import Cart from './Pages/Store/Cart';
import Product, { loader as productLoader } from './Pages/Store/Product';
import './server';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route index element={<Home />}/>
    <Route path='store' element={<Store />} loader={storeLoader} />
    <Route path='store/:id' element={<Product />} loader={productLoader}/>
    <Route path='store/cart' element={<Cart />}/>
    <Route path='*' element={<NotFound />}/>
  </Route>
))

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App