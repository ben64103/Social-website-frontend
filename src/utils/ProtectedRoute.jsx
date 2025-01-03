import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  getCurrentUser,
  selectCurrentUser,
} from "@/features/auth/reducers/login/loginSlice";
import "@/assets/css/loader.css";
import App from "@/App";
import NotificationRequest from "@/components/notifications/NotificationRequest";
import { MessageCircle } from "lucide-react";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [initialCheck, setInitialCheck] = useState(true);
  const { user } = useSelector(selectCurrentUser);

  useEffect(() => {
    if (initialCheck) {
      dispatch(getCurrentUser()).finally(() => setInitialCheck(false));
    }
  }, [dispatch, initialCheck]);

  if (loading || initialCheck) {
    return <div className="pageloader is-active"></div>;
  }

  return isAuthenticated ? (
    <>
      <App>
        {location.pathname === "/" ? (
          <div className="text-center ">
            <div className="mt-24">
              <h1 className="text-5xl text-slate-800 dark:text-slate-100">
                <span className="text-slate-600 dark:text-slate-400">
                  Welcome,
                </span>{" "}
                <span className="font-semibold">{user?.firstName}</span>{" "}
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-400 mx-auto mt-3">
                Ready to connect? Your messages and conversations await.
              </p>

              <div className="flex gap-4 justify-center mt-8">
                <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                  <MessageCircle size="20" />
                  <span>Start Chatting</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </App>
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
