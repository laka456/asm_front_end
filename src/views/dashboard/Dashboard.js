import React from "react";
import DashboardBreadcrumb from "../../components/layout/DashboardBreadcrumb";
import PopularSeekers from "../../components/widgets/PopularSeekers";
import CompletedVsActive from "../../components/widgets/CompletedVsActive";
import SeekersAvailability from "../../components/widgets/SeekersAvailability";

function Dashboard() {
  const left = <div className="pri-font text-lg">Dashboard</div>;
  return (
    <div className="pb-5">
      <DashboardBreadcrumb left={left} />
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <CompletedVsActive />
        <SeekersAvailability />
        <PopularSeekers />
      </div>
      {/*<OrderAnalytics />*/}
    </div>
  );
}

export default Dashboard;
