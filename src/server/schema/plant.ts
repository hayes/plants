import builder from '../builder';
import { CreatePlantInput } from './input/create-plant';
import { UpdatePlantInput } from './input/update-plant';

const plantSelect = {
  id: true,
  commonName: true,
  latinName: true,
  acquiredAt: true,
  waterInstructions: true,
  lightInstructions: true,
  location: true,
  notes: {
    select: {
      id: true,
      note: true,
    },
  },
};

builder.createObjectType('Plant', {
  shape: t => ({
    id: t.exposeID('id'),
    commonName: t.exposeString('commonName'),
    latinName: t.exposeString('latinName'),
    waterInstructions: t.exposeString('waterInstructions'),
    lightInstructions: t.exposeString('lightInstructions'),
    acquiredAt: t.string({
      resolve: plant => plant.acquiredAt.toISOString(),
    }),
    location: t.exposeString('location'),
    notes: t.field({
      type: ['Note'],
      resolve: plant => plant.notes,
    }),
  }),
  extends: {
    Query: t => ({
      plants: t.field({
        type: ['Plant'],
        resolve: async (_, args, { prisma }) => {
          const plants = await prisma.plants.findMany({
            select: plantSelect,
          });

          return plants;
        },
      }),
    }),
    Mutation: t => ({
      createPlant: t.field({
        type: 'Plant',
        args: {
          plant: CreatePlantInput,
        },
        resolve: async (_, { plant }, { prisma }) => {
          const newPlant = await prisma.plants.create({
            data: {
              commonName: plant.commonName,
              latinName: plant.latinName,
              location: plant.location,
              waterInstructions: plant.waterInstructions,
              lightInstructions: plant.lightInstructions,
              acquiredAt: new Date(plant.acquiredAt),
              notes: {
                create: plant.notes?.map(note => ({ note })),
              },
            },
            select: plantSelect,
          });

          return newPlant;
        },
      }),
      updatePlant: t.field({
        type: 'Plant',
        args: {
          id: t.arg('ID', { required: true }),
          plant: UpdatePlantInput,
        },
        resolve: async (_, { id, plant }, { prisma }) => {
          const updatedPlant = await prisma.plants.update({
            where: {
              id: parseInt(id, 10),
            },
            data: {
              commonName: plant.commonName,
              latinName: plant.latinName,
              location: plant.location,
              waterInstructions: plant.waterInstructions,
              lightInstructions: plant.lightInstructions,
              acquiredAt: plant.acquiredAt ? new Date(plant.acquiredAt!) : undefined,
              notes: {
                create: plant.notes?.map(note => ({ note })),
              },
            },
            select: plantSelect,
          });

          return updatedPlant;
        },
      }),
      deletePlant: t.field({
        type: 'Plant',
        args: {
          id: t.arg.id({ required: true }),
        },
        resolve: async (_, { id }, { prisma }) => {
          const deletedPlant = await prisma.plants.delete({
            where: {
              id: parseInt(id, 10),
            },
            include: {
              notes: true,
            },
          });

          await prisma.notes.deleteMany({
            where: {
              id: {
                in: deletedPlant.notes.map(note => note.id),
              },
            },
          });

          return deletedPlant;
        },
      }),
    }),
  },
});
