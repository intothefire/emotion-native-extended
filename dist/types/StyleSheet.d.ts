import * as RN from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
export declare type Theme<T = {
    [key: string]: any;
}> = {
    rem?: number;
} & T;
export declare type AnyStyle<T = {}> = T & {
    [key: string]: T & {
        [key: string]: T & string;
    };
};
export declare type StyleProp<T = {}> = RN.StyleProp<T> & {
    [key: string]: RN.StyleProp<T>;
};
export declare type TestType = AnyStyle<RN.ViewStyle>;
export declare type ReactNativeStyle = ExtendedStyle<RN.ViewStyle> | ExtendedStyle<RN.TextStyle> | ExtendedStyle<RN.ImageStyle>;
export declare type CustomClasses = ':first-child' | ':nth-child-even' | ':nth-child-odd' | ':last-child' | '@media web' | '@media ios' | '@media android' | '@media macos' | '@media windows';
export declare type MediaTypes = RN.PlatformOSType;
export declare type CustomProperties = {
    $outline?: boolean;
    $scale?: number;
};
export declare type ExtendedStyle<T = {}> = T | {
    [key in CustomClasses]: T | undefined;
} | {
    [key: string]: T;
} | {
    [key in keyof T]: string | number | string[];
};
export declare type ReactNativeStyleType<Props> = Props extends {
    style?: StyleProp<infer StyleType>;
} ? StyleType extends ReactNativeStyle ? StyleType : ReactNativeStyle : ReactNativeStyle;
export declare type ExtendedStylesheet = typeof EStyleSheet;
export interface Stylesheet extends ExtendedStylesheet {
    sheets: Array<Record<string, Record<string, string>>>;
}
