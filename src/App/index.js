import WorkbenchPage from "../components/pages/WorkbenchPage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../components/pages/ErrorPage";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <WorkbenchPage />
    </ErrorBoundary>
  );
}

export default App;
