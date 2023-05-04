import React from "react";
import "./style/ReservationCard.css";
import jsPDF from "jspdf";

const ReservationCard = ({ ele, id }) => {
  const BookingRecipt = () => {
    var doc = new jsPDF("p", "pt");

    doc.text(230, 40, "BOOKMYMEAL");
    doc.text(50, 100, "Restaurant Name: ");
    doc.text(200, 100, `${ele.resname}`);
    doc.text(50, 120, "Phone: ");
    doc.text(200, 120, `${ele.resphone}`);
    doc.text(50, 140, "People Count: ");
    doc.text(200, 140, `${ele.noofpeople}`);
    doc.text(50, 160, "Address: ");
    doc.text(200, 160, `${ele.resaddress}`);
    doc.text(50, 180, "Pincode: ");
    doc.text(200, 180, `${ele.respincode}`);
    doc.text(50, 200, "Reservation Time: ");
    doc.text(200, 200, `${ele.reservationtime}`);
    doc.text(230, 1200, "Thanks For Visiting !");

    doc.save(`BookingRecipt.pdf`);
  };

  const BookingReciptRes = () => {
    var doc = new jsPDF("p", "pt");

    doc.text(230, 40, "BOOKMYMEAL");
    doc.text(50, 100, "Restaurant Name: ");
    doc.text(200, 100, `${ele.username}`);
    doc.text(50, 120, "Phone: ");
    doc.text(200, 120, `${ele.userphone}`);
    doc.text(50, 140, "People Count: ");
    doc.text(200, 140, `${ele.noofpeople}`);
    doc.text(50, 200, "Reservation Time: ");
    doc.text(200, 200, `${ele.reservationtime}`);
    doc.text(50, 400, "Thanks For Visiting !");

    doc.save(`BookingRecipt.pdf`);
  };

  return (
    <>
      {sessionStorage.getItem("type") === "restaurent" ? (
        <div className="reservationCard_main">
          <table id="bookings">
            <tbody>
              <tr>
                <th style={{ width: "60px" }}>Name</th>
                <th style={{ width: "50px" }}>Phone</th>
                <th style={{ width: "30px" }}>People Count</th>
                <th style={{ width: "20px" }}>Booking Time</th>
              </tr>
              <tr>
                <td>{ele.username}</td>
                <td>{ele.userphone}</td>
                <td>{ele.noofpeople}</td>
                <td>{ele.reservationtime}</td>
              </tr>
              <tr>
                <td>
                  <button
                    style={{
                      padding: "4px",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                      borderRadius: "5px",
                      border: "none",
                      fontWeight: "bold",
                      backgroundColor: "var(--green)"
                    }}
                    onClick={BookingReciptRes}
                  >
                    Booking Reciept
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="reservationCard_main">
          <table id="bookings">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>People Count</th>
                <th>Restaurant Address</th>
                <th>Restaurant Pincode</th>
                <th>Booking Time</th>
              </tr>
              <tr>
                <td>{ele.resname}</td>
                <td>{ele.resphone}</td>
                <td>{ele.noofpeople}</td>
                <td>{ele.resaddress}</td>
                <td>{ele.respincode}</td>
                <td>{ele.reservationtime}</td>
              </tr>
              <tr></tr>
            </tbody>
          </table>

          <div className="btns">
            <button
              onClick={BookingRecipt}
              style={{
                marginBottom: "5px",
                width: "auto",
                borderRadius: "5px",
                backgroundColor: "#04AA6D",
                border: "none",
                padding: "10px",
                color: "white",
                fontWeight: "bolder",
                cursor: "pointer",
              }}
            >
              Booking Recipt{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationCard;
