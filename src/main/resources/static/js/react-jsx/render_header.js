'use strict';
class Head extends React.Component {
  render() {
    return (
      <div>
      <div className="logo">
        <div className="crop">
          <a href="#"><img src="../images/image9.png" /></a>
        </div>
      </div>
      <div className="header">
        <div className="container">
          <div className="row">
            <div
              className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section"
            ></div>
            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
              <div className="menu-area">
                <div className="limit-box">
                  <nav className="main-menu">
                    <ul className="menu-area-main">
                      <MyClickable activeIndex={window.location.pathname} name="Home" href="/PageController/toHomePage"/>
                      <MyClickable activeIndex={window.location.pathname} name="Calculator" href="/PageController/toMap"/>
                      <MyClickable activeIndex={window.location.pathname} name="Sign Up" href="/PageController/toRegister"/>
                      <MyClickable activeIndex={window.location.pathname} name="Log In" href="/PageController/toLogIn"/>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
class MyClickable extends React.Component {
  render(){
    return (
      <li
        className={this.props.activeIndex === this.props.href ? 'active' : ''}
      >
        <a href={this.props.href}>{this.props.name}</a>
      </li>
    );
  }
}
let domContainer = document.querySelector('#need-render');
ReactDOM.render(<Head />, domContainer);