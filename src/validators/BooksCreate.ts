import { Joi, Segments, celebrate } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    author_id: Joi.string().required(),
    category_id: Joi.string().required(),
    title: Joi.string().required(),
    contents: Joi.string().min(500),
    price: Joi.number().min(20),
    pages: Joi.number().min(100),
  }),
});
