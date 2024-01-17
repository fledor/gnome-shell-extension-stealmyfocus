import * as Main from "resource:///org/gnome/shell/ui/main.js";
import {
  Extension,
  gettext as _,
} from "resource:///org/gnome/shell/extensions/extension.js";

export default class StealMyFocus extends Extension {
  enable() {
    console.log("Enabling StealMyFocus");
  }

  disable() {
    console.log("Disabling StealMyFocus");
  }

  _init() {
    this._tracker = Shell.WindowTracker.get_default();
    this._handlerid = global.display.connect(
      "window-demands-attention",
      Lang.bind(this, this._onWindowDemandsAttention)
    );
  }

  _onWindowDemandsAttention(display, window) {
    Main.activateWindow(window);
  }

  destroy() {
    global.display.disconnect(this._handlerid);
  }
}
