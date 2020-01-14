import gql from 'graphql-tag';

const JOBS_QUERY = gql`
  query Jobs {
    team(id: "pruvit") {
      name
      createdBy {
        firstname
        lastname
      }
      joinDate
      defaultTCs
      defaultMCs
      branding
    }
  }
`;

export default JOBS_QUERY;