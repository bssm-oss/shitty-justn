import SwiftUI

struct EditDDayView: View {
    @EnvironmentObject var store: DDayStore
    @EnvironmentObject var langManager: LanguageManager
    let item: DDay
    let onDismiss: () -> Void

    @State private var name: String
    @State private var date: Date
    @State private var emoji: String
    @State private var showDeleteConfirm = false

    init(item: DDay, onDismiss: @escaping () -> Void) {
        self.item = item
        self.onDismiss = onDismiss
        self._name = State(initialValue: item.name)
        self._date = State(initialValue: item.date)
        self._emoji = State(initialValue: item.emoji)
    }

    var body: some View {
        let l = langManager.l10n
        VStack(alignment: .leading, spacing: 12) {
            Text(l.editTitle)
                .font(.headline)

            HStack {
                Text(l.fieldName)
                    .frame(width: 52, alignment: .trailing)
                TextField(l.namePlaceholder, text: $name)
                    .textFieldStyle(.roundedBorder)
            }

            HStack(alignment: .top) {
                Text(l.fieldDate)
                    .frame(width: 52, alignment: .trailing)
                    .padding(.top, 6)
                DatePicker("", selection: $date, displayedComponents: .date)
                    .labelsHidden()
                    .datePickerStyle(.graphical)
                    .environment(\.locale, Locale(identifier: langManager.language == .ko ? "ko_KR" : "en_US"))
                    .frame(maxWidth: .infinity)
            }

            HStack {
                Text(l.fieldEmoji)
                    .frame(width: 52, alignment: .trailing)
                ZStack {
                    RoundedRectangle(cornerRadius: 8)
                        .fill(Color(NSColor.controlBackgroundColor))
                        .frame(width: 60, height: 52)
                    EmojiTextField(emoji: $emoji)
                        .frame(width: 52, height: 44)
                }
                Text(l.emojiHint)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            Spacer()

            HStack {
                Button(l.delete) { showDeleteConfirm = true }
                    .foregroundColor(.red)
                    .confirmationDialog(
                        l.deleteConfirm(item.name),
                        isPresented: $showDeleteConfirm,
                        titleVisibility: .visible
                    ) {
                        Button(l.delete, role: .destructive) {
                            store.delete(item)
                            onDismiss()
                        }
                        Button(l.cancel, role: .cancel) {}
                    }

                Spacer()

                Button(l.cancel) { onDismiss() }
                    .keyboardShortcut(.escape, modifiers: [])

                Button(l.save) {
                    var updated = item
                    updated.name = name
                    updated.date = date
                    updated.emoji = emoji
                    store.update(updated)
                    onDismiss()
                }
                .disabled(name.trimmingCharacters(in: .whitespaces).isEmpty)
                .buttonStyle(.borderedProminent)
                .keyboardShortcut(.return, modifiers: [])
            }
        }
        .padding()
        .frame(width: 320, height: 490)
    }
}
