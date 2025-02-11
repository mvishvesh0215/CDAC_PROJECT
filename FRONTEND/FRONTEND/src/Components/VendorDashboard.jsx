//import { Card, CardContent } from "../Shad/card";
import { Sidebar } from "../Components/Sidebar";
//import { MetricCard } from "../Components/MetricCard";
//import { CustomerTable } from "../Components/CustomerTable";
//import { metrics } from "../Components/metrics";
//import Header from "../Components/Header";
import "../Style/vendor.css"; // Import the CSS file
import { Outlet } from "react-router-dom";

export const VendorDashboard = () => {
  return (
    <div className="vendor-dashboard">
      <Sidebar />
      {/* <main className="main-content"> */}
        <div className="content-wrapper">
          {/* Metrics */}
          {/* <div className="metrics-grid md:grid-cols-3">
            {metrics.map((metric) => (
              <MetricCard key={metric.title} metric={metric} />
            ))}
          </div> */}

          {/* Customer Table */}
          {/* <Card>
            <CardContent className="p-6">
              <CustomerTable />
            </CardContent>
          </Card> */}
          <Outlet/>
        </div>
      {/* </main> */}
    </div>
  );
};
