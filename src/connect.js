const EAGERLY_CONNECTION_KEY = 'EAGERLY_CONNECTION_KEY';

function connectedAccount(response) {
  // get blockchain id without account role
  const account = response.data?.blockchainid.split('@')[0];
  // set active account
  Alpine.store('app').blockchainAccount = account;
  // set flag for eagerly wallet connection
  localStorage.setItem(EAGERLY_CONNECTION_KEY, true);
  // ui update
  Alpine.store('app').postTerminalLog(response);
  Alpine.store('app').toggleMenuActions();
}

export async function connectAction() {
  // ui update
  Alpine.store('app').postTerminalLog('ultra.connect()');

  try {
    // call wallet api
    const response = await ultra.connect();
    connectedAccount(response);
  } catch (error) {
    // ui update
    Alpine.store('app').postTerminalLog(error);
  }
}

export async function connectIfTrusted() {
  // auto connect only if previously was authorized by wallet
  const eagerlyConnection = localStorage.getItem(EAGERLY_CONNECTION_KEY);
  if (!eagerlyConnection) return;
  // ui update
  Alpine.store('app').postTerminalLog('ultra.connect({ onlyIfTrusted: true })');

  try {
    const response = await ultra.connect({ onlyIfTrusted: true });
    connectedAccount(response);
  } catch (error) {
    // ui update
    Alpine.store('app').postTerminalLog(error);
    localStorage.removeItem(EAGERLY_CONNECTION_KEY);
  }
}
