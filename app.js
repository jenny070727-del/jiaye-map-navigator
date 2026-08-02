const folders = [
  { name: "上1字", group: "一字", maps: ["地图 (1).jpg", "地图 (2).jpg"], labels: ["地图1", "地图2-建议跟跑"] },
  { name: "下1字", group: "一字", maps: ["地图.jpg", "地图 (2).png"], labels: ["地图1", "地图2-新图"] },
  { name: "右一字", group: "一字", maps: ["地图 (1).jpg", "地图 (2).jpg", "地图 (3).png"], choiceCovers: [null, null, "选图-地图3.png"], choiceNotes: [null, null, "骑士门"] },
  { name: "左一字", group: "一字", maps: ["地图 (1).jpg", "地图 (2).jpg", "地图 (3).jpg", "地图 (4).jpg", "地图 (5).jpg", "地图 (6).png", "地图 (7).png"], choiceCovers: [null, null, null, null, null, "选图-地图6.png", "选图-地图7.png"] },
  { name: "上T门", group: "T门", maps: ["地图.jpg"] },
  { name: "下T门", group: "T门", maps: ["地图.jpg"] },
  { name: "Y字型", group: "特殊", maps: ["地图.jpg"] },
  { name: "三口门", group: "特殊", maps: ["地图.jpg"] },
  { name: "上拐角门", group: "拐角", maps: ["地图 (1).jpg", "地图 (2).jpg"] },
  { name: "下拐角门", group: "拐角", maps: ["地图.jpg"] },
  { name: "中拐角门", group: "拐角", maps: ["地图.jpg"] },
  { name: "右拐角门", group: "拐角", maps: ["地图.jpg"] },
  { name: "拐角-新图", group: "拐角", maps: ["地图.png"], cover: "封面-v2.jpg" },
];

