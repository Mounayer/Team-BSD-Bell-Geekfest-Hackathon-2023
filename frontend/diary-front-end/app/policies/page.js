import React from 'react';
import Card from '@/src/components/information-pages/card';
import PrivacyPolicy from '@/src/components/text/policies';
import TemplatePage from '@/src/components/information-pages/template';

export default function Page() {
  return (
    <TemplatePage Text={<PrivacyPolicy />} Title="Policy"/>
    
    
  );
}
