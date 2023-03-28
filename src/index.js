document.addEventListener('alpine:init', () => {
  Alpine.store('app', {
    terminalLines: ['ultra.connect()', 'ultra.disconnect()'],
    menuActions: [
      { title: 'Connect', action: () => {} },
      { title: 'Disconnect', action: () => {} },
      { title: 'Sign Transaction', action: () => {} },
      { title: 'Sign Message', action: () => {} },
      { title: 'Smart Contract Builder', action: () => {} },
    ],
    helpLinks: [
      {
        title: 'Wallet Docs',
        href: 'https://docs.ultra.io/blockchain/#/docs/ultra-wallet-extension/',
      },
      { title: 'Mainnet Explorer', href: 'https://explorer.mainnet.ultra.io/' },
      { title: 'Testnet Explorer', href: 'https://explorer.testnet.ultra.io/' },
      {
        title: 'Testnet Account Creation',
        href: 'https://faucet.testnet.app.ultra.io/',
      },
      { title: 'Download Ultra', href: 'https://ultra.io/download' },
      { title: 'Discord community', href: 'https://discord.gg/WfJCN6YbGk' },
    ],
  });
});
