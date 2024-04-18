/* eslint-disable react-hooks/exhaustive-deps */
import { useState, SetStateAction } from "react";
import AllEmployees from "@/components/AllEmployees";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  const res = await fetch(
    `https://front-end-kata.brighthr.workers.dev/api/absences`
  );
  const result = await res.json();

  const employee = new Set();
  const eachEmployee = result.filter((obj: { employee: { id: string } }) => {
    if (employee.has(obj.employee.id)) {
      return false;
    } else {
      employee.add(obj.employee.id);
      return true;
    }
  });

  const conflictId = result.filter((obj: { employee: { id: string } }) => {
    return obj.employee.id;
  });

  const conflictUrl = `https://front-end-kata.brighthr.workers.dev/api/conflict/${conflictId}`;

  const response = await fetch(conflictUrl);
  const conflict = await response.json();

  const data = eachEmployee.map(
    (employee: {
      employee: { id: string; firstName: string; lastName: string };
      startDate: string;
      approved: boolean;
      absenceType: string;
    }) => {
      return {
        id: employee.employee.id,
        firstName: employee.employee.firstName,
        lastName: employee.employee.lastName,
        startDate: employee.startDate,
        approveStatus: employee.approved,
        absence: employee.absenceType.replace(/\_/g, " "),
      };
    }
  );
  return {
    props: {
      data,
      conflict,
      revalidate: 10,
    },
  };
}

const Home = ({ data, conflict }: any) => {
  const [sortedData, setSortedData] = useState(data);
  const [sort, setSort] = useState("");

  const handleFilter = (e: { target: { value: SetStateAction<string> } }) => {
    setSort(e.target.value);
    if (sort === "Name") {
      console.log("name ran");
      const nameSorted = data.sort(
        (a: { firstName: string }, b: { firstName: string }) => {
          // Use optional chaining to safely access properties
          const firstNameA = a.firstName.toLowerCase();
          const firstNameB = b.firstName.toLowerCase();

          if (firstNameA < firstNameB) return -1;
          if (firstNameA > firstNameB) return 1;
          return 0;
        }
      );
      setSortedData(nameSorted);
    } else if (sort === "Date") {
      console.log("date ran");
      const dateSorted = data.sort(
        (
          a: { startDate: string | number | Date },
          b: { startDate: string | number | Date }
        ) => {
          // Get the timestamps of the dates for comparison
          const dateA = new Date(a.startDate).getTime();
          const dateB = new Date(b.startDate).getTime();

          // Return the comparison result
          return dateA - dateB;
        }
      );
      setSortedData(dateSorted);
    } else if (sort === "Absence") {
      console.log("absence ran");
      const absenceSorted = data.sort(
        (a: { absenseType: string }, b: { absenseType: string }) => {
          // Use optional chaining to safely access properties
          const absenceA = a.absenseType;
          const absenceB = b.absenseType;

          if (absenceA < absenceB) return -1;
          if (absenceA > absenceB) return 1;
          return 0;
        }
      );
      setSortedData(absenceSorted);
    }
  };

  return (
    <div className="container mx-auto py-10 px-10 md:px-20">
      <h1 className="text-3xl font-semibold mb-10 text-center text-black">
        Employees
      </h1>
      <div className="block md:mb-0 md:flex justify-between text-black border-black">
        <div className="w-full md:w-1/2 lg:w-1/4 mr-20">
          <select
            id="employee"
            name="employee"
            className="mt-1 block w-full pl-3 pr-10 py-2 mb-5 md:mb-0 text-base border-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            // value={region}
            onChange={handleFilter}
          >
            <option className="text-black">Name</option>
            <option className="text-black">Absence</option>
            <option className="text-black">Date</option>
          </select>
        </div>
        <div className="relative w-full md:w-1/2 lg:w-1/4 mb-10"></div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-10">
        {sortedData.map(
          (employee: {
            id: string;
            firstName: string;
            lastName: string;
            startDate: string;
            approveStatus: boolean;
          }) => (
            <AllEmployees
              key={employee.id}
              id={employee.id}
              firstName={employee.firstName}
              lastName={employee.lastName}
              startDate={new Date(employee.startDate).toLocaleString()}
              approveStatus={employee.approveStatus}
              conflict={conflict.conflicts}
            />
          )
        )}
      </div>
    </div>
  );
};
export default Home;
