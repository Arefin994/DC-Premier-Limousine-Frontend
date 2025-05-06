import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "/api";

const getHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

const VideoAdmin = ({ token, onSuccess }) => {
  const [videos, setVideos] = useState([]);
  const [videoForm, setVideoForm] = useState({
    url: "",
  });
  const [editingVideo, setEditingVideo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/videos`, {
        headers: getHeaders(token),
      });
      console.log("Fetched videos:", response.data);
      setVideos(response.data);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError(err.response?.data?.message || "Failed to fetch videos");
    }
  };

  const convertToEmbedUrl = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url;
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      const embedUrl = convertToEmbedUrl(videoForm.url);
      console.log("Adding video with data:", { url: embedUrl });
      const response = await axios.post(
        `${API_BASE_URL}/videos`,
        { url: embedUrl },
        { headers: getHeaders(token) }
      );
      console.log("Add video response:", response.data);
      setVideoForm({ url: "" });
      onSuccess("Video added successfully!");
      fetchVideos();
    } catch (err) {
      console.error("Error adding video:", err);
      setError(err.response?.data?.message || "Failed to add video");
    }
  };

  const handleEditVideo = (index) => {
    setEditingVideo(index);
    setVideoForm(videos[index]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateVideo = async (e) => {
    e.preventDefault();
    try {
      const embedUrl = convertToEmbedUrl(videoForm.url);
      console.log("Updating video with data:", { url: embedUrl });
      const response = await axios.put(
        `${API_BASE_URL}/videos/${videos[editingVideo]._id}`,
        { url: embedUrl },
        { headers: getHeaders(token) }
      );
      console.log("Update video response:", response.data);
      setEditingVideo(null);
      setVideoForm({ url: "" });
      onSuccess("Video updated successfully!");
      fetchVideos();
    } catch (err) {
      console.error("Error updating video:", err);
      setError(err.response?.data?.message || "Failed to update video");
    }
  };

  const handleDeleteVideo = async (index) => {
    try {
      console.log("Deleting video:", videos[index]._id);
      const response = await axios.delete(
        `${API_BASE_URL}/videos/${videos[index]._id}`,
        {
          headers: getHeaders(token),
        }
      );
      console.log("Delete video response:", response.data);
      onSuccess("Video deleted successfully!");
      fetchVideos();
    } catch (err) {
      console.error("Error deleting video:", err);
      setError(err.response?.data?.message || "Failed to delete video");
    }
  };

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg">
          <p className="font-medium">Error: {error}</p>
        </div>
      )}
      <div className="bg-[#262626] p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-[#FFD700] mb-4">
          {editingVideo !== null ? "Edit Video" : "Add New Video"}
        </h2>
        <form
          onSubmit={editingVideo !== null ? handleUpdateVideo : handleAddVideo}
          className="space-y-4"
        >
          <div>
            <label htmlFor="video-url" className="block text-[#AAAAAA] mb-2">
              YouTube Video URL
            </label>
            <input
              type="text"
              id="video-url"
              value={videoForm.url}
              onChange={(e) => setVideoForm({ url: e.target.value })}
              className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#626262] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
            <p className="text-sm text-[#AAAAAA] mt-1">
              Enter a YouTube video URL (watch or share link). It will be
              automatically converted to an embed URL.
            </p>
          </div>
          <div className="flex justify-end">
            {editingVideo !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditingVideo(null);
                  setVideoForm({ url: "" });
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
              {editingVideo !== null ? "Update Video" : "Add Video"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-[#262626] p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-[#FFD700] mb-4">
          Current Videos
        </h2>
        <div className="space-y-6">
          {Array.isArray(videos) &&
            videos.map((video, index) => (
              <div
                key={video._id}
                className="flex flex-col sm:flex-row gap-4 bg-[#1A1A1A] p-4 rounded-lg border border-[#626262] hover:bg-[#262626] transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-full sm:w-1/3 lg:w-1/4 relative">
                  <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
                    {" "}
                    {/* 16:9 aspect ratio */}
                    <iframe
                      src={video.url}
                      className="absolute top-0 left-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Video Info */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-white font-medium text-lg mb-1 line-clamp-2">
                    {video.title || "Brought to you by DC Premier Limousine"}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {video.description || "No description available"}
                  </p>

                  {/* Channel/Uploader Info
                  <div className="flex items-center mt-auto">
                    <div className="w-8 h-8 rounded-full bg-[#626262] mr-2"></div>
                    <span className="text-gray-300 text-sm">
                      {video.channel || "Unknown channel"}
                    </span>
                  </div> */}
                </div>

                {/* Action Buttons */}
                <div className="flex sm:flex-col justify-end gap-2 sm:w-20">
                  <button
                    onClick={() => handleEditVideo(index)}
                    className="text-[#FFD700] hover:text-[#FFE657] text-sm px-3 py-1 sm:px-2 sm:py-1 rounded bg-[#262626]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteVideo(index)}
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

export default VideoAdmin;
