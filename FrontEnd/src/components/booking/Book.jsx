import React, { useState } from "react";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "./Book.css";

function Book({ onBookingHandler, slot }) {
  const [date, setDate] = useState(new Date());

  const [startTime, setStartTime] = useState(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  });

  const [endTime, setEndTime] = useState(() => {
    const now = new Date();
    const hours = String(now.getHours() + 3).padStart(2, "0"); // Add 1 hour
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  });

  const [sectionId, setSectionId] = useState(0);
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleChargeRate, setVehicleChargeRate] = useState(0);
  const [selection, setSelection] = useState("");

  const handleSubmit = (e) => {
    const startDateTime = new Date(date);
    const [startHour, startMinute] = startTime.split(":");
    startDateTime.setHours(startHour, startMinute);

    const endDateTime = new Date(date);
    const [endHour, endMinute] = endTime.split(":");
    endDateTime.setHours(endHour, endMinute);

    const bookingData = {
      sectionId: sectionId,
      startDate: startDateTime.toISOString(),
      endDate: endDateTime.toISOString(),
      payment: vehicleChargeRate,
      vehicleType: vehicleType,
    };

    onBookingHandler(bookingData);

    console.log(bookingData);
  };

  return (
    <section className="container-fluid book-container">
      <section className="row justify-content-center">
        <section className="p-5 shadow-lg rounded">
          <h2 className="text-center mb-4">Book Your Spot</h2>
          <div className="form-group p-6">
            <label htmlFor="startDate" className="fs-3">
              Start Date
            </label>
            <Calendar
              id="startDate"
              value={date}
              onChange={setDate}
              minDate={new Date()}
              className="w-100 mb-3"
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="startTime">Start Time</label>
                <TimePicker
                  id="startTime"
                  value={startTime}
                  onChange={setStartTime}
                  className="w-100 form-control fs-4"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="endTime">End Time</label>
                <TimePicker
                  id="endTime"
                  value={endTime}
                  onChange={setEndTime}
                  className="w-100 form-control fs-4"
                />
              </div>
            </div>
          </div>
          <div className="form-group m-4 row">
            <select
              id="vehicleType"
              className="form-select text-center col"
              value={selection}
              onChange={(e) => {
                setSelection(e.target.value);
                const par = e.target.value.split(":");
                setSectionId(par[0]);
                setVehicleType(par[1]);
                setVehicleChargeRate(par[2]);
              }}
            >
              <option value="">Select Vehicle Type</option>
              {slot.sections.map((section) => (
                <option
                  value={
                    section.id + ":" + section.vehicleType + ":" + section.chargeRate
                  }
                  key={section.id}
                >
                  {section.vehicleType} ₹{section.chargeRate}/hr
                </option>
              ))}
            </select>
            <button
              className="btn btn-primary btn-lg col mx-3"
              onClick={handleSubmit}
            >
              Book Now
            </button>
          </div>
        </section>
      </section>
    </section>
  );
}

export default Book;
