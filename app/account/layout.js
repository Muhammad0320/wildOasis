import SideNavigation from "@/app/_components/SideNavigation";

export default function AccountLayout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr]  h-full gap-12 ">
      <div>
        {" "}
        <SideNavigation />{" "}
      </div>
      <div className="py-2"> {children} </div>
    </div>
  );
}
