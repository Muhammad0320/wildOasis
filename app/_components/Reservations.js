import { Suspense } from "react";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import Spinner from "./Spinner";

const Reservations = async ({ cabin }) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className="grid grid-cols-2 min-h-[400px] border border-primary-800">
      <DateSelector
        settings={settings}
        bookedDated={bookedDates}
        cabin={cabin}
      />
      <Suspense fallback={<Spinner />}>
        <ReservationForm cabin={cabin} />
      </Suspense>
    </div>
  );
};

export default Reservations;
