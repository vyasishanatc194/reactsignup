import { connect } from "react-redux";
import SignupComponent from "../../Component/Signup/Signup";
import { signup } from "../../network/Signup";
import withToast from '../../hoc/Toast';

// Allow Props in Auth Component
const mapStateToProps = state => {
    return {}
}

// Allow Props Functions in Auth Component
const mapDispatchToProps = dispatch => {
    return {
        signup: (data) => dispatch(signup(data)),
    }
}

export default withToast(connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupComponent));
