import SwiftUI

struct SelectDeleteView: View {
    @EnvironmentObject var store: DDayStore
    @EnvironmentObject var langManager: LanguageManager
    let onDismiss: () -> Void

    @State private var selected: Set<UUID> = []

    var body: some View {
        let l = langManager.l10n
        VStack(alignment: .leading, spacing: 0) {
            Text(l.selectToDelete)
                .font(.headline)
                .padding([.horizontal, .top], 16)
                .padding(.bottom, 10)

            Divider()

            if store.items.isEmpty {
                Text(l.noItems)
                    .foregroundColor(.secondary)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else {
                ScrollView {
                    VStack(spacing: 0) {
                        ForEach(store.items) { item in
                            HStack(spacing: 10) {
                                Image(systemName: selected.contains(item.id) ? "checkmark.circle.fill" : "circle")
                                    .foregroundColor(selected.contains(item.id) ? .accentColor : .secondary)
                                    .font(.system(size: 18))
                                Text(item.menuText)
                                    .lineLimit(1)
                                Spacer()
                            }
                            .padding(.horizontal, 16)
                            .padding(.vertical, 8)
                            .contentShape(Rectangle())
                            .onTapGesture {
                                if selected.contains(item.id) {
                                    selected.remove(item.id)
                                } else {
                                    selected.insert(item.id)
                                }
                            }
                            Divider().padding(.leading, 44)
                        }
                    }
                }
            }

            Divider()

            HStack(spacing: 8) {
                Button(l.selectAll) {
                    if selected.count == store.items.count {
                        selected.removeAll()
                    } else {
                        selected = Set(store.items.map { $0.id })
                    }
                }
                .buttonStyle(.link)
                .onHover { inside in
                    if inside { NSCursor.pointingHand.push() } else { NSCursor.pop() }
                }

                Spacer()

                Button(l.cancel) { onDismiss() }

                Button(l.deleteCount(selected.count)) {
                    store.items
                        .filter { selected.contains($0.id) }
                        .forEach { store.delete($0) }
                    onDismiss()
                }
                .disabled(selected.isEmpty)
                .foregroundColor(selected.isEmpty ? .secondary : .red)
            }
            .padding(12)
        }
        .frame(width: 300, height: 360)
    }
}
