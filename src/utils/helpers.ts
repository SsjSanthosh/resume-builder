import { ZodError } from "zod";
export const generateZodError = (err: ZodError) => {
  const errors = err.issues.map((iss) => {
    return {
      [iss.path[0]]: iss.message,
    };
  });
  return errors;
};
