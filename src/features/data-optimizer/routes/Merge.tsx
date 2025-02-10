import mergeIcon from "../../../assets/images/data-optimizer/merge.svg";
import cloudIcon from "../../../assets/images/data-optimizer/cloud.svg";
import progressIcon from "../../../assets/images/data-optimizer/progress.svg";
import successIcon from "../../../assets/images/data-optimizer/success.svg";
import failedIcon from "../../../assets/images/data-optimizer/failed.svg";
import { useNavigate } from "react-router-dom";
import { Button, SelectMenu } from "../../../../libs/lib-sync-wise-ui";
import { useState } from "react";

type MergingType = {
  recordCount?: number;
  field?: string;
  status?: string;
};

const fields = [
  {
    label: "First Name",
    value: "fname",
  },
  {
    label: "Last Name",
    value: "lname",
  },
  {
    label: "Email",
    value: "email",
  },
];
const mergingStats: MergingType = {
  recordCount: 1200,
  field: "lname",
  status: "in-progress",
  // status: "success",
  // status: "failed",
};
// const mergingStats: MergingType | null = null;
export default function Merge() {
  console.log(mergingStats && mergingStats.field);
  const [inputField, setInputField] = useState<string>(
    mergingStats?.field ?? "",
  );
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const crm = searchParams.get("crm") ?? undefined;
  const module = searchParams.get("module") ?? undefined;

  return (
    <div className=" h-full flex flex-col gap-4 sm:gap-6">
      <h2 className="text-blue-950 font-semibold text-lg md:text-xl lg:text-2xl">
        Define Property
      </h2>
      <div className="h-full flex flex-col gap-4 overflow-y-scroll hide-scrollbar">
        <div className="flex-grow py-2 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <div className="rounded-xl px-6 sm:px-8 py-8 bg-purple-50 flex flex-col gap-6">
              <img src={mergeIcon} alt="merge icon" className="h-16 w-16" />
              <SelectMenu
                id="field"
                placeholder="Select Property"
                options={fields}
                disabled={mergingStats?.status == "in-progress"}
                extraClasses="bg-white !outline-none border-none"
                value={fields.find((option) => option.value === inputField)}
                onChange={(selectedValue) => {
                  if (typeof selectedValue === "string") {
                    setInputField(selectedValue);
                  } else if (
                    selectedValue &&
                    typeof selectedValue === "object"
                  ) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    setInputField(selectedValue.value);
                  } else {
                    setInputField("");
                  }
                }}
              />
            </div>
            <div className="rounded-xl px-6 sm:px-8 py-8 bg-purple-50 w-full flex flex-col gap-2 sm:gap-4 flex-grow justify-center items-center">
              <h2 className="text-blue-950 font-semibold text-center text-lg md:text-xl lg:text-2xl">
                You are about to merge
                <br /> the{" "}
                <span className="text-purple-800">
                  {mergingStats.recordCount}
                </span>{" "}
                records.
              </h2>
              <p className="text-center text-grey-900 font-semibold text-sm lg:text-base ">
                <span className="text-red-500 text-right">*</span>This action
                cannot be undone.
              </p>
            </div>
          </div>
          {mergingStats && (
            <div className="p-8 bg-purple-50 rounded-xl flex flex-col gap-4 sm:gap-6">
              <h2 className="text-blue-950 font-semibold text-left text-lg md:text-xl lg:text-2xl">
                Merging Status
              </h2>
              <div className="my-auto flex flex-col gap-6 items-center">
                <div className="bg-purple-50 p-12 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] flex items-center justify-center rounded-full shadow-status">
                  {mergingStats.status == "in-progress" ? (
                    <div className="relative">
                      <img src={cloudIcon} alt="cloud icon" />
                      <div className="absolute left-1/2 top-11 sm:top-16 transform -translate-x-1/2 -translate-y-1/2">
                        <img
                          src={progressIcon}
                          alt="progress icon"
                          className="animate-progress-spin w-[40px] h-[40px] sm:w-auto sm:h-auto"
                        />
                      </div>
                    </div>
                  ) : mergingStats.status == "success" ? (
                    <img src={successIcon} alt="success icon" />
                  ) : (
                    <img src={failedIcon} alt="failed icon" />
                  )}
                </div>
                <p className="text-center text-grey-900 text-sm lg:text-base">
                  {mergingStats.status == "in-progress"
                    ? "In Progress"
                    : mergingStats.status == "success"
                      ? "Completed"
                      : "Failed"}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-end">
          <Button
            type={"button"}
            variant={"outline"}
            extraClasses="sm:max-w-[250px]"
            onClick={() =>
              navigate(`/data-optimizer/operations?crm=${crm}&module=${module}`)
            }
          >
            Back
          </Button>
          <Button
            type={"button"}
            variant={"primary"}
            extraClasses="sm:max-w-[250px]"
            disabled={!inputField || mergingStats?.status == "in-progress"}
            onClick={() => console.log(inputField)}
          >
            {mergingStats
              ? mergingStats.status == "in-progress"
                ? "Merging..."
                : mergingStats.status == "success"
                  ? "Start Merging"
                  : "Try Again"
              : "Start Merging"}
          </Button>
        </div>
      </div>
    </div>
  );
}
