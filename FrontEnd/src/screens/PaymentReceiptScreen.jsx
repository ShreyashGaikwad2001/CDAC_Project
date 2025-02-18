import { useEffect } from "react";
import PaymentRecipt from "../components/PaymentReceipt";
import html2pdf from 'html2pdf.js';
import { toast } from "react-toastify";
import QRCode from "react-qr-code";
import {backend} from '../config'

export default function PaymentReciptScreen() {
    const storedBooking = sessionStorage.getItem("lastBooking");
    const bookingDetails = storedBooking ? JSON.parse(storedBooking) : null;

    const printHandler = () => {
        const paymentRecipt = document.getElementById('paymentRecipt');
        html2pdf().from(paymentRecipt).save();
    };

    useEffect(() => {
        toast.info('Please Save Your Ticket By Printing It!');
    }, []);

    // QR Code Generator using txnId
    const qrData = bookingDetails?.txnId
        ? backend.url+`booking/${bookingDetails.txnId}`
        : backend.url;

    return (
        <>
            <div className="text-center">
                {bookingDetails ? (
                    <div style={{position: "relative"}}>
                    <button className="btn btn-primary btn-lg m-5 p-3" onClick={printHandler}
                            style={{ position: "absolute", top: "0", right: "0", zIndex: "1" }}>
                        Print
                    </button>
                    <PaymentRecipt
                        userName={bookingDetails.userName || "Guest"}
                        bookingTime={new Date(bookingDetails.bookingTime).toLocaleString()}
                        fromTime={new Date(bookingDetails.startDate).toLocaleString()}
                        toTime={new Date(bookingDetails.endDate).toLocaleString()}
                        amount={bookingDetails.payment || "0"}
                        txnId={bookingDetails.txnId || "N/A"}
                        qrData={() => (
                            <div className="d-flex justify-content-center py-3">
                                <div style={{ height: "12em", width: "12em", boxShadow: "-2px -3px 15px -1px rgba(0,0,0,0.58)" }}>
                                    <QRCode size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={qrData} />
                                </div>
                            </div>
                        )}
                        greetings="Thank you, your booking is confirmed!"
                    />
                    </div>
                ) : (
                    <p className="text-danger">No booking details available.</p>
                )}
            </div>
        </>
    );
}
