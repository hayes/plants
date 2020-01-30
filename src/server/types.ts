export type Plant = {
  id: number;
  commonName: string;
  latinName: string;
  acquiredAt: Date;
  waterInstructions: string;
  lightInstructions: string;
  location: string;
  notes: Note[];
};

export type Note = {
  id: number;
  note: string;
};
