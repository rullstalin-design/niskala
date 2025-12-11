/*
 * map-script.js
 * Peta Interaktif Jejak Karbon Jawa - GloKarbon v9.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi peta Jawa
    const map = L.map('carbon-map').setView([-7.250445, 112.768845], 7); // Posisi tengah Jawa
    
    // Tambahkan tile layer OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 12,
        minZoom: 6
    }).addTo(map);

    // Data koordinat dan jejak karbon untuk kota-kota di Jawa
    const cityCarbonData = [
        // Jawa Timur
        { name: "Surabaya", lat: -7.2575, lng: 112.7521, carbon: 2.8, province: "Jawa Timur", status: "high", 
          recommendation: "Tingkatkan penggunaan transportasi umum dan urban farming." },
        { name: "Malang", lat: -7.9666, lng: 112.6326, carbon: 2.6, province: "Jawa Timur", status: "high", 
          recommendation: "Kurangi penggunaan kendaraan pribadi, manfaatkan angkutan kota." },
        { name: "Sidoarjo", lat: -7.4478, lng: 112.7183, carbon: 2.3, province: "Jawa Timur", status: "medium", 
          recommendation: "Fokus pada pengelolaan limbah lumpur dan pengurangan emisi transportasi." },
        { name: "Mojokerto", lat: -7.4706, lng: 112.4401, carbon: 2.3, province: "Jawa Timur", status: "medium", 
          recommendation: "Lakukan gerakan penanaman pohon dan daur ulang aktif." },
        { name: "Gresik", lat: -7.1539, lng: 112.6561, carbon: 2.4, province: "Jawa Timur", status: "medium", 
          recommendation: "Terapkan pemilahan sampah dan kurangi limbah industri." },
        { name: "Pasuruan", lat: -7.6453, lng: 112.9075, carbon: 2.5, province: "Jawa Timur", status: "high", 
          recommendation: "Tingkatkan efisiensi energi di kantor dan rumah." },
        { name: "Probolinggo", lat: -7.7764, lng: 113.2037, carbon: 2.3, province: "Jawa Timur", status: "medium", 
          recommendation: "Dukung energi terbarukan dan program hijau di sekolah." },
        { name: "Kediri", lat: -7.8480, lng: 112.0178, carbon: 2.4, province: "Jawa Timur", status: "medium", 
          recommendation: "Gunakan transportasi umum dan beralih ke sumber energi bersih." },
        { name: "Blitar", lat: -8.0955, lng: 112.1609, carbon: 2.2, province: "Jawa Timur", status: "medium", 
          recommendation: "Fokus pada pengelolaan sampah organik dan kompos." },
        { name: "Madiun", lat: -7.6298, lng: 111.5239, carbon: 2.4, province: "Jawa Timur", status: "medium", 
          recommendation: "Dukung program jalan kaki dan bersepeda." },
        { name: "Batu", lat: -7.8671, lng: 112.5239, carbon: 2.0, province: "Jawa Timur", status: "medium", 
          recommendation: "Jaga kelestarian alam dan kurangi emisi dari pariwisata." },
        { name: "Jember", lat: -8.1845, lng: 113.6681, carbon: 1.9, province: "Jawa Timur", status: "low", 
          recommendation: "Fokus pada produk perkebunan yang berkelanjutan (misal: kopi)." },
        { name: "Banyuwangi", lat: -8.2191, lng: 114.3691, carbon: 1.8, province: "Jawa Timur", status: "low", 
          recommendation: "Dukung pariwisata hijau dan pengelolaan sampah yang modern." },
        { name: "Bondowoso", lat: -7.9135, lng: 113.8215, carbon: 1.6, province: "Jawa Timur", status: "low", 
          recommendation: "Tingkatkan efisiensi air dan energi di rumah tangga." },
        { name: "Lumajang", lat: -8.0944, lng: 113.1442, carbon: 1.7, province: "Jawa Timur", status: "low", 
          recommendation: "Lindungi kawasan Bromo-Tengger-Semeru dan dukung konservasi alam." },
        { name: "Banyuwangi", lat: -8.2191, lng: 114.3691, carbon: 1.8, province: "Jawa Timur", status: "low", 
          recommendation: "Dukung pariwisata hijau dan pengelolaan sampah yang modern." },
        
        // Jawa Tengah
        { name: "Semarang", lat: -6.9667, lng: 110.4167, carbon: 2.7, province: "Jawa Tengah", status: "high", 
          recommendation: "Tingkatkan penggunaan transportasi umum dan kurangi perjalanan darat antar kota." },
        { name: "Surakarta", lat: -7.5755, lng: 110.8243, carbon: 2.6, province: "Jawa Tengah", status: "high", 
          recommendation: "Dukung program bus listrik kota dan konservasi energi di bangunan bersejarah." },
        { name: "Magelang", lat: -7.4706, lng: 110.2177, carbon: 2.4, province: "Jawa Tengah", status: "medium", 
          recommendation: "Gunakan transportasi publik dan bersepeda untuk aktivitas sehari-hari." },
        { name: "Salatiga", lat: -7.3305, lng: 110.5084, carbon: 2.3, province: "Jawa Tengah", status: "medium", 
          recommendation: "Kota hijau: fokus pada penanaman pohon dan pengurangan sampah organik." },
        { name: "Pekalongan", lat: -6.8883, lng: 109.6753, carbon: 2.5, province: "Jawa Tengah", status: "high", 
          recommendation: "Fokus pada industri tekstil berkelanjutan dan pengurangan emisi transportasi." },
        { name: "Tegal", lat: -6.8586, lng: 109.1404, carbon: 2.4, province: "Jawa Tengah", status: "medium", 
          recommendation: "Minimalkan limbah dan dukung inisiatif komunitas sadar iklim." },
        { name: "Cilacap", lat: -7.7333, lng: 109.0000, carbon: 2.3, province: "Jawa Tengah", status: "medium", 
          recommendation: "Dukung transisi dari energi fosil dan kelola limbah minyak jelantah." },
        
        // Jawa Barat
        { name: "Bandung", lat: -6.9175, lng: 107.6191, carbon: 2.8, province: "Jawa Barat", status: "high", 
          recommendation: "Maksimalkan penggunaan transportasi umum dan bersepeda untuk mengurangi kemacetan." },
        { name: "Bekasi", lat: -6.2383, lng: 106.9756, carbon: 2.9, province: "Jawa Barat", status: "high", 
          recommendation: "Kurangi konsumsi listrik dan air, serta tingkatkan urban farming." },
        { name: "Depok", lat: -6.4025, lng: 106.7942, carbon: 2.7, province: "Jawa Barat", status: "high", 
          recommendation: "Gunakan mode transportasi non-motor dan minimalkan penggunaan generator." },
        { name: "Bogor", lat: -6.5971, lng: 106.8060, carbon: 2.7, province: "Jawa Barat", status: "high", 
          recommendation: "Jaga area hijau kota dan kurangi limbah makanan rumah tangga." },
        { name: "Cimahi", lat: -6.8722, lng: 107.5422, carbon: 2.6, province: "Jawa Barat", status: "high", 
          recommendation: "Terapkan pemilahan sampah ketat dan hindari membeli pakaian fast fashion." },
        { name: "Sukabumi", lat: -6.9277, lng: 106.9300, carbon: 2.0, province: "Jawa Barat", status: "medium", 
          recommendation: "Fokus pada konservasi energi dan kurangi konsumsi daging." },
        { name: "Cirebon", lat: -6.7320, lng: 108.5523, carbon: 2.5, province: "Jawa Barat", status: "high", 
          recommendation: "Hemat energi AC/pendingin ruangan dan dukung pasar tradisional." },
        { name: "Garut", lat: -7.2035, lng: 107.9094, carbon: 1.6, province: "Jawa Barat", status: "low", 
          recommendation: "Jaga kelestarian alam dan kurangi jejak karbon dari perjalanan wisata." },
        { name: "Tasikmalaya", lat: -7.3167, lng: 108.2000, carbon: 2.1, province: "Jawa Barat", status: "medium", 
          recommendation: "Dukung energi terbarukan lokal dan tingkatkan kesadaran iklim komunitas." },
        
        // Banten
        { name: "Serang", lat: -6.1200, lng: 106.1503, carbon: 2.4, province: "Banten", status: "medium", 
          recommendation: "Tingkatkan penggunaan kendaraan yang efisien bahan bakar atau beralih ke kendaraan listrik/hybrid." },
        { name: "Tangerang", lat: -6.1783, lng: 106.6319, carbon: 2.6, province: "Banten", status: "high", 
          recommendation: "Aktif dalam kampanye pengurangan limbah makanan dan optimalkan penggunaan transportasi massal." },
        { name: "Cilegon", lat: -6.0166, lng: 106.0403, carbon: 2.8, province: "Banten", status: "high", 
          recommendation: "Lakukan audit energi di rumah, dan kurangi konsumsi produk dari industri padat energi." },
        { name: "Tangerang Selatan", lat: -6.2886, lng: 106.7181, carbon: 2.7, province: "Banten", status: "high", 
          recommendation: "Cari sumber energi bersih, dan fokus pada gaya hidup minimalis untuk mengurangi emisi konsumsi." },
        
        // DKI Jakarta
        { name: "Jakarta Pusat", lat: -6.1865, lng: 106.8342, carbon: 3.2, province: "DKI Jakarta", status: "high", 
          recommendation: "Beralih sepenuhnya ke transportasi umum atau sepeda, dan kurangi pemakaian AC." },
        { name: "Jakarta Selatan", lat: -6.2615, lng: 106.8106, carbon: 3.3, province: "DKI Jakarta", status: "high", 
          recommendation: "Dukung inisiatif bangunan hijau dan prioritaskan pembelian produk lokal untuk mengurangi emisi rantai pasok." },
        { name: "Jakarta Timur", lat: -6.2250, lng: 106.9000, carbon: 2.9, province: "DKI Jakarta", status: "high", 
          recommendation: "Kurangi konsumsi daging merah dan maksimalkan daur ulang limbah rumah tangga." },
        { name: "Jakarta Barat", lat: -6.1578, lng: 106.7178, carbon: 3.1, province: "DKI Jakarta", status: "high", 
          recommendation: "Optimalkan pencahayaan alami di kantor/rumah dan pertimbangkan opsi carpooling." },
        { name: "Jakarta Utara", lat: -6.1333, lng: 106.8833, carbon: 3.0, province: "DKI Jakarta", status: "high", 
          recommendation: "Dukung program konservasi pesisir dan pastikan sampah terpilah untuk didaur ulang." },
        
        // DI Yogyakarta
        { name: "Yogyakarta", lat: -7.7956, lng: 110.3695, carbon: 2.7, province: "DI Yogyakarta", status: "high", 
          recommendation: "Gunakan transportasi non-motor, dukung gerakan zero waste." },
        { name: "Sleman", lat: -7.7156, lng: 110.3556, carbon: 2.5, province: "DI Yogyakarta", status: "high", 
          recommendation: "Tingkatkan daur ulang sampah dan kurangi penggunaan air tanah." },
        { name: "Bantul", lat: -7.8833, lng: 110.3333, carbon: 2.3, province: "DI Yogyakarta", status: "medium", 
          recommendation: "Dukung pertanian organik dan konservasi lahan pertanian." },
        { name: "Gunungkidul", lat: -8.0306, lng: 110.6167, carbon: 1.7, province: "DI Yogyakarta", status: "low", 
          recommendation: "Fokus pada konservasi air dan energi di kawasan kering." }
    ];

    // Fungsi untuk mendapatkan warna berdasarkan status
    function getStatusColor(status) {
        switch(status) {
            case 'low': return '#10b981';    // Hijau
            case 'medium': return '#f59e0b'; // Kuning
            case 'high': return '#ef4444';   // Merah
            default: return '#6b7280';       // Abu-abu
        }
    }

    // Fungsi untuk mendapatkan status text
    function getStatusText(status) {
        switch(status) {
            case 'low': return 'Rendah';
            case 'medium': return 'Sedang';
            case 'high': return 'Tinggi';
            default: return 'Tidak diketahui';
        }
    }

    // Fungsi untuk mendapatkan status class
    function getStatusClass(status) {
        switch(status) {
            case 'low': return 'badge-low';
            case 'medium': return 'badge-medium';
            case 'high': return 'badge-high';
            default: return '';
        }
    }

    // Tambahkan marker untuk setiap kota
    cityCarbonData.forEach(city => {
        // Buat custom icon berdasarkan status
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="
                    background: ${getStatusColor(city.status)};
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " title="${city.name} - ${city.carbon.toFixed(1)} ton">
                    ${city.carbon.toFixed(1)}
                </div>
            `,
            iconSize: [35, 35],
            iconAnchor: [17.5, 17.5]
        });

        // Tambahkan marker ke peta
        const marker = L.marker([city.lat, city.lng], { icon: icon }).addTo(map);
        
        // Tambahkan tooltip
        marker.bindTooltip(`
            <div style="font-weight: bold; margin-bottom: 5px; color: ${getStatusColor(city.status)};">
                ${city.name}
            </div>
            <div style="font-size: 0.9rem;">
                <span class="${getStatusClass(city.status)}" style="margin-right: 5px;">
                    ${getStatusText(city.status)}
                </span>
                ${city.carbon.toFixed(1)} ton/kapita
            </div>
        `);
        
        // Tambahkan popup detail
        marker.bindPopup(`
            <div style="min-width: 280px; padding: 15px; font-family: 'Inter', sans-serif;">
                <h3 style="margin-top: 0; color: ${getStatusColor(city.status)}; border-bottom: 2px solid ${getStatusColor(city.status)}; padding-bottom: 10px;">
                    <i class="fas fa-city"></i> ${city.name}
                </h3>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Provinsi:</strong> ${city.province}</p>
                    <p style="margin: 5px 0;"><strong>Jejak Karbon:</strong> <span style="color: ${getStatusColor(city.status)}; font-weight: bold;">${city.carbon.toFixed(1)} ton CO2e/kapita/tahun</span></p>
                    <p style="margin: 5px 0;"><strong>Status:</strong> <span class="${getStatusClass(city.status)}">${getStatusText(city.status)}</span></p>
                </div>
                <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; border-left: 4px solid ${getStatusColor(city.status)}; margin: 15px 0;">
                    <strong style="color: #333;"><i class="fas fa-lightbulb"></i> Rekomendasi:</strong><br>
                    <p style="margin: 10px 0 0 0; font-size: 0.95rem;">${city.recommendation}</p>
                </div>
                <button onclick="showCityInGlosarium('${city.name}')" 
                        style="margin-top: 10px; padding: 10px 15px; background: ${getStatusColor(city.status)}; color: white; border: none; border-radius: 8px; cursor: pointer; width: 100%; font-weight: 600; transition: all 0.3s ease;"
                        onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.2)';"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                    <i class="fas fa-search"></i> Lihat Detail di Glosarium
                </button>
            </div>
        `);
        
        // Event listener untuk marker click
        marker.on('click', function() {
            showMapInfoPanel(city);
            // Tambahkan efek animasi pada marker
            const markerDiv = marker.getElement();
            if (markerDiv) {
                markerDiv.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    markerDiv.style.transform = 'scale(1)';
                }, 300);
            }
        });
        
        // Hover effect
        marker.on('mouseover', function() {
            const markerDiv = marker.getElement();
            if (markerDiv) {
                markerDiv.style.transform = 'scale(1.1)';
                markerDiv.style.transition = 'transform 0.3s ease';
            }
        });
        
        marker.on('mouseout', function() {
            const markerDiv = marker.getElement();
            if (markerDiv) {
                markerDiv.style.transform = 'scale(1)';
            }
        });
    });

    // Fungsi untuk menampilkan panel info
    function showMapInfoPanel(city) {
        const panel = document.getElementById('map-info-panel');
        const nameEl = document.getElementById('selected-region-name');
        const levelEl = document.getElementById('selected-carbon-level');
        const footprintEl = document.getElementById('selected-carbon-footprint');
        const statusEl = document.getElementById('selected-carbon-status');
        const recommendationEl = document.getElementById('selected-recommendation');
        
        // Update konten
        nameEl.textContent = `${city.name}, ${city.province}`;
        levelEl.textContent = getStatusText(city.status);
        levelEl.style.color = getStatusColor(city.status);
        footprintEl.textContent = `${city.carbon.toFixed(1)} ton/kapita/tahun`;
        footprintEl.style.color = getStatusColor(city.status);
        
        // Update status dengan badge
        statusEl.innerHTML = `<span class="${getStatusClass(city.status)}" style="font-size: 1rem; padding: 8px 15px;">${getStatusText(city.status)}</span>`;
        
        recommendationEl.textContent = city.recommendation;
        
        // Tambahkan animasi slide in
        panel.style.display = 'block';
        panel.style.animation = 'slideInRight 0.5s ease';
        
        // Zoom ke marker dengan animasi
        map.flyTo([city.lat, city.lng], 10, {
            duration: 1,
            easeLinearity: 0.25
        });
    }

    // Fungsi untuk menutup panel info
    window.closeMapInfo = function() {
        const panel = document.getElementById('map-info-panel');
        panel.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            panel.style.display = 'none';
        }, 450);
    };

    // Fungsi untuk mencari kota di glosarium dari peta
    window.showCityInGlosarium = function(cityName) {
        // Tutup panel info peta
        closeMapInfo();
        
        // Scroll ke glosarium section
        setTimeout(() => {
            const glosariumSection = document.getElementById('glosarium-karbon');
            if (glosariumSection) {
                glosariumSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Tambahkan efek highlight
                glosariumSection.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.3)';
                setTimeout(() => {
                    glosariumSection.style.boxShadow = 'none';
                }, 2000);
                
                // Isi input search
                const searchInput = document.getElementById('city-search-input');
                if (searchInput) {
                    searchInput.value = cityName;
                    
                    // Trigger search setelah delay kecil
                    setTimeout(() => {
                        if (typeof searchCity === 'function') {
                            searchCity();
                        }
                    }, 800);
                }
            }
        }, 500);
    };

    // Tambahkan kontrol layer
    const baseLayers = {
        "Peta Standar": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }),
        "Peta Satelit": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri, Maxar, Earthstar Geographics'
        }),
        "Peta Gelap": L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap, © CartoDB'
        })
    };

    // Tambahkan layer control
    L.control.layers(baseLayers).addTo(map);

    // Tambahkan skala
    L.control.scale({
        imperial: false,
        metric: true,
        position: 'bottomleft'
    }).addTo(map);

    // Tambahkan kontrol zoom
    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    // Tambahkan animasi CSS untuk panel info
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%) translateY(-50%);
                opacity: 0;
            }
            to {
                transform: translateX(0) translateY(-50%);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0) translateY(-50%);
                opacity: 1;
            }
            to {
                transform: translateX(100%) translateY(-50%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Handle dark mode untuk peta
    const modeToggle = document.getElementById('mode-toggle');
    if (modeToggle) {
        modeToggle.addEventListener('click', function() {
            // Refresh peta untuk update tema
            setTimeout(() => {
                map.invalidateSize();
            }, 300);
        });
    }

    // Tambahkan event listener untuk klik di luar panel info
    document.addEventListener('click', function(event) {
        const panel = document.getElementById('map-info-panel');
        const mapContainer = document.getElementById('carbon-map');
        
        if (panel && panel.style.display === 'block' && 
            !panel.contains(event.target) && 
            !mapContainer.contains(event.target)) {
            closeMapInfo();
        }
    });

    // Inisialisasi tooltip statistik peta
    const mapStats = document.createElement('div');
    mapStats.className = 'map-stats';
    mapStats.innerHTML = `
        <div style="position: absolute; bottom: 20px; left: 20px; background: var(--color-card-bg); padding: 15px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); z-index: 1000; border: 2px solid var(--color-border);">
            <h4 style="margin: 0 0 10px 0; color: var(--color-primary); font-size: 1rem;">
                <i class="fas fa-chart-bar"></i> Statistik Peta
            </h4>
            <div style="display: flex; gap: 15px; font-size: 0.9rem;">
                <div>
                    <div style="color: #10b981; font-weight: bold;">${cityCarbonData.filter(c => c.status === 'low').length}</div>
                    <div style="color: var(--color-text-light);">Rendah</div>
                </div>
                <div>
                    <div style="color: #f59e0b; font-weight: bold;">${cityCarbonData.filter(c => c.status === 'medium').length}</div>
                    <div style="color: var(--color-text-light);">Sedang</div>
                </div>
                <div>
                    <div style="color: #ef4444; font-weight: bold;">${cityCarbonData.filter(c => c.status === 'high').length}</div>
                    <div style="color: var(--color-text-light);">Tinggi</div>
                </div>
            </div>
        </div>
    `;
    
    // Sisipkan statistik ke dalam container peta
    const mapContainer = document.getElementById('carbon-map');
    if (mapContainer) {
        mapContainer.appendChild(mapStats);
    }

    console.log('Peta Jejak Karbon Jawa v9.0 telah dimuat dengan sukses!');
    console.log(`Total wilayah yang ditampilkan: ${cityCarbonData.length} kota/kabupaten`);
    console.log('Fitur: Marker interaktif, Zoom, Layer control, Panel info, Integrasi glosarium');
});
