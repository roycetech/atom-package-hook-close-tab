'use babel';

import AtomPackageHookCloseTabView from './atom-package-hook-close-tab-view';
import { CompositeDisposable } from 'atom';

export default {

  atomPackageHookCloseTabView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomPackageHookCloseTabView = new AtomPackageHookCloseTabView(state.atomPackageHookCloseTabViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomPackageHookCloseTabView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-package-hook-close-tab:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomPackageHookCloseTabView.destroy();
  },

  serialize() {
    return {
      atomPackageHookCloseTabViewState: this.atomPackageHookCloseTabView.serialize()
    };
  },

  toggle() {
    console.log('AtomPackageHookCloseTab was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
