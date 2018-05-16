import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

/*
COMMUNITY > SUBMIT PANE
Allows you to submit a saved script to the community repo
*/
@connect(
  state => ({
    scripts: state.scripts
  })
)
class Submit extends Component {
  static propTypes = {
    scripts: PropTypes.array.isRequired
  }
  static defaultProps = {
    scripts: []
  }
  render (
    { scripts } = this.props
  ) {
    return (
      <section>
        Submit.js
      </section>
    )
  }
}
export default Submit