import { body, param } from 'express-validator';

const isRequired = (field: string) => `${field} is required.`;
const shouldBeNumber = (field: string) => `${field} should be a number.`;
const shouldBeString = (field: string) => `${field} should be a string.`;

const commonValidations = [
  body('title')
    .isString()
    .withMessage(shouldBeString('Title'))
    .notEmpty()
    .withMessage(isRequired('Title')),
  body('subtitle')
    .isString()
    .withMessage(shouldBeString('subtitle'))
    .notEmpty()
    .withMessage(isRequired('subtitle')),
  body('description')
    .isString()
    .withMessage(shouldBeString('Description'))
    .notEmpty()
    .withMessage(isRequired('Description')),
  body('media')
    .custom((value, { req }) => {
      if (typeof value === 'string' || req.file) {
        return true;
      }
      throw new Error('Media should be a string or a file');
    })
    .withMessage('Media should be a string or a file'),
];

export const homeValidators = {
  createValidator: [...commonValidations],
  updateValidator: [
    param('id')
      .isInt()
      .withMessage(shouldBeNumber('Id'))
      .notEmpty()
      .withMessage(isRequired('Id')),
    ...commonValidations,
  ],
  deleteValidator: [
    param('id')
      .isInt()
      .withMessage(shouldBeNumber('Id'))
      .notEmpty()
      .withMessage(isRequired('Id')),
  ],
};
