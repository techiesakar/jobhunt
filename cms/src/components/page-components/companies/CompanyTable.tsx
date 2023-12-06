import AlertDialogBox from "@/components/AlertDialogBox";
import { useCompanyContext } from "@/hoc/context/CompanyContextProvider";
import { useEffect, useState } from "react";
import axios from "@/hoc/axios";
import EditCompany from "./EditCompany";
import {
  BenefitType,
  CategoryType,
  CompanyType,
  LocationType,
  TechnologyType,
} from "@/types/Types";

const CompanyTable = () => {
  const { allCompanies, loading, setLoading, change, setChange } =
    useCompanyContext();

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
            .delete(`/company/${deletingID}`)
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

  // These below states and data are for edit form - when click edit button we first need to update those states in order to pass value to multi select option then we pass all those value to edit form

  const [selectedTechnology, setSelectedTechnology] = useState<
    TechnologyType[]
  >((currentCompany ? currentCompany.technologies : []) as TechnologyType[]);
  const [selectedLocation, setSelectedLocation] = useState<LocationType[]>(
    (currentCompany ? currentCompany.locations : []) as LocationType[]
  );
  const [selectedBenefit, setSelectedBenefit] = useState<BenefitType[]>(
    (currentCompany ? currentCompany.benefits : []) as BenefitType[]
  );
  const [selectedCategory, setSelectedCategory] = useState<CategoryType[]>(
    (currentCompany ? currentCompany.categories : []) as CategoryType[]
  );

  // If currentCompany changes, update the state based on it
  useEffect(() => {
    if (currentCompany) {
      setSelectedTechnology(currentCompany.technologies as TechnologyType[]);
      setSelectedLocation(currentCompany.locations as LocationType[]);
      setSelectedBenefit(currentCompany.benefits as BenefitType[]);
      setSelectedCategory(currentCompany.categories as CategoryType[]);
    }
  }, [currentCompany]);

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-3">
              <input type="checkbox" />
            </th>
            <th className="px-6 py-3">SN</th>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Agent</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {allCompanies.map((val: CompanyType, index) => (
            <tr className="bg-white border-b" key={index}>
              <td className="px-6 py-4">
                <input type="checkbox" />
              </td>
              <td className="px-6 py-3 capitalize">{index + 1}</td>
              <td className="px-6 py-3 ">
                <img
                  src={`http://localhost:4002/public/${
                    val.image ? val.image : "placeholder.png"
                  }`}
                  className="object-cover w-10 h-10 rounded-full"
                />
              </td>
              <td className="px-6 py-3 capitalize">{val?.company_name}</td>
              <td className="px-6 py-3 capitalize">{val?.agent_name}</td>
              <td className="px-6 py-3 lowercase">{val?.company_phone}</td>
              <td className="px-6 py-3 lowercase">{val?.company_email}</td>
              <td className="flex gap-2 px-6 py-3">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentCompany(val);
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

      {currentCompany &&
        selectedTechnology &&
        selectedLocation &&
        selectedCategory &&
        selectedBenefit && (
          <EditCompany
            currentCompany={currentCompany}
            setCurrentCompany={setCurrentCompany}
            selectedTechnology={selectedTechnology}
            setSelectedTechnology={setSelectedTechnology}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedBenefit={selectedBenefit}
            setSelectedBenefit={setSelectedBenefit}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
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

export default CompanyTable;
