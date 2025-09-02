import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userSlice from '../features/users/userSlice';
import menuPermissionReducer from '../features/auth/menuPermission';
import messSlice from '../features/mess/messSlice'
import studentReducer from '../features/student/studentSlice'
import maintenanceReducer from '../features/maintenance/maintenanceSlice'
import getLeaveManagementReducer from '../features/leave/leaveSlice';
import hostelReducer from "../features/hostel/hostelSlice"
import permissionReducer from "../features/permissionRoutes/permissionRoutesSlice"
import universityReducer from "../features/university/universitySlice";
import courseReducer from "../features/course/courseSlice";
import staffReducer from "../features/staff/staffSlice";
import categoryReducer from '@features/category/categorySlice';
import complaintReducer from "@features/complaints/complaintsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userSlice,
    menuPermission: menuPermissionReducer,
    mess: messSlice,
    student: studentReducer,
    maintenance: maintenanceReducer,
    leave: getLeaveManagementReducer,
    hostel: hostelReducer,
    permission: permissionReducer,
    university : universityReducer,
    course: courseReducer,
    staff: staffReducer,
    category: categoryReducer,
    complaint: complaintReducer
  },
});

export default store;
