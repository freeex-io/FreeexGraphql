import { gql } from 'apollo-server-express';

const testSchemas = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

export default testSchemas;
