import React from 'react';
import MenuTopIndex from '../../../components/front/indexPage/MenuTopIndex';
import Footer from '../../../components/front/indexPage/Footer';

export default function HocMedia(WrapperComponent){
  return class MainMedia extends React.Component{
    render(){
      return(
        <div>
          <MenuTopIndex page="media" />
            <div className="indexDetail">
              <WrapperComponent {...this.props}/>
            </div>
          <Footer />
        </div>
      )
    }
  }
}