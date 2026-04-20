import { useQuery } from "urql";

const FreelanceQuery = `
  query ($tokenUser: String!) {
    freelancePublicData(tokenUser: $tokenUser) {
      tokenUser
      email
      name
      lastName
      pIva
    }
  }
`;

export function useFreelancePublicData(tokenUser: string) {
  const [result] = useQuery({
    query: FreelanceQuery,
    variables: { tokenUser },
    pause: !tokenUser, // evita query inutili
  });

  return result;
}
