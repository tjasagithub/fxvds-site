
/**
 * Paste LIVE Stripe Payment Links here.
 * Test-mode links will NOT work on the production deployment.
 * If a link is an empty string, the checkout will show a "temporarily unavailable" message.
 */
export const stripeLinks = {
  small: {
    germany: {
      base: 'https://buy.stripe.com/14A6oG8bM4j7epX2jj04801',
      backup: 'https://buy.stripe.com/5kQcN4gIi2aZdlT1ff04802',
      ip: 'https://buy.stripe.com/dRm00iajU7vjdlTf6504803',
      backup_ip: 'https://buy.stripe.com/14A00ibnY7vj4Pnga904804',
    },
    global: {
      base: 'https://buy.stripe.com/fZu14m1NoaHv5TrbTT0480t',
      backup: 'https://buy.stripe.com/fZu28q4ZAcPD4Pn6zz0480u',
      ip: 'https://buy.stripe.com/bJe5kC8bM16V81zbTT0480v',
      backup_ip: 'https://buy.stripe.com/4gM6oGgIi8znepX5vv0480w',
    }
  },
  medium: {
    germany: {
      base: 'https://buy.stripe.com/9B6fZg1NocPD81zga904805',
      backup: 'https://buy.stripe.com/9B6fZgajU5nb4Pnf6504806',
      ip: 'https://buy.stripe.com/dRm14mdw65nb0z72jj04807',
      backup_ip: 'https://buy.stripe.com/5kQcN4dw66rf81z2jj04808',
    },
    global: {
      base: 'https://buy.stripe.com/4gM6oGajU5nbchPf650480x',
      backup: 'https://buy.stripe.com/6oUaEW9fQ7vjbdL6zz0480y',
      ip: 'https://buy.stripe.com/bJe28qcs24j76Xv2jj0480z',
      backup_ip: 'https://buy.stripe.com/14AdR89fQbLzbdL7DD0480A',
    }
  },
  large: {
    germany: {
      base: 'https://buy.stripe.com/5kQdR89fQ4j71Db1ff04809',
      backup: 'https://buy.stripe.com/14AdR8dw6cPD95D7DD0480a',
      ip: 'https://buy.stripe.com/6oU6oG77I6rf1Db1ff0480b',
      backup_ip: 'https://buy.stripe.com/fZufZg63EdTH95D4rr0480c',
    },
    global: {
      base: 'https://buy.stripe.com/7sY7sK8bM9Drfu1f650480E',
      backup: 'https://buy.stripe.com/8x2eVc2RsdTH6Xv8HH0480F',
      ip: 'https://buy.stripe.com/9B614mgIi9Dr1Db7DD0480I',
      backup_ip: 'https://buy.stripe.com/cNibJ02Rs4j7dlT5vv0480J',
    }
  },
  extralarge: {
    germany: {
      base: 'https://buy.stripe.com/dRm7sKbnY7vj6Xv6zz0480o',
      backup: 'https://buy.stripe.com/dRmaEWcs202R6Xvf650480p',
      ip: 'https://buy.stripe.com/9B600i1No7vjdlTga90480s',
      backup_ip: 'https://buy.stripe.com/4gMcN41NoaHvfu15vv0480r',
    },
    global: {
      base: 'https://buy.stripe.com/fZu3cu8bM5nb4PnaPP0480K',
      backup: 'https://buy.stripe.com/7sYeVc2Rs5nb5Tr6zz0480L',
      ip: 'https://buy.stripe.com/bJe00ieAa6rfgy55vv0480M',
      backup_ip: 'https://buy.stripe.com/14A3cu1NoeXL3Lj4rr0480N',
    }
  },
};
