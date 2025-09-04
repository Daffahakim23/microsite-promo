<template>
  <div class="section">
    <div class="cards-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Section",
};
</script>

<style scoped>
.section {
  background-color: #f5f5f5;
  border-radius: 8px;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.cards-container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 35px;
}

@media (max-width: 768px) {
  .cards-container {
    display: flex;
    align-items: stretch;
    justify-items: center;
    flex-direction: column;
    gap: 30px;
  }
}
</style>
