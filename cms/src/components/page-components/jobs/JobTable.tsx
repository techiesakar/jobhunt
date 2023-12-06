import { useJobContext } from "@/hoc/context/JobContextProvider";
import React, { useEffect, useState } from "react";
import axios from "@/hoc/axios";
import { CompanyType } from "@/types/Types";
import AlertDialogBox from "@/components/AlertDialogBox";
const JobTable = () => {
  const { allJobs, loading, setLoading, change, setChange } = useJobContext();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [deletingID, setDeletingID] = useState<string>("");
  const [currentCompany, setCurrentCompany] = useState<CompanyType | null>(
    null
  );
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  useEffect(() => {
    if (confirmDelete) {
      const handleDelete = (deletingID: string, setOpenDelete: any) => {
        try {
          setLoading(true);
          axios
            .delete(`/job/${deletingID}`)
            .then((res) => {
              if (res.status === 200) {
                setChange(!change);
                setLoading(false);
                setOpenDelete(false);
                setDeletingID("");
                setConfirmDelete(false);
              }
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
              setOpenDelete(false);
              setDeletingID("");
              setConfirmDelete(false);
            });
        } catch (error) {
          console.log(error);
          setLoading(false);
          setOpenDelete(false);
          setDeletingID("");
          setConfirmDelete(false);
        }
      };
      handleDelete(deletingID, setOpenDelete);
    }
  }, [confirmDelete]);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full overflow-scroll text-sm text-left text-gray-500 table-auto ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-3">
              <input type="checkbox" />
            </th>
            <th className="px-6 py-3">SN</th>
            <th className="px-6 py-3">Job Title</th>
            <th className="px-6 py-3">Company</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Location</th>
            <th className="px-6 py-3">Deadline</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {allJobs.map((val: any, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="px-6 py-4">
                <input type="checkbox" />
              </td>
              <td className="px-6 py-3 capitalize">{index + 1}</td>
              <td className="px-6 py-3 capitalize">{val.name}</td>
              <td className="px-6 py-3 capitalize">
                {val.company.company_name}
              </td>
              <td className="px-6 py-3 capitalize">{val.job_phone}</td>
              <td className="px-6 py-3 lowercase">{val.job_email}</td>
              <td className="px-6 py-3 capitalize">
                {val.locations.map((location: any, index: number) => (
                  <React.Fragment key={location.id}>
                    {location.name}
                    {index !== val.locations.length - 1 ? ", " : ""}
                  </React.Fragment>
                ))}
              </td>
              <td className="px-6 py-3 lowercase">{val.vacancy_deadline}</td>
              <td className="flex gap-2 px-6 py-3">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentCompany(val);
                    console.log(currentCompany);
                  }}
                  className="px-2 py-1 text-xs text-white transition-all duration-300 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeletingID(val.id);
                    console.log(val.id);
                    setOpenDelete(true);
                  }}
                  className="px-2 py-1 text-xs text-white transition-all duration-300 bg-red-500 rounded-md cursor-pointer hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openDelete && (
        <AlertDialogBox
          loading={loading}
          setOpenDelete={setOpenDelete}
          setConfirmDelete={setConfirmDelete}
          setDeletingID={setDeletingID}
        />
      )}
    </div>
  );
};

export default JobTable;
