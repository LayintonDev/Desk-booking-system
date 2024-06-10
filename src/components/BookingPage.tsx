import { useState } from "react";
import { AllDesks } from "../desks";

const BookingPage = () => {
  const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);
  const [desks, setdesks] = useState<Desk[]>(AllDesks);
  const [bookingTime, setBookingTime] = useState(0);

  const handleDeskClick = (index: number) => {
    if (desks[index].booked) {
      alert("Desk is already booked");
      return;
    }
    setSelectedDesk(desks[index]);
  };

  const handleBookingTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBookingTime(parseInt(event.target.value));
  };

  const calculatePrice = () => {
    if (!selectedDesk) return 0;

    let price = 0;
    if (selectedDesk.type === "individual") {
      switch (selectedDesk.membership) {
        case "basic":
          price = 10;
          break;
        case "premium":
          price = 15;
          break;
        case "executive":
          price = 20;
          break;
      }
    } else {
      price = 25; // Team desk
    }

    const discount = bookingTime > 3 ? 0.1 : 0;
    return price * bookingTime * (1 - discount);
  };

  const handleBooking = () => {
    if (!selectedDesk || !bookingTime) return;
    setdesks((prevDesks) => {
      return prevDesks.map((desk) => {
        if (desk.id === selectedDesk.id) {
          return { ...desk, booked: true };
        }
        return desk;
      });
    });

    setSelectedDesk(null);
    setBookingTime(0);

    // setSelectedDesk({ ...selectedDesk, booked: true });
  };

  return (
    <div className="booking-system">
      <h2>Co-working Space Booking</h2>
      <div className="desks">
        {desks.map((desk, index) => (
          <div
            key={index}
            className={`desk ${desk.booked ? "booked" : ""}`}
            onClick={() => handleDeskClick(index)}
          >
            {`Desk ${desk.id} ${
              desk.type === "individual"
                ? `(${desk.type} ${desk.membership})`
                : `(${desk.type})`
            } `}
          </div>
        ))}
      </div>
      {selectedDesk && (
        <div className="booking-details">
          <p>
            Selected Desk: {selectedDesk.type} ({selectedDesk.membership})
          </p>
          <label htmlFor="booking-time">Booking Time (hours):</label>
          <input
            type="number"
            id="booking-time"
            value={bookingTime}
            onChange={handleBookingTimeChange}
          />
          <p>Total: ${calculatePrice().toFixed(2)}</p>
          <button onClick={handleBooking} disabled={selectedDesk.booked}>
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
