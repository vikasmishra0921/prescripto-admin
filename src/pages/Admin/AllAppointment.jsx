import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const AllAppointment = () => {
  const {
    aToken,
    appointments,
    getAllAppointments,
    cancelAppointment,
    addNewAppointment,
    completeAppointment,
  } = useContext(AdminContext);

  const handleNewAppointment = (newAppointmentData) => {
    addNewAppointment(newAppointmentData);
  };

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Table Header */}
        <div className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-3 px-6 border-b bg-gray-100 text-gray-700 font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Table Rows */}
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-3 px-6 text-gray-500 hover:bg-gray-50"
            key={index}
          >
            {/* Index */}
            <p className="text-center">{index + 1}</p>

            {/* Patient Name */}
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full"
                src={item.userData.image || "/placeholder.jpg"}
                alt="Patient"
              />
              <p>{item.userData.name}</p>
            </div>

            {/* Age */}
            <p className="text-center">{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p className="text-center">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Doctor Info */}
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full bg-gray-200"
                src={item.docData.image || "/placeholder.jpg"}
                alt="Doctor"
              />
              <p>{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p className="text-center">
              {currency}
              {item.amount}
            </p>

            {/* Actions */}

            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-400 text-xs font-medium">completed</p>
            ) : (
            <div className="flex items-center gap-2">
              <img
                onClick={() => cancelAppointment(item._id)}
                className="w-10 h-10 cursor-pointer mx-auto"
                src={assets.cancel_icon}
                alt="Cancel"
              />

              <img
                onClick={() => completeAppointment(item._id)}
                className="w-8 h-8 cursor-pointer"
                src={assets.tick_icon}
                alt="Complete"
              />
            </div>
              
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointment;
