<template>
    <div v-if="isVisible" :class="['flag-box', boxClass, 'flex items-start relative']">
        <img :src="iconSrc" alt="icon" class="flag-icon self-start" />

        <div class="flag-content">
            <slot></slot>
        </div>

        <button v-if="closable" @click="isVisible = false" class="close-btn ml-auto">
            <img :src="closeIcon" alt="close" class="close-icon" />
        </button>
    </div>
</template>

<script>
import errorIcon from "@/assets/error-icon.svg";
import warningIcon from "@/assets/warning-icon.svg";
import successIcon from "@/assets/success-icon.svg";
import infoIcon from "@/assets/info-icon.svg";
import closeIcon from "@/assets/close.svg";

export default {
    name: "FlagBox",
    props: {
        type: {
            type: String,
            default: "info",
            validator: (value) => ["info", "error", "warning", "success"].includes(value),
        },
        closable: {
            type: Boolean,
            default: false,
        },
        closeIcon: {
            type: String,
            default: closeIcon,
        },
    },
    data() {
        return {
            isVisible: true,
        };
    },
    computed: {
        boxClass() {
            return {
                "flag-info": this.type === "info",
                "flag-error": this.type === "error",
                "flag-warning": this.type === "warning",
                "flag-success": this.type === "success",
            };
        },
        iconSrc() {
            switch (this.type) {
                case "error":
                    return errorIcon;
                case "warning":
                    return warningIcon;
                case "success":
                    return successIcon;
                default:
                    return infoIcon;
            }
        },
    },
};
</script>

<style scoped>
.flag-box {
    border-radius: 8px;
    padding: 12px;
    gap: 8px;
    font-weight: 300;
    position: relative;
}

.flag-icon {
    width: 20px;
    height: 20px;
}

.close-btn {
    background: none;
    border: none;
    cursor: pointer;
}

.close-icon {
    width: 32px;
    height: 32px;
}

.flag-info {
    border: 1px solid #B2D5FF;
    background-color: #E5F1FF;
    color: #001B3D;
}

.flag-error {
    border: 1px solid #FFE1E0;
    background-color: #FFB5B2;
    color: #540401;
}

.flag-warning {
    border: 1px solid #FFFDBD;
    background-color: #FFFEE0;
    color: #424000;
}

.flag-success {
    border: 1px solid #C6F0D1;
    background-color: #E7F9EB;
    color: #0C3115;
}
</style>
