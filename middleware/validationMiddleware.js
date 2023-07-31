import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constans.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        const firstMessage = errorMessages[0];
        console.log(Object.getPrototypeOf(firstMessage));
        if (errorMessages[0].startsWith('iş bulunamadı.')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('bu alana erişim yetkiniz yok.')) {
          throw new UnauthorizedError('bu alana erişim yetkiniz yok.');
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('şirket gereklidir.'),
  body('position').notEmpty().withMessage('pozisyon gereklidir.'),
  body('jobLocation').notEmpty().withMessage('iş konumu gereklidir.'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('geçersiz iş durumu değeri'),
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('geçersiz iş türü değeri'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError('geçersiz id');
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`bu ${value} id' ye ait iş bulunamadı.`);
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === job.createdBy.toString();

    if (!isAdmin && !isOwner)
      throw new UnauthorizedError('bu alana erişim yetkiniz yok.');
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('isim gereklidir.'),
  body('email')
    .notEmpty()
    .withMessage('e-posta gereklidir.')
    .isEmail()
    .withMessage('geçersiz e-posta formatı')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('e-posta zaten kayıtlı.');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('şifre gereklidir.')
    .isLength({ min: 8 })
    .withMessage('şifre en az 8 karakter olmalıdır'),
  body('location').notEmpty().withMessage('konum gereklidir.'),
  body('lastName').notEmpty().withMessage('soyadı gereklidir.'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('e-posta gereklidir.')
    .isEmail()
    .withMessage('geçersiz e-posta formatı'),
  body('password').notEmpty().withMessage('şifre gereklidir.'),
]);

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('İsim gereklidir.'),
  body('email')
    .notEmpty()
    .withMessage('e-posta gereklidir.')
    .isEmail()
    .withMessage('geçersiz e-posta formatı')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError('e-posta zaten var');
      }
    }),

  body('location').notEmpty().withMessage('konum gereklidir.'),
  body('lastName').notEmpty().withMessage('Soyadı gereklidir.'),
]);
