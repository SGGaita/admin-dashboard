import React, { useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import { CreateVendor, Dashboard, CreateJob, JCOpenDataTable, LoginPage, CreateUser, NotFoundPage, UpdateVendor, UsersList, Vendor, VendorList, User,JCCloseDataTable,JCOutsourcedDataTable, ViewJob, VendorDataTable } from "./pages";
import { SidebarComponent } from "./components/Sidebar";
import { Topbar } from './components/Topbar'
import { StatusCheck } from "./pages/StatusCheck";
import { useSelector } from "react-redux";
import { selectLogin } from "./redux/authSlice";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';



export const RoutesLayout = () => {
    const [isSidebar, setIsSidebar] = useState(true);
    const { isLoggedIn } = useSelector(selectLogin);
    const location = useLocation();

    const shouldShowSidebarAndTopbar = isLoggedIn && !['/', '/status-check', '/*'].includes(location.pathname);
    return (
        <div className="app">
            {shouldShowSidebarAndTopbar && <SidebarComponent isSidebar={isSidebar} />}

            <main className="content">
                {shouldShowSidebarAndTopbar && <Topbar setIsSidebar={setIsSidebar} />}
                <Routes>
                    <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
                    <Route path="/status-check" element={<StatusCheck />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        {/*User routes*/}
                        <Route path="/jobs">
                        <Route path="create" exact element={<CreateJob />} />
                        <Route path="open-jobs" element={<JCOpenDataTable title="Open Jobs" subtitle="Awaiting Repair" />} />
                        <Route path="outsourced-jobs" element={<JCOutsourcedDataTable title="Outsourced Jobs" subtitle="Jobs outsourced to vendors" />} />
                        <Route path="closed-jobs" element={<JCCloseDataTable title="Closed Jobs" subtitle="Completed and collected" />} />
                        <Route path="view/:ID" element={<ViewJob/>}/>
                        <Route path="edit/:ID" element={<editJob/>}/>

                        </Route>
                       
                        {/*Vendor routes*/}
                        <Route path="/vendor" element={<Vendor />}>
                            <Route path="create" element={<CreateVendor title="New Vendor"  subtitle="Create a new vendor" />} />
                            <Route path="update/:ID" element={<UpdateVendor title="Update Vendor"  subtitle="Update vendor information" />} />
                            <Route path="list" element={<VendorDataTable title="Vendors"  subtitle="Available vendors" />} />
                        </Route>

                        {/*User routes*/}
                        <Route  path="user"  element={<User/>}>
                            <Route path="create" element={<CreateUser  title="New User"  subtitle="Create a new user account" />} />
                            <Route path='list' element={<UsersList title="User Accounts" subtitle="Manage User Profiles" />} />
                        </Route>

                    </Route>
                    <Route path="*" element={<PublicRoute><NotFoundPage /></PublicRoute>} />
                </Routes>
            </main>
        </div>
    )
}
