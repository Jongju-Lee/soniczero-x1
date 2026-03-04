import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
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

const SpecsTable = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // prefers-reduced-motion: 애니메이션 축소 모드일 시 바로 정적 표시
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
       gsap.set(['.specs__header-badge', '.specs__header-title', '.specs__header-desc', '.specs__table-row'], { opacity: 1, y: 0 });
       return;
    }

    // Header Animation
    gsap.fromTo('.specs__header-badge', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.8, delay: 0.2, ease: 'power4.out' });
    gsap.fromTo('.specs__header-title', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.8, delay: 0.3, ease: 'power4.out' });
    gsap.fromTo('.specs__header-desc', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.8, delay: 0.4, ease: 'power4.out' });

    // Table Row Animation
    gsap.fromTo('.specs__table-row', 
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        scrollTrigger: {
          trigger: '.specs__table-wrapper',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.out'
      }
    );
  }, { scope: containerRef });

  return (
    <section className="specs__table" ref={containerRef}>
      <div className="specs__header">
        <span className="specs__header-badge">Specifications</span>
        <h1 className="specs__header-title">Every Detail Matters</h1>
        <p className="specs__header-desc">혁신의 모든 디테일, SonicZero X1의 정밀한 기술 사양을 확인하세요.</p>
      </div>

      <div className="specs__table-wrapper">
        <div className="specs__table-header">
          <h2>기술 사양</h2>
        </div>
        <table className="specs__table-content">
          <caption className="sr-only">상세 기술 사양 표</caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">사양명</th>
              <th scope="col">사양값</th>
            </tr>
          </thead>
          <tbody className="specs__table-body">
            {specsData.map((item) => (
              <tr className="specs__table-row" key={item.label}>
                <th scope="row" className="label">{item.label}</th>
                <td className="value">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SpecsTable;
