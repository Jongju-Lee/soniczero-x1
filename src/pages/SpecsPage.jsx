import React from 'react';
import SpecsTable from '../sections/specs/SpecsTable';
import SpecsChart from '../sections/specs/SpecsChart';

const SpecsPage = () => {
  return (
    <article className="specs">
      <SpecsTable />
      <SpecsChart />
    </article>
  );
};

export default SpecsPage;
