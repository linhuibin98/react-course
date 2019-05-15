import React, { Component } from 'react';
import { Carousel, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import action from '../../store/action';
import { Link } from 'react-router-dom';

class List extends Component {

  componentDidMount() {
    let { carouselData, getCarouselData, courseData: { data }, queryList } = this.props;
    if (!carouselData.length) {
      getCarouselData();
    }
    if (!data.length) {
      queryList();
    }
  }

  queryType = () => {
    let { courseType } = this.props,
        text = '全部课程';
    switch(courseType) {
      case 'react':
        text = 'REACT框架开发课程';
        break;
      case 'vue':
        text = 'VUE框架开发课程';
        break;
      case 'xiaochengxu':
        text = '小程序开发课程';
        break;
      default:
        break;
    }
    return text;
  }

  render() {
    let { carouselData, courseType, courseData } = this.props;
    let { data } = courseData;
    return (
      <div>
        { /* 轮播图 */ }
        <Carousel autoplay>
          {
            !carouselData.length ? (<img alt='图片加载失败' />) : (
              carouselData.map((item, index) => {
                let { pic, name } = item;
                return (
                  <img src={ pic } alt={ name } key={index} />
                )
              })
            )
          }
        </Carousel>

        { /* 课程列表 */ }
        <div className='courseList'>
          <h2><Icon type='menu-fold' />{ this.queryType() }</h2>
          <ul>
            {
              !data.length ? (<div style={{textAlign: 'center'}}>暂无课程</div>) : (
                data.map((item, index) => {
                  let { id, name, pic, time, dec } = item;
                  return (
                    <li key={ index }>
                      <Link to={{
                        pathname: '/home/detail',
                        search: `?courseId=${id}`
                      }}>
                        <h3>{ name }</h3>
                        <div className='content'>
                          <div className='list-img'>
                            <img src={ pic } alt='' />
                          </div>
                          <div className='desc'>
                            <p>{ dec }</p>
                            <p>时长：{ time }</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                })
              )
            }
          </ul>
        </div>
        <Button type='dashed'>加载更多</Button>
      </div>
    )
  }
}

export default connect(state => ({ ...state.course }), action.course)(List);
