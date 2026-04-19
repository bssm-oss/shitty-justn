import Cocoa

class AppDelegate: NSObject, NSApplicationDelegate {
    var statusBarController: StatusBarController?
    let store = DDayStore()
    let langManager = LanguageManager()

    func applicationDidFinishLaunching(_ notification: Notification) {
        statusBarController = StatusBarController(store: store, langManager: langManager)
    }
}
