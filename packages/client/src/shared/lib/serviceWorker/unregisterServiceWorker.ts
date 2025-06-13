export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((reg) => {
      reg.unregister();
      console.info('ServiceWorker unregistered');
    });
  } else {
    console.warn('ServiceWorker unregistration failed');
  }
}
