import Foundation
import Combine

class LanguageManager: ObservableObject {
    @Published var language: Language {
        didSet { UserDefaults.standard.set(language.rawValue, forKey: "app_language") }
    }

    var l10n: L10n { L10n(lang: language) }

    init() {
        let saved = UserDefaults.standard.string(forKey: "app_language") ?? "en"
        self.language = Language(rawValue: saved) ?? .en
    }
}
