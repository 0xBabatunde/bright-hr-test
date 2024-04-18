import React from "react";
import EmployeeCard from "@/components/EmployeeCard";
import type { GetStaticPaths } from "next";
import Link from "next/link";

type Employee = {
  firstName: string;
  lastName: string;
  startDate: string;
  endDate: string;
  approveStatus: boolean;
  absence: boolean;
};

export const getStaticPaths = (async () => {
  const url = "https://front-end-kata.brighthr.workers.dev/api/absences";
  const options = {
    method: "GET",
  };
  const res = await fetch(url, options);
  const employees = await res.json();

  const paths = employees.map((employee: { employee: { id: string } }) => ({
    params: {
      id: employee.employee.id,
    },
  }));

  return { paths, fallback: false };
}) satisfies GetStaticPaths;

export const getStaticProps = async ({ params }: any) => {
  const url = "https://front-end-kata.brighthr.workers.dev/api/absences";
  const options = {
    method: "GET",
  };
  const res = await fetch(url, options);
  const employees = await res.json();

  const { id } = params;

  const data = employees.filter(
    (employee: { employee: { id: string } }) => employee.employee.id === `${id}`
  );

  return {
    props: {
      data,
      revalidate: 10,
    },
  };
};

const Employee = ({ data }: any) => {
  const addedDays = data.map(
    (employee: { startDate: string | number | Date; days: number }) => {
      const startDate = new Date(employee.startDate);
      const endDate = new Date(
        startDate.getTime() + employee.days * 24 * 60 * 60 * 1000
      );

      return endDate.toLocaleString();
    }
  );

  return (
    <div className="container mx-auto py-10 px-10 md:px-20">
      <Link href="/">
        <h1 className="text-3xl font-semibold mb-10 text-center text-black">
          Employee Absence
        </h1>
      </Link>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-10 justify-center items-center">
        {data.map(
          (
            employee: {
              id: string;
              employee: { firstName: string; lastName: string };
              startDate: string | number | Date;
              approved: boolean;
              absenceType: string;
            },
            index: number
          ) => (
            <EmployeeCard
              key={employee.id}
              firstName={employee.employee.firstName}
              lastName={employee.employee.lastName}
              startDate={new Date(employee.startDate).toLocaleString()}
              endDate={addedDays[index]}
              approveStatus={employee.approved}
              absence={employee.absenceType.replace(/\_/g, " ")}
            />
          )
        )}
      </div>
    </div>
  );
};
export default Employee;
