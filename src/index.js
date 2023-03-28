import { connectAction, connectIfTrusted, disconnectedEvent } from './connect';
import { stringifyValue } from './utils';

document.addEventListener('alpine:init', () => {
  Alpine.store('app', {
    blockchainAccount: '',
    terminalLines: [],
    menuActions: [
      { title: 'Connect', action: connectAction, disabled: false },
      { title: 'Disconnect', action: () => {}, disabled: true },
      { title: 'Sign Transaction', action: () => {}, disabled: true },
      { title: 'Sign Message', action: () => {}, disabled: true },
      { title: 'Smart Contract Builder', action: () => {}, disabled: true },
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
    postTerminalLog(value) {
      const log = stringifyValue(value);
      this.terminalLines.push(log);
    },
    toggleMenuActions() {
      this.menuActions.forEach((_, key) => {
        this.menuActions[key].disabled = !this.menuActions[key].disabled;
      });
    },
  });

  connectIfTrusted();
  disconnectedEvent();
});
