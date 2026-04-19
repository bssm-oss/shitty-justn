import AppKit
import SwiftUI
import Combine

class StatusBarController {
    private var statusItem: NSStatusItem
    private var store: DDayStore
    private var langManager: LanguageManager
    private var timer: Timer?
    private var popover: NSPopover?
    private var cancellables = Set<AnyCancellable>()

    private static let maxVisible = 10
    private static let maxItems = 50

    init(store: DDayStore, langManager: LanguageManager) {
        self.store = store
        self.langManager = langManager
        self.statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)

        updateMenuBarTitle()
        buildMenu()
        scheduleTimer()

        store.$items
            .receive(on: DispatchQueue.main)
            .sink { [weak self] _ in
                self?.updateMenuBarTitle()
                self?.buildMenu()
            }
            .store(in: &cancellables)

        langManager.$language
            .receive(on: DispatchQueue.main)
            .sink { [weak self] _ in
                self?.updateMenuBarTitle()
                self?.buildMenu()
            }
            .store(in: &cancellables)
    }

    private func updateMenuBarTitle() {
        if let nearest = store.nearest {
            statusItem.button?.title = nearest.displayText
        } else {
            statusItem.button?.title = "📅 daybar"
        }
    }

    private func buildMenu() {
        let l = langManager.l10n
        let menu = NSMenu()
        let items = store.items
        let visibleItems = Array(items.prefix(Self.maxVisible))
        let hiddenItems = Array(items.dropFirst(Self.maxVisible))

        for item in visibleItems {
            menu.addItem(makeMenuItem(for: item))
        }

        if !hiddenItems.isEmpty {
            let subMenu = NSMenu()
            for item in hiddenItems {
                subMenu.addItem(makeMenuItem(for: item))
            }
            let moreItem = NSMenuItem(title: "\(l.menuMore) (\(hiddenItems.count))", action: nil, keyEquivalent: "")
            moreItem.submenu = subMenu
            menu.addItem(moreItem)
        }

        menu.addItem(NSMenuItem.separator())

        let addItem = NSMenuItem(title: l.menuAdd, action: #selector(showAddView), keyEquivalent: "")
        addItem.target = self
        addItem.isEnabled = items.count < Self.maxItems
        menu.addItem(addItem)

        let selectDeleteItem = NSMenuItem(title: l.menuSelectDelete, action: #selector(showSelectDeleteView), keyEquivalent: "")
        selectDeleteItem.target = self
        selectDeleteItem.isEnabled = !items.isEmpty
        menu.addItem(selectDeleteItem)

        let settingsItem = NSMenuItem(title: l.settings, action: #selector(showSettingsView), keyEquivalent: ",")
        settingsItem.target = self
        menu.addItem(settingsItem)

        menu.addItem(NSMenuItem.separator())

        let quitItem = NSMenuItem(
            title: l.quit,
            action: #selector(NSApplication.terminate(_:)),
            keyEquivalent: "q"
        )
        menu.addItem(quitItem)

        statusItem.menu = menu
    }

    private func makeMenuItem(for item: DDay) -> NSMenuItem {
        let menuItem = NSMenuItem(
            title: item.menuText,
            action: #selector(editItem(_:)),
            keyEquivalent: ""
        )
        menuItem.target = self
        menuItem.representedObject = item
        return menuItem
    }

    @objc private func editItem(_ sender: NSMenuItem) {
        guard let item = sender.representedObject as? DDay else { return }
        DispatchQueue.main.async { [weak self] in
            guard let self else { return }
            self.showPopover(
                content: EditDDayView(item: item, onDismiss: { [weak self] in self?.closePopover() })
                    .environmentObject(self.store)
                    .environmentObject(self.langManager),
                size: NSSize(width: 320, height: 490)
            )
        }
    }

    @objc private func showSelectDeleteView() {
        DispatchQueue.main.async { [weak self] in
            guard let self else { return }
            self.showPopover(
                content: SelectDeleteView(onDismiss: { [weak self] in self?.closePopover() })
                    .environmentObject(self.store)
                    .environmentObject(self.langManager),
                size: NSSize(width: 300, height: 360)
            )
        }
    }

    @objc private func showSettingsView() {
        DispatchQueue.main.async { [weak self] in
            guard let self else { return }
            self.showPopover(
                content: SettingsView(onDismiss: { [weak self] in self?.closePopover() })
                    .environmentObject(self.langManager),
                size: NSSize(width: 300, height: 240)
            )
        }
    }

    @objc private func showAddView() {
        DispatchQueue.main.async { [weak self] in
            guard let self else { return }
            self.showPopover(
                content: AddDDayView(onDismiss: { [weak self] in self?.closePopover() })
                    .environmentObject(self.store)
                    .environmentObject(self.langManager),
                size: NSSize(width: 320, height: 440)
            )
        }
    }

    private func showPopover<Content: View>(content: Content, size: NSSize) {
        closePopover()
        let newPopover = NSPopover()
        newPopover.contentViewController = NSHostingController(rootView: content)
        newPopover.contentSize = size
        newPopover.behavior = .transient
        newPopover.animates = true
        if let button = statusItem.button {
            newPopover.show(relativeTo: button.bounds, of: button, preferredEdge: .minY)
        }
        newPopover.contentViewController?.view.window?.makeKey()
        self.popover = newPopover
    }

    private func closePopover() {
        popover?.close()
        popover = nil
    }

    private func scheduleTimer() {
        let calendar = Calendar.current
        let now = Date()
        guard let tomorrow = calendar.date(byAdding: .day, value: 1, to: calendar.startOfDay(for: now)) else { return }
        let interval = tomorrow.timeIntervalSince(now)

        timer?.invalidate()
        let newTimer = Timer(timeInterval: interval, repeats: false) { [weak self] _ in
            self?.updateMenuBarTitle()
            self?.buildMenu()
            self?.scheduleTimer()
        }
        RunLoop.main.add(newTimer, forMode: .common)
        self.timer = newTimer
    }
}
