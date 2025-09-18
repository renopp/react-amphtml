import React, { ReactElement } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import contextHelper from '../lib/contextHelper';
import { ON_ATTRIBUTE } from './Action';

import { Script, ScriptProps } from '../amphtml/amphtml';

export const BLACKLIST = [ON_ATTRIBUTE];

const boundAttributeRegExp = /^data-amp-.*?$/;

export interface AmpBindProps {
  [boundAttribute: string]: string;
}

export interface BindProps {
  children: (props: AmpBindProps) => ReactElement;
  version?: ScriptProps['version'];
  [prop: string]: string | undefined | any;
}

import { useContext } from 'react';
import { AmpScriptsContext } from '../setup/AmpScriptsManager';

const Bind: React.FunctionComponent<BindProps> = ({
  children,
  version,
  ...props
}: BindProps): ReactElement => {
  const context = useContext(AmpScriptsContext);
  contextHelper({ context, extension: 'amp-bind', version });

  const boundAttributeProps = Object.entries(props).reduce(
    (
      allProps: AmpBindProps,
      [propsName, propValue]: [string, string],
    ): AmpBindProps => ({
      ...allProps,
      [BLACKLIST.includes(propsName) || boundAttributeRegExp.test(propsName)
        ? propsName
        : `data-amp-bind-${propsName}`]: propValue,
    }),
    {},
  );

  return children(boundAttributeProps);
};

Bind.defaultProps = {
  version: 'latest',
};

Bind.propTypes = {
  children: PropTypes.func.isRequired,
  version: Script.propTypes && Script.propTypes.version,
};


export default Bind;
