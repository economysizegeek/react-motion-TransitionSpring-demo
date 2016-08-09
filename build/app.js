"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactMotion = require("react-motion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /// <reference path="./types.d.ts" />

var update = _react2.default.addons;

var Demo = function (_React$Component) {
  _inherits(Demo, _React$Component);

  function Demo() {
    _classCallCheck(this, Demo);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Demo).apply(this, arguments));
  }

  _createClass(Demo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("keyup", this.handleKeyup);
    }
  }, {
    key: "handleKeyup",
    value: function handleKeyup(e) {
      var keyCode = e.keyCode;

      if (!isAlphaNumeric(keyCode)) {
        return;
      }

      var letter = "#" + String.fromCharCode(e.keyCode);
      var letters = this.props.letters;


      var hasLetter = letters[letter];

      console.log(letter);

      var newLetters = _extends({}, letters);

      if (hasLetter) {
        delete newLetters[letter];
      } else {
        newLetters[letter] = true;
      }

      this.setState({ letters: newLetters });
    }
  }, {
    key: "toggle",
    value: function toggle(letter) {
      var selected = this.props.letters[letter];

      this.setState({
        letters: _extends({}, this.props.letters, _defineProperty({}, letter, !selected))
      });
    }

    // TransitionSpring Methods

  }, {
    key: "getEndValue",
    value: function getEndValue() {
      var values = {};

      Object.keys(this.props.letters).forEach(function (key) {
        values[key] = {
          width: { val: 50 },
          scale: { val: 1 },
          margin: { val: 5 }
        };
      });

      console.log(values);

      return values;
    }
  }, {
    key: "willEnter",
    value: function willEnter(key) {
      return {
        width: { val: 0 },
        margin: { val: 0 },
        scale: { val: 0 }
      };
    }
  }, {
    key: "willLeave",
    value: function willLeave(key) {
      return {
        width: { val: 0 },
        margin: { val: 0 },
        scale: { val: 0 }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var letters = this.props.letters;


      return _react2.default.createElement(
        _reactMotion.TransitionSpring,
        {
          endValue: this.getEndValue(),
          willEnter: this.willEnter,
          willLeave: this.willLeave },
        function (values) {
          return _react2.default.createElement(
            "div",
            { className: "letters" },
            Object.keys(values).map(function (letter) {
              var _values$letter = values[letter];
              var scale = _values$letter.scale;
              var width = _values$letter.width;
              var margin = _values$letter.margin;

              var widthValue = Math.ceil(width.val - 0.5);
              var marginValue = Math.ceil(margin.val - 0.5);

              var styles = {
                transform: "scale(" + scale.val + ")",
                height: widthValue,
                width: widthValue,
                margin: marginValue,
                borderRadius: widthValue
              };

              return _react2.default.createElement(
                "span",
                {
                  key: letter,
                  className: "letter",
                  style: styles,
                  onClick: _this2.toggle.bind(_this2, letter) },
                letter.substring(1)
              );
            })
          );
        }
      );
    }
  }]);

  return Demo;
}(_react2.default.Component);

;
Demo.propTypes = {
  letters: _react2.default.PropTypes.object
};

Demo.defaultProps = {
  letters: {
    "#A": true,
    "#N": true,
    "#T": true
  }
};

function isAlphaNumeric(keyCode) {
  return 48 <= keyCode && keyCode <= 57 || 65 <= keyCode && keyCode <= 90;
}

var app = _react2.default.createElement(
  "div",
  { className: "container" },
  _react2.default.createElement(Demo, null),
  _react2.default.createElement(
    "h3",
    { className: "help" },
    "press any key"
  ),
  _react2.default.createElement(
    "h3",
    { className: "colophon" },
    "made with ",
    _react2.default.createElement(
      "a",
      { href: "https://github.com/chenglou/react-motion" },
      "react motion."
    ),
    _react2.default.createElement(
      "a",
      { href: "https://github.com/hayeah/react-motion-TransitionSpring-demo/blob/master/app.jsx" },
      "source."
    )
  )
);

_reactDom2.default.render(app, document.querySelector('#content'));
