var DWELLERS = 0;

var ROOMS = [
  {id:'elevator',name:'Elevator',unlock:0,size:'1',stat:null,floor:null,css:'elevator',
   desc:'Conecta andares verticalmente.',
   instructions:['Colocar nas DUAS bordas (esquerda e direita) de TODOS os andares subterraneos','Isso bloqueia spawn de Molerats em todas as salas de producao','O andar 1 (superficie) so tem elevador na borda DIREITA']},

  {id:'living_quarters',name:'Living Quarters',unlock:0,size:'2',stat:'C',floor:'12+',css:'living',
   desc:'Aumenta capacidade de Dwellers e permite breeding.',
   instructions:['No endgame, ficam nos andares de baixo (12+) com gaps entre elas','Sem staff necessario — incidentes morrem sozinhos nos gaps','Usar para breeding: pet de gemeos ANTES da gravidez, trocar para Child-SPECIAL antes do nascimento','SPECIAL combinado dos pais 134+ = bebe Legendary']},

  {id:'power_generator',name:'Power Generator',unlock:0,size:'3',stat:'S',floor:'02',css:'power',
   desc:'Produz energia. TEMPORARIO — sera substituido por Nuclear Reactor aos 60 dwellers.',
   instructions:['Colocar no andar 2 (posicao final dos Nuclear Reactors)','Merge em 3 blocos para maxima eficiencia','Staffar com Dwellers de alto Strength','<strong>TEMPORARIO</strong>: destruir e substituir por Nuclear Reactor quando desbloquear (60 dwellers)','Dwellers deste andar tambem servem como kill zone — arma-los bem']},

  {id:'diner',name:'Diner',unlock:0,size:'3',stat:'A',floor:'03',css:'food-water',
   desc:'Produz comida. TEMPORARIO — sera substituido por Nuka-Cola Bottler aos 100 dwellers.',
   instructions:['Colocar no andar 3 (posicao final dos Nuka-Cola Bottlers)','Merge em 3 blocos','Staffar com Dwellers de alto Agility','<strong>TEMPORARIO</strong>: sera substituido por Garden (70), depois Nuka-Cola Bottler (100)']},

  {id:'water_treatment',name:'Water Treatment',unlock:0,size:'3',stat:'P',floor:'03',css:'food-water',
   desc:'Produz agua. TEMPORARIO — sera substituido por Nuka-Cola Bottler aos 100 dwellers.',
   instructions:['Colocar no andar 3 ao lado do Diner','Merge em 3 blocos','Staffar com Dwellers de alto Perception','<strong>TEMPORARIO</strong>: sera substituido por Water Purification (80), depois Nuka-Cola Bottler (100)']},

  {id:'storage_room',name:'Storage Room',unlock:12,size:'3',stat:null,floor:'01',css:'guard-room',
   desc:'A sala mais importante da defesa! Fica logo apos a Vault Door como "Sala de Guarda".',
   instructions:['Construir 3 blocos <strong>imediatamente apos a Vault Door</strong> no andar 1','<strong>MANTER NO LEVEL 1</strong> — sala rasa = Dwellers entram em posicao de combate mais rapido','Colocar 6 Dwellers com as MELHORES armas do vault','Dwellers devem ter HP maximo (levelados Lv1→50 com E10 + outfit E7)','SPECIAL nao afeta combate no vault — so dano da arma e HP importam','Storages extras ficam nos andares 12+ (fundo) sem staff, com gaps entre elas']},

  {id:'medbay',name:'Medbay',unlock:14,size:'1-3',stat:'I',floor:'09+10-11',css:'medbay-prod',
   desc:'Produz Stimpaks. Duas funcoes: producao (3 blocos no andar 9) e cap farming (1 bloco nos andares 10-11).',
   instructions:['<strong>Producao</strong>: 1x Medbay 3 blocos maxed no andar 9 — produz Stimpaks para Quests','<strong>Cap farming</strong>: Medbays 1 bloco Level 1 alternadas com Science Labs nos andares 10-11','Cap farm: 2 Dwellers high-Luck por sala, rush infinito para caps','<strong>NAO merge</strong> as Medbays de cap farm — devem ser singles (1 bloco cada)','Alternancia Med-Sci-Med-Sci previne auto-merge de salas adjacentes do mesmo tipo']},

  {id:'science_lab',name:'Science Lab',unlock:16,size:'1',stat:'I',floor:'10-11',css:'cap-farm',
   desc:'Produz RadAway. Principal uso no endgame: cap farming com rush spam.',
   instructions:['Colocar 1 bloco Level 1 alternadas com Medbays nos andares 10-11','2 Dwellers high-Luck + high-Level por sala','Rush infinito — taxa de sucesso alta com Luck alto','<strong>NAO fazer upgrade</strong> — Level 1 para ciclo rapido de rush','<strong>NAO merge</strong> — manter como salas individuais (1 bloco)','Padrao por andar: Med-Sci-Med-Sci-Med-Sci (6 salas, 6 slots)']},

  {id:'overseer_office',name:"Overseer's Office",unlock:18,size:'2',stat:null,floor:'05',css:'overseer',
   desc:'Desbloqueia Quests — principal fonte de armas e roupas Legendary no endgame.',
   instructions:['Colocar no andar 5 ao lado do Weight Room','Tamanho fixo: 2 blocos (6 squares) — nao pode ser expandido','Unico por vault — so pode ter UM','Fazer upgrade ate Lv3 para enviar 3 quests simultaneas','Nao precisa de staff para funcionar']},

  {id:'radio_studio',name:'Radio Studio',unlock:20,size:null,stat:'C',floor:null,css:'locked',
   desc:'NAO CONSTRUIR! Atrai Raiders e Deathclaws desnecessariamente.',
   instructions:['<strong class="warn">NAO CONSTRUIR</strong> — atrai ataques de Raiders e Deathclaws','Bebes gerados por breeding sao melhores que recrutas do wasteland','A unica vantagem (happiness boost) nao vale o risco','Se ja construiu, destrua imediatamente']},

  {id:'weapon_workshop',name:'Weapon Workshop',unlock:22,size:'3',stat:null,floor:'04',css:'craft',
   desc:'Craft de armas. Tamanho fixo 3 blocos (9 squares). Essencial para armas Legendary.',
   instructions:['Colocar no andar 4 (lado esquerdo)','Tamanho fixo: 3 blocos — nao pode ser menor','Staffar com 6 Dwellers para crafting mais rapido','Priorizar craft de armas S-tier: Dragon\'s Maw, MIRV, Vengeance','Armas craftadas aqui vao para os 6 guardas do andar 1']},

  {id:'weight_room',name:'Weight Room',unlock:24,size:'3',stat:'S',floor:'05',css:'training',
   desc:'Treina Strength. Fica no andar 5 ao lado do Overseer\'s Office.',
   instructions:['Colocar no andar 5 (ao lado do Overseer\'s Office)','Merge em 3 blocos para 6 trainees simultaneos','Strength e essencial para producao de energia (Power Generator / Nuclear Reactor)','Treinar S e prioridade para workers de energia']},

  {id:'athletics_room',name:'Athletics Room',unlock:26,size:'3',stat:'A',floor:'08',css:'training',
   desc:'Treina Agility. Fica no andar 8.',
   instructions:['Colocar no andar 8 (ao lado do Classroom)','Merge em 3 blocos','Agility afeta producao de comida (Diner/Garden)','Menos prioritario que Endurance e Strength no inicio']},

  {id:'armory',name:'Armory',unlock:28,size:'3',stat:'P',floor:'06',css:'training',
   desc:'Treina Perception. Fica no andar 6.',
   instructions:['Colocar no andar 6 (ao lado do Lounge que desbloqueia aos 40)','Merge em 3 blocos','Perception afeta producao de agua (Water Treatment/Purification)','Ate o Lounge desbloquear (40), o outro lado do andar 6 fica vazio']},

  {id:'classroom',name:'Classroom',unlock:30,size:'3',stat:'I',floor:'08',css:'training',
   desc:'Treina Intelligence. Fica no andar 8.',
   instructions:['Colocar no andar 8 (ao lado do Athletics Room)','Merge em 3 blocos','Intelligence e ESSENCIAL: afeta producao de Stimpaks, RadAway e Nuka-Cola Bottler','Prioridade alta de treino para workers de Medbay, Science Lab e Bottler']},

  {id:'outfit_workshop',name:'Outfit Workshop',unlock:32,size:'3',stat:null,floor:'04',css:'craft',
   desc:'Craft de roupas. Tamanho fixo 3 blocos (9 squares).',
   instructions:['Colocar no andar 4 (lado direito, ao lado do Weapon Workshop)','Tamanho fixo: 3 blocos — nao pode ser menor','Staffar com 6 Dwellers','Priorizar craft de roupas com +7 Endurance (essenciais para HP max durante leveling)','Craft Sturdy Wasteland Gear (+5E) ou Expert Lab Coat (+7I) conforme necessidade']},

  {id:'fitness_room',name:'Fitness Room',unlock:35,size:'3',stat:'E',floor:'07',css:'training-e',
   desc:'Treina Endurance. DEVE SER ISOLADO — gaps nos dois lados. Dwellers Lv1 sao frageis!',
   instructions:['Colocar no andar 7 com <strong>gaps nos dois lados</strong> (ISOLADO)','Layout do andar: Elev | gap | Fitness Room 3 blocos | gap | Elev','<strong>CRITICO</strong>: Dwellers treinando Endurance sao Level 1 (frageis!)','Isolamento impede propagacao de incidentes para eles','Endurance e o stat MAIS IMPORTANTE do jogo','Todo Dweller deve ter E10 + outfit E7 ANTES de ganhar qualquer XP','HP e calculado no level-up: E17 (10 base + 7 outfit) de Lv1→50 = 595 HP (maximo)']},

  {id:'lounge',name:'Lounge',unlock:40,size:'3',stat:'C',floor:'06',css:'training',
   desc:'Treina Charisma. Fica no andar 6 ao lado do Armory.',
   instructions:['Colocar no andar 6 (ao lado do Armory)','Merge em 3 blocos','Charisma afeta velocidade de breeding e producao do Radio Studio','Menor prioridade de treino — foque em E, S, I primeiro']},

  {id:'theme_workshop',name:'Theme Workshop',unlock:42,size:'3',stat:null,floor:null,css:'craft',
   desc:'Craft de temas cosmeticos. Opcional — nao essencial para otimizacao.',
   instructions:['<strong>Opcional</strong> — so se quiser personalizar a aparencia do vault','Tamanho fixo: 3 blocos','Se construir, colocar nos andares de baixo (nao desperdicar espaco dos andares superiores)','Temas funcionam em salas Level 1 (incluindo Vault Door)']},

  {id:'game_room',name:'Game Room',unlock:45,size:'3',stat:'L',floor:'09',css:'training',
   desc:'Treina Luck. Fica no andar 9 ao lado da Medbay de producao.',
   instructions:['Colocar no andar 9 (ao lado da Medbay 3 blocos de producao)','Merge em 3 blocos','Luck afeta chance de rush bem-sucedido e caps encontrados','<strong>Prioridade alta</strong>: Luck alto e essencial para cap farming eficiente','Treinar Luck nos Dwellers que vao fazer rush spam nos andares 10-11']},

  {id:'barbershop',name:'Barbershop',unlock:50,size:'2',stat:null,floor:null,css:'craft',
   desc:'Muda aparencia dos Dwellers. Puramente cosmetico.',
   instructions:['<strong>Opcional</strong> — puramente cosmetico','Tamanho fixo: 2 blocos','Se construir, colocar nos andares de baixo','Nao afeta gameplay']},

  {id:'nuclear_reactor',name:'Nuclear Reactor',unlock:60,size:'3',stat:'S',floor:'02',css:'power',
   desc:'Substitui Power Generator. 2 salas 3 blocos maxed = energia para o vault inteiro.',
   instructions:['<strong>SUBSTITUIR</strong> os Power Generators do andar 2','Destruir Power Generators e construir 2x Nuclear Reactor 3 blocos','Staffar com Dwellers de Strength maxado (10)','2 salas maxed com workers S10 = energia para 200 Dwellers','Dwellers deste andar tambem sao kill zone — arma-los com armas top','Este andar e o 2o ponto de combate apos o andar 1']},

  {id:'garden',name:'Garden',unlock:70,size:'3',stat:'A',floor:'03',css:'food-water',
   desc:'Substitui Diner. TEMPORARIO — sera substituido por Nuka-Cola Bottler aos 100.',
   instructions:['<strong>SUBSTITUIR</strong> o Diner no andar 3','Produz mais comida que o Diner','Staffar com Dwellers de Agility maxado','<strong>TEMPORARIO</strong>: sera substituido por Nuka-Cola Bottler aos 100 dwellers']},

  {id:'water_purification',name:'Water Purification',unlock:80,size:'3',stat:'P',floor:'03',css:'food-water',
   desc:'Substitui Water Treatment. TEMPORARIO — sera substituido por Nuka-Cola Bottler aos 100.',
   instructions:['<strong>SUBSTITUIR</strong> o Water Treatment no andar 3','Produz mais agua que o Water Treatment','Staffar com Dwellers de Perception maxado','<strong>TEMPORARIO</strong>: sera substituido por Nuka-Cola Bottler aos 100 dwellers']},

  {id:'nuka_cola_bottler',name:'Nuka-Cola Bottler',unlock:100,size:'3',stat:'E',floor:'03',css:'food-water',
   desc:'Produz comida E agua simultaneamente. 2 salas 3 blocos = sustenta 200 Dwellers.',
   instructions:['<strong>SUBSTITUIR TUDO</strong> no andar 3 (Garden + Water Purification)','Construir 2x Nuka-Cola Bottler 3 blocos no andar 3','Staffar com Dwellers de Endurance + Intelligence maxados','2 salas maxed = comida E agua para 200 Dwellers','Este e o upgrade FINAL de producao de comida/agua','Dwellers deste andar tambem sao kill zone — arma-los bem']}
];

