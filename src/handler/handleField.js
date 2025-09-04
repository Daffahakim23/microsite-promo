// src/mixins/handleField.js

export const handleFieldMixin = {
    data() {
        return {
            touched: {
                email: false,
                phone: false,
                nomorTeleponKD: false,
            },
            emailError: false,
            phoneError: false,
            nikError: false,
        };
    },
    methods: {
        validateEmail(email) {
            return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        },
        validatePhone(phone) {
            return /^(8)\d{8,12}$/.test(phone);
        },
        validatePhoneKD(nomorTeleponKD) {
            return /^\d{10,13}$/.test(nomorTeleponKD);
        },
        validateNik(nik) {
            const cleanedNik = String(nik).replace(/\D/g, '');
            return cleanedNik.length >= 16 && cleanedNik.length <= 20;
        },

        handleEmailBlur() {
            this.touched.email = true;
            if (this.form.email) {
                this.emailError = !this.validateEmail(this.form.email);
            } else {
                this.emailError = false;
            }
        },

        handlePhoneBlur() {
            this.touched.phone = true;
            if (this.form.phone) {
                this.phoneError = !this.validatePhone(this.form.phone);
            } else {
                this.phoneError = false; // Hapus error jika field kosong
            }
        },
        handlePhoneKDBlur() {
            this.touched.nomorTeleponKD = true;
            if (this.form.nomorTeleponKD) {
                this.phoneError = !this.validatePhoneKD(this.form.nomorTeleponKD);
            } else {
                this.phoneError = false; // Hapus error jika field kosong
            }
        },
        handleNikBlur() {
            this.touched.nik = true;
            if (this.form.nik.length > 0) {
                this.nikError = !this.validateNik(this.form.nik);
            } else {
                this.nikError = false;
            }
        },
        // handleNomorRekeningBlur() {
        //   this.touched.nomorRekening = true;
        //   if (this.form.nomorRekening.length > 0) {
        //     this.nomorRekeningError = !this.validateNomorRekening(this.form.nomorRekening);
        //   } else {
        //     this.nomorRekeningError = false;
        //   }
        // },
    },
    watch: {
        'form.email'(newEmail) {
            const trimmedEmail = newEmail ? String(newEmail).trim() : '';

            if ((this.touched.email && trimmedEmail.length > 0) || (trimmedEmail.length > 0)) {
                this.emailError = !this.validateEmail(trimmedEmail);
            } else {
                this.emailError = false;
            }
        },

        'form.phone'(newPhone) {
            const cleanedPhone = newPhone ? String(newPhone).replace(/\D/g, '') : '';

            if (cleanedPhone.startsWith('0')) {
                this.form.phone = cleanedPhone.substring(1);
            } else if (newPhone !== cleanedPhone) {
                this.form.phone = cleanedPhone;
            }

            if ((this.touched.phone && cleanedPhone.length > 0) || (cleanedPhone.length > 0)) {
                this.phoneError = !this.validatePhone(cleanedPhone);
            } else {
                this.phoneError = false;
            }
        },
        'form.nomorTeleponKD'(newPhoneKD) {
            const cleanedPhone = newPhoneKD ? String(newPhoneKD).replace(/\D/g, '') : '';

            if (newPhoneKD !== cleanedPhone) {
                this.form.nomorTeleponKD = cleanedPhone;
            }

            if ((this.touched.nomorTeleponKD && cleanedPhone.length > 0) || (cleanedPhone.length > 0)) {
                this.phoneError = !this.validatePhoneKD(cleanedPhone);
            } else {
                this.phoneError = false;
            }
        },
        // 'form.nomorTeleponKD'(newPhone) {
        //     const cleanedPhone = newPhone ? String(newPhone).replace(/\D/g, '') : '';

        //     if (cleanedPhone.startsWith('0')) {
        //         this.form.nomorTeleponKD = cleanedPhone.substring(1);
        //     } else if (newPhone !== cleanedPhone) {
        //         this.form.nomorTeleponKD = cleanedPhone;
        //     }

        //     if ((this.touched.phone && cleanedPhone.length > 0) || (cleanedPhone.length > 0)) {
        //         this.phoneError = !this.validatePhone(cleanedPhone);
        //     } else {
        //         this.phoneError = false;
        //     }
        // },
        'form.nik'(newValue) {
            const cleanedValue = String(newValue).replace(/\D/g, '').slice(0, 20);
            if (newValue !== cleanedValue) {
                this.form.nik = cleanedValue;
                return;
            }
            if ((this.touched.nik && cleanedValue.length > 0) || (cleanedValue.length > 0)) {
                this.nikError = !this.validateNik(cleanedValue);
            } else {
                this.nikError = false;
            }
        },
        // 'form.nomorRekening'(newValue) {
        //   const cleanedValue = String(newValue).replace(/\D/g, '').slice(0, 10);
        //   if (newValue !== cleanedValue) {
        //     this.form.nomorRekening = cleanedValue;
        //     return;
        //   }
        //   if ((this.touched.nomorRekening && cleanedValue.length > 0) || (cleanedValue.length > 0)) {
        //     this.nomorRekeningError = !this.validateNomorRekening(cleanedValue);
        //   } else {
        //     this.nomorRekeningError = false;
        //   }
        // },
    }
};