export class FormModelDataKTP {
  constructor() {
    this.kewarganegaraan = "";
    this.kewarganegaraanLainnya = "";
    this.nik = "";
    this.namaLengkap = "";
    this.tanggalLahir = "";
    this.tempatLahir = "";
    this.jenisKelamin = "";
    this.agama = "";
    this.alamat = "";
    this.rt = "";
    this.rw = "";
    this.provinsi = "";
    this.kabupaten = "";
    this.kecamatan = "";
    this.kelurahan = "";
    this.kodePos = "";
    this.statusPerkawinan = "";
    this.masaAktifKtp = "";
    this.masaAktifKtpLainnya = "";
    this.namaIbuKandung = "";
  }
}

export class FormModelDataPribadi {
  constructor() {
    this.namaPanggilan = "";
    this.tujuan = "";
    this.tujuanLainnya = "";
    this.kantorCabang = "";
    this.alamatKantorCabang = "";
    this.pendidikanTerakhir = "";
    this.email = "";
    this.hobi = "";
    this.hobiLainnya = "";
    this.nomorTelepon = "";
    this.nomorFax = "";
    this.alamatSesuaiEktp = "";
    this.ubahNoTelepon = "";
    this.alamat = "";
    this.rt = "";
    this.rw = "";
    this.provinsi = "";
    this.kabupaten = "";
    this.kecamatan = "";
    this.kelurahan = "";
    this.kodePos = "";
  }
}


export class FormModelPengirimPemindahbukuan {
  constructor(namaBankBPR = "") {
    this.namaPemilikRekening = "";
    this.namaLengkapPengirim = "";
    this.tanggalPengajuan = "";
    this.nomorRekeningPengirim = "";
    this.sumberDana = "";
    this.phonePengirim = "";
    this.email = "";
    this.tujuanTransfer = "";
    this.namaLengkap = "";
    this.phone = "";
    this.alamat = "";
    this.nomorRekening = "";
    this.namaBank = "";
    this.namaBankBPR = namaBankBPR;
    this.keteranganTransaksi = "";
    this.nominal = "";
    this.metodeTransfer = "";
    this.biayaTransfer = "";
  }
}

export class FormModelPenerimaPemindahbukuan {
  constructor() {
    this.namaLengkap = "";
    this.phone = "";
    this.alamat = "";
    this.nomorRekening = "";
    this.namaBank = "";
    this.keteranganTransaksi = "";
    this.nominal = "";
    this.metodeTransfer = "";
    this.biayaTransfer = "";
    this.tujuanTransfer = "";
  }
}

export class FormModelPerubahanData {
  constructor() {
    this.perubahanData = "";
    this.alamat = "";
    this.rt = "";
    this.rw = "";
    this.provinsi = "";
    this.kabupaten = "";
    this.kecamatan = "";
    this.kelurahan = "";
    this.kodePos = "";
    this.alamat_kantor = "";
    this.nomor_telp = "";
    this.nomor_fax = "";
    this.email = "";
  }
}

export class FormModelPenempatanDeposito {
  constructor(namaBank = "") {
    this.nominal = "";
    this.terbilang = "";
    this.jangkaWaktu = "";
    this.sukuBunga = "";
    this.metodePencairan = "";
    this.namaBank = namaBank;
    this.nomorRekening = "";
    this.nomorRekeningPemilik = "";
    this.namaLengkap = "";
    this.kantorCabang = "";
    this.alamatKantorCabang = "";
    this.produkDeposito = "";
    this.pembayaranBunga = "";
    this.metodePenyetoran = "";
    this.nomorRekeningDeposito = "";
    this.tanggalInstruksiPencairanDeposito = "";
    this.tanggalJatuhTempoDeposito = "";
    this.alasanPencairan = "";
    this.biayaTransfer = "";
    this.metodeTransfer = "";
    this.setujuBiayaTransfer = "";
    this.nomorRekeningPenyetoran = "";
    this.namaRekeningPenyetoran = "";
    this.belumPunyaRekening = "";
    this.memilikiTabungan = "";
    this.isChecked = "";
    this.setujuPenyetoran = false;
  }
}

