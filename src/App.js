import React, { useState, useEffect, useCallback } from "react";
import { BiCalendar } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";

function App() {
  const [appointmentList, setAppointmentList] = useState([]);
  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => setAppointmentList(data));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("petName");
  const [orderBy, setOrderBy] = useState("asc");

  const filteredAppointments = appointmentList
    .filter((item) => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  return (
    <div className="container mx-auto mt-5 font-thin">
      <h2 className="text-5xl mb-5">
        <BiCalendar className="inline-block text-blue-400 align-top" /> Your
        appintments
      </h2>
      <AddAppointment />
      <Search
        query={query}
        onQueryChange={(newQuery) => {
          setQuery(newQuery);
        }}
      />
      <ul className="divide-y divide-gray-200">
        {filteredAppointments.map((appointment) => {
          return (
            <AppointmentInfo
              key={appointment.id}
              appointment={appointment}
              onDeleteAppointment={(appointmentId) => {
                setAppointmentList(
                  appointmentList.filter(
                    (appointment) => appointment.id !== appointmentId
                  )
                );
              }}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
