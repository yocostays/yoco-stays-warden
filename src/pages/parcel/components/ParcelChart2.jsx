import CustomChartBox from "../../../components/customComponents/CustomChartBox";
const data = [
  { label: "Food Items", value: 500 },
  { label: "E-commerce", value: 500 },
  { label: "Medicine", value: 500 },
  { label: "Other", value: 500 },
];
export default function ParcelChart2() {
  return (
    <>
      <CustomChartBox
        showReport
        showPieChartButton
        showTodayButton
        showPieChart3
        reportTitle={"Report"}
        data={data}
      />
    </>
  );
}
