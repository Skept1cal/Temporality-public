function disp(x) {

    if (x >= Number.MAX_VALUE || [Infinity, null, NaN, undefined].includes(x) || player.years >= Number.MAX_VALUE || [Infinity, null, NaN, undefined].includes(player.years)) {return "Infinity"};

    if (x === 0) return "0.00";

    if (x >= 1e33 || x < 0.001) {
        let value = [
            x / 10 ** Math.floor(Math.log10(x)),
            Math.floor(Math.log10(x))
        ];

        return `${value[0].toFixed(2)}e${value[1]}`

    } else if (1e3 <= x && x < 1e33) {
        const SUFFIXES = ["", "K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No", "Dc"];

        const suffix = SUFFIXES[Math.floor(Math.log10(x) / 3)];
        const remainder = Math.floor(Math.log10(x)) % 3;

        return `${(x / 10 ** (Math.floor(Math.log10(x)) - remainder)).toFixed(2)}${suffix}`

    } else if (0.001 <= x && x < 1e3) {
        return `${Number(x).toFixed(3)}`
    }
}