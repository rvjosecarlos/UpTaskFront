import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProyectDetailView from "./views/projects/ProyectDetailView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";
import ConfirmAccountView from "@/views/auth/ConfirmAccountView";
import RequestConfirmationCode from "./views/auth/RequestConfirmationCode";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import ProfileLayout from "./layouts/ProfileLayout";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import NotFound from "./views/404/NotFound";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView/>} index/>
                    <Route path="/projects/create" element={<CreateProjectView />}/>
                    <Route path="/projects/:projectId" element={<ProyectDetailView />} />
                    <Route path="/projects/:projectId/edit" element={<EditProjectView />} />
                    <Route path="/projects/:projectId/team" element={<ProjectTeamView />} />
                    <Route element={<ProfileLayout />}>
                        <Route path={'/profile'} element={<ProfileView />} />
                        <Route path={'/profile/password'} element={<ChangePasswordView />}/>
                    </Route>
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />}/>
                    <Route path="/auth/register" element={<RegisterView/>}/>
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
                    <Route path="/auth/new-code" element={<RequestConfirmationCode />}/>
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView/>} />
                    <Route path="/auth/new-password" element={<NewPasswordView />} />
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
};