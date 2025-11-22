import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header user={user} onNavigate={handleNavigate} currentSection={currentSection} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={renderContent()} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
