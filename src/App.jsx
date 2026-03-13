import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layout
import RootLayout from './layouts/RootLayout';
import { ToastProvider } from './contexts/ToastContext';

// Pages — 코드 스플리팅: 각 페이지를 방문할 때만 JS 로드
const Home = lazy(() => import('./pages/Home'));
const TechPage = lazy(() => import('./pages/TechPage'));
const SpecsPage = lazy(() => import('./pages/SpecsPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));

// v6.4+ Data Router 구성
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // 껍데기 역할 (Header, Footer, ScrollRestoration 포함)
    children: [
      { index: true, element: <Suspense fallback={null}><Home /></Suspense> },
      { path: "technology", element: <Suspense fallback={null}><TechPage /></Suspense> },
      { path: "specs", element: <Suspense fallback={null}><SpecsPage /></Suspense> },
      { path: "support", element: <Suspense fallback={null}><SupportPage /></Suspense> },
      { path: "shop", element: <Suspense fallback={null}><ShopPage /></Suspense> },
    ],
  },
]);

const App = () => {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
};

export default App;



