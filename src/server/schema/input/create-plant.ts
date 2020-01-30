import builder from '../../builder';

export const CreatePlantInput = builder.createInputType('CreatePlantInput', {
  shape: t => ({
    commonName: t.string({ required: true }),
    latinName: t.string({ required: true }),
    acquiredAt: t.string({ required: true }),
    waterInstructions: t.string({ required: true }),
    lightInstructions: t.string({ required: true }),
    location: t.string({ required: true }),
    notes: t.stringList({ required: false }),
  }),
});
