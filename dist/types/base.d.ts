import { ComponentPropsWithoutRef, ComponentType, NamedExoticComponent, PropsWithChildren } from 'react';
import * as RN from 'react-native';
import { ReactNativeStyle, ReactNativeStyleType, Theme } from './StyleSheet';
export declare type ReactNative = typeof RN;
export declare type ReactNativeComponentNames = 'ActivityIndicator' | 'Button' | 'DatePickerIOS' | 'DrawerLayoutAndroid' | 'FlatList' | 'Image' | 'ImageBackground' | 'KeyboardAvoidingView' | 'ListView' | 'Modal' | 'NavigatorIOS' | 'Picker' | 'PickerIOS' | 'ProgressBarAndroid' | 'ProgressViewIOS' | 'RecyclerViewBackedScrollView' | 'RefreshControl' | 'SafeAreaView' | 'ScrollView' | 'SectionList' | 'SegmentedControlIOS' | 'Slider' | 'SnapshotViewIOS' | 'StatusBar' | 'SwipeableListView' | 'Switch' | 'SwitchIOS' | 'TabBarIOS' | 'Text' | 'TextInput' | 'ToolbarAndroid' | 'TouchableHighlight' | 'TouchableNativeFeedback' | 'TouchableOpacity' | 'TouchableWithoutFeedback' | 'View' | 'ViewPagerAndroid';
export declare type ReactNativeComponents = Pick<ReactNative, ReactNativeComponentNames>;
export declare type ReactNativeComponentProps<ComponentName extends ReactNativeComponentNames> = ComponentPropsWithoutRef<ReactNativeComponents[ComponentName]>;
export declare type InterpolationPrimitive<StyleType extends ReactNativeStyle = ReactNativeStyle> = null | undefined | boolean | number | string | ObjectInterpolation<StyleType>;
export declare type ObjectInterpolation<StyleType extends ReactNativeStyle = ReactNativeStyle> = StyleType;
export interface ArrayCSSInterpolation<StyleType extends ReactNativeStyle = ReactNativeStyle> extends Array<CSSInterpolation<StyleType>> {
}
export declare type CSSInterpolation<StyleType extends ReactNativeStyle = ReactNativeStyle> = InterpolationPrimitive<StyleType> | ArrayCSSInterpolation<StyleType>;
export interface ArrayInterpolation<MergedProps, StyleType extends ReactNativeStyle = ReactNativeStyle> extends Array<Interpolation<MergedProps, StyleType>> {
}
export interface FunctionInterpolation<MergedProps, StyleType extends ReactNativeStyle = ReactNativeStyle> {
    (mergedProps: MergedProps): Interpolation<MergedProps, StyleType>;
}
export declare type Interpolation<MergedProps = unknown, StyleType extends ReactNativeStyle = ReactNativeStyle> = InterpolationPrimitive<StyleType> | ArrayInterpolation<MergedProps, StyleType> | FunctionInterpolation<MergedProps, StyleType>;
/** Same as StyledOptions but getShouldForwardProp must be a type guard */
export interface FilteringStyledOptions<Props, ForwardedProps extends keyof Props = keyof Props> {
    shouldForwardProp?(propName: PropertyKey): propName is ForwardedProps;
}
export interface StyledOptions<Props> {
    shouldForwardProp?(propName: keyof Props): boolean;
}
/**
 * @typeparam ComponentProps  Props which will be included when withComponent is called
 * @typeparam SpecificComponentProps  Props which will *not* be included when withComponent is called
 */
export interface StyledComponent<ComponentProps extends {}, SpecificComponentProps extends {} = {}> extends NamedExoticComponent<PropsWithChildren<ComponentProps & SpecificComponentProps>> {
    withComponent<Component extends ComponentType<ComponentPropsWithoutRef<Component>>>(component: Component): StyledComponent<ComponentProps & ComponentPropsWithoutRef<Component>>;
    withComponent<ComponentName extends ReactNativeComponentNames>(component: ReactNativeComponents[ComponentName]): StyledComponent<ComponentProps, ReactNativeComponentProps<ComponentName>>;
}
/**
 * @typeparam ComponentProps  Props which will be included when withComponent is called
 * @typeparam SpecificComponentProps  Props which will *not* be included when withComponent is called
 */
