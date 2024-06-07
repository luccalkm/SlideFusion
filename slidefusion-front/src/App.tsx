import AppRoutes from "./components/routes/AppRoutes";
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from "./utils/cache/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <AppRoutes />
    </QueryClientProvider>
  )
}

export default App
