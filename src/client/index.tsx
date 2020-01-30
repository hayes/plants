import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { PlantList } from './plant-list';

const client = new ApolloClient({
  uri: '/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <Button variant="contained" color="primary">
      Hello World
    </Button>
    <PlantList />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.querySelector('#app'));
