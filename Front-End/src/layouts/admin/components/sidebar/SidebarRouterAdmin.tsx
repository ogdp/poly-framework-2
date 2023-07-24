import {
  LaptopOutlined,
  MobileOutlined,
  MessageOutlined,
  UserOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const items: MenuProps["items"] = [
  getItem(
    <Link to="/admin">Dashboard</Link>,
    "/admin/dashboard",
    <HomeOutlined />
  ),
  getItem("Quản lý chung", "/admin/managers", <UnorderedListOutlined />, [
    getItem(
      <Link to="/admin/products">Quản lý sản phẩm</Link>,
      "products",
      <MobileOutlined />
    ),
    getItem(
      <Link to="/admin/categories">Quản lý danh mục</Link>,
      "categories",
      <LaptopOutlined />
    ),
    getItem(
      <Link to="/admin/comments">Quản lý Bình Luận</Link>,
      "comments",
      <MessageOutlined />
    ),
    getItem(
      <Link to="/admin/contacts">Quản lý liên hệ</Link>,
      "contact",
      <PhoneOutlined />
    ),
    getItem(
      <Link to="/admin/accounts">Quản lý người dùng</Link>,
      "accounts",
      <UserOutlined />
    ),
    getItem(
      <Link to="/admin/bill">Quản lý Đơn hàng</Link>,
      "bill",
      <ShoppingCartOutlined />
    ),
  ]),
  getItem("Sản phẩm", "Sản phẩm", <MobileOutlined />, [
    getItem(
      <Link to="/admin/products/add">Thêm sản phẩm</Link>,
      "/admin/products/add"
    ),
    getItem(
      <Link to="/admin/products">Danh sách sản phẩm</Link>,
      "/admin/products"
    ),
  ]),
  getItem("Danh mục", "Danh mục", <LaptopOutlined />, [
    getItem(
      <Link to="/admin/categories">Danh sách danh mục</Link>,
      "/admin/categories"
    ),
  ]),
  getItem("Bình Luận", "Bình Luận", <MessageOutlined />, [
    getItem(
      <Link to="/admin/comments">Danh sách Bình Luận</Link>,
      "/admin/comments"
    ),
  ]),
  getItem("Liên hệ", "Liên hệ", <PhoneOutlined />, [
    getItem(
      <Link to="/admin/contacts">Danh sách Liên hệ</Link>,
      "/admin/contacts"
    ),
  ]),
  getItem("Tài khoản", "Tài khoản", <UserOutlined />, [
    getItem(
      <Link to="/admin/accounts">Danh sách tài khoản</Link>,
      "/admin/accounts"
    ),
  ]),
  getItem("Đơn hàng", "Đơn hàng", <ShoppingCartOutlined />, [
    getItem(<Link to="/admin/bill">Danh sách Đơn hàng</Link>, "/admin/bill"),
  ]),
];
