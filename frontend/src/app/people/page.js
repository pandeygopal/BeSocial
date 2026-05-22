"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { fetchUsers } from "@/redux/users/usersSlice";

import {
  fetchSentRequests,
  fetchReceivedRequests,
  fetchFriendsList,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelSentRequest,
  unfriend,
} from "@/redux/friendRequests/friendRequestsSlice";

import { fetchUserDetails } from "@/redux/auth/authSlice";

import AuthRedirect from "@/components/AuthRedirect";

import {
  FiUserPlus,
  FiUserX,
  FiUserCheck,
  FiSearch,
  FiRefreshCw,
  FiClock,
  FiCheck,
  FiX,
  FiEye,
  FiMapPin,
} from "react-icons/fi";

const FriendsSuggestion = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users || []);
  const sentRequests = useSelector(
    (state) => state.friendRequests.sentRequests || []
  );
  const receivedRequests = useSelector(
    (state) => state.friendRequests.receivedRequests || []
  );
  const friendsList = useSelector(
    (state) => state.friendRequests.friendsList || []
  );

  const { userDetails } = useSelector((state) => state.auth);

  const loggedInUserId = userDetails?._id;

  const [searchTerm, setSearchTerm] = useState("");

  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchUserDetails());
    dispatch(fetchSentRequests());
    dispatch(fetchReceivedRequests());
    dispatch(fetchFriendsList());
  }, [dispatch]);

  const handleSendRequest = (receiverId) => {
    dispatch(sendFriendRequest(receiverId));
  };

  const handleAcceptRequest = (requestId) => {
    dispatch(acceptFriendRequest(requestId));
  };

  const handleRejectRequest = (requestId) => {
    dispatch(rejectFriendRequest(requestId));
  };

  const handleCancelRequest = (requestId) => {
    dispatch(cancelSentRequest(requestId));
  };

  const handleUnfriend = (friendId) => {
    dispatch(unfriend(friendId));
  };

  const filteredUsers = users.filter((user) => {
    const fullName = user?.fullName || "";
    const username = user?.username || "";

    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <FiRefreshCw className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-red-500 text-2xl font-bold">
          Failed to load users
        </h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <AuthRedirect>
      <div className="min-h-screen bg-gray-100 p-5">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-5 mb-5">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              People Suggestions
            </h1>

            <div className="relative">
              <FiSearch className="absolute top-3 left-3 text-gray-400" />

              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredUsers.map((user) => {
              const isFriend = friendsList.some(
                (friend) => friend?._id === user?._id
              );

              const sentRequest = sentRequests.find(
                (req) => req?.receiver?._id === user?._id
              );

              const receivedRequest = receivedRequests.find(
                (req) => req?.sender?._id === user?._id
              );

              return (
                <div
                  key={user?._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="h-32 bg-gray-200">
                    <img
                      src={user?.coverImage || "/default-cover.jpg"}
                      alt="cover"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5 text-center">
                    <div className="-mt-16 mb-3 flex justify-center">
                      <img
                        src={
                          user?.profilePicture || "/default-profile.png"
                        }
                        alt={user?.fullName}
                        className="w-24 h-24 rounded-full border-4 border-white object-cover"
                      />
                    </div>

                    <h2 className="text-xl font-bold text-gray-800">
                      {user?.fullName || "Unknown User"}
                    </h2>

                    <p className="text-blue-500">
                      @{user?.username || "username"}
                    </p>

                    {user?.location && (
                      <div className="flex justify-center items-center mt-2 text-gray-500">
                        <FiMapPin className="mr-1" />
                        <span>{user.location}</span>
                      </div>
                    )}

                    <p className="text-gray-600 mt-3 text-sm">
                      {user?.bio || "No bio available"}
                    </p>

                    <div className="mt-5 flex flex-col gap-2">
                      <Link
                        href={`/profile/${user?._id}`}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg flex items-center justify-center"
                      >
                        <FiEye className="mr-2" />
                        View Profile
                      </Link>

                      {user?._id === loggedInUserId ? (
                        <button className="bg-gray-300 text-gray-700 py-2 rounded-lg cursor-not-allowed">
                          Your Profile
                        </button>
                      ) : isFriend ? (
                        <button
                          onClick={() => handleUnfriend(user?._id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center"
                        >
                          <FiUserX className="mr-2" />
                          Unfriend
                        </button>
                      ) : receivedRequest ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleAcceptRequest(receivedRequest?._id)
                            }
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg flex items-center justify-center"
                          >
                            <FiCheck className="mr-1" />
                            Accept
                          </button>

                          <button
                            onClick={() =>
                              handleRejectRequest(receivedRequest?._id)
                            }
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center"
                          >
                            <FiX className="mr-1" />
                            Reject
                          </button>
                        </div>
                      ) : sentRequest ? (
                        <button
                          onClick={() =>
                            handleCancelRequest(sentRequest?._id)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg flex items-center justify-center"
                        >
                          <FiClock className="mr-2" />
                          Cancel Request
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleSendRequest(user?._id)
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center"
                        >
                          <FiUserPlus className="mr-2" />
                          Add Friend
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AuthRedirect>
  );
};

export default FriendsSuggestion;
