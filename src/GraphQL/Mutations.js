import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation createUser ($name: String!, $age: Int!, $gender: String!, $phone: String!) {
    createUser (name: $name, age: $age, gender: $gender, phone: $phone) {
      name
      gender
      age
      phone
    }
}
`

export const UPDATE_USER = gql`
mutation updateUser ($id: ID!, $name: String!, $age: Int!, $gender: String!, $phone: String!) {
    updateUser (id: $id, name: $name, age: $age, gender: $gender, phone: $phone) {
      name
      phone
      gender
      age
    }
}
`