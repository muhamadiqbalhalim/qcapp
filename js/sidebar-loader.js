// js/sidebar-loader.js
import { RoleManager } from './Roles.js';

export async function loadSidebar(sidebarFile) {
    try {
        const response = await fetch(sidebarFile);
        if (!response.ok) throw new Error(`Failed to fetch sidebar: ${response.statusText}`);
        
        const html = await response.text();
        
        // 1. Suntik HTML ke dalam container
        const container = document.getElementById('sidebar-container');
        if (!container) return;
        container.innerHTML = html;
        
        // 2. Logik Highlight Automatik Berpusat
        const currentPage = window.location.pathname.split("/").pop();
        const navLinks = container.querySelectorAll('.nav-link');
        
        // Tentukan tema warna berdasarkan jenis fail sidebar
        const isBlue = sidebarFile.includes('Operator');
        const isAmber = sidebarFile.includes('Executive');
        const colorClass = isBlue ? 'blue' : (isAmber ? 'amber' : 'purple');

        navLinks.forEach(link => {
            const targetPath = link.getAttribute('data-path') || link.dataset.path;
            if (currentPage && targetPath && currentPage.includes(targetPath)) {
                // Buang kelas default
                link.classList.remove('text-slate-600', 'hover:bg-blue-50', 'hover:bg-purple-50', 'hover:bg-amber-50');
                // Tambah kelas aktif mengikut peranan
                link.classList.add(`bg-${colorClass}-50`, `text-${colorClass}-600`);
            }
        });

        // 3. Listener Logout Selamat (Mendengar terus butang di dalam sidebar yang baru disuntik)
        const logoutBtn = container.querySelector('#logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                logoutBtn.innerHTML = `<i data-lucide="loader-2" class="animate-spin" size="20"></i> Logging out...`;
                if (typeof lucide !== 'undefined') lucide.createIcons();
                
                setTimeout(() => {
                    RoleManager.forceLogout();
                }, 300);
            });
        }
        
        // 4. Render semua ikon Lucide yang baru masuk
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch (e) { 
        console.error("Error loading secure sidebar framework:", e);
    }
}