import React from 'react';
import Icon from '../components/Icon';

class StarCount extends React.Component {
  render() {
    const { WIDTH, SIZE } = this.props;
    return (
      <ul className="product-review-star-average-background">
        <li>
          <Icon icon="filledStar" size={SIZE} color="#E0E2E7" />
        </li>
        <li>
          <Icon icon="filledStar" size={SIZE} color="#E0E2E7" />
        </li>
        <li>
          <Icon icon="filledStar" size={SIZE} color="#E0E2E7" />
        </li>
        <li>
          <Icon icon="filledStar" size={SIZE} color="#E0E2E7" />
        </li>
        <li>
          <Icon icon="filledStar" size={SIZE} color="#E0E2E7" />
        </li>
        <ul className="product-review-star-average-display"
              style={{width: `${WIDTH}px`, overflow: 'hidden'}}>
          <li>
            <Icon icon="filledStar" size={SIZE} color="#3DA8F5" />
          </li>
          <li>
            <Icon icon="filledStar" size={SIZE} color="#3DA8F5" />
          </li>
          <li>
            <Icon icon="filledStar" size={SIZE} color="#3DA8F5" />
          </li>
          <li>
            <Icon icon="filledStar" size={SIZE} color="#3DA8F5" />
          </li>
          <li>
            <Icon icon="filledStar" size={SIZE} color="#3DA8F5" />
          </li>
        </ul>
      </ul>
    )
  }
}

export default StarCount;