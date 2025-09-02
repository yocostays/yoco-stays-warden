import { useState } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import UserManagementTable from "./components/user-management-table/UserManagementTable";
import { Box } from "@mui/material";

const Index = () => {
  const [type, setType] = useState(null); // State to manage type
  const [tab, setTab] = useState(null);

  const onTypeChange = (newType) => {
    setType(newType?.type);
    setTab(newType?.tab);
  };

  return (
    <>
      <Box>
        <Dashboard onTypeChange={onTypeChange} />
        {/* Pass the current type to UserManagementTable for the API call */}
        <UserManagementTable
          type={type}
          tab={tab}
          onTypeChange={onTypeChange}
        />
      </Box>
    </>
  );
};

export default Index;
