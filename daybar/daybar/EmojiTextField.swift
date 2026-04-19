import SwiftUI
import AppKit

private class EmojiNSTextField: NSTextField {
    override func mouseDown(with event: NSEvent) {
        window?.makeFirstResponder(self)
        NSApp.activate(ignoringOtherApps: true)
        if let editor = window?.fieldEditor(true, for: self) as? NSTextView {
            editor.selectedRange = NSRange(location: 0, length: 0)
            editor.insertionPointColor = .clear
        }
        DispatchQueue.main.async {
            NSApp.orderFrontCharacterPalette(nil)
        }
    }

    override func updateTrackingAreas() {
        super.updateTrackingAreas()
        trackingAreas.forEach { removeTrackingArea($0) }
        addTrackingArea(NSTrackingArea(
            rect: bounds,
            options: [.activeAlways, .mouseEnteredAndExited, .cursorUpdate],
            owner: self,
            userInfo: nil
        ))
    }

    override func cursorUpdate(with event: NSEvent) {
        NSCursor.pointingHand.set()
    }

    override func becomeFirstResponder() -> Bool {
        let result = super.becomeFirstResponder()
        if let editor = window?.fieldEditor(true, for: self) as? NSTextView {
            editor.selectedRange = NSRange(location: 0, length: 0)
            editor.insertionPointColor = .clear
        }
        return result
    }
}

struct EmojiTextField: NSViewRepresentable {
    @Binding var emoji: String

    func makeNSView(context: Context) -> NSTextField {
        let field = EmojiNSTextField()
        field.alignment = .center
        field.font = .systemFont(ofSize: 36)
        field.stringValue = emoji
        field.delegate = context.coordinator
        field.isBordered = false
        field.drawsBackground = false
        field.focusRingType = .none
        field.isEditable = true
        field.isSelectable = true
        return field
    }

    func updateNSView(_ nsView: NSTextField, context: Context) {
        if nsView.stringValue != emoji {
            nsView.stringValue = emoji
        }
    }

    func makeCoordinator() -> Coordinator { Coordinator(self) }

    class Coordinator: NSObject, NSTextFieldDelegate {
        var parent: EmojiTextField

        init(_ parent: EmojiTextField) {
            self.parent = parent
        }

        func controlTextDidChange(_ obj: Notification) {
            guard let field = obj.object as? NSTextField else { return }
            let value = field.stringValue
            guard !value.isEmpty else { return }
            let picked = String(value.prefix(1))
            parent.emoji = picked
            DispatchQueue.main.async {
                field.stringValue = picked
            }
        }
    }
}