var VAULT_FLOORS = [
  {label:'01',surface:true,rooms:[
    {id:'elevator',css:'vault-door',size:'size-2',name:'Vault Door',detail:'Posicao fixa (6 sq) • Nunca upgrade',badge:'LV 1',badgeCss:'background:#22c55e'},
    {id:'storage_room',css:'guard-room',size:'size-3',name:'Sala de Guarda',detail:'6 Dwellers • Armas S-Tier',badge:'LV 1',badgeCss:'background:#ef4444'},
    {id:null,css:'elevator',size:'elevator',name:'ELEV'}
  ]},
  {label:'02',dividerBefore:'Kill Zone — Andares de Abate',rooms:[
    {id:null,css:'elevator',size:'elevator',name:'ELEV'},
    {id:'nuclear_reactor',css:'power',size:'size-3',name:'Nuclear Reactor',detail:'6 Dwellers armados • S maxado',badge:'MAX',badgeCss:'background:#3b82f6'},
    {id:'nuclear_reactor',css:'power',size:'size-3',name:'Nuclear Reactor',detail:'6 Dwellers armados • S maxado',badge:'MAX',badgeCss:'background:#3b82f6'},
    {id:null,css:'elevator',size:'elevator',name:'ELEV'}
  ]},
  {label:'03',rooms:[
    {id:null,css:'elevator',size:'elevator',name:'ELEV'},
    {id:'nuka_cola_bottler',css:'food-water',size:'size-3',name:'Nuka-Cola Bottler',detail:'6 Dwellers armados • E+I max',badge:'MAX',badgeCss:'background:#3b82f6'},
    {id:'nuka_cola_bottler',css:'food-water',size:'size-3',name:'Nuka-Cola Bottler',detail:'6 Dwellers armados • E+I max',badge:'MAX',badgeCss:'background:#3b82f6'},
    {id:null,css:'elevator',size:'elevator',name:'ELEV'}
  ]},
  {label:'04',dividerBefore:'Crafting',rooms:[
    {id:null,css:'elevator',size:'elevator',name:'ELEV'},
    {id:'weapon_workshop',css:'craft',size:'size-3',name:'Weapon Workshop',detail:'6 Dwellers • Craft armas S-tier',badge:'MAX',badgeCss:'background:#3b82f6'},
    {id:'outfit_workshop',css:'craft',size:'size-3',name:'Outfit Workshop',detail:'6 Dwellers • Craft roupas',badge:'MAX',badgeCss:'background:#3b82f6'},
    {id:null,css:'elevator',size:'elevator',name:'ELEV'}
  ]},
  {label:'05',rooms:[
    {id:null,css:'elevator',size:'elevator',name:'ELEV'},
    {id:'overseer_office',css:'overseer',size:'size-2',name:"Overseer's Office",detail:'Quests (6 sq fixo) • Sem staff',badge:'MAX',badgeCss:'background:#3b82f6'},
    {id:'weight_room',css:'training',size:'size-3',name:'Weight Room',detail:'Treino Strength'},
    {id:null,css:'gap',size:'size-1',name:'vazio'},
    {id:null,css:'elevator',size:'elevator',name:'ELEV'}
  ]},
  {label:'06',dividerBefore:'Treinamento SPECIAL',rooms:[
    {id:null,css:'elevator',size:'elevator',name:'ELEV'},
    {id:'armory',css:'training',size:'size-3',name:'Armory',detail:'Treino Perception'},
    {id:'lounge',css:'training',size:'size-3',name:'Lounge',detail:'Treino Charisma'},
    {id:null,css:'elevator',size:'elevator',name:'ELEV'}
  ]},
  {label:'07',rooms:[
    {id:null,css:'elevator',size:'elevator',name:'ELEV'},
    {id:null,css:'gap',size:'size-1',name:'vazio'},
    {id:'fitness_room',css:'training-e',size:'size-3',name:'Fitness Room',detail:'Treino Endurance',badge:'ISOLADO',badgeCss:'background:#eab308;color:#1a1a2e'},
    {id:null,css:'gap',size:'size-2',name:'vazio'},
    {id:null,css:'elevator',size:'elevator',name:'ELEV'}
  ]},
  {label:'08',rooms:[
    {id:null,css:'elevator',size:'elevator',name:'ELEV'},
    {id:'classroom',css:'training',size:'size-3',name:'Classroom',detail:'Treino Intelligence'},
    {id:'athletics_room',css:'training',size:'size-3',name:'Athletics Room',detail:'Treino Agility'},
    {id:null,css:'elevator',size:'elevator',name:'ELEV'}
  ]},
  {label:'09',rooms:[
    {id:null,css:'elevator',size:'elevator',name:'ELEV'},
    {id:'game_room',css:'training',size:'size-3',name:'Game Room',detail:'Treino Luck'},
    {id:'medbay',css:'medbay-prod',size:'size-3',name:'Medbay',detail:'Producao Stimpaks p/ Quests',badge:'MAX',badgeCss:'background:#3b82f6'},
    {id:null,css:'elevator',size:'elevator',name:'ELEV'}
  ]},
  {label:'10',capfarm:true,dividerBefore:'Cap Farming — Rush Spam',rooms:[
    {id:null,css:'elevator',size:'elevator',name:'ELEV'},
    {id:'medbay',css:'cap-farm',size:'size-1',name:'Med',badge:'LV 1'},
    {id:'science_lab',css:'cap-farm',size:'size-1',name:'Sci',badge:'LV 1'},
    {id:'medbay',css:'cap-farm',size:'size-1',name:'Med',badge:'LV 1'},
    {id:'science_lab',css:'cap-farm',size:'size-1',name:'Sci',badge:'LV 1'},
    {id:'medbay',css:'cap-farm',size:'size-1',name:'Med',badge:'LV 1'},
    {id:'science_lab',css:'cap-farm',size:'size-1',name:'Sci',badge:'LV 1'},
    {id:null,css:'elevator',size:'elevator',name:'ELEV'}
  ]},
  {label:'11',capfarm:true,rooms:[
    {id:null,css:'elevator',size:'elevator',name:'ELEV'},
    {id:'medbay',css:'cap-farm',size:'size-1',name:'Med',badge:'LV 1'},
    {id:'science_lab',css:'cap-farm',size:'size-1',name:'Sci',badge:'LV 1'},
    {id:'medbay',css:'cap-farm',size:'size-1',name:'Med',badge:'LV 1'},
    {id:'science_lab',css:'cap-farm',size:'size-1',name:'Sci',badge:'LV 1'},
    {id:'medbay',css:'cap-farm',size:'size-1',name:'Med',badge:'LV 1'},
    {id:'science_lab',css:'cap-farm',size:'size-1',name:'Sci',badge:'LV 1'},
    {id:null,css:'elevator',size:'elevator',name:'ELEV'}
  ]},
  {label:'12',dividerBefore:'Storage — Auto-Extincao de Incidentes',rooms:[
    {id:null,css:'elevator',size:'elevator',name:'ELEV'},
    {id:'storage_room',css:'storage',size:'size-3',name:'Storage',detail:'Sem staff'},
    {id:null,css:'gap',size:'size-1',name:'gap'},
    {id:'living_quarters',css:'living',size:'size-2',name:'Living Quarters',detail:'Sem staff'},
    {id:null,css:'elevator',size:'elevator',name:'ELEV'}
  ]},
  {label:'13',rooms:[
    {id:null,css:'elevator',size:'elevator',name:'ELEV'},
    {id:'living_quarters',css:'living',size:'size-2',name:'Living Quarters',detail:'Sem staff'},
    {id:null,css:'gap',size:'size-1',name:'gap'},
    {id:'storage_room',css:'storage',size:'size-3',name:'Storage',detail:'Sem staff'},
    {id:null,css:'elevator',size:'elevator',name:'ELEV'}
  ]},
  {label:'14',rooms:[
    {id:null,css:'elevator',size:'elevator',name:'ELEV'},
    {id:'storage_room',css:'storage',size:'size-3',name:'Storage',detail:'Sem staff'},
    {id:null,css:'gap',size:'size-1',name:'gap'},
    {id:'living_quarters',css:'living',size:'size-2',name:'Living Quarters',detail:'Sem staff'},
    {id:null,css:'elevator',size:'elevator',name:'ELEV'}
  ]},
  {label:'15+',placeholder:true}
];

