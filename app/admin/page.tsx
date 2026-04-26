// app/admin/page.tsx
import { db } from "@/lib/db";
import { site_settings } from "@/lib/db/src/schema/site";
import { eq } from "drizzle-orm";

export default async function AdminPanel() {
  // Veriyi veritabanından çek
  const settings = await db.query.site_settings.findFirst();

  // Veriyi güncelleyen Server Action
  async function saveSettings(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    await db.update(site_settings).set({ site_title: title }).where(eq(site_settings.id, 1));
  }

  return (
    <div className="p-8">
      <h1>Siber Asistan Yönetim Paneli</h1>
      <form action={saveSettings}>
        <input name="title" defaultValue={settings?.site_title} className="border" />
        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
}
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/src/schema/site";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function AdminPanel() {
  // Veritabanından mevcut ayarları çekiyoruz, boşsa hata vermemesi için güvenli tutuyoruz
  const settings = await db.query.siteSettings.findFirst();

  // Güncelleme yapan güvenli fonksiyon
  async function updateSiteSettings(formData: FormData) {
    "use server";
    const newTitle = formData.get("siteTitle") as string;
    
    // Veritabanını güncelle
    await db.update(siteSettings)
      .set({ siteTitle: newTitle })
      .where(eq(siteSettings.id, 1));
      
    // İşlem bitince sayfayı yenile ki yeni başlığı hemen görebilesin
    revalidatePath("/admin");
  }

  return (
    <div className="admin-container" style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Admin Dashboard</h1>
      <form action={updateSiteSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
        <label htmlFor="siteTitle">Site Title:</label>
        <input 
          id="siteTitle"
          name="siteTitle" 
          defaultValue={settings?.siteTitle ?? ""} 
          style={{ padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem', cursor: 'pointer' }}>Save Changes</button>
      </form>
    </div>
  );
}
