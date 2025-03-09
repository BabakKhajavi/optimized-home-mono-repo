import express, { NextFunction } from 'express';
import { Request, Response } from 'express';

import { Category, Subcategory } from '../../models';
import { isAuthorized } from '../../middleware/user-validator';
import { ErrorMessages, SuccessStatusCode } from '../../types';
import { HttpError } from '../../utils/http-error';
import { categoryValidators } from './category-validators';
import { validateRequest } from '../../middleware/request-validator';

const router = express.Router();

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const result = await Category.findByPk(id);
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Category.findAll({
        include: [
          {
            model: Subcategory,
            as: 'subcategories', // Use the alias defined in your association
            attributes: ['id', 'title'], // Specify the attributes you want to include
          },
        ],
      });
      res.status(SuccessStatusCode.OK).send(result);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/')
  .post(
    isAuthorized,
    categoryValidators.createValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const payload = { ...req.body };
        const category = await Category.create(payload);
        res.status(SuccessStatusCode.CREATED).send(category);
      } catch (error) {
        next(error);
      }
    },
  );

router
  .route('/:id')
  .put(
    isAuthorized,
    categoryValidators.updateValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id);
        const payload = { ...req.body };
        const result = await Category.findByPk(id);
        if (!result) {
          return next(HttpError.notFound(ErrorMessages.NoRecordFound));
        }
        await result.update(payload);
        res.status(SuccessStatusCode.OK).send({ message: 'Category updated!' });
      } catch (error) {
        next(error);
      }
    },
  );

router
  .route('/:id')
  .delete(
    isAuthorized,
    categoryValidators.deleteValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id);

        const result = await Category.findByPk(id);
        if (!result) {
          return next(HttpError.notFound(ErrorMessages.NoRecordFound));
        }
        await result.destroy();
        res.status(SuccessStatusCode.OK).send(result);
      } catch (error) {
        next(error);
      }
    },
  );

export { router as categoryController };
