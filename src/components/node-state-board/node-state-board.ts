import { PeerBalance } from '@ethersphere/bee-js/dist/modules/debug/balance'
import { Settlements } from '@ethersphere/bee-js/dist/modules/debug/settlements'
import { defineComponent, ref, onMounted, computed } from 'vue'
import beeClient from '../../services/beeClient'
import { PeerState } from '../../models/PeerState'

export default defineComponent({
  props: {
  },

  setup() {
    let peersStateModel = ref([] as PeerState[])
    let isLoading = ref(true)
    onMounted(async () => {
      try
      {
      let peersAddresses = await beeClient.SwarmClient.getAllPeers();
      let settlements = (await beeClient.BeeDebug.getAllSettlements()).settlements
      let balances = (await beeClient.BeeDebug.getAllBalances()).balances
      let peersList = composeSettlements(settlements, balances);

      peersStateModel.value = peersList;
      }
      finally
      {
        isLoading.value = false;
      }
    })

    return {peersStateModel, getPaymentInfo, isLoading}
  }
})

async function getPaymentInfo(index: number, tableData: any) {
  let item = tableData[index];
  try
  {
    let lastCachout = await beeClient.BeeDebug.getLastCashoutAction(item.address);
    item.lastCacheoutHash = lastCachout.transactionHash
  }
  catch(e)
  {
    item.lastCacheoutHash = 'NOT FOUND'
  }
}

function composePeers(peers: Peer[], settlements: Settlements[], balances: PeerBalance[]): PeerState[] {
  return peers.map(peer => {
    let peerBalance = balances.find(b => b.peer == peer.address)
    let peerSettlements = settlements.find(s => s.peer == peer.address)
    let peerState = new PeerState();
    peerState.address = peer.address;
    peerState.balance = peerBalance?.balance || 0;
    peerState.received = peerSettlements?.received || 0;
    peerState.sent = peerSettlements?.sent || 0;

    return peerState;
  })
}

function composeSettlements(settlements: Settlements[], balances: PeerBalance[]): PeerState[] {
  return settlements.map(settlement => {
    let peerBalance = balances.find(b => b.peer == settlement.peer)

    let peerState = new PeerState();
    peerState.address = settlement.peer;
    peerState.balance = peerBalance?.balance || 0;
    peerState.received = settlement.received || 0;
    peerState.sent = settlement.sent || 0;

    return peerState;
  })
}