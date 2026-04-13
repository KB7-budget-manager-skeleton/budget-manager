<template>
  <div v-if="Show" class="ModalOverlay" @click.self="CloseModal">
    <div class="ModalPanel">
      <button class="CloseButton" @click="CloseModal">×</button>

      <p class="ModalLabel">edit</p>
      <h2 class="ModalTitle">거래 내역을 수정해주세요</h2>
      <hr class="ModalDivider" />

      <form class="EditForm" @submit.prevent="SubmitEdit">
        <div class="FormRow">
          <label class="FormLabel">거래 유형</label>
          <select v-model="FormData.type" class="InputBox">
            <option value="">선택</option>
            <option value="income">수입</option>
            <option value="expense">지출</option>
          </select>
        </div>

        <div class="FormRow">
          <label class="FormLabel">날짜</label>
          <input v-model="FormData.date" type="date" class="InputBox" />
        </div>

        <div class="FormRow">
          <label class="FormLabel">사용처</label>
          <input
            v-model="FormData.location"
            type="text"
            class="InputBox"
            :placeholder="Transaction?.location || '기존 사용처'"
          />
        </div>

        <div class="FormRow">
          <label class="FormLabel">카테고리</label>
          <select v-model="FormData.category" class="InputBox">
            <option value="">선택</option>
            <option value="식비">식비</option>
            <option value="교통비">교통비</option>
            <option value="유흥">유흥</option>
            <option value="공과금">공과금</option>
            <option value="월급">월급</option>
            <option value="용돈">용돈</option>
            <option value="이자">이자</option>
          </select>
        </div>

        <div class="FormRow">
          <label class="FormLabel">품목명</label>
          <input
            v-model="FormData.item"
            type="text"
            class="InputBox"
            :placeholder="Transaction?.item || '기존 품목명'"
          />
        </div>

        <div class="FormRow">
          <label class="FormLabel">가격</label>
          <input
            v-model.number="FormData.amount"
            type="number"
            min="0"
            class="InputBox"
            :placeholder="
              Transaction ? String(Transaction.amount) : '기존 금액'
            "
          />
        </div>

        <div class="FormRow">
          <label class="FormLabel">메모</label>
          <textarea
            v-model="FormData.memo"
            class="InputBox TextareaBox"
            :placeholder="Transaction?.memo || '기존 메모'"
          ></textarea>
        </div>

        <div class="ButtonRow">
          <button type="submit" class="SaveButton">수정하기</button>
          <button type="button" class="CancelButton" @click="CloseModal">
            취소하기
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const Props = defineProps({
  Show: {
    type: Boolean,
    required: true,
  },
  Transaction: {
    type: Object,
    default: null,
  },
});

const Emit = defineEmits(['cancel', 'submit']);

const FormData = reactive({
  type: '',
  date: '',
  location: '',
  category: '',
  item: '',
  amount: null,
  memo: '',
});

// fix: [2-5] 입력됐던 값들 초기화보다는 값을 input에 넣어놓고 사용자가 직접 수정하도록 수정
watch(
  () => Props.Transaction,
  (NewTransaction) => {
    if (!NewTransaction) return;

    FormData.type = NewTransaction.type || '';
    FormData.date = NewTransaction.date || '';
    FormData.location = NewTransaction.location || '';
    FormData.category = NewTransaction.category || '';
    FormData.item = NewTransaction.item || '';
    FormData.amount = NewTransaction.amount ?? null;
    FormData.memo = NewTransaction.memo || '';
  },
  { immediate: true },
);

const CloseModal = () => {
  Emit('cancel');
};

// 기존값을 input 부분에 그대로 담아두니까
// 복잡한 (빈값이면 다시 기존값을 불러와서 대체해 db에 저장하는)로직이 필요 x
const SubmitEdit = () => {
  if (!Props.Transaction) return;

  const Payload = {
    id: Props.Transaction.id,
    type: FormData.type,
    date: FormData.date,
    location: FormData.location,
    category: FormData.category,
    item: FormData.item,
    amount: Number(FormData.amount),
    memo: FormData.memo,
  };

  Emit('submit', Payload);
};
</script>

<style scoped>
.ModalOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  z-index: 999;
  overflow-y: auto;
  box-sizing: border-box;
}

.ModalPanel {
  width: 100%;
  max-width: 440px;
  max-height: calc(100vh - 16px);
  background: #f3f3f5;
  border-radius: 14px;
  padding: 14px 16px 16px;
  position: relative;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 20px;
}

.CloseButton {
  position: absolute;
  top: 8px;
  right: 12px;
  border: none;
  background: transparent;
  font-size: 22px;
  cursor: pointer;
  color: #444;
  line-height: 1;
}

.ModalLabel {
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  color: #202020;
  margin: 0 0 2px;
}

.ModalTitle {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
  color: #202020;
  margin: 0 0 10px;
  line-height: 1.2;
}

.ModalDivider {
  border: none;
  border-top: 1px solid #d7d7dc;
  margin-bottom: 10px;
}

.EditForm {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.FormRow {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.FormLabel {
  font-size: 13px;
  font-weight: 700;
  color: #444;
}

.InputBox {
  width: 100%;
  border: none;
  border-radius: 10px;
  background: #ffffff;
  padding: 9px 11px;
  font-size: 13px;
  color: #222;
  outline: none;
  box-sizing: border-box;
}

.InputBox::placeholder,
.TextareaBox::placeholder {
  color: #b8b8c0;
}

.TextareaBox {
  min-height: 56px;
  resize: none;
}

.ButtonRow {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.SaveButton,
.CancelButton {
  flex: 1;
  height: 40px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
}

.SaveButton {
  background: #52b37c;
  color: #fff;
  border: none;
}

.CancelButton {
  background: #fff;
  color: #444;
  border: 1px solid #cfcfd6;
}

@media (max-width: 768px) {
  .ModalOverlay {
    padding: 6px;
  }

  .ModalPanel {
    max-width: 100%;
    max-height: calc(100vh - 12px);
    padding: 12px 12px 14px;
    border-radius: 12px;
  }

  .ModalTitle {
    font-size: 18px;
  }

  .FormLabel {
    font-size: 12px;
  }

  .InputBox {
    font-size: 12px;
    padding: 8px 10px;
    border-radius: 9px;
  }

  .TextareaBox {
    min-height: 52px;
  }

  .ButtonRow {
    flex-direction: column;
    gap: 6px;
  }

  .SaveButton,
  .CancelButton {
    height: 38px;
    font-size: 13px;
    border-radius: 10px;
  }
}
</style>
