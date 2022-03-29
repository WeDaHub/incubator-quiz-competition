import tcb from '@cloudbase/js-sdk';

window._tcbEnv = window._tcbEnv || {};
export const envId = window._tcbEnv.TCB_ENV_ID || process.env.REACT_APP_ENV_ID;
export const region = window._tcbEnv.TCB_REGION || process.env.REACT_APP_REGION;

export const getApp = () => {
  const app = tcb.init({
    env: envId,
    region: region,
  });

  return app;
};
