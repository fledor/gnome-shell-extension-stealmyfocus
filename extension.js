import * as Main from "resource:///org/gnome/shell/ui/main.js";
import * as WindowAttentionHandler from "resource:///org/gnome/shell/ui/windowAttentionHandler.js";
import {
  Extension,
  gettext as _,
} from "resource:///org/gnome/shell/extensions/extension.js";

export default class StealMyFocus extends Extension {
  enable() {
    console.log("Enabling StealMyFocus");
    this._init();
  }

  disable() {
    console.log("Disabling StealMyFocus");
    this.destroy();
  }

  _init() {
    //this._tracker = Shell.WindowTracker.get_default();
    this._tracker = WindowAttentionHandler._tracker;
    this._handlerid = global.display.connect(
      "window-demands-attention",
      this._onWindowDemandsAttention.bind(this)
    );
  }

  _onWindowDemandsAttention(display, window) {
    Main.activateWindow(window);
  }

  destroy() {
    global.display.disconnect(this._handlerid);
  }
}