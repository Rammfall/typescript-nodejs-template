import os from 'os';
import cluster from 'cluster';

import application from './application';
import { PORT, ENV } from './config/application';

if (ENV !== 'development') {
  if (cluster.isMaster) {
    const cpusCount = os.cpus().length;
    for (let i = 0; i < cpusCount - 1; i += 1) {
      cluster.fork();
    }
  }
  if (cluster.isWorker) {
    application.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(
        `${new Date().toLocaleString()}:    Server is running on ${PORT} port.`
      );
    });
  }
} else {
  application.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on ${PORT} port.`);
  });
}
