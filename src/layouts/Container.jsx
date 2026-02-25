import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="container" style={{
      width: '100%',
      maxWidth: 'var(--container-max-width, 1200px)',
      margin: '0 auto',
      padding: '0 var(--spacing-40, 2.5rem)',
    }}>
      {children}
    </div>
  );
};

export default Container;
