"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const activeFilter = searchParams.get("capacity") ?? "all";

  const pathname = usePathname();

  const onClick = (filter) => {
    const params = new URLSearchParams(searchParams);

    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="border border-primary-800 flex">
      <button
        className=" px-5 py-2 hover:bg-primary-700"
        onClick={() => onClick("all")}
      >
        {" "}
        All cabins{" "}
      </button>
      <button
        className=" px-5 py-2 hover:bg-primary-700 "
        onClick={() => onClick("small")}
      >
        {" "}
        1 &mdash; 3 guests{" "}
      </button>
      <button
        className=" px-5 py-2 hover:bg-primary-700 "
        onClick={() => onClick("medium")}
      >
        {" "}
        4 &mdash; 7 guests{" "}
      </button>
      <button
        className=" px-5 py-2 hover:bg-primary-700 "
        onClick={() => onClick("large")}
      >
        {" "}
        8 &mdash; 12 guests{" "}
      </button>
    </div>
  );
}

function Button({ filter, onClick, activeFilter, children }) {
  return (
    <button
      onClick={() => onClick(filter)}
      className={`  px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
      }  `}
    >
      {children}
    </button>
  );
}

export default Filter;
