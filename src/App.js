import { BiCalendar } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import appintmentList from "./data.json";
import AppointmentInfo from "./components/AppointmentInfo";
function App() {
  return (
    <div className="container mx-auto mt-5 font-thin">
      <h2 className="text-5xl mb-5">
        <BiCalendar className="inline-block text-blue-400 align-top" /> Your
        appintments
      </h2>
      <AddAppointment />
      <Search />
      <ul className="divide-y divide-gray-200">
        {appintmentList.map((appointment) => {
          return (
            <AppointmentInfo key={appointment.id} appointment={appointment} />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
