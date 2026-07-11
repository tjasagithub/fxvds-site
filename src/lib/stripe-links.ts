
/**
 * Paste LIVE Stripe Payment Links here.
 * Test-mode links will NOT work on the production deployment.
 * If a link is an empty string, the checkout will show a "temporarily unavailable" message.
 *
 * Location is chosen on our site before checkout, so each server location has its
 * own set of links (germany | newyork | london). The old in-checkout Stripe custom
 * field where the customer picked NY vs UK manually is no longer used.
 */
export const stripeLinks = {
  small: {
    germany: {
      base: 'https://buy.stripe.com/14A6oG8bM4j7epX2jj04801',
      backup: 'https://buy.stripe.com/5kQcN4gIi2aZdlT1ff04802',
      ip: 'https://buy.stripe.com/dRm00iajU7vjdlTf6504803',
      backup_ip: 'https://buy.stripe.com/14A00ibnY7vj4Pnga904804',
    },
    newyork: {
      base: 'https://buy.stripe.com/fZu14m1NoaHv5TrbTT0480t',
      backup: 'https://buy.stripe.com/fZu28q4ZAcPD4Pn6zz0480u',
      ip: 'https://buy.stripe.com/bJe5kC8bM16V81zbTT0480v',
      backup_ip: 'https://buy.stripe.com/4gM6oGgIi8znepX5vv0480w',
    },
    london: {
      base: 'https://buy.stripe.com/dRm7sK63Eg1PepXe210480W',
      backup: 'https://buy.stripe.com/eVqbJ0ajU4j70z7bTT0480X',
      ip: 'https://buy.stripe.com/aFadR82Rs3f35TrbTT0480Y',
      backup_ip: 'https://buy.stripe.com/14A9AS77I2aZ4Pne210480Z',
    },
  },
  medium: {
    germany: {
      base: 'https://buy.stripe.com/9B6fZg1NocPD81zga904805',
      backup: 'https://buy.stripe.com/9B6fZgajU5nb4Pnf6504806',
      ip: 'https://buy.stripe.com/dRm14mdw65nb0z72jj04807',
      backup_ip: 'https://buy.stripe.com/5kQcN4dw66rf81z2jj04808',
    },
    newyork: {
      base: 'https://buy.stripe.com/4gM6oGajU5nbchPf650480x',
      backup: 'https://buy.stripe.com/6oUaEW9fQ7vjbdL6zz0480y',
      ip: 'https://buy.stripe.com/bJe28qcs24j76Xv2jj0480z',
      backup_ip: 'https://buy.stripe.com/14AdR89fQbLzbdL7DD0480A',
    },
    london: {
      base: 'https://buy.stripe.com/9B614m2Rs4j7gy53nn04810',
      backup: 'https://buy.stripe.com/eVq14meAa02R81z7DD04811',
      ip: 'https://buy.stripe.com/28EeVc9fQ2aZ6Xv8HH04812',
      backup_ip: 'https://buy.stripe.com/4gMaEWdw602R2Hf7DD04813',
    },
  },
  large: {
    germany: {
      base: 'https://buy.stripe.com/5kQdR89fQ4j71Db1ff04809',
      backup: 'https://buy.stripe.com/14AdR8dw6cPD95D7DD0480a',
      ip: 'https://buy.stripe.com/6oU6oG77I6rf1Db1ff0480b',
      backup_ip: 'https://buy.stripe.com/fZufZg63EdTH95D4rr0480c',
    },
    newyork: {
      base: 'https://buy.stripe.com/9B6bJ0bnY2aZ2Hff650480O',
      backup: 'https://buy.stripe.com/9B600igIiaHv4Pn5vv0480P',
      ip: 'https://buy.stripe.com/9B628qeAabLzgy5cXX0480Q',
      backup_ip: 'https://buy.stripe.com/eVqdR82Rs9Drgy5ga90480R',
    },
    london: {
      base: 'https://buy.stripe.com/28EcN4fEe02RchPaPP04814',
      backup: 'https://buy.stripe.com/7sY5kC4ZA8znepX0bb04815',
      ip: 'https://buy.stripe.com/9B6cN4fEe8zn6Xv1ff04816',
      backup_ip: 'https://buy.stripe.com/14AbJ0cs28zndlT3nn04817',
    },
  },
  extralarge: {
    germany: {
      base: 'https://buy.stripe.com/dRmdR8bnYbLzbdLe210480i',
      backup: 'https://buy.stripe.com/eVq14mbnY6rfepXaPP0480j',
      ip: 'https://buy.stripe.com/8x26oGfEebLza9H0bb0480k',
      backup_ip: 'https://buy.stripe.com/9B6aEW8bM4j795D4rr0480l',
    },
    newyork: {
      base: 'https://buy.stripe.com/00w4gycs29Dr2HfcXX0480S',
      backup: 'https://buy.stripe.com/6oUeVc77I3f3fu11ff0480T',
      ip: 'https://buy.stripe.com/9B66oGajU6rfbdLe210480U',
      backup_ip: 'https://buy.stripe.com/aFa4gy8bM8zn81z5vv0480V',
    },
    london: {
      base: 'https://buy.stripe.com/6oUaEW8bM02R3Lj1ff04818',
      backup: 'https://buy.stripe.com/14AfZg0Jkg1Pfu1cXX04819',
      ip: 'https://buy.stripe.com/eVqfZg9fQ2aZ3Lj0bb0481a',
      backup_ip: 'https://buy.stripe.com/eVq8wOdw616V3Lj2jj0481b',
    },
  },
};
