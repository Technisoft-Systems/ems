import { LeaveRequests, RequestApproved } from '@prisma/client';
import React from 'react'

type Props = {
    openLeaveReqModal: ()=>void;
    leaveRequest: LeaveRequests | null | undefined;
    leaveApproved: RequestApproved | null | undefined;
}

const DashboardRightPanel = ({openLeaveReqModal, leaveRequest, leaveApproved}: Props) => {
  return (
    <div className="my-8 mx-2 h-full max-h-[calc(100vh-10rem)] min-w-[24rem] max-w-2xl w-full py-2 md:w-1/2">
      <div className="h-full w-full rounded-md bg-slate-300 p-2 shadow-md dark:bg-slate-600">
        <div className="w-full rounded-md bg-slate-200 p-4 shadow-md dark:bg-slate-500">
          <button
            onClick={openLeaveReqModal}
            className="btn-1 w-1/3 self-center"
            disabled={!!leaveRequest || !!leaveApproved}
          >
            Request Leave
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardRightPanel