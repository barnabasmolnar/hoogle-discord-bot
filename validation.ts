import { yup } from "./deps.ts";

export const itemSchema = yup.object().shape({
  docs: yup.string().ensure(),
  item: yup.string().ensure(),
  module: yup.object().shape({ name: yup.string().ensure() }),
  url: yup.string().url().required(),
});

export const hoogleSchema = yup.array().min(1).of(itemSchema);

export const validateSchema = (schema: yup.BaseSchema, data: unknown) =>
  schema.validate(data, { stripUnknown: true });
