
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Não foi possível encontrar o elemento root.");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error: any) {
    const display = document.getElementById('error-display');
    if (display) {
      display.style.display = 'block';
      display.innerHTML += `<p>Erro na renderização do React: <code>${error.message}</code></p>`;
    }
    console.error("Erro ao renderizar App:", error);
  }
};

// Pequeno delay para garantir que o DOM e o importmap estejam prontos
if (document.readyState === 'complete') {
  mountApp();
} else {
  window.addEventListener('load', mountApp);
}
