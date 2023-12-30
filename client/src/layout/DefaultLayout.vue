<template>
    <div class="container">
        <header class="header bg">
            <div class="content-wrapper">
                <slot name="header"></slot>
            </div>
        </header>
        <main class="main">
            <div class="content-wrapper main__content">
                <slot name="main"></slot>
            </div>
        </main>
        <footer class="footer bg">
            <div class="content-wrapper">
                <slot name="footer"></slot>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
}

.header,
.footer,
.main {
    display: flex;
    justify-content: center;
    padding: 0.5rem 1rem;
    width: 100%;
}

.header,
.footer {
    color: #e8e8e8;
}

.footer .content-wrapper {
    display: flex;
    justify-content: flex-end;
}

.main {
    flex: 1;
}

.content-wrapper {
    max-width: 1200px;
    width: 1200px;
}

.main__content {
    display: flex;
    gap: 1.5rem;
}

.bg {
    background-color: #696969;
}

.form__controls button {
    border-radius: 5px;
    cursor: pointer;
    flex: 1;
    font-size: 14px;
    font-weight: bold;
    height: 24px;
    justify-content: center;
    padding: 4px 22px;
    text-transform: uppercase;
}
</style>
