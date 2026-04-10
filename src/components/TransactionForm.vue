<template>
  <!-- show가 true일 때만 모달 렌더링 -->
  <div v-if="show" class="modal-backdrop" @click.self="handleCancel">
    <div class="modal-panel" role="dialog" aria-modal="true">
      <!-- 모달 헤더 -->
      <button class="modal-close" type="button" @click="handleCancel">✕</button>
      <p class="modal-label">Input</p>
      <h2 class="modal-title">영수증을 입력해주세요</h2>
      <hr class="title-divider" />

      <form @submit.prevent>
        <!-- 날짜 입력 -->
        <div class="field-row">
          <label>날짜</label>
          <input type="date" v-model="formData.date" />
        </div>

        <!-- 사용처 입력 -->
        <div class="field-row">
          <label>사용처</label>
          <input type="text" v-model="formData.location" />
        </div>

        <!-- 카테고리 선택 (type에 따라 옵션 변경) -->
        <div class="field-row">
          <label>카테고리</label>
          <select v-model="formData.category">
            <option value="">선택</option>
            <option v-for="cat in categoryOptions" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>

        <!-- 고정 필드와 품목 목록 구분선 -->
        <hr class="dashed-divider" />

        <!-- 품목 열 헤더 -->
        <div class="item-header">
          <span class="item-header-label item-name">품목명</span>
          <span class="item-header-label item-price">가격</span>
        </div>

        <!-- 품목 목록 (여러 행 가능) -->
        <div v-for="(row, index) in formData.items" :key="index">
          <div class="item-row">
            <input
              type="text"
              :value="row.item"
              placeholder="[Item]"
              class="item-name"
              @input="updateItem(index, 'item', $event.target.value)"
            />
            <input
              type="number"
              :value="row.amount"
              placeholder="[price]"
              class="item-price"
              @input="updateItem(index, 'amount', Number($event.target.value))"
            />
            <button type="button" class="btn-tag" @click="toggleMemo(index)">
              메모
            </button>
          </div>

          <!-- 메모 입력 영역 (토글) -->
          <div v-if="row.showMemo" class="memo-row">
            <textarea
              :value="row.memo"
              placeholder="[Memo]"
              @input="updateItem(index, 'memo', $event.target.value)"
            ></textarea>
            <button type="button" class="btn-tag" @click="closeMemo(index)">
              저장
            </button>
          </div>
        </div>

        <!-- 품목 행 추가 버튼 -->
        <button type="button" class="btn-add" @click="addItem">+</button>

        <!-- 저장 / 취소 버튼 -->
        <div class="action-row">
          <button type="button" class="btn-save" @click="handleSubmit">
            저장하기
          </button>
          <button type="button" class="btn-cancel" @click="handleCancel">
            취소하기
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';

// ── Props / Emits ────────────────────────────────────────────────
const props = defineProps({
  show: { type: Boolean, default: false },
  type: { type: String, default: 'expense' }, // 'income' | 'expense'
});

const emit = defineEmits(['submit', 'cancel']);

// ── 내부 폼 상태 ─────────────────────────────────────────────────
const formData = reactive({
  date: '',
  location: '',
  category: '',
  items: [{ item: '', amount: 0, memo: '', showMemo: false }],
});

// ── 카테고리 옵션 (type에 따라 변경) ────────────────────────────
const categoryOptions = computed(() => {
  if (props.type === 'income') {
    return ['월급', '용돈', '이자'];
  } else {
    return ['식비', '교통비', '유흥', '공과금'];
  }
});

// ── 폼 초기화 ────────────────────────────────────────────────────
const resetForm = () => {
  formData.date = '';
  formData.location = '';
  formData.category = '';
  formData.items = [{ item: '', amount: 0, memo: '', showMemo: false }];
};

// ── 필수값 검증 ──────────────────────────────────────────────────
const validateForm = () => {
  if (!formData.date) {
    alert('날짜를 입력해주세요');
    return false;
  }
  if (!formData.location) {
    alert('사용처를 입력해주세요');
    return false;
  }
  if (!formData.category) {
    alert('카테고리를 선택해주세요');
    return false;
  }
  for (const row of formData.items) {
    if (!row.item) {
      alert('품목명을 입력해주세요');
      return false;
    }
    if (row.amount <= 0) {
      alert('가격을 입력해주세요');
      return false;
    }
  }
  return true;
};

// ── 품목 관리 함수 ───────────────────────────────────────────────

// 특정 행의 필드 값 변경
const updateItem = (index, field, value) => {
  const newItems = [];
  for (let i = 0; i < formData.items.length; i++) {
    if (i === index) {
      newItems.push({ ...formData.items[i], [field]: value }); // 해당 행만 수정
    } else {
      newItems.push(formData.items[i]); // 나머지는 그대로
    }
  }
  formData.items = newItems;
};

// 빈 품목 행 추가
const addItem = () => {
  formData.items.push({ item: '', amount: 0, memo: '', showMemo: false });
};

// 메모 영역 열고 닫기 (토글)
const toggleMemo = (index) => {
  const newItems = [];
  for (let i = 0; i < formData.items.length; i++) {
    if (i === index) {
      newItems.push({
        ...formData.items[i],
        showMemo: !formData.items[i].showMemo,
      });
    } else {
      newItems.push(formData.items[i]); // 나머지는 그대로
    }
  }
  formData.items = newItems;
};

