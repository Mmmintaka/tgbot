import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import WalletBg from "../public/images/walletBg.jpeg";
import { fetchBalance } from "./utils/getBlancet";
import Connect from "./components/Connect";
import IconImg from "../public/images/icon.jpeg";
import { handleAmountChange } from "./utils/amountHelper";
import Sending from "./components/Sending";

function App() {
  const [tonConnectUI] = useTonConnectUI();
  const { open } = useTonConnectModal();
  const userFriendlyAddress = useTonAddress();

  const [tonAddress, setTonAddress] = useState("");
  const [tonPrice, setTonPrice] = useState("");

  const [sendSuccess, setSendSuccess] = useState(false);

  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tonAddressParam = params.get("tonAddress");
    const tonPriceParm = params.get("price");

    if (tonAddressParam) setTonAddress(tonAddressParam);
    if (tonPriceParm) setTonPrice(tonPriceParm);
  }, []);

  const [amount, setAmount] = useState("0.002"); // 默认值为 0.002 TON

  useEffect(() => {
    const getBalance = async () => {
      if (userFriendlyAddress) {
        const result = await fetchBalance(userFriendlyAddress);
        if (result.success) {
          setBalance(result.balance || "");
        }
      }
    };
    getBalance();
  }, [userFriendlyAddress]);

  useEffect(() => {
    console.log(userFriendlyAddress, tonAddress, "123123");
  }, [userFriendlyAddress, tonAddress]);

  const sendTransaction = async () => {
    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
      messages: [
        {
          address: tonAddress, // 使用接收到的 tonChain
          amount: Number(amount) * 10 ** 9,
        },
      ],
    };
    try {
      const result = userFriendlyAddress
        ? await tonConnectUI.sendTransaction(transaction as any)
        : open();
      if (result?.boc) {
        setSendSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" px-5 bg-[#020202] relative pb-9  min-h-screen  text-white   ">
      <img src={WalletBg} className="  absolute left-0 top-0 w-full " alt="" />

      <>
        {sendSuccess && <Sending />}
        {!userFriendlyAddress && !sendSuccess && <Connect />}
        {userFriendlyAddress && !sendSuccess && (
          <>
            <div className=" absolute z-10 mt-[240px] w-[calc(100%_-_40px)] flex flex-col items-center">
              <div className=" xl-second-text ">
                完成一笔交易，即可领取奖励{" "}
              </div>
              <div className=" w-full p-4 flex items-center   mt-6 mb-4 justify-between border border-solid border-[#151515] rounded-[12px]">
                <div className=" text-[12px]">
                  {userFriendlyAddress.slice(0, 5)}...
                  {userFriendlyAddress.slice(-9)}
                </div>
                <img
                  onClick={() => tonConnectUI.disconnect()}
                  src={IconImg}
                  className=" w-7"
                  alt=""
                />
              </div>
              <div className=" w-full px-4 py-5 flex items-center  mb-2 justify-between border border-solid border-[#151515] rounded-[12px]">
                <div className=" flex items-center gap-3">
                  <div className=" relative">
                    <img src={IconImg} className=" rounded-full w-9" alt="" />
                    <div className=" absolute -right-1  -bottom-1 rounded-full  border-2 border-black">
                      <img src={IconImg} className=" rounded-full w-3" alt="" />
                    </div>
                  </div>
                  <div className=" flex flex-col ">
                    <input
                      type="text"
                      className="bg-transparent focus:outline-none focus:ring-0 text-white text-[14px]"
                      placeholder="输入转账金额"
                      value={amount}
                      onChange={(e) =>
                        handleAmountChange(e.target.value, balance, setAmount)
                      }
                    />
                    <div className="text-[#696969] text-[12px]">
                      {amount && tonPrice
                        ? `$${(
                            parseFloat(amount) * parseFloat(tonPrice)
                          ).toFixed(2)}`
                        : "$0.00"}
                    </div>
                  </div>
                </div>
                <div className=" text-[14px] flex items-center  justify-center gap-3 ">
                  <div className="  text-[#696969]">TON</div>
                  <div className="   h-[36px] !w-[1px] z-10 bg-[#151515]"></div>
                  <div className=" font-semibold">MAX</div>
                </div>
              </div>
              <div className=" flex items-center justify-end w-full">
                <div>可用:{balance} TON</div>
              </div>
            </div>
            <div className="w-[calc(100%_-_40px)]   bottom-[108px] flex items-center  justify-between absolute">
              <div className=" text-[#696969]">领取奖励</div>
              <div className=" flex items-center gap-2">
                <img src={IconImg} className=" w-6" alt="" />
                <div className=" text-[24px] font-semibold">999</div>
              </div>
            </div>
          </>
        )}

        {sendSuccess ? (
          <button className=" font-semibold absolute bottom-9 h-[52px] text-black  w-[calc(100%_-_40px)]  rounded-[22px] bg-white">
            我知道了
          </button>
        ) : userFriendlyAddress ? (
          <button
            disabled={
              !amount ||
              isNaN(Number(amount)) ||
              Number(amount) <= 0 ||
              Number(amount) > Number(balance)
            }
            onClick={() => {
              sendTransaction();
            }}
            className={`font-semibold absolute bottom-9 h-[52px] text-black w-[calc(100%_-_40px)] rounded-[22px] ${
              amount &&
              !isNaN(Number(amount)) &&
              Number(amount) > 0 &&
              Number(amount) <= Number(balance)
                ? "bg-white"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            领取奖励
          </button>
        ) : (
          <button
            onClick={() => {
              tonConnectUI.openModal();
            }}
            className=" font-semibold absolute bottom-9 h-[52px] text-black  w-[calc(100%_-_40px)]  rounded-[22px] bg-white"
          >
            连接钱包
          </button>
        )}
      </>
    </div>
  );
}

export default App;
