import React, { useState } from 'react';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';
import CustomSelect from '../../components/ui/CustomSelect';

const contactTypeOptions = [
  { value: 'product', label: 'Product Inquiry (제품 문의)' },
  { value: 'order', label: 'Order & Shipping (주문 / 배송)' },
  { value: 'warranty', label: 'Warranty & Repair (보증 / 수리)' },
  { value: 'technical', label: 'Technical Support (기술 지원)' },
  { value: 'feedback', label: 'Feedback & Suggestions (피드백)' },
];

const SupportContact = () => {
  const sectionRef = useScrollFadeIn();
  
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    contactName: '',
    contactEmail: '',
    contactType: '',
    contactMessage: ''
  });

  // 에러 상태 및 터치 상태 관리
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'contactName':
        if (!value.trim()) error = '이름을 입력해 주세요.';
        break;
      case 'contactEmail':
        if (!value.trim()) {
          error = '이메일을 입력해 주세요.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = '유효한 이메일 형식을 입력해 주세요.';
        }
        break;
      case 'contactType':
        if (!value) error = '문의 유형을 선택해 주세요.';
        break;
      case 'contactMessage':
        if (!value.trim()) error = '메시지를 입력해 주세요.';
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (touched[id]) {
      setErrors(prev => ({ ...prev, [id]: validateField(id, value) }));
    }
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, contactType: value }));
    if (touched.contactType) {
      setErrors(prev => ({ ...prev, contactType: validateField('contactType', value) }));
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    // 전체 폼 검증
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    
    // 모든 필드를 터치한 것으로 간주하여 에러 메시지 표시
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (Object.keys(newErrors).length === 0) {
      // 폼 제출 로직 (정상 제출)
      console.log('Form submitted successfully:', formData);
      alert('문의가 접수되었습니다.');
      // 폼 초기화 로직 등
    }
  };

  return (
    <section className="support__contact" ref={sectionRef}>
      <div className="support__contact-header">
        <h2>Contact Us</h2>
        <p>FAQ에서 답을 찾지 못하셨나요? 직접 문의해 주세요.</p>
      </div>

      <form className="support__contact-form" onSubmit={handleContactSubmit}>
        <div className="form-row">
          <div className={`form-group ${touched.contactName && errors.contactName ? 'has-error' : ''}`}>
            <label htmlFor="contactName">성함 <span className="required">*</span></label>
            <input 
              type="text" 
              id="contactName" 
              placeholder="홍길동" 
              value={formData.contactName}
              onChange={handleInputChange}
            />
            {touched.contactName && errors.contactName && <span className="error-msg">{errors.contactName}</span>}
          </div>
          <div className={`form-group ${touched.contactEmail && errors.contactEmail ? 'has-error' : ''}`}>
            <label htmlFor="contactEmail">이메일 <span className="required">*</span></label>
            <input 
              type="email" 
              id="contactEmail" 
              placeholder="email@example.com" 
              value={formData.contactEmail}
              onChange={handleInputChange}
            />
            {touched.contactEmail && errors.contactEmail && <span className="error-msg">{errors.contactEmail}</span>}
          </div>
        </div>

        <div className={`form-group ${touched.contactType && errors.contactType ? 'has-error' : ''}`}>
          <label htmlFor="contactType">문의 유형 <span className="required">*</span></label>
          <CustomSelect
            id="contactType"
            options={contactTypeOptions}
            placeholder="문의 유형을 선택해 주세요"
            value={formData.contactType}
            onChange={handleSelectChange}
          />
          {touched.contactType && errors.contactType && <span className="error-msg">{errors.contactType}</span>}
        </div>

        <div className={`form-group ${touched.contactMessage && errors.contactMessage ? 'has-error' : ''}`}>
          <label htmlFor="contactMessage">메시지 <span className="required">*</span></label>
          <textarea 
            id="contactMessage" 
            placeholder="문의하실 내용을 상세히 적어주세요." 
            value={formData.contactMessage}
            onChange={handleInputChange}
          ></textarea>
          {touched.contactMessage && errors.contactMessage && <span className="error-msg">{errors.contactMessage}</span>}
        </div>

        <button type="submit" className="support__contact-submit btn btn--primary btn--lg">
          <span>문의하기</span>
        </button>
      </form>
    </section>
  );
};

export default SupportContact;
