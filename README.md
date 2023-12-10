# Substake: Cross-chain Liquid Staking Solution

https://github.com/surfer05/Substake/assets/85151171/51daf74e-10f0-448d-a3fe-33352d5b930c

Substake is a groundbreaking Cross-chain Liquid Staking solution designed to enable seamless participation in liquid staking from Layer 2 (L2) funds. By leveraging Substake, users can deposit their wrapped tokens on L2, which our platform bridges to Layer 1 (L1) for staking on Liquid Staking Derivative (LSD) platforms such as Lido, Rocket Pool, and Stader Labs. Our solution is highly gas-effective, minimizing the bridging and staking costs for users.

## Key Features

- **Seamless Cross-chain Staking**: Deposit wrapped tokens on L2, bridge them to L1, and stake on LSD platforms without the hassle of managing different chains individually.

- **Gas Efficiency**: Substake significantly reduces gas fees by creating batches on L2s and equally distributing the bridging and staking costs among batch members.

- **Regular APY**: Users can enjoy a regular Annual Percentage Yield (APY) on their L2 funds without the complexities associated with traditional staking processes.

## Stake Flow

1. **Deposit and SubToken Creation**: Users deposit their funds on our platform and receive SubToken, a representational token. These deposited funds are accumulated in a batch, and when specific conditions are met, the batch is dispatched to L1. Gas fees are equally distributed among batch members, significantly reducing costs.

2. **Bridging and Staking on LSD Platforms**: After the bridging of tokens to L1, they are staked on LSD platforms, providing users with a regular APY. Transaction costs are efficiently partitioned among batch members, ensuring gas efficiency.

3. **Native Token Unstaking**: Substake facilitates the unstaking of native tokens in a similar fashion. Users deposit their Subtokens, a batch is created, and after meeting specific conditions, the batch is dispatched. The wstETH is then swapped for wETH and transferred to L2 for distribution.

## Challenges Faced

While developing Substake, we encountered several notable challenges:

- **Messaging Protocols**: Understanding the messaging protocols of different L2 chains was a significant challenge. Scroll was the only chain that provided a well-built bridging infrastructure for ETH tokens, enabling successful staking.

- **Batching Architecture**: Implementing the batching architecture required deep thought and fine-tuning for an efficient solution. Messaging between chains also posed a tough challenge, with significant time delays for message transfers.

- **Exchange Rate Calculation**: Calculating the exchange rate between Subtoken and wstETH was complex, requiring continuous logging of wstETH price on L2, which was not fully supported by messaging protocols.

## Contract Addresses
- L2 config proxy - [0x7BCaa65E6cAceF4FB7F2852488829bd92090667a](https://sepolia.scrollscan.com/address/0x7BCaa65E6cAceF4FB7F2852488829bd92090667a) 
- SubstakeVaultProxy - [0xC4374cC35CbB2a42B9C19495AD811C742dc9FAA9](https://sepolia.scrollscan.com/address/0xC4374cC35CbB2a42B9C19495AD811C742dc9FAA9) 
- SubstakeRouterProxy - [0x4ceBC071291125dffc07Fb2b57d2B96c9FB32bCD](https://sepolia.scrollscan.com/address/0x4ceBC071291125dffc07Fb2b57d2B96c9FB32bCD) 
- SubstakeLib - [0x7a5483542b602e130a05Db23a7E2AeC59b2F08C6](https://sepolia.scrollscan.com/address/0x7a5483542b602e130a05Db23a7E2AeC59b2F08C6) 
- Lib Address - [0x6EAFfb5d25e5e6a41C77e694cccB0603225BE7aD](https://sepolia.etherscan.io/address/0x6EAFfb5d25e5e6a41C77e694cccB0603225BE7aD)
- ConfigProxy - [0x24B6C8B950D964eEaF9A247a0e8539778757e449](https://sepolia.etherscan.io/address/0x24B6C8B950D964eEaF9A247a0e8539778757e449)
- ManagerProxy - [0x4ceBC071291125dffc07Fb2b57d2B96c9FB32bCD](https://sepolia.etherscan.io/address/0x4ceBC071291125dffc07Fb2b57d2B96c9FB32bCD)

## Contact Us

For inquiries and support, please contact us at [![x.com/surfer__05]](https://twitter.com/surfer__05)
.

Thank you for choosing Substake for your liquid staking needs.
