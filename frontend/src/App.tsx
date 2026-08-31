import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import BottomNav from "@/components/BottomNav";
import LoadingScreen from "@/components/states/LoadingScreen";
import { APP_ROUTES } from "@/constants/app";

const Home = lazy(() => import("./pages/Home"));
const Modes = lazy(() => import("./pages/Modes"));
const Play = lazy(() => import("./pages/Play"));
const PracticeSetup = lazy(() => import("./pages/PracticeSetup"));
const ArchivePage = lazy(() => import("./pages/ArchivePage"));
const Results = lazy(() => import("./pages/Results"));
const Stats = lazy(() => import("./pages/Stats"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner position="top-center" />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ErrorBoundary>
          <div className="mx-auto max-w-lg min-h-screen">
            <Suspense fallback={<LoadingScreen label="Loading PuzzDaily..." />}>
              <Routes>
                <Route path={APP_ROUTES.home} element={<Home />} />
                <Route path={APP_ROUTES.modes} element={<Modes />} />
                <Route path={APP_ROUTES.play} element={<Play />} />
                <Route path={APP_ROUTES.practiceSetup} element={<PracticeSetup />} />
                <Route path={APP_ROUTES.archive} element={<ArchivePage />} />
                <Route path={APP_ROUTES.results} element={<Results />} />
                <Route path={APP_ROUTES.stats} element={<Stats />} />
                <Route path={APP_ROUTES.settings} element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <BottomNav />
          </div>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
