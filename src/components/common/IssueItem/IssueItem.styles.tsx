import styled from "styled-components";

export const IssueItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #000;
`;

export const IssueItemLeftBox = styled.div`
  display: flex;
  gap: 8px;
  max-width: 80%;
`;

export const IssueItemTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
`;

export const IssueItemLargeText = styled.span`
  font-size: large;
`;

export const IssueItemSmallText = styled.span`
  font-size: small;
`;

export const IssueItemAvatar = styled.img`
  width: 50px;
  height: 50px;
`;