function getStatus(r) {
  if (r.id === 'radio_studio') return 'skip';
  if (r.unlock <= DWELLERS) return 'available';
  var nextUnlock = ROOMS.filter(function(x) { return x.unlock > DWELLERS && x.id !== 'radio_studio'; }).sort(function(a,b) { return a.unlock - b.unlock; })[0];
  if (nextUnlock && r.id === nextUnlock.id) return 'next';
  return 'locked';
}

function buildVault(containerId, highlightId, onClick, options) {
  options = options || {};
  var c = document.getElementById(containerId);
  c.innerHTML = '';

  VAULT_FLOORS.forEach(function(f) {
    if (f.dividerBefore) {
      var div = document.createElement('div');
      div.className = 'divider';
      div.innerHTML = '<span>' + f.dividerBefore + '</span>';
      c.appendChild(div);
    }

    if (f.placeholder) {
      var fl = document.createElement('div');
      fl.className = 'floor';
      var lbl = document.createElement('div');
      lbl.className = 'floor-label';
      lbl.style.color = '#4ade80';
      lbl.textContent = f.label;
      fl.appendChild(lbl);
      var ph = document.createElement('div');
      ph.className = 'gap';
      ph.style.cssText = 'flex:1;display:flex;align-items:center;justify-content:flex-end;border:1px dashed #2d2d44;border-radius:4px;padding:4px 8px';
      ph.innerHTML = '<span class="room-name" style="color:#4b5563">Repetir padrao Storage + Gap + Living conforme necessario...</span>';
      fl.appendChild(ph);
      c.appendChild(fl);
      return;
    }

    if (f.surface) {
      var wrap = document.createElement('div');
      wrap.className = 'surface-bg';
      wrap.appendChild(buildFloor(f, highlightId, onClick, options));
      c.appendChild(wrap);
    } else {
      c.appendChild(buildFloor(f, highlightId, onClick, options));
    }
  });
}

