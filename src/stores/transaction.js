import { reactive } from 'vue';
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
    try {
      // TODO: [2-1] 거래 목록 조회 기능 구현
      const res = await axios.get('http://localhost:3000/transactions');
      State.Transactions = res.data;
    } catch (Error) {
      console.error(Error);
    }
  };

  // [1-4] 거래 등록용 기본 API 함수
  const CreateTransaction = async (TransactionData) => {
    State.IsLoading = true;
    try {
      const Response = await axios.post(BaseUri, TransactionData);
      State.Transactions.push(Response.data);
      State.IsError = false;
      State.ErrorMessage = '';
    } catch (Error) {
      State.IsError = true;
      State.ErrorMessage = Error.message;
      console.error(Error);
    } finally {
      State.IsLoading = false;
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
  const DeleteTransaction = async (Id) => {
    try {
      // TODO: [2-5] 거래 삭제 기능 구현
      // axios.delete(`${BaseUri}/${Id}`) 사용
    } catch (Error) {
      console.error(Error);
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
    const FormatDate = (DateValue) => {
      return new Date(DateValue).toISOString().split('T')[0];
    };

    const Today = new Date();

    //전체목록일때
    if (State.SelectedPeriod === 'all') {
      return State.Transactions;
    }
    //주간목록
    if (State.SelectedPeriod === 'week') {
      const Day = Today.getDay();

      const Start = new Date(Today);
      Start.setDate(Today.getDate() - Day);

      const End = new Date(Start);
      End.setDate(Start.getDate() + 6);

      const StartDate = FormatDate(Start);
      const EndDate = FormatDate(End);

      return State.Transactions.filter((Item) => {
        return Item.date >= StartDate && Item.date <= EndDate;
      });
    }

    //월별 목록
    if (State.SelectedPeriod === 'month') {
      const Start = new Date(Today.getFullYear(), Today.getMonth(), 1);
      const End = new Date(Today.getFullYear(), Today.getMonth() + 1, 0);

      const StartDate = FormatDate(Start);
      const EndDate = FormatDate(End);

      return State.Transactions.filter((Item) => {
        return Item.date >= StartDate && Item.date <= EndDate;
      });
    }

    return State.Transactions;
  };

  // [2-4] 카테고리 조건에 맞는 거래 필터링
  const FilterTransactionsByCategory = () => {
    // TODO: [2-4] 카테고리 필터 로직 구현
  };

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
