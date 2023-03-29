import {
  connectAction,
  connectIfTrusted,
  disconnectAction,
  disconnectedEvent,
} from './walletConnectionService'
import { createSmartContractTransaction, fetchSmartContractActions } from './blockchainApiService'
import { signMessageExample, tokenTransferExample } from './blockchainTransactions'
import { stringifyValue } from './utils'
import { BLOCKCHAIN_API, BLOCKCHAIN_CONTRACTS, HELP_LINKS } from './consts'

document.addEventListener('alpine:init', () => {
  Alpine.store('app', {
    blockchainAccount: '',
    terminalLines: [],
    blockchainAPI: BLOCKCHAIN_API,
    contracts: BLOCKCHAIN_CONTRACTS,
    helpLinks: HELP_LINKS,
    selectedContract: null,
    contractActions: [],
    selectedContractAction: null,
    menuActions: [
      { title: 'Connect', action: connectAction, disabled: false },
      { title: 'Disconnect', action: disconnectAction, disabled: true },
      {
        title: 'Sign Transaction',
        action: tokenTransferExample,
        disabled: true,
      },
      { title: 'Sign Message', action: signMessageExample, disabled: true },
    ],
    postTerminalLog(value) {
      const log = stringifyValue(value)
      this.terminalLines.push(log)
    },
    toggleMenuActions() {
      this.menuActions.forEach((_, key) => {
        this.menuActions[key].disabled = !this.menuActions[key].disabled
      })
    },
    async onContractChange(name) {
      this.selectedContract = name
      this.contractActions = []
      this.contractActions = await fetchSmartContractActions(this.selectedContract)
    },
    async onContractActionChange(actionName) {
      const index = this.contractActions.findIndex((action) => action.name === actionName)
      this.selectedContractAction = this.contractActions[index]
    },
    onSubmitContractForm(formData) {
      const form = new FormData(formData)
      const dataObject = {}
      form.forEach((value, key) => {
        const nestedField = key.split('@')
        if (nestedField.length === 2) {
          if (!dataObject[nestedField[0]]) {
            dataObject[nestedField[0]] = {}
          }
          dataObject[nestedField[0]][nestedField[1]] = value
        } else {
          dataObject[key] = value
        }
      })
      createSmartContractTransaction(
        this.selectedContract,
        this.selectedContractAction.name,
        dataObject,
      )
    },
  })

  connectIfTrusted()
  disconnectedEvent()
})
