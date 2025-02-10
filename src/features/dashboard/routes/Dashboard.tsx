import {
  DonutChart,
  LineChart,
  Button,
} from "../../../../libs/lib-sync-wise-ui";
import Card from "../components/Card.tsx";
import { formatTimeAgo } from "../../../../libs/lib-sync-wise-utils";
import activityLine from "../../../assets/images/dashboard/activity-line.svg";
import endLine from "../../../assets/images/dashboard/line-end.svg";
import completed from "../../../assets/images/dashboard/completed-backup.svg";
import failed from "../../../assets/images/dashboard/failed-backup.svg";
import restored from "../../../assets/images/dashboard/restore-backup.svg";
import user from "../../../assets/images/dashboard/user-icon.svg";
import ticket from "../../../assets/images/dashboard/ticket-icon.svg";
import organization from "../../../assets/images/dashboard/organization-icon.svg";
import trash from "../../../assets/images/dashboard/trash.svg";
import ProgressCircle from "../components/progresscircle.tsx";

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    line: {
      tension: 0.3,
      borderWidth: 3,
      spanGaps: true,
      borderCapStyle: "round",
      borderColor: "#DEDCF8",
    },
  },
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        color: "#C5BFF3",
      },
    },
    y: {
      display: false,
      ticks: {
        display: false,
      },
    },
  },
};

const lineChartLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const lineChartDatasets = [
  {
    data: [20, 37, 18, 32, 25, 42, 36],
    borderColor: "#DEDCF8",
    pointRadius: 0,
    pointHoverRadius: 7,
    pointHoverBackgroundColor: "#DEDCF8",
    pointHoverBorderColor: "#DEDCF8",
  },
];

