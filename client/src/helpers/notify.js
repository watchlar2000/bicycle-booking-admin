import { reactive } from 'vue';

export const notify = reactive({
    isVisible: false,
    success: null,
    message: '',
    hideNotification() {
        this.isVisible = false;
        this.message = '';
        this.success = null;
    },
    delayNotification(delay = 3000) {
        setTimeout(() => {
            this.hideNotification();
        }, delay);
    },
    displayNotification(msg, isSuccess) {
        this.message = msg;
        this.isVisible = true;
        this.success = isSuccess;
        this.delayNotification();
    },
});
