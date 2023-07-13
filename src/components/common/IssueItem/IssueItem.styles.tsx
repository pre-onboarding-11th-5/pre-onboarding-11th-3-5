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
  max-width: 50px;
  max-height: 50px;
  min-height: 50px;
  min-width: 50px;
`;
