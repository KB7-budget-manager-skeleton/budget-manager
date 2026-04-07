<template>
  <form class="TransactionForm">
    <div class="FormRow">
      <label>날짜</label>
      <input type="date" />
    </div>

    <div class="FormRow">
      <label>구분</label>
      <select>
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
    </div>

    <div class="FormRow">
      <label>카테고리</label>
      <input type="text" />
    </div>

    <div class="FormRow">
      <label>금액</label>
      <input type="number" />
    </div>

    <div class="FormRow">
      <label>메모</label>
      <textarea rows="4"></textarea>
    </div>

    <div class="ButtonRow">
      <button type="button">취소</button>
      <button type="submit">저장</button>
    </div>
  </form>
</template>

<script setup></script>

<style scoped>
.TransactionForm {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  border: 1px solid #dddddd;
  border-radius: 12px;
}

.FormRow {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ButtonRow {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
