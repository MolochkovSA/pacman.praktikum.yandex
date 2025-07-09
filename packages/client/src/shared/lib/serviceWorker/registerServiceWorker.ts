export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/serviceWorker.js', { type: 'module' });

        console.log('ServiceWorker registration successful with  scope: ', registration.scope);
      } catch (error) {
        console.log('ServiceWorker registration failed: ', error);
      }
    });
  } else {
    console.warn('ServiceWorker registration failed');
  }
}