export class FormModelRequestEmailVerification {
  constructor() {
    this.produk = "";
    this.produkDeposito = "";
    this.email = "";
    this.phone = "";
    this.namaFundingOfficer = "";
    this.sumber = "";
    this.sumberLainnya = "";
    this.nomorRekening = "";
    this.nomorRekeningPemilik = "";
    this.kantorCabang = "";
    this.belumPunyaRekening = false;
    this.alamatKantorCabang = "";
    this.memilikiTabungan = "";
    this.namaLengkap = "";
    this.tandaPengenal = "";
    this.nomorRekeningDeposito = "";
    this.tujuan = "";
    this.tujuanLainnya = "";
    this.sumberDana = "";
    this.sumberDanaLainnya = "";
    this.tanggalPengajuan = "";
  }
}

export class FormModelKonfirmasiData {
  constructor() {
    this.persetujuan = "";
    this.setujuPenyetoran = "";
    this.isChecked = "";
  }
}

export class FormModelNPWP {
  constructor() {
    this.npwp = "";
    this.npwp2 = "";
  }
}

export class FormModelDataPekerjaan {
  constructor() {
    this.pekerjaan = "";
    this.pekerjaanLainnya = "";
    this.penghasilan = "";
    this.penghasilanLainnya = "";
    this.jumlahPenghasilan = "";
    this.sumberDanaMilikPribadi = "";
    this.hubunganNasabahBO = "";
    this.hubunganNasabahLainnyaBO = "";
    this.jenisIdentitasBO = "";
    this.jenisIdentitasLainnyaBO = "";
    this.kewarganegaraanBO = "";
    this.kewarganegaraanLainnyaBO = "";
    this.namaLengkapBO = "";
    this.nomorDokumenIdentitasBO = "";
    this.alamatBO = "";
    this.kotaPerusahaanBO = "";
    this.kodePosPerusahaanBO = "";
    this.rtBO = "";
    this.rwBO = "";
    this.provinsiBO = "";
    this.kabupatenBO = "";
    this.kecamatanBO = "";
    this.kelurahanBO = "";
    this.kodePosBO = "";
    this.tempatLahirBO = "";
    this.tanggalLahirBO = "";
    this.jenisKelaminBO = "";
    this.statusPerkawinanBO = "";
    this.pekerjaanBO = "";
    this.pekerjaanLainnyaBO = "";
    this.namaPerusahaanBO = "";
    this.alamatPerusahaanBO = "";
    this.jabatanBO = "";
    this.jabatanLainnyaBO = "";
    this.lamaBekerjaTahunBO = 0;
    this.lamaBekerjaBulanBO = 0;
    this.penghasilanBO = "";
    this.penghasilanLainnyaBO = "";
    this.jumlahPenghasilanBO = "";
    this.namaPerusahaanDK = "";
    this.kotaPerusahaanDK = "";
    this.kodePosPerusahaanDK = "";
    this.bidangPekerjaanDK = "";
    this.bidangPekerjaanLainnyaDK = "";
    this.jabatanDK = "";
    this.jabatanLainnyaDK = "";
    this.alamatDK = "";
    this.lamaBekerjaTahunDK = 0;
    this.lamaBekerjaBulanDK = 0;
    this.nomorTeleponKantorDK = "";
    this.nomorTeleponFaxDK = "";
    this.korespondensi = "";
    this.namaLengkapKD = "";
    this.hubunganPemohonKD = "";
    this.hubunganPemohonKDLainnya = "";
    this.alamatKD = "";
    this.nomorTeleponKD = "";
    this.ubahPekerjaan = "";
    this.npwp = "";
    this.pernyataanChecked = false;
  }
}