function route(text) {
  return text
    .split(/[，,\n]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((text) => ({ text }));
}

function ask(text, rejectText) {
  return { text, kind: "question", rejectText };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const routeScripts = {
  "右一字:0": route("进门右转，往前面走路过楼梯间，然后左转，右转来到带厕所的客厅，顺着走来到餐厅，就沿着这条路直接走来到通天桌，通天桌子左边走廊右手边门口走，向左进门来到空旷的图书馆，去对面，向右往回走来到会客厅，跳回对面，走向新的那边、进进门厅右转，楼梯间下楼来到缪斯房，导航回家"),
  "右一字:1": route("向前走到十字分叉口，左右都可能是资源点可以看一下、最终目的是前方空旷的图书馆，出图书馆后来到半圆形房间、走沙发后面的门出去，来到Y形分叉口走左边，一直走来到缪斯房，从缪斯房右边出去，直走来到餐厅，走楼梯门，左拐来到另一个半圆形房间，通过后左拐来到通天桌，通过桌子上二楼、右手边走廊右边门口，一直贴着右手边的墙走直到尽头、通过壁炉餐厅、来到空旷的图书馆2楼，跳到对面、呃哈皮没跳过去我们自由探索吧！"),
  "右一字:2": route("直走后右转来到空旷的图书馆）， 一直直走来到尽头是楼梯间然后上二楼，一直贴着右手边走路过厨房来到卧室+厕所，出卧室门接着贴着右手边走路过红毯来到寝室+厕所，北门出去后还是一直贴着右手边会看到安全房间，往安全房对面走是空旷的图书馆二楼，有箱子拿一下然后跳下去回家一趟\n走正门中间直走撞墙后右拐，贴着左边的墙走路过一长串Z然后开门， 左右两边都有路但是我们直走来到缪斯房，右边出去后一直顺着走路过有壁炉的客厅后，凉哈皮死了。。我们加油吧"),
  "右拐角门:0": route("右转两次来到大空房，大空房右边门，顺着+直走+顺着走来到通天桌，拿完下楼继续向前来到缪斯房，从右边的走廊出去、左转，右转来到楼梯间，一直沿着主干道走到蛤蟆那边，走蛤蟆对着的门，顺着主干道左转到卧室+厕所，回家"),
  "Y字型:0": route("顺着Y直走，左拐到断楼梯、大概有箱子拿一下，拿完原门出去直走来到很乱的桌子椅子，向右两次来到卧室+厕所，返回到很乱的桌子椅子门口、走原先的左拐来到缪斯房，走缪斯房左边离开，右转来到长条餐厅，向餐厅487门走，一直直线走就是出口"),
  "左一字:2": [
    ...route("顺着走到凌乱的桌子椅子，左拐后右拐到楼梯间，上楼去喇叭向着的门口，直走后左拐来到餐厅，拿完箱子再上楼走喇叭对着的门口，顺着走到图书馆，在图书馆拿箱子，一楼直接图书馆出去，直走后左拐就回到门口"),
    ask("是否继续？", "那么回家吧！"),
    ...route("大门右边进去，左拐后去右手边是空旷的图书馆，出图书馆门左拐两次来到昏暗的厨房，出厨房后右拐来到通天桌"),
    ask("是否拿过图书馆一楼箱子？", "那么回家吧！"),
    ...route("通天桌右边走廊右手边门口走，一直顺着直走、会经过小客厅、到空旷图书馆2楼"),
    ask("是否继续？", "那么回家吧！"),
    ...route("回到高桌子对着的门，一直顺着直走，沿着地图边向北走回来到缪斯房，拿完箱子就回家！"),
  ],
  "左一字:0": route("左拐来到昏暗的厨房，顺着走然后右转来到工作室，顺着后左拐来到青蛙那边，直走、也就是青蛙面对的门，直走是有壁炉的房间有可能刷箱子、不直走向左是卧室+厕所，走另外没有走过的门穿过空旷的房间，一直顺着走到通天桌，拿完箱子后走一楼接着向前来到缪斯房，回家！"),
  "左一字:3": [
    ...route("直走到进门厅左拐，右拐后顺着走到门，左拐来到厨房，出厨房门立刻右转，到分叉口右转来到进门厅、有时候可能没有分叉，进门厅左边的门出去，顺着路过钢琴房，接着顺着走来到通天桌，拿了箱子后回到一楼接着向前走，顺着主干道来到缪斯房，拿到后往回走到通天桌，到通天桌左边二楼走廊后右边的门，直走到放浴巾的杂物间，顺着走一段距离后左拐来到卧室+厕所，拿完后回到那个走廊 原先的直走现在的左拐"),
    ask("是否继续？", "左拐回家！"),
    ...route("右拐到半圆形房间左拐，沿路一直走走到会客厅，继续沿着会客厅底部向前出门，顺着走来到楼梯间的二楼，回家！"),
  ],
  "下1字:0": route("先向前到厨房看看有没有，看完回去原方向的右边门，左拐，直走到图书馆，原路返回到图书馆门口，右拐到食堂、也就是地图的北面，去楼梯口的门 顺着走到缪斯房，拿完后去缪斯房右边的路，顺着之后右拐来到卧室+厕所，离开卧室后右拐会来到有壁炉的食堂，回家！"),
  "下1字:1": route("左拐来到厨房，Y形分叉口走右边来到图书馆，原路返回到侧门后直走到尽头左拐来到罐子房，去2楼顺着走到通天桌，去1楼走高的桌子对着的门一直顺着走到缪斯房，缪斯房右手边出去，分叉口左边可能有资源、看完后右转来到空旷的图书馆，左拐来到餐厅，上2楼那边的门顺着走到空旷的图书馆2楼，看到回去餐厅走餐厅楼梯门，不管分叉口一直走、会路过壁炉餐厅，一直来到进门厅后右边门出去就是出口"),
  "下T门:0": route("左拐到空旷的图书馆，通过图书馆后左拐到坠落的吊灯，直走到缪斯房，缪斯房左边的口出去，一路走到带厕所的客厅，出客厅后右拐到雕像的装饰房，直接回头直走是餐厅，上二楼右拐直走到有壁炉的食堂，一直顺着走到空旷的图书馆二楼，在顺着走到厨房，出厨房后右手边是后门或者向左可以再探索一下"),
  "中拐角门:0": route("左右都有路向左是食堂，走487门，右拐，左拐，直走到图书馆，图书馆原门出去后左拐，到分叉口左拐到雕像房，左拐两次到罐子房，到二楼有一个门，顺着走是寝室+厕所，另一个门出去左拐后右拐就是出口"),
  "上1字:1": route("直走就是会客厅，贴着下面的路左拐出去，顺着走到食堂，487门出去，顺着到岔路口右转来到罐子房，罐子房原门出去一直顺着主干道走到缪斯房，缪斯房中间的苦出去直走空旷的图书馆，返回到缪斯房走右边出口，顺着路过浴巾房间、有厕所的客厅，顺着主干道不要右拐走到半圆形房间，一直直走就是出口"),
  "上拐角门:1": route("右拐两次，左拐到断楼梯房间，上二楼进门，一路贴左边走到通天桌，去一楼顺着下桌子的方向走到缪斯房，缪斯房右边出去后回到通天桌，上到通天桌2楼左边走廊向左的门走到厨房，顺着走到寝室+厕所，寝室另一扇门出去，左拐，右拐到主卧+厕所，出卧室门右边走，路过楼梯走到进门厅，一直直走就是出口"),
  "上1字:0": [
    ...route("左拐，右拐到楼梯上二楼，左拐两次后右拐到主卧+厕所，原门返回后左拐右拐回到楼梯口，直走、也就是原来的楼梯右手边，分叉口右转进会客厅，原门、也就是壁炉门出会客厅，现在的直走顺着走到缪斯房、不要右拐，缪斯房中间出去路过一个2楼桥梁，一直直走到尽头右转，左转后直走到食堂，摸完箱子后回到二楼楼梯口的门，顺着走到图书馆"),
    ask("是否继续？", "导航回家"),
    ...route("去看看地图右上角"),
  ],
  "三口门:0": [
    ...route("右拐后顺着去餐厅，楼梯口门进去后左拐，右转到Y形路口，顺着Y底部走到进门厅，走箱子后面的门后左拐后右拐，一直顺着主干道路过半圆形门来到缪斯房，缪斯房左边出去，沿着主干道、也就是右拐、之后直走到寝室+厕所，原门门出去后右拐，直走到浴巾房间，再顺着就到门口了"),
    ask("是否继续？", "导航回家"),
    ...route("左侧进去，顺着主干道走、路过浴巾房来到罐子房，2楼门左手边一直直走到尽头右边就是出口"),
  ],
  "上T门:0": [
    ...route("右拐进客厅后去大通铺+厕所，拿完后往地图下面的门走，到分叉口沿着主干道直走到会客厅，从地图左下角的门出会客厅，右拐到餐厅，餐厅楼梯上二楼的门后左拐，再左拐可能有箱子可以腌一下、不看就直走，直走路过壁炉客厅，走到尽头左边有门来到通天桌，下楼往高的桌子的门口走，直走到缪斯房，缪斯房间右边出"),
    ask("是否继续？", "导航回家"),
    ...route("右手边还可以探索"),
  ],
  "左一字:4": [
    ...route("左转两次后直走、也就是地图上方，开门左转后顺着走到书房，书房门出去后先看右边有没有箱子、看完后退回去去左边是寝室+厕所，宿舍另一门出去、经过凌乱的桌子椅子，浴巾房，顺着主干道走、不进楼梯间、路过安全房、一直到缪斯房，先从中间出去看有没有刷箱子然后从右边的门出去，分叉口左拐到空旷的图书馆，再顺着走到通天桌，上二楼，高的桌子右边走廊的门口后右拐到入户房，入户房那边箱子后面的门口出去"),
    ask("是否继续？", "左拐很多扇门后是侧门"),
    ...route("右拐后左拐是主卧+厕所，原门出去左拐来到空旷图书馆2楼，顺着走后右拐来到Y形走廊，Y形底下可能是一个箱子房、看完后走Y另一个手臂，右拐来到会客厅，地图上会客厅左下角出去，顺着走就是出口"),
  ],
  "左一字:5": route("左拐后一路直走到尽头在左拐来到书房，之后一直直走、也就是往北走来到有壁炉的食堂，贴着左手边的墙一直走来到缪斯房，走中间门出去来到通天桌，走右边走廊右手边走也就是北面，左拐后右拐来到卧室+厕所，原路返回到通天桌，跳到对面、依旧是北面的门然后顺着走，来到图书馆，回到图书馆2楼走箱子正上方的门，一直粘着右边走来到空旷的图书馆2楼，拿完箱子后走南方向的门，一直顺着走经过浴巾房来到会客厅，走壁炉门出去后就沿着主干道头、到十字分岔路口左拐就是大门"),
  "左一字:6": route("左拐来到罐子房子，出罐子房左拐来到餐厅，走487门出去直走来到缪斯房，走左边门出去直走来到通天桌，走右边走廊左边门出去，顺着主干道直到右侧是卧室+厕所， 出卧室门右转一直直走路过厨房来到第二个餐厅，走楼梯门后走拐，直走路过雕像房，分叉口不走青蛙走另一边，来到大门口\n走2楼侧门，右拐后直走来到寝室+厕所，拿完回家！"),
  "上拐角门:0": [
    ...route("右转来到食堂，回到进门走没走过的门、也就是现在的左边，右转到通天桌，不着急上去先一楼顺着走到断楼梯房，去2楼，2楼门口出去后左拐就是刚刚的通天桌上面了，回到2楼主干道一路直走到空旷的图书馆，跳到1楼顺着向前走， 左边钢琴房有可能刷箱子、回到主干道走到厨房，再顺着到Y形走廊，走Y形另一个手臂来到缪斯房，缪斯房中间出去后直走到图书馆，上2楼后看箱子对面的那侧墙，向右边门口走"),
    ask("是否继续？", "进去后左边直走是侧门"),
    ...route("左拐然后右拐，顺着走后左拐是主卧+厕所，回家"),
  ],
  "拐角-新图:0": route("分叉口右手边一直顺着走到餐厅，楼梯顺着走后右拐来到断楼，上2楼顺着走来到通天桌，到1楼朝北走来到缪斯房，缪斯房右边出去来到空旷的图书馆，原路返回到通天桌、也就是缪斯房左边门出去，上2楼左边走廊右手边门，来到空旷的图书馆2楼，跳过去走左手边，一直贴着右手边走来到门口，如果不够就侧门口左拐直走后右手边有卧室+厕所，撤退！"),
};

const state = {
  filter: "all",
  folderIndex: 0,
  mapIndex: 0,
  stepIndex: 0,
  hasSelection: false,
  chooserFolderIndex: 0,
  zoom: 1,
  panX: 0,
  panY: 0,
  isPanning: false,
  panStartX: 0,
  panStartY: 0,
  panOriginX: 0,
  panOriginY: 0,
  touchGesture: null,
  gestureStartZoom: 1,
  auto: false,
  timer: null,
  listening: false,
  recognition: null,
  recognitionActive: false,
  recognitionPausedForSpeech: false,
  recognitionRestartTimer: null,
  recognitionWatchdogTimer: null,
  isSpeaking: false,
  ignoreVoiceUntil: 0,
  speechToken: 0,
  lastVoiceActionAt: 0,
  lastVoiceCommandText: "",
  suppressEchoCommandUntil: 0,
  voiceURI: localStorage.getItem("jiaye-voice-uri") ?? "",
};

const els = {
  shell: document.querySelector("#appShell"),
  mapList: document.querySelector("#mapList"),
  mapChoiceList: document.querySelector("#mapChoiceList"),
  mapStrip: document.querySelector("#mapStrip"),
  mapImage: document.querySelector("#mapImage"),
  mapFrame: document.querySelector("#mapFrame"),
  zoomBadge: document.querySelector("#zoomBadge"),
  mapTitle: document.querySelector("#mapTitle"),
  mapType: document.querySelector("#mapType"),
  chooserTitle: document.querySelector("#chooserTitle"),
  chooserType: document.querySelector("#chooserType"),
  steps: document.querySelector("#steps"),
  stepIndex: document.querySelector("#stepIndex"),
  stepText: document.querySelector("#stepText"),
  fullRouteText: document.querySelector("#fullRouteText"),
  listenText: document.querySelector("#listenText"),
  voiceStatus: document.querySelector("#voiceStatus"),
  routeMeta: document.querySelector("#routeMeta"),
  routeSelect: document.querySelector("#routeSelect"),
  addRouteBtn: document.querySelector("#addRouteBtn"),
  voiceSelect: document.querySelector("#voiceSelect"),
  voiceControlBtn: document.querySelector("#voiceControlBtn"),
  customNotes: document.querySelector("#customNotes"),
  delayRange: document.querySelector("#delayRange"),
  delayOut: document.querySelector("#delayOut"),
  speakBtn: document.querySelector("#speakBtn"),
  autoBtn: document.querySelector("#autoBtn"),
  prevStepBtn: document.querySelector("#prevStepBtn"),
  nextStepBtn: document.querySelector("#nextStepBtn"),
  backHomeBtn: document.querySelector("#backHomeBtn"),
  backToCategoriesBtn: document.querySelector("#backToCategoriesBtn"),
  prevMapBtn: document.querySelector("#prevMapBtn"),
  nextMapBtn: document.querySelector("#nextMapBtn"),
  fitBtn: document.querySelector("#fitBtn"),
  saveNotesBtn: document.querySelector("#saveNotesBtn"),
};

function currentFolder() {
  return folders[state.folderIndex];
}

function currentLabel(folder = currentFolder()) {
  return mapLabel(folder, state.mapIndex);
}

function assetPath(folder, file) {
  return `./assets/${folder.name}/${file}`;
}

function coverPath(folder) {
  return assetPath(folder, folder.cover ?? "封面.jpg");
}

function noteKey() {
  return `jiaye-notes:${currentFolder().name}:${state.mapIndex}`;
}

function labelKey(folderName, mapIndex) {
  return `jiaye-map-label:${folderName}:${mapIndex}`;
}

function defaultMapLabel(folder, mapIndex) {
  return folder.labels?.[mapIndex] ?? `地图 ${mapIndex + 1}`;
}

function mapLabel(folder, mapIndex) {
  return localStorage.getItem(labelKey(folder.name, mapIndex)) || defaultMapLabel(folder, mapIndex);
}

function saveMapLabel(folder, mapIndex, value) {
  const text = value.trim();
  const key = labelKey(folder.name, mapIndex);
  if (text && text !== defaultMapLabel(folder, mapIndex)) localStorage.setItem(key, text);
  else localStorage.removeItem(key);
}

function routeOverrideKey(folder = currentFolder(), mapIndex = state.mapIndex) {
  return `jiaye-route:${folder.name}:${mapIndex}`;
}

function routeKey(folder = currentFolder(), mapIndex = state.mapIndex) {
  return `${folder.name}:${mapIndex}`;
}

function parseEditableSteps(text) {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^\d+[\.\、．)]\s*/, "").trim())
    .filter(Boolean)
    .map((line) => {
      const questionMatch = line.match(/^(.*?)[（(]不继续[:：]\s*(.*?)[）)]$/);
      if (questionMatch) return ask(questionMatch[1].trim(), questionMatch[2].trim());
      return { text: line };
    });
}

