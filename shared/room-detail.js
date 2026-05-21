function renderRoom(roomId, containerId) {
  var T = I18N[getLang()];
  var nav = document.querySelector('.nav');
  var wrap = document.createElement('div');
  wrap.className = 'dw-wrap';
  wrap.innerHTML =
    '<label for="dwInput">' + T.nav_dwellers + '</label>' +
    '<input type="number" class="dw-input" id="dwInput" value="0" min="0" max="200">' +
    '<span class="dw-label" id="dwLabel"></span>';
  nav.appendChild(wrap);

  var slug = window.location.pathname.split('/').filter(Boolean).pop() || '';
  var toggleHref = getLang() === 'en' ? '/pt-br/rooms/' + slug : '/rooms/' + slug;
  var footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = '<span>Fallout Shelter Guide</span><a href="https://github.com/dourado/fallout-shelter" target="_blank" rel="noopener">GitHub</a><a href="' + toggleHref + '" class="lang-toggle">' + T.lang_switch_label + '</a>';
  document.body.appendChild(footer);

  var input = document.getElementById('dwInput');
  var label = document.getElementById('dwLabel');
  input.value = DWELLERS;
  updateDwLabel(label);

  input.addEventListener('input', function() {
    DWELLERS = Math.max(0, Math.min(200, parseInt(this.value) || 0));
    this.value = DWELLERS;
    localStorage.setItem('dwellers', DWELLERS);
    updateDwLabel(label);
    renderRoomContent(roomId, containerId);
  });

  renderRoomContent(roomId, containerId);
}

function updateDwLabel(label) {
  var T = I18N[getLang()];
  if (DWELLERS === 0) label.textContent = T.dw_label_0;
  else if (DWELLERS < 12) label.textContent = T.dw_label_early;
  else if (DWELLERS < 35) label.textContent = T.dw_label_mid;
  else if (DWELLERS < 60) label.textContent = T.dw_label_late;
  else label.textContent = T.dw_label_end;
}

function renderRoomContent(roomId, containerId) {
  var r = ROOMS.find(function(x) { return x.id === roomId; });
  if (!r) return;

  var T = I18N[getLang()];
  var s = getRoomStrings(r);
  var c = document.getElementById(containerId);
  var status = getStatus(r);

  var badgeClass = status === 'available' ? 'available' : 'locked';
  var badgeText = r.unlock === 0 ? T.available_from_start :
                  status === 'available' ? T.unlocked_at.replace('%d', r.unlock) :
                  T.unlocks_at.replace('%d', r.unlock);

  var floorText = r.floor ? T.floor + ' ' + r.floor : (r.id === 'radio_studio' ? T.do_not_build : T.optional_lower);
  var statText = r.stat ? T.special_stat + ' ' + r.stat : T.no_stat;
  var sizeText = '';
  if (r.size) {
    var sq = r.size === '3' ? ' (3-wide = 9 squares)' : r.size === '2' ? ' (2-wide = 6 squares)' : r.size === '1' ? ' (single = 3 squares)' : '';
    sizeText = '<br>' + T.size_label + ' <strong>' + r.size + (r.size === '1' ? ' ' + T.block : ' ' + T.blocks) + '</strong>' + sq;
  }

  var unlockDetail = status === 'available' ? T.already_have_access : T.remaining.replace('%d', r.unlock - DWELLERS);

  c.innerHTML =
    '<div class="room-detail">' +
      '<div class="detail-header ' + r.css + '">' +
        '<h2>' + r.name + '</h2>' +
        '<div style="font-size:13px;color:rgba(255,255,255,0.85);margin-top:4px">' + s.desc + '</div>' +
        '<div class="unlock-badge ' + badgeClass + '">' + badgeText + '</div>' +
      '</div>' +
      '<div class="detail-grid">' +
        '<div class="detail-card">' +
          '<h3>' + T.card_unlock + '</h3>' +
          '<p><strong>' + (r.unlock === 0 ? T.start_of_game : r.unlock + ' Dwellers') + '</strong><br>' + unlockDetail + '</p>' +
        '</div>' +
        '<div class="detail-card">' +
          '<h3>' + T.card_layout + '</h3>' +
          '<p><strong>' + floorText + '</strong><br>' + statText + sizeText + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="section-title">' + T.section_layout + '</div>' +
      '<div class="vault" id="detailVault" style="margin-bottom:20px"></div>' +
      '<div class="section-title">' + T.section_instructions + '</div>' +
      '<ul class="instruction-list" id="detailInstructions"></ul>' +
    '</div>';

  s.instructions.forEach(function(i) {
    var li = document.createElement('li');
    var text = i.replace(/<[^>]+>/g, '').toUpperCase();
    if (T.warnKeywords.some(function(k) { return text.indexOf(k) !== -1; })) li.className = 'warn';
    else if (T.noteKeywords.some(function(k) { return text.indexOf(k) !== -1; })) li.className = 'note';
    li.innerHTML = i;
    document.getElementById('detailInstructions').appendChild(li);
  });

  buildVault('detailVault', roomId, function(id) {
    var prefix = getLang() === 'pt' ? '/pt-br' : '';
    window.location.href = prefix + '/rooms/' + roomSlug(id);
  });
}
