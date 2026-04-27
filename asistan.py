import os
import json
import datetime # En üste ekle

# Güncelleme yapıldı mesajının olduğu kısma ekle:
print(f"[{datetime.datetime.now()}] Güncelleme yapıldı: {yeni_baslik}")

def veriyi_guncelle(yeni_baslik, yeni_icerik):
    data = {
        "haberler": [{"baslik": yeni_baslik, "icerik": yeni_icerik}],
        "projeler": [{"ad": "Siber Asistan", "link": "#"}]
    }
    with open('veri.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    
    # Git işlemleri
    os.system("git add .")
    os.system('git commit -m "Asistan guncelleme"')
    os.system("git push origin ana")
    print("İşlem başarıyla tamamlandı.")

if __name__ == "__main__":
    veriyi_guncelle("Sistem Durumu", "Siber Üs aktif ve çalışıyor.")

