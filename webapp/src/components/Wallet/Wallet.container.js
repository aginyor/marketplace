import { connect } from 'react-redux'
import { connectWalletRequest } from 'modules/wallet/actions'
import { fetchDistrictsRequest } from 'modules/districts/actions'
import { openModal } from 'modules/ui/actions'
import Wallet from './Wallet'

const mapState = state => ({})

const mapDispatch = dispatch => ({
  onConnect: () => dispatch(connectWalletRequest()),
  onFetchDistricts: () => dispatch(fetchDistrictsRequest()),
  onFirstVisit: () => dispatch(openModal('TermsModal'))
})

export default connect(mapState, mapDispatch)(Wallet)
