import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

export class NavTop extends Component {
  static propTypes = {
    
  }

  render() {
    return (
      <div>
        NavTom
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavTop));
