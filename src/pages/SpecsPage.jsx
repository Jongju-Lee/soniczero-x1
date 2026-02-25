import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const specsData = [
  { label: '드라이버 크기', value: '40mm 커스텀 네오디뮴' },
  { label: '주파수 응답', value: '4Hz – 40,000Hz' },
  { label: '임피던스', value: '32Ω' },
  { label: '감도', value: '105dB/mW' },
  { label: 'ANC 차단 깊이', value: '최대 45dB 감소' },
  { label: 'Bluetooth 버전', value: '5.4' },
  { label: '오디오 코덱', value: 'LDAC, aptX Adaptive, AAC, SBC' },
  { label: '배터리 수명 (ANC ON)', value: '60시간' },
  { label: '배터리 수명 (ANC OFF)', value: '80시간' },
  { label: '충전 시간', value: '2시간 (USB-C)' },
  { label: '급속 충전', value: '10분 → 5시간' },
  { label: '무게', value: '265g' },
  { label: '멀티포인트 연결', value: '최대 3대 동시' },
  { label: '마이크', value: '6x 빔포밍 MEMS' },
  { label: '방수 등급', value: 'IPX4' }
];

const chartData = [
  { label: '배터리 수명', current: 60, prev: 35 },
  { label: 'ANC 깊이', current: 45, prev: 30 },
  { label: '주파수 범위', current: 40, prev: 20 },
  { label: '지연 시간', current: 95, prev: 60 },
  { label: '착용 편안함', current: 92, prev: 70 },
  { label: '코덱 지원', current: 4, prev: 2 }
];

const SpecsPage = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.from('.specs__header-badge', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.specs__header-title', { y: 30, opacity: 0, duration: 0.8, delay: 0.1, ease: 'power3.out' });
      gsap.from('.specs__header-desc', { y: 30, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });

      // Table Row Animation
      gsap.from('.specs__table-row', {
        scrollTrigger: {
          trigger: '.specs__table',
          start: 'top 80%',
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out'
      });

      // Chart Bars Animation
      gsap.from('.bar-fill.current', {
        scrollTrigger: {
          trigger: '.specs__chart',
          start: 'top 75%',
        },
        width: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power3.out'
      });

      gsap.from('.bar-fill.prev', {
        scrollTrigger: {
          trigger: '.specs__chart',
          start: 'top 75%',
        },
        width: 0,
        duration: 1.5,
        stagger: 0.1,
        delay: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="specs" ref={containerRef}>
      <header className="specs__header">
        <span className="specs__header-badge">Specifications</span>
        <h1 className="specs__header-title">Every Detail Matters</h1>
        <p className="specs__header-desc">혁신의 모든 디테일, SonicZero X1의 정밀한 기술 사양을 확인하세요.</p>
      </header>

      <section className="specs__content">
        <div className="specs__table">
          <div className="specs__table-header">
            <h3>기술 사양</h3>
          </div>
          <div className="specs__table-body">
            {specsData.map((item, index) => (
              <div className="specs__table-row" key={index}>
                <span className="label">{item.label}</span>
                <span className="value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="specs__chart-section">
          <div className="specs__chart-header">
            <h2>A Generational Leap</h2>
            <p>이전 세대 대비 X1의 주요 성능 지표를 비교해 보세요.</p>
          </div>
          
          <div className="specs__chart">
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
              <div className="y-axis">
                {chartData.map((item, index) => (
                  <div key={index} className="y-label">{item.label}</div>
                ))}
              </div>
              
              <div className="chart-area">
                <div className="grid-lines">
                  <span>0</span>
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100</span>
                </div>
                
                <div className="bars">
                  {chartData.map((item, index) => (
                    <div className="bar-group" key={index}>
                      <div className="bar-track">
                        <div className="bar-fill prev" style={{ width: `${item.prev}%` }}></div>
                      </div>
                      <div className="bar-track">
                        <div className="bar-fill current" style={{ width: `${item.current}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpecsPage;
