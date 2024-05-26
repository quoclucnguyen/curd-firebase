import { Button, Form, Input, List, Popup, Selector, Toast } from "antd-mobile";
import { useCallback, useEffect, useState } from "react";
import { db, Item } from "./firebase";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [items, setItems] = useState<Item[]>([]);

  const onFinish = useCallback(
    (values: { name: string; itemTypeId: string }) => {
      db.items
        .add({
          name: values.name,
          itemTypeId: values.itemTypeId,
        })
        .then(() => {
          setVisible(false);
          Toast.show({
            content: `Item "${values.name}" added successfully 🎉`,
            icon: "success",
          });
        });
    },
    []
  );

  const getItems = useCallback(() => {
    db.items.all().then((items) => {
      setItems(items.map((item) => item.data));
    });
  }, []);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <>
      <List header="Items">
        {items.map((item, index) => {
          return <List.Item key={index}>{item.name}</List.Item>;
        })}
        {items.length === 0 && <List.Item>No items found</List.Item>}
      </List>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        onClose={() => {
          setVisible(false);
        }}
        position="bottom"
      >
        <Form
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
              defaultValue={["1"]}
            />
          </Form.Item>
        </Form>
      </Popup>
    </>
  );
};

export default App;
