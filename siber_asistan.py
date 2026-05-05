import os
import time
import subprocess
import yfinance as yf

def sistem_temizligi():
    print("\n[*] Gecici dosyalar temizleniyor...")
    # Gereksiz nano ve sistem loglarını temizler
    os.system("rm -f .*.swp *~")
    print("[+] Temizlik tamam.")

def klasorle():
    print("[*] Dosyalar kategorize ediliyor...")
    # Klasörleri oluştur
    if not os.path.exists("Scriptler"): os.makedirs("Scriptler")
    if not os.path.exists("Raporlar"): os.makedirs("Raporlar")
    
    # Python dosyalarını Scriptler klasörüne taşı
    os.system("mv *.py Scriptler/ 2>/dev/null")
    os.system("mv siber_asistan.py ../siber_asistan.py 2>/dev/null") # Kendini taşıma
    print("[+] Klasörleme bitti.")

def borsa_kontrol():
    print("\n[📊] Borsa İstanbul Verileri Alınıyor...")
    # Takip listesi (İstediğin hisseyi buraya ekleyebilirsin)
    hisseler = ["THYAO.IS", "EREGL.IS", "SASA.IS", "ASELS.IS"]
    rapor = f"\n--- Borsa Raporu ({time.strftime('%Y-%m-%d %H:%M')}) ---\n"
    
    for hisse in hisseler:
        try:
            ticker = yf.Ticker(hisse)
            fiyat = ticker.history(period="1d")['Close'].iloc[-1]
            rapor += f"{hisse}: {fiyat:.2f} TL\n"
        except:
            rapor += f"{hisse}: Veri alınamadı!\n"
    
    print(rapor)
    with open("Raporlar/borsa_durum.txt", "w") as f:
        f.write(rapor)

def github_guncelle():
    print("\n[!] Global Cyber Base guncelleniyor...")
    try:
        subprocess.run(["git", "add", "."], check=True)
        subprocess.run(["git", "commit", "-m", f"Guncelleme: {time.strftime('%H:%M:%S')}"], check=True)
        subprocess.run(["git", "push", "origin", "master"], check=True)
        print("[+] Site canliya alindi!")
    except:
        print("[X] GitHub hatası: Dosya degisikligi yok veya baglanti zayif.")

def ana_menu():
    while True:
        os.system("clear")
        print("================================")
        print("  SIBER ASISTAN | PROFESOR V2")
        print("================================")
        print("[1] Manuel Site Guncelle (Push)")
        print("[2] Sistem Temizliği Yap")
        print("[3] OTOMATIK MOD (Sürekli Takip)")
        print("[4] Borsa Verilerini Çek")
        print("[0] Çıkış")
        
        secim = input("\nKomut Bekleniyor: ")
        
        if secim == "1":
            github_guncelle()
            input("\nDevam etmek icin Enter...")
        elif secim == "2":
            sistem_temizligi()
            input("\nDevam etmek icin Enter...")
        elif secim == "3":
            print("[!] Otomatik mod aktif. (Cikis icin Ctrl+C)")
            while True:
                sistem_temizligi()
                borsa_kontrol()
                github_guncelle()
                print(f"[{time.strftime('%H:%M:%S')}] Beklemede (1 Saat)...")
                time.sleep(3600)
        elif secim == "4":
            borsa_kontrol()
            input("\nDevam etmek icin Enter...")
        elif secim == "0":
            print("Gorusmek uzere profesör!")
            break

if __name__ == "__main__":
    ana_menu()

