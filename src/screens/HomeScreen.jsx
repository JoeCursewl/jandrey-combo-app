import { View, Text, StyleSheet } from "react-native";
import ScreenLogin from "./LoginSection/ScreenLogin";
import React from "react";
import Constants from "expo-constants";
import { Routes, Route, Navigate, useNavigate } from "react-router-native";
import DashboardApp from "./DashboardApp/DashboardApp";
import ScreenRegister from "./LoginSection/screenRegister";
import RegisterPosts from './RegisterAdmins/AdminPosts/register-posts.jsx'
import RegisterPackages from "./RegisterAdmins/AdminPackages/register-packages.jsx";
import RegisterTrainers from "./RegisterAdmins/AdminTrainers/register-trainers.jsx";
import RouterAdmin from "./RegisterAdmins/router-admin.jsx";
import RegisterInformation from "./RegisterAdmins/AdminInformation/register-information.jsx";
import ShowPackages from "./Packaging/show-packages.jsx";
import ShowTrainers from "./Trainers/show-trainers.jsx";
import ShowContact from "./ContactInfo/show-contact.jsx";
import RouterAdminUpdate from "./UpdateAdmins/router-admin-update.jsx";
import UpdatePosts from "./UpdateAdmins/AdminPosts/updete-posts.jsx";
import UpdateAndDeletePosts from "./UpdateAdmins/AdminPosts/update-and-delete-posts.jsx";
import UpdatePackages from "./UpdateAdmins/AdminPackages/update-packages.jsx";
import UpdateAndDeletePackages from "./UpdateAdmins/AdminPackages/update-and-delete-packages.jsx";
import UpdateTrainers from "./UpdateAdmins/AdminTrainers/update-trainers.jsx";
import UpdateAndDeleteTrainers from "./UpdateAdmins/AdminTrainers/update-and-delete-trainers.jsx";
import UpdateInformation from "./UpdateAdmins/AdminInformation/update-information.jsx";
import UpdateAndDeleteInformation from "./UpdateAdmins/AdminInformation/update-and-delete-information.jsx";

export default function AllApp() {
  return (
    <View style={styles.container}>
      <Routes>

        <Route path="/login" element={<ScreenLogin />}/>
        <Route path="/login-admin" element={<ScreenRegister />}/>
        
        <Route path="/register" element={<RouterAdmin />} />

        <Route path="/register/new-post" element={<RegisterPosts />} />
        <Route path="/register/new-package" element={<RegisterPackages />} />
        <Route path="/register/new-trainer" element={<RegisterTrainers />} />
        <Route path="/register/new-contact" element={<RegisterInformation />} />

        <Route path="/packaging" element={<ShowPackages />} />
        <Route path="/trainers" element={<ShowTrainers />} />
        <Route path="/contacts" element={<ShowContact />} />
        <Route path="/update" element={<RouterAdminUpdate />} />

        <Route path="/edit/posts" element={<UpdatePosts />} />
        <Route path="/post/:id_post" element={<UpdateAndDeletePosts />} />

        <Route path="/edit/packages" element={<UpdatePackages />} />
        <Route path="/package/:id_package" element={<UpdateAndDeletePackages />} />

        <Route path="/edit/trainers" element={<UpdateTrainers />} />
        <Route path="/trainer/:id_trainer" element={<UpdateAndDeleteTrainers />} />

        <Route path="/edit/information" element={<UpdateInformation />} />
        <Route path="/information/:id_info" element={<UpdateAndDeleteInformation />} />

        <Route path="/dashboard" element={
              <DashboardApp /> }
        />
       <Route path="*" element={
          <Navigate to={"/dashboard"}/>}
        >
        </Route>
      </Routes>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    // marginTop: Constants.statusBarHeight,
    marginTop: 0,
    backgroundColor: "#000"
  },
  text: {
    fontSize: 14,
    color: "white",
  },
  colorWhite: {
    color: "white",
    fontSize: 20,
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  appInputs: {
    backgroundColor: "transparent",
    borderBottomColor: "white",
    height: 20,
    margin: 5,
    width: "auto",
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "white",
    color: "red",
  },
  containerLogin: {
    padding: 30,
  },
});