function parseCustomNotes(text) {
  return text
    .split(/[，,\n]+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((text) => ({ text }));
}

function serializableSteps(steps) {
  return steps.map((step) => ({
    text: step.text,
    ...(step.kind === "question" ? { kind: "question", rejectText: step.rejectText } : {}),
  }));
}

function routeEditorText(steps) {
  return steps
    .map((step, index) => {
      const prefix = String(index + 1).padStart(2, "0");
      const questionSuffix = step.kind === "question" ? `（不继续：${step.rejectText}）` : "";
      return `${prefix}. ${step.text}${questionSuffix}`;
    })
    .join("\n");
}

function routeBaseList(folder = currentFolder(), mapIndex = state.mapIndex) {
  const saved = localStorage.getItem(routeOverrideKey(folder, mapIndex));
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed
          .filter((step) => step && typeof step.text === "string" && step.text.trim())
          .map((step) =>
            step.kind === "question"
              ? ask(step.text.trim(), String(step.rejectText ?? "").trim())
              : { text: step.text.trim() },
          );
      }
    } catch (error) {
      localStorage.removeItem(routeOverrideKey(folder, mapIndex));
    }
  }
  return routeScripts[routeKey(folder, mapIndex)] ?? [];
}

function stepList() {
  const folder = currentFolder();
  const route = routeBaseList(folder);

  const saved = localStorage.getItem(noteKey())?.trim();
  const custom = saved ? parseCustomNotes(saved) : [];

  const steps = [...route, ...custom];
  if (!steps.length) {
    return [{ text: "这张图暂无文字导航，请先看上方地图。你补充口令后，我会按口令播报。" }];
  }
  return steps;
}

