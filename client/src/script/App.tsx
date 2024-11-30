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
import AddressDashboardPage from "./pages/address-pages/AddressDashboardPage";
import AddressInfoPage from "./pages/address-pages/AddressInfoPage";
import CreateAddressPage from "./pages/address-pages/CreateAddressPage";

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
                  path="/address-dashboard"
                  element={<ProtectedRoute Component={AddressDashboardPage} />}
                />
                <Route
                  path="/address-dashboard/:id"
                  element={<ProtectedRoute Component={AddressInfoPage} />}
                />
                <Route
                  path="/address-dashboard/create"
                  element={<ProtectedRoute Component={CreateAddressPage} />}
                />
                <Route
                  path="/user-dashboard"
                  element={<ProtectedRoute Component={UserDashboardPage} />}
                />
                <Route
                  path="/user-dashboard/:id"
                  element={<ProtectedRoute Component={UserInfoPage} />}
                />
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
  return authContext.email ? <Component /> : <Navigate to="/login" />;
};

export default App;
