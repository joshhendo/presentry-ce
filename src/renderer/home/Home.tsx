import * as React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/header/Header';
import WorkArea from './components/work-area/WorkArea';
import './Home.scss';
import Footer from './components/footer/Footer';

export default class Home extends React.Component<any, any> {
  render() {
    return (
      <div>
        <div className="home-container">
          <Header />
          <WorkArea />
          <Footer />
        </div>
      </div>
    );
  }
}
