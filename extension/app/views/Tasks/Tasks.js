import React, { Component, PropTypes } from 'react'
// import PropTypes from 'prop-types'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
//  Redux Actions
import { executeScript } from '../../ducks/pages'
//  Styles
import '../../styles/Tasks.css'

import { Card, CardTitle } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
// import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'

// import Script from './Script/Script'
import get from 'lodash/get'

/*
TASKS VIEW:
Shows groups & individual tasks that can be executed ad-hoc
*/
@compose(
  firebaseConnect(['scripts']),
  connect(
    state => {
      // TODO: Hydrate with installed scripts (user/id/scripts)
      const scripts = get(state, 'db.data.scripts.core', [])
      let groups = {}
      for (let script of scripts) {
        Array.isArray(groups[script.group])
          ? groups[script.group].push(script)
          : groups[script.group] = [script]
      }

      return {
        groups,
        tab: state.tab,
        inspectorConfig: state.config.inspector
      }
    },
    dispatch => {
      return { actions: bindActionCreators({ executeScript }, dispatch) }
    }
  )
)
class Tasks extends Component {
  static propTypes = {
    groups: PropTypes.object.isRequired,
    inspectorConfig: PropTypes.object.isRequired
    // actions: PropTypes.object.isRequired
  }
  static defaultProps = {
    groups: {},
    inspectorConfig: {}
  }
  render (
    { tab, groups, inspectorConfig, actions } = this.props
  ) {
    // console.warn('GROUPS:', groups)
    return (
      <section>
        {Object.keys(groups).map(key => (
          <div key={key}>
            <CardTitle title={key} />
            {/* <FlatButton secondary fullWidth label={`Execute Group`} /> */}
            <List>
              {groups[key].map(script => (
                <ListItem key={script.id}
                  primaryText={`${script.name} | Version ${script.version} by ${script.author}`}
                  secondaryText={script.description}
                  disabled={false}
                  leftCheckbox={<Checkbox disabled={false}
                    onClick={() => actions.executeScript(tab, script)}
                  />}
                />
              ))}
            </List>
          </div>
        ))}
      </section>
    )
  }
}
export default Tasks
