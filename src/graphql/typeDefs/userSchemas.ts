import { gql } from 'apollo-server-express';

const userSchemas = gql`
  type Query {
    user(id: Int): User
    users: [User]
    emailConfirm(email: String): Boolean
  }

  type Mutation {
    singupEmail(email: String, agree: Int): User
    signupPhone(id: Int, country: String, phone: Int): User
    signupPincode(id: Int, pincode: Int): User
    login(email: String, pincode: Int): User
  }

  type User {
    id: Int
    email: String
    country: String
    phone: Int
  }
`;

export default userSchemas;
