const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID!
  username: String
  email: String
  # password: String #considered not best practice to add password not needed to send accross the network
  bookCount: Int
  savedBooks: [Book]
}

type Book {
  bookId: String
  authors: [String]
  description: String
  title: String
  image: String
  link: String

}

input saveBook {
  authors: [String]
  description: String
  title: String
  bookId: String
  link: String
  image: String
}

type Auth {
    token: ID!
    user: User
  }

type Query {
  me: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(input: saveBook!): User
  removeBook(bookId: ID!): User
}
`;

module.exports = typeDefs;
