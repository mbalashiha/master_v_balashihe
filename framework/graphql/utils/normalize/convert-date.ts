export const convertDate = (inDt: string | Date | null): Date => {
  return typeof inDt === "string" && typeof window !== "undefined"
    ? new Date(inDt)
    : ((inDt || null) as any);
};
export default convertDate;
