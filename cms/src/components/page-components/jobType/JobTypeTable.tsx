// In this component we perform, deleteRequest and pulls all data from context
import { useContext, useEffect, useState } from "react";
import AlertDialogBox from "@/components/AlertDialogBox";
import axios from "@/hoc/axios";
import { JobTypeContext } from "@/hoc/context/JobTypeContextProvider";
import { JobTypeType } from "@/types/Types";
import EditJobType from "./EditJobType";

const JobTypeTable = () => {
  const { allJobTypes, loading, setLoading, change, setChange } =
    useContext(JobTypeContext);

  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [deletingID, setDeletingID] = useState<string>("");
  const [currentJobType, setCurrentJobType] = useState<JobTypeType | null>(
    null
  );
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  useEffect(() => {
    if (confirmDelete) {
      const handleDelete = (deletingID: string, setOpenDelete: any) => {
        try {
          setLoading(true);
          axios
            .delete(`/jobtype/${deletingID}`)
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
    <>
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-3">
              <input type="checkbox" />
            </th>
            <th className="px-6 py-3">SN</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {allJobTypes.map((val: any, index: number) => (
            <tr className="bg-white border-b" key={index}>
              <td className="px-6 py-3">
                <input type="checkbox" />
              </td>
              <td className="px-6 py-3">{index + 1}</td>
              <td className="px-6 py-3 capitalize">{val.name}</td>

              <td className="flex gap-2 px-6 py-3">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentJobType(val);
                  }}
                  className="px-2 py-1 text-xs text-white transition-all duration-300 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeletingID(val.id);
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

      {currentJobType && (
        <EditJobType
          setCurrentJobType={setCurrentJobType}
          currentJobType={currentJobType}
        />
      )}
      {openDelete && (
        <AlertDialogBox
          loading={loading}
          setOpenDelete={setOpenDelete}
          setConfirmDelete={setConfirmDelete}
          setDeletingID={setDeletingID}
        />
      )}
    </>
  );
};

export default JobTypeTable;
