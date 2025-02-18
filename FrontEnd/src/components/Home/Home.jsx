import React, { useState } from 'react';
import './home.css';
import Book from '../booking/Book';
import PaymentConfirmationScreen from '../../screens/PaymentConfirmationScreen';


const Home = ({lotData}) => {
  // const lotData = [
  //   { id: 1, name: "Slot A", location: "Sector 12, New Delhi", price: "₹50/hr" },
  //   { id: 2, name: "Slot B", location: "Connaught Place, New Delhi", price: "₹70/hr" },
  //   { id: 3, name: "Slot C", location: "Saket, New Delhi", price: "₹60/hr" },
  //   { id: 4, name: "Slot D", location: "Noida Sector 18, UP", price: "₹80/hr" }
  // ];


  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  if(!selectedSlot && !bookingData)
  return (
    <section className="home">
    <div className="overlay" />
    <div className="container col">
      <h2>Available Parking Slots</h2>
      <ul className="parkingList">
        {lotData.map((slot) => (
          <li key={slot.id} className="parkingItem row">
            <button
              onClick={() => setSelectedSlot(slot)}
              className="btn btn-outline-primary btn-block"
            >
              <div>
                <h4>{slot.address}</h4>
                <h4>Sections:</h4>
                <ul>
                  {slot.sections.map((section) => (
                    <li key={section.id}>
                      <p>
                        {section.vehicleType} &nbsp; Charge Rate: ₹
                        {section.chargeRate}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
else if(!bookingData)
  return (
    <Book onBookingHandler={setBookingData} slot={selectedSlot}/>
  );
else
  return(
    <PaymentConfirmationScreen data={bookingData} />
  )
};

export default Home;
