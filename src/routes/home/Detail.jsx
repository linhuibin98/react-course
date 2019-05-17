import React, { Component } from 'react';
import { connect } from 'react-redux';
import action from '../../store/action';
import { Button } from 'antd';
import { queryInfo } from '../../api/course';
import qs from 'qs';

class Detail extends Component {
  state = {
    data: null
  }

  async componentDidMount() {
    let { location: { search } } = this.props;
    let { courseId } = qs.parse(search.substr(1)) || {};
    console.log(parseFloat(courseId))
    let result = await queryInfo(parseFloat(courseId));
    if (parseFloat(result.code) === 0) {
      this.setState({
        data: result.data
      })
    }
  }

  render() {
    let { data } = this.state;
    if (!data) return '';
    let { name, dec, price } = data;
    return (
      <div className='baseInfo'>
        <video src='http://www.17sucai.com/preview/1111042/2019-04-16/videoTest/mp4/1.mp4' controls preload='none' />
        <div className='content'>
          <h3>{ name }</h3>
          <p>{ dec }</p>
          <span>课程价格：{ price }</span><br />
          <Button type='danger'>立即购买</Button>
        </div>
      </div>
    )
  }
}

export default connect(state => ({...state.course}), action.course)(Detail);
