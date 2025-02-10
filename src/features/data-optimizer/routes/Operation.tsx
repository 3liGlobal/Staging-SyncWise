import contactIcon from "../../../assets/images/data-optimizer/users.svg";
import mergeIcon from "../../../assets/images/data-optimizer/merge.svg";
import Card from "../components/Card.tsx";
import { useNavigate } from "react-router-dom";

const getUrl = (operation?: string, crm?: string, module?: string) => {
  switch (operation) {
    case "data-merge":
      return `/data-optimizer/merge?crm=${crm}&module=${module}&operation=data-merge`;
    case "bulk-delete":
      return `/data-optimizer/delete?crm=${crm}&module=${module}&operation=bulk-delete`;
    case "auto-delete":
      return `/data-optimizer/auto-delete?crm=${crm}&module=${module}&operation=auto-delete`;
    case "data-enrichment":
      return `/data-optimizer/enrich?crm=${crm}&module=${module}&operation=data-enrichment`;
    case "audit-log":
      return `/data-optimizer/audit?crm=${crm}&module=${module}&operation=audit-log`;
    case "data-standardization":
      return `/data-optimizer/standardize?crm=${crm}&module=${module}&operation=data-standardization`;
    default:
      return null;
  }
};

const operations = [
  {
    id: "data-merge",
    icon: mergeIcon,
    description: "Combine duplicate records.",
    name: "Data Merging",
    active: true,
  },
  {
    id: "bulk-delete",
    icon: contactIcon,
    description: "Remove multiple records at once.",
    name: "Bulk Delete",
    active: false,
  },
  {
    id: "auto-delete",
    icon: contactIcon,
    description: "Automate regular deletion tasks.",
    name: "Auto Delete",
    active: false,
  },
  {
    id: "data-enrichment",
    icon: contactIcon,
    description: "Enhance records with additional data.",
    name: "Data Enrichment",
    active: false,
  },
  {
    id: "audit-log",
    icon: contactIcon,
    description: "Track all data cleaning actions.",
    name: "Audit Log",
    active: false,
  },
  {
    id: "data-standardization",
    icon: contactIcon,
    description: "Keep data formats consistent.",
    name: "Data Standardization",
    active: false,
  },
];
export default function Operation() {
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col gap-4 sm:gap-6">
      <h2 className="text-blue-950 font-semibold text-lg md:text-xl lg:text-2xl">
        Select the operation you want to perform
      </h2>
      <div className="h-full overflow-y-scroll hide-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7">
          {operations.map((operation) => (
            <Card
              image={operation.icon}
              heading={operation.name}
              description={operation.description}
              active={operation.active}
              onClick={() => {
                const searchParams = new URLSearchParams(
                  window.location.search,
                );
                const crm = searchParams.get("crm") ?? undefined;
                const module = searchParams.get("module") ?? undefined;
                const url = getUrl(operation.id, crm, module);
                if (operation.active && url) {
                  navigate(url);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
