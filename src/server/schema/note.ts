import builder from '../builder';

builder.createObjectType('Note', {
  shape: t => ({
    id: t.exposeID('id'),
    note: t.exposeString('note'),
  }),
  extends: {
    Mutation: t => ({
      createNote: t.field({
        type: 'Note',
        args: {
          plantId: t.arg.id({ required: true }),
          note: t.arg.string({ required: true }),
        },
        resolve: (parent, args, { prisma }) => {
          return prisma.notes.create({
            data: {
              note: args.note,
              plant: {
                connect: {
                  id: parseInt(args.plantId, 10),
                },
              },
            },
            select: {
              id: true,
              note: true,
            },
          });
        },
      }),
      deleteNote: t.field({
        type: 'Note',
        args: {
          id: t.arg.id({ required: true }),
        },
        resolve: (parent, args, { prisma }) => {
          return prisma.notes.delete({
            where: {
              id: parseInt(args.id, 10),
            },
            select: {
              id: true,
              note: true,
            },
          });
        },
      }),
    }),
  },
});
