function renderRoom(roomId, containerId) {
  var nav = document.querySelector('.nav');
  var wrap = document.createElement('div');
  wrap.className = 'dw-wrap';
  wrap.innerHTML =
    '<label>Dwellers:</label>' +
    '<input type="number" class="dw-input" id="dwInput" value="0" min="0" max="200">' +
    '<span class="dw-label" id="dwLabel">NOVO VAULT</span>';
  nav.appendChild(wrap);

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
  if (DWELLERS === 0) label.textContent = 'NOVO VAULT';
  else if (DWELLERS < 12) label.textContent = 'EARLY GAME';
  else if (DWELLERS < 35) label.textContent = 'MID GAME';
  else if (DWELLERS < 60) label.textContent = 'LATE GAME';
  else label.textContent = 'ENDGAME';
}

function renderRoomContent(roomId, containerId) {
  var r = ROOMS.find(function(x) { return x.id === roomId; });
  if (!r) return;

  var c = document.getElementById(containerId);
  var status = getStatus(r);

  var badgeClass = status === 'available' ? 'available' : 'locked';
  var badgeText = r.unlock === 0 ? 'Disponivel desde o inicio' :
                  status === 'available' ? 'DESBLOQUEADO (' + r.unlock + ' dwellers)' :
                  'Desbloqueia com ' + r.unlock + ' dwellers';

  var floorText = r.floor ? 'Andar ' + r.floor : (r.id === 'radio_studio' ? 'NAO CONSTRUIR' : 'Opcional / Andares de baixo');
  var statText = r.stat ? 'SPECIAL: ' + r.stat : 'Sem stat associado';
  var sizeText = '';
  if (r.size) {
    var sq = r.size === '3' ? ' (3-wide = 9 squares)' : r.size === '2' ? ' (2-wide = 6 squares)' : r.size === '1' ? ' (single = 3 squares)' : '';
    sizeText = '<br>Tamanho: <strong>' + r.size + (r.size === '1' ? ' bloco' : ' blocos') + '</strong>' + sq;
  }

  var unlockDetail = status === 'available' ? 'Voce ja tem acesso!' : 'Faltam ' + (r.unlock - DWELLERS) + ' dwellers';

  c.innerHTML =
    '<div class="room-detail">' +
      '<div class="detail-header ' + r.css + (status === 'available' ? ' unlocked' : '') + '">' +
        '<h2>' + r.name + '</h2>' +
        '<div style="font-size:13px;color:#9ca3af;margin-top:4px">' + r.desc + '</div>' +
        '<div class="unlock-badge ' + badgeClass + '">' + badgeText + '</div>' +
      '</div>' +
      '<div class="detail-grid">' +
        '<div class="detail-card">' +
          '<h3>Desbloqueio</h3>' +
          '<p><strong>' + (r.unlock === 0 ? 'Inicio do jogo' : r.unlock + ' Dwellers') + '</strong><br>' + unlockDetail + '</p>' +
        '</div>' +
        '<div class="detail-card">' +
          '<h3>Posicao no Layout</h3>' +
          '<p><strong>' + floorText + '</strong><br>' + statText + sizeText + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="section-title">POSICAO NO LAYOUT</div>' +
      '<div class="vault" id="detailVault" style="margin-bottom:20px"></div>' +
      '<div class="section-title">INSTRUCOES</div>' +
      '<ul class="instruction-list" id="detailInstructions"></ul>' +
    '</div>';

  r.instructions.forEach(function(i) {
    var li = document.createElement('li');
    if (i.indexOf('NAO') !== -1 || i.indexOf('DESTRUIR') !== -1 || i.indexOf('NUNCA') !== -1 || i.indexOf('TEMPORARIO') !== -1) li.className = 'warn';
    else if (i.indexOf('CRITICO') !== -1 || i.indexOf('ISOLADO') !== -1) li.className = 'note';
    li.innerHTML = i;
    document.getElementById('detailInstructions').appendChild(li);
  });

  buildVault('detailVault', roomId, function(id) {
    window.location.href = '/rooms/' + roomSlug(id);
  });
}
