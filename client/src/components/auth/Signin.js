import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export class Signin extends Component {
  onSubmit = (formProps) => {
    //callback after user signs up -> call it as callback in actions/index (signup)
    this.props.signin(formProps, () => {
      this.props.history.push('/feature');
    });
  };
  render() {
    //handle submit coming from the redux form
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field
            name='email'
            type='text'
            component='input'
            autoComplete='off'
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
            name='password'
            type='password'
            component='input'
            autoComplete='off'
          />
        </fieldset>
        <div>{this.props.errorMessage}</div>
        <button>Sign In!</button>
      </form>
    );
  }
}

//alternative syntax
// function mapStateToProps(state) {
//   return { errorMessage: state.auth.errorMessage };
// }

const mapStateToProps = ({ auth }) => ({
  errorMessage: auth.errorMessage,
});

export default compose(
  //multiple HOC
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(Signin);
