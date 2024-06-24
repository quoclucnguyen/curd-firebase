import { useRead } from "@typesaurus/react/useRead";
import { useEffect, useState } from "react";
import ItemWithImage from "../../components/ItemWithImageDrag";
import { db } from "../../firebase";

const DashboardPage = () => {
  const [listDiv, setListDiv] = useState<React.ReactElement[]>([]);
  const [items] = useRead(db.items.all().on);

  useEffect(() => {
    setListDiv(
      items?.map((item, index) => <ItemWithImage item={item} key={index} />) ||
        []
    );
  }, [items]);

  return <div className="example-container">{listDiv.map((item) => item)}</div>;
};

export default DashboardPage;
