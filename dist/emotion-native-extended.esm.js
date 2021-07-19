import * as RN from 'react-native';
import { Platform, Dimensions, Image, Text, View } from 'react-native';
import { createStyled, createCss } from '@emotion/primitives-core';
import EStyleSheet from 'react-native-extended-stylesheet';
import mediaQuery from 'css-mediaquery';
import React, { useContext, useMemo, useCallback, useState, useEffect } from 'react';
import { ThemeContext } from '@emotion/react';
import memoize from 'lodash.memoize';
import isPropValid from '@emotion/is-prop-valid';

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
  var Responsive = React.forwardRef(function (_ref, ref) {
    var style = _ref.style,
        children = _ref.children,
        props = _objectWithoutPropertiesLoose(_ref, ["style", "children"]);

    var theme = useContext(ThemeContext);
    var getStylesheet = memoize(function (styles, _breakpoint) {
      return StyleSheet.create({
        styles: styles
      }).styles;
    }, function (_styles, _breakpoint) {
      return breakpoint;
    });
    var styles = useMemo(function () {
      if (!style) return {}; // Adds support for `screen` media queries to support Styled System
      // @see https://github.com/styled-system/styled-system/pull/1133
      // @see https://github.com/vitalets/react-native-extended-stylesheet/pull/132

      var _styles = Object.keys(style).reduce(function (acc, key) {
        acc[key.replace('screen', Platform.OS)] = style[key];
        return acc;
      }, {});

      return _styles;
    }, [style]);
    var remValue = useMemo(function () {
      try {
        return Number(StyleSheet.value('$rem'));
      } catch (_unused) {
        return Number((theme === null || theme === void 0 ? void 0 : theme.rem) || 16);
      }
    }, [theme]);
    var breakpoints = useMemo(function () {
      return findBreakpoints(styles, remValue);
    }, [styles, remValue]);
    var getBreakpoint = useCallback(function (width) {
      return (breakpoints || []).find(function (item) {
        return width < item;
      });
    }, [breakpoints]);

    var _useState = useState(getBreakpoint(Dimensions.get('window').width)),
        breakpoint = _useState[0],
        setBreakpoint = _useState[1];

    var onDimesionsChange = useCallback(function (_ref2) {
      var window = _ref2.window;
      StyleSheet.build({
        $theme: getBreakpoint(window.width)
      });
      setBreakpoint(getBreakpoint(window.width));
    }, [getBreakpoint]);
    useEffect(function () {
      if (style && breakpoints.length) {
        Dimensions.addEventListener('change', onDimesionsChange);
        return function () {
          return Dimensions.removeEventListener('change', onDimesionsChange);
        };
      } else {
        return function () {
          return null;
        };
      }
    }, [breakpoints]);
    var stylesheet = getStylesheet(styles, breakpoint);
    return React.createElement(Component, Object.assign({}, props, {
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
    case View:
    case Text:
    case Image:
      {
        return testPickPropsOnPrimitiveComponent;
      }
  }

  return testPickPropsOnOtherComponent;
}
/**
 * a function that returns a styled component which render styles in React Native
 */

var emotionStyled = /*#__PURE__*/createStyled(StyleSheet, {
  getShouldForwardProp: getShouldForwardProp
});

var styled = function styled(component, options) {
  return emotionStyled(withResponsive(component), options);
};

var css = /*#__PURE__*/createCss(StyleSheet);
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

export default styled$1;
export { css };
//# sourceMappingURL=emotion-native-extended.esm.js.map
