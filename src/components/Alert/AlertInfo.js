import React, { Component } from 'react';
import { Alert, AlertContainer } from "react-bs-notifier";
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    isAlert: state.isAlert,
    alertContent : state.alertContent,
    alertType : state.alertType
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    alertOff: () => {
      dispatch({
        type: "ALERT_OFF"
      })
    }
  }
}

class AlertInfo extends Component {
  handleDismiss = () => {
    this.props.alertOff();
  }
  render() {
    if (this.props.isAlert === false) return null;
    return (
      <AlertContainer>
        <Alert
          type={this.props.alertType}
          timeout={3000}
          onDismiss={() => this.handleDismiss()}
        >
          {/* <strong>Success!</strong> You should read this message. */}
          {this.props.alertContent}
        </Alert>
      </AlertContainer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertInfo)
