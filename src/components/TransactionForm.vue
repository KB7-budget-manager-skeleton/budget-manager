<template>
  <form class="transaction-form">
    <!-- 구분 -->
    <div class="form-row">
      <label>구분</label>
      <select
        :value="modelValue.type"
        @change="
          emit('update:modelValue', {
            ...modelValue,
            type: $event.target.value,
            category: '',
          })
        "
      >
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
    </div>

    <!-- 날짜 -->
    <div class="form-row">
      <label>날짜</label>
      <input
        type="date"
        :value="modelValue.date"
        @input="
          emit('update:modelValue', {
            ...modelValue,
            date: $event.target.value,
          })
        "
      />
    </div>

    <!-- 사용처 -->
    <div class="form-row">
      <label>사용처</label>
      <input
        type="text"
        :value="modelValue.location"
        @input="
          emit('update:modelValue', {
            ...modelValue,
            location: $event.target.value,
          })
        "
      />
    </div>

    <!-- 카테고리 -->
    <div class="form-row">
      <label>카테고리</label>
      <select
        :value="modelValue.category"
        @change="
          emit('update:modelValue', {
            ...modelValue,
            category: $event.target.value,
          })
        "
      >
        <option value="">선택</option>
        <option v-for="cat in categoryOptions" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>

    <!-- 품목 목록 -->
    <div v-for="(row, index) in modelValue.items" :key="index" class="form-row">
      <input
        type="text"
        :value="row.item"
        placeholder="품목명"
        @input="updateItem(index, 'item', $event.target.value)"
      />
      <input
        type="number"
        :value="row.amount"
        placeholder="가격"
        @input="updateItem(index, 'amount', Number($event.target.value))"
      />
      <button type="button" @click="toggleMemo(index)">메모</button>

      <div v-if="row.showMemo">
        <textarea
          :value="row.memo"
          @input="updateItem(index, 'memo', $event.target.value)"
        ></textarea>
        <button type="button" @click="closeMemo(index)">저장</button>
      </div>
    </div>

    <!-- 품목 추가 -->
    <button type="button" @click="addItem">+</button>

    <!-- 액션 버튼 -->
    <div class="button-row">
      <button type="button" @click="emit('cancel')">취소</button>
      <button type="button" @click="emit('submit')">저장</button>
    </div>
  </form>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: Object, required: true },
});

const emit = defineEmits(['update:modelValue', 'submit', 'cancel']);

// type에 따라 카테고리 옵션 변경
const categoryOptions = computed(() =>
  props.modelValue.type === 'income'
    ? ['월급', '용돈', '이자']
    : ['식비', '교통비', '유흥', '공과금'],
);

// 특정 품목 행의 필드 업데이트
const updateItem = (index, field, value) => {
  const newItems = props.modelValue.items.map((row, i) =>
    i === index ? { ...row, [field]: value } : row,
  );
  emit('update:modelValue', { ...props.modelValue, items: newItems });
};

// 빈 품목 행 추가
const addItem = () => {
  const newItems = [
    ...props.modelValue.items,
    { item: '', amount: 0, memo: '', showMemo: false },
  ];
  emit('update:modelValue', { ...props.modelValue, items: newItems });
};

// 메모 textarea 토글
const toggleMemo = (index) => {
  const newItems = props.modelValue.items.map((row, i) =>
    i === index ? { ...row, showMemo: !row.showMemo } : row,
  );
  emit('update:modelValue', { ...props.modelValue, items: newItems });
};

// 메모 textarea 닫기
const closeMemo = (index) => {
  const newItems = props.modelValue.items.map((row, i) =>
    i === index ? { ...row, showMemo: false } : row,
  );
  emit('update:modelValue', { ...props.modelValue, items: newItems });
};
</script>

<style scoped>
.transaction-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  border: 1px solid #dddddd;
  border-radius: 12px;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.button-row {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
