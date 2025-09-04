<template>
  <div class="p-6 bg-neutral-100">
    <div class="flex flex-col items-center justify-center gap-y-4">
      <div class="flex flex-wrap items-center justify-center gap-4 text-primary text-sm">
        <a @click="downloadProductDetails" class="hover:underline cursor-pointer">Info Produk</a>
        <img src="@/assets/divider-vertical.png" alt="divider-vertical" class="h-6" />
        <a @click="downloadFAQ" class="hover:underline cursor-pointer">FAQ</a>
        <img src="@/assets/divider-vertical.png" alt="divider-vertical" class="h-6" />
        <a @click="downloadTentang" class="hover:underline cursor-pointer">Tentang</a>
        <img src="@/assets/divider-vertical.png" alt="divider-vertical" class="h-6" />
        <a @click="downloadSK" class="hover:underline cursor-pointer">Syarat & Ketentuan</a>
        <img src="@/assets/divider-vertical.png" alt="divider-vertical" class="h-6" />
        <a @click="downloadKP" class="hover:underline cursor-pointer">Kebijakan Privasi</a>
      </div>

      <div class="text-center text-neutral-600 text-xs sm:text-sm">
        <p>
          Bank Universal BPR berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK) dan Bank Indonesia (BI) serta
          merupakan peserta penjaminan Lembaga Penjamin Simpanan (LPS)
        </p>
      </div>

      <div class="flex space-x-8">
        <a href="https://www.instagram.com/universalbpr/" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/Instagram.png" alt="Instagram" class="h-6" />
        </a>
        <a href="https://www.tiktok.com/@universalbpr" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/Tiktok.png" alt="TikTok" class="h-6" />
        </a>
        <a href="https://www.youtube.com/channel/UCTm3R-5g2erKCvS93MvboQA" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/Youtube.png" alt="YouTube" class="h-6" />
        </a>
        <a href="https://www.facebook.com/universalbpr/about/" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/Facebook.png" alt="Facebook" class="h-6" />
        </a>
        <a href="https://www.universalbpr.co.id/" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/Website.png" alt="Website" class="h-6" />
        </a>
      </div>

      <div class="text-center text-neutral-800 text-xs sm:text-sm">
        <b>© 2025 UniversalBPR</b>
      </div>
    </div>
  </div>
</template>

<script>
import infoProdukPdf from '@/assets/INFO-PRODUK.pdf';
import syaratKetentuanPdf from '@/assets/syarat-ketentuan.pdf';
import kebijakanPrivasiPdf from '@/assets/kebijakan-privasi.pdf';
import faqPdf from '@/assets/FAQ.pdf';
import tentangKamiPdf from '@/assets/Tentang.pdf';

export default {
  name: "Footer",
  methods: {
    downloadProductDetails() {
      const fileUrl = infoProdukPdf;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "INFO-PRODUK.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadSK() {
      const fileUrl = syaratKetentuanPdf;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "Syarat & ketentuan.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadKP() {
      const fileUrl = kebijakanPrivasiPdf;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "Kebijakan Privasi.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadFAQ() {
      const fileUrl = faqPdf;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "FAQ.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadTentang() {
      const fileUrl = tentangKamiPdf;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "Tentang.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  }
};
</script>