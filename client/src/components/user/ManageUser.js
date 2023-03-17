import { Space, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../contexts/constants";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getAllUser() {
      const response = await axios.get(`${apiUrl}/auth/users`);
      const dataResponse = response.data.users;
      let data = [];
      data.push(dataResponse.find((u) => u.username === "admin123"));
      const dataTmp = response.data.users.filter(
        (x) => x.username !== "admin123"
      );
      console.log(data);

      data = data.concat(dataTmp).map((user, index) => ({
        ...user,
        key: index + 1,
        createdAt: user.createdAt.slice(0, 10),
      }));

      setUsers(data);
    }
    getAllUser();
  }, []);

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Role",
      dataIndex: "username",
      key: "username",
      render: (tag) =>
        tag === "admin123" ? (
          <Tag color={"red"} key={tag}>
            <h5 style={{ color: "red" }}>ADMIN</h5>
          </Tag>
        ) : (
          <Tag color={"blue"} key={tag}>
            <h5 style={{ color: "blue" }}>USER</h5>
          </Tag>
        ),
    },
  ];

  return (
    <div class="item-details-page">
      <div class="container" style={{ paddingTop: "1rem" }}>
        <Table
          columns={columns}
          dataSource={users}
          pagination={{ pageSize: 8 }}
        />
      </div>
    </div>
  );
};
export default ManageUser;
