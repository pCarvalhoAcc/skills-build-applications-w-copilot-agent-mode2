import { Router, Request, Response } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models';

const router = Router();

type Model = typeof User;

function resourceHandlers(model: Model) {
  return {
    list: async (_request: Request, response: Response) => {
      try {
        response.json(await model.find().sort({ createdAt: -1 }).lean());
      } catch (error) {
        response.status(500).json({ error: 'Unable to load resource', details: error instanceof Error ? error.message : error });
      }
    },
    create: async (request: Request, response: Response) => {
      try {
        const resource = await model.create(request.body);
        response.status(201).json(resource);
      } catch (error) {
        response.status(400).json({ error: 'Unable to create resource', details: error instanceof Error ? error.message : error });
      }
    },
  };
}

const resources = [
  ['/users', User],
  ['/teams', Team],
  ['/activities', Activity],
  ['/leaderboard', Leaderboard],
  ['/workouts', Workout],
] as const;

for (const [path, model] of resources) {
  const handlers = resourceHandlers(model);
  router.get(path, handlers.list);
  router.post(path, handlers.create);
}

export default router;