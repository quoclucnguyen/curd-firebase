import { Image, ImageViewer, List, SwipeAction } from "antd-mobile";
import { getDownloadURL, ref } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import { Typesaurus } from "typesaurus";
import { Item, db, storage } from "../firebase";

export default function ListItemWIthImage(
  props: Readonly<{ item: Typesaurus.Doc<Item> }>
) {
  const { item } = props;

  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [visible, setVisible] = useState(false);

  const getImageUrl = useCallback(async () => {
    if (!item.data.imageUrl) {
      return;
    }

    const url = await getDownloadURL(ref(storage, item.data.imageUrl));
    setImageUrl(url);
  }, [item.data.imageUrl]);

  useEffect(() => {
    getImageUrl();
  }, [getImageUrl]);

  const actionDeleteClick = useCallback(() => {
    console.log(item);
    db.items.remove(item.ref.id);
  }, [item]);

  return (
    <>
      <SwipeAction
        rightActions={[
          {
            key: "delete",
            text: "Delete",
            color: "danger",
            onClick: actionDeleteClick,
          },
        ]}
      >
        <List.Item
          prefix={
            <Image
              width={40}
              height={40}
              src={imageUrl}
              onClick={() => setVisible(true)}
            />
          }
          description={item.data.itemTypeId}
        >
          {item.data.name}
        </List.Item>
      </SwipeAction>

      {imageUrl && (
        <ImageViewer
          classNames={{
            mask: "customize-mask",
            body: "customize-body",
          }}
          image={imageUrl}
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
        />
      )}
    </>
  );
}
