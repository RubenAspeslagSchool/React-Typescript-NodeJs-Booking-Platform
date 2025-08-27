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

    <div className="vacations-container">
      {vacations.map((v) => (
        <div className="vacation-card" key={v.id}>
           <img src={v.img} className="card-img-top" alt="img" />
          <h2>{v.name}</h2>
          <p>{v.description}</p>
          <a href={`/vacations/${v.id}`} className="vacation-link">View Details</a>
        </div>))}
    </div>    
  </div>
  );
}