import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import FullscreenLoader from "../components/loaders/FullScreenLoader.tsx";

// Auth imports
import AuthLayout from "../components/layouts/AuthLayout.tsx";
import Login from "../features/auth/routes/Login.tsx";
import Register from "../features/auth/routes/Register.tsx";
import Verify from "../features/auth/routes/Verify.tsx";
import ForgotPassword from "../features/auth/routes/ForgotPassword.tsx";
import ResetPassword from "../features/auth/routes/ResetPassword.tsx";
import ResetpasswordSuccess from "../features/auth/routes/ResetPasswordSuccess.tsx";

import ProtectedLayout from "../components/layouts/ProtectedLayout.tsx";

import Dashboard from "../features/dashboard/routes/Dashboard.tsx";
import AppLayout from "../components/layouts/AppLayout.tsx";
import OnboardingLayout from "../components/layouts/OnboardingLayout.tsx";
import Introduction from "../features/onboarding/routes/Introduction.tsx";
import Role from "../features/onboarding/routes/Role.tsx";
import Backups from "../features/backups/routes/Backups.tsx";
import Billing from "../features/billing/routes/billing.tsx";
import Setting from "../features/setting/routes/Setting.tsx";
import DataOptimizerLayout from "../components/layouts/DataOptimizerLayout.tsx";
import CRMs from "../features/data-optimizer/routes/CRMs.tsx";
import Module from "../features/data-optimizer/routes/Module.tsx";
import Operation from "../features/data-optimizer/routes/Operation.tsx";
import Merge from "../features/data-optimizer/routes/Merge.tsx";
import DataOptimizerHistory from "../features/data-optimizer/routes/DataOptimizerHistory.tsx";
import MigrationLayout from "../components/layouts/MigrationLayout.tsx";
import MigrationHistory from "../features/migration/routes/MigrationHistory.tsx";
import Apps from "../features/migration/routes/Apps.tsx";
import SharePoint from "../features/migration/routes/SharePoint.tsx";

export const AppRoutes = () => {
  return (
    <Suspense fallback={<FullscreenLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to={"/dashboard"} />} />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="register/verify" element={<Verify />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route
            path="reset-password-success"
            element={<ResetpasswordSuccess />}
          />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="onboarding" element={<OnboardingLayout />}>
              <Route
                path="/onboarding"
                element={<Navigate to={"/onboarding/introduction"} />}
              />
              <Route path="introduction" element={<Introduction />} />
              <Route path="role" element={<Role />} />
              <Route
                path="*"
                element={<Navigate to={"/onboarding/introduction"} />}
              />
            </Route>
            <Route path="backups" element={<Backups />} />
            <Route path="data-optimizer" element={<DataOptimizerLayout />}>
              <Route
                path="/data-optimizer"
                element={<Navigate to={"/data-optimizer/all-crms"} />}
              />
              <Route path="all-crms" element={<CRMs />} />
              <Route path="modules" element={<Module />} />
              <Route path="operations" element={<Operation />} />
              <Route path="merge" element={<Merge />} />
              <Route
                path="data-optimization-history"
                element={<DataOptimizerHistory />}
              />
              <Route
                path="*"
                element={<Navigate to={"/data-optimizer/all-crms"} />}
              />
            </Route>
            <Route path="migration" element={<MigrationLayout />}>
              <Route
                path="/migration"
                element={<Navigate to={"/migration/apps"} />}
              />
              <Route path="apps" element={<Apps />} />
              <Route path="share-point" element={<SharePoint />} />
              <Route path="migration-history" element={<MigrationHistory />} />
              <Route path="*" element={<Navigate to={"/migration/apps"} />} />
            </Route>
            <Route path="billing" element={<Billing />} />
            <Route path="setting" element={<Setting />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={"/dashboard"} />} />
      </Routes>
    </Suspense>
  );
};
