document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------
    // 1. Logika Kalkulator Karbon (Diperbarui)
    // ------------------------------------------

    const calculatorForm = document.getElementById('carbon-calculator');
    const totalCarbonDisplay = document.getElementById('total-carbon-display');
    const pohonDisplay = document.getElementById('pohon-display');
    const statusDisplay = document.getElementById('status-display');
    const actionRecommendation = document.getElementById('action-recommendation');
    const resultOutput = document.getElementById('result-output');
    const resultStatusBlock = document.querySelector('.result-status-block');

    let carbonChart;

    const CARBON_FACTORS = {
        // Coeff Listrik (Kg CO2e/kWh)
        listrik: 0.6, 
        // Coeff Transportasi (Kg CO2e/Km, asumsi bensin/diesel)
        transportasi: 0.2, 
        // Coeff Daging (Kg CO2e/porsi, asumsi daging merah)
        daging: 4.05, 
        // Coeff Air (Kg CO2e/m3, asumsi listrik pompa/pengolahan)
        air: 0.5,
        // Coeff Sampah (Kg CO2e/Kg, asumsi TPA & Methane)
        sampah: 0.4 
    };
    
    // Asumsi: 1 pohon dewasa menyerap sekitar 21 Kg CO2/tahun
    const POHON_PER_KG_TAHUN = 1 / (21 * 12); 

    const calculateCarbon = (event) => {
        event.preventDefault();

        const listrik = parseFloat(document.getElementById('listrik').value) || 0;
        const transportasi = parseFloat(document.getElementById('transportasi').value) || 0;
        const daging = parseFloat(document.getElementById('daging').value) || 0;
        const air = parseFloat(document.getElementById('air').value) || 0; 
        const sampah = parseFloat(document.getElementById('sampah').value) || 0; 

        const emisiListrik = listrik * CARBON_FACTORS.listrik;
        const emisiTransportasi = transportasi * CARBON_FACTORS.transportasi;
        const emisiDaging = daging * CARBON_FACTORS.daging;
        const emisiAir = air * CARBON_FACTORS.air; 
        const emisiSampah = sampah * CARBON_FACTORS.sampah; 

        const totalEmisi = emisiListrik + emisiTransportasi + emisiDaging + emisiAir + emisiSampah;

        // Tampilkan Hasil
        totalCarbonDisplay.innerHTML = `<i class="fas fa-smog"></i> Total Emisi Anda Bulan Ini: <strong>${totalEmisi.toFixed(2)} Kg CO2e</strong>`;
        
        // Hitung Pohon
        const treesNeeded = (totalEmisi * 12 * POHON_PER_KG_TAHUN).toFixed(1);
        pohonDisplay.textContent = `Ini setara dengan emisi ${treesNeeded} pohon dewasa per tahun.`;
        
        // Tentukan Status
        let statusText;
        let recommendationText;
        let statusColor;

        if (totalEmisi < 150) {
            statusText = 'Sangat Baik!';
            statusColor = 'var(--color-green)';
            recommendationText = 'Anda adalah warga negara yang sadar iklim. Terus pertahankan gaya hidup rendah karbon Anda!';
        } else if (totalEmisi < 300) {
            statusText = 'Baik, Perlu Peningkatan';
            statusColor = 'var(--color-yellow)';
            recommendationText = 'Emisi Anda moderat. Coba fokus pada 3R (Reduce, Reuse, Recycle) dan kurangi frekuensi makan daging merah.';
        } else {
            statusText = 'Tinggi, Segera Lakukan Aksi!';
            statusColor = 'var(--color-red)';
            recommendationText = 'Emisi Anda cukup tinggi. Pertimbangkan menggunakan transportasi umum, kurangi konsumsi daging, dan kelola sampah dengan bijak.';
        }

        statusDisplay.textContent = `Status Jejak Karbon Anda: ${statusText}`;
        statusDisplay.style.color = statusColor;
        actionRecommendation.innerHTML = `<p><strong>Saran Aksi:</strong></p><p>${recommendationText}</p>`;
        
        resultOutput.style.display = 'none';
        resultStatusBlock.style.display = 'block';

        // Update Chart
        updateChart(emisiListrik, emisiTransportasi, emisiDaging, emisiAir, emisiSampah);
    };

    const updateChart = (emisiListrik, emisiTransportasi, emisiDaging, emisiAir, emisiSampah) => {
        const data = {
            labels: ['Listrik', 'Transportasi', 'Daging Merah', 'Air', 'Sampah'],
            datasets: [{
                data: [emisiListrik, emisiTransportasi, emisiDaging, emisiAir, emisiSampah],
                backgroundColor: [
                    '#3498db', // Biru
                    '#f39c12', // Orange
                    '#e74c3c', // Merah
                    '#2980b9', // Biru gelap untuk Air
                    '#7f8c8d'  // Abu untuk Sampah
                ],
                hoverOffset: 4
            }]
        };

        if (carbonChart) {
            carbonChart.data = data;
            
            // Perbarui warna label untuk Dark Mode
            const textColor = getComputedStyle(document.body).getPropertyValue('--color-text');
            carbonChart.options.plugins.legend.labels.color = textColor;
            carbonChart.options.plugins.title.color = textColor;

            carbonChart.update();
        } else {
            const ctx = document.getElementById('carbonChart').getContext('2d');
            const textColor = getComputedStyle(document.body).getPropertyValue('--color-text');

            carbonChart = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: textColor
                            }
                        },
                        title: {
                            display: true,
                            text: 'Porsi Emisi Anda',
                            color: textColor
                        }
                    }
                }
            });
        }
    };

    calculatorForm.addEventListener('submit', calculateCarbon);

    // ------------------------------------------
    // 2. Logika Quiz Hunter
    // ------------------------------------------

    const quizQuestions = [
        {
            question: "Apa singkatan dari gas rumah kaca yang paling banyak dihasilkan dari pembakaran bahan bakar fosil?",
            options: ["CH4", "N2O", "CO2", "H2O"],
            answer: "CO2"
        },
        {
            question: "Berapa banyak pohon dewasa yang dibutuhkan rata-rata untuk menyerap 1 ton CO2 per tahun?",
            options: ["±25 Pohon", "±50 Pohon", "±10 Pohon", "±5 Pohon"],
            answer: "±50 Pohon"
        },
        {
            question: "Sektor apa yang menjadi penyumbang emisi karbon terbesar kedua di Indonesia setelah energi?",
            options: ["Transportasi", "Pertanian", "LULUCF (Penggunaan Lahan & Kehutanan)", "Industri"],
            answer: "LULUCF (Penggunaan Lahan & Kehutanan)"
        },
        {
            question: "Apa metode pengurangan jejak karbon yang paling efektif dalam kategori makanan?",
            options: ["Makan lebih banyak buah impor", "Mengurangi konsumsi daging merah", "Membeli makanan kemasan", "Memasak dengan gas"],
            answer: "Mengurangi konsumsi daging merah"
        },
        {
            question: "Koefisien emisi 0.6 Kg CO2e/kWh biasanya diasosiasikan dengan apa dalam kalkulator jejak karbon?",
            options: ["Jarak tempuh mobil", "Konsumsi air PDAM", "Konsumsi listrik PLN", "Pembuangan sampah"],
            answer: "Konsumsi listrik PLN"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let quizActive = false;
    
    const startScreen = document.getElementById('quiz-start-screen');
    const questionScreen = document.getElementById('quiz-question-screen');
    const resultScreen = document.getElementById('quiz-result-screen');
    const startBtn = document.getElementById('start-quiz-btn');
    const restartBtn = document.getElementById('restart-quiz-btn');
    const questionText = document.getElementById('question-text');
    const questionNumber = document.getElementById('question-number');
    const answerOptionsDiv = document.getElementById('answer-options');
    const feedbackText = document.getElementById('feedback-text');
    const totalScoreDisplay = document.querySelector('.total-score-display');
    const resultMessage = document.getElementById('result-message');


    const displayQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length) {
            const q = quizQuestions[currentQuestionIndex];
            
            questionNumber.textContent = `Soal ${currentQuestionIndex + 1} dari ${quizQuestions.length}`;
            questionText.textContent = q.question;
            answerOptionsDiv.innerHTML = '';
            feedbackText.textContent = '';
            
            q.options.forEach(option => {
                const btn = document.createElement('button');
                btn.textContent = option;
                btn.classList.add('answer-btn');
                btn.addEventListener('click', () => checkAnswer(option, q.answer, btn));
                answerOptionsDiv.appendChild(btn);
            });
        } else {
            showResults();
        }
    };

    const checkAnswer = (selectedOption, correctAnswer, clickedButton) => {
        if (!quizActive) return; 

        // Nonaktifkan semua tombol setelah jawaban diberikan
        quizActive = false; // Menonaktifkan quiz hingga transisi selesai
        Array.from(answerOptionsDiv.children).forEach(btn => btn.disabled = true);
        
        if (selectedOption === correctAnswer) {
            score++;
            clickedButton.classList.add('correct');
            feedbackText.textContent = "Jawaban Benar! Anda mendapatkan 1 poin.";
        } else {
            clickedButton.classList.add('wrong');
            // Tandai jawaban yang benar
            const correctBtn = Array.from(answerOptionsDiv.children).find(btn => btn.textContent === correctAnswer);
            if(correctBtn) {
                 correctBtn.classList.add('correct');
            }
            feedbackText.textContent = `Jawaban Salah. Jawaban yang benar adalah: ${correctAnswer}.`;
        }

        setTimeout(() => {
            currentQuestionIndex++;
            quizActive = true; 
            displayQuestion();
        }, 1500); // Tunda 1.5 detik sebelum ke soal berikutnya
    };
    
    const showResults = () => {
        questionScreen.style.display = 'none';
        resultScreen.style.display = 'block';
        
        totalScoreDisplay.textContent = `Skor Akhir Anda: ${score} / ${quizQuestions.length}`;

        if (score === quizQuestions.length) {
            resultMessage.textContent = 'SEMPURNA! Anda adalah Hunter Karbon sejati!';
            resultMessage.style.color = 'var(--color-green)';
        } else if (score >= quizQuestions.length / 2) {
            resultMessage.textContent = 'Bagus! Pengetahuan Anda di atas rata-rata. Terus belajar dan beraksi!';
            resultMessage.style.color = 'var(--color-yellow)';
        } else {
            resultMessage.textContent = 'Perlu ditingkatkan. Mari tonton video edukasi di atas dan coba lagi!';
            resultMessage.style.color = 'var(--color-red)';
        }
    };

    const startQuiz = () => {
        currentQuestionIndex = 0;
        score = 0;
        quizActive = true;
        startScreen.style.display = 'none';
        resultScreen.style.display = 'none';
        questionScreen.style.display = 'block';
        displayQuestion();
    };

    startBtn.addEventListener('click', startQuiz);
    restartBtn.addEventListener('click', startQuiz);

    // Inisialisasi tampilan awal
    startScreen.style.display = 'block';
    questionScreen.style.display = 'none';
    resultScreen.style.display = 'none';


    // ------------------------------------------
    // 3. Logika Dark Mode
    // ------------------------------------------
    const modeToggle = document.getElementById('mode-toggle');
    const icon = modeToggle.querySelector('i');

    const loadTheme = () => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        document.body.classList.toggle('dark-mode', isDarkMode);
        icon.classList.toggle('fa-sun', isDarkMode);
        icon.classList.toggle('fa-moon', !isDarkMode);
        
        // Memastikan warna Chart diperbarui saat dark mode dimuat
        if (carbonChart) {
            const textColor = getComputedStyle(document.body).getPropertyValue('--color-text');
            carbonChart.options.plugins.legend.labels.color = textColor;
            carbonChart.options.plugins.title.color = textColor;
            carbonChart.update();
        }
    };

    const toggleTheme = () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        icon.classList.toggle('fa-sun', isDarkMode);
        icon.classList.toggle('fa-moon', !isDarkMode);

        // Update Chart setelah toggle
        if (carbonChart) {
            const textColor = getComputedStyle(document.body).getPropertyValue('--color-text');
            carbonChart.options.plugins.legend.labels.color = textColor;
            carbonChart.options.plugins.title.color = textColor;
            carbonChart.update();
        }
    };

    modeToggle.addEventListener('click', toggleTheme);
    loadTheme();
    
    // ------------------------------------------
    // 4. Logika Menu Mobile
    // ------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Sembunyikan menu setelah mengklik link pada mode mobile
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
            }
        });
    });


    // ------------------------------------------
    // 5. Logika Glosarium (City Search) - Skeleton
    // ------------------------------------------
    // (Tambahkan data kota dan logika pencarian di sini)

});
