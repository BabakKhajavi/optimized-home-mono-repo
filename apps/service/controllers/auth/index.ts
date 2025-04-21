import express, { NextFunction } from 'express';
import { Auth } from '../../models';
import { generateToken } from '../../utils/generate-token';
import { HttpError } from '../../utils/http-error';
import { ErrorMessages, SuccessStatusCode } from '../../types/enums';
import { authValidators } from './auth-validators';
import { validateRequest } from '../../middleware/request-validator';
import { Request, Response } from 'express';
import { encrypt, isMatch } from '../../utils/encrypt';
import { IUser } from '@packages/common';
import { isAuthorized } from '../../middleware/user-validator';

type UserWithoutPassword = Omit<IUser, 'password'>;
const router = express.Router();

router
  .route('/users/:id')
  .get(
    isAuthorized,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id);
        const user = await Auth.findByPk(id);
        res.status(SuccessStatusCode.CREATED).send(user);
      } catch (error) {
        next(error);
      }
    },
  );
router
  .route('/users')
  .get(
    isAuthorized,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = await Auth.findAll();
        res.status(SuccessStatusCode.CREATED).send(user);
      } catch (error) {
        next(error);
      }
    },
  );

router
  .route('/register')
  .post(
    authValidators.registerValidator,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userPayload = { ...req.body } as IUser;
        const encryptedPassword = await encrypt(userPayload.password, 12);
        userPayload.password = encryptedPassword;
        const user = await Auth.create(userPayload);
        res.status(SuccessStatusCode.CREATED).send(user);
      } catch (error) {
        next(error);
      }
    },
  );

router
  .route('/login')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const existingUser = await Auth.findOne({ where: { username } });
      if (existingUser) {
        const passwordMatched = await isMatch(password, existingUser.password);
        if (passwordMatched) {
          const userWithoutPassword: UserWithoutPassword = {
            ...(existingUser.toJSON() as IUser),
          };

          const data: UserWithoutPassword & {
            isAuthenticatedDashboard: boolean;
          } = {
            ...userWithoutPassword,
            isAuthenticatedDashboard: true,
          };
          const token = generateToken(data);
          res.status(SuccessStatusCode.CREATED).send({ token: token });
        } else {
          const error = HttpError.unauthorized(ErrorMessages.LoginMessage);
          next(error);
        }
      } else {
        const error = HttpError.unauthorized(ErrorMessages.LoginMessage);
        next(error);
      }
    } catch (error) {
      next(error);
    }
  });

router
  .route('/:id')
  .put(
    isAuthorized,
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id);
        const userPayload = { ...req.body } as Partial<IUser>;
        if (userPayload.password) {
          const encryptedPassword = await encrypt(userPayload.password, 12);
          userPayload.password = encryptedPassword;
        }

        const user = await Auth.findByPk(id);
        if (!user) {
          return next(HttpError.notFound(ErrorMessages.NoRecordFound));
        }

        await user.update(userPayload);
        res
          .status(SuccessStatusCode.OK)
          .send({ message: 'User updated successfully', user });
      } catch (error) {
        next(error);
      }
    },
  );

router
  .route('/:id')
  .delete(
    isAuthorized,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id);
        const user = await Auth.findByPk(id);

        if (!user) {
          return next(HttpError.notFound(ErrorMessages.NoRecordFound));
        }

        await user.destroy();
        res
          .status(SuccessStatusCode.OK)
          .send({ message: 'User deleted successfully' });
      } catch (error) {
        next(error);
      }
    },
  );

export { router as authController };
