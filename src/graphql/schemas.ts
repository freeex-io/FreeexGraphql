import { gql } from 'apollo-server-express';

const schemas = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

export default schemas;
