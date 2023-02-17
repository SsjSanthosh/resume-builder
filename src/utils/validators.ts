import z from "zod";

const loginObject = {
  email: z
    .string({
      required_error: "User email cannot be empty",
      invalid_type_error: "User email must be a proper email",
    })
    .email(),
  password: z
    .string({
      required_error: "User password cannot be empty",
      invalid_type_error: "User password must be at least 6 characters",
    })
    .min(6),
};

export const registerRouteValidator = z.object({
  name: z.string({
    required_error: "User's name cannot be empty",
    invalid_type_error: "User's name must be of type string",
  }),
  ...loginObject,
});

export const loginRouteValidator = z.object(loginObject);
