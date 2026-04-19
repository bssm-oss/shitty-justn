import Foundation

struct DDay: Identifiable, Codable, Comparable {
    let id: UUID
    var name: String
    var date: Date
    var emoji: String

    var daysRemaining: Int {
        let calendar = Calendar.current
        let todayComponents = calendar.dateComponents([.year, .month, .day], from: Date())
        let targetComponents = calendar.dateComponents([.year, .month, .day], from: date)
        guard let today = calendar.date(from: todayComponents),
              let target = calendar.date(from: targetComponents) else { return 0 }
        return calendar.dateComponents([.day], from: today, to: target).day ?? 0
    }

    private var dayTag: String {
        let d = daysRemaining
        if d > 0 { return "D-\(d)" }
        else if d == 0 { return "D-Day" }
        else { return "D+\(abs(d))" }
    }

    var displayText: String { "\(emoji) \(dayTag)" }
    var menuText: String { "\(emoji) \(name)     \(dayTag)" }

    static func < (lhs: DDay, rhs: DDay) -> Bool {
        abs(lhs.daysRemaining) < abs(rhs.daysRemaining)
    }
}
