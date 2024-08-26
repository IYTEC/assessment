import React, { useReducer, createContext, ReactNode, Dispatch } from 'react';

// Define the shape of your state
interface NotificationState {
  status: boolean;
  message: string;
  type: string;
}

// Define the action types
type Action =
  | { type: 'UPDATE_MESSAGE'; payload: { status: boolean; message: string; type: string } };

// Create the context with proper typing
interface NotificationContextProps {
  state: NotificationState;
  dispatch: Dispatch<Action>;
}

export const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const initialState: NotificationState = {
    status: false,
    message: '',
    type: '',
  };

  const [state, dispatch] = useReducer((prevState: NotificationState, action: Action): NotificationState => {
    switch (action.type) {
      case 'UPDATE_MESSAGE':
        return {
          ...prevState,
          status: action.payload.status,
          message: action.payload.message,
          type: action.payload.type,
        };
      default:
        return prevState; // Add a default case to handle unknown actions
    }
  }, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
