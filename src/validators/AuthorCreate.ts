import { Joi, Segments, celebrate } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    description: Joi.string().max(400),
  }),
});
