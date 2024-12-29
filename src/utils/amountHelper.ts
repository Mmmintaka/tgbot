export const handleAmountChange = (
  inputValue: string,
  balance: string,
  setAmount: (value: string) => void
) => {
  // 检查是否为有效数字（包括小数点）
  if (/^\d*\.?\d*$/.test(inputValue)) {
    // 如果输入值大于 balance，直接设置为 balance
    if (parseFloat(inputValue) > parseFloat(balance)) {
      setAmount(balance);
      return;
    }

    // 如果输入仅为 "0"，允许保留
    if (inputValue === "0") {
      setAmount(inputValue);
      return;
    }

    // 允许 "0." 的输入，避免被清理
    if (inputValue.startsWith("0.")) {
      setAmount(inputValue);
      return;
    }

    // 处理前导 0：如果不是小数，移除多余的前导 0
    if (inputValue.startsWith("0") && !inputValue.startsWith("0.")) {
      inputValue = inputValue.replace(/^0+/, "");
    }

    // 限制小数位数为 6 位
    if (inputValue.includes(".")) {
      const [intPart, decimalPart] = inputValue.split(".");
      inputValue = `${intPart}.${decimalPart.slice(0, 6)}`;
    }

    // 更新金额
    setAmount(inputValue);
  }
};
