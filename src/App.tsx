import React from 'react';
import Schools from './Schools/Schools'
import ErrorBoundary from './ErrorBoundary';
import './App.css'

function App() {
  return (
    <div className="App">
    <ErrorBoundary>
      <Schools />
    </ErrorBoundary>
    </div>
  );
}

export default App;
