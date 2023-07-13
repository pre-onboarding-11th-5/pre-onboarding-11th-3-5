import Content from "./Content";
import IssueItem from "../common/IssueItem";
import { useEffect, useState } from "react";
import { getAnIssue } from "../../apis/getIssueList";
import { useLocation } from "react-router-dom";
import { Issue } from "../../types/issue";
import Error from "../common/Error";

function IssueDetail() {
  const location = useLocation();
  const number = location.pathname.substring(1);
  const [data, setData] = useState<Issue>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAnIssue(Number(number));
        setData(data);
      } catch (error) {
        setError(error);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {error ? (
        <Error />
      ) : (
        <>
          <IssueItem isAvatar issue={data} />
          <Content issue={data} />
        </>
      )}
    </div>
  );
}

export default IssueDetail;
