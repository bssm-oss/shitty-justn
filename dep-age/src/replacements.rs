pub fn get_replacement(name: &str) -> Option<&'static str> {
    match name.to_lowercase().as_str() {
        "lodash" | "lodash-es" => Some("es-toolkit"),
        "moment" => Some("dayjs 또는 date-fns"),
        "request" => Some("undici 또는 got"),
        "underscore" => Some("es-toolkit"),
        "chalk" => Some("picocolors"),
        "left-pad" => Some("String.prototype.padStart (built-in)"),
        _ => None,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn known_replacements() {
        assert_eq!(get_replacement("lodash"), Some("es-toolkit"));
        assert_eq!(get_replacement("lodash-es"), Some("es-toolkit"));
        assert_eq!(get_replacement("moment"), Some("dayjs 또는 date-fns"));
        assert_eq!(get_replacement("request"), Some("undici 또는 got"));
        assert_eq!(get_replacement("underscore"), Some("es-toolkit"));
        assert_eq!(get_replacement("chalk"), Some("picocolors"));
        assert_eq!(get_replacement("left-pad"), Some("String.prototype.padStart (built-in)"));
    }

    #[test]
    fn case_insensitive() {
        assert_eq!(get_replacement("Lodash"), Some("es-toolkit"));
        assert_eq!(get_replacement("MOMENT"), Some("dayjs 또는 date-fns"));
        assert_eq!(get_replacement("Chalk"), Some("picocolors"));
    }

    #[test]
    fn unknown_returns_none() {
        assert_eq!(get_replacement("react"), None);
        assert_eq!(get_replacement("serde"), None);
        assert_eq!(get_replacement(""), None);
    }
}
