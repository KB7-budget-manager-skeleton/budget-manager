import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useTransactionStore = defineStore('transaction', () => {
  const BaseUri = '/api/transactions';

  // 공용 거래 데이터 상태 정의
  const State = reactive({
    Transactions: [],
    SelectedPeriod: 'all',
    SelectedCategory: 'all',
    IsLoading: false,
    IsError: false,
    ErrorMessage: '',
  });

  // [2-1] 거래 목록 조회용 기본 API 함수
  const FetchTransactions = async () => {
    State.IsLoading = true;
    State.IsError = false;
    State.ErrorMessage = '';
    try {
      // TODO: [2-1] 거래 목록 조회 기능 구현
      const res = await axios.get('http://localhost:3000/transactions');
      //데이터 저장 꼭 필수
      State.Transactions = res.data;
    } catch (Error) {
      State.IsError = true;
      State.ErrorMessage = '거래 내역을 불러오지 못했습니다.';
      console.error(Error);
    } finally {
      State.IsLoading = false;
    }
  };

  // [1-4] 거래 등록용 기본 API 함수
  const CreateTransaction = async (TransactionData) => {
    try {
      // TODO: [1-4] 거래 등록 기능 구현
      // axios.post(BaseUri, TransactionData) 사용
    } catch (Error) {
      console.error(Error);
    }
  };

  // [4-1] 기존 거래 조회용 기본 API 함수
  const FetchTransactionById = async (Id) => {
    try {
      // TODO: [4-1] 기존 거래 단건 조회 기능 구현
      // axios.get(`${BaseUri}/${Id}`) 사용
    } catch (Error) {
      console.error(Error);
    }
  };

  // [4-2] 기존 거래 수정용 기본 API 함수
  const UpdateTransaction = async (Id, TransactionData) => {
    try {
      // TODO: [4-2] 기존 거래 수정 기능 구현
      // axios.put(`${BaseUri}/${Id}`, TransactionData) 사용
    } catch (Error) {
      console.error(Error);
    }
  };

  // [2-5] 거래 삭제용 기본 API 함수
  const DeleteTransaction = async (id) => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까??');
    if (!confirmDelete) return;
    try {
      // TODO: [2-5] 거래 삭제 기능 구현
      await axios.delete(`http://localhost:3000/transactions/${id}`);
      State.Transactions = State.Transactions.filter((item) => {
        return item.id !== id;
      });
    } catch (Error) {
      console.error('삭제실패:', Error);
    }
  };

  // [2-3] 기간 필터 상태 변경
  const SetSelectedPeriod = (Period) => {
    State.SelectedPeriod = Period;
  };

  // [2-3] 카테고리 필터 상태 변경
  const SetSelectedCategory = (Category) => {
    State.SelectedCategory = Category;
  };

  // [2-4] 기간 조건에 맞는 거래 필터링
  const FilterTransactionsByPeriod = () => {
    const Today = new Date();

    if (State.SelectedPeriod === 'all') {
      return State.Transactions;
    }

    if (State.SelectedPeriod === 'week') {
      const Day = Today.getDay();
      const Start = new Date(Today);
      Start.setHours(0, 0, 0, 0);
      Start.setDate(Today.getDate() - Day);

      const End = new Date(Start);
      End.setHours(23, 59, 59, 999);
      End.setDate(Start.getDate() + 6);

      return State.Transactions.filter((Item) => {
        const ItemDate = new Date(Item.date);
        return ItemDate >= Start && ItemDate <= End;
      });
    }

    if (State.SelectedPeriod === 'month') {
      const Start = new Date(Today.getFullYear(), Today.getMonth(), 1);
      Start.setHours(0, 0, 0, 0);

      const End = new Date(Today.getFullYear(), Today.getMonth() + 1, 0);
      End.setHours(23, 59, 59, 999);

      return State.Transactions.filter((Item) => {
        const ItemDate = new Date(Item.date);
        return ItemDate >= Start && ItemDate <= End;
      });
    }

    return State.Transactions;
  };

  const FilterTransactionsByCategory = computed(() => {
    let Result = FilterTransactionsByPeriod();

    if (State.SelectedCategory !== 'all') {
      Result = Result.filter((Item) => {
        return Item.category === State.SelectedCategory;
      });
    }

    return Result;
  });
  // [2-4] 카테고리 조건에 맞는 거래 필터링
  // TODO: [2-4] 카테고리 필터 로직 구현
  // const FilterTransactionsByCategory = () => {
  //   //전체 선택이면 전체 데이터 반환
  // };

  // [3-2] 월별 수입/지출/순이익 계산
  const CalculateMonthlySummary = () => {
    // TODO: [3-2] 월별 요약 계산 로직 구현
  };

  // [3-4] 최근 거래 내역 3~5개 추출
  const GetRecentTransactions = () => {
    // TODO: [3-4] 최근 거래 내역 추출 로직 구현
  };

  return {
    State,
    FetchTransactions,
    CreateTransaction,
    FetchTransactionById,
    UpdateTransaction,
    DeleteTransaction,
    SetSelectedPeriod,
    SetSelectedCategory,
    FilterTransactionsByPeriod,
    FilterTransactionsByCategory,
    CalculateMonthlySummary,
    GetRecentTransactions,
  };
});
