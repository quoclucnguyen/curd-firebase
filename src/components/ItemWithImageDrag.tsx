import { getDownloadURL, ref } from "firebase/storage";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Typesaurus } from "typesaurus";
import { Item, storage } from "../firebase";
import { usezIndexStore } from "../hooks/store.hook";

export default function ItemWithImage(
  props: Readonly<{ item: Typesaurus.Doc<Item> }>
) {
  const { item } = props;

  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const { zIndex, increase } = usezIndexStore();

  const [currentZIndex, setCurrentZIndex] = useState(0);

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

  return (
    <motion.img
      style={{
        zIndex: currentZIndex,
        width: "100px",
      }}
      drag
      dragMomentum={false}
      whileTap={{ scale: 1.2 }}
      onTapStart={() => {
        setCurrentZIndex(zIndex + 1);
        increase(1);
      }}
      src={imageUrl}
      onDragEnd={async (e: PointerEvent) => {
        console.log(e.x);
        console.log(e.y);
        await item.update({
          x: e.x,
          y: e.y,
        });
      }}
      initial={{ x: item.data.x, y: item.data.y }}
    />
  );
}
