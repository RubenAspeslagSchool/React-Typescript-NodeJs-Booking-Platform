import { useEffect, useState } from "react";
import { api } from "../data/apiWrapper";
import type { Vacation } from "../domain/Vacation";
import "./vacationList.css";

export function VacationsList() {
  const [vacations, setVacations] = useState<Vacation[]>([]);

  useEffect(() => {
    api.vacations.getAll().then(setVacations).catch(console.error);
  }, []);

  return (
  <div className="vacations-list">
    <div className="vacations-header">
      <h1>Vacations</h1>
      <p>Explore our exciting vacation packages!</p>
    </div>
    <div className="vacations-container">
      {vacations.map((v) => (
        <div className="vacation-card" key={v.id}>
          <h2>{v.name}</h2>
          <p>{v.description}</p>
          <a href={`/vacations/${v.id}`} className="vacation-link">View Details</a>
        </div>))}
    </div>    
  </div>
  );
}