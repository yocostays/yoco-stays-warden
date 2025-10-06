// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import UserManagementIndex from "./pages/user-management/UserManagementIndex";
import Details from "./pages/user-management/components/user-management-table/details/Details";
import ResidentIndex from "./pages/user-management/components/new-resident/ResidentIndex";
import RoomsBedIndex from "./pages/rooms-and-bed/RoomsBedIndex";
import RoomAndBedDetails from "./pages/rooms-and-bed/components/RoomAndBedDetails";
import RoomChangeRequestDetails from "./pages/rooms-and-bed/components/RoomChangeRequestDetails";
import AttendanceIndex from "./pages/attendance/AttendanceIndex";
import AttendanceDetails from "./pages/attendance/components/AttendanceDetails";
import LeaveIndex from "./pages/leave/LeaveIndex";
import LeaveDetails from "./pages/leave/components/LeaveDetails";
import { FeeIndex } from "./pages/fee/FeeIndex";
import FeeDetails from "./pages/fee/components/FeeDetails";
import MaintenanceIndex from "./pages/maintenance/MaintenanceIndex";
import MaintenanceDetails from "./pages/maintenance/components/MaintenanceDetails";
import VisitorsIndex from "./pages/visitors/VisitorsIndex";
import VisitorsDetails from "./pages/visitors/components/VisitorsDetails";
import MessIndex from "./pages/mess/MessIndex";
import MessDetailsIndex from "./pages/mess-details/MessDetailsIndex";
import MessManagementIndex from "./pages/mess/mess-management/MessManagementIndex";
import MessManagementAddMenu from "./pages/newmessmanagement/components/MessManagementAddMenu";
import LikeDislike from "./pages/mess/liked-and-disliked/LikeDislike";
import EventIndex from "./pages/event/EventIndex";
import EventForm from "./pages/event/components/EventForm";
import LaundryIndex from "./pages/laundry/LaundryIndex";
import InventoryIndex from "./pages/inventory/InventoryIndex";
import PollIndex from "./pages/poll/PollIndex";
import ParcelIndex from "./pages/parcel/ParcelIndex";
import ParcelForm from "./pages/parcel/components/ParcelForm";
import InventoryDetails from "./pages/inventory/components/InventoryDetails";
import ManageDetails from "./pages/inventory/components/ManageDetails";
import EmergencyIndex from "./pages/emergency/EmergencyIndex";
import EmergencyDetails from "./pages/emergency/components/EmergencyDetails";
import LoginIndex from "./pages/logIn/LoginIndex";
import VehicleIndex from "./pages/vehicle-pass/VehicleIndex";
import VehicleDetails from "./pages/vehicle-pass/components/VehicleDetails";
import VehiclePassQRcode from "./pages/vehicle-pass/components/VehiclePassQRcode";
import FeedBackIndex from "./pages/feedbacks/FeedBackIndex";
import FeedBackDetails from "./pages/feedbacks/components/FeedBackDetails";
import PollDetails from "./pages/poll/Components/PollDetails";
import LaundryDetails from "./pages/laundry/components/LaundryDetails";
import AuthGuard from "./utils/AuthGuard";
import ForgotPassword from "./pages/logIn/ForgotPassword";
import NoPermission from "./pages/noPermission/NoPermission";
import Page404 from "./pages/404";
import ChartTest from "./pages/ChartTest/ChartTest";
import UserIndex from "@pages/user/UserIndex";
import UserDetails from "@pages/user/UserDetails";
import StaffIndex from "@pages/user/components/create-staff/staffIndex";
import StudentIndex from "@pages/user/components/create-student/studentIndex";
import NewMessManagementIndex from "@pages/newmessmanagement/NewMessManagementIndex";
import StudentDetails from "@pages/user/StudentDetails";
import MessManagementAddWastage from "@pages/newmessmanagement/components/MessManagementAddWastage";
import AddMissedBookingPage from "@pages/newmessmanagement/components/missedBooking/AddMissedBookingPage";
import Complaints from "@pages/complaints/components/Complaints";

