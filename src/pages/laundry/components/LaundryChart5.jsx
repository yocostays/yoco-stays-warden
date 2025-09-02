import CustomChartBox from "../../../components/customComponents/CustomChartBox";
const data = [
  { label: "Total Requests", value: 500 },
  { label: "Cloth Received", value: 300 },
  { label: "In Progress", value: 100 },
  { label: "Ready for Delivery", value: 100 },
];
export default function LaundryChart5() {
  return (
    <>
      <CustomChartBox
        showReport       
        showPieChart3
        reportTitle={"Cloth Progress"}
        data={data}
      />
    </>
  );
}
