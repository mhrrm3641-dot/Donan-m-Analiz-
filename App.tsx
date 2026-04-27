import { useState, useEffect } from 'react';
import Admin from './pages/Admin'; // Admin sayfanı dahil et

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [haberler, setHaberler] = useState([]);

  // Veriyi kök dizindeki veri.json dosyasından çekiyoruz
  useEffect(() => {
    fetch('/veri.json')
      .then(res => res.json())
      .then(data => {
        if (data.haberler) {
          setHaberler(data.haberler);
        }
      })
      .catch(err => console.error("Veri yüklenemedi:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Basit Yönlendirme Menüsü */}
      <nav className="p-4 bg-gray-800 flex justify-between">
        <h1 className="font-bold">Cyber Base</h1>
        <button onClick={() => setCurrentPage(currentPage === 'home' ? 'admin' : 'home')}>
          {currentPage === 'home' ? 'Yönetim' : 'Siteye Dön'}
        </button>
      </nav>

      {/* Sayfa İçeriği */}
      {currentPage === 'home' ? (
        <main className="p-8">
          <h2 className="text-2xl mb-4">Güncel Haberler</h2>
          {haberler.map((haber, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-700 rounded">
              <h3 className="text-xl font-bold">{haber.baslik}</h3>
              <p className="mt-2 text-gray-300">{haber.icerik}</p>
            </div>
          ))}
        </main>
      ) : (
        <Admin />
      )}
    </div>
  );
}
