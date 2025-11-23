import { useState } from 'react';
import UploadCard from '../components/UploadCard';
import Notebook from '../components/Notebook';
import CuteAnimals from '../components/CuteAnimals';

const Home = () => {
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col">
      
      {/* Header - Only show when no file is uploaded */}
      {!currentFile && (
        <header className="w-full p-6 flex justify-center z-20">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 drop-shadow-lg flex items-center gap-3">
            🐰 ChatPDF
          </h1>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full flex items-center justify-center px-4 py-6">
        {!currentFile ? (
          <UploadCard onUploadComplete={(filename) => setCurrentFile(filename)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Notebook filename={currentFile} />
          </div>
        )}
      </main>

      {/* Footer Decoration - Only show when no file */}
      {!currentFile && <CuteAnimals />}
    </div>
  );
};

export default Home;