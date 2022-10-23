import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RandomCat from './randomCat';

const queryClient = new QueryClient();

function App() {
  // return jsx showing cat picture and button
  // to load next cat picture
  return (
    <QueryClientProvider client={queryClient}>
      <RandomCat />
    </QueryClientProvider>
  );
}

export default App;
