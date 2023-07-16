import { Table, Button, Empty, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import IComment from "../../../types/comment";
import { GetAllComment, RemoveComment } from "../../../services/comments";
import { formatDate } from "../../../utils/DateUtils";
import { GetOneUser } from "../../../services/user";

const ManageComment = () => {
  const [coments, setcoments] = useState<IComment[]>([]);
  useEffect(() => {
    GetAllComment().then(({ data }) => setcoments(data));
    GetOneUser("64a6cf1436f56828aa324a05").then(({ data }) =>
      console.log(data)
    );
  }, []);

  const HandleRemoveComment = async (_id: string) => {
    try {
      Modal.confirm({
        title: "Xác nhận",
        content: "Bạn có chắc chắn muốn xoá bình luận không ?",
        okText: "Xoá",
        cancelText: "Huỷ",
        okButtonProps: {
          className:
            "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded", // áp dụng lớp CSS
        },
        onOk: async () => {
          const loading = message.loading({
            content: "Loading...",
            duration: 0,
          });
          setTimeout(async () => {
            if (loading) {
              loading();
            }
            const response = await RemoveComment(_id);
            if (response) {
              message.success("Xoá bình luận thành công!", 3);
              const dataNew = coments.filter((data) => data._id !== _id);
              setcoments(dataNew);
            }
          }, 2000);
        },
        onCancel: () => {
          message.success("Huỷ thành công!");
        },
      });
    } catch (error: any) {
      message.error(error.response.data.message, 5);
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "SẢN PHẨM",
      dataIndex: "Product_id",
      key: "Product_id",
    },
    {
      title: "NGƯỜI DÙNG",
      dataIndex: "User_id",
      render: (t: any, r: any) => <span>{`${r.User_id}`}</span>,
    },
    {
      title: "NỘI DUNG",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "THỜI GIAN",
      dataIndex: "createdAt",
      render: (t: any, r: any) => <span>{`${formatDate(r.createdAt)}`}</span>,
    },
    {
      title: "Hành Động",
      render: (item: IComment) => (
        <>
          {item.role === "admin" ? (
            <Button hidden>delete</Button>
          ) : (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => HandleRemoveComment(item.key)}
            >
              <DeleteOutlined />
            </button>
          )}
        </>
      ),
    },
  ];

  const data = coments.map((item: IComment, index: number) => {
    return {
      index: index + 1,
      key: item._id,
      Product_id: item.Product_id,
      User_id: item.User_id,
      content: item.content,
      role: item.role,
      createdAt: item.createdAt,
    };
  });
  if (data.length == 0) return <Empty description={false} />;
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={{ pageSize: 4, showQuickJumper: true }}
      />
    </>
  );
};

export default ManageComment;
