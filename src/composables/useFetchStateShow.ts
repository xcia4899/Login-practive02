import { ref } from "vue";
//讀取顯示開關
export function useFetchState() {
  const openContent = ref(true);
  const errMessage = ref("點擊按鈕以獲取資料");

  const setState = (isOpen: boolean, message: string) => {
    openContent.value = isOpen;
    errMessage.value = message;
  };

  return {
    openContent,
    errMessage,
    setState
  };
}
//Promise 讀取時間設定
//setTimeout(resolve, ms)簡寫形式
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));