import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  clientToken: process.env.DD_CLIENT_TOKEN,
  applicationId: process.env.DD_APPLICATION_ID,
  site: 'datadoghq.eu',
  service: 'romainmuller.dev',
  env: process.env.NODE_ENV,
  version: process.env.SITE_VERSION,
  sessionSampleRate: 100,
  sessionReplaySampleRate: 0,
  trackUserInteractions: false,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
});
