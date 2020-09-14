import { gql } from '@apollo/client';

export const DISTINCT_FIELD = gql`
  query getDistinct(
    $field: String!
    $title: String
    $stadt: String
    $plz: String
  ) {
    distinct(field: $field, title: $title, stadt: $stadt, plz: $plz)
  }
`;

export const GET_AP = gql`
  query getAp($title: String!, $stadt: String!, $plz: String!) {
    firma(title: $title, stadt: $stadt, plz: $plz) {
      ap {
        vorname
        nachname
      }
    }
  }
`;
