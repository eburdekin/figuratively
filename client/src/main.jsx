import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import Home from "./pages/Home.jsx";
import Layout from "./components/Layout.jsx";
import TimedSessionOptions from "./pages/TimedSessionOptions.jsx";
import TimedSession from "./pages/TimedSession.jsx";
import TimedSessionReview from "./pages/TimedSessionReview.jsx";
import RandomPoses from "./pages/RandomPoses.jsx";
import NotFound from "./pages/NotFound.jsx";

import { SessionOptionsProvider } from "./contexts/SessionOptionsContext";

const theme = createTheme({
  /** Put your mantine theme override here */
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SessionOptionsProvider>
      <MantineProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="timed-session/options"
                element={<TimedSessionOptions />}
              />
              <Route path="timed-session" element={<TimedSession />} />
              <Route
                path="timed-session/review"
                element={<TimedSessionReview />}
              />
              {/* <Route path="random-poses" element={<RandomPoses />} /> */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </SessionOptionsProvider>
  </StrictMode>
);
