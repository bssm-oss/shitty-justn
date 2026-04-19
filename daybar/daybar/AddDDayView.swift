import SwiftUI

struct AddDDayView: View {
    @EnvironmentObject var store: DDayStore
    @EnvironmentObject var langManager: LanguageManager
    let onDismiss: () -> Void

    @State private var name = ""
    @State private var date = Calendar.current.date(byAdding: .day, value: 1, to: Date()) ?? Date()
    @State private var emoji = "📅"

    var body: some View {
        let l = langManager.l10n
        VStack(alignment: .leading, spacing: 12) {
            Text(l.addTitle)
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
                Button(l.cancel) { onDismiss() }
                    .keyboardShortcut(.escape, modifiers: [])
                Spacer()
                Button(l.add) {
                    store.add(DDay(id: UUID(), name: name, date: date, emoji: emoji))
                    onDismiss()
                }
                .disabled(name.trimmingCharacters(in: .whitespaces).isEmpty)
                .buttonStyle(.borderedProminent)
                .keyboardShortcut(.return, modifiers: [])
            }
        }
        .padding()
        .frame(width: 320, height: 440)
    }
}
