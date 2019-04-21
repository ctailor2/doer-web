import { connect } from 'react-redux';
import { dismissGlobalAlertAction } from '../../actions/errorActions';
import { logoutRequestAction } from '../../actions/sessionActions';
import { ApplicationState } from '../../store';
import Header from './Header';

export const mapStateToProps = (state: ApplicationState) => {
    return {
        globalErrors: state.errors.globalErrors,
    };
};

export default connect(mapStateToProps, {
    logoutRequestAction,
    dismissGlobalAlertAction,
})(Header);
