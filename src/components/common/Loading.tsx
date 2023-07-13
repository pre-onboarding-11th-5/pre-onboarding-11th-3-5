import { styled } from "styled-components";
import { IssueItemCard } from "./IssueItem";

const LoadingBox = styled(IssueItemCard)`
  padding-bottom: 120px;
`;

export default function Loading() {
  return <LoadingBox>Loading...</LoadingBox>;
}
