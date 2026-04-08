// tabs.js — tab switching

const TABS = ['agent', 'snippets', 'settings'];

export function initTabs() {
  const panel = document.getElementById('__venom_panel__');
  if (!panel) return;
  
  const tabBtns = panel.querySelectorAll('.vn-tab');
  
  tabBtns.forEach((btn) => {
    btn.onclick = () => {
      const tab = btn.dataset.tab;
      switchTab(tab);
    };
  });
}

export function switchTab(name) {
  if (!TABS.includes(name)) return;
  
  const panel = document.getElementById('__venom_panel__');
  if (!panel) return;
  
  // Update tab buttons
  panel.querySelectorAll('.vn-tab').forEach((btn) => {
    btn.classList.toggle('vn-active', btn.dataset.tab === name);
  });
  
  // Update tab content
  panel.querySelectorAll('.vn-tab-content').forEach((content) => {
    content.classList.remove('vn-active');
  });
  
  const activeContent = document.getElementById(`vn-tab-${name}`);
  if (activeContent) {
    activeContent.classList.add('vn-active');
  }
  
  // Persist last tab
  localStorage.setItem('vn_last_tab', name);
}

export function restoreLastTab() {
  const last = localStorage.getItem('vn_last_tab');
  if (last && TABS.includes(last)) {
    switchTab(last);
  }
}
