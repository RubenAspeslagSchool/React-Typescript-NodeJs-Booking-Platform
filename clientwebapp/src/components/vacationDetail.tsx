import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../data/apiWrapper";
import type { Vacation } from "../domain/Vacation";
import type { DestinationVacation } from "../domain/DestinationVacation";
import type { Destination } from "../domain/Destination";

export function VacationDetail() {
  const { id } = useParams<{ id: string }>();
  const vacationId = Number(id);

  const [vacation, setVacation] = useState<Vacation | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!vacationId) return;

    async function fetchData() {
      try {
        // Get vacation info
        const v = await api.vacations.getById(vacationId);
        setVacation(v);

        // Get all destination-vacation links and filter for this vacation
        const dvList: DestinationVacation[] = await api.destinationVacations.getAll();
        const filtered = dvList.filter(dv => dv.vacation_id === vacationId);

        // Fetch each destination's details
        const destPromises = filtered.map(dv => api.destinations.getById(dv.destination_id));
        const dests = await Promise.all(destPromises);

        setDestinations(dests);
      } catch (err) {
        console.error("Failed to fetch vacation detail", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [vacationId]);

  if (loading) return <p>Loading...</p>;
  if (!vacation) return <p>Vacation not found.</p>;

  return (
    <div>
      <h1>{vacation.name}</h1>
      <p>{vacation.description}</p>

      <h2>Destinations</h2>
      {destinations.length > 0 ? (
  <div className="row">
    {destinations.map(dest => (
      <div className="col-md-4 mb-4" key={dest.id}>
        <div className="card h-100 shadow-sm">
          <img src={dest.img} className="card-img-top" alt="img" />
          <div className="card-body">
            <h5 className="card-title">{dest.name}</h5>
            <p className="card-text">{dest.description}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <p>No destinations linked to this vacation.</p>
)}
    </div>
  );
}