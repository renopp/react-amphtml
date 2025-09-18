import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import AmpScripts from './AmpScripts';
import { CONTEXT_KEY } from '../constants';

export interface AmpScriptsManagerContext {
  [CONTEXT_KEY]: AmpScripts;
}

export const AmpScriptsContext = React.createContext<AmpScriptsManagerContext>({
  [CONTEXT_KEY]: new AmpScripts(),
});

export interface AmpScriptsManagerProps {
  children: ReactNode;
  ampScripts: AmpScripts;
}

const AmpScriptsManager: React.FC<AmpScriptsManagerProps> = ({ children, ampScripts }) => {
  const contextValue: AmpScriptsManagerContext = {
    [CONTEXT_KEY]: ampScripts,
  };

  return (
    <AmpScriptsContext.Provider value={contextValue}>
      {React.Children.only(children)}
    </AmpScriptsContext.Provider>
  );
};

AmpScriptsManager.propTypes = {
  children: PropTypes.node.isRequired,
  ampScripts: PropTypes.instanceOf(AmpScripts).isRequired,
};

export default AmpScriptsManager;
