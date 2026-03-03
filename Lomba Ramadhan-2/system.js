let hitungan = 0;
let target = null;
const step = 85; 

const container = document.getElementById('bead-container'); //ambil wadah bolanya
const display = document.getElementById('count-display'); //ambil angka yg bkl ditampilin
const inputTarget = document.getElementById('target'); //ambil kotak input target
const bgMusic = document.getElementById('bgMusic'); //ambil elemen audio

function inisialisasiRantai() { //bikin 10 bola rantai tasbihnya
    for (let i = 0; i < 10; i++) {
        const b = document.createElement('div');
        b.className = 'bead';
        container.appendChild(b);
    }
}

function prosesScroll() { //logic waktu bola ditarik
    hitungan++;
    display.innerText = hitungan; //update angka di displaynya

    if (navigator.vibrate) navigator.vibrate(30); //getar hp

    const bolaTerakhir = container.lastElementChild;
    container.prepend(bolaTerakhir); //atur bola bwh ke atas waktu scroll

    if (target !== null && target > 0 && hitungan === target) { //cek count apa ud sm dgn target
        setTimeout(() => alert("Alhamdulillah! Target Dzikir Telah Tercapai 🌙"), 200);
    }
}

function resetDzikir() { //reset jml dzikir
    hitungan = 0;
    display.innerText = 0;
    container.style.transition = 'transform 0.3s ease-out';
    container.style.transform = 'translateY(0px)';
}

let startY = 0;
let isScrolling = false;

container.addEventListener('touchstart', (e) => { //detect posisi jari di layar
    startY = e.touches[0].clientY;
    isScrolling = true;
    container.style.transition = 'none';
});

container.addEventListener('touchmove', (e) => { //gerakin bola lewat scroll
    if (!isScrolling) return;
    let moveY = e.touches[0].clientY - startY;
    if (moveY > 0) {
        container.style.transform = `translateY(${moveY}px)`;
        if (moveY >= step) {
            prosesScroll();
            startY = e.touches[0].clientY;
        }
    }
});

container.addEventListener('touchend', () => { //atur posisi bola pas dilepas abis scroll
    isScrolling = false;
    container.style.transition = 'transform 0.3s ease-out';
    container.style.transform = 'translateY(0px)';
});

container.addEventListener('mousedown', (e) => { //detect posisi klik mouse
    startY = e.clientY;
    isScrolling = true;
    container.style.transition = 'none';
    container.style.cursor = 'grabbing';

    const onMouseMove = (me) => { //gerakin bola pas ditarik ke bwh
        if (!isScrolling) return;
        let moveY = me.clientY - startY;
        if (moveY > 0) {
            container.style.transform = `translateY(${moveY}px)`;
            if (moveY >= step) {
                prosesScroll();
                startY = me.clientY;
            }
        }
    };

    const onMouseUp = () => { //reset posisi bola pas dilepas
        isScrolling = false;
        container.style.cursor = 'grab';
        container.style.transition = 'transform 0.3s ease-out';
        container.style.transform = 'translateY(0px)';
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

container.addEventListener('wheel', (e) => { //gerakin pake wheel mouse
    if (e.deltaY > 0) {
        prosesScroll();
        container.style.transition = 'none';
        container.style.transform = 'translateY(10px)';
        setTimeout(() => {
            container.style.transition = 'transform 0.2s ease-out';
            container.style.transform = 'translateY(0px)';
        }, 50);
    }
    e.preventDefault(); //biar webnya ga kescroll
}, { passive: false });

inputTarget.addEventListener('input', () => {//update angka target
    let val = inputTarget.value;
    if (val === "" || Number(val) <= 0) {
        target = null;
    } else {
        target = Number(val);
    }
    resetDzikir(); 
});

inisialisasiRantai();//jalanin proses pembuatan bola2 tasbih