type TProps = {
  data: any;
};
const ClientPageBill = (data: TProps) => {
  console.log("Gọi con :: ", data);
  return <div>ClientPageBill</div>;
};

export default ClientPageBill;
