import React from 'react';
import { createRoot } from 'react-dom/client';

async function renderSite() {
  const home = window.location.pathname.replace(/\/$/, '') === '';
  let App;
  if (home) {
    App = (await import('./App')).default;
    await import('./style.css');
  } else {
    App = (await import('./production/App')).default;
    await import('./production/style.css');
  }
  createRoot(document.getElementById('root')).render(<App />);
}

renderSite();
