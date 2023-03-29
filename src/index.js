import {
  connectAction,
  connectIfTrusted,
  disconnectAction,
  disconnectedEvent,
} from './connect';
import {
  createSmartContractTransaction,
  fetchSmartContractActions,
} from './smartContracts';
import {
  signMessageExample,
  tokenTransferExample,
} from './transactionExamples';
import { stringifyValue } from './utils';

const menuActions = [
  { title: 'Connect', action: connectAction, disabled: false },
  { title: 'Disconnect', action: disconnectAction, disabled: true },
  {
    title: 'Sign Transaction',
    action: tokenTransferExample,
    disabled: true,
  },
  { title: 'Sign Message', action: signMessageExample, disabled: true },
];

const helpLinks = [
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
];

document.addEventListener('alpine:init', () => {
  Alpine.store('app', {
    blockchainAccount: '',
    terminalLines: [],
    blockchainAPI: 'https://api.mainnet.ultra.io',
    contracts: ['eosio.token', 'eosio.nft.ft'],
    selectedContract: null,
    contractActions: [],
    selectedContractAction: null,
    menuActions,
    helpLinks,
    postTerminalLog(value) {
      const log = stringifyValue(value);
      this.terminalLines.push(log);
    },
    toggleMenuActions() {
      this.menuActions.forEach((_, key) => {
        this.menuActions[key].disabled = !this.menuActions[key].disabled;
      });
    },
    async onContractChange(name) {
      this.selectedContract = name;
      this.contractActions = [];
      this.contractActions = await fetchSmartContractActions(
        this.selectedContract
      );
    },
    async onContractActionChange(actionName) {
      const index = this.contractActions.findIndex(
        (action) => action.name === actionName
      );
      this.selectedContractAction = this.contractActions[index];
    },
    onSubmitContractForm(formData) {
      const form = new FormData(formData);
      const dataObject = {};
      form.forEach((value, key) => {
        const nestedField = key.split('@');
        if (nestedField.length === 2) {
          if (!dataObject[nestedField[0]]) {
            dataObject[nestedField[0]] = {};
          }
          dataObject[nestedField[0]][nestedField[1]] = value;
        } else {
          dataObject[key] = value;
        }
      });
      createSmartContractTransaction(
        this.selectedContract,
        this.selectedContractAction.name,
        dataObject
      );
    },
  });

  connectIfTrusted();
  disconnectedEvent();
});
