'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Head = function (_React$Component) {
  _inherits(Head, _React$Component);

  function Head() {
    _classCallCheck(this, Head);

    return _possibleConstructorReturn(this, (Head.__proto__ || Object.getPrototypeOf(Head)).apply(this, arguments));
  }

  _createClass(Head, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "logo" },
          React.createElement(
            "div",
            { className: "crop" },
            React.createElement(
              "a",
              { href: "#" },
              React.createElement("img", { src: "../images/image9.png" })
            )
          )
        ),
        React.createElement(
          "div",
          { className: "header" },
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "div",
              { className: "row" },
              React.createElement("div", {
                className: "col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section"
              }),
              React.createElement(
                "div",
                { className: "col-xl-9 col-lg-9 col-md-9 col-sm-9" },
                React.createElement(
                  "div",
                  { className: "menu-area" },
                  React.createElement(
                    "div",
                    { className: "limit-box" },
                    React.createElement(
                      "nav",
                      { className: "main-menu" },
                      React.createElement(
                        "ul",
                        { className: "menu-area-main" },
                        React.createElement(MyClickable, { activeIndex: window.location.pathname, name: "Home", href: "/PageController/toHomePage" }),
                        React.createElement(MyClickable, { activeIndex: window.location.pathname, name: "Calculator", href: "/PageController/toMap" }),
                        React.createElement(MyClickable, { activeIndex: window.location.pathname, name: "Sign Up", href: "/PageController/toRegister" }),
                        React.createElement(MyClickable, { activeIndex: window.location.pathname, name: "Log In", href: "/PageController/toLogIn" })
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Head;
}(React.Component);

var MyClickable = function (_React$Component2) {
  _inherits(MyClickable, _React$Component2);

  function MyClickable() {
    _classCallCheck(this, MyClickable);

    return _possibleConstructorReturn(this, (MyClickable.__proto__ || Object.getPrototypeOf(MyClickable)).apply(this, arguments));
  }

  _createClass(MyClickable, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "li",
        {
          className: this.props.activeIndex === this.props.href ? 'active' : ''
        },
        React.createElement(
          "a",
          { href: this.props.href },
          this.props.name
        )
      );
    }
  }]);

  return MyClickable;
}(React.Component);

var domContainer = document.querySelector('#need-render');
ReactDOM.render(React.createElement(Head, null), domContainer);