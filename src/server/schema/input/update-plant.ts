import builder from '../../builder';

export const UpdatePlantInput = builder.createInputType('UpdatePlantInput', {
  shape: t => ({
    commonName: t.string({ required: false }),
    latinName: t.string({ required: false }),
    acquiredAt: t.string({ required: false }),
    waterInstructions: t.string({ required: false }),
    lightInstructions: t.string({ required: false }),
    location: t.string({ required: false }),
    notes: t.stringList({ required: false }),
  }),
});