function visibleFolders() {
  if (state.filter === "all") return folders;
  return folders.filter((folder) => folder.group === state.filter);
}

function renderList() {
  els.mapList.innerHTML = "";
  visibleFolders().forEach((folder) => {
    const realIndex = folders.indexOf(folder);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `map-card${state.hasSelection && realIndex === state.folderIndex ? " is-active" : ""}`;
    button.innerHTML = `
      <img src="${coverPath(folder)}" alt="${folder.name}封面">
      <span>
        <strong>${folder.name}</strong>
        <span>${folder.group} / 点进后选择 ${folder.maps.length} 张地图</span>
      </span>
      <em>${String(realIndex + 1).padStart(2, "0")}</em>
    `;
    button.addEventListener("click", () => {
      if (folder.maps.length === 1) selectMap(realIndex, 0);
      else openChooser(realIndex);
    });
    els.mapList.appendChild(button);
  });
}

function renderChooser() {
  const folder = folders[state.chooserFolderIndex];
  els.chooserTitle.textContent = folder.name;
  els.chooserType.textContent = `${folder.group} · ${folder.maps.length} 张地图`;
  els.mapChoiceList.innerHTML = "";

  folder.maps.forEach((file, index) => {
    const choiceImage = folder.choiceCovers?.[index] ?? file;
    const choiceNote = folder.choiceNotes?.[index];
    const label = mapLabel(folder, index);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-card";
    button.innerHTML = `
      <img src="${assetPath(folder, choiceImage)}" alt="${folder.name}${index + 1}">
      <span>
        <strong>
          <input class="choice-name-input" value="${escapeHtml(label)}" aria-label="修改${escapeHtml(folder.name)}第${index + 1}张地图名称" spellcheck="false">
          ${choiceNote ? `<small>${escapeHtml(choiceNote)}</small>` : ""}
        </strong>
        <em>${String(index + 1).padStart(2, "0")}</em>
      </span>
    `;
    button.addEventListener("click", () => selectMap(state.chooserFolderIndex, index));
    const input = button.querySelector(".choice-name-input");
    input.addEventListener("click", (event) => event.stopPropagation());
    input.addEventListener("pointerdown", (event) => event.stopPropagation());
    input.addEventListener("keydown", (event) => {
      event.stopPropagation();
      if (event.key === "Enter") input.blur();
    });
    input.addEventListener("input", () => {
      saveMapLabel(folder, index, input.value);
      renderRouteSelect();
      if (state.hasSelection && state.folderIndex === state.chooserFolderIndex && state.mapIndex === index) {
        renderMapTitle();
        renderSteps();
        renderStrip();
      }
    });
    els.mapChoiceList.appendChild(button);
  });
}

function renderRouteSelect() {
  els.routeSelect.innerHTML = "";
  folders.forEach((folder, index) => {
    folder.maps.forEach((_, mapIndex) => {
      const option = document.createElement("option");
      option.value = `${index}:${mapIndex}`;
      option.textContent = `${folder.name} / ${mapLabel(folder, mapIndex)}`;
      option.selected = index === state.folderIndex && mapIndex === state.mapIndex;
      els.routeSelect.appendChild(option);
    });
  });
}

function renderStrip() {
  const folder = currentFolder();
  els.mapStrip.innerHTML = "";

  folder.maps.forEach((file, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `thumb${index === state.mapIndex ? " is-active" : ""}`;
    button.innerHTML = `
      <img src="${assetPath(folder, file)}" alt="${folder.name}${index + 1}">
      <span>${mapLabel(folder, index)}</span>
    `;
    button.addEventListener("click", () => selectMap(state.folderIndex, index));
    els.mapStrip.appendChild(button);
  });
}

