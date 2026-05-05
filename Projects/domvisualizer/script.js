
'use strict';

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'META', 'LINK', 'TITLE']);

const elementToRow   = new WeakMap(); 
const rowToElement   = new WeakMap(); 

let selectedEl  = null; 
let selectedRow = null;  

document.addEventListener('DOMContentLoaded', () => {
  const root     = document.getElementById('sampleRoot');
  const treeBody = document.getElementById('treeBody');

  treeBody.appendChild(buildTree(root, 0));

  attachPreviewListeners(root);

  document.getElementById('expandAll').addEventListener('click', () => {
    setAllNodes(true);
  });
  document.getElementById('collapseAll').addEventListener('click', () => {
    setAllNodes(false);
  });

  const searchInput = document.getElementById('searchInput');
  const clearBtn    = document.getElementById('clearSearch');
  const matchCount  = document.getElementById('matchCount');

  searchInput.addEventListener('input', () => {
    handleSearch(searchInput.value.trim(), matchCount);
  });
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    handleSearch('', matchCount);
    searchInput.focus();
  });
});

function buildTree(el, depth) {
  if (SKIP_TAGS.has(el.tagName)) return null;

  const childEls = Array.from(el.childNodes).filter(node => {
    if (node.nodeType === Node.ELEMENT_NODE) return !SKIP_TAGS.has(node.tagName);
    if (node.nodeType === Node.TEXT_NODE)    return node.textContent.trim() !== '';
    return false;
  });

  const hasChildren = childEls.some(n => n.nodeType === Node.ELEMENT_NODE);

  const nodeWrap = document.createElement('div');
  nodeWrap.className = 'tree-node';

  const row = buildRow(el, hasChildren, childEls);
  nodeWrap.appendChild(row);

  elementToRow.set(el, row);
  rowToElement.set(row, el);

  if (childEls.length > 0) {
    const childWrap = document.createElement('div');
    childWrap.className = 'tree-children';

    childEls.forEach(child => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const subtree = buildTree(child, depth + 1);
        if (subtree) childWrap.appendChild(subtree);
      }
    });

    nodeWrap.appendChild(childWrap);
  }

  return nodeWrap;
}


