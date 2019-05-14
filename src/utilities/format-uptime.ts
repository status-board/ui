const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;
const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24;

/**
 * Format uptime (seconds) to human readable output.
 *
 * @param {Number} uptime
 * @returns {string}
 */
const formatUptime = (uptime: number): string => {
    const parts = [];
    let remaining = Math.round(uptime);

    if (remaining >= SECONDS_PER_DAY) {
        parts.push(`${Math.floor(remaining / SECONDS_PER_DAY)}d`);
        remaining %= SECONDS_PER_DAY;
    }

    if (remaining >= SECONDS_PER_HOUR) {
        parts.push(`${Math.floor(remaining / SECONDS_PER_HOUR)}h`);
        remaining %= SECONDS_PER_HOUR;
    }

    if (remaining >= SECONDS_PER_MINUTE) {
        parts.push(`${Math.floor(remaining / SECONDS_PER_MINUTE)}mn`);
        remaining %= SECONDS_PER_MINUTE;
    }

    parts.push(`${remaining}s`);

    return parts.join(' ');
};

export default formatUptime;
