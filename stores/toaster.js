export const useToasterStore = defineStore('toaster', {
    state: () => ({ 
        info: [], 
        success: [], 
        wrong: [], 
        delete: [], 
    }),

    actions: {
        // Info
        addInfo() {
            this.info.push(true);
            this.removeInfoAuto(this.info.length-1);
        },
        removeInfoAuto(index) {
            setTimeout(() => {
                this.info[index] = false;
            },4000)
        },
        removeInfo(index) {
            this.info[index] = false;
        },

        // Success
        addSuccess() {
            this.success.push(true);
            this.removeSuccessAuto(this.success.length-1);
        },
        removeSuccessAuto(index) {
            setTimeout(() => {
                this.success[index] = false;
            },4000)
        },
        removeSuccess(index) {
            this.success[index] = false;
        },

        // Wrong
        addWrong() {
            this.wrong.push(true);
            this.removeWrongAuto(this.wrong.length-1);
        },
        removeWrongAuto(index) {
            setTimeout(() => {
                this.wrong[index] = false;
            },4000)
        },
        removeWrong(index) {
            this.wrong[index] = false;
        },

        // Delete
        addDelete() {
            this.delete.push(true);
            this.removeDeleteAuto(this.delete.length-1);
        },
        removeDeleteAuto(index) {
            setTimeout(() => {
                this.delete[index] = false;
            },4000)
        },
        removeDelete(index) {
            this.delete[index] = false;
        },
    },
})