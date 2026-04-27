import { useState } from "react";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [haber, setHaber] = useState({ baslik: "", icerik: "" });

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <input type="password" placeholder="Şifre" onChange={(e) => setPassword(e.target.value)} className="text-black p-2 rounded" />
        <button onClick={() => password === "1234" && setIsAuthenticated(true)} className="bg-blue-600 p-2 mt-2 rounded">Giriş Yap</button>
      </div>
    );
  }

  const handleSave = () => {
    // Burada veriyi işleyeceğiz. 
    // Not: Web tarayıcısı doğrudan dosyaya yazamaz, 
    // bu veriyi kopyalayıp 'veri.json' içine yapıştırman gerekecek.
    const yeniVeri = JSON.stringify(haber, null, 2);
    console.log("Yeni Veri Hazır (Bunu veri.json'a yapıştır):", yeniVeri);
    alert("Veri kopyalamaya hazır, konsolu kontrol et!");
  };

  return (
    <div className="p-8 bg-gray-800 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Siber Üs İçerik Yönetimi</h1>
      <input placeholder="Haber Başlığı" onChange={(e) => setHaber({...haber, baslik: e.target.value})} className="block w-full p-2 mb-2 text-black" />
      <textarea placeholder="Haber İçeriği" onChange={(e) => setHaber({...haber, icerik: e.target.value})} className="block w-full p-2 mb-2 text-black" />
      <button onClick={handleSave} className="bg-green-600 p-3 rounded">Veriyi Hazırla ve Kaydet</button>
    </div>
  );
}
