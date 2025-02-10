import hubspotIcon from "../../../assets/images/data-optimizer/hubspot.svg";
import zendeskIcon from "../../../assets/images/data-optimizer/zendesk.svg";
import zohoIcon from "../../../assets/images/data-optimizer/zoho.svg";
import { ChangeEvent, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../../../libs/lib-sync-wise-ui";
import { SearchBar } from "../../../../libs/lib-sync-wise-ui/search-bar/search-bar.tsx";
import {
  capitalizeAndRemoveHyphen,
  capitalizeString,
} from "../../../../libs/lib-sync-wise-utils";
import { format } from "date-fns";

type CrmName = "hubspot" | "zendesk" | "zoho";

type CrmIcons = {
  [key in CrmName]: string;
};

type MigrationHistory = {
  id: number;
  crm: CrmName;
  module: string;
  operation: string;
  property: string;
  time: string;
  status: string;
};

const history: MigrationHistory[] = [
  {
    id: 1,
    crm: "hubspot",
    module: "contact",
    operation: "merging",
    property: "email",
    time: "2024-10-01T10:00:00.000Z",
    status: "progress",
  },
  {
    id: 2,
    crm: "zoho",
    module: "deals",
    operation: "bulk-delete",
    property: "deal_id",
    time: "2024-09-28T14:30:00.000Z",
    status: "completed",
  },
  {
    id: 3,
    crm: "zendesk",
    module: "tickets",
    operation: "auto-delete",
    property: "ticket_id",
    time: "2024-09-29T09:45:00.000Z",
    status: "completed",
  },
  {
    id: 4,
    crm: "hubspot",
    module: "companies",
    operation: "data-enrichment",
    property: "company_name",
    time: "2024-09-30T08:00:00.000Z",
    status: "completed",
  },
  {
    id: 5,
    crm: "zoho",
    module: "contacts",
    operation: "data-standardization",
    property: "phone_number",
    time: "2024-10-02T11:15:00.000Z",
    status: "failed",
  },
  {
    id: 6,
    crm: "zendesk",
    module: "deals",
    operation: "merging",
    property: "deal_stage",
    time: "2024-10-01T13:30:00.000Z",
    status: "failed",
  },
  {
    id: 7,
    crm: "hubspot",
    module: "tickets",
    operation: "bulk-delete",
    property: "ticket_status",
    time: "2024-09-30T10:20:00.000Z",
    status: "completed",
  },
  {
    id: 8,
    crm: "zoho",
    module: "companies",
    operation: "auto-delete",
    property: "industry",
    time: "2024-09-30T16:00:00.000Z",
    status: "completed",
  },
  {
    id: 9,
    crm: "zendesk",
    module: "contacts",
    operation: "data-enrichment",
    property: "email",
    time: "2024-10-01T14:45:00.000Z",
    status: "failed",
  },
  {
    id: 10,
    crm: "hubspot",
    module: "deals",
    operation: "data-standardization",
    property: "close_date",
    time: "2024-09-27T11:00:00.000Z",
    status: "completed",
  },
  {
    id: 11,
    crm: "zoho",
    module: "tickets",
    operation: "merging",
    property: "ticket_priority",
    time: "2024-09-26T15:45:00.000Z",
    status: "completed",
  },
  {
    id: 12,
    crm: "zendesk",
    module: "companies",
    operation: "bulk-delete",
    property: "company_size",
    time: "2024-09-25T13:15:00.000Z",
    status: "completed",
  },
  {
    id: 13,
    crm: "hubspot",
    module: "contacts",
    operation: "auto-delete",
    property: "last_contacted",
    time: "2024-09-30T14:00:00.000Z",
    status: "completed",
  },
  {
    id: 14,
    crm: "zoho",
    module: "deals",
    operation: "data-enrichment",
    property: "deal_value",
    time: "2024-09-29T10:30:00.000Z",
    status: "failed",
  },
  {
    id: 15,
    crm: "zendesk",
    module: "tickets",
    operation: "data-standardization",
    property: "response_time",
    time: "2024-09-26T12:00:00.000Z",
    status: "completed",
  },
];

const icons: CrmIcons = {
  hubspot: hubspotIcon,
  zendesk: zendeskIcon,
  zoho: zohoIcon,
};

export default function MigrationHistory() {
  const [searchValues, setSearchValue] = useState("");
  const columns = useMemo<ColumnDef<MigrationHistory>[]>(
    () => [
      {
        header: "CRM",
        accessorFn: (row) => row.crm,
        id: "crm",
        cell: (info) => (
          <div className="flex gap-4 items-center">
            <div className="bg-grey-80 w-10 h-10 rounded-full flex items-center justify-center">
              <img
                src={icons[info.row.original.crm]}
                alt="crm icon"
                className="w-[22px] h-[22px]"
              />
            </div>
            <span className="opacity-80">
              {capitalizeString(String(info.getValue()))}
            </span>
          </div>
        ),
      },
      {
        header: "Module",
        accessorFn: (row) => row.module,
        id: "module",
        cell: (info) => (
          <span className="opacity-80">
            {capitalizeString(String(info.getValue()))}
          </span>
        ),
      },
      {
        header: "Operation",
        accessorFn: (row) => row.operation,
        id: "operation",
        cell: (info) => (
          <span className="opacity-80">
            {capitalizeAndRemoveHyphen(String(info.getValue()))}
          </span>
        ),
      },
      {
        header: "Property",
        accessorFn: (row) => row.property,
        id: "property",
        cell: (info) => (
          <span className="opacity-80">{info.row.original.property}</span>
        ),
      },
      {
        header: "Date - Time",
        accessorFn: (row) => row.time,
        id: "time",
        cell: (info) => {
          const date = new Date(info.row.original.time);
          const formatedDate = format(date, "dd.MM.yyyy - hh:mm a");
          return <span className="opacity-80">{formatedDate}</span>;
        },
      },
      {
        header: "Status",
        accessorFn: (row) => row.status,
        id: "status",
        cell: (info) => {
          const statusText = capitalizeString(info.row.original.status);
          let backgroundColor = "bg-gray-500";

          switch (info.row.original.status) {
            case "completed":
              backgroundColor = "bg-primary-normal";
              break;
            case "progress":
              backgroundColor = "bg-yellow-400";
              break;
            case "failed":
              backgroundColor = "bg-red-600";
              break;
          }
          return (
            <div
              className={`flex items-center justify-center py-3 px-8 rounded-[73.38px] max-w-[150px] text-base text-white font-semibold ${backgroundColor}`}
            >
              {statusText}
            </div>
          );
        },
      },
    ],
    [],
  );
  return (
    <div className="flex flex-col gap-4 sm:gap-6 h-full">
      <h2 className="text-blue-950 font-semibold text-lg md:text-xl lg:text-2xl">
        History
      </h2>
      <SearchBar
        expanded={true}
        id="dashboard-search"
        placeholder="Search"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value.trim())
        }
      />
      <Table<MigrationHistory>
        columns={columns}
        data={history || []}
        globalFilter={searchValues}
        setGlobalFilter={setSearchValue}
      />
    </div>
  );
}
