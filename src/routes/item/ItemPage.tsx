import { useRead } from "@typesaurus/react/useRead";
import {
  Button,
  FloatingBubble,
  Form,
  ImageUploader,
  ImageUploadItem,
  Input,
  List,
  Popup,
  Selector,
  Toast,
} from "antd-mobile";
import { AddCircleOutline } from "antd-mobile-icons";
import dayjs from "dayjs";
import { ref, uploadBytes } from "firebase/storage";
import { useCallback, useMemo, useState } from "react";
import ListItemWIthImage from "../../components/ListItemWithImage";
import { db, storage } from "../../firebase";

const ItemPage = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);
  const [imageUploadFile, setImageUploadFile] = useState<File | undefined>();

  const [items] = useRead(db.items.all().on);

  const onPopupClose = useCallback(() => {
    setVisible(false);
    form.resetFields();
    setImageUploadFile(undefined);
  }, [form]);

  const onFinish = useCallback(
    async (values: { name: string; itemTypeId: string }) => {
      if (!imageUploadFile) {
        return;
      }

      const currentDate = dayjs();
      const fileName = currentDate.format("HHmmss") + ".jpg";
      const imagePath = `images/${currentDate.format(
        "YYYY/MM/DD"
      )}/${fileName}`;
      const imageRef = ref(storage, imagePath);
      await uploadBytes(imageRef, imageUploadFile as Blob);

      await db.items.add({
        name: values.name,
        itemTypeId: values.itemTypeId,
        imageUrl: imagePath,
      });

      Toast.show({
        content: `Item "${values.name}" added successfully 🎉`,
        icon: "success",
      });

      onPopupClose();
    },
    [imageUploadFile, onPopupClose]
  );

  const itemList = useMemo(
    () =>
      items?.map((item, index) => (
        <ListItemWIthImage item={item} key={index} />
      )),
    [items]
  );

  return (
    <>
      <List header="Items" className="w-full">
        {(itemList?.length ?? 0) > 0 ? (
          itemList
        ) : (
          <List.Item>No items found</List.Item>
        )}
      </List>
      <Popup
        visible={visible}
        onMaskClick={onPopupClose}
        onClose={onPopupClose}
        position="bottom"
      >
        <Form
          initialValues={{ itemTypeId: ["1"], name: "222" }}
          onFinish={onFinish}
          form={form}
          layout="vertical"
          footer={
            <Button block type="submit" color="primary" size="large">
              Save
            </Button>
          }
        >
          <Form.Header>Add Item</Form.Header>

          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Name of item" />
          </Form.Item>

          <Form.Item
            name="itemTypeId"
            label="Item Type"
            rules={[{ required: true }]}
          >
            <Selector
              options={[
                {
                  label: "Type 1",
                  value: "1",
                },
                {
                  label: "Type 2",
                  value: "2",
                },
              ]}
            />
          </Form.Item>

          <Form.Item name={"imageFile"} rules={[{ required: true }]}>
            <ImageUploader
              value={fileList}
              onChange={setFileList}
              upload={async (file: File) => {
                setImageUploadFile(file);
                return {
                  url: URL.createObjectURL(file),
                };
              }}
              maxCount={1}
            />
          </Form.Item>
        </Form>
      </Popup>

      <FloatingBubble
        style={{
          "--initial-position-bottom": "100px",
          "--initial-position-right": "24px",
          "--edge-distance": "24px",
        }}
        onClick={() => {
          setVisible(true);
        }}
      >
        <AddCircleOutline fontSize={32} />
      </FloatingBubble>
    </>
  );
};

export default ItemPage;
