import QRCode from "react-qr-code";
import GenericLightContainer from "./GenericLightContainer";
import { backend } from "../config";

export default function PaymentRecipt(props) {
  const {
    bookingTime,
    fromTime,
    toTime,
    amount,
    txnId,
    qrData = () => <QRCode value={backend.url} />,
    greetings,
  } = props;

  return (
    <GenericLightContainer
      className="container mt-5 py-4 text-center 
                        border bg-light border-success 
                        rounded shadow-sm"
      id="paymentRecipt"
    >
      <h1
        className="display-4 border-top pb-3 text-success"
        style={{ fontWeight: "500" }}
      >
        Parking Ticket
      </h1>
      <div className="mb-3">{qrData()}</div>
      <div className="my-3">
        <span
          className="text-success"
          style={{ fontSize: "1.2em" }}
        >
          Booked on :
        </span>
        <mark className="text-body-emphasis" style={{ fontSize: "1.5em" }}>
          {bookingTime}
        </mark>
      </div>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 mb-3">
          <label
            htmlFor="fromTime"
            className="form-label text-success"
            style={{ fontSize: "1.2em" }}
          >
            From :
          </label>
          <input
            type="text"
            id="fromTime"
            className="form-control text-center text-white bg-primary"
            style={{ fontSize: "1.5em" }}
            value={fromTime}
            readOnly
          />
        </div>
        <div className="col-md-6 mb-3">
          <label
            htmlFor="toTime"
            className="form-label text-success"
            style={{ fontSize: "1.2em" }}
          >
            To :
          </label>
          <input
            type="text"
            id="toTime"
            className="form-control text-center text-white bg-primary"
            style={{ fontSize: "1.5em" }}
            value={toTime}
            readOnly
          />
        </div>
      </div>
      <div className="border-bottom py-4">
        <span className="text-success" style={{ fontSize: "2em" }}>
          Amount : ₹ {amount}
        </span>
        <span
          className="text-body-emphasis d-block py-2"
          style={{ fontSize: "1em" }}
        >
          Booking-ID : {txnId}
        </span>
      </div>
      <span className="text-body-primary d-block mt-3">{greetings}</span>
    </GenericLightContainer>
  );
}
