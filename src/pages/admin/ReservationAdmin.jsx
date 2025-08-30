import { useState, useEffect } from "react";
import axios from "axios";

const getHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

const ReservationAdmin = ({ token, onSuccess }) => {
  const [reservations, setReservations] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null);
  const [reservationForm, setReservationForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    passengers: "",
    pickupAddress: "",
    pickupLat: "",
    pickupLon: "",
    destinationAddress: "",
    destinationLat: "",
    destinationLon: "",
    date: "",
    time: "",
    status: "pending"
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        `https://dc-premier-limousine-backend-api.vercel.app/api/reservations`,
        {
          headers: getHeaders(token),
        }
      );
      console.log("Fetched reservations:", response.data);
      setReservations(response.data);
    } catch (err) {
      console.error("Error fetching reservations:", err);
      setError(err.response?.data?.message || "Failed to fetch reservations");
    }
  };

  const handleEditReservation = (index) => {
    setEditingReservation(index);
    const reservation = reservations[index];
    setReservationForm({
      firstName: reservation.firstName || "",
      lastName: reservation.lastName || "",
      email: reservation.email || "",
      phone: reservation.phone || "",
      passengers: reservation.passengers?.toString() || "",
      pickupAddress: reservation.pickupAddress || "",
      pickupLat: reservation.pickupLat?.toString() || "",
      pickupLon: reservation.pickupLon?.toString() || "",
      destinationAddress: reservation.destinationAddress || "",
      destinationLat: reservation.destinationLat?.toString() || "",
      destinationLon: reservation.destinationLon?.toString() || "",
      date: reservation.date || "",
      time: reservation.time || "",
      status: reservation.status || "pending"
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateReservation = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        ...reservationForm,
        passengers: parseInt(reservationForm.passengers),
        pickupLat: reservationForm.pickupLat ? parseFloat(reservationForm.pickupLat) : null,
        pickupLon: reservationForm.pickupLon ? parseFloat(reservationForm.pickupLon) : null,
        destinationLat: reservationForm.destinationLat ? parseFloat(reservationForm.destinationLat) : null,
        destinationLon: reservationForm.destinationLon ? parseFloat(reservationForm.destinationLon) : null,
      };

      const response = await axios.put(
        `https://dc-premier-limousine-backend-api.vercel.app/api/reservations/${reservations[editingReservation]._id}`,
        updateData,
        { headers: getHeaders(token) }
      );

      console.log("Update reservation response:", response.data);
      setEditingReservation(null);
      setReservationForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        passengers: "",
        pickupAddress: "",
        pickupLat: "",
        pickupLon: "",
        destinationAddress: "",
        destinationLat: "",
        destinationLon: "",
        date: "",
        time: "",
        status: "pending"
      });
      onSuccess("Reservation updated successfully!");
      fetchReservations();
    } catch (err) {
      console.error("Error updating reservation:", err);
      setError(err.response?.data?.message || "Failed to update reservation");
    }
  };

  const handleDeleteReservation = async (index) => {
    if (!window.confirm("Are you sure you want to delete this reservation?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `https://dc-premier-limousine-backend-api.vercel.app/api/reservations/${reservations[index]._id}`,
        {
          headers: getHeaders(token),
        }
      );
      console.log("Delete reservation response:", response.data);
      onSuccess("Reservation deleted successfully!");
      fetchReservations();
    } catch (err) {
      console.error("Error deleting reservation:", err);
      setError(err.response?.data?.message || "Failed to delete reservation");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-500";
      case "confirmed":
        return "text-green-500";
      case "cancelled":
        return "text-red-500";
      case "completed":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString) => {
    if (!timeString) return "Not specified";
    return timeString;
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {editingReservation !== null && (
        <div className="bg-[#262626] p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-[#FFD700] mb-4">
            Edit Reservation
          </h2>
          <form onSubmit={handleUpdateReservation} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#AAAAAA] mb-2">First Name</label>
                <input
                  type="text"
                  value={reservationForm.firstName}
                  onChange={(e) =>
                    setReservationForm({ ...reservationForm, firstName: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#AAAAAA] mb-2">Last Name</label>
                <input
                  type="text"
                  value={reservationForm.lastName}
                  onChange={(e) =>
                    setReservationForm({ ...reservationForm, lastName: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#AAAAAA] mb-2">Email</label>
                <input
                  type="email"
                  value={reservationForm.email}
                  onChange={(e) =>
                    setReservationForm({ ...reservationForm, email: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#AAAAAA] mb-2">Phone</label>
                <input
                  type="tel"
                  value={reservationForm.phone}
                  onChange={(e) =>
                    setReservationForm({ ...reservationForm, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#AAAAAA] mb-2">Passengers</label>
                <input
                  type="number"
                  value={reservationForm.passengers}
                  onChange={(e) =>
                    setReservationForm({ ...reservationForm, passengers: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#AAAAAA] mb-2">Status</label>
                <select
                  value={reservationForm.status}
                  onChange={(e) =>
                    setReservationForm({ ...reservationForm, status: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-[#AAAAAA] mb-2">Date</label>
                <input
                  type="date"
                  value={reservationForm.date}
                  onChange={(e) =>
                    setReservationForm({ ...reservationForm, date: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#AAAAAA] mb-2">Time</label>
                <input
                  type="time"
                  value={reservationForm.time}
                  onChange={(e) =>
                    setReservationForm({ ...reservationForm, time: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#AAAAAA] mb-2">Pickup Address</label>
                <input
                  type="text"
                  value={reservationForm.pickupAddress}
                  onChange={(e) =>
                    setReservationForm({ ...reservationForm, pickupAddress: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#AAAAAA] mb-2">Destination Address</label>
                <input
                  type="text"
                  value={reservationForm.destinationAddress}
                  onChange={(e) =>
                    setReservationForm({ ...reservationForm, destinationAddress: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setEditingReservation(null);
                  setReservationForm({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    passengers: "",
                    pickupAddress: "",
                    pickupLat: "",
                    pickupLon: "",
                    destinationAddress: "",
                    destinationLat: "",
                    destinationLon: "",
                    date: "",
                    time: "",
                    status: "pending"
                  });
                }}
                className="mr-2 bg-[#626262] text-white py-2 px-4 rounded-md hover:bg-[#AAAAAA] transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#FFD700] text-[#1A1A1A] py-2 px-4 rounded-md font-medium hover:bg-[#FFE657] transition duration-200"
              >
                Update Reservation
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-[#262626] p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-[#FFD700] mb-4">
          All Reservations
        </h2>
        <div className="space-y-4">
          {Array.isArray(reservations) && reservations.length > 0 ? (
            reservations.map((reservation, index) => (
              <div
                key={reservation._id}
                className="bg-[#1A1A1A] p-4 rounded-lg border border-[#626262] hover:bg-[#262626] transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h3 className="text-[#FFD700] font-medium text-lg">
                        {reservation.firstName} {reservation.lastName}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(reservation.status)} bg-opacity-20`}>
                        {reservation.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-[#AAAAAA]">Contact:</p>
                        <p className="text-white">{reservation.email}</p>
                        <p className="text-white">{reservation.phone}</p>
                      </div>
                      <div>
                        <p className="text-[#AAAAAA]">Trip Details:</p>
                        <p className="text-white">{formatDate(reservation.date)} at {formatTime(reservation.time)}</p>
                        <p className="text-white">{reservation.passengers} passengers</p>
                      </div>
                      <div>
                        <p className="text-[#AAAAAA]">Pickup:</p>
                        <p className="text-white line-clamp-2">{reservation.pickupAddress}</p>
                      </div>
                      <div>
                        <p className="text-[#AAAAAA]">Destination:</p>
                        <p className="text-white line-clamp-2">{reservation.destinationAddress}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 lg:flex-col">
                    <button
                      onClick={() => handleEditReservation(index)}
                      className="text-[#FFD700] hover:text-[#FFE657] text-sm px-3 py-1 rounded bg-[#262626]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReservation(index)}
                      className="text-red-500 hover:text-red-400 text-sm px-3 py-1 rounded bg-[#262626]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-[#AAAAAA] text-lg">No reservations found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationAdmin;
