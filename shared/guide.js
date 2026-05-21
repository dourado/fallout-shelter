function buildRoomList() {
  var T = I18N[getLang()];
  var prefix = getLang() === 'pt' ? '/pt-br' : '';
  var list = document.getElementById('roomList');
  list.innerHTML = '';
  var sorted = ROOMS.filter(function(r) { return r.id !== 'elevator'; });
  sorted.sort(function(a,b) { return a.unlock - b.unlock; });

  sorted.forEach(function(r) {
    var status = getStatus(r);
    var card = document.createElement('a');
    card.className = 'room-card ' + (status === 'skip' ? 'locked' : status);
    card.href = prefix + '/rooms/' + roomSlug(r.id);

    var num = r.unlock === 0 ? '0' : r.unlock.toString();
    var statusText = status === 'available' ? T.status_unlocked :
                     status === 'next' ? T.status_next :
                     status === 'skip' ? T.status_do_not_build :
                     r.unlock + ' dwellers';
    var floorText = r.floor ? T.floor + ' ' + r.floor : (r.id === 'radio_studio' ? T.status_do_not_build : T.optional);

    card.innerHTML =
      '<div class="rc-num">' + num + '</div>' +
      '<div class="rc-info">' +
        '<div class="rc-name">' + r.name + '</div>' +
        '<div class="rc-sub">' + floorText + (r.size ? ' | ' + r.size + (r.size==='1'?' ' + T.block:' ' + T.blocks) : '') + (r.stat ? ' | ' + r.stat : '') + '</div>' +
      '</div>' +
      '<div class="rc-unlock">' + statusText + '</div>' +
      '<div class="rc-arrow">&rarr;</div>';
    list.appendChild(card);
  });
}

function toggleMs(el) {
  el.classList.toggle('expanded');
}

function updateDwellers(n) {
  var T = I18N[getLang()];
  var prefix = getLang() === 'pt' ? '/pt-br' : '';
  DWELLERS = Math.max(0, Math.min(200, parseInt(n) || 0));
  localStorage.setItem('dwellers', DWELLERS);
  document.getElementById('dwInput').value = DWELLERS;
  var label = document.getElementById('dwLabel');
  if (DWELLERS === 0) label.textContent = T.dw_label_0;
  else if (DWELLERS < 12) label.textContent = T.dw_label_early;
  else if (DWELLERS < 35) label.textContent = T.dw_label_mid;
  else if (DWELLERS < 60) label.textContent = T.dw_label_late;
  else label.textContent = T.dw_label_end;
  buildVault('mainVault', null, null, {linkBase: '/rooms/'});
  buildRoomList();
  updateMilestones();
}

function updateMilestones() {
  var T = I18N[getLang()];
  var milestones = document.querySelectorAll('.milestone');
  var thresholds = [];
  milestones.forEach(function(m) { thresholds.push(parseInt(m.dataset.dw)); });

  milestones.forEach(function(m, i) {
    var myDw = thresholds[i];
    var nextDw = thresholds[i + 1] !== undefined ? thresholds[i + 1] : Infinity;

    m.classList.remove('done', 'current', 'locked', 'expanded');

    if (DWELLERS >= nextDw) {
      m.classList.add('done');
      m.querySelector('.ms-badge').textContent = T.badge_complete;
    } else if (DWELLERS >= myDw) {
      m.classList.add('current', 'expanded');
      m.querySelector('.ms-badge').textContent = T.badge_now;
    } else {
      m.classList.add('locked');
      m.querySelector('.ms-badge').textContent = myDw + ' DW';
    }
  });
}

function initGuide() {
  var T = I18N[getLang()];
  document.getElementById('dwInput').value = DWELLERS;
  var label = document.getElementById('dwLabel');
  if (DWELLERS === 0) label.textContent = T.dw_label_0;
  else if (DWELLERS < 12) label.textContent = T.dw_label_early;
  else if (DWELLERS < 35) label.textContent = T.dw_label_mid;
  else if (DWELLERS < 60) label.textContent = T.dw_label_late;
  else label.textContent = T.dw_label_end;
  buildVault('mainVault', null, null, {linkBase: '/rooms/'});
  buildRoomList();
  updateMilestones();
}
