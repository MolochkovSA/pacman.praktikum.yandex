export function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/serviceWorker.js');

        console.log('ServiceWorker registration successful with  scope: ', registration.scope);
      } catch (error) {
        console.log('ServiceWorker registration failed: ', error);
      }
    });
  }
}

startServiceWorker();
