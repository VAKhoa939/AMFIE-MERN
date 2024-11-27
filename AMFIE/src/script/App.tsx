import ChatPage from "./pages/chat-page/ChatPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import LoginPage from "./pages/auth-pages/LoginPage";
import RegisterPage from "./pages/auth-pages/RegisterPage";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/home-page/HomePage";
import AssetDashboardPage from "./pages/asset-pages/AssetDashboardPage";
import { MainRefProvider } from "./context/MainRefContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AssetInfoPage from "./pages/asset-pages/AssetInfoPage";
import CreateAssetPage from "./pages/asset-pages/CreateAssetPage";
import React from "react";
import UserDashboardPage from "./pages/user-pages/UserDashboardPage";
import UserInfoPage from "./pages/user-pages/UserInfoPage";
import CreateUserPage from "./pages/user-pages/CreateUserPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <MainRefProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/asset-dashboard"
                  element={<ProtectedRoute Component={AssetDashboardPage} />}
                />
                <Route
                  path="/asset-dashboard/:id"
                  element={<ProtectedRoute Component={AssetInfoPage} />}
                />
                <Route
                  path="/asset-dashboard/create"
                  element={<ProtectedRoute Component={CreateAssetPage} />}
                />
                <Route
                  path="/user-dashboard"
                  element={<ProtectedRoute Component={UserDashboardPage} />}
                />
                <Route
                  path="/user-dashboard/:id"
                  element={<ProtectedRoute Component={UserInfoPage} />}
                />
                <Route
                  path="/user-dashboard/create"
                  element={<ProtectedRoute Component={CreateUserPage} />}
                />
                <Route path="/chat" element={<ChatPage />} />
              </Routes>
            </Layout>
          </MainRefProvider>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
interface ProtectedRouteProps {
  Component: React.FC;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ Component }) => {
  const authContext = React.useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used within an AuthProvider");
  }
  return authContext.user ? <Component /> : <Navigate to="/login" />;
};

export default App;
