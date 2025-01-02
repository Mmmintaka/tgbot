const Sending = () => {
  return (
    <div className="absolute inset-0 flex *:text-[14px]   items-center flex-col  justify-center">
      <div className="bg-clip-text text-transparent bg-[linear-gradient(98deg,#E3FFFF_-11.84%,#00EFEF_24.56%,#8E77FF_84.13%)] !text-[28px] font-semibold">
        验证中
      </div>
      <div className=" text-center text-[#a9a9a9] leading-[22px]">
        <div>等待转账完成 请耐心等候</div>
      </div>
    </div>
  );
};

export default Sending;
