import { useState } from 'react';
import UploadCard from '../components/UploadCard';
import Notebook from '../components/Notebook';
import CuteAnimals from '../components/CuteAnimals';

const Home = () => {
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden flex flex-col items-center">
      
      {/* Header */}
      <header className="w-full p-6 flex justify-center z-20">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-kawaii-300 to-kawaii-500 drop-shadow-sm flex items-center gap-3">
          🐰 ChatPDF
        </h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full flex items-center justify-center relative z-20 pb-20">
        {!currentFile ? (
          <UploadCard onUploadComplete={(filename) => setCurrentFile(filename)} />
        ) : (
          <Notebook filename={currentFile} />
        )}
      </main>

      {/* Footer Decoration */}
      <CuteAnimals />
    </div>
  );
};

export default Home;