import { Api, JsonRpc } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'

const defaultPrivateKey = '5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr' // bob
const signatureProvider = new JsSignatureProvider([defaultPrivateKey])

export async function fetchSmartContractActions(account) {
  const APIendpoint = Alpine.store('app').blockchainAPI
  const rpc = new JsonRpc(APIendpoint, { fetch })
  const api = new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder(),
  })
  const abi = await api.getContract(account)
  return Array.from(abi.actions, ([_, value]) => value)
}

export async function createSmartContractTransaction(account, name, data) {
  const tx = {
    contract: account,
    action: name,
    data,
  }
  // ui update
  Alpine.store('app').postTerminalLog(`ultra.signTransaction(${JSON.stringify(tx)})`)

  try {
    // ask wallet to sign the given transaction object
    const response = await ultra.signTransaction(tx)
    // ui update
    Alpine.store('app').postTerminalLog(response)
  } catch (error) {
    // ui update
    Alpine.store('app').postTerminalLog(error)
  }
}
