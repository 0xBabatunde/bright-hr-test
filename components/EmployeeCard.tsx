import React from "react";

export interface EmployeeCard {
  firstName: string;
  lastName: string;
  startDate: string;
  endDate: string;
  approveStatus: boolean;
  absence: string;
}

const EmployeeCard = ({
  firstName,
  lastName,
  startDate,
  endDate,
  approveStatus,
  absence,
}: EmployeeCard) => {
  return (
    <div
      data-testid="employee-card"
      className="relative block p-8 border border-gray-100 shadow-xl rounded-xl min-h-full max-h-full"
    >
      <div className="flex">
        <span className="flex absolute left-4 top-4 rounded-full px-3 py-1.5 bg-yellow-100 text-yellow-900 font-medium text-xs">
          <span className="self-center">{absence}</span>
        </span>
        <div>
          {approveStatus ? (
            <span className="flex absolute right-4 top-4 rounded-full px-3 py-1.5 bg-green-100 text-green-900 font-medium text-xs">
              <span className="self-center">APPROVED</span>
            </span>
          ) : (
            <span className="flex absolute right-4 top-4 rounded-full px-3 py-1.5 bg-red-100 text-red-900 font-medium text-xs">
              <span className="self-center">PENDING</span>
            </span>
          )}
        </div>
      </div>
      <div className="mt-6 text-gray-500 ">
        <h1 className="mt-4 mb-4 text-xl font-bold text-gray-600">
          {firstName} {lastName}
        </h1>
        <div className="md:flex justify-between">
          <p>
            <span className="font-semibold">Start: </span>
            {startDate}
          </p>
          <p>
            <span className="font-semibold">End: </span>
            {endDate}
          </p>
        </div>
      </div>
    </div>
  );
};
export default EmployeeCard;
