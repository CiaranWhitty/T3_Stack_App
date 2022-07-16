import { newExampleRouter } from "./subroutes/example";
import { newAuthRouter } from "./subroutes/auth";
import { t } from "./trpc";

export const appRouter = t.router({
  example: newExampleRouter,
  auth: newAuthRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
