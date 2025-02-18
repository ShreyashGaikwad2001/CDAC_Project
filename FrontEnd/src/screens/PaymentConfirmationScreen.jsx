import { FaCreditCard, FaWallet, FaMoneyBillAlt } from "react-icons/fa";
import QRCode from "react-qr-code";
import PaymentRecipt from "../components/PaymentReceipt";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../axios';
import {backend} from '../config';
import { toast } from "react-toastify";



export default function PaymentConfirmationScreen({ data }) {
  const bookingDetails = data;
  
  
  const navigate = useNavigate();

  if (!bookingDetails) {
    return <h3 className="text-center">No Booking Data Found!</h3>;
  }

  const onConfirmHandler = async () => {        
    axios.post(backend.url+'parking/book', bookingDetails)
        .then((res)=>{
            sessionStorage.setItem("lastBooking", JSON.stringify({
              bookingTime: new Date(),
               txnId:res.data, ...bookingDetails}));
            navigate("/receipt");
        })
        .catch((err)=>{
            toast.error(err.message);
        });
    
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center mt-4">
          Booking Confirmation for {bookingDetails.userName}
        </h2>
        <div className="row">
          <div className="col-md-6">
            <PaymentRecipt
              userName={bookingDetails.userName}
              bookingTime={new Date(bookingDetails.startDate).toLocaleString()}
              fromTime={new Date(bookingDetails.startDate).toLocaleTimeString()}
              toTime={new Date(bookingDetails.endDate).toLocaleTimeString()}
              amount={bookingDetails.payment}
              qrData={() => {}}
              greetings="Please confirm to pay"
            />
          </div>
          <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
            <h4 className="text-center">Welcome, {bookingDetails.userName}!</h4>
            <p className="text-center">Start Date: {new Date(bookingDetails.startDate).toLocaleString()}</p>
            <p className="text-center">End Date: {new Date(bookingDetails.endDate).toLocaleString()}</p>
            <div className="d-flex justify-content-around w-100 m-4">
              <FaCreditCard size={48} color="green" />
              <FaWallet size={48} color="green" />
              <FaMoneyBillAlt size={48} color="green" />
            </div>
            <div
              style={{
                height: "12em",
                width: "12em",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={JSON.stringify(bookingDetails)}
                viewBox="0 0 256 256"
              />
            </div>
            <button className="btn btn-lg btn-success mt-4" onClick={onConfirmHandler}>Confirm Booking</button>
          </div>
        </div>
      </div>
    </>
  );
}
