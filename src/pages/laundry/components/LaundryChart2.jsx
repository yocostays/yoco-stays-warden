import CustomChartBox from "../../../components/customComponents/CustomChartBox";
const data = [
  { label: "Total Given", value: 500 },
  { label: "Laundry/Month", value: 500 },
  { label: "Laundry/Quaterly", value: 500 },
  { label: "Laundry/Year", value: 500 },
];
export default function LaundryChart2() {
  return (
    <>
      <CustomChartBox
        showReport
        showPieChartButton
        showTodayButton
        showDownload
        showPieChart2
        reportTitle={"Laundry"}
        data={data}
      />
    </>
  );
}
