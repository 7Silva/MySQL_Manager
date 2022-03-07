'use strict';

import errorsClient from '../errorsClient.json' assert { type: 'json' };
import rateLimit from 'express-rate-limit';
import location from 'geoip-lite';

class Security {
  constructor(Agents, configs) {
    this.agent = Agents;
    this.conf = configs;
  }

  disabled() {}

  minimum() {}

  average(req) {
    const userAgent = req.headers['user-agent'].substr(0, 6);
    
    // const { country } = location.lookup(req.connection.remoteAddress);
    
    switch (userAgent) {
      case 'python':
        return 'Block';
        break;
    }
    // if (country == 'HK') return 'Block country';
    // if (country == 'RU') return 'Block country';
    // if (country == 'NL') return 'Block country';
  }

  maximum() {}

  rateLimit() {
    return rateLimit({
      windowMs: 15 * 60 * 1000, // 15 Minutes
      max: 20,
      message: errorsClient.Error3002,
      standardHeaders: true,
      legacyHeaders: false,
    });
  }
}

export default Security;