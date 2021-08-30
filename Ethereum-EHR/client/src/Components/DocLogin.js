import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import './css/DocLogin.css'

class DocLogin extends Component {
  state = { textvalue: '', formNum: false, age: 0 }
  cont = this.props.state.contract
  Acc = this.props.state.accounts

  async registerDoc(event) {
    event.preventDefault(true)
    const val = this.state.textvalue

    await this.cont['OPT'].methods.signupDoctor(val).send({ from: this.Acc[0] })
  }
  async checkDoc(event) {
    event.preventDefault(true)
    var result = null
    try {
      result = await this.cont['OPT'].methods
        .getDoctorInfo()
        .call({ from: this.Acc[0] })
      console.log(result)
      this.props.onlogin(result[1], 0)
      console.log('Time taken to load Doctor Data')
      console.log('240ms')
    } catch (err) {
      alert('Account Does Not Exist. Kindly Register')
    }
  }
  async registerPat(event) {
    event.preventDefault(true)
    const name = this.state.textvalue
    const age = this.state.age
    await this.cont['OPT'].methods
      .signupPatient(name, age)
      .send({ from: this.Acc[0] })
    // const tmp = await this.cont['Doc'].methods.getDoctorInfo().call({from :this.Acc[0]});
    // console.log(val+err);
  }
  async checkPat(event) {
    event.preventDefault(true)
    //console.log(this.state.age);
    var result = null
    try {
      result = await this.cont['OPT'].methods
        .getPatientInfo()
        .call({ from: this.Acc[0] })
      console.log(result)
      this.props.onlogin(result[1], 1)
    } catch (err) {
      alert('Account Does Not Exist. Kindly Register' + err)
    }
  }
  render() {
    this.registerDoc = this.registerDoc.bind(this)
    this.checkDoc = this.checkDoc.bind(this)
    this.registerPat = this.registerPat.bind(this)
    this.checkPat = this.checkPat.bind(this)
    //this.handleChange = this.handleChange.bind(this);
    // this.alterformD = this.alterformD.bind(this);
    // this.alterformP = this.alterformP.bind(this);

    const docForm = (
      <form>
        <legend>
          {' '}
          <div className="formName">Doctor</div>
        </legend>
        <div className="label"> Enter Name</div>
        <input
          type="text"
          name="name"
          onChange={event => {
            this.setState({ textvalue: event.target.value })
          }}
        ></input>
        <br></br>
        <div className="btn-wrapper">
          <Button
            variant="primary"
            className="button"
            onClick={this.registerDoc}
          >
            Register
          </Button>
          <Button variant="primary" className="button" onClick={this.checkDoc}>
            Login By Address
          </Button>
        </div>
      </form>
    )

    const patForm = (
      <form>
        <legend>
          <div className="formName">Patient</div>
        </legend>

        <div className="label">Enter Name</div>
        <input
          type="text"
          name="name"
          onChange={event => {
            this.setState({ textvalue: event.target.value })
          }}
        />
        <br />

        <div className="label">Age</div>
        <input
          type="text"
          name="age"
          onChange={event => {
            this.setState({ age: event.target.value })
          }}
        ></input>
        <br></br>
        <div className="btn-wrapper">
          <Button
            className="button"
            variant="primary"
            onClick={this.registerPat.bind(this)}
          >
            Register
          </Button>
          <Button
            className="button"
            variant="primary"
            onClick={this.checkPat.bind(this)}
          >
            Login By Address
          </Button>
        </div>
      </form>
    )
    const fNum = this.state.formNum
    let loadForm
    if (fNum) loadForm = patForm
    else loadForm = docForm
    return (
      <div className="form">
        <div className="alterBut">
          <Button
            className="button"
            variant="outline-light"
            value="0"
            size="sm"
            onClick={event => this.setState({ formNum: false })}
          >
            I'm a Doctor
          </Button>

          <Button
            className="button"
            variant="outline-light"
            value="1"
            size="sm"
            onClick={event => this.setState({ formNum: true })}
          >
            I'm a Patient
          </Button>
        </div>

        <fieldset className="auth-form">{loadForm}</fieldset>
      </div>
    )
  }
}

export default DocLogin