const donutChartOptions = {
  cutout: "70%",
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1,
  doughnutSize: 1,
  plugins: {
    legend: {
      display: true,
      position: "right",
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
  },
};

const donutChartData = {
  labels: ["Users", "Tickets", "Organizations", "Over all "],
  datasets: [
    {
      data: [31, 14, 19, 36],
      backgroundColor: ["#4C2BBF", "#6342E5", "#9890F5", "#D8D8FC"],
      borderColor: ["#ffffff", "#ffffff"],
      hoverBorderColor: ["#ffffff", "#ffffff"],
      borderWidth: 5,
      borderRadius: 5,
    },
  ],
};

const activities = [
  {
    id: 1,
    date: "2024-07-25T10:55:00Z",
    status: "completed",
    module: "Overall Backups",
  },
  {
    id: 2,
    date: "2024-07-23T14:55:00Z",
    status: "failed",
    module: "Tickets Backups",
  },
  {
    id: 3,
    date: "2024-06-23T14:55:00Z",
    status: "restored",
    module: "Contacts Backup",
  },
  {
    id: 4,
    date: "2024-07-25T10:55:00Z",
    status: "completed",
    module: "Overall Backups",
  },
  {
    id: 5,
    date: "2024-07-23T14:55:00Z",
    status: "failed",
    module: "Tickets Backups",
  },
];

const stats = [
  {
    module: "Users",
    backedupValue: 560,
    notBackedupValue: 1326,
    total: 2103,
    icon: user,
  },
  {
    module: "Tickets",
    backedupValue: 1256,
    notBackedupValue: 2030,
    total: 3298,
    icon: ticket,
  },
  {
    module: "Organizations",
    backedupValue: 325,
    notBackedupValue: 998,
    total: 1354,
    icon: organization,
  },
];

const planPointers = [
  "2 Gb Storage",
  "Unlimited Backups",
  "Unlimited Restores",
  "Lorem Ipsum",
  "Lorem ipsum",
];

export default function Dashboard() {
  return (
    <div className="mx-4 px-2 sm:mx-12 py-3 flex flex-col gap-7 h-full overflow-y-scroll hide-scrollbar">
      <div className="w-full flex flex-col md:flex-row gap-7">
        <div className="w-full md:w-1/3 p-4 3xl:p-7 flex-1 flex bg-dashboard-widget rounded-b-2xl shadow-dashboard-widget">
          <div className="flex flex-col gap-5 w-full h-full">
            <div>
              <h1 className="text-4xl 3xl:text-7xl text-white font-light">
                219
              </h1>
              <p className="text-base 3xl:text-lg text-purple-10">
                Total Backups Found
              </p>
            </div>
            <div className="w-full h-full">
              <LineChart
                data={{ labels: lineChartLabels, datasets: lineChartDatasets }}
                options={lineChartOptions}
              />
            </div>
          </div>
        </div>
        <div className="bg-white w-full md:w-1/3 p-4 3xl:p-7 flex-1 flex rounded-b-2xl shadow-dashboard-widget">
          <div className="w-full flex flex-col gap-8">
            <h3 className="text-grey-900 text-base lg:text-lg 3xl:text-xl">
              Memory Used
            </h3>
            <DonutChart
              data={donutChartData}
              options={donutChartOptions}
              centerData={"1.36 Gb / 2 Gb Used"}
            />
          </div>
        </div>
        <div className="hidden bg-white w-1/3 relative p-4 3xl:p-7 flex-1 2xl:flex rounded-b-2xl shadow-dashboard-widget">
          <div className="w-full flex flex-col gap-8">
            <h3 className="text-grey-900 text-base lg:text-lg 3xl:text-xl">
              Active Subscription Plan
            </h3>
            <div className="h-full flex justify-between">
              <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col gap-4">
                  <h2 className="text-lg lg:text-2xl 3xl:text-5xl font-medium">
                    $250.<span className="text-lg 3xl:text-2xl">00</span>
                  </h2>
                  <h3 className="text-base 3xl:text-2xl font-light text-primary-hover">
                    Silver Plan
                  </h3>
                </div>
                <Button
                  type={"button"}
                  variant={"primary"}
                  extraClasses="text-sm px-6"
                >
                  View Details
                </Button>
              </div>
              <div className="mr-[-16px] 3xl:mr-[-28px] h-fit rounded-l-lg bg-purple-20 pr-3 3xl:pr-6 pl-8 py-4">
                <ul style={{ listStyleType: "disc" }}>
                  {planPointers.map((point, index) => (
                    <li
                      key={index}
                      className="text-sm 3xl:text-base whitespace-nowrap"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col 2xl:flex-row gap-7">
        <div className=" order-3 2xl:order-1 2xl:w-2/5 flex flex-col">
          <Card extraClasses="flex flex-col overflow-y-auto hide-scrollbar">
            <div className="w-full flex flex-col gap-5">
              <h2 className="text-lg 3xl:text-2xl font-medium text-blue-950">
                Recent Activity
              </h2>
              <div className="w-full">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="w-full min-w-[300px] flex gap-4 sm:gap-10"
                  >
                    <span className="pt-3 w-[100px] sm:w-[130px] text-sm text-gray-600 font-normal">
                      {formatTimeAgo(activity.date)}
                    </span>
                    <div className="relative w-[50px]">
                      <img
                        src={index === 4 ? endLine : activityLine}
                        alt="line"
                        className="min-w-[48px]"
                      />
                      <img
                        src={
                          activity.status === "completed"
                            ? completed
                            : activity.status === "restored"
                              ? restored
                              : failed
                        }
                        alt="icon"
                        className={`absolute z-20 ${
                          activity.status === "completed"
                            ? "top-[10px] left-[11px]"
                            : activity.status === "restored"
                              ? "top-[9px] left-[9px]"
                              : "top-[12px] left-[14px]"
                        }`}
                      />
                    </div>
                    <div style={{ width: "" }} className="">
                      <h3 className="w-[140px] sm:w-full text-base font-medium text-blue-950 line-clamp-1">
                        {activity.status === "completed"
                          ? "Backup Completed"
                          : activity.status === "restored"
                            ? "Backup Restored"
                            : "Backup Failed"}
                      </h3>
                      <p className="w-[140px] text-sm font-medium text-grey-600 line-clamp-1">
                        {activity.module}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
        <div className="order-1 2xl:order-2 2xl:w-2/5 flex flex-col md:flex-row 2xl:flex-col gap-7">
          {stats.map((stat) => (
            <Card extraClasses="w-full py-5 items-center">
              <div className="w-full h-full flex flex-col 2xl:flex-row 2xl:items-center gap-6 2xl:gap-2">
                <div className="flex flex-col gap-1 w-full 2xl:w-[230px]">
                  <h2 className="text-lg 3xl:text-2xl font-semibold text-grey-900">
                    {stat.total}
                  </h2>
                  <p className="texte-base 3xl:text-xl font-normal text-grey-900">
                    {stat.module} Found
                  </p>
                </div>
                <div className="flex flex-grow justify-between items-center">
                  <ProgressCircle
                    key={stat.total}
                    value={(stat.backedupValue / stat.total) * 100}
                    icon={stat.icon}
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col items-end gap-1">
                      <h3 className="text-sm font-semibold text-grey-900">
                        {stat.backedupValue}
                      </h3>
                      <p className="text-xs font-normal text-grey-900 text-right">
                        {stat.module} Backed up
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <h3 className="text-sm font-semibold text-grey-900">
                        {stat.notBackedupValue}
                      </h3>
                      <p className="text-xs font-normal text-grey-900 text-right">
                        Ready To Backup
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="order-2 2xl:order-3 2xl:w-1/5 flex flex-col md:flex-row 2xl:flex-col gap-7">
          <Card extraClasses="py-7 flex items-center justify-center">
            <div className="flex flex-col items-center justify-between gap-4 3xl:gap-7">
              <h1 className="text-3xl 3xl:text-5xl font-medium text-blue-950">
                1021
              </h1>
              <p className="text-base 3xl:text-lg font-light text-blue-950 text-center">
                Items Left To Backup
              </p>
              <Button type={"button"} variant={"primary"}>
                Backup Now
              </Button>
            </div>
          </Card>
          <Card extraClasses="py-7 flex items-center justify-center">
            <div className="flex flex-col items-center justify-between gap-4 3xl:gap-7">
              <img
                src={trash}
                alt="trash"
                className="w-[40px] h-[40px] 3xl:w-[60px] 3xl:h-[60px]"
              />
              <h1 className="text-3xl 3xl:text-5xl font-medium text-blue-950">
                105
              </h1>
              <p className="text-base 3xl:text-lg font-light text-blue-950 text-center">
                Backups Found In Trash
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
