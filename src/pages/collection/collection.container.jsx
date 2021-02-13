import {connect} from 'react-redux';
import {compose } from 'redux';
import {createStructuredSelector} from 'reselect';

import {  selectionIsCollectionLoaded} from '../../redux/shop/shop.selector';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

const mapStateToProps = createStructuredSelector({
    isLoading: (state) => !selectionIsCollectionLoaded(state)
})

const CollectionPageContainer =  compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage)

export default CollectionPageContainer;