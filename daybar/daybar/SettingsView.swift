import SwiftUI
import ServiceManagement

struct SettingsView: View {
    @EnvironmentObject var langManager: LanguageManager
    let onDismiss: () -> Void

    @State private var launchAtLogin: Bool = (SMAppService.mainApp.status == .enabled)

    var body: some View {
        let l = langManager.l10n
        VStack(alignment: .leading, spacing: 16) {
            Text(l.settings)
                .font(.headline)

            Divider()

            Toggle(l.launchAtLogin, isOn: $launchAtLogin)
                .toggleStyle(.switch)
                .onChange(of: launchAtLogin) { enabled in
                    do {
                        if enabled {
                            try SMAppService.mainApp.register()
                        } else {
                            try SMAppService.mainApp.unregister()
                        }
                    } catch {
                        launchAtLogin = !enabled
                    }
                }

            HStack {
                Text(l.language)
                Spacer()
                Picker("", selection: $langManager.language) {
                    ForEach(Language.allCases, id: \.self) { lang in
                        Text(lang.displayName).tag(lang)
                    }
                }
                .labelsHidden()
                .frame(width: 110)
            }

            Divider()

            HStack {
                Text(l.version)
                    .foregroundColor(.secondary)
                Spacer()
                Text(Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "1.0.0")
                    .foregroundColor(.secondary)
            }
            .font(.caption)

            Spacer()

            HStack {
                Button("GitHub") {
                    NSWorkspace.shared.open(URL(string: "https://github.com/justn-hyeok/daybar")!)
                }
                Button(l.reportBug) {
                    NSWorkspace.shared.open(URL(string: "https://github.com/justn-hyeok/daybar/issues/new")!)
                }
                Spacer()
                Button(l.close) { onDismiss() }
                    .keyboardShortcut(.escape, modifiers: [])
            }
        }
        .padding(16)
        .frame(width: 300, height: 240)
    }
}
