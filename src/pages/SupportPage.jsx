import React from 'react';
import SupportHero from '../sections/support/SupportHero';
import SupportFaq from '../sections/support/SupportFaq';
import SupportDownloads from '../sections/support/SupportDownloads';
import SupportContact from '../sections/support/SupportContact';

const SupportPage = () => {
  return (
    <article className="support">
      <SupportHero />
      <SupportFaq />
      <SupportDownloads />
      <SupportContact />
    </article>
  );
};

export default SupportPage;
