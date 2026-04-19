import Foundation

enum Language: String, CaseIterable {
    case en, ko

    var displayName: String {
        switch self {
        case .en: return "English"
        case .ko: return "한국어"
        }
    }
}

struct L10n {
    let lang: Language

    // MARK: - Common
    var cancel: String        { lang == .en ? "Cancel"   : "취소" }
    var close: String         { lang == .en ? "Close"    : "닫기" }
    var save: String          { lang == .en ? "Save"     : "저장" }
    var delete: String        { lang == .en ? "Delete"   : "삭제" }
    var add: String           { lang == .en ? "Add"      : "추가" }
    var quit: String          { lang == .en ? "Quit"     : "종료" }
    var settings: String      { lang == .en ? "Settings" : "설정" }
    var selectAll: String     { lang == .en ? "Select All"     : "전체 선택" }

    // MARK: - Menu
    var menuAdd: String         { lang == .en ? "+ Add"            : "+ 추가" }
    var menuSelectDelete: String { lang == .en ? "Select & Delete" : "선택 삭제" }
    var menuMore: String        { lang == .en ? "More"             : "더보기" }

    // MARK: - AddDDayView
    var addTitle: String    { lang == .en ? "New D-day"   : "새 D-day 추가" }
    var fieldName: String   { lang == .en ? "Name:"       : "이름:" }
    var fieldDate: String   { lang == .en ? "Date:"       : "날짜:" }
    var fieldEmoji: String  { lang == .en ? "Emoji:"      : "이모지:" }
    var namePlaceholder: String { lang == .en ? "Enter name" : "이름 입력" }
    var emojiHint: String   { lang == .en ? "Click to open emoji picker" : "클릭하면 이모지 피커가 열립니다" }

    // MARK: - EditDDayView
    var editTitle: String   { lang == .en ? "Edit D-day" : "D-day 편집" }

    // MARK: - SelectDeleteView
    var selectToDelete: String { lang == .en ? "Select to Delete"        : "삭제할 항목 선택" }
    var noItems: String        { lang == .en ? "No D-days registered"    : "등록된 D-day가 없습니다" }
    func deleteCount(_ n: Int) -> String { lang == .en ? "Delete (\(n))" : "삭제 (\(n))" }
    func deleteConfirm(_ name: String) -> String {
        lang == .en ? "Delete '\(name)'?" : "'\(name)'을(를) 삭제하시겠습니까?"
    }

    // MARK: - SettingsView
    var launchAtLogin: String { lang == .en ? "Launch at Login" : "로그인 시 자동 실행" }
    var version: String       { lang == .en ? "Version"         : "버전" }
    var reportBug: String     { lang == .en ? "Report Bug"      : "버그제보" }
    var language: String      { lang == .en ? "Language"        : "언어" }
}
