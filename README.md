# Substake: Cross-chain Liquid Staking Solution

![image](https://github.com/surfer05/Substake/assets/101045183/9c8b44eb-1a61-4cd4-bd83-53454fb4b440)

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

## Contact Us

For inquiries and support, please contact us at [![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/bukotsunikki.svg?style=social&label=Follow%20%40bukotsunikki)](https://twitter.com/bukotsunikki)
.

Thank you for choosing Substake for your liquid staking needs.
