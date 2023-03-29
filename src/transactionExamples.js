export async function tokenTransferExample() {
  // build blockchain transaction / smart contract parameters
  const blockchainAccount = Alpine.store('app').blockchainAccount;
  const tx = {
    action: 'transfer',
    data: {
      from: blockchainAccount,
      to: 'ultra',
      quantity: '1.00000000 UOS',
      memo: 'This is an ultra transaction test',
    },
    contract: 'eosio.token',
  };
  // ui update
  Alpine.store('app').postTerminalLog(
    `ultra.signTransaction(${JSON.stringify(tx)})`
  );

  try {
    // ask wallet to sign the given token transfer transaction
    const response = await ultra.signTransaction(tx);
    // ui update
    Alpine.store('app').postTerminalLog(response);
  } catch (error) {
    // ui update
    Alpine.store('app').postTerminalLog(error);
  }
}

export async function signMessageExample() {
  // message to sign
  const message = 'message: Welcome to the ULTRAVERSE';
  // ui update
  Alpine.store('app').postTerminalLog(`ultra.signMessage('${message}')`);
  try {
    // ask wallet to sign the given message
    const response = await ultra.signMessage(message);
    // ui update
    Alpine.store('app').postTerminalLog(response);
  } catch (error) {
    // ui update
    Alpine.store('app').postTerminalLog(error);
  }
}
