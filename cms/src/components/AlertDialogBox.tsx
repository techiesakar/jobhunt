import { Button } from "@/components/ui/button";

import { ReloadIcon } from "@radix-ui/react-icons";

type Props = {
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setDeletingID: any;
};

const AlertDialogBox: React.FC<Props> = ({
  setConfirmDelete,
  loading,
  setOpenDelete,
  setDeletingID,
}) => {
  return (
    <div className="w-screen fixed inset-0 h-screen flex justify-center items-center bg-white/80 z-50">
      <div className="bg-white p-6 rounded-lg flex flex-col space-y-3 border border-gray-300 w-full sm:max-w-[32rem]">
        <div className="flex flex-col space-y-4 text-center sm:text-left">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            Are you absolutely sure ?
          </h2>

          <p className="text-sm">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </p>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button
              onClick={() => {
                setDeletingID("");
                setOpenDelete(false);
                setConfirmDelete(false);
              }}
              variant={"outline"}
            >
              Cancel
            </Button>

            {loading ? (
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setConfirmDelete(true);
                }}
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDialogBox;
