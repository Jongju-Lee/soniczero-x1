import React from 'react';

const FEATURES_DATA = [
  {
    id: 'ai-chipset',
    icon: '/assets/icons/tech-core.svg',
    title: 'AI Chipset',
    desc: '자체 개발 SonicZero SZ-1 프로세서가 머신 러닝을 활용하여 실시간으로 노이즈 캔슬링을 최적화합니다. 사용자의 환경을 학습하고 초당 10,000회 오디오 전달을 자동 조정합니다.',
  },
  {
    id: 'battery',
    icon: '/assets/icons/tech-battery.svg',
    title: '60H Battery',
    desc: 'ANC 활성화 상태에서 업계 최고 수준인 60시간 배터리 수명을 제공합니다. 급속 충전으로 10분 충전 시 5시간 재생이 가능하며, USB-C 고속 충전을 지원합니다.',
  },
  {
    id: 'bluetooth',
    icon: '/assets/icons/tech-bluetooth.svg',
    title: 'Bluetooth 5.4',
    desc: '최대 3대의 디바이스에 동시 멀티포인트 연결이 가능합니다. 20ms의 초저지연으로 영상 통화와 게이밍에서도 완벽한 립싱크를 보장합니다.',
  },
  {
    id: 'audio',
    icon: '/assets/icons/tech-audio.svg',
    title: 'Hi-Res Audio',
    desc: 'LDAC, aptX Adaptive, AAC 코덱을 지원합니다. 40mm 커스텀 네오디뮴 드라이버가 4Hz~40kHz의 광대역 주파수로 스튜디오급 청취 경험을 제공합니다.',
  },
];

const TechFeatures = () => {
  return (
    <section className="tech__features section-md">
      <div className="tech__features-header tech-fade-up">
        <h2 className="tech__features-title">Built Different</h2>
        <p className="tech__features-desc">모든 부품이 최고의 성능을 위해 설계되었습니다.</p>
      </div>

      <div className="tech__grid">
        {FEATURES_DATA.map((feature) => (
          <article key={feature.id} className="tech__feature">
            <div className="tech__feature-icon-wrapper">
              <img src={feature.icon} alt="" className="tech__feature-icon" loading="lazy" />
            </div>
            <h3 className="tech__feature-title">{feature.title}</h3>
            <p className="tech__feature-desc">{feature.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TechFeatures;
