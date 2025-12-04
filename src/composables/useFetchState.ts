import { ref } from "vue";
//讀取顯示開關
export function useFetchState() {
  const openContent = ref(true);
  const showMessage = ref("點擊[按鈕]以獲取資料");

  const setState = (isOpen: boolean, message: string) => {
    openContent.value = isOpen;
    showMessage.value = message;
  };

  return {
    openContent,
    showMessage,
    setState
  };
}
//Promise 讀取時間設定
//setTimeout(resolve, ms)簡寫形式
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));