import fs from "fs/promises";

export const config = {
  scroll: {
    "scrollSepoliaChainId:": 534351,
    L1Rollup: "0x2D567EcE699Eabe5afCd141eDB7A4f2D0D6ce8a0",
    L1Messenger: "0x50c7d3e7f7c656493D1D76aaa1a836CedfCBB16A",
    L2Messenger: "0xBa50f5340FB9F3Bd074bD638c9BE13eCB36E603d",
    L1ETHGateway: "0x8A54A2347Da2562917304141ab67324615e9866d",
    L2ETHGateway: "0x91e8ADDFe1358aCa5314c644312d38237fC1101C",
    L1WETHGateway: "0x3dA0BF44814cfC678376b3311838272158211695",
    L2WETHGateway: "0x481B20A927206aF7A754dB8b904B052e2781ea27",
    L1MessageQueue: "0xF0B2293F5D834eAe920c6974D50957A1732de763",
  },
  substake: {
    l2: {
      vaultProxy: "0xC4374cC35CbB2a42B9C19495AD811C742dc9FAA9",
      configProxy: "0x7BCaa65E6cAceF4FB7F2852488829bd92090667a",
      routerProxy: "0x4ceBC071291125dffc07Fb2b57d2B96c9FB32bCD",
    },
    l1: {
      managerProxy: "0x2e0046C22b33679925a094c90D4587941Db77066",
      configProxy: "0x24B6C8B950D964eEaF9A247a0e8539778757e449",
    },
  },
};

export const getAbi = async (path: string) => {
  const data = await fs.readFile(path, "utf-8");
  const abi = JSON.parse(data);
  return abi;
};