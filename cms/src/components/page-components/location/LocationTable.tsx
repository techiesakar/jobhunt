// In this component we perform, deleteRequest and pulls all data from context
import { LocationContext } from "@/hoc/context/LocationContextAPI";
import { LocationType } from "@/types/LocationType";
import { useContext, useEffect, useState } from "react";
import EditLocation from "./EditLocation";
import AlertDialogBox from "@/components/AlertDialogBox";
import axios from "@/hoc/axios";

const LocationTable = () => {
  const { allLocations, loading, setLoading, change, setChange } =
    useContext(LocationContext);

  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [deletingID, setDeletingID] = useState<string>("");
  const [currentLocation, setCurrentLocation] = useState<LocationType | null>(
    null
  );
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  useEffect(() => {
    if (confirmDelete) {
      const handleDelete = (deletingID: string, setOpenDelete: any) => {
        try {
          setLoading(true);
          axios
            .delete(`/location/${deletingID}`)
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
          {allLocations.map((location: LocationType, index: number) => (
            <tr className="bg-white border-b" key={index}>
              <td className="px-6 py-3">
                <input type="checkbox" />
              </td>
              <td className="px-6 py-3">{index + 1}</td>
              <td className="px-6 py-3 capitalize">{location.name}</td>

              <td className="px-6 py-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentLocation(location);
                  }}
                  className=" cursor-pointer py-1 px-2 text-xs text-white hover:bg-blue-600 transition-all duration-300 bg-blue-500 rounded-md"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeletingID(location.id);
                    setOpenDelete(true);
                  }}
                  className=" cursor-pointer py-1 px-2 text-xs hover:bg-red-600 transition-all duration-300 text-white bg-red-500 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {currentLocation && (
        <EditLocation
          setCurrentLocation={setCurrentLocation}
          currentLocation={currentLocation}
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

export default LocationTable;
