<template>
    <div class="profile-card mx-4 -mt-10 relative z-20 flex items-center justify-between p-4 rounded-xl shadow-sm border-1 border-[#EEEEF1] cursor-pointer"
        @click="goToAccount">
        <div class="flex items-center space-x-3">
            <div
                class="bg-blue-200 text-blue-800 rounded-full h-10 w-10 flex items-center justify-center font-bold  text-sm">
                {{ initials }}
            </div>
            <span class="text-neutral-900  font-semibold text-lg">{{ userName }}</span>
        </div>
        <i class="fas fa-chevron-right text-gray-500"></i>
    </div>
</template>

<script>
export default {
    name: 'ProfileCard',
    props: {
        userName: {
            type: String,
            default: 'Fathan Gunadi'
        }
    },
    computed: {
        initials() {
            // Mengambil inisial dari nama pengguna
            const parts = this.userName.split(' ');
            if (parts.length > 1) {
                return parts[0][0] + parts[1][0];
            }
            return parts[0][0];
        }
    },
    methods: {
        goToAccount() {
            this.$router.push('/accountScreen');
        }
    }

};
</script>

<style scoped>
.profile-card {
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 1rem;
}
</style>
