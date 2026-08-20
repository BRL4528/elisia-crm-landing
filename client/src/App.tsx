import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Landing from "./pages/Landing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";

// A experiência imersiva (three.js/R3F) fica fora do chunk inicial da landing.
const Experience = lazy(() => import("./pages/Experience"));

function ExperienceFallback() {
  return <div aria-hidden style={{ position: "fixed", inset: 0, background: "#0b1418" }} />;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Landing} />
      <Route path={"/experiencia"}>
        <Suspense fallback={<ExperienceFallback />}>
          <Experience />
        </Suspense>
      </Route>
      <Route path={"/privacy-policy"} component={PrivacyPolicy} />
      <Route path={"/terms-of-use"} component={TermsOfUse} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
