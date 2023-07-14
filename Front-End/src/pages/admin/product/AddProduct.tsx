import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select, Space, Upload } from "antd";
import axios from "axios";
import {
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Option } from "antd/es/mentions";
type Props = {};

const AddProduct = (props: Props) => {
  const [imgg, setImgg] = useState("");
  const urls: string[] = [];
  const beforeUpload = async (files: File | null) => {
    // console.log(files);
    // if (!files) return;
    // const formData = new FormData();
    // formData.append("upload_preset", "publicImg");
    // formData.append("folder", "publicImg");
    // formData.append("file", files);
    // try {
    //   const response = await axios.post(
    //     "https://api.cloudinary.com/v1_1/dv1dxfek7/image/upload",
    //     formData,
    //     {
    //       headers: { "Content-Type": "application/form-data" },
    //     }
    //   );
    //   urls.push(response.data.url);
    // } catch (error) {
    //   console.error("Upload image failed.");
    // }
    return false;
  };
  const onFinish = async (values: any) => {
    console.log(values);
    const formData = new FormData();
    formData.append("files", values.images);
    console.log(formData);
    const ress = await axios.post(
      "http://localhost:8080/api/images/upload",
      formData
    );
    console.log(ress);

    return;
    console.log("Success:", values.images);
    try {
      const formData = new FormData();
      console.log(imgg);
      formData.append("files", imgg);
      console.log(formData);
      axios.post(`http://localhost:8080/api/images/upload`, {
        files: [{ imgg }],
      });

      // console.log(values.images.file);
      // const formData = new FormData();
      // formData.append("files", values.images.fileList);

      // console.log(formData);
      // axios.post(`http://localhost:8080/api/images/upload`, values.images, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      // useEffect(() => {
      //     GetAllProduct().then(({ data }) => {
      //       setProducts(data);
      //     });
      //   }, []);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const validatePrice = (_: any, value: number) => {
    if (value <= 0) {
      return Promise.reject(new Error("Không phải là số âm"));
    }
    return Promise.resolve();
  };
  const categories = [
    { _id: "123", name: "Không xác định" },
    { _id: "1232", name: "Quần thun" },
  ];
  return (
    <>
      <div>
        <h2 className="font-bold text-2xl mb-4">Thêm sản phẩm</h2>
      </div>
      <Form
        name="newProductForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên sản phẩm" },
            {
              min: 3,
              message: "Tối thiểu 3 ký tự",
            },
            {
              max: 128,
              message: "Tối đa 128 ký tự",
            },
            {
              validator: (_: any, value: string) =>
                value && value.trim() == ""
                  ? Promise.reject(
                      new Error("Tên sản phẩm không được bỏ trống")
                    )
                  : Promise.resolve(),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[
            { required: true, message: "Vui lòng nhập giá sản phẩm" },
            { validator: validatePrice },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Kích thước"
          name="sizes"
          rules={[{ required: true, message: "Vui lòng nhập kích thước" }]}
        >
          <Form.List name="sizes">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "size"]}
                      rules={[
                        {
                          required: true,
                          message: "Tên size không được bỏ trống",
                        },
                        {
                          validator: (_: any, value: string) =>
                            value && value.trim() == ""
                              ? Promise.reject(
                                  new Error("Tên size không được bỏ trống")
                                )
                              : Promise.resolve(),
                        },
                      ]}
                    >
                      <Input placeholder="Size" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "quantity"]}
                      rules={[
                        {
                          required: true,
                          message: "Số lượng là trường bắt buộc",
                        },
                        { validator: validatePrice },
                      ]}
                    >
                      <InputNumber placeholder="Số lượng" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item
          label="Danh mục"
          name="CategoryId"
          rules={[{ required: true, message: "Trường này là bắt buộc" }]}
        >
          <Select>
            {categories.map((category: any) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Ảnh sản phẩm"
          name="images"
          rules={[{ required: true, message: "Vui lòng chọn ảnh sản phẩm" }]}
        >
          <Upload accept="image/*" multiple beforeUpload={beforeUpload}>
            <Button icon={<UploadOutlined />} block>
              Chọn ảnh
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" className="bg-blue-500" htmlType="submit">
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProduct;
