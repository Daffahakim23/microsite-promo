// src/utils/terbilang.js
export function toTerbilang(angka) {
    const satuan = [
        "",
        "Satu",
        "Dua",
        "Tiga",
        "Empat",
        "Lima",
        "Enam",
        "Tujuh",
        "Delapan",
        "Sembilan",
    ];
    const belasan = [
        "Sepuluh",
        "Sebelas",
        "Dua Belas",
        "Tiga Belas",
        "Empat Belas",
        "Lima Belas",
        "Enam Belas",
        "Tujuh Belas",
        "Delapan Belas",
        "Sembilan Belas",
    ];
    const puluhan = [
        "",
        "",
        "Dua Puluh",
        "Tiga Puluh",
        "Empat Puluh",
        "Lima Puluh",
        "Enam Puluh",
        "Tujuh Puluh",
        "Delapan Puluh",
        "Sembilan Puluh",
    ];
    const ribuan = ["", "Ribu", "Juta", "Miliar", "Triliun"];

    if (angka === 0) return "Masukkan Nominal Pembukaan Deposito";

    let hasil = "";
    let i = 0;
    while (angka > 0) {
        let tigaDigit = angka % 1000;
        if (tigaDigit !== 0) {
            let ratus = Math.floor(tigaDigit / 100);
            let puluh = Math.floor((tigaDigit % 100) / 10);
            let satu = tigaDigit % 10;
            let bagian = "";

            if (ratus > 0) {
                bagian += ratus === 1 ? "Seratus " : satuan[ratus] + " Ratus ";
            }
            if (puluh === 1) {
                bagian += belasan[satu] + " ";
            } else {
                if (puluh > 1) bagian += puluhan[puluh] + " ";
                if (satu > 0) bagian += satuan[satu] + " ";
            }
            hasil = bagian + ribuan[i] + " " + hasil;
        }
        angka = Math.floor(angka / 1000);
        i++;
    }
    return hasil.trim() + " Rupiah";
}