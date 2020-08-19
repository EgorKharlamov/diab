import Joi from '@hapi/joi';

const schema = Joi.object({
  login: Joi.string().min(3).max(10).required(),
  pass: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

export default schema;
