interface IComment {
    _id?: any;
    key?: string | any
    content: string,
    Product: string;
    Product_id?: string,
    name: string,
    User_id: string,
    role: "admin" | "member",
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null,
}
export default IComment 