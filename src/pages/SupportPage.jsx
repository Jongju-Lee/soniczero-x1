import React from 'react';
import SupportSearch from '../sections/support/SupportSearch';
import SupportFaq from '../sections/support/SupportFaq';
import SupportDownloads from '../sections/support/SupportDownloads';
import SupportContact from '../sections/support/SupportContact';

const SupportPage = () => {
  return (
    <article className="support">
      <SupportSearch />
      <SupportFaq />
      <SupportDownloads />
      <SupportContact />
    </article>
  );
};

export default SupportPage;
