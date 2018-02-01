import React from 'react'

class List extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  _updatecomment = (item) => {
    return item.replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  }
  render() {
    return( 
      <div>
        {this.props.commentlist && this.props.commentlist.map((item,index) => {
          return(
            <div className='comment' key={index}>
              <div className='comment-user'>
                <span className='comment-username'>
                  {item.username}
                </span>：
              </div>
              <p dangerouslySetInnerHTML={{ __html: this._updatecomment(item.comments) }} />
              <span className='comment-createdtime'>
                {item.time}
              </span>
              <span
                onClick = {this.props.delete.bind(this, index)}
                className='comment-delete'>
                删除
              </span>
            </div>
          )
        })}
      </div>
    )
  }
}

export default List;