function App() {
  const location = useLocation();
  const noLayoutRoutes = ["/", "/forgot-password", "/page-not-found"]; // Add other routes if needed

  // Required later for environment checkup
  // console.log('Current Environment:', import.meta.env.MODE);
  // console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);

  const RemoveTrailingSlash = () => {
    const location = useLocation();
    const { pathname, search } = location;

    if (pathname !== '/' && pathname.endsWith('/')) {
      const newPath = pathname.replace(/\/+$/, '');
      return <Navigate to={`${newPath}${search}`} replace />;
    }

    return null;
  };

  const LoginPrivate = ({ children }) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      return <Navigate to="/user" replace />;
    }
    return children;
  }

  return (
    <>
      <RemoveTrailingSlash />
      {!noLayoutRoutes.includes(location.pathname) && (
        <Layout>
          <Routes>
            <Route
              path="no-permission"
              element={
                <AuthGuard>
                  <NoPermission />
                </AuthGuard>
              }
            />
            <Route
              path="user-management"
              element={
                <AuthGuard>
                  <UserManagementIndex />
                </AuthGuard>
              }
            />
            <Route
              path="user-management/details/:userId"
              element={
                <AuthGuard>
                  <Details />
                </AuthGuard>
              }
            />
            <Route
              path="user-management/new-resident"
              element={
                <AuthGuard>
                  <ResidentIndex />
                </AuthGuard>
              }
            />
            <Route
              path="user-management/edit-staff/:userId/"
              element={
                <AuthGuard>
                  <ResidentIndex />
                </AuthGuard>
              }
            />
            <Route
              path="rooms-and-bed"
              element={
                <AuthGuard>
                  <RoomsBedIndex />
                </AuthGuard>
              }
            />
            <Route
              path="rooms-and-bed/details"
              element={
                <AuthGuard>
                  <RoomAndBedDetails />
                </AuthGuard>
              }
            />
            <Route
              path="rooms-and-bed/room-change-request"
              element={
                <AuthGuard>
                  <RoomChangeRequestDetails />
                </AuthGuard>
              }
            />
            <Route
              path="attendance"
              element={
                <AuthGuard>
                  <AttendanceIndex />
                </AuthGuard>
              }
            />
            <Route
              path="attendance/details"
              element={
                <AuthGuard>
                  <AttendanceDetails />
                </AuthGuard>
              }
            />
            <Route
              path="leave"
              element={
                <AuthGuard>
                  <LeaveIndex />
                </AuthGuard>
              }
            />
            <Route
              path="leave/details"
              element={
                <AuthGuard>
                  <LeaveDetails />
                </AuthGuard>
              }
            />
            <Route
              path="fees"
              element={
                <AuthGuard>
                  <FeeIndex />
                </AuthGuard>
              }
            />
            <Route
              path="fees/details"
              element={
                <AuthGuard>
                  <FeeDetails />
                </AuthGuard>
              }
            />
            <Route
              path="maintenance"
              element={
                <AuthGuard>
                  <MaintenanceIndex />
                </AuthGuard>
              }
            />
            <Route
              path="maintenance/details/:id"
              element={
                <AuthGuard>
                  <MaintenanceDetails />
                </AuthGuard>
              }
            />
            <Route
              path="mess"
              element={
                <AuthGuard>
                  <MessIndex />
                </AuthGuard>
              }
            />
            <Route
              path="mess/details"
              element={
                <AuthGuard>
                  <MessDetailsIndex />
                </AuthGuard>
              }
            />
            <Route
              path="mess/details/:id"
              element={
                <AuthGuard>
                  <MessDetailsIndex />
                </AuthGuard>
              }
            />
            <Route
              path="mess/mess-management/:userId"
              element={
                <AuthGuard>
                  <MessManagementIndex />
                </AuthGuard>
              }
            />
            <Route
              path="mess/like-dislike"
              element={
                <AuthGuard>
                  <LikeDislike />
                </AuthGuard>
              }
            />
            <Route
              path="newmessmanagement"
              element={
                <AuthGuard>
                  <NewMessManagementIndex />
                </AuthGuard>
              }
            />
            <Route
              path="newmessmanagement/addmenu"
              element={
                <AuthGuard>
                  <MessManagementAddMenu />
                </AuthGuard>
              }
            />
            <Route
              path="newmessmanagement/addWastage"
              element={
                <AuthGuard>
                  <MessManagementAddWastage />
                </AuthGuard>
              }
            />
            <Route
              path="newmessmanagement/addmissedbooking"
              element={
                <AuthGuard>
                  <AddMissedBookingPage />
                </AuthGuard>
              }
            />
            <Route
              path="visitors"
              element={
                <AuthGuard>
                  <VisitorsIndex />
                </AuthGuard>
              }
            />
            <Route
              path="visitors/details"
              element={
                <AuthGuard>
                  <VisitorsDetails />
                </AuthGuard>
              }
            />
            <Route
              path="poll"
              element={
                <AuthGuard>
                  <PollIndex />
                </AuthGuard>
              }
            />
            <Route
              path="inventory"
              element={
                <AuthGuard>
                  <InventoryIndex />
                </AuthGuard>
              }
            />
            <Route
              path="inventory/details"
              element={
                <AuthGuard>
                  <InventoryDetails />
                </AuthGuard>
              }
            />
            <Route
              path="inventory/manage-details"
              element={
                <AuthGuard>
                  <ManageDetails />
                </AuthGuard>
              }
            />
            <Route
              path="parcel"
              element={
                <AuthGuard>
                  <ParcelIndex />
                </AuthGuard>
              }
            />
            <Route
              path="parcel/form"
              element={
                <AuthGuard>
                  <ParcelForm />
                </AuthGuard>
              }
            />
            <Route
              path="feedbacks"
              element={
                <AuthGuard>
                  <FeedBackIndex />
                </AuthGuard>
              }
            />
            <Route
              path="feedbacks/details"
              element={
                <AuthGuard>
                  <FeedBackDetails />
                </AuthGuard>
              }
            />
            <Route
              path="emergency"
              element={
                <AuthGuard>
                  <EmergencyIndex />
                </AuthGuard>
              }
            />
            <Route
              path="emergency/details"
              element={
                <AuthGuard>
                  <EmergencyDetails />
                </AuthGuard>
              }
            />
            <Route
              path="complaints"
              element={
                <AuthGuard>
                  <Complaints />
                </AuthGuard>
              }
            />
            <Route
              path="poll"
              element={
                <AuthGuard>
                  <PollIndex />
                </AuthGuard>
              }
            />
            <Route
              path="vehicle-pass"
              element={
                <AuthGuard>
                  <VehicleIndex />
                </AuthGuard>
              }
            />
            <Route
              path="vehicle-pass/details"
              element={
                <AuthGuard>
                  <VehicleDetails />
                </AuthGuard>
              }
            />
            <Route
              path="vehicle-pass/qr-code"
              element={
                <AuthGuard>
                  <VehiclePassQRcode />
                </AuthGuard>
              }
            />
            <Route
              path="event"
              element={
                <AuthGuard>
                  <EventIndex />
                </AuthGuard>
              }
            />
            <Route
              path="event/form"
              element={
                <AuthGuard>
                  <EventForm />
                </AuthGuard>
              }
            />
            <Route
              path="laundry"
              element={
                <AuthGuard>
                  <LaundryIndex />
                </AuthGuard>
              }
            />
            <Route
              path="poll/details"
              element={
                <AuthGuard>
                  <PollDetails />
                </AuthGuard>
              }
            />
            <Route
              path="laundry/details"
              element={
                <AuthGuard>
                  <LaundryDetails />
                </AuthGuard>
              }
            />
            <Route
              path="chart-test"
              element={
                <AuthGuard>
                  <ChartTest />
                </AuthGuard>
              }
            />
            {/* New Figma UI updated on staging */}

            <Route
              path="/user"
              element={
                <AuthGuard>
                  <UserIndex />
                </AuthGuard>
              }
            />
            <Route
              path="/users/staff/details/:id"
              element={
                <AuthGuard>
                  <UserDetails />
                </AuthGuard>
              }
            />
            <Route
              path="/users/student/details/:id"
              element={
                <AuthGuard>
                  <StudentDetails />
                </AuthGuard>
              }
            />
            <Route
              path="/user/create-staff"
              element={
                <AuthGuard>
                  <StaffIndex />
                </AuthGuard>
              }
            />
            <Route
              path="/user/edit-staff/:id"
              element={
                <AuthGuard>
                  <StaffIndex />
                </AuthGuard>
              }
            />
            <Route
              path="/user/create-student"
              element={
                <AuthGuard>
                  <StudentIndex />
                </AuthGuard>
              }
            />
            <Route
              path="/user/edit-student/:id"
              element={
                <AuthGuard>
                  <StudentIndex />
                </AuthGuard>
              }
            />
          </Routes>
        </Layout>
      )}
      <Routes>
        <Route path="/" element={
          <LoginPrivate>
            <LoginIndex />
          </LoginPrivate>
        } />
        <Route path="forgot-password" element={
          <LoginPrivate>
            <ForgotPassword />
          </LoginPrivate>
        } />
        <Route path="page-not-found" element={<Page404 />} />
        {/* <Route path="chart-test" element={<ChartTest />} /> */}
      </Routes>
    </>
  );
}

export default App;
