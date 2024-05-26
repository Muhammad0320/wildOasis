import Cabin from "@/app/_components/Cabin";
import Reservations from "@/app/_components/Reservations";
import { getCabin, getCabins } from "@/app/_lib/data-service";

export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinId);

  return {
    title: `Cabin ${cabin.name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-400 mb-10 ">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      </div>

      <Reservations cabin={cabin} />
    </div>
  );
}
