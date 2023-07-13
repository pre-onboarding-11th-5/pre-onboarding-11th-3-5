import IssueList from "../components/IssueList";
import IssueProvider from "../contexts/issueContext";

function ListPage() {
  return (
    <IssueProvider>
      <IssueList />
    </IssueProvider>
  );
}

export default ListPage;
