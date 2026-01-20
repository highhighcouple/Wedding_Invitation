
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Frontend from './components/Frontend';
import Backend from './components/Backend';
import { getWeddingData } from './dataStore';

const App: React.FC = () => {
  const [data, setData] = useState(getWeddingData());

  useEffect(() => {
    // 실시간 데이터 동기화 시뮬레이션 (LocalStorage 변경 감지)
    const handleStorageChange = () => {
      setData(getWeddingData());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Frontend data={data} />} />
        <Route path="/admin" element={<Backend data={data} onUpdate={setData} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
