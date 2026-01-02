const calExpireAt = (time) => {
    // example: 60s, 1m, 1h, 1d
    // parse 60s to 60000
    // parse 1m to 60000
    // parse 1h to 3600000
    // parse 1d to 86400000
    // validate time format 
    if (!time) return;
    if (time.length < 2) return;
    if (isNaN(parseInt(time.slice(0, -1)))) return;
    // not match s, m, h, d
    if (!['s', 'm', 'h', 'd'].includes(time.slice(-1))) return;
    const unit = time.slice(-1);
    const value = parseInt(time.slice(0, -1));
    const now = Date.now();
    switch (unit) {
        case 's':
            return now + value * 1000;
        case 'm':
            return now + value * 60 * 1000;
        case 'h':
            return now + value * 60 * 60 * 1000;
        case 'd':
            return now + value * 24 * 60 * 60 * 1000;
        default:
            return now + value;
    }
};

module.exports = { calExpireAt };