// 메모 영역 닫기
const closeMemo = (index) => {
  const newItems = [];
  for (let i = 0; i < formData.items.length; i++) {
    if (i === index) {
      newItems.push({ ...formData.items[i], showMemo: false });
    } else {
      newItems.push(formData.items[i]); // 나머지는 그대로
    }
  }
  formData.items = newItems;
};

// ── 저장 / 취소 ──────────────────────────────────────────────────

// 저장: 검증 후 부모로 폼 데이터 전달
const handleSubmit = () => {
  if (!validateForm()) return;
  emit('submit', {
    date: formData.date,
    location: formData.location,
    category: formData.category,
    type: props.type,
    items: formData.items,
  });
  resetForm();
};

// 취소: 폼 초기화 후 부모에 알림
const handleCancel = () => {
  resetForm();
  emit('cancel');
};
</script>

<style scoped>
/* ── 모달 오버레이 ───────────────────────────────────────────────── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* ── 모달 패널 ──────────────────────────────────────────────────── */
.modal-panel {
  position: relative;
  background: #f2f2f5;
  border-radius: var(--radius-board);
  padding: 36px 40px 32px;
  width: 100%;
  max-width: 560px;
  max-height: 85vh;
  overflow-y: auto;
}

/* ── 모달 헤더 ──────────────────────────────────────────────────── */
.modal-close {
  position: absolute;
  top: 18px;
  right: 22px;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #1a1a1b;
  line-height: 1;
}

.modal-label {
  font-size: var(--fs-desc);
  font-weight: var(--fw-bold);
  color: #1a1a1b;
  margin: 0 0 6px;
  text-align: center;
  letter-spacing: 0.04em;
}

.modal-title {
  font-size: var(--fs-subtitle);
  font-weight: var(--fw-bold);
  color: #1a1a1b;
  margin: 0 0 16px;
  text-align: center;
}

/* 제목 아래 실선 */
.title-divider {
  border: none;
  border-top: 1px solid #c8c8d0;
  margin: 0 0 20px;
}

/* ── 고정 필드 (날짜 / 사용처 / 카테고리) ── 가로 배치 ─────────── */
.field-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.field-row label {
  width: 68px;
  flex-shrink: 0;
  font-size: var(--fs-desc);
  font-weight: var(--fw-medium);
  color: #3d3d4a;
}

.field-row input,
.field-row select {
  flex: 1;
  background: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 10px 18px;
  font-size: var(--fs-desc);
  color: #1a1a1b;
  text-align: center;
  outline: none;
  appearance: none;
}

/* ── 품목 구분선 ─────────────────────────────────────────────────── */
.dashed-divider {
  border: none;
  border-top: 2px dashed #c8c8d0;
  margin: 20px 0 12px;
}

/* ── 품목 열 헤더 라벨 ──────────────────────────────────────────── */
.item-header {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
}

.item-header-label {
  font-size: var(--fs-desc);
  font-weight: var(--fw-medium);
  color: #3d3d4a;
}

/* ── 품목 행 ─────────────────────────────────────────────────────── */
.item-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.item-name {
  flex: 2;
}
.item-price {
  flex: 1;
}

.item-row input {
  background: #ffffff;
  border: none;
  border-radius: var(--radius-field);
  padding: 10px 12px;
  font-size: var(--fs-desc);
  color: #1a1a1b;
  outline: none;
  width: 100%;
}

/* ── 메모 행 ─────────────────────────────────────────────────────── */
.memo-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 10px;
}

.memo-row textarea {
  flex: 1;
  min-height: 72px;
  background: #ffffff;
  border: none;
  border-radius: var(--radius-field);
  padding: 10px 12px;
  font-size: var(--fs-desc);
  color: #1a1a1b;
  resize: vertical;
  outline: none;
}

/* ── 태그 버튼 (메모 / 저장) — 보라색 ──────────────────────────── */
.btn-tag {
  padding: 10px 14px;
  background: #8b7fe8;
  color: #ffffff;
  border: none;
  border-radius: var(--radius-field);
  font-size: var(--fs-desc);
  font-weight: var(--fw-medium);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── 품목 추가 버튼 — 원형 ──────────────────────────────────────── */
.btn-add {
  display: block;
  margin: 12px auto 20px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid #3d3d4a;
  background: none;
  color: #3d3d4a;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

/* ── 액션 버튼 행 ────────────────────────────────────────────────── */
.action-row {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

/* 저장하기 — 초록, 알약 모양 */
.btn-save {
  flex: 1;
  padding: 14px 0;
  background: #4caf7d;
  color: #ffffff;
  border: none;
  border-radius: var(--radius-button);
  font-size: var(--fs-button);
  font-weight: var(--fw-bold);
  cursor: pointer;
}

/* 취소하기 — 흰색, 테두리 */
.btn-cancel {
  flex: 1;
  padding: 14px 0;
  background: #ffffff;
  color: #3d3d4a;
  border: 2px solid #d1d1d8;
  border-radius: var(--radius-button);
  font-size: var(--fs-button);
  font-weight: var(--fw-bold);
  cursor: pointer;
}
</style>
