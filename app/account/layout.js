import SideNavigation from "@/app/_components/SideNavigation";

export default function AccountLayout({ children }) {
  <div className="grid grid-cols-[16rem_1fr] gap-12 h-full">
    <div>
      {" "}
      <SideNavigation />{" "}
    </div>
    <div className="py-2"> {children} </div>
  </div>;
}
