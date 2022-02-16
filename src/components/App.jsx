/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import $ from 'dom7';

import {
  f7,
  App,
  Views,
  View,
  Toolbar,
  Link,
} from 'framework7-react';

import PWA from '../js/pwa';
import routes from '../js/routes';

const AppComponent = () => {
  const [activeTab, setActiveTab] = useState('today');
  const previousTab = useRef(null);

  useEffect(() => {
    previousTab.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    // Fix viewport scale on mobiles
    if ((f7.device.ios || f7.device.android) && f7.device.standalone) {
      const viewPortContent = document.querySelector('meta[name="viewport"]').getAttribute('content');
      document.querySelector('meta[name="viewport"]').setAttribute('content', `${viewPortContent}, maximum-scale=1, user-scalable=no`);
    }
  }, []);

  // Framework7 Parameters
  const f7params = {
    name: 'App Store',
    theme: 'ios',
    routes,
    autoDarkTheme: true,
  };
  if (process.env.NODE_ENV === 'production') {
    // Register service worker in production mode only
    PWA.init();
  }

  function onTabLinkClick(tab) {
    if (previousTab.current !== activeTab) return;
    if (activeTab === tab) {
      $(`#view-${tab}`)[0].f7View.router.back();
    }
  }
  return (
    <App {...f7params}>
      <Views tabs className="safe-areas">
        {/* <View id="view-apps" onTabShow={() => setActiveTab('apps')} main tab tabActive url="/apps/" /> */}
        <View id="view-apps" onTabShow={() => setActiveTab('apps')} main tab tabActive url="/app/544007664" />
      </Views>
    </App>
  );
};

export default AppComponent;
