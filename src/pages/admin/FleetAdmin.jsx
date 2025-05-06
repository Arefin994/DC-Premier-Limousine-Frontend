import { useState, useEffect } from "react";
import axios from "axios";

const getHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

const FleetAdmin = ({ token, onSuccess }) => {
  const [fleets, setFleets] = useState([]);
  const [fleetForm, setFleetForm] = useState({
    name: "",
    imageUrl: "",
    altText: "",
    passengerCapacity: "",
    hourlyRate: "",
    laggageCapacity: "",
  });
  const [editingFleet, setEditingFleet] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFleets();
  }, []);

  const fetchFleets = async () => {
    try {
      const response = await axios.get(
        `https://dc-premier-limousine-backend-api.vercel.app/api/fleets`,
        {
          headers: getHeaders(token),
        }
      );
      console.log("Fetched fleets:", response.data);
      setFleets(response.data);
    } catch (err) {
      console.error("Error fetching fleets:", err);
      setError(err.response?.data?.message || "Failed to fetch fleets");
    }
  };

  const handleAddFleet = async (e) => {
    e.preventDefault();
    try {
      console.log("Adding fleet with data:", {
        ...fleetForm,
        passengerCapacity: Number(fleetForm.passengerCapacity),
        hourlyRate: Number(fleetForm.hourlyRate),
        laggageCapacity: Number(fleetForm.laggageCapacity),
      });

      const response = await axios.post(
        `https://dc-premier-limousine-backend-api.vercel.app/api/fleets`,
        {
          ...fleetForm,
          passengerCapacity: Number(fleetForm.passengerCapacity),
          hourlyRate: Number(fleetForm.hourlyRate),
          laggageCapacity: Number(fleetForm.laggageCapacity),
        },
        { headers: getHeaders(token) }
      );

      console.log("Add fleet response:", response.data);
      setFleetForm({
        name: "",
        imageUrl: "",
        altText: "",
        passengerCapacity: "",
        hourlyRate: "",
        laggageCapacity: "",
      });
      onSuccess("Fleet vehicle added successfully!");
      fetchFleets();
    } catch (err) {
      console.error("Error adding fleet:", err);
      setError(err.response?.data?.message || "Failed to add fleet vehicle");
    }
  };

  const handleEditFleet = (index) => {
    setEditingFleet(index);
    setFleetForm(fleets[index]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateFleet = async (e) => {
    e.preventDefault();
    try {
      console.log("Updating fleet with data:", {
        ...fleetForm,
        passengerCapacity: Number(fleetForm.passengerCapacity),
        hourlyRate: Number(fleetForm.hourlyRate),
        laggageCapacity: Number(fleetForm.laggageCapacity),
      });

      const response = await axios.put(
        `https://dc-premier-limousine-backend-api.vercel.app/api/fleets/${fleets[editingFleet]._id}`,
        {
          ...fleetForm,
          passengerCapacity: Number(fleetForm.passengerCapacity),
          hourlyRate: Number(fleetForm.hourlyRate),
          laggageCapacity: Number(fleetForm.laggageCapacity),
        },
        { headers: getHeaders(token) }
      );

      console.log("Update fleet response:", response.data);
      setEditingFleet(null);
      setFleetForm({
        name: "",
        imageUrl: "",
        altText: "",
        passengerCapacity: "",
        hourlyRate: "",
        laggageCapacity: "",
      });
      onSuccess("Fleet vehicle updated successfully!");
      fetchFleets();
    } catch (err) {
      console.error("Error updating fleet:", err);
      setError(err.response?.data?.message || "Failed to update fleet vehicle");
    }
  };

  const handleDeleteFleet = async (index) => {
    try {
      console.log("Deleting fleet:", fleets[index]._id);
      const response = await axios.delete(
        `https://dc-premier-limousine-backend-api.vercel.app/api/fleets/${fleets[index]._id}`,
        {
          headers: getHeaders(token),
        }
      );
      console.log("Delete fleet response:", response.data);
      onSuccess("Fleet vehicle deleted successfully!");
      fetchFleets();
    } catch (err) {
      console.error("Error deleting fleet:", err);
      setError(err.response?.data?.message || "Failed to delete fleet vehicle");
    }
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
      <div className="bg-[#262626] p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-[#FFD700] mb-4">
          {editingFleet !== null
            ? "Edit Fleet Vehicle"
            : "Add New Fleet Vehicle"}
        </h2>
        <form
          onSubmit={editingFleet !== null ? handleUpdateFleet : handleAddFleet}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid lg:grid-cols-2 col-span-2 gap-x-2">
              <div>
                <label
                  htmlFor="fleet-name"
                  className="block text-[#AAAAAA] mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="fleet-name"
                  value={fleetForm.name}
                  onChange={(e) =>
                    setFleetForm({ ...fleetForm, name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="fleet-image"
                  className="block text-[#AAAAAA] mb-2"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  id="fleet-image"
                  value={fleetForm.imageUrl}
                  onChange={(e) =>
                    setFleetForm({ ...fleetForm, imageUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="fleet-altText"
                className="block text-[#AAAAAA] mb-2"
              >
                Alt Text
              </label>
              <input
                type="text"
                id="fleet-altText"
                value={fleetForm.altText}
                onChange={(e) =>
                  setFleetForm({ ...fleetForm, altText: e.target.value })
                }
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                required
              />
            </div>

            <div className="grid lg:grid-cols-3 col-span-2 gap-x-2">
              <div>
                <label
                  htmlFor="fleet-passengerCapacity"
                  className="block text-[#AAAAAA] mb-2"
                >
                  Passenger Capacity
                </label>
                <input
                  type="number"
                  id="fleet-passengerCapacity"
                  value={fleetForm.passengerCapacity}
                  onChange={(e) =>
                    setFleetForm({
                      ...fleetForm,
                      passengerCapacity: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="fleet-laggageCapacity"
                  className="block text-[#AAAAAA] mb-2"
                >
                  Luggage Capacity
                </label>
                <input
                  type="number"
                  id="fleet-laggageCapacity"
                  value={fleetForm.laggageCapacity}
                  onChange={(e) =>
                    setFleetForm({
                      ...fleetForm,
                      laggageCapacity: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="fleet-hourlyRate"
                  className="block text-[#AAAAAA] mb-2"
                >
                  Hourly Rate
                </label>
                <input
                  type="number"
                  id="fleet-hourlyRate"
                  value={fleetForm.hourlyRate}
                  onChange={(e) =>
                    setFleetForm({ ...fleetForm, hourlyRate: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            {editingFleet !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditingFleet(null);
                  setFleetForm({
                    name: "",
                    imageUrl: "",
                    altText: "",
                    passengerCapacity: "",
                    hourlyRate: "",
                    laggageCapacity: "",
                  });
                }}
                className="mr-2 bg-[#626262] text-white py-2 px-4 rounded-md hover:bg-[#AAAAAA] transition duration-200"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="bg-[#FFD700] text-[#1A1A1A] py-2 px-4 rounded-md font-medium hover:bg-[#FFE657] transition duration-200"
            >
              {editingFleet !== null ? "Update Vehicle" : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-[#262626] p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-[#FFD700] mb-4">
          Current Fleet
        </h2>
        <div className="space-y-6">
          {Array.isArray(fleets) &&
            fleets.map((fleet, index) => (
              <div
                key={fleet._id}
                className="flex flex-col sm:flex-row gap-4 bg-[#1A1A1A] p-4 rounded-lg border border-[#626262] hover:bg-[#262626] transition-colors"
              >
                {/* Fleet Image */}
                <div className="w-full sm:w-1/3 lg:w-1/4 relative">
                  <div className="relative pt-[56.25%] rounded-lg overflow-hidden bg-[#262626]">
                    <img
                      src={fleet.imageUrl}
                      alt={fleet.altText || fleet.name}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMyNjI2MjYiLz48dGV4dCB4PSIwLjUiIHk9IjAuNSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMC4yIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iI0FBQUFBQSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+";
                      }}
                    />
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                      ${fleet.hourlyRate}/hr
                    </div>
                  </div>
                </div>

                {/* Fleet Details */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-[#FFD700] font-medium text-lg mb-2">
                    {fleet.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-[#AAAAAA]">Capacity:</p>
                      <p className="text-white">
                        {fleet.passengerCapacity} passengers
                      </p>
                    </div>
                    <div>
                      <p className="text-[#AAAAAA]">Luggage:</p>
                      <p className="text-white">{fleet.laggageCapacity}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[#AAAAAA]">Description:</p>
                      <p className="text-white line-clamp-2">{fleet.altText}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex sm:flex-col justify-end gap-2 sm:w-20">
                  <button
                    onClick={() => handleEditFleet(index)}
                    className="text-[#FFD700] hover:text-[#FFE657] text-sm px-3 py-1 sm:px-2 sm:py-1 rounded bg-[#262626]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteFleet(index)}
                    className="text-red-500 hover:text-red-400 text-sm px-3 py-1 sm:px-2 sm:py-1 rounded bg-[#262626]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FleetAdmin;
