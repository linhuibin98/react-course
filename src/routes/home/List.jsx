import React, { Component } from 'react';
import { Carousel } from 'antd';
import { connect } from 'react-redux';
import action from '../../store/action';

class List extends Component {

  componentDidMount() {
    let { carouselData, getCarouselData } = this.props;
    if (!carouselData.length) {
      getCarouselData();
    }
  }

  render() {
    let { carouselData } = this.props;
    return (
      <div>
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
      </div>
    )
  }
}

export default connect(state => ({ ...state.course }), action.course)(List);
