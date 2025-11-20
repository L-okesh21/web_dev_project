import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import RouteExplorer from './pages/route-explorer';
import BudgetOptimizer from './pages/budget-optimizer';
import AccountSettings from './pages/account-settings';
import TripDashboard from './pages/trip-dashboard';
import SmartTripPlanner from './pages/smart-trip-planner';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/route-explorer" element={<RouteExplorer />} />
        <Route path="/budget-optimizer" element={<BudgetOptimizer />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/trip-dashboard" element={<TripDashboard />} />
        <Route path="/smart-trip-planner" element={<SmartTripPlanner />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
