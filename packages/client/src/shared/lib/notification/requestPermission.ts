export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    alert('Этот браузер не поддерживает уведомления');
    return;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};
