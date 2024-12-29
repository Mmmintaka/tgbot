const API_KEY =
  "9d3d6e97c6c021fcb18cce123b05452675ab714c2a401f3ee47c9f1337091aac";

export async function fetchBalance(address: any) {
  const endpoint = "https://toncenter.com/api/v2/getAddressInformation";
  const apiKey = API_KEY; // 可选：如果没有，可以删除 `&api_key=${apiKey}`

  try {
    const response = await fetch(
      `${endpoint}?address=${address}&api_key=${apiKey}`
    );
    const data = await response.json();

    if (data.ok) {
      console.log(data.result.balance, "123123");

      const balance = (Number(data.result.balance) / 1e9).toFixed(9); // 使用 Number 处理，并保留 9 位小数
      console.log(balance, "2222");

      return { success: true, balance }; // 返回成功状态和余额
    } else {
      return { success: false, error: data.error.message || "Unknown error" }; // 返回错误信息
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to fetch balance",
    }; // 捕获异常并返回
  }
}
