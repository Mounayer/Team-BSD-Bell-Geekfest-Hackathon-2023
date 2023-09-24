import React from 'react';

import AboutUs from '@/src/components/text/about';
import TemplatePage from '@/src/components/information-pages/template';

export default function Page() {
  return (
    <TemplatePage Text={<AboutUs />} Title="About Us"/>
    
    
  );
}
