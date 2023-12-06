import { useCompanyContext } from "@/hoc/context/CompanyContextProvider";
import { useJobContext } from "@/hoc/context/JobContextProvider";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { allCompanies } = useCompanyContext();
  const { allJobs } = useJobContext();

  const dashData = [
    {
      title: "Companies",
      length: allCompanies.length,
      link: "/companies",
    },
    {
      title: "Jobs",
      length: allJobs.length,
      link: "/jobs",
    },
  ];

  return (
    <div>
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col w-full gap-4">
          <div className="grid w-full grid-cols-12">
            {dashData.map((val, index) => (
              <Link
                to={val.link}
                key={index}
                className="block max-w-sm col-span-4 p-6 bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {val.title}
                </h5>
                <p className="text-2xl font-medium text-gray-700 dark:text-gray-400">
                  {val.length}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
