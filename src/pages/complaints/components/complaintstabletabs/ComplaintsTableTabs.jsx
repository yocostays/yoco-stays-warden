import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Menu, MenuItem, Toolbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { downloadCSV } from "@utils/downloadCSV";
import { toast } from "react-toastify";
import IosShareIcon from "@mui/icons-material/IosShare";
import { complaintsEnums } from "@components/enums/complaintsEnums";
import ComplaintsTableHead from "../table/ComplaintsTableHead";
import { exportComplaintReportAsync } from "@features/complaints/complaintsSlice";

export default function ComplaintsTableTabs() {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(complaintsEnums[0]?.value || "");
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [isSelectedAll, setIsSelectedAll] = React.useState(false);
  const [exportAnchorEl, setExportAnchorEl] = React.useState(null);
  const [filterValues, setFilterValues] = React.useState({
    type: "",
    status: "",
    categoryId: "",
    sort: "",
    startDate: "",
    endDate: "",
    search: "",
    floorNumber: "",
    roomNumber: "",
    compaintIds: [""],
  });
  const openExport = Boolean(exportAnchorEl);


  const onExportExcel = async () => {
    try {
      let payload = {
        type: isSelectedAll ? "all" : "individual",
        status: value,
        categoryId: filterValues.categoryId || "",
        sort: filterValues.sort || "",
        startDate: filterValues.startDate || "",
        endDate: filterValues.endDate || "",
        search: filterValues.search || "",
        floorNumber: filterValues.floorNumber || "",
        roomNumber: filterValues.roomNumber || "",
      };
  
      // Only add compaintIds if type is "individual"
      if (!isSelectedAll) {
        payload.compaintIds = selectedRows.length > 0 ? selectedRows : [""];
      }
  
  
      // Dispatch the export action with the correct payload
      const response = await dispatch(exportComplaintReportAsync(payload));
  
      if (response?.payload) {
        const data = response.payload;
        if (data) {
          downloadCSV(data, "Complaint_Report");
          toast.success("File Exported Successfully.");
          setIsSelectedAll(false);
          setSelectedRows([]);
        }
      } else {
        console.error("Failed to export data:", response?.payload?.message);
      }
    } catch (error) {
      console.error("Error exporting data:", error);
    }
    finally{
      setIsSelectedAll(false);
      setSelectedRows([]);
    }
  };
  
  const handleExportOpen = (event) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null); // Closes the menu
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFilterValues({...filterValues, status : newValue});
  };

  React.useEffect(() => {
    setFilterValues((prev) => ({ ...prev, status: value }));
  }, [value]);
  

  return (
    <Box
      sx={{
        // boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: "100%",
      }}
    >
      <Box>
        <TabContext value={value}>
          <Box>
            <Box
              sx={{
                borderColor: "divider",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pt: 1,
                marginBottom: "-8px",
                "& .MuiTabs-indicator": {
                  backgroundColor: "#674D9F", // Custom color (optional)
                  height: "6px", // Make underline bolder
                  borderRadius: "2px", // Slight rounding for better look
                },
              }}
            >
              <Toolbar />
              <TabList
                variant="scrollable"
                scrollButtons="auto"
                onChange={handleChange}
                sx={{ width: "100%" }}
                aria-label="lab API tabs example"
              >
                {complaintsEnums.map((tab) => (
                  <Tab
                    key={tab.value}
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#ACB5BD",
                    }}
                    label={tab.label}
                    value={tab.value}
                  />
                ))}
              </TabList>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {/* Center: Export dropdown */}
                <Button
                  variant="outlined"
                  onClick={handleExportOpen}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: "bold",
                    border: "1px solid #674D9F",
                    mr: 5,
                  }}
                  endIcon={<IosShareIcon style={{ color: "#674D9F" }} />}
                >
                  Export
                </Button>
                <Menu
                  anchorEl={exportAnchorEl}
                  open={Boolean(openExport)}
                  onClose={handleExportClose}
                >
                  <MenuItem
                    disabled={!isSelectedAll}
                    onClick={() => onExportExcel()}
                  >
                    All Export
                  </MenuItem>
                  <MenuItem
                    disabled={!selectedRows?.length}
                    onClick={() => onExportExcel()}
                  >
                    Export ({selectedRows?.length})
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            <TabPanel value={value} sx={{ mt: 0, pt: 0, }}>
              <ComplaintsTableHead
                selectedTab={value}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                isSelectedAll={isSelectedAll}
                setIsSelectedAll={setIsSelectedAll}
                setFilterValues={setFilterValues}
                filterValues={filterValues}
              />
              {/* <ComplaintsTableContainer selectedTab={value} /> */}
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
}