function buildFloor(f, highlightId, onClick, options) {
  options = options || {};
  var fl = document.createElement('div');
  fl.className = 'floor';
  var lbl = document.createElement('div');
  lbl.className = 'floor-label';
  lbl.textContent = f.label;
  fl.appendChild(lbl);

  f.rooms.forEach(function(r) {
    var isElev = r.size === 'elevator';
    var isGap = r.css === 'gap';
    var roomData = r.id ? ROOMS.find(function(x) { return x.id === r.id; }) : null;
    var isLocked = roomData && roomData.unlock > DWELLERS;
    var isHighlighted = highlightId && r.id === highlightId;

    var el;
    if (roomData && !isElev && !isGap && options.linkBase) {
      el = document.createElement('a');
      el.href = options.linkBase + roomSlug(roomData.id);
    } else {
      el = document.createElement('div');
      if (roomData && !isElev && !isGap && onClick) {
        el.style.cursor = 'pointer';
        el.onclick = function() { onClick(roomData.id); };
      }
    }

    el.className = 'room ' + r.css + (isElev ? '' : ' ' + r.size);
    if (isLocked && !isElev && !isGap) el.classList.add('locked');
    if (isHighlighted) el.classList.add('highlighted');

    var html = '<span class="room-name">' + r.name + '</span>';
    if (r.detail) html += '<span class="room-detail">' + r.detail + '</span>';
    if (r.badge) {
      var bCss = r.badgeCss || 'background:#374151';
      html = '<span class="room-badge" style="' + bCss + '">' + r.badge + '</span>' + html;
    }
    el.innerHTML = html;

    fl.appendChild(el);
  });
  return fl;
}

function roomSlug(id) {
  return id.replace(/_/g, '-');
}

function roomIdFromSlug(slug) {
  return slug.replace(/-/g, '_');
}
