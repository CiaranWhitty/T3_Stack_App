import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../utils/protected-procedure";
import { t } from "../trpc";

export const newExampleRouter = t.router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const examples = await ctx.prisma.example.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: { id: "desc" },
    });

    return examples;
  }),

  getByName: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const example = await ctx.prisma.example.findFirst({
        where: { name: input.name },
      });

      if (!example || example.userId !== ctx.session.user.id) {
        throw new TRPCError({
          message: "NOT YOUR EXAMPLE",
          code: "UNAUTHORIZED",
        });
      }
      return example;
    }),

  submit: t.procedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string().min(0).max(20),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const example = await ctx.prisma.example.create({
        data: {
          userId: input.userId,
          name: input.name,
        },
      });

      return example;
    }),

  edit: t.procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.example.update({
        where: { id: input.id },
        data: {
          name: input.name,
        },
      });
    }),

  remove: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.example.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
