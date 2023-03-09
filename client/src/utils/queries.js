import {
  gql
} from '@apollo/client';

export const GET_ME = gql`
  query user($username: String!) {
      user(username: $username) {
          _id
          username
          email
          password
          savedBooks {
              _id
              authors
              description
              image
              link
              title
          }
      }
  }
`