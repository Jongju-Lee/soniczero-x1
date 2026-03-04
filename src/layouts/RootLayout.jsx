import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/**
 * 최상위 레이아웃 컴포넌트
 * v6.4+ Data Router 전용으로, 모든 페이지를 감싸며 Header, Footer 및 네이티브 ScrollRestoration 기능 제공
 */
const RootLayout = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-wrapper">
        <Outlet />
      </main>
      <Footer />
      {/* React Router v6.4+ 네이티브 스크롤 복원. 라우팅 즉시/뒤로가기 시 완벽한 스크롤 타이밍 제어 */}
      <ScrollRestoration />
    </div>
  );
};

export default RootLayout;
