const keys: { [key: string]: string } = { "Nothing to save": "Нет изменений" };

export const locale = (message: string): string => {
  if (keys[message]) {
    return keys[message];
  }
  return message;
};
export default locale;
