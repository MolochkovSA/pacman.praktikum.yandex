// Простая проверка на наличие HTML-тегов
export const noHtmlTags = (val: string) => {
  return !/<\/?[a-z][\s\S]*>/i.test(val);
};
