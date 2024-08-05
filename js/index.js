import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  clientToken: '{{ process.env.DD_CLIENT_TOKEN or "" }}',
  applicationId: '{{ process.env.DD_APPLICATION_ID or "" }}',
  site: 'datadoghq.eu',
  service: 'romainmuller.dev',
  env: '{% if eleventy.runMode == "build" %}prod{% else %}dev{% endif %}',
  version: '{{ process.env.SITE_VERSION or "" }}',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 0,
  trackUserInteractions: false,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
});
