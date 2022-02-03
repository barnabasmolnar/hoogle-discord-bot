import * as yup from "https://esm.sh/yup";

export const itemSchema = yup.object().shape({
  docs: yup.string().required(),
  item: yup.string().required(),
  module: yup.object().shape({ name: yup.string().required() }),
  url: yup.string().url().required(),
});

export const hoogleSchema = yup.array().of(itemSchema);

export const validateSchema = (schema: yup.BaseSchema, data: unknown) =>
  schema.validate(data, { stripUnknown: true });
