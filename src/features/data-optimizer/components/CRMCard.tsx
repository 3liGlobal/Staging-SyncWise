import { useNavigate } from "react-router-dom";

type PropType = {
  image: string;
  heading: string;
  id: string;
};
export default function CRMCard({ image, heading, id }: PropType) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 items-center">
      <div
        className="p-4 rounded-full bg-purple-50 shadow-crm-card cursor-pointer"
        onClick={() => navigate(`/data-optimizer/modules?crm=${id}`)}
      >
        <img src={image} alt="crm icon" className="w-[50px] h-[50px]" />
      </div>
      <h2 className="flex justify-center items-center text-blue-950 font-semibold text-base lg:text-lg">
        {heading}
      </h2>
    </div>
  );
}
