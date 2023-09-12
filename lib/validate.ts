export const isValidEmail = (
  emailString: string | null | undefined
): boolean => {
  return /^\w+[\w\-]*(\.[\w\-]+)*@\w+[\w\-]*(\.[\w\-]+)*\.\w+[\w\-]*$/.test(
    emailString || ""
  );
};
