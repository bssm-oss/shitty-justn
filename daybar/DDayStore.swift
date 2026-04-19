import Foundation
import Combine

class DDayStore: ObservableObject {
    @Published var items: [DDay] = []

    private let key = "daybar_items"

    init() { load() }

    func load() {
        guard let data = UserDefaults.standard.data(forKey: key),
              let decoded = try? JSONDecoder().decode([DDay].self, from: data)
        else { return }
        items = decoded.sorted()
    }

    func save() {
        guard let data = try? JSONEncoder().encode(items) else { return }
        UserDefaults.standard.set(data, forKey: key)
    }

    func add(_ item: DDay) {
        items.append(item)
        items.sort()
        save()
    }

    func delete(_ item: DDay) {
        items.removeAll { $0.id == item.id }
        save()
    }

    func update(_ item: DDay) {
        if let idx = items.firstIndex(where: { $0.id == item.id }) {
            items[idx] = item
            items.sort()
            save()
        }
    }

    var nearest: DDay? { items.first }
}