export interface CreateStyledComponent<ComponentProps extends {}, SpecificComponentProps extends {} = {}, StyleType extends ReactNativeStyle = ReactNativeStyle> {
    /**
     * @typeparam AdditionalProps  Additional props to add to your styled component
     */
    <AdditionalProps extends {} = {}>(...styles: ArrayInterpolation<ComponentProps & SpecificComponentProps & AdditionalProps & {
        theme: Theme;
    }, StyleType>): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps>;
    /**
     * @typeparam AdditionalProps  Additional props to add to your styled component
     */
    <AdditionalProps extends {} = {}>(template: TemplateStringsArray, ...styles: ArrayInterpolation<ComponentProps & SpecificComponentProps & AdditionalProps & {
        theme: Theme;
    }, StyleType>): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps>;
}
/**
 * @desc
 * This function accepts a React component.
 *
 * @example styled(MyComponent)({ width: 100 })
 * @example styled(MyComponent)(myComponentProps => ({ width: myComponentProps.width })
 * @example styled(View)({ width: 100 })
 * @example styled(View)<Props>(props => ({ width: props.width })
 */
export interface CreateStyled {
    <Component extends ComponentType<ComponentPropsWithoutRef<Component>>, ForwardedProps extends keyof ComponentPropsWithoutRef<Component> = keyof ComponentPropsWithoutRef<Component>>(component: Component, options: FilteringStyledOptions<ComponentPropsWithoutRef<Component>, ForwardedProps>): CreateStyledComponent<Pick<ComponentPropsWithoutRef<Component>, ForwardedProps> & {
        theme?: Theme;
    }, {}, ReactNativeStyleType<ComponentPropsWithoutRef<Component>>>;
    <Component extends ComponentType<ComponentPropsWithoutRef<Component>>>(component: Component, options?: StyledOptions<ComponentPropsWithoutRef<Component>>): CreateStyledComponent<ComponentPropsWithoutRef<Component> & {
        theme?: Theme;
    }, {}, ReactNativeStyleType<ComponentPropsWithoutRef<Component>>>;
    <ComponentName extends ReactNativeComponentNames, ForwardedProps extends keyof ReactNativeComponentProps<ComponentName> = keyof ReactNativeComponentProps<ComponentName>>(component: ReactNativeComponents[ComponentName], options: FilteringStyledOptions<ReactNativeComponentProps<ComponentName>, ForwardedProps>): CreateStyledComponent<{
        theme?: Theme;
    }, Pick<ReactNativeComponentProps<ComponentName>, ForwardedProps>, ReactNativeStyleType<ReactNativeComponentProps<ComponentName>>>;
    <ComponentName extends ReactNativeComponentNames>(component: ReactNativeComponents[ComponentName], options?: StyledOptions<ReactNativeComponentProps<ComponentName>>): CreateStyledComponent<{
        theme?: Theme;
    }, ReactNativeComponentProps<ComponentName>, ReactNativeStyleType<ReactNativeComponentProps<ComponentName>>>;
}
export interface CreateStyledExtended {
    <Component extends ComponentType<ComponentPropsWithoutRef<Component>>, ForwardedProps extends keyof ComponentPropsWithoutRef<Component> = keyof ComponentPropsWithoutRef<Component>>(component: Component, options: FilteringStyledOptions<ComponentPropsWithoutRef<Component>, ForwardedProps>): CreateStyledComponent<Pick<ComponentPropsWithoutRef<Component>, ForwardedProps> & {
        theme?: Theme;
    }, {}, ReactNativeStyleType<ComponentPropsWithoutRef<Component>>>;
    <Component extends ComponentType<ComponentPropsWithoutRef<Component>>>(component: Component, options?: StyledOptions<ComponentPropsWithoutRef<Component>>): CreateStyledComponent<ComponentPropsWithoutRef<Component> & {
        theme?: Theme;
    }, {}, ReactNativeStyleType<ComponentPropsWithoutRef<Component>>>;
    <ComponentName extends ReactNativeComponentNames, ForwardedProps extends keyof ReactNativeComponentProps<ComponentName> = keyof ReactNativeComponentProps<ComponentName>>(component: ReactNativeComponents[ComponentName], options: FilteringStyledOptions<ReactNativeComponentProps<ComponentName>, ForwardedProps>): CreateStyledComponent<{
        theme?: Theme;
    }, Pick<ReactNativeComponentProps<ComponentName>, ForwardedProps>, ReactNativeStyleType<ReactNativeComponentProps<ComponentName>>>;
    <ComponentName extends ReactNativeComponentNames>(component: ReactNativeComponents[ComponentName], options?: StyledOptions<ReactNativeComponentProps<ComponentName>>): CreateStyledComponent<{
        theme?: Theme;
    }, ReactNativeComponentProps<ComponentName>, ReactNativeStyleType<ReactNativeComponentProps<ComponentName>>>;
}
