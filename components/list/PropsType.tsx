import React, { ReactNode } from 'react';
import { NativeProps, WebProps } from '../baseType';

export interface ListProps {
  renderHeader?: Function | JSX.Element;
  renderFooter?: Function | JSX.Element;
  children?: JSX.Element | JSX.Element[];
}

export interface ListWebProps extends WebProps, ListProps {

}

export interface ListNativeProps extends NativeProps, ListProps {
  styles?: {
    Header?: {};
    Footer?: {};
    Body?: {};
    BodyBottomLine?: {};
  };
}

export interface ListItemProps {
  align?: 'top'|'middle'|'bottom';
  disabled?: boolean;
  multipleLine?: boolean;
  children?: ReactNode;
  thumb?: ReactNode | null;
  extra?: ReactNode;
  arrow?: 'horizontal'|'down'|'up'|'empty'|'';
  wrap?: boolean;
}

export interface ListItemWebProps extends WebProps, ListItemProps {
  activeStyle?: React.CSSProperties;
  error?: boolean;
  platform?: 'android' | 'ios' | 'cross';
  onClick?: Function;
}

export interface ListItemNativeProps extends NativeProps, ListItemProps {
  styles?: {
    underlayColor: {},
    Content: {},
    column: {},
    Extra: {},
    Arrow: {},
    ArrowV: {},
    Item: {},
    Thumb: {},
    multipleThumb: {},
    Line: {},
    multipleLine: {},
  };
  onPressIn?: () => void;
  onPressOut?: () => void;
  onClick?: () => void;
}

export interface BriefProps {
  children?: ReactNode;
  wrap?: boolean;
}

export interface BriefWebProps extends WebProps, BriefProps {

}

export interface BriefNativeProps extends NativeProps, BriefProps {
  styles: {
    Brief: {},
    BriefText: {},
  };
}
