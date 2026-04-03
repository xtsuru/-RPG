function portal() {
  getGame().innerHTML = `
    <h2>🌀 포탈</h2>
    ${renderTop()}
    <div class="panel">
      <p>아직 다음 차원은 열리지 않았다.</p>
    </div>
    ${renderBackToFieldButton()}
    <div style="margin-top: 12px;">${renderShopButton()}</div>
  `;
}

function field() {
  getGame().innerHTML = `
    <h2>🌍 필드</h2>
    ${renderTop()}

    <div class="row">
      <button onclick="startBattle('slime')">🟢 슬라임과 전투</button>
      <button onclick="startBattle('kingSlime')">👑 킹 슬라임과 전투</button>
      <button onclick="portal()">🌀 포탈</button>
      ${renderShopButton()}
    </div>

    <div class="big-char">👤</div>

    <div class="panel">
      <p>시작의 초원이다.</p>
      <p>슬라임 2마리를 잡으면 레벨업이다.</p>
      <p>킹 슬라임을 잡으면 바로 레벨업이다.</p>
    </div>
  `;
}

field();
