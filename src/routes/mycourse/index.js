import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class MyCourse extends Component {
  static propTypes = {
    
  }

  render() {
    return (
      <div className='container'>
        myCourse
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCourse)
