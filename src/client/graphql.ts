/* eslint-disable */
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type CreatePlantInput = {
  commonName: Scalars['String'],
  latinName: Scalars['String'],
  acquiredAt: Scalars['String'],
  waterInstructions: Scalars['String'],
  lightInstructions: Scalars['String'],
  location: Scalars['String'],
  notes?: Maybe<Array<Scalars['String']>>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createPlant: Plant,
  updatePlant: Plant,
};


export type MutationCreatePlantArgs = {
  plant?: Maybe<CreatePlantInput>
};


export type MutationUpdatePlantArgs = {
  id: Scalars['ID'],
  plant?: Maybe<UpdatePlantInput>
};

export type Note = {
   __typename?: 'Note',
  id: Scalars['ID'],
  note: Scalars['String'],
};

export type Plant = {
   __typename?: 'Plant',
  id: Scalars['ID'],
  commonName: Scalars['String'],
  latinName: Scalars['String'],
  waterInstructions: Scalars['String'],
  lightInstructions: Scalars['String'],
  acquiredAt: Scalars['String'],
  location: Scalars['String'],
  notes: Array<Note>,
};

export type Query = {
   __typename?: 'Query',
  plants: Array<Plant>,
};

export type UpdatePlantInput = {
  commonName?: Maybe<Scalars['String']>,
  latinName?: Maybe<Scalars['String']>,
  acquiredAt?: Maybe<Scalars['String']>,
  waterInstructions?: Maybe<Scalars['String']>,
  lightInstructions?: Maybe<Scalars['String']>,
  location?: Maybe<Scalars['String']>,
  notes?: Maybe<Array<Scalars['String']>>,
};

export type GetPlantsQueryVariables = {};


export type GetPlantsQuery = (
  { __typename?: 'Query' }
  & { plants: Array<(
    { __typename?: 'Plant' }
    & Pick<Plant, 'id' | 'commonName' | 'latinName' | 'location' | 'acquiredAt' | 'waterInstructions' | 'lightInstructions'>
    & { notes: Array<(
      { __typename?: 'Note' }
      & Pick<Note, 'id' | 'note'>
    )> }
  )> }
);

