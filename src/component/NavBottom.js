import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

export class NavBottom extends Component {
  static propTypes = {
    
  }

  render() {
    return (
      <div>
        NavBottom
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBottom));
