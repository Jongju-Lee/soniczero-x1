import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layout
import RootLayout from './layouts/RootLayout';

// Pages
import Home from './pages/Home';
import TechPage from './pages/TechPage';
import SpecsPage from './pages/SpecsPage';
import SupportPage from './pages/SupportPage';
import ShopPage from './pages/ShopPage';

// v6.4+ Data Router 구성
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // 껍데기 역할 (Header, Footer, ScrollRestoration 포함)
    children: [
      { index: true, element: <Home /> },
      { path: "technology", element: <TechPage /> },
      { path: "specs", element: <SpecsPage /> },
      { path: "support", element: <SupportPage /> },
      { path: "shop", element: <ShopPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;



