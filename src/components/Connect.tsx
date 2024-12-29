import React from "react";

const Connect = () => {
  return (
    <>
      <div className="absolute inset-0 flex *:text-[14px]   items-center flex-col  justify-center">
        <div className="bg-clip-text text-transparent bg-[linear-gradient(98deg,#E3FFFF_-11.84%,#00EFEF_24.56%,#8E77FF_84.13%)] !text-[28px] font-semibold">
          连接外部钱包
        </div>
        <div className=" text-center text-[#a9a9a9] leading-[22px]">
          <div>请人意一个有Token的钱包</div>
          <div>例如 Trust Wallet. OKX Wallet 等外部钱包</div>
          <div>查询并领取你的神秘奖励！</div>
        </div>
      </div>
    </>
  );
};

export default Connect;
