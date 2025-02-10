import hubspotIcon from "../../../assets/images/data-optimizer/hubspot.svg";
import zendeskIcon from "../../../assets/images/data-optimizer/zendesk.svg";
import AppCard from "../components/AppCard.tsx";

const apps = [
  {
    id: "share-point",
    icon: hubspotIcon,
    name: "Share Point",
    active: true,
  },
  {
    id: "drive",
    icon: zendeskIcon,
    name: "Drive",
    active: false,
  },
];
export default function Apps() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <h2 className="text-blue-950 font-semibold text-lg md:text-xl lg:text-2xl">
        Select Your App To Start The Data Migration
      </h2>
      <div className="h-full overflow-y-scroll hide-scrollbar">
        <div className="p-2 flex gap-8 sm:gap-12 flex-wrap">
          {apps.map((app) => (
            <AppCard
              key={app.id}
              image={app.icon}
              heading={app.name}
              id={app.id}
              active={app.active}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
