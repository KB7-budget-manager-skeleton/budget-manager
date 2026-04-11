<template>
  <div>
    <h2>거래 등록</h2>
    <TransactionForm
      :modelValue="FormData"
      @update:modelValue="(val) => Object.assign(FormData, val)"
      @submit="handleSubmit"
      @cancel="resetForm"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useTransactionStore } from '@/stores/transaction';
import TransactionForm from '@/components/TransactionForm.vue';

const store = useTransactionStore();
const router = useRouter();

const FormData = reactive({
  type: 'expense',
  date: '',
  location: '',
  category: '',
  items: [{ item: '', amount: 0, memo: '', showMemo: false }],
});

// 필수값 검증
const validateForm = () => {
  if (!FormData.date)     { alert('날짜를 입력해주세요'); return false }
  if (!FormData.location)    { alert('사용처를 입력해주세요'); return false }
  if (!FormData.category) { alert('카테고리를 선택해주세요'); return false }
  for (const row of FormData.items) {
    if (!row.item)       { alert('품목명을 입력해주세요'); return false }
    if (row.amount <= 0) { alert('가격을 입력해주세요'); return false }
  }
  return true
}

// 폼 초기화
const resetForm = () => {
  Object.assign(FormData, {
    type: 'expense',
    date: '',
    location: '',
    category: '',
    items: [{ item: '', amount: 0, memo: '', showMemo: false }],
  })
}

// 품목별 단건 분리 전송
const handleSubmit = async () => {
  if (!validateForm()) return

  for (const row of FormData.items) {
    await store.CreateTransaction({
      date: FormData.date,
      type: FormData.type,
      location: FormData.location,
      category: FormData.category,
      item: row.item,
      amount: row.amount,
      memo: row.memo,
    })
  }

  resetForm()
  router.push({ name: 'TransactionListView' })
}
</script>
