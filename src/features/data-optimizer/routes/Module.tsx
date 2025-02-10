import contactIcon from "../../../assets/images/data-optimizer/users.svg";
import ticketIcon from "../../../assets/images/data-optimizer/tickets.svg";
import companyIcon from "../../../assets/images/data-optimizer/organizations.svg";
import dealIcon from "../../../assets/images/data-optimizer/deals.svg";
import Card from "../components/Card.tsx";
import { useNavigate } from "react-router-dom";

const modules = [
  {
    id: "contact",
    icon: contactIcon,
    name: "Contact",
  },
  {
    id: "ticket",
    icon: ticketIcon,
    name: "Tickets",
  },
  {
    id: "company",
    icon: companyIcon,
    name: "Company",
  },
  {
    id: "deal",
    icon: dealIcon,
    name: "Deals",
  },
];
export default function Module() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <h2 className="text-blue-950 font-semibold text-lg md:text-xl lg:text-2xl">
        Select Module
      </h2>
      <div className="h-full overflow-y-scroll hide-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7">
          {modules.map((module) => (
            <Card
              image={module.icon}
              heading={module.name}
              onClick={() => {
                const searchParams = new URLSearchParams(
                  window.location.search,
                );
                const crm = searchParams.get("crm");
                navigate(
                  `/data-optimizer/operations?crm=${crm}&module=${module.id}`,
                );
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
