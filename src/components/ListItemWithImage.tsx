import { Image, ImageViewer, List } from "antd-mobile";
import { getDownloadURL, ref } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import { Item, storage } from "../firebase";

export default function ListItemWIthImage(props: Readonly<{ item: Item }>) {
  const { item } = props;

  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [visible, setVisible] = useState(false);

  const getImageUrl = useCallback(async () => {
    if (!item.imageUrl) {
      return;
    }

    const url = await getDownloadURL(ref(storage, item.imageUrl));
    setImageUrl(url);
  }, [item.imageUrl]);

  useEffect(() => {
    getImageUrl();
  }, [getImageUrl]);

  return (
    <>
      <List.Item
        prefix={
          <Image
            width={40}
            height={40}
            src={imageUrl}
            onClick={() => setVisible(true)}
          />
        }
        description={item.itemTypeId}
      >
        {item.name}
      </List.Item>

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
