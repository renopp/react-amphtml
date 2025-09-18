import * as React from 'react';
import { ReactElement, useContext } from 'react';
import PropTypes from 'prop-types';
import contextHelper from '../../lib/contextHelper';
import { AmpScriptsContext } from '../../setup/AmpScriptsManager';

export interface AmpStateProps {
  children?: any;
  id?: string;
  src?: string;
}

const AmpState: React.FunctionComponent<AmpStateProps> = ({
  children,
  id,
  src,
}): ReactElement => {
  const context = useContext(AmpScriptsContext);
  contextHelper({ context, extension: 'amp-bind' });

  if (src) {
    return <amp-state id={id} src={src} />;
  }

  return (
    <amp-state id={id}>
      <script
        type="application/json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(children),
        }}
      />
    </amp-state>
  );
};

AmpState.propTypes = {
  id: PropTypes.string,
  children: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  src: PropTypes.string,
};

AmpState.defaultProps = {
  id: '',
  children: null,
  src: undefined,
};

export default AmpState;
