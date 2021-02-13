import {createStructuredSelector} from 'reselect';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import {connect} from 'react-redux';
import { selectionIsCollectionFetching} from '../../redux/shop/shop.selector';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import {compose} from 'redux';

const mapStateToProps = createStructuredSelector({
    isLoading: selectionIsCollectionFetching
})

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer;