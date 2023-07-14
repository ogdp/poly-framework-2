import { Table, Button, Empty, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { DeleteOutlined } from "@ant-design/icons"
import IComment from '../../../types/comment';
import { GetAllComment, RemoveComment } from '../../../services/comments';

const ManageComment = () => {
  const [coments, setcoments] = useState<IComment[]>([])
  useEffect(() => {
    GetAllComment().then(({ data }) => setcoments(data))
  }, [])

  const HandleRemoveComment = async (_id: string) => {
    try {
      Modal.confirm({
        title: 'Confirm',
        content: 'Are you sure you want to delete this about?',
        okText: 'Yes',
        cancelText: 'No',
        okButtonProps: {
          className: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" // áp dụng lớp CSS
        },
        onOk: async () => {
          const loading = message.loading({ content: 'Loading...', duration: 0 });
          setTimeout(async () => {
            if (loading) {
              loading();
            }
            const response = await RemoveComment(_id);
            if (response) {
              message.success('xóa bình luận thành công!', 3);
              const dataNew = coments.filter((data) => data._id !== _id);
              setcoments(dataNew);
            }
          }, 2000);
        },
        onCancel: () => {
          message.success('Canceled!');
        },
      });
    } catch (error: any) {
      message.error(error.response.data.message, 5);
    }
  };
  const columns = [
    {
      title: 'stt',
      dataIndex: 'index',
      key: 'index'
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'Product_id',
      key: 'Product_id'
    },
    {
      title: 'Người dùng',
      dataIndex: 'User_id',
      key: 'User_id'
    }, 
    {
      title: 'bình luận',
      dataIndex: 'content',
      key: 'content'
    },
    {
      title: 'Thời gian',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'Hành Động',
      render: (item: IComment) => <>
        {item.role === 'admin' ? <Button hidden>delete</Button> :
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => HandleRemoveComment(item._id)} ><DeleteOutlined /></button>
        }
      </>
    },
  ];

  const data = coments.map((item: IComment, index: number) => {
    return {
      index: index,
      key: item._id,
      Product_id: item.Product_id,
      User_id: item.User_id,
      content:item.content,
      role: item.role,
      createdAt: item.createdAt,
    }
  })
  if (data.length == 0)
    return (
      <Empty description={false} />
    )
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={{ pageSize: 4, showQuickJumper: true }}
      />
    </>
  )
}

export default ManageComment