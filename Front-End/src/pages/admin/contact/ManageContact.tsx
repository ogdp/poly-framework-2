import { Table, Button, Empty, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { DeleteOutlined } from "@ant-design/icons"
import IContact from '../../../types/contact';
import { GetAllContact, RemoveContact } from '../../../services/contact';

const ManageContact = () => {
  const [contacts, setcontacts] = useState<IContact[]>([])
  useEffect(() => {
    GetAllContact().then(({ data }) => setcontacts(data))
  }, [])

  const HandleRemoveContact = async (_id: string) => {
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
            const response = await RemoveContact(_id);
            if (response) {
              message.success('xóa liên hệ thành công!', 3);
              const dataNew = contacts.filter((data) => data._id !== _id);
              setcontacts(dataNew);
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
      title: 'STT',
      dataIndex: 'index', 
      key: 'index+1'
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'THÀNH VIÊN',
      dataIndex: 'name',
      key: 'name'
    }, 
    {
      title: 'ĐỊA CHỈ',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'HỖ TRỢ',
      dataIndex: 'support',
      key: 'support'
    },
    {
      title: 'HÀNH ĐỘNG',
      render: (item: IContact) => <>
        {item.role === 'admin' ? <Button hidden>delete</Button> :
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => HandleRemoveContact(item._id)} ><DeleteOutlined /></button>
        }
      </>
    },
  ];

  const data = contacts.map((item: IContact, index: number) => {
    return {
      index: index,
      key: item._id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      address: item.address,
      support: item.support,
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

export default ManageContact