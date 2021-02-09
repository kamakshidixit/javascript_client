import { gql } from 'apollo-boost';

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(payload: {email: $email, password: $password})
  }
  `;

console.log('login user mutation', LOGIN_USER);
export {
  LOGIN_USER,
};
