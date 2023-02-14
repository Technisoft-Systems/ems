import { useSession } from "next-auth/react";
import { useContext } from "react";
import { ModalContextProvider } from "../../../contexts/ModalsContext";
import { trpc } from "../../../utils/trpc";
import DashboardRightPanel from "../../common/DashboardRightPanel";
import LeaveRequestFormContainer from "../../LeaveRequestManager/LeaveRequestForm/LeaveRequestFormContainer";
// import ListItemCard from "../../common/ListItemCard";
import MetricsCard from "../../common/MetricsCard";

const AdminHomePage = () => {
  const { data: session } = useSession();
  const { data: leaveRequest, refetch } =
    trpc.leaveManagement.getLeaveRequest.useQuery();
    const{data: employeeOnLeave} = trpc.leaveManagement.getEmployeeOnLeave.useQuery()
  const {data: employee, isLoading} = trpc.employees.getEmployee.useQuery()
  const modalContext = useContext(ModalContextProvider);

  const openLeaveReqModal = () => {
    if (modalContext.setModals) {
      modalContext.setModals((prev) => ({
        ...prev,
        createLeaveRequest: { isOpen: true },
      }));
    }
  };

  return (
    <div className="h-full w-full">
      <h1 className="my-8 mx-4 text-start text-2xl">
        Welcome, {session?.user?.name || "[Admin name]"}
      </h1>
      <div className="flex h-full w-full flex-wrap">
        <div className="my-4 flex h-fit max-h-[calc(100vh-10rem)] w-full flex-col items-start p-2 md:w-1/2">
          <MetricsCard
            metric_one_label="Total leave balance"
            metric_one={employee?.leave_bal || 0}
            metric_two_label="Entitled leave days"
            metric_two={employee?.leave_days || 0}
            metric_three_label="Earned leave days"
            isLoading={isLoading}
          />
          {/* <ListItemCard
            title="Leave Requests"
            btn_lbl="See all requests"
            listData={leaveRequestData}
          /> */}
          <LeaveRequestFormContainer
            refetchLeaveRequests={() => {
              refetch().catch((e) => console.error(e));
            }}
          />
        </div>
        <DashboardRightPanel
          leaveRequest={leaveRequest}
          leaveApproved={employeeOnLeave}
          openLeaveReqModal={openLeaveReqModal}
        />
      </div>
    </div>
  );
};

export default AdminHomePage;
