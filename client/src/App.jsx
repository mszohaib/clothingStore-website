import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AdminLayout } from './layouts/AdminLayout.jsx';
import { AuthLayout } from './layouts/AuthLayout.jsx';
import { MainLayout } from './layouts/MainLayout.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { CartPage } from './pages/CartPage.jsx';
import { CheckoutPage } from './pages/CheckoutPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { FaqPage } from './pages/FaqPage.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { OrderSuccessPage } from './pages/OrderSuccessPage.jsx';
import { PolicyPage } from './pages/PolicyPage.jsx';
import { PreorderPage } from './pages/PreorderPage.jsx';
import { ProductDetailPage } from './pages/ProductDetailPage.jsx';
import { ShopPage } from './pages/ShopPage.jsx';
import { SignupPage } from './pages/SignupPage.jsx';
import { SizeChartPage } from './pages/SizeChartPage.jsx';
import { SoldPage } from './pages/SoldPage.jsx';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.jsx';
import { AdminLoginPage } from './pages/admin/AdminLoginPage.jsx';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage.jsx';
import { AdminProductsPage } from './pages/admin/AdminProductsPage.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:slug" element={<ProductDetailPage />} />
            <Route path="/sold" element={<SoldPage />} />
            <Route path="/preorder" element={<PreorderPage />} />
            <Route path="/size-chart" element={<SizeChartPage />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
