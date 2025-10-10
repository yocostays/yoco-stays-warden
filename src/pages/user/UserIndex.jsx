import { Avatar, Box, Button, IconButton, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import UserCard from "./UserCard";
import UserTable from "./UserTable";
import Table from "@components/table/Table";
import { useMemo, useState } from "react";
import moment from "moment";
import Edit from "@assets/images/edit_square.svg";
import { exportUserReportAsync, getUsers, setStaffSelection, setSelectedTab, setSelectedAcademicOption, setSearch, setSortUserFilter, setStudentPagination } from "@features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getStaffAsync } from "@features/staff/staffService";
import {
  StaffSelection,
  StaffStatusEnum,
  StudentStatusEnum,
} from "@components/enums/usersListEnums";
import PersonIcon from '@mui/icons-material/Person';
import studentGray from "../../assets/images/studentGray.svg"
import studentBlue from "../../assets/images/studentBlue.svg"
import adminGray from "../../assets/images/adminGray.svg"
import adminBlue from "../../assets/images/adminBlue.svg"
import theme from "@theme/Theme";
import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";


export default function UserIndex() {
 
  return (
    <Box
      sx={{
        width: { md: `calc(100% - 270px)` },
        ml: { md: "270px", sm: 0 },
        // marginBottom: "30px",
      }}
    >
      <UserCard />
      <UserTable />
    </Box>
  );
}
