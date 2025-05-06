import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "/api";

const getHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

const ServiceAdmin = ({ token, onSuccess }) => {
  const [services, setServices] = useState([]);
  const [serviceForm, setServiceForm] = useState({
    name: "",
    imageUrl: "",
    description: "",
    features: [""],
  });
  const [editingService, setEditingService] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/services`, {
        headers: getHeaders(token),
      });
      setServices(response.data);
    } catch (err) {
      setError("Failed to fetch services");
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const filteredFeatures = serviceForm.features
        .map((feature) => feature.trim())
        .filter((feature) => feature !== "");

      await axios.post(
        `${API_BASE_URL}/services`,
        {
          ...serviceForm,
          features: filteredFeatures,
        },
        { headers: getHeaders(token) }
      );
      setServiceForm({
        name: "",
        imageUrl: "",
        description: "",
        features: [""],
      });
      onSuccess("Service added successfully!");
      window.location.reload();
    } catch (err) {
      setError("Failed to add service");
    }
  };

  const handleEditService = (index) => {
    setEditingService(index);
    setServiceForm(services[index]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    try {
      // Ensure features is an array and convert all items to strings
      const filteredFeatures = Array.isArray(serviceForm.features)
        ? serviceForm.features
            .map((feature) => String(feature).trim())
            .filter((feature) => feature !== "")
        : [];

      console.log("Updating service with data:", {
        name: serviceForm.name,
        imageUrl: serviceForm.imageUrl,
        description: serviceForm.description,
        features: filteredFeatures,
      });

      const response = await axios.put(
        `${API_BASE_URL}/services/${services[editingService]._id}`,
        {
          name: serviceForm.name,
          imageUrl: serviceForm.imageUrl,
          description: serviceForm.description,
          features: filteredFeatures,
        },
        { headers: getHeaders(token) }
      );

      console.log("Update response:", response.data);

      if (response.data) {
        setEditingService(null);
        setServiceForm({
          name: "",
          imageUrl: "",
          description: "",
          features: [""],
        });
        onSuccess("Service updated successfully!");
        fetchServices();
      }
    } catch (err) {
      console.error("Update error:", err.response?.data || err);
      setError(err.response?.data?.message || "Failed to update service");
    }
  };

  const handleDeleteService = async (index) => {
    try {
      await axios.delete(`${API_BASE_URL}/services/${services[index]._id}`, {
        headers: getHeaders(token),
      });
      onSuccess("Service deleted successfully!");
      window.location.reload();
    } catch (err) {
      setError("Failed to delete service");
    }
  };

  const addFeatureField = () => {
    setServiceForm({
      ...serviceForm,
      features: [...serviceForm.features, ""],
    });
  };

  const removeFeatureField = (index) => {
    const updatedFeatures = serviceForm.features.filter((_, i) => i !== index);
    setServiceForm({
      ...serviceForm,
      features: updatedFeatures,
    });
  };

  const updateFeature = (index, value) => {
    const updatedFeatures = [...serviceForm.features];
    updatedFeatures[index] = value;
    setServiceForm({
      ...serviceForm,
      features: updatedFeatures,
    });
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
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg">
          <p className="font-medium">Error: {error}</p>
        </div>
      )}
      <div className="bg-[#262626] p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-[#FFD700] mb-4">
          {editingService !== null ? "Edit Service" : "Add New Service"}
        </h2>
        <form
          onSubmit={
            editingService !== null ? handleUpdateService : handleAddService
          }
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid lg:grid-cols-2 col-span-2 gap-x-2">
              <div>
                <label
                  htmlFor="service-name"
                  className="block text-[#AAAAAA] mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="service-name"
                  value={serviceForm.name}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="service-image"
                  className="block text-[#AAAAAA] mb-2"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  id="service-image"
                  value={serviceForm.imageUrl}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, imageUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                  required
                />
              </div>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="service-description"
                className="block text-[#AAAAAA] mb-2"
              >
                Description
              </label>
              <textarea
                id="service-description"
                value={serviceForm.description}
                onChange={(e) =>
                  setServiceForm({
                    ...serviceForm,
                    description: e.target.value,
                  })
                }
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="col-span-2">
              <label className="block text-[#AAAAAA] mb-2">Features</label>
              {serviceForm.features.map((feature, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                    required={index === 0}
                  />
                  {serviceForm.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeatureField(index)}
                      className="ml-2 bg-red-500 text-white px-3 rounded-md hover:bg-red-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeatureField}
                className="mt-2 bg-[#626262] text-white py-1 px-3 rounded-md hover:bg-[#AAAAAA]"
              >
                + Add Feature
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            {editingService !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditingService(null);
                  setServiceForm({
                    name: "",
                    imageUrl: "",
                    description: "",
                    features: [""],
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
              {editingService !== null ? "Update Service" : "Add Service"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-[#262626] p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-[#FFD700] mb-4">
          Current Services
        </h2>
        <div className="space-y-6">
          {Array.isArray(services) &&
            services.map((service, index) => (
              <div
                key={service._id}
                className="flex flex-col sm:flex-row gap-4 bg-[#1A1A1A] p-4 rounded-lg border border-[#626262] hover:bg-[#262626] transition-colors"
              >
                {/* Service Image */}
                <div className="w-full sm:w-1/3 lg:w-1/4 relative">
                  <div className="relative pt-[56.25%] rounded-lg overflow-hidden bg-[#262626]">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMyNjI2MjYiLz48dGV4dCB4PSIwLjUiIHk9IjAuNSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMC4yIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iI0FBQUFBQSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+";
                      }}
                    />
                  </div>
                </div>

                {/* Service Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-[#FFD700] font-medium text-lg mb-1">
                    {service.name}
                  </h3>
                  <p className="text-[#AAAAAA] text-sm mb-2 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="mt-2">
                    <h4 className="text-[#AAAAAA] text-sm font-semibold mb-1">
                      Features:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                      {Array.isArray(service.features) &&
                        service.features.map((feature, i) => (
                          <li
                            key={i}
                            className="text-[#AAAAAA] text-sm flex items-start"
                          >
                            <span className="text-[#FFD700] mr-1">•</span>
                            <span className="line-clamp-1">{feature}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex sm:flex-col justify-end gap-2 sm:w-20">
                  <button
                    onClick={() => handleEditService(index)}
                    className="text-[#FFD700] hover:text-[#FFE657] text-sm px-3 py-1 sm:px-2 sm:py-1 rounded bg-[#262626]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteService(index)}
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

export default ServiceAdmin;
