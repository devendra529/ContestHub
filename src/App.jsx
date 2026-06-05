// client/src/App.jsx

import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "./context/ThemeContext";

import { AuthProvider } from "./context/AuthContext";

import { ContestProvider } from "./context/ContestContext";

import AppRoutes from "./routes/AppRoutes";

const App = () => {

  return (

    <BrowserRouter>

      <ThemeProvider>

        <AuthProvider>

          <ContestProvider>

            {/* Routes */}
            <AppRoutes />

            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,

                style: {

                  background: "#1e293b",

                  color: "#f1f5f9",

                  border:
                    "1px solid #334155",

                  borderRadius: "10px",

                  fontSize: "14px",

                },

                success: {

                  iconTheme: {

                    primary: "#6366f1",

                    secondary:
                      "#f1f5f9",

                  },

                },

                error: {

                  iconTheme: {

                    primary: "#ef4444",

                    secondary:
                      "#f1f5f9",

                  },

                },

              }}
            />

          </ContestProvider>

        </AuthProvider>

      </ThemeProvider>

    </BrowserRouter>

  );
};

export default App;
