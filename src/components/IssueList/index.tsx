import IssueItem from "../common/IssueItem";
import Advertisement from "./Advertisement";

function IssueList() {
  return (
    <ul>
      <IssueItem />
      <IssueItem />
      <Advertisement />
      <IssueItem />
      <IssueItem />
    </ul>
  );
}

export default IssueList;
