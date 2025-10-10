import { getCardDetail } from "@features/users/userSlice";
import { Grid } from "@mui/material";
import CustomCard from "@pages/leave/components/custom/CustomCard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


export default function UserCard() {
const dispatch= useDispatch();
const [data, setData]=useState({})

const {admin , staff, student}=data ?? {};

useEffect(()=>{
   dispatch(getCardDetail({})).then((res)=>{
    if(res?.payload?.statusCode === 200){
      setData(res?.payload?.data)
    }
   })
},[])

  return (
    <Grid item xs={12} sm={12} md={12} lg={7}>
      <Grid container spacing={3}
        sx={{ paddingLeft: 1, paddingRight: 1 }} // Adds gap on left and right
>
        <Grid item xs={12} sm={6} lg={4}>
          <CustomCard
            headerTitle="Hostel Admin Count"
            headerValue={admin?.totalAdminCount || 0}
            isRow={true} // Set isRow to false for column layout
            dataItems={[
              {
                label: "Active",
                value: admin?.activeAdminCount || 0,
                bulletColor: "#6B52AE",
                progress:
                  ((admin?.activeAdminCount || 0) / (admin?.totalAdminCount || 1)) * 100,
                progressColor: "#6B52AE",
              },
              {
                label: "In-Active",
                value: admin?.inActiveAdminCount || 0,
                bulletColor: "#FBB13C",
                progress:
                  ((admin?.inActiveAdminCount || 0) /
                    (admin?.totalAdminCount || 1)) *
                  100,
                progressColor: "#FBB13C",
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <CustomCard
            headerTitle="Hostel Staff Count"
            headerValue={staff?.totalStaffCount || 0}
            isRow={true} // Set isRow to false for column layout
            dataItems={[
              {
                label: "Active",
                value: staff?.activeStaffCount || 0,
                bulletColor: "#6B52AE",
                progress:
                  ((staff?.activeStaffCount || 0) / (staff?.totalStaffCount || 1)) *
                  100,
                progressColor: "#6B52AEs",
              },
              {
                label: "In-Active",
                value: staff?.inActiveStaffCount || 0,
                bulletColor: "#FBB13C",
                progress:
                  ((staff?.inActiveStaffCount || 0) /
                    (staff?.totalStaffCount || 1)) *
                  100,
                progressColor: "#FBB13C",
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <CustomCard
            headerTitle="Hostel Student Count"
            headerValue={student?.totalStudentCount || 0}
            isRow={true} // Set isRow to false for column layout
            dataItems={[
              {
                label: "Active",
                value: student?.activeUserCount || 0,
                bulletColor: "#6B52AE",
                progress:
                  ((student?.activeUserCount || 0) / (student?.totalStudentCount || 1)) *
                  100,
                progressColor: "#6B52AE",
              },
              {
                label: "In-Active",
                value: student?.inActiveUserCount,
                bulletColor: "#FBB13C",
                progress:
                  ((student?.inActiveUserCount || 0) /
                    (student?.totalStudentCount || 1)) *
                  100,
                progressColor: "#FBB13C",
              },
            ]}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
