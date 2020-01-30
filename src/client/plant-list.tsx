import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getPlants } from './operations.graphql';
import { GetPlantsQuery, GetPlantsQueryVariables } from './graphql';

export const PlantList = () => {
  const { loading, error, data } = useQuery<GetPlantsQuery, GetPlantsQueryVariables>(getPlants);

  if (loading) {
    return <span>loading...</span>;
  }

  if (error) {
    return <pre>{error.stack}</pre>;
  }

  return <pre>{JSON.stringify(data?.plants, null, 2)}</pre>;
};
