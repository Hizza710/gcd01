import React, { useState } from 'react';
import Layout from './components/Layout';
import AspirationInput from './components/AspirationInput';
import WorldGrid from './components/WorldGrid';

function App() {
  const [aspiration, setAspiration] = useState('');

  const handleSearch = (value) => {
    setAspiration(value);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center w-full">
        {/* Hero Section */}
        {/* Input */}
        <AspirationInput onSearch={handleSearch} isLoading={false} />

        {/* Results */}
        <WorldGrid aspiration={aspiration} />
      </div>
    </Layout>
  );
}

export default App;
