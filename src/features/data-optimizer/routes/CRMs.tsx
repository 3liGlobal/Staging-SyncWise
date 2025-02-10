import hubspotIcon from "../../../assets/images/data-optimizer/hubspot.svg";
import zendeskIcon from "../../../assets/images/data-optimizer/zendesk.svg";
import zohoIcon from "../../../assets/images/data-optimizer/zoho.svg";
import CRMCard from "../components/CRMCard.tsx";
const crms = [
  {
    id: "hubspot",
    icon: hubspotIcon,
    name: "HubSpot",
  },
  {
    id: "zendesk",
    icon: zendeskIcon,
    name: "Zendesk",
  },
  {
    id: "zoho",
    icon: zohoIcon,
    name: "Zoho",
  },
];
export default function CRMs() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <h2 className="text-blue-950 font-semibold text-lg md:text-xl lg:text-2xl">
        Select Your CRM To Start The Data Optimization
      </h2>
      <div className="h-full overflow-y-scroll hide-scrollbar">
        <div className="p-2 flex gap-8 sm:gap-12 flex-wrap">
          {crms.map((crm) => (
            <CRMCard
              key={crm.id}
              image={crm.icon}
              heading={crm.name}
              id={crm.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
