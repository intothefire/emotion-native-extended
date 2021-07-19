import React from 'react';
import { AnyStyle } from './types/StyleSheet';
declare type AnyProps = {
    style: AnyStyle;
    [key: string]: any;
} & any;
declare function withResponsive<T extends React.ComponentClass<any>>(Component: T): React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<T> & {
    ref?: React.Ref<InstanceType<T>>;
} & AnyProps>;
declare function withResponsive<P extends AnyProps & {
    ref?: React.Ref<any>;
}>(Component: React.ForwardRefExoticComponent<P & AnyProps>): React.ForwardRefExoticComponent<P & AnyProps>;
declare function withResponsive<P = AnyProps>(Component: React.FunctionComponent<P & AnyProps>): React.ForwardRefExoticComponent<P & AnyProps>;
export { withResponsive };
