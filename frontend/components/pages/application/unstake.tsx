import { getNetwork } from "@wagmi/core";
import { Dot } from "lucide-react";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount, useBalance } from "wagmi";
import web3modal from "web3modal";
import { ConnectKitButton } from "connectkit";
import { JsonRpcProvider, ethers } from "ethers";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ApplicationLayout from "@/layouts/ApplicationLayout";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { VAULT_ABI } from "@/abi/abi";
import { config } from "@/configData";
import { getUserBalanceDetails } from "@/store/UserBalanceDetails";

const UnstakePage: NextPage = () => {
  const [unstakeValue, setUnstakeValue] = useState("");
  const [unstakeLoading, setUnstakeLoading] = useState(false);
  const [subTokenPerEth, setSubTokenPerEth] = useState("");
  const [receiveSUB, setReceiveSub] = useState(0);
  const [subTokenBalance] = getUserBalanceDetails((state) => [
    state.subTokenBalance,
  ]);

  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
  });
  const { connector, isConnected } = useAccount();
  const { chain } = getNetwork();
  const accountBalance = data?.formatted;

  const _chain = chain?.name;

  const vaultProxyAddress = config.substake.l2.vaultProxy;
  const vaultAbiPath = "../../abi/SubstakeVault.json";

  useEffect(() => {
    getSubTokenPerEth();
    caculateSubTokenAmount();
  }, [unstakeValue]);

  const caculateSubTokenAmount = () => {
    let subTokenAmont = Number(unstakeValue) * Number(subTokenPerEth);
    setReceiveSub(subTokenAmont);
  };

  const getSubTokenPerEth = async () => {
    const jsonProvider = new JsonRpcProvider(
      process.env.NEXT_PUBLIC_SCROLL_RPC!
    );
    const contract = new ethers.Contract(
      vaultProxyAddress,
      VAULT_ABI.abi,
      jsonProvider
    );
    try {
      await contract.subTokenPerEth().then((response) => {
        let ethPerSub = (Number(response) / 10 ** 18).toFixed(4);
        setSubTokenPerEth(ethPerSub);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const unstakeHandler = async () => {
    if (!unstakeValue) return toast.error("Please enter a amount!");
    if (unstakeValue === "0")
      return toast.error("Please enter a valid amount!");

    setUnstakeLoading(true);
    toast.loading("Unstaking...", { id: "unstake" });

    const modal = new web3modal({
      cacheProvider: true,
    });
    const connection = await modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const unstakeAmount = ethers.parseEther(unstakeValue);

    const contract = new ethers.Contract(
      vaultProxyAddress,
      VAULT_ABI.abi,
      signer
    );
    try {
      let tx = await contract.deposit(unstakeAmount, address, {
        value: unstakeAmount,
        gasLimit: 1100000,
      });

      toast.success("Successfully Unstaked!", { id: "unstake" });
      setUnstakeValue("");
      setUnstakeLoading(false);
    } catch (error) {
      toast.error("Failed to unstake!", { id: "unstake" });
      setUnstakeValue("");
      setUnstakeLoading(false);
    }
  };

  return (
    <ApplicationLayout>
      <div className="h-[calc(100vh-82px)] justify-center flex flex-col w-full max-w-xl mx-auto items-center px-3 sm:px-0">
        <div className="fixed -left-72 top-[80px] opacity-60">
          <div className="relative w-[695px] h-[1024px]">
            <Image src="/widget.svg" fill alt="eth" className="rotate-180" />
          </div>
        </div>

        <div className="rounded-xl border-2 border-mainBg w-full p-3 bg-[#fadfb5] shadow-xl z-30">
          <div className="rounded-tl-xl rounded-tr-xl hover:bg-[#fadfb5] transition-all shadow-sm relative border border-mainBg p-4 w-full flex items-center gap-4">
            <div className="p-2 bg-mainBg rounded-xl">
              <Image src="/logo_white.svg" width={25} height={25} alt="eth" />
            </div>

            <div className="flex flex-col">
              <p className="text-xs text-gray-500 uppercase">
                available to unstake
              </p>
              <p className="font-bold">{isConnected ? subTokenBalance : 0.0}</p>
            </div>
            <div className="absolute top-2 right-2 uppercase font-medium text-xs flex items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="sm:hidden rounded-xl">
                    <Dot
                      className={cn("text-red-500", {
                        "text-green-500": isConnected,
                      })}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    className={cn("bg-[#fadfb5] border-mainBg text-green-500", {
                      "text-red-500": !isConnected,
                    })}
                  >
                    {isConnected ? _chain : "Disconnected"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Dot
                className={cn("text-red-500 hidden sm:flex", {
                  "text-green-500": isConnected,
                })}
              />
              <span
                className={cn("text-green-500 hidden sm:flex", {
                  "text-red-500": !isConnected,
                })}
              >
                {isConnected ? _chain : "Disconnected"}
              </span>
            </div>
          </div>

          <div className="border-x border-b border-mainBg p-4 w-full flex items-center gap-3 rounded-bl-xl rounded-br-xl">
            <Input
              value={unstakeValue ? unstakeValue : ""}
              onChange={(e) => setUnstakeValue(e.target.value)}
              className="border-none outline-none placeholder:text-gray-500 text-black text-xl focus-visible:ring-0 focus-visible:ring-offset-0 font-semibold placeholder:font-medium bg-[#fadfb5]"
              placeholder="0.0"
              type="number"
            />

            <button
              disabled={unstakeLoading}
              onClick={() => {
                if (!isConnected) {
                  toast.error("Please connect your wallet first");
                } else setUnstakeValue(accountBalance ? accountBalance : "");
              }}
              className="bg-[#9b923b] hover:bg-[#a99f44] text-white/90 px-2 py-1 w-fit text-xs font-medium cursor-pointer transition-all rounded-md ring-offset-[#fadfb5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainBg focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              MAX
            </button>
          </div>

          <div className="mt-5 w-full text-xs space-y-2">
            <div className="flex items-center justify-between w-full">
              <p className="text-gray-500 uppercase">you will recieve</p>
              <p>{receiveSUB} SUB</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-500 uppercase">Exchange Rate</p>
              <p>1 SUB = {subTokenPerEth} ETH </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-500 uppercase">Protocol Fee</p>
              <p>0.01 %</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-500 uppercase">APR</p>
              <p>3.45 %</p>
            </div>
          </div>

          {isConnected ? (
            <Button
              disabled={unstakeLoading}
              onClick={unstakeHandler}
              className="mt-5 rounded-xl w-full h-[52px] text-lg font-medium bg-[#9b923b] hover:bg-[#a99f44] text-white/90 transition-all uppercase ring-offset-[#fadfb5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainBg focus-visible:ring-offset-2"
            >
              Unstake
            </Button>
          ) : (
            <ConnectKitButton.Custom>
              {({ show }) => {
                return (
                  <Button
                    onClick={show}
                    className="mt-5 rounded-xl w-full h-[52px] text-lg font-medium bg-[#9b923b] hover:bg-[#a99f44] text-white/90 uppercase transition-all ring-offset-[#fadfb5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mainBg focus-visible:ring-offset-2"
                  >
                    Connect Wallet
                  </Button>
                );
              }}
            </ConnectKitButton.Custom>
          )}
        </div>
      </div>
    </ApplicationLayout>
  );
};

export default UnstakePage;
