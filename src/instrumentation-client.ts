import { initBotId } from 'botid/client/core';

initBotId({
  protect: [
    {
      path: '/api/resume-qa',
      method: 'POST',
    },
  ],
});
