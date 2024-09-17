function format(x) {
    if (x.gte(1e6)) {
        return EternalNotations.Presets.Standard.format(x)
    } else {
        return EternalNotations.Presets.Default.format(x)
    }

}