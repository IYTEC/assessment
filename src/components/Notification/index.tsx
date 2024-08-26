import React, { useContext } from 'react';
import { NotificationContext } from '../../contexts/NotificationProvider';
import { AiFillExclamationCircle, AiFillCloseCircle } from "react-icons/ai";

// Define type for the notification state
interface NotificationState {
  status: boolean;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error' | ''; // restrict to specific strings
}

// Define types for the notification container and text styles
const NOTIFICATION_CONTAINER: Record<NotificationState['type'], string> = {
  "success": "border-green-500 bg-green-100",
  "warning": "border-orange-500 bg-orange-100",
  "info": "border-blue-500 bg-blue-100",
  "error": "border-red-500 bg-red-100",
  "": "", // handle empty type case
}

const NOTIFICATION_TEXT: Record<NotificationState['type'], string> = {
  "success": "text-green-500",
  "warning": "text-orange-500",
  "info": "text-orange-500",
  "error": "text-red-500",
  "": "", // handle empty type case
}

const RenderNotificationPopup: React.FC = () => {
  // Get the notification state and dispatch function from the context
  const { state: notificationPopUp, dispatch: setNotificationProp } = useContext(NotificationContext);

  // Handle cases where context might not be provided
  if (!notificationPopUp || !setNotificationProp) return null;

  return (
    <div className={`${NOTIFICATION_CONTAINER[notificationPopUp.type]} mb-4 border p-3 rounded-sm mt-3`}>
      <div className={`${NOTIFICATION_TEXT[notificationPopUp.type]} flex justify-between`}>
        <div className="flex items-start font-lato text-sm md:text-md font-semibold">
          <div><AiFillExclamationCircle className='mr-2' /></div>
          <p className='-mt-1'>{notificationPopUp.message}</p>
        </div>
        <div className='flex justify-center items-start'>
          <AiFillCloseCircle
            onClick={() => setNotificationProp({
              type: 'UPDATE_MESSAGE',
              payload: {
                message: '',
                status: false,
                type: ''
              }
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default RenderNotificationPopup;
