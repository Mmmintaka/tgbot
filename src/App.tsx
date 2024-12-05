import { useEffect } from "react";
import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useState } from "react";

import { retrieveLaunchParams } from "@telegram-apps/sdk";

function App() {
  const [tonConnectUI] = useTonConnectUI();
  const { state, open } = useTonConnectModal();
  const userFriendlyAddress = useTonAddress();
  const wallet = useTonWallet();

  const launchParams = retrieveLaunchParams();

  console.log(launchParams, "123");

  const [amount, setAmount] = useState("0.002"); // 默认值为 0.002 TON
  const [tonChain, setTonChain] = useState("");

  useEffect(() => {
    // 获取 URL 查询参数
    const urlParams = new URLSearchParams(window.location.search);
    const tonChainParam = urlParams.get("tonChain");
    if (tonChainParam) {
      setTonChain(tonChainParam);
      console.log("接收到的 tonChain:", tonChainParam);
    }
  }, []);

  const sendTransaction = async () => {
    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
      messages: [
        {
          address: tonChain, // 使用接收到的 tonChain
          amount: Number(amount) * 10 ** 9,
        },
      ],
    };
    try {
      const result = userFriendlyAddress
        ? await tonConnectUI.sendTransaction(transaction as any)
        : open();
      console.log(result, "123 send transaction");
    } catch (error) {
      console.log(123, error);
    }
  };

  return (
    <>
      <div className="flex-col gap-4 flex items-center justify-end">
        {userFriendlyAddress ? (
          <div onClick={() => tonConnectUI.disconnect()}>disconnect</div>
        ) : (
          <div onClick={() => tonConnectUI.openModal()}>Open Modal</div>
        )}
      </div>

      <div>传递进来的地址： {tonChain}</div>

      <div className="flex flex-col mt-4 gap-2 border border-solid border-red-400 p-3 rounded-[20px]">
        <div>model state: {state?.status}</div>
        <div>address: {userFriendlyAddress || "none"}</div>
      </div>

      <div className="flex flex-col mt-4 mb-5 gap-2 border border-solid border-red-400 p-3 rounded-[20px]">
        current wallet:
        {wallet && (
          <>
            <span>Device: {wallet.device.appName}</span>
            <span>Connected via: {wallet.provider}</span>
          </>
        )}
      </div>

      <div className="flex gap-4 border border-solid border-red-400 p-3 rounded-[20px]">
        <div onClick={sendTransaction}>send transaction to my address</div>
        <input
          className="border border-solid border-blue-700"
          type="text"
          placeholder="转账ton金额"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
    </>
  );
}

export default App;
