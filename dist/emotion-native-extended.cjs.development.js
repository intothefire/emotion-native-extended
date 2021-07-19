'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var RN = require('react-native');
var primitivesCore = require('@emotion/primitives-core');
var EStyleSheet = _interopDefault(require('react-native-extended-stylesheet'));
var mediaQuery = _interopDefault(require('css-mediaquery'));
var React = require('react');
var React__default = _interopDefault(React);
var react = require('@emotion/react');
var memoize = _interopDefault(require('lodash.memoize'));
var isPropValid = _interopDefault(require('@emotion/is-prop-valid'));

var findBreakpoints = function findBreakpoints(emotionStyles, remValue) {
  var allMedia = Object.keys(emotionStyles).filter(function (item) {
    return item.startsWith('@media') && item.includes('width');
  });
  var mediaValues = allMedia.reduce(function (acc, item) {
    var data = mediaQuery.parse(item);
    data.forEach(function (item) {
      item.expressions.forEach(function (exp) {
        if (exp.value.includes('rem') || exp.value.includes('em')) {
          acc.add(parseInt(exp.value) * remValue);
        } else {
          acc.add(parseInt(exp.value));
        }
      });
    });
    return acc;
  }, new Set());
  return Array.from(mediaValues).sort();
};
var StyleSheet = EStyleSheet;
StyleSheet.build();

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function withResponsive(Component) {
  // I don't know how to implement this without breaking out of the types.
  // The overloads are ensuring correct usage, so we should be good?
  var Responsive = React__default.forwardRef(function (_ref, ref) {
    var style = _ref.style,
        children = _ref.children,
        props = _objectWithoutPropertiesLoose(_ref, ["style", "children"]);

    var theme = React.useContext(react.ThemeContext);
    var getStylesheet = memoize(function (styles, _breakpoint) {
      return StyleSheet.create({
        styles: styles
      }).styles;
    }, function (_styles, _breakpoint) {
      return breakpoint;
    });
    var styles = React.useMemo(function () {
      if (!style) return {}; // Adds support for `screen` media queries to support Styled System
      // @see https://github.com/styled-system/styled-system/pull/1133
      // @see https://github.com/vitalets/react-native-extended-stylesheet/pull/132

      var _styles = Object.keys(style).reduce(function (acc, key) {
        acc[key.replace('screen', RN.Platform.OS)] = style[key];
        return acc;
      }, {});

      return _styles;
    }, [style]);
    var remValue = React.useMemo(function () {
      try {
        return Number(StyleSheet.value('$rem'));
      } catch (_unused) {
        return Number((theme === null || theme === void 0 ? void 0 : theme.rem) || 16);
      }
    }, [theme]);
    var breakpoints = React.useMemo(function () {
      return findBreakpoints(styles, remValue);
    }, [styles, remValue]);
    var getBreakpoint = React.useCallback(function (width) {
      return (breakpoints || []).find(function (item) {
        return width < item;
      });
    }, [breakpoints]);

    var _useState = React.useState(getBreakpoint(RN.Dimensions.get('window').width)),
        breakpoint = _useState[0],
        setBreakpoint = _useState[1];

    var onDimesionsChange = React.useCallback(function (_ref2) {
      var window = _ref2.window;
      StyleSheet.build({
        $theme: getBreakpoint(window.width)
      });
      setBreakpoint(getBreakpoint(window.width));
    }, [getBreakpoint]);
    React.useEffect(function () {
      if (style && breakpoints.length) {
        RN.Dimensions.addEventListener('change', onDimesionsChange);
        return function () {
          return RN.Dimensions.removeEventListener('change', onDimesionsChange);
        };
      } else {
        return function () {
          return null;
        };
      }
    }, [breakpoints]);
    var stylesheet = getStylesheet(styles, breakpoint);
    return React__default.createElement(Component, Object.assign({}, props, {
      ref: ref,
      style: stylesheet
    }), children);
  });
  return Responsive;
}

var forwardableProps = {
  // primitive props
  abortPrefetch: true,
  accessibilityComponentType: true,
  accessibilityElementsHidden: true,
  accessibilityLabel: true,
  accessibilityLiveRegion: true,
  accessibilityRole: true,
  accessibilityStates: true,
  accessibilityTraits: true,
  accessibilityViewIsModal: true,
  accessible: true,
  adjustsFontSizeToFit: true,
  allowFontScaling: true,
  blurRadius: true,
  capInsets: true,
  collapsable: true,
  defaultSource: true,
  disabled: true,
  ellipsizeMode: true,
  fadeDuration: true,
  getSize: true,
  onPress: true,
  hitSlop: true,
  importantForAccessibility: true,
  loadingIndicatorSource: true,
  Methods: true,
  minimumFontScale: true,
  nativeID: true,
  needsOffscreenAlphaCompositing: true,
  numberOfLines: true,
  pointerEvents: true,
  prefetch: true,
  pressRetentionOffset: true,
  queryCache: true,
  removeClippedSubviews: true,
  renderToHardwareTextureAndroid: true,
  resizeMethod: true,
  resizeMode: true,
  resolveAssetSource: true,
  selectable: true,
  selectionColor: true,
  shouldRasterizeIOS: true,
  source: true,
  suppressHighlighting: true,
  testID: true,
  textBreakStrategy: true,
  children: true,
  style: true,
  maxWidth: false
};
function testPickPropsOnPrimitiveComponent(prop) {
  return forwardableProps[prop] === true || isPropValid(prop);
}
function testPickPropsOnOtherComponent(prop) {
  return prop !== 'theme' && prop !== 'innerRef';
}

function getShouldForwardProp(component) {
  switch (component) {
    case RN.View:
    case RN.Text:
    case RN.Image:
      {
        return testPickPropsOnPrimitiveComponent;
      }
  }

  return testPickPropsOnOtherComponent;
}
/**
 * a function that returns a styled component which render styles in React Native
 */

var emotionStyled = /*#__PURE__*/primitivesCore.createStyled(StyleSheet, {
  getShouldForwardProp: getShouldForwardProp
});

var styled = function styled(component, options) {
  return emotionStyled(withResponsive(component), options);
};

var css = /*#__PURE__*/primitivesCore.createCss(StyleSheet);
var components = ['ActivityIndicator', 'Button', 'DatePickerIOS', 'DrawerLayoutAndroid', 'FlatList', 'Image', 'ImageBackground', 'KeyboardAvoidingView', 'ListView', 'Modal', 'NavigatorIOS', 'Picker', 'PickerIOS', 'ProgressBarAndroid', 'ProgressViewIOS', 'RecyclerViewBackedScrollView', 'RefreshControl', 'SafeAreaView', 'ScrollView', 'SectionList', 'SegmentedControlIOS', 'Slider', 'SnapshotViewIOS', 'StatusBar', 'SwipeableListView', 'Switch', 'SwitchIOS', 'TabBarIOS', 'Text', 'TextInput', 'ToolbarAndroid', 'TouchableHighlight', 'TouchableNativeFeedback', 'TouchableOpacity', 'TouchableWithoutFeedback', 'View', 'ViewPagerAndroid'];
var styled$1 = /*#__PURE__*/components.reduce(function (acc, comp) {
  return Object.defineProperty(acc, comp, {
    enumerable: true,
    configurable: false,
    get: function get() {
      var key = comp;
      return styled(RN[key], {
        shouldForwardProp: getShouldForwardProp(RN[key])
      });
    }
  });
}, styled);

exports.css = css;
exports.default = styled$1;
//# sourceMappingURL=emotion-native-extended.cjs.development.js.map
