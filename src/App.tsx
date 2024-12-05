import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useState } from "react";

function App() {
  const [tonConnectUI] = useTonConnectUI();
  const { state, open } = useTonConnectModal();
  const userFriendlyAddress = useTonAddress();
  const wallet = useTonWallet();

  const [amount, setAmount] = useState("0.002"); // 默认值为 0.002 TON

  const sendTransaction = async () => {
    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
      messages: [
        {
          address: "UQCQ0pohji80O14DRaPl9Z2aCZxDY5405t6SF6EVzz4gmu9q",
          amount: 0.002 * 10 ** 9,
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
      <div className=" flex-col gap-4 flex items-center justify-end">
        {/* <TonConnectButton /> */}
        {userFriendlyAddress ? (
          <div onClick={() => tonConnectUI.disconnect()}>disconnect</div>
        ) : (
          <div onClick={() => tonConnectUI.openModal()}>Open Modal</div>
        )}
      </div>
      <div className=" flex flex-col mt-4 gap-2 border border-solid border-red-400 p-3 rounded-[20px]">
        <div> model state : {state?.status}</div>
        <div className="">address : {userFriendlyAddress || "none"}</div>
      </div>

      <div className=" flex flex-col mt-4 mb-5 gap-2 border border-solid border-red-400 p-3 rounded-[20px]">
        current wallet:
        {wallet && (
          <>
            <span>Device: {wallet.device.appName}</span>
            <span>Connected via: {wallet.provider}</span>
            {/* 
  <div>
  Connected wallet info:
  {wallet?.name} < img className=" w-4" src={wallet?.imageUrl} />
  </div> */}
          </>
        )}
      </div>

      <div className=" flex gap-4 border border-solid border-red-400 p-3 rounded-[20px]">
        <div onClick={sendTransaction}>send transaction to my address</div>
        <input
          className=" border border-solid border-blue-700"
          type="text"
          placeholder=" 转账ton金额"
          value={amount} // 绑定输入框的值
          onChange={(e) => setAmount(e.target.value)} // 更新状态
        />
      </div>
    </>
  );
}

export default App;