function renderSteps() {
  const steps = stepList();
  if (state.stepIndex >= steps.length) state.stepIndex = steps.length - 1;

  els.stepIndex.textContent = String(state.stepIndex + 1).padStart(2, "0");
  els.routeMeta.textContent = `步骤 ${state.stepIndex + 1}/${steps.length} · ${currentFolder().name} · ${currentLabel()}`;
  els.stepText.textContent = steps[state.stepIndex].text;
  if (document.activeElement !== els.fullRouteText) {
    els.fullRouteText.value = routeEditorText(steps);
  }
  els.steps.innerHTML = "";

  steps.forEach((step, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `step-btn${index === state.stepIndex ? " is-active" : ""}`;
    button.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><p>${step.text}</p>`;
    button.addEventListener("click", () => {
      state.stepIndex = index;
      renderSteps();
      speakCurrent();
    });
    els.steps.appendChild(button);
  });
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clampPan() {
  if (state.zoom <= 1) {
    state.panX = 0;
    state.panY = 0;
    return;
  }

  const maxX = (els.mapFrame.clientWidth * (state.zoom - 1)) / 2;
  const maxY = (els.mapFrame.clientHeight * (state.zoom - 1)) / 2;
  state.panX = clamp(state.panX, -maxX, maxX);
  state.panY = clamp(state.panY, -maxY, maxY);
}

function applyMapView() {
  clampPan();
  els.mapFrame.classList.toggle("is-zoomed", state.zoom > 1.01);
  els.mapImage.style.transform = `translate3d(${state.panX}px, ${state.panY}px, 0) scale(${state.zoom})`;
  els.zoomBadge.textContent = `${Math.round(state.zoom * 100)}%`;
  els.fitBtn.title = "重置地图视图";
  els.fitBtn.setAttribute("aria-label", "重置地图视图");
}

function renderMapTitle() {
  const folder = currentFolder();
  els.mapTitle.textContent = `${folder.name} / ${currentLabel(folder)}`;
  els.mapImage.alt = `${folder.name}${currentLabel(folder)}`;
}

function resetMapView() {
  state.zoom = 1;
  state.panX = 0;
  state.panY = 0;
  state.isPanning = false;
  state.touchGesture = null;
  els.mapFrame.classList.remove("is-panning");
  applyMapView();
}

function zoomMap(factor, clientX, clientY) {
  const oldZoom = state.zoom;
  const nextZoom = clamp(oldZoom * factor, 1, 5);
  if (nextZoom === oldZoom) return;

  const rect = els.mapFrame.getBoundingClientRect();
  const focusX = clientX - (rect.left + rect.width / 2);
  const focusY = clientY - (rect.top + rect.height / 2);
  const ratio = nextZoom / oldZoom;
  state.panX = focusX - (focusX - state.panX) * ratio;
  state.panY = focusY - (focusY - state.panY) * ratio;
  state.zoom = nextZoom;
  applyMapView();
}

function touchCenterAndDistance(touches) {
  const first = touches[0];
  const second = touches[1];
  const centerX = (first.clientX + second.clientX) / 2;
  const centerY = (first.clientY + second.clientY) / 2;
  const distance = Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY);
  return { centerX, centerY, distance };
}

function renderMap() {
  const folder = currentFolder();
  const file = folder.maps[state.mapIndex];
  els.shell.classList.toggle("is-home", !state.hasSelection);
  els.shell.classList.remove("is-chooser");
  renderMapTitle();
  els.mapType.textContent = `${folder.group} · ${state.mapIndex + 1}/${folder.maps.length}`;
  els.mapImage.src = assetPath(folder, file);
  applyMapView();
  els.customNotes.value = localStorage.getItem(noteKey()) ?? "";

  renderList();
  renderRouteSelect();
  renderStrip();
  renderSteps();
}

function selectMap(folderIndex, mapIndex) {
  stopAuto();
  state.hasSelection = true;
  state.folderIndex = folderIndex;
  state.mapIndex = mapIndex;
  state.stepIndex = 0;
  resetMapView();
  renderMap();
  startVoiceControl(true);
  speakCurrent();
}

function goHome() {
  stopAuto();
  state.hasSelection = false;
  els.shell.classList.remove("is-chooser");
  renderMap();
}

function openChooser(folderIndex) {
  stopAuto();
  state.hasSelection = false;
  state.chooserFolderIndex = folderIndex;
  els.shell.classList.remove("is-home");
  els.shell.classList.add("is-chooser");
  renderChooser();
}

function moveMap(delta) {
  const folder = currentFolder();
  const nextMap = state.mapIndex + delta;

  if (nextMap >= 0 && nextMap < folder.maps.length) {
    selectMap(state.folderIndex, nextMap);
    return;
  }

  const nextFolder = (state.folderIndex + delta + folders.length) % folders.length;
  const nextFolderMap = delta > 0 ? 0 : folders[nextFolder].maps.length - 1;
  selectMap(nextFolder, nextFolderMap);
}

function moveStep(delta, shouldSpeak = true) {
  const steps = stepList();
  state.stepIndex = (state.stepIndex + delta + steps.length) % steps.length;
  renderSteps();
  if (shouldSpeak) speakCurrent();
}

function setVoiceStatus(kind) {
  els.voiceStatus.classList.remove("is-speaking", "is-auto");
  if (kind) els.voiceStatus.classList.add(kind);
}

function scoreVoice(voice) {
  const name = voice.name.toLowerCase();
  const lang = voice.lang.toLowerCase();
  let score = 0;

  if (lang === "zh-cn" || lang === "zh_hans-cn") score += 80;
  else if (lang.startsWith("zh-cn") || lang.includes("hans")) score += 65;
  else if (lang.startsWith("zh")) score += 40;

  if (name.includes("ting-ting") || name.includes("yu-shu")) score += 20;
  if (name.includes("xiaoxiao") || name.includes("yunxi") || name.includes("yunyang")) score += 18;
  if (name.includes("普通话") || name.includes("mandarin") || name.includes("中文")) score += 14;
  if (name.includes("google") || name.includes("microsoft") || name.includes("apple")) score += 8;
  if (voice.localService) score += 4;

  return score;
}

function preferredVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  if (state.voiceURI) {
    const selected = voices.find((voice) => voice.voiceURI === state.voiceURI);
    if (selected) return selected;
  }

  return voices
    .filter((voice) => voice.lang.toLowerCase().startsWith("zh"))
    .sort((a, b) => scoreVoice(b) - scoreVoice(a))[0] ?? null;
}

function renderVoiceOptions() {
  if (!("speechSynthesis" in window)) {
    els.voiceSelect.innerHTML = '<option value="">当前浏览器不支持语音播报</option>';
    els.voiceSelect.disabled = true;
    return;
  }

  const voices = window.speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang.toLowerCase().startsWith("zh"))
    .sort((a, b) => scoreVoice(b) - scoreVoice(a));

  const best = preferredVoice();
  els.voiceSelect.innerHTML = `<option value="">自动选择中文声音${best ? `（${best.name}）` : ""}</option>`;
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.voiceURI;
    option.textContent = `${voice.name} · ${voice.lang}`;
    option.selected = Boolean(state.voiceURI) && voice.voiceURI === state.voiceURI;
    els.voiceSelect.appendChild(option);
  });
}

function speakText(text) {
  if (!("speechSynthesis" in window)) {
    els.stepText.textContent = `${text}（当前浏览器不支持语音播报）`;
    return;
  }

  const token = state.speechToken + 1;
  state.speechToken = token;
  pauseRecognitionForSpeech();
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.voice = preferredVoice();
  utterance.rate = 0.95;
  utterance.pitch = 1.02;
  utterance.volume = 1;
  utterance.onstart = () => {
    if (token !== state.speechToken) return;
    state.isSpeaking = true;
    setVoiceStatus("is-speaking");
  };
  const finishSpeech = () => {
    if (token !== state.speechToken) return;
    state.isSpeaking = false;
    state.ignoreVoiceUntil = Date.now() + 280;
    state.suppressEchoCommandUntil = Date.now() + 900;
    setVoiceStatus(state.auto ? "is-auto" : "");
    resumeRecognitionAfterSpeech();
  };
  utterance.onend = finishSpeech;
  utterance.onerror = finishSpeech;
  window.speechSynthesis.speak(utterance);
}

function currentStep() {
  return stepList()[state.stepIndex];
}

function speakCurrent() {
  speakText(currentStep().text);
}

function rejectCurrentQuestion() {
  const step = currentStep();
  if (step.kind !== "question") return false;
  els.stepText.textContent = step.rejectText;
  els.routeMeta.textContent = `${currentFolder().name} · ${currentLabel()} · 回家提示`;
  speakText(step.rejectText);
  return true;
}

function startAuto() {
  state.auto = true;
  els.autoBtn.classList.add("is-active");
  els.autoBtn.lastChild.textContent = "暂停";
  setVoiceStatus("is-auto");
  speakCurrent();
  state.timer = window.setInterval(() => moveStep(1, true), Number(els.delayRange.value) * 1000);
}

function stopAuto() {
  state.auto = false;
  els.autoBtn.classList.remove("is-active");
  els.autoBtn.lastChild.textContent = "自动";
  setVoiceStatus("");
  if (state.timer) {
    window.clearInterval(state.timer);
    state.timer = null;
  }
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

function normalizedCommand(transcript) {
  return transcript
    .toLowerCase()
    .replace(/[“”"'.。？！?！,，、/\\\s]/g, "")
    .replace(/okay/g, "ok")
    .replace(/欧凯|噢凯|哦凯|奥凯|欧克|噢克|哦克|奥克/g, "ok");
}

function commandKind(transcript) {
  const text = normalizedCommand(transcript);
  const previousWords = ["上一步", "上一部", "上一条", "返回", "退回", "后退"];
  const repeatWords = ["重播", "再说", "重复", "再播", "没听清"];
  const rejectWords = ["不了", "不要", "不用", "不去", "不继续", "回家", "算了", "不要了", "不了吧"];
  const exactNextWords = [
    "ok",
    "好了",
    "好啦",
    "好嘞",
    "好的",
    "可以了",
    "行了",
    "下一条",
    "下一跳",
    "下一页",
    "下一题",
    "下一次",
    "下一句",
    "下一步",
    "下一部",
    "下一个",
    "下条",
    "下次",
    "下句",
  ];
  const nextWords = [
    "下一步",
    "下一部",
    "下一条",
    "下一跳",
    "下一页",
    "下一题",
    "下一次",
    "下一句",
    "下一个",
    "下条",
    "下次",
    "下句",
    "继续",
    "可以下一步",
    "可以下一条",
    "可以了",
    "行了",
    "走吧",
    "ok",
  ];

  if (previousWords.some((word) => text.includes(word))) return "previous";
  if (repeatWords.some((word) => text.includes(word))) return "repeat";
  if (rejectWords.some((word) => text.includes(word))) return "reject";
  if (exactNextWords.includes(text) || nextWords.some((word) => text.includes(word))) return "next";
  return "";
}

function handleVoiceCommand(transcript) {
  if (state.isSpeaking || state.recognitionPausedForSpeech || Date.now() < state.ignoreVoiceUntil) return false;
  const commandText = normalizedCommand(transcript);
  const kind = commandKind(transcript);
  if (!kind) return false;

  const now = Date.now();
  if (commandText && commandText === state.lastVoiceCommandText && now < state.suppressEchoCommandUntil) return true;
  if (now - state.lastVoiceActionAt < 520) return true;
  state.lastVoiceActionAt = now;
  state.lastVoiceCommandText = commandText;
  state.suppressEchoCommandUntil = now + 700;

  els.listenText.textContent = `听到：${transcript}`;
  if (kind === "previous") {
    moveStep(-1, true);
    return true;
  }
  if (kind === "repeat") {
    speakCurrent();
    return true;
  }
  if (kind === "reject" && rejectCurrentQuestion()) return true;
  moveStep(1, true);
  return true;
}

function pauseRecognitionForSpeech() {
  if (!state.listening || !state.recognition) return;
  state.recognitionPausedForSpeech = true;
  state.ignoreVoiceUntil = Date.now() + 700;
  if (state.recognitionRestartTimer) {
    window.clearTimeout(state.recognitionRestartTimer);
    state.recognitionRestartTimer = null;
  }
}

function resumeRecognitionAfterSpeech() {
  if (!state.listening || !state.recognitionPausedForSpeech) return;
  state.ignoreVoiceUntil = Math.max(state.ignoreVoiceUntil, Date.now() + 170);
  if (state.recognitionRestartTimer) window.clearTimeout(state.recognitionRestartTimer);
  state.recognitionRestartTimer = window.setTimeout(() => {
    state.recognitionPausedForSpeech = false;
    state.recognitionRestartTimer = null;
    if (state.listening && !state.recognitionActive) startVoiceControl(true);
  }, 120);
}

function armRecognitionWatchdog() {
  if (state.recognitionWatchdogTimer) window.clearInterval(state.recognitionWatchdogTimer);
  state.recognitionWatchdogTimer = window.setInterval(() => {
    if (!state.listening || state.isSpeaking || state.recognitionPausedForSpeech) return;
    if (!state.recognitionActive) startVoiceControl(true);
  }, 1400);
}

function disarmRecognitionWatchdog() {
  if (!state.recognitionWatchdogTimer) return;
  window.clearInterval(state.recognitionWatchdogTimer);
  state.recognitionWatchdogTimer = null;
}

function startVoiceControl(isAutoStart = false) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    els.voiceControlBtn.lastChild.textContent = "不支持语音";
    els.listenText.textContent = "当前浏览器不支持语音识别，仍可用 Enter 或空格进入下一条。";
    return;
  }

  if (!state.recognition) {
    state.recognition = new SpeechRecognition();
    state.recognition.lang = "zh-CN";
    state.recognition.continuous = true;
    state.recognition.interimResults = true;
    state.recognition.maxAlternatives = 3;
    state.recognition.onresult = (event) => {
      if (state.isSpeaking || state.recognitionPausedForSpeech || Date.now() < state.ignoreVoiceUntil) return;
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        const transcript = Array.from(result)
          .map((item) => item.transcript)
          .join(" / ")
          .trim();
        if (transcript) els.listenText.textContent = `听到：${transcript}`;
        if (handleVoiceCommand(transcript)) break;
      }
    };
    state.recognition.onend = () => {
      state.recognitionActive = false;
      if (state.recognitionPausedForSpeech || state.isSpeaking) return;
      if (state.listening) window.setTimeout(() => startVoiceControl(true), 80);
    };
    state.recognition.onerror = (event) => {
      state.recognitionActive = false;
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        els.voiceControlBtn.classList.remove("is-active");
        state.listening = false;
        els.voiceControlBtn.lastChild.textContent = "语音未授权";
        els.listenText.textContent = "语音权限没有开启；现在可以先用 Enter 或空格操作。";
        return;
      }
      els.listenText.textContent = "语音监听中断，正在尝试恢复；Enter/空格仍然可用。";
      if (state.listening) window.setTimeout(() => startVoiceControl(true), 250);
    };
    state.recognition.onstart = () => {
      state.recognitionActive = true;
      els.listenText.textContent = "正在听：OK、下一次、下一条、继续。";
    };
  }

  if (state.isSpeaking || state.recognitionPausedForSpeech) {
    state.listening = true;
    els.voiceControlBtn.classList.add("is-active");
    els.voiceControlBtn.lastChild.textContent = "监听中";
    return;
  }

  if (state.recognitionActive) {
    state.listening = true;
    els.voiceControlBtn.classList.add("is-active");
    els.voiceControlBtn.lastChild.textContent = "监听中";
    return;
  }

  state.listening = true;
  els.voiceControlBtn.classList.add("is-active");
  els.voiceControlBtn.lastChild.textContent = "监听中";
  armRecognitionWatchdog();

  try {
    state.recognition.start();
  } catch (error) {
    if (!isAutoStart) {
      disarmRecognitionWatchdog();
      els.voiceControlBtn.classList.remove("is-active");
      state.listening = false;
      els.voiceControlBtn.lastChild.textContent = "语音控制";
      els.listenText.textContent = "语音启动失败，可以继续用 Enter 或空格操作。";
    }
  }
}

function stopVoiceControl() {
  state.listening = false;
  disarmRecognitionWatchdog();
  state.recognitionPausedForSpeech = false;
  state.ignoreVoiceUntil = 0;
  if (state.recognitionRestartTimer) {
    window.clearTimeout(state.recognitionRestartTimer);
    state.recognitionRestartTimer = null;
  }
  els.voiceControlBtn.classList.remove("is-active");
  els.voiceControlBtn.lastChild.textContent = "语音监听";
  els.listenText.textContent = "语音监听已暂停；Enter/空格仍然可用。";
  if (state.recognition) state.recognition.stop();
}

document.querySelectorAll(".chip").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((chip) => chip.classList.remove("is-active"));
    button.classList.add("is-active");
    state.filter = button.dataset.filter;
    renderList();
  });
});

els.speakBtn.addEventListener("click", speakCurrent);
els.autoBtn.addEventListener("click", () => (state.auto ? stopAuto() : startAuto()));
els.backHomeBtn.addEventListener("click", goHome);
els.backToCategoriesBtn.addEventListener("click", goHome);
els.routeSelect.addEventListener("change", () => {
  const [folderIndex, mapIndex] = els.routeSelect.value.split(":").map(Number);
  selectMap(folderIndex, mapIndex);
});
els.voiceSelect.addEventListener("change", () => {
  state.voiceURI = els.voiceSelect.value;
  if (state.voiceURI) localStorage.setItem("jiaye-voice-uri", state.voiceURI);
  else localStorage.removeItem("jiaye-voice-uri");
});
els.addRouteBtn.addEventListener("click", () => {
  const prefix = els.customNotes.value.trim() ? `${els.customNotes.value.trim()}\n` : "";
  els.customNotes.value = `${prefix}补充口令：`;
  els.customNotes.focus();
});
els.voiceControlBtn.addEventListener("click", () => {
  if (state.listening) stopVoiceControl();
  else startVoiceControl();
});
els.prevStepBtn.addEventListener("click", () => moveStep(-1));
els.nextStepBtn.addEventListener("click", () => moveStep(1));
els.prevMapBtn.addEventListener("click", () => moveMap(-1));
els.nextMapBtn.addEventListener("click", () => moveMap(1));
els.fitBtn.addEventListener("click", resetMapView);

els.mapFrame.addEventListener("wheel", (event) => {
  if (!state.hasSelection) return;
  event.preventDefault();
  const isPinchZoom = event.ctrlKey || event.metaKey;

  if (isPinchZoom) {
    const delta = clamp(event.deltaY, -180, 180);
    const factor = Math.exp(-delta * 0.004);
    zoomMap(factor, event.clientX, event.clientY);
    return;
  }

  if (state.zoom <= 1.01) return;
  state.panX -= event.deltaX * 1.05;
  state.panY -= event.deltaY * 1.05;
  applyMapView();
}, { passive: false });

els.mapFrame.addEventListener("dblclick", (event) => {
  if (!state.hasSelection) return;
  if (state.zoom > 1.01) resetMapView();
  else zoomMap(2.2, event.clientX, event.clientY);
});

els.mapFrame.addEventListener("pointerdown", (event) => {
  if (!state.hasSelection || state.zoom <= 1.01) return;
  if (event.pointerType === "touch") return;
  event.preventDefault();
  state.isPanning = true;
  state.panStartX = event.clientX;
  state.panStartY = event.clientY;
  state.panOriginX = state.panX;
  state.panOriginY = state.panY;
  els.mapFrame.classList.add("is-panning");
  els.mapFrame.setPointerCapture(event.pointerId);
});

els.mapFrame.addEventListener("pointermove", (event) => {
  if (!state.isPanning) return;
  state.panX = state.panOriginX + event.clientX - state.panStartX;
  state.panY = state.panOriginY + event.clientY - state.panStartY;
  applyMapView();
});

function stopPanning(event) {
  if (!state.isPanning) return;
  state.isPanning = false;
  els.mapFrame.classList.remove("is-panning");
  if (event?.pointerId !== undefined) {
    try {
      els.mapFrame.releasePointerCapture(event.pointerId);
    } catch (error) {
      // Pointer capture may already be released if the cursor leaves the frame.
    }
  }
}

els.mapFrame.addEventListener("pointerup", stopPanning);
els.mapFrame.addEventListener("pointercancel", stopPanning);
els.mapFrame.addEventListener("pointerleave", stopPanning);

els.mapFrame.addEventListener("touchstart", (event) => {
  if (!state.hasSelection || event.touches.length !== 2) return;
  event.preventDefault();
  const rect = els.mapFrame.getBoundingClientRect();
  const gesture = touchCenterAndDistance(event.touches);
  state.touchGesture = {
    ...gesture,
    frameCenterX: rect.left + rect.width / 2,
    frameCenterY: rect.top + rect.height / 2,
    startZoom: state.zoom,
    startPanX: state.panX,
    startPanY: state.panY,
  };
  els.mapFrame.classList.add("is-panning");
}, { passive: false });

els.mapFrame.addEventListener("touchmove", (event) => {
  if (!state.hasSelection || event.touches.length !== 2 || !state.touchGesture) return;
  event.preventDefault();

  const current = touchCenterAndDistance(event.touches);
  const start = state.touchGesture;
  const rawRatio = current.distance / Math.max(start.distance, 1);
  const softenedRatio = Math.pow(rawRatio, 1.22);
  const nextZoom = clamp(start.startZoom * softenedRatio, 1, 5);
  const ratio = nextZoom / start.startZoom;
  const startFocusX = start.centerX - start.frameCenterX;
  const startFocusY = start.centerY - start.frameCenterY;
  const currentFocusX = current.centerX - start.frameCenterX;
  const currentFocusY = current.centerY - start.frameCenterY;

  state.zoom = nextZoom;
  state.panX = currentFocusX - (startFocusX - start.startPanX) * ratio;
  state.panY = currentFocusY - (startFocusY - start.startPanY) * ratio;
  applyMapView();
}, { passive: false });

function endTouchGesture() {
  state.touchGesture = null;
  els.mapFrame.classList.remove("is-panning");
}

els.mapFrame.addEventListener("touchend", (event) => {
  if (event.touches.length < 2) endTouchGesture();
});
els.mapFrame.addEventListener("touchcancel", endTouchGesture);

els.mapFrame.addEventListener("gesturestart", (event) => {
  if (!state.hasSelection) return;
  event.preventDefault();
  state.gestureStartZoom = state.zoom;
}, { passive: false });

els.mapFrame.addEventListener("gesturechange", (event) => {
  if (!state.hasSelection) return;
  event.preventDefault();
  const nextZoom = clamp(state.gestureStartZoom * event.scale, 1, 5);
  const factor = nextZoom / state.zoom;
  zoomMap(factor, event.clientX, event.clientY);
}, { passive: false });

els.delayRange.addEventListener("input", () => {
  els.delayOut.textContent = `${els.delayRange.value} 秒`;
  if (state.auto) {
    stopAuto();
    startAuto();
  }
});

els.saveNotesBtn.addEventListener("click", () => {
  const editedSteps = parseEditableSteps(els.fullRouteText.value);
  const extraSteps = parseCustomNotes(els.customNotes.value.trim());
  const mergedSteps = [...editedSteps];
  const existingTexts = new Set(mergedSteps.map((step) => step.text));

  extraSteps.forEach((step) => {
    if (!existingTexts.has(step.text)) {
      mergedSteps.push(step);
      existingTexts.add(step.text);
    }
  });

  if (mergedSteps.length) {
    localStorage.setItem(routeOverrideKey(), JSON.stringify(serializableSteps(mergedSteps)));
  } else {
    localStorage.removeItem(routeOverrideKey());
  }
  localStorage.removeItem(noteKey());
  els.customNotes.value = "";
  state.stepIndex = Math.min(state.stepIndex, stepList().length - 1);
  renderSteps();
  els.saveNotesBtn.textContent = "已保存";
  window.setTimeout(() => {
    els.saveNotesBtn.textContent = "保存全部指令";
  }, 1200);
});

document.addEventListener("keydown", (event) => {
  const tag = document.activeElement?.tagName;
  if (tag === "TEXTAREA" || tag === "INPUT" || tag === "SELECT") return;
  if (!state.hasSelection) return;
  if (currentStep().kind === "question" && (event.key === "Tab" || event.key === "Shift")) {
    event.preventDefault();
    rejectCurrentQuestion();
    return;
  }
  if (event.key === "ArrowLeft") moveStep(-1);
  if (event.key === "ArrowRight") moveStep(1);
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    moveStep(1, true);
  }
});

if ("speechSynthesis" in window) {
  window.speechSynthesis.addEventListener("voiceschanged", renderVoiceOptions);
}

renderVoiceOptions();
renderMap();
