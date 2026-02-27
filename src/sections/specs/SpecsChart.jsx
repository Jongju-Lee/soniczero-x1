import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const chartData = [
  { label: '배터리 수명', current: 60, prev: 35 },
  { label: 'ANC 깊이', current: 45, prev: 30 },
  { label: '주파수 범위', current: 40, prev: 20 },
  { label: '지연 시간', current: 95, prev: 60 },
  { label: '착용 편안함', current: 92, prev: 70 },
  { label: '코덱 지원', current: 4, prev: 2 }
];

const SpecsChart = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // prefers-reduced-motion 처리를 통해 스타일 width가 바로 보일 수 있도록 우회
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
       // 원래 React 요소에 인라인 style로 width가 들어가 있으므로, 아무것도 안 하면 기본적으로 100% 랜더링됨
       return;
    }

    // Chart Bars Animation
    gsap.from('.bar-fill.current', {
      scrollTrigger: {
        trigger: '.specs__chart-wrapper',
        start: 'top 75%',
      },
      width: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: 'power3.out'
    });

    gsap.from('.bar-fill.prev', {
      scrollTrigger: {
        trigger: '.specs__chart-wrapper',
        start: 'top 75%',
      },
      width: 0,
      duration: 1.5,
      stagger: 0.1,
      delay: 0.2,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <section className="specs__chart" ref={containerRef}>
      <div className="specs__chart-header">
        <h2>A Generational Leap</h2>
        <p>이전 세대 대비 X1의 주요 성능 지표를 비교해 보세요.</p>
      </div>
      
      <div className="specs__chart-wrapper" aria-hidden="true">
        <div className="specs__chart-legend">
          <div className="legend-item">
            <span className="dot current"></span>
            <span>SonicZero X1</span>
          </div>
          <div className="legend-item">
            <span className="dot prev"></span>
            <span>이전 세대</span>
          </div>
        </div>

        <div className="specs__chart-container">
          <div className="chart-rows">
            {chartData.map((item) => (
              <div className="chart-row" key={item.label}>
                <span className="chart-row__label">{item.label}</span>
                <div className="chart-row__bars">
                  <div className="bar-track">
                    <div className="bar-fill current" style={{ width: `${item.current}%` }}></div>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill prev" style={{ width: `${item.prev}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="x-axis">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>
      </div>

      {/* Screen Reader Only Chart Data */}
      <table className="sr-only">
        <caption>이전 세대 대비 X1 주요 성능 지표 비교 표</caption>
        <thead>
          <tr>
            <th scope="col">성능 지표</th>
            <th scope="col">SonicZero X1 단위(%)</th>
            <th scope="col">이전 세대 단위(%)</th>
          </tr>
        </thead>
        <tbody>
          {chartData.map((item) => (
            <tr key={item.label}>
              <th scope="row">{item.label}</th>
              <td>{item.current}</td>
              <td>{item.prev}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SpecsChart;
