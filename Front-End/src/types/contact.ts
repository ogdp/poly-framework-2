interface IContact {
    _id: string;
    key: string;
    name: string,
    email: string,
    phone: number,
    address: string,
    support: string,
    role: "admin" | "member",
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null,
}
export default IContact