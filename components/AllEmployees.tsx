import Link from "next/link";
import React from "react";

export interface AllEmployees {
  id: string;
  firstName: string;
  lastName: string;
  startDate: string;
  approveStatus: boolean;
  conflict: boolean;
}

const AllEmployees = ({
  id,
  firstName,
  lastName,
  startDate,
  approveStatus,
  conflict,
}: AllEmployees) => {
  return (
    <Link href={`/${id}`}>
      <div
        data-testid="allemployees-card"
        className="relative block p-8 border border-gray-100 shadow-xl rounded-xl min-h-full max-h-full"
      >
        <div className="flex">
          {conflict && (
            <span className="flex absolute left-4 top-4 rounded-full px-3 py-1.5 bg-yellow-100 text-yellow-900 font-medium text-xs">
              <span className="self-center"></span>
            </span>
          )}
          <div>
            {approveStatus ? (
              <span className="flex absolute right-4 top-4 rounded-full px-3 py-1.5 bg-green-100 text-green-900 font-medium text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="self-center">APPROVED</span>
              </span>
            ) : (
              <span className="flex absolute right-4 top-4 rounded-full px-3 py-1.5 bg-red-100 text-red-900 font-medium text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
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
          </div>
        </div>
      </div>
    </Link>
  );
};
export default AllEmployees;
