import { gql } from "@apollo/client";

export const GET_USER_LIST = gql`query getAllusers {
    allUsers {
    name
    age
    gender
    phone
    id
    }
}`