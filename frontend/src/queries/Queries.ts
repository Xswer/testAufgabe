import { gql } from 'apollo-boost';

export const DISTINCT_FIELD = gql`
  query($field: string, $title: string, $stadt: string, $plz: string) {
    distinct(field: $field, title: $title, stadt: $stadt, plz: $plz)
  }
`;

export const GET_AP = gql`
  query($title: string, $stadt: string, $plz: string) {
    firma(title: $title, stadt: $stadt, plz: $plz) {
      ap {
        vorname
        name
      }
    }
  }
`;
