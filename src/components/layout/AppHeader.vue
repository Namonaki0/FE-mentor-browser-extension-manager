<script setup lang="ts">
const activate = () => {
    console.log('Swtich color mode');
};
</script>
<template>
<div class="app-header">
    <div class="logo-container">
        <img src="@/assets/images/logo.svg" alt="Logo" class="logo" /> 
    </div>
    <button class="btn btn-primary" @click="activate">
        <img src="@/assets/icons/icon-moon.svg" alt="Switch Color Mode" class="icon" />
    </button>
</div>
</template>
<style scoped lang="scss">
.app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid $neutral-300;
    border-radius: 6px;

    .logo-container {
        .logo {
            height: 40px;
        }
    }

    .btn {
        border: none;
        cursor: pointer;

        .icon {
            width: 24px;
            height: 24px;
        }
    }
}
</style>