function buildRow(el, hasChildren, childEls) {
  const row = document.createElement('div');
  row.className = 'tree-row';

  const toggle = document.createElement('span');
  toggle.className = hasChildren ? 'tree-toggle open' : 'tree-toggle leaf';
  toggle.textContent = hasChildren ? '▶' : '·';
  row.appendChild(toggle);

  const tag = document.createElement('span');
  tag.className = 'tree-tag';
  tag.textContent = `<${el.tagName.toLowerCase()}>`;
  row.appendChild(tag);

  if (el.id) {
    const idSpan = document.createElement('span');
    idSpan.className = 'tree-tag-id';
    idSpan.textContent = `#${el.id}`;
    row.appendChild(idSpan);
  }

  if (el.classList.length) {
    const classSpan = document.createElement('span');
    classSpan.className = 'tree-tag-class';
    classSpan.textContent = '.' + Array.from(el.classList).join('.');
    row.appendChild(classSpan);
  }

  const textNodes = Array.from(el.childNodes).filter(
    n => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
  );
  const hasOnlyText = textNodes.length > 0 && !Array.from(el.children).length;
  if (hasOnlyText) {
    const txt = document.createElement('span');
    txt.className = 'tree-tag-text';
    txt.textContent = `"${textNodes.map(n => n.textContent.trim()).join(' ')}"`;
    row.appendChild(txt);
  }

  const attrCount = el.attributes.length;
  if (attrCount > 0 && (el.id || el.classList.length)) {
    const others = Array.from(el.attributes).filter(
      a => a.name !== 'id' && a.name !== 'class'
    );
    if (others.length) {
      const attrSpan = document.createElement('span');
      attrSpan.className = 'tree-attr';
      attrSpan.textContent = `[+${others.length} attr]`;
      row.appendChild(attrSpan);
    }
  } else if (attrCount > 0 && !el.id && !el.classList.length) {
    const attrSpan = document.createElement('span');
    attrSpan.className = 'tree-attr';
    attrSpan.textContent = `[${attrCount} attr]`;
    row.appendChild(attrSpan);
  }

  if (hasChildren) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNode(row.parentElement);
    });
  }

  row.addEventListener('mouseenter', () => {
    clearHover();
    el.classList.add('dom-hovered');
    el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
  row.addEventListener('mouseleave', () => {
    el.classList.remove('dom-hovered');
  });

  row.addEventListener('click', (e) => {
    e.stopPropagation();
    selectElement(el, row);
  });

  return row;
}

function selectElement(el, row) {
  if (selectedEl)  selectedEl.classList.remove('dom-selected');
  if (selectedRow) selectedRow.classList.remove('tree-selected');

  selectedEl  = el;
  selectedRow = row;

  el.classList.add('dom-selected');
  row.classList.add('tree-selected');

  row.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

  renderInspector(el);
}

function renderInspector(el) {
  const infoBody = document.getElementById('infoBody');
  infoBody.innerHTML = '';

  appendSection(infoBody, 'Element', () => {
    const pill = document.createElement('span');
    pill.className = 'info-tag-pill';
    pill.textContent = `<${el.tagName.toLowerCase()}>`;
    return [pill];
  });

  appendSection(infoBody, 'Attributes', () => {
    const attrs = Array.from(el.attributes);
    if (!attrs.length) return [emptyNote('none')];
    return attrs.map(a => kv(a.name, a.value || '""'));
  });

  appendSection(infoBody, 'Classes', () => {
    const classes = Array.from(el.classList);
    if (!classes.length) return [emptyNote('none')];
    return classes.map(c => kv('.class', c));
  });

  appendSection(infoBody, 'Inner Text', () => {
    const text = el.innerText?.trim().replace(/\s+/g, ' ').slice(0, 120) || '';
    return [kv('text', text || '(empty)')];
  });

  appendSection(infoBody, 'Computed Styles', () => {
    const cs = window.getComputedStyle(el);
    const props = [
      'color', 'background-color', 'font-size', 'font-weight',
      'font-family', 'display', 'position', 'width', 'height',
      'padding', 'margin', 'border', 'border-radius', 'opacity',
    ];
    return props.map(p => kv(p, cs.getPropertyValue(p) || '–'));
  });
}

function appendSection(container, title, contentFn) {
  const section = document.createElement('div');
  section.className = 'info-section';

  const h = document.createElement('div');
  h.className = 'info-section-title';
  h.textContent = title;
  section.appendChild(h);

  contentFn().forEach(node => section.appendChild(node));
  container.appendChild(section);
}

function kv(key, value) {
  const wrap = document.createElement('div');
  wrap.className = 'info-kv';
  const k = document.createElement('span');
  k.className = 'info-kv-key';
  k.textContent = key;
  const v = document.createElement('span');
  v.className = 'info-kv-value';
  v.textContent = value;
  wrap.append(k, v);
  return wrap;
}

function emptyNote(msg) {
  const s = document.createElement('span');
  s.className = 'info-empty';
  s.textContent = msg;
  return s;
}

function attachPreviewListeners(root) {
  root.addEventListener('click', (e) => {
    e.preventDefault();
    let target = e.target;
    while (target && target !== root.parentElement) {
      const row = elementToRow.get(target);
      if (row) {
        selectElement(target, row);
        expandAncestors(row);
        return;
      }
      target = target.parentElement;
    }
  });
}

function expandAncestors(row) {
  let node = row.parentElement; 
  while (node && node.id !== 'treeBody') {
    if (node.classList.contains('tree-children') && node.classList.contains('hidden')) {
      node.classList.remove('hidden')
      const parentNode = node.parentElement;
      if (parentNode) {
        const toggle = parentNode.querySelector(':scope > .tree-row > .tree-toggle');
        if (toggle) toggle.classList.add('open');
      }
    }
    node = node.parentElement;
  }
}

function toggleNode(treeNode) {
  const children = treeNode.querySelector(':scope > .tree-children');
  if (!children) return;
  const toggle   = treeNode.querySelector(':scope > .tree-row > .tree-toggle');
  const isHidden = children.classList.toggle('hidden');
  if (toggle) {
    toggle.classList.toggle('open', !isHidden);
  }
}

function setAllNodes(expand) {
  document.querySelectorAll('.tree-children').forEach(c => {
    c.classList.toggle('hidden', !expand);
  });
  document.querySelectorAll('.tree-toggle:not(.leaf)').forEach(t => {
    t.classList.toggle('open', expand);
  });
}

function clearHover() {
  document.querySelectorAll('.dom-hovered').forEach(el => {
    el.classList.remove('dom-hovered');
  });
}


function handleSearch(query, matchCountEl) {
  const allRows = document.querySelectorAll('.tree-row');

  if (!query) {
    allRows.forEach(r => r.classList.remove('tree-search-match'));
    matchCountEl.textContent = '';
    return;
  }

  const isClass   = query.startsWith('.');
  const needle    = isClass ? query.slice(1).toLowerCase() : query.toLowerCase();
  let   matches   = 0;

  allRows.forEach(row => {
    const el = rowToElement.get(row);
    if (!el) return;

    let hit = false;
    if (isClass) {
      hit = Array.from(el.classList).some(c => c.toLowerCase().includes(needle));
    } else {
      hit = el.tagName.toLowerCase().includes(needle);
    }

    row.classList.toggle('tree-search-match', hit);

    if (hit) {
      matches++;
      expandAncestors(row);
      row.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  });

  matchCountEl.textContent = matches ? `${matches} match${matches !== 1 ? 'es' : ''}` : 'No matches';
}