import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StoreProvider, trunk } from './store';

const container = document.getElementById('root')!;
const root = createRoot(container);

const AppProvider = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const rehydrate = async () => {
      await trunk.init();
    };

    rehydrate();

    setIsLoaded(true);
  }, []);

  return isLoaded ? <App /> : <p>Loading...</p>;
};

root.render(
  <StoreProvider>
    <AppProvider />
  </StoreProvider>
);
