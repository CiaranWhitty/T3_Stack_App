import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../utils/protected-procedure";
import { t } from "../trpc";

export const newAuthRouter = t.router({
  getSession: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session;
  }),
});
