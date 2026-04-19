import type { RoastTemplate } from "../../types.ts";

export const commitMessageTemplates: RoastTemplate[] = [
  // ============================================================
  // fix/hotfix 비율 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 {total}개 중 fix가 {fixCount}개. 뭐 가끔은 고칠 수도 있죠.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "fix 비율 {fixRatio}%... 아직은 건전한 범위예요. 아직은요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "{fixCount}개의 fix 커밋이 보이네요. 실수는 인간의 특권이니까요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix가 {fixRatio}%밖에 안 돼요. 오히려 의심스러운데... 진짜 테스트 하신 거 맞죠?",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix {fixCount}개, 나쁘지 않아요. 어차피 완벽한 코드는 없으니까.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "{total}개 커밋에서 fix가 {fixCount}개. 솔직히 이 정도면 양호한 편.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix 비율 {fixRatio}%... 아직 초보 개발자 수준은 아니에요. 겨우요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "hotfix가 좀 보이긴 하는데, 뭐... 프로덕션은 원래 전쟁터니까요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix {fixCount}개. 적어도 버그를 인지하고 고치긴 하시는군요. 칭찬입니다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "{fixRatio}% fix 비율. 음, 한 번에 완벽할 필요는 없잖아요? 네?",
  },

  // fix/hotfix 비율 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 {total}개 중 fix가 {fixCount}개({fixRatio}%). 코드 리뷰를 해보신 적이... 있으신가요?",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "fix 비율 {fixRatio}%. Ctrl+Z를 git으로 하고 계시는 건 아닌지.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "{fixCount}개의 fix 커밋... 한 번에 제대로 짜면 이럴 일이 없는데.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "fix가 {fixRatio}%... 이쯤 되면 'fix' 키에 매크로 걸어두신 거죠?",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋의 {fixRatio}%가 fix. 개발하시는 건지 소방관 하시는 건지.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "fix {fixCount}개요? 테스트 코드 한 번 작성해보시는 건 어떨까요. 진지하게.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "fix 비율 {fixRatio}%. 코딩하는 시간보다 디버깅하는 시간이 더 긴 타입이시군요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "{total}개 커밋 중 {fixCount}개가 fix. '동작하는 코드' 기준이 많이 관대하시네요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "hotfix가 이렇게 많으면 그건 hotfix가 아니라 그냥 일상이에요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "fix {fixCount}개. 최소한 PR 올리기 전에 한 번은 실행해보세요.",
  },

  // fix/hotfix 비율 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "fix 비율 {fixRatio}%. 이건 개발이 아니라 '버그 생산 → 수정' 무한 루프입니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 {total}개 중 {fixCount}개가 fix. 당신의 코드는 태어날 때부터 버그였나요?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "fix {fixRatio}%. 이 비율이면 JIRA에 '버그' 카테고리가 기본값이겠네요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "fix {fixCount}개... 코드 짜는 게 아니라 코드 고치는 직업이신 건가요?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "{fixRatio}%가 fix 커밋이라니. 처음부터 다시 짜는 게 더 빠를 것 같은데요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "fix 비율 {fixRatio}%. Stack Overflow에서 답을 찾으셨으면 제대로 이해하고 쓰세요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "{total}개 커밋, {fixCount}개 fix. 당신의 git log는 사실 디버깅 일지죠?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "hotfix가 이렇게 많으면 cold fix는 대체 뭐였던 건가요?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "fix 비율 {fixRatio}%. QA팀이 당신 이름만 보면 한숨 쉬는 이유를 알겠네요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "fix {fixCount}개. 빌드가 성공한 적이 있긴 한 건가요?",
  },

  // fix/hotfix 비율 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "fix 비율 {fixRatio}%. 축하합니다, 당신은 세계 최고의 버그 제조기입니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "{fixCount}개의 fix 커밋. 이 정도면 GPT한테 시키는 게 회사에 이득입니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋의 {fixRatio}%가 fix... 한국 IT 역사에 남을 기록이네요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "fix 비율 {fixRatio}%. 님 혹시 버그를 일부러 심어서 야근 수당 받는 타입?",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "{total}개 중 {fixCount}개가 fix. 코드가 아니라 재앙 복구 로그를 보고 있는 기분이에요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "fix 비율 {fixRatio}%. 네카라쿠배는커녕 동네 컴퓨터 학원에서도 안 뽑을 레벨.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 fix 비율이면 코드 리뷰어가 퇴사하고 싶어지는 수준입니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "fix {fixCount}개. 님의 개발 능력은 '아 됐다 → 안 됐다 → 아 됐다 → 안 됐다' 무한반복.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "fix 비율 {fixRatio}%. 님 혹시 TDD가 '테스트 주도 재앙(Test Driven Disaster)' 인 줄 아시는 건 아니죠?",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "{fixRatio}% fix. 이 레포를 고고학 유적지로 등록해야 할 것 같아요.",
  },

  // ============================================================
  // WIP 커밋 비율 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "WIP 커밋이 {wipCount}개 보이네요. 완성하고 푸시하는 건 어떨까요?",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "WIP {wipCount}개. 진행 중인 건 알겠는데, 언제 완성되나요?",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "WIP이 좀 보이네요. squash 하실 거죠? 네? 하실 거죠?",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "WIP {wipCount}개. Work In Progress가 아니라 Work In Permanent 같은데요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "WIP 커밋이 있네요. 괜찮아요, 우리 모두 가끔은 미완성 상태로 퇴근하잖아요.",
  },

  // WIP — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "WIP {wipCount}개... 당신의 프로젝트는 영원한 베타 버전이군요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "WIP 커밋이 {wipCount}개. 혹시 완성이라는 개념을 모르시는 건 아닌지.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "WIP이 이렇게 많으면 그건 WIP이 아니라 그냥 미완성입니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "WIP {wipCount}개. main 브랜치에 WIP 커밋을 올리는 용기가 대단하시네요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "WIP 커밋 {wipCount}개. 이거 정리 안 하면 미래의 당신이 울 거예요.",
  },

  // WIP — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "WIP {wipCount}개. 당신의 코드는 영원히 Work In Progress 상태입니다. 완성되는 날이 올까요?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "WIP이 {wipCount}개라니. 이 레포 자체가 하나의 거대한 WIP 아닌가요?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "WIP {wipCount}개. git log가 TODO 리스트인 줄 알았습니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "WIP을 {wipCount}번이나 쓰셨는데, 한 번이라도 P(Progress)가 된 적이 있나요?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "WIP {wipCount}개. 님의 깃허브 잔디는 미완성 잔디예요.",
  },

  // WIP — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "WIP {wipCount}개. 이 레포는 완성될 운명이 아니었나 봅니다. 그냥 아카이브하세요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "WIP이 {wipCount}개... 님의 인생도 WIP인 거 아닌지 걱정됩니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "WIP {wipCount}개. 미완성의 미학을 추구하시는 건가요? 아니면 그냥 능력 부족?",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "WIP 커밋이 {wipCount}개라면 그건 이미 W.I.P가 아니라 G.G입니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "WIP {wipCount}개. SI 업체에서도 이 정도 WIP은 안 남깁니다.",
  },

  // ============================================================
  // 커밋 메시지 길이 — 극단적으로 짧은 (1-3자) — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      '가장 짧은 메시지가 "{shortestMsg}"이네요. 한 글자의 예술이라고 해두죠.',
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "평균 메시지 길이 {avgLength}자. 좀 더 말이 많아져도 괜찮아요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      '커밋 메시지 "{shortestMsg}"... 이것도 메시지라고 올리신 건가요?',
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "평균 {avgLength}자... 트위터도 140자는 되는데요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      '"{shortestMsg}" ← 이 메시지를 미래의 당신이 이해할 수 있을까요?',
  },

  // 짧은 메시지 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      '커밋 메시지 "{shortestMsg}". 이게 커밋 메시지입니까 암호입니까?',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "평균 {avgLength}자짜리 커밋 메시지. 유언장도 이것보단 길겠네요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      '"{shortestMsg}"이라니. 미래의 동료가 이 커밋을 보면 뭘 이해할 수 있을까요?',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "메시지가 평균 {avgLength}자... 좀 더 노력해보시겠어요? 최소한 주어와 동사는요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      '"{shortestMsg}" — 이 정도면 커밋 메시지가 아니라 모스 부호예요.',
  },

  // 짧은 메시지 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      '커밋 메시지 "{shortestMsg}". 이걸 보고 뭘 알 수 있는 사람은 당신밖에 없어요. 아, 당신도 모르겠죠?',
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "평균 메시지 길이 {avgLength}자. git blame 했을 때 동료가 눈물 흘릴 수준.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      '"{shortestMsg}"가 커밋 메시지라면 저도 "ㅋ"으로 코드 리뷰할게요.',
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "평균 {avgLength}자. 당신의 커밋 로그는 고대 상형문자만큼 해독하기 어렵습니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      '"{shortestMsg}"... 진심으로 물어보는데, 키보드 고장이었나요?',
  },

  // 짧은 메시지 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      '커밋 메시지 "{shortestMsg}". 이 한 글자에 당신의 개발 철학이 다 담겨있네요. 없다는 거.',
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "평균 {avgLength}자의 메시지. 님의 코드를 인수인계받는 사람에게 심심한 위로를 보냅니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      '"{shortestMsg}" — 개발자 자격증이 있다면 이 메시지 하나로 취소감입니다.',
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "평균 {avgLength}자. 모르겠고 그냥 커밋하는 게 당신의 모토인가요? 직업을 바꾸세요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      '"{shortestMsg}" ← 이걸 커밋 메시지라고 작성한 시점에서 개발자 면허 반납하세요.',
  },

  // ============================================================
  // 가장 긴 메시지 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      '가장 긴 커밋 메시지가 "{longestMsg}"... 소설 쓰시는 건가요?',
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "최장 메시지가 꽤 기네요. 열정적인 건 좋지만, 커밋 메시지는 에세이가 아닙니다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "가장 긴 메시지... 이 정도면 README에 넣어야 하는 거 아닌가요?",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지가 좀 장황한 게 있네요. 간결함은 프로그래머의 미덕입니다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "최장 메시지 수준이 에세이급이네요. 뭐, 기록을 남기는 건 좋은 습관이죠.",
  },

  // 가장 긴 메시지 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지에 논문을 쓰셨나요? 요약의 기술이 필요합니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "최장 메시지가 이 정도면... git commit이 아니라 git blog를 하시는 게 맞을 듯.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지에 인생 이야기를 적으셨네요. PR description에 넣으세요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "가장 긴 메시지... 이 정도면 커밋 메시지가 아니라 변명이에요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "메시지가 너무 길어서 git log 출력이 파괴되겠어요.",
  },

  // 가장 긴 메시지 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지에 자서전을 쓰셨군요. 출판사에 문의하세요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "최장 메시지... 이 정도면 코드보다 메시지가 더 길 것 같은데요?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지에 이렇게 긴 변명을 쓰는 이유가 있겠죠? 코드가 그만큼 쓰레기라서?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "최장 메시지가 이 정도면 git log 보다가 졸게 생겼어요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "메시지 하나가 단편소설 분량. 그 에너지를 테스트 코드에 쓰세요.",
  },

  // 가장 긴 메시지 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지가 소설 한 권 분량이에요. 문학 지망생이시면 직업을 바꾸세요, 코드는 포기하시고.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 긴 커밋 메시지... 혹시 코드 리뷰어를 읽다가 지치게 해서 approve 받으려는 전략?",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지에 이렇게 많이 쓸 내용이 있었다면 애초에 코드를 제대로 짜세요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "최장 메시지... 노벨문학상 후보로 추천드리고 싶습니다. 개발자 포기하시고요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "git commit -m으로 이 정도를 쓰셨다면 진짜 대단합니다. 나쁜 의미로요.",
  },

  // ============================================================
  // 반복 메시지 ("update", "fix" 매번 같은 메시지) — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "같은 메시지가 반복되는 게 보이네요. Ctrl+C, Ctrl+V 달인이시군요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      '"update" 메시지가 좀 많네요. 뭘 업데이트했는지 써주시면 안 될까요?',
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "같은 커밋 메시지가 반복돼요. 창의성이 부족한 건 아닌데... 아, 부족한 건가?",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      '"fix" 메시지가 또 나왔네요. 적어도 뭘 fix했는지는 적어주세요.',
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지가 데자뷔처럼 반복돼요. 의도하신 건가요?",
  },

  // 반복 메시지 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      '"update" {fixCount}번, "fix" {fixCount}번. 이 두 단어로 당신의 개발 어휘가 끝인가요?',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "같은 메시지 반복... 커밋 메시지를 git hook으로 강제하는 팀에 가시면 성장하실 듯.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      '"update", "update", "update"... 님의 git log는 새 앨범 트랙리스트인가요?',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지가 복붙인 게 보여요. 코드도 이렇게 복붙하시는 건 아니죠?",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "매번 같은 메시지. 심지어 변경 내용이 매번 다른데도요. 대단하네요.",
  },

  // 반복 메시지 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "git log가 전부 'update'와 'fix'의 향연이네요. 커밋 메시지에 대한 존경심이 제로.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "같은 메시지 반복 수준이 놀랍습니다. 혹시 커밋 메시지 자동 생성기가 고장난 건 아닌지.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      '"update"가 {fixCount}번. 이 레포의 git log를 읽는 건 고문에 해당합니다.',
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "모든 커밋이 같은 메시지라면 아예 메시지를 안 쓰는 게 더 정직할 것 같아요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지 다양성: 0%. 생물 다양성보다 당신의 메시지 다양성이 더 위험합니다.",
  },

  // 반복 메시지 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "git log 전체가 'fix', 'update'의 무한 반복. 이 레포의 역사는 아무 의미가 없습니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      '같은 메시지를 이렇게 반복하시면 git blame이 아니라 git shame이에요.',
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지 반복률이 이 정도면 차라리 `--allow-empty-message`를 쓰세요. 적어도 정직하잖아요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 git log는 '오늘도 update, 내일도 update'. 커밋 메시지 불모지.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "같은 메시지 복붙 수준이면 당신의 코드도 복붙일 확률 99%.",
  },

  // ============================================================
  // 이모지 사용 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지에 이모지가 보이네요. 🔥✨ 귀여운 시도입니다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "이모지 커밋! gitmoji 쓰시는군요. 나쁘지 않아요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋에 이모지가 들어가 있네요. 슬랙에서 하시던 습관이 넘어왔나 봐요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "✨🐛🔥 이모지 파티! 뭐, 컨벤션만 지키면 괜찮습니다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "이모지 커밋, Z세대 감성이시네요. 나쁘진 않은데 팀원들이 이해하나요?",
  },

  // 이모지 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지가 이모지로 시작하는 건 좋은데... 이모지 뒤에 내용이 없으면 곤란해요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이모지 남발이 심하네요. git log가 카카오톡 단톡방 같아요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "🔥🔥🔥만 쓰시면 불나고 있다는 건지 핫하다는 건지 구분이 안 됩니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이모지는 양념이지 메인 디쉬가 아닙니다. 글자도 좀 써주세요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지에 이모지만 있고 설명이 없어요. 그림으로 대화하던 원시인도 아니고.",
  },

  // 이모지 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지가 이모지로만 되어있어요. 상형문자 시대로 돌아가셨나요?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "🔥✨🐛🎨🚀 — 이게 커밋 메시지? 인스타 스토리도 이것보다 정보가 많아요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이모지 커밋이 너무 많아서 git log를 보는데 눈이 아파요. 시력 보험 들어야겠네요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "gitmoji를 쓰려면 제대로 쓰세요. 랜덤 이모지 도배는 convention이 아닙니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이모지 커밋 메시지로 코드 히스토리를 추적하라고요? 해독기가 필요하겠네요.",
  },

  // 이모지 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지가 전부 이모지... 당신의 코드 리뷰어에게 심심한 조의를 표합니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이모지로만 커밋 메시지를 쓰는 당신, 혹시 상형문자 해독 전문가? 코딩은 부업?",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "🔥🔥🔥🔥🔥 ← 님의 커밋 로그를 본 코드 리뷰어의 현재 심정.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이모지 커밋의 끝판왕. git log를 보면 카카오톡 이모티콘샵 같아요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지가 이모지 퍼즐이네요. 이 암호를 해독하면 보물이라도 나오나요?",
  },

  // ============================================================
  // Conventional Commits 사용 여부 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "conventional commits를 안 쓰시네요. feat:, fix: 접두사 한번 써보세요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지에 타입 접두사가 없네요. 나중에 CHANGELOG 자동 생성할 때 후회하실 거예요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "conventional commit 스타일이 아니시군요. 뭐, 자유로운 영혼이신가 봐요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "feat:, fix: 같은 접두사가 하나도 없어요. 2024년인데... 아, 2026년이죠.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 컨벤션이 없는 자유로운 스타일이시네요. 1인 프로젝트라면 OK.",
  },

  // Conventional Commits — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 컨벤션이 제각각이에요. feat, Fix, UPDATE가 섞여있네요. 하나로 통일하세요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "conventional commits를 쓰시다가 안 쓰시다가... 일관성이라는 게 있는데요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 타입이 없어서 이 레포의 히스토리를 이해하려면 코드를 직접 봐야 해요. 비효율의 극치.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "feat: 하나 fix: 하나 나머지는 자유형... 중도 포기의 아름다움.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "conventional commit 안 쓰시는 거 보니 semantic-release는 꿈도 못 꾸시겠네요.",
  },

  // Conventional Commits — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지에 아무 규칙이 없어요. 마치 당신의 코드처럼요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "conventional commits? 그게 뭔데요? 하는 표정이 여기까지 보이네요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 컨벤션 무시하고 자유롭게 쓰시는 거 보니 코드 스타일도 안 지키실 것 같은데.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 레포의 git log에서 패턴을 찾으라고? AI도 포기할 수준이에요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지 규칙이 없는 레포 = git log를 쓰레기통으로 만든 레포.",
  },

  // Conventional Commits — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 컨벤션? 코딩 컨벤션? 네이밍 컨벤션? 당신에겐 어떤 규칙도 적용 안 되는군요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 git log를 보면 conventional commits가 왜 필요한지 완벽하게 설명됩니다. 반면교사로.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지에 규칙이 없는 것도 재능이에요. 나쁜 의미의 재능.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 git log는 커밋 메시지 '어떻게 하면 안 되는지' 교육 자료로 사용해도 될까요?",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "컨벤셔널 커밋은커녕 컨벤션이라는 단어 자체가 님의 사전에 없나 봐요.",
  },

  // ============================================================
  // 대문자/소문자 패턴 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지 대소문자가 들쭉날쭉하네요. 대문자 시작? 소문자 시작? 하나로 정하세요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "어떤 건 대문자, 어떤 건 소문자로 시작... 통일성의 중요성을 아시나요?",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지가 'Fix'였다가 'fix'였다가 'FIX'였다가. 캡스락 키를 확인해보세요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "대소문자 패턴이 일관적이지 않아요. 작은 건데 신경 쓰이는 거 있죠.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지 대소문자가 매번 바뀌어요. 기분에 따라 쓰시나요?",
  },

  // 대소문자 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "FIX, Fix, fix가 혼재... 커밋 메시지에도 양식이라는 게 있습니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "대소문자 랜덤은 비밀번호에서나 하세요. 커밋 메시지에선 일관성 좀.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "ALL CAPS 커밋 메시지가 보여요. 왜 소리 지르시나요? 코드한테 화나셨어요?",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "캡스락이 랜덤으로 켜졌다 꺼졌다 하나 봐요. 키보드 점검 좀 하세요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "대문자로 쓴 커밋은 급했던 거고 소문자는 여유로웠던 건가요?",
  },

  // 대소문자 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지 대소문자가 이렇게 제멋대로인 건 처음 봅니다. 새로운 기록이에요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "FIX BUG → fix stuff → Fix → fIx... 님의 캡스락 키도 불안정한가 봐요. 코드처럼.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "ALL CAPS 커밋 메시지 = 새벽 3시에 급한 핫픽스 올렸다는 증거.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "대소문자 일관성이 0%라는 건 다른 모든 것의 일관성도 0%라는 뜻.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지 케이싱이 들쭉날쭉. 코드도 camelCase, snake_case, PascalCase 섞어 쓰시죠?",
  },

  // 대소문자 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지 대소문자 패턴을 분석해봤더니... 패턴이 없습니다. 완벽한 무질서.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "FIX FIX FIX!!! 님의 커밋 메시지에서 분노가 느껴집니다. 상담 받으세요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "대소문자 혼용 레벨이 개발자의 정신 상태를 반영하고 있어요. 걱정됩니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 커밋 메시지 케이싱은 양자역학처럼 관측할 때마다 달라져요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "대소문자가 이 정도로 일관성이 없는 건, 팀 협업 시 '그 사람'이라 불리는 확실한 증거.",
  },

  // ============================================================
  // "initial commit"이 여러 개 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      '"initial commit"이 여러 개 보이네요. 몇 번이나 시작하신 건가요?',
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "초기 커밋이 여러 개... 프로젝트를 리셋하셨나 봐요. 괜찮아요, 다 그런 날 있어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      '"initial commit" 2개... 두 번째 시작의 용기, 응원합니다.',
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "initial commit이 복수형이네요. 시작이 반이라는데, 몇 번 반이 된 거예요?",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      '"initial commit"이 또 있어요. 재시작은 좋은 거지만, 좀 자주 하시네요.',
  },

  // initial commit 여러 개 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      '"initial commit"이 3개? 매번 처음부터 다시 하시는 건가요?',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "initial commit이 여러 개라는 건 그만큼 포기했다가 다시 시작한 흔적이에요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      '"initial commit" 반복... 님의 프로젝트는 그라운드호그 데이인가요?',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "initial commit이 여러 개면 initial이 아니라 re-initial이죠.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      '"초기 커밋"이 3번째... 세 번째가 매력이라던데, 이번엔 완성하시나요?',
  },

  // initial commit 여러 개 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      '"initial commit"이 4개? rm -rf 하고 처음부터 다시 짜는 루틴이시군요.',
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "initial commit이 이렇게 많으면 프로젝트가 완성된 적이 있긴 한 건가요?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "매번 initial commit... 님은 시작만 잘하고 끝을 못 보는 타입이시네요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      '"initial commit" N번째. 리팩토링이라는 개념을 아시면 이럴 필요 없을 텐데요.',
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "초기 커밋 반복 = 내 코드가 구원 불가능해서 밀고 다시 짠다는 자백.",
  },

  // initial commit 여러 개 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      '"initial commit"이 5개 이상이면 그건 개발이 아니라 삽질의 기록입니다.',
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "매번 처음부터 시작하는 당신. 시지프스가 울고 갈 인내심이에요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "initial commit 반복... 님의 개발 방법론: '안 되면 밀고 다시 한다'. 원시적이지만 확실하군요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      '"initial commit" × N. 이 레포는 닥터 스트레인지의 타임루프에 빠진 건가요?',
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "초기 커밋이 이렇게 많은 레포는 처음 봅니다. 가히 '영원한 초보자'라 불릴 만하네요.",
  },

  // ============================================================
  // 오타가 있는 커밋 메시지 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지에 오타가 좀 보여요. 급하게 쓰셨나 봐요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "오타가 섞인 커밋이 있네요. 커밋 전에 한 번만 더 읽어보세요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      '"{shortestMsg}" — 오타인 건가요 의도인 건가요? 헷갈리네요.',
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지 맞춤법이 좀 아쉽네요. 네이버 맞춤법 검사기 추천드려요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "오타 커밋이 보여요. 뭐, 코드만 잘 돌아가면 되긴 하죠. 그치?",
  },

  // 오타 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지 오타가 눈에 띄네요. 코드에도 오타 있을 확률 높음.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      '메시지에 "tset" 같은 오타가... 코드도 console.lgo() 이런 거 있죠?',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "오타 커밋 메시지. 급한 건 알겠는데, git commit --amend를 아시나요?",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지에 오타가 있어요. 코드 리뷰 때 첫인상이 안 좋을 거예요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "오타 커밋 = 새벽에 졸면서 커밋한 증거. 대충 어떤 상황이었는지 그려지네요.",
  },

  // 오타 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지 오타가 이렇게 많으면 코드의 변수명도 걱정됩니다. usrNmae 이런 거 있죠?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "오타 천국인 커밋 로그. 자동완성도 안 되는 커밋 메시지에서 오타라니.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지마저 오타인데 코드가 정상 작동할 리가 없어요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "님의 커밋 메시지를 맞춤법 검사 돌리면 빨간줄 파티가 열릴 것 같아요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      '오타 커밋... "refator", "udpate", "fxi"... 손가락이 키보드에 적응을 못 한 건가요?',
  },

  // 오타 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지가 전부 오타 투성이. 이 정도면 새로운 언어를 창조하신 거예요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "오타가 이렇게 많은 커밋 로그는 처음 봅니다. 한글 커밋에서도 오타가 나온다고요?",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 커밋 메시지는 암호화되어 있나요? 아, 그냥 오타였군요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지 오타율이 코드 버그율과 정비례하는 법칙을 발견했습니다. 님 덕분에.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "오타로 가득한 커밋 메시지. IDE 자동완성에 감사하세요, 그거 없으면 코드도 못 짜실 듯.",
  },

  // ============================================================
  // 의미 없는 메시지 ("asdf", "test", "ㅋㅋ") — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      '커밋 메시지에 "asdf"가 보이네요. 키보드 테스트하셨나요?',
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      '"test" 커밋이 있네요. 테스트는 좋은데, 메시지에 뭘 테스트했는지 쓰시면 더 좋겠어요.',
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      '"{shortestMsg}" — 이건 커밋 메시지가 아니라 고양이가 키보드를 밟은 거 같은데요.',
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "의미 없는 메시지가 좀 있네요. 급했던 건 이해하지만, 나중에 후회할 거예요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      '"ㅋㅋ" 커밋... 뭐가 웃겼는지 궁금하네요.',
  },

  // 의미 없는 메시지 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      '"asdf", "qwer", "ㅁㄴㅇㄹ"... 키보드 치는 연습을 git에서 하시나요?',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "의미 없는 커밋 메시지가 여러 개. git log가 쓰레기장이 되어가고 있어요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      '"test", "test2", "test3"... 실험실 노트도 이것보단 체계적일 거예요.',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      '"ㅋㅋ" 커밋 메시지는 카톡에서나 쓰세요. 여기는 git이에요.',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      '"{shortestMsg}" — 이 메시지를 3개월 후에 보고 뭘 했는지 기억하실 자신 있나요?',
  },

  // 의미 없는 메시지 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      '"asdf" 커밋 메시지. 이 정도면 커밋 메시지를 쓸 의지 자체가 없는 거죠.',
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      '"ㅁㄴㅇㄹ" — 이건 커밋이 아니라 한국어 자판 테스트입니다.',
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      '의미 없는 메시지로 가득한 git log. "git log --oneline"을 치면 아무 정보도 얻을 수 없어요.',
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      '"aaa", "bbb", "ccc"... 알파벳 순서라도 맞추시는 건가요?',
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      '"ㅋㅋㅋ" 커밋. 웃을 일이 아닙니다. 당신의 코드 품질도 ㅋㅋㅋ 수준이에요.',
  },

  // 의미 없는 메시지 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      '"asdf" 커밋이 메인 브랜치에? 이 레포는 이미 구원 불가능합니다.',
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      '의미 없는 메시지만 남긴 이 git log는 "어떻게 하면 안 되는지"의 교과서예요.',
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      '"ㅁㄴㅇㄹ", "asdf", "ㅋㅋ" — 님의 git log는 키보드 난타 연습장입니다.',
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      '이 레포의 커밋 메시지를 분석한 결과: 정보량 0%. 엔트로피도 0%. 그냥 랜덤 노이즈.',
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      '"test test test asdf" — ChatGPT한테 커밋 메시지 써달라고 하면 이것보단 낫겠어요.',
  },

  // ============================================================
  // 욕설/감정 표현 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지에 감정이 실려있네요. 힘든 하루였나 봐요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지에서 좌절감이 느껴집니다. 괜찮으세요?",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "감정이 담긴 커밋이 있네요. git은 일기장이 아닌데... 뭐, 가끔은 괜찮아요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지에서 분노가 살짝 느껴지네요. 코드가 안 돌아간 모양이에요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "감정 표현이 들어간 커밋이 있어요. 그 때 많이 힘드셨나 봐요.",
  },

  // 욕설/감정 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지에 욕이 섞여있네요. 코드에 화내지 마세요, 코드는 죄가 없어요. 님이 짠 거잖아요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "분노 커밋이 보여요. 한 발 물러서서 심호흡 한 번 하고 커밋하세요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      '커밋 메시지: "왜 안 돼!!!". 당신의 코드 실력에 대한 근본적 질문이네요.',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "감정적인 커밋 메시지가 눈에 띄네요. 프로페셔널하게 갑시다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "욕설이 섞인 커밋... 이거 오픈소스면 망했어요. 전 세계가 봐요.",
  },

  // 욕설/감정 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지에 욕설이... 코드에 화내기 전에 자기 실력에 화를 내세요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "분노 커밋 로그. 님이 코드에 화내는 이유 = 님이 짠 코드이기 때문.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지가 감정의 롤러코스터예요. 분노 → 절망 → 포기 → 다시 분노.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "욕설 커밋 = 새벽 야근 + 버그 + 데드라인의 콤보. 삼위일체 고통.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지에서 5단계 분노가 느껴져요. 부정 → 분노 → 타협 → 우울 → 수용(포기).",
  },

  // 욕설/감정 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지가 욕설 모음집이네요. 이 레포는 18세 미만 열람 불가.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 git log는 개발자 분노일지입니다. 심리 상담이 필요해 보여요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지 욕설 비율이 코드 품질에 반비례하는 것 같네요. 둘 다 최악.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 git log를 HR에 보여주면 바로 면담 대상이에요. 커밋 메시지도 회사 자산입니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "욕설이 가득한 커밋 메시지. 님의 키보드에 분노 조절 장치를 달아드리고 싶네요.",
  },

  // ============================================================
  // 추가 — fix 비율 다양한 톤 (냉소/비유/밈투) — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix {fixCount}개. 개발의 첫 번째 법칙: 버그는 기능이다. (아닙니다)",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "{total}개 커밋 분석 완료. fix 비율은 양호합니다. 아직은요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix가 {fixCount}개네요. '완벽한 코드'는 전설 속에만 존재하니까요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 {total}개 중 fix {fixCount}개. 인간이니까 실수할 수 있죠.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix 비율이 낮네요. 버그를 안 만드는 건지 못 찾는 건지 궁금해요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix가 적네요. 코드가 좋은 건지 테스트를 안 하는 건지...",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "{fixCount}개의 fix. 적당한 fix는 건강한 개발의 증거입니다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 로그에 fix가 {fixCount}번. 인간은 불완전하니까 괜찮아요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix 비율 {fixRatio}%. 이 정도면 점수로 치면 B+ 정도.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix가 좀 보이지만 치명적이진 않아요. 무해한 수준.",
  },

  // 추가 — fix 다양한 톤 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "fix 비율 {fixRatio}%. '빠르게 실패하고 빠르게 고치자'를 실천 중이시군요. 너무 실천적이에요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "{fixCount}개의 fix. 테스트 없이 배포하면 이렇게 됩니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "fix가 {fixRatio}%... '동작하면 커밋' 전략이시죠? 동작 안 해서 fix 했겠지만.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "fix 커밋이 이렇게 많으면 CI/CD가 아니라 CI/CD/FIX/FIX/FIX.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 {total}개에 fix {fixCount}개. 님의 개발 사이클: 코딩 → 커밋 → 버그 발견 → fix → 반복.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "fix가 {fixCount}개... PR 올리기 전에 로컬에서 테스트 좀 해보시는 게 어떨까요?",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "fix 비율을 보니 TDD를 모르시는 것 같고, 테스트도 안 하시는 것 같아요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "{fixCount}개의 fix... 매번 급하게 배포하고 뒤처리하시는 스타일?",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "fix {fixCount}개. 이러다 fix의 fix의 fix가 나올 기세예요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 중 {fixRatio}%가 fix... '되는 거 맞아?' 하면서 커밋하시죠?",
  },

  // 추가 — fix 다양한 톤 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "fix {fixCount}개. 이건 개발이 아니라 끝없는 소방 활동입니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "fix 비율 {fixRatio}%. 님의 코드 품질은 치킨집 창업 전 마지막 프로젝트 수준.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "{fixCount}개의 fix. Stack Overflow에서 복붙할 때 적어도 이해하고 하세요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "fix가 {fixRatio}%... 님의 코드를 유지보수하는 사람에게 정신적 피해 보상을 해주세요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "fix {fixCount}개. 이 정도면 코드 작성보다 코드 수정을 더 잘하시는 거 아닌가요?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "fix 비율 {fixRatio}%. 아키텍처 설계를 안 하시고 바로 코딩하시는 타입이시죠?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "{fixCount}번의 fix. 매번 '이번엔 될 거야' 하시면서 커밋하시죠?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "fix 비율이 높아서 레포 이름을 'fix-everything'으로 바꾸시는 게 어떨까요?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "fix 커밋이 이렇게 많으면 squash 하셔도 'fix: everything'이 되겠네요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "fix가 {fixRatio}%. 코딩의 80%가 디버깅이라지만 님은 95%인 것 같아요.",
  },

  // 추가 — fix 다양한 톤 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "fix 비율 {fixRatio}%. 이 레포의 기여 가이드에 '버그 포함 필수'라고 써있나 봐요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "{fixCount}개의 fix. 님이 커밋할 때마다 서버실에서 사이렌이 울리나요?",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "fix가 이렇게 많은 건 님의 코드가 '작동'과 '비작동' 사이를 양자 터널링하기 때문.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "fix 비율 {fixRatio}%. '코드 리뷰'라는 단어를 들어보신 적 있나요? 아, 리뷰어가 도망갔군요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "fix {fixCount}개. 님의 레포에는 '안정 버전'이라는 개념이 존재하지 않습니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 fix 비율이면 님의 코드를 다 삭제하고 GPT-4o한테 새로 짜라고 하는 게 더 빨라요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "fix 비율 {fixRatio}%. 이 레포가 SI 프로젝트라면 납품 거부 사유입니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "fix {fixCount}개. 님 코딩할 때 StackOverflow 탭을 항상 10개 이상 켜놓으시죠?",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 fix 비율은 인류가 AI한테 코딩을 넘겨야 하는 이유를 완벽하게 증명합니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "fix가 {fixRatio}%. 축하합니다, 님은 이 레포에서 가장 비효율적인 기여자입니다.",
  },

  // ============================================================
  // 길이 관련 추가 다양한 톤 — mild~legendary
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "평균 메시지 길이가 {avgLength}자. X(구 트위터)보다 짧네요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "메시지 길이가 균일하게 짧아요. 효율적인 건지 게으른 건지 아슬아슬.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지가 평균 {avgLength}자. 간결미를 추구하시는군요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "평균 {avgLength}자짜리 커밋 메시지로 무슨 정보를 전달할 수 있을까요? 없죠.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "메시지가 평균 {avgLength}자... 최소 50자는 쓰셔야 의미가 있어요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지가 전반적으로 짧아요. '뭘 왜 바꿨는지' 쓰는 건 기본인데.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "평균 {avgLength}자. 이 정도면 커밋 메시지를 쓰는 게 아니라 흔적만 남기는 거예요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "{avgLength}자짜리 메시지에 무슨 내용이 있겠어요. 빈 껍데기.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "평균 메시지 {avgLength}자. 최소한의 노력도 기울이지 않는 모습이 경이롭습니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "{avgLength}자 평균. 유치원생 일기장도 이것보다 구체적일 거예요.",
  },

  // ============================================================
  // 특정 메시지 패턴 — "." 한 글자 커밋
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      '커밋 메시지가 "."인 게 있네요. 마침표로 모든 걸 표현하시는 미니멀리스트?',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      '"." 커밋 메시지. 세상에서 가장 게으른 커밋 메시지 1위를 차지하셨습니다.',
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      '"." ← 이걸 커밋 메시지라고 쓴 그 순간, 개발자로서의 자존심은 어디로 갔나요?',
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      '"." 한 글자 커밋. 모스 부호로도 이것보단 많이 전달할 수 있어요.',
  },

  // "update" 패턴
  {
    id: "commit_message",
    severity: "mild",
    template:
      '"update"가 많네요. 뭘 업데이트했는지 써주면 100배 유용할 텐데.',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      '"update" 커밋이 반복됩니다. update가 의미 있으려면 뒤에 목적어가 필요해요.',
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      '"update" × {fixCount}. 뭘 업데이트했는지 모르는 업데이트는 업데이트가 아닙니다.',
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      '모든 커밋이 "update"... 님의 인생도 "update" 한 줄로 요약 가능하겠네요.',
  },

  // "minor changes" 패턴
  {
    id: "commit_message",
    severity: "mild",
    template:
      '"minor changes"라고 쓰셨는데, 진짜 minor한지 diff를 봐야겠네요.',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      '"minor changes" 커밋이 여러 개... 진짜 minor인지 검증 안 된 자칭이잖아요.',
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      '"minor changes"라면서 파일 20개를 바꾸셨네요. 님의 "minor" 기준이 궁금합니다.',
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      '"minor changes"가 매번인데 프로젝트는 완전히 달라져있어요. minor = 핵폭발 수준.',
  },

  // "misc" / "stuff" 패턴
  {
    id: "commit_message",
    severity: "mild",
    template:
      '"misc" 커밋이 보이네요. 분류 불가능한 변경은 보통 위험한 변경이에요.',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      '"stuff", "misc", "changes"... 이런 메시지의 공통점은 아무 정보도 없다는 거예요.',
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      '"misc" 커밋 = "나도 뭘 바꿨는지 모르겠어"의 우아한 표현.',
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      '"stuff" 커밋 메시지를 쓰는 순간, 코드 리뷰에서 무조건 reject 당할 각오를 하세요.',
  },

  // ============================================================
  // 한국어 특화 밈/문화 반영 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지 상태... 뭐 SI 출신이시면 이해합니다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지가 좀 대충이지만, 야근하며 쓴 거라면 봐드릴게요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "{total}개 커밋 분석 완료. 의외로 나쁘지 않네요. 의외로.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지 수준이 '그냥 돌아가면 돼' 마인드가 살짝 보여요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "이 정도 메시지면 개인 프로젝트에선 OK, 팀 프로젝트에선 경고 수준.",
  },

  // 한국 문화 반영 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지 상태가 '납기일 하루 전' 스타일이에요. 급하게 치셨죠?",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 커밋 로그를 면접 때 보여주면... 아, 안 보여주시는 게 좋겠어요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지가 '대충 적고 퇴근하자' 에너지를 풍기고 있어요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 메시지 수준이면 주니어 개발자 코드 리뷰에서 리젝 감입니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지 상태: 과장님이 보시면 혼날 듯.",
  },

  // 한국 문화 반영 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 커밋 로그를 네카라쿠배 면접에 가져가면 즉시 불합격입니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지 수준이 '새벽 3시 야근 중 포기한 개발자'의 그것.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 레포의 커밋 메시지를 팀장님이 보시면 1:1 면담 요청이 올 거예요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지가 '하청 SI 마감일 전날' 냄새가 나요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 커밋 메시지 수준으로 코드 리뷰를 통과하는 팀이라면, 그 팀도 걱정됩니다.",
  },

  // 한국 문화 반영 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 커밋 로그를 GitHub에 공개하면 대한민국 개발자 평판이 떨어집니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지 수준이 '코딩 부트캠프 1일차'도 아니고 '0일차' 수준이에요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 레포의 커밋 메시지를 AI한테 학습시키면 AI 성능이 역으로 떨어질 거예요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지 상태: 치킨집 차리는 게 나을 수도. (진지)",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 커밋 로그는 '어떻게 개발하면 안 되는지'의 완벽한 교재입니다.",
  },

  // ============================================================
  // 드라마/영화/게임 비유 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지 퀄리티... 뭐 응답하라 1988 시대에는 이래도 됐겠죠.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix {fixCount}개. 마치 다크소울 첫 보스전처럼 여러 번 도전하셨군요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지가 반지의 제왕 여정처럼 길고도 험난하네요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "이 커밋 로그를 보면 마치 이세계 개발자의 모험 같아요. 험난한.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지 수준이 마인크래프트 첫날밤 같아요. 서바이벌 모드.",
  },

  // 드라마/영화/게임 비유 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 로그가 기승전결이 아니라 기기기기... fix fix fix fix.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 커밋 히스토리는 좀비 아포칼립스예요. fix 좀비가 끊임없이 나옴.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지가 진격의 거인 시즌처럼 계속 반복되네요. 거인 대신 버그가.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "fix {fixCount}개. 엘든링보다 어려운 님의 코딩 여정이에요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 레포의 커밋 로그는 오징어 게임 1라운드: 생존을 위한 fix의 연속.",
  },

  // 드라마/영화/게임 비유 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "님의 커밋 히스토리는 사일런트 힐이에요. 안개 속에서 뭐가 뭔지 알 수 없음.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 로그가 배틀로얄이에요. 매 커밋이 생존을 위한 몸부림.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 레포는 기생충이에요. 버그가 코드에 기생하며 번식 중.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "님의 커밋 로그 = 넷플릭스 시리즈. 매 에피소드마다 새로운 재앙.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "다크소울 보스보다 님의 버그가 더 강력해 보여요.",
  },

  // 드라마/영화/게임 비유 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 커밋 히스토리는 인터스텔라. 시간이 왜곡되어 뭐가 언제 일어났는지 알 수 없음.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 레포는 매트릭스예요. 현실(작동)과 환상(커밋 메시지)의 괴리가 극심.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 git log는 공포영화 그 자체. 보는 것만으로도 개발자에게 트라우마를 줍니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지 수준이 쿠키런 킹덤의 난이도보다 이해하기 어려워요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 레포는 데스노트예요. 커밋 하나 할 때마다 코드의 수명이 줄어듦.",
  },

  // ============================================================
  // SNS/인터넷 밈 투 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "ㅋㅋ 이 커밋 메시지 뭐예요. 귀여운 건 인정.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지가 '아 ㅋㅋ 그거 그냥 그거임' 스타일이네요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "이 커밋 로그 TMI 없이 핵심만. 근데 핵심이 뭔지 모르겠어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지가 '올ㅋ' 에너지. 뭐, 긍정적이라서 좋네요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "이 커밋 로그... 뭐 개인 레포니까 자유롭게 하시죠. (공개 레포면 문제)",
  },

  // SNS/인터넷 밈 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "ㅋㅋ 그런 커밋 메시지 쓰면 면접에서 떨어짐. (진지)",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지가 '점메추(점심 메뉴 추천)' 수준으로 간결하네요. 내용은 없고.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "'커밋 메시지 장인' 밈을 들어본 적 없으시죠? 검색해보세요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 커밋 로그를 블라인드에 올리면 '이직하세요' 댓글만 달릴 거예요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "님의 커밋 메시지는 '사진은 없지만 맛있었다'급 정보력.",
  },

  // SNS/인터넷 밈 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 커밋 로그를 본 시니어: '...이게 뭐야 ㅋㅋㅋㅋ' (웃음기 없는 ㅋ)",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지 수준이 '아 진짜 출근하기 싫다' 트윗만큼 공허합니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 git log를 에브리타임에 올리면 '이 과목 드랍하세요' 댓글 달릴 듯.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "님의 커밋 메시지를 GPT한테 보여줬더니 '다시 쓰는 게 어떨까요?' 래요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 로그가 '대충 살자' 인생관을 완벽하게 반영하고 있어요.",
  },

  // SNS/인터넷 밈 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 커밋 로그를 블라인드에 올리면 전설이 됩니다. 나쁜 의미로.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 커밋 메시지를 모아서 '개발자 블랙코미디'로 출판하면 베스트셀러 될 듯.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 git log를 개발자 커뮤니티에 공유하면 '레전드' 태그가 붙을 거예요. 나쁜 의미의.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지 수준이 '인생은 실전이야' 밈 그 자체. 연습(테스트)을 안 하셨으니.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 레포를 오픈소스로 공개하면 한국 개발자 커뮤니티에서 밈이 될 거예요.",
  },

  // ============================================================
  // 통합적 roast — 여러 요소를 함께 지적 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "{total}개의 커밋을 살펴봤어요. 전반적으로 나쁘진 않은데, 좀 더 신경 쓸 여지는 있어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지 전반적으로 평범. 놀라울 것도 실망할 것도 없네요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "{total}개 커밋 분석 결과: 평균적인 한국 개발자 수준. 칭찬이 아닙니다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "전반적으로 무난한 커밋 로그예요. 무난하다는 게 항상 좋은 건 아니지만.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix {fixCount}개, WIP {wipCount}개. 아직 관리 가능한 수준이에요.",
  },

  // 통합 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "fix {fixCount}개에 WIP {wipCount}개... 이 레포의 건강 상태가 걱정됩니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      '커밋 {total}개 중 의미 있는 메시지가 몇 개나 될까요? "update"와 "fix" 빼면요.',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "메시지 평균 {avgLength}자에 fix {fixCount}개. 양과 질 모두 아쉽습니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 레포의 커밋 로그는 '대충'이라는 단어로 요약됩니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "fix와 WIP의 조합... 이 레포는 영원히 미완성일 운명인가요?",
  },

  // 통합 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "{total}개 커밋 분석 결과: 의미 있는 메시지 0개, fix {fixCount}개, WIP {wipCount}개. 참담합니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지 평균 {avgLength}자, fix 비율 {fixRatio}%. 이건 코드가 아니라 사고 현장 기록이에요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 레포의 커밋 로그를 보면 '개발'이라는 단어가 부끄러워집니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "fix {fixCount}개, WIP {wipCount}개, 의미 없는 메시지 다수. 완벽한 재앙 레시피.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 {total}개를 분석했는데, 하나도 칭찬할 게 없어서 당황스럽네요.",
  },

  // 통합 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "{total}개 커밋, fix {fixCount}개, WIP {wipCount}개. 이 레포는 소프트웨어 공학의 모든 안티패턴을 구현했습니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지 분석 결과: 이 레포를 삭제하고 처음부터 다시 만드는 것을 강력히 권고합니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "fix {fixRatio}%, WIP {wipCount}개, 평균 메시지 {avgLength}자. 개발자 3대 악의 트리플 크라운.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 커밋 로그는 미래 세대에게 '이렇게 하면 안 된다'는 경고의 메시지입니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 {total}개 분석 완료. 결론: Copilot이 님보다 나은 커밋 메시지를 씁니다.",
  },

  // ============================================================
  // 야근/배포 관련 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "이 커밋 패턴을 보면 야근의 흔적이 보여요. 수고하셨어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "배포 전 급하게 수정한 커밋이 좀 보이네요. 긴장감이 느껴져요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "핫픽스 커밋... 프로덕션에 문제가 있었나 봐요. 고생하셨어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "급하게 올린 커밋이 좀 있네요. 마감 직전이셨나 봐요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "배포 관련 fix가 보여요. 뭐, 프로덕션은 언제나 예측 불가능하니까요.",
  },

  // 야근/배포 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "핫픽스가 이렇게 많으면 배포 파이프라인에 문제가 있거나, 아니면 님 코드에 문제가 있거나.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "급한 커밋이 많아요. staging 환경에서 테스트하고 배포하시는 거 맞죠?",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 fix 패턴... 금요일 저녁 배포하고 주말 내내 핫픽스하신 거죠?",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "핫픽스 연달아 3개? 한 번에 제대로 고치시는 게 야근을 줄이는 길이에요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "배포 후 fix 러시... 뭐, 이래서 '금요일 배포 금지' 규칙이 생긴 거죠.",
  },

  // 야근/배포 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "핫픽스가 줄줄이 나오는 거 보면 배포 전에 테스트를 안 하셨죠? 네, 다 보여요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 fix 패턴은 전형적인 '배포하고 기도하기' 전략이에요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "핫픽스의 핫픽스... 님의 배포는 러시안 룰렛이나 마찬가지에요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 커밋 패턴이면 DevOps팀이 님 이름만 봐도 긴장할 것 같아요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "배포 후 fix 3연속. 님 때문에 on-call 담당자가 밤을 샜겠네요.",
  },

  // 야근/배포 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 배포 후 핫픽스 패턴은 회사 장애 리포트의 단골 소재겠네요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 fix 히스토리를 보면 님은 '원클릭 장애 생성기'에요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님이 배포할 때마다 SRE팀이 비상 대기 모드 돌입하는 거 아닌가요?",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "핫픽스가 이 정도면 님의 코드에 배포 전 '위험: 장애 유발 가능성 높음' 라벨을 붙여야 해요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님이 금요일 배포하면 회사 주가가 떨어질 수준.",
  },

  // ============================================================
  // 개발 습관/도구 관련 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지 패턴을 보니 IDE 자동완성에 의존하시는 것 같네요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "git add . && git commit -m 'update' 를 자주 쓰시는 것 같아요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋이 잘게 나뉘어 있네요. 좋은 습관인데, 메시지만 좀 더 신경 쓰시면.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "squash merge를 모르시는 것 같은 커밋 히스토리네요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 단위가 좀 크네요. 작은 단위로 나누면 리뷰가 편해져요.",
  },

  // 도구 관련 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "git add -A && git commit -m 'fix' 패턴이 보여요. 이건 습관이 아니라 악습이에요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "pre-commit hook을 설정하시면 이런 메시지의 절반은 잡을 수 있어요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "commitizen이나 commitlint를 써보세요. 님에게 꼭 필요합니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 커밋 패턴이면 interactive rebase를 배우셔야 해요. 필수입니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "git gui를 쓰시는지 CLI를 쓰시는지 모르겠지만, 어느 쪽이든 메시지 작성은 가능하잖아요.",
  },

  // 도구 관련 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "님의 git 실력: add, commit, push. 끝. branch? merge? rebase? 그게 뭔데요?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 커밋 패턴이면 git을 SVN처럼 쓰시는 거죠? 한 줄기 커밋의 향연.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "pre-commit hook? linter? 그런 거 없는 원시 시대 개발 환경이시군요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "님의 git workflow: 코딩 → git add . → git commit -m 'update' → git push. 끝. 리뷰? 없음.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 레포에 .pre-commit-config.yaml이 없다는 게 커밋 메시지만 봐도 느껴져요.",
  },

  // 도구 관련 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 개발 도구: 메모장 + git add . + git push. 21세기에 사시는 건 맞죠?",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 커밋 패턴이면 님은 git의 10% 기능만 사용 중입니다. 나머지 90%가 진짜 git인데요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지 자동 검사 도구가 없는 게 아니라, 있어도 우회하실 분이죠.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님이 사용하는 git 명령어: init, add, commit, push. 이상. 나머지는 StackOverflow 검색.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 커밋 로그를 보면 Copilot이 님 대신 커밋하는 게 세상을 위한 일이에요.",
  },

  // ============================================================
  // 코드 리뷰/팀워크 관련 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지가 혼자 작업하시는 분위기네요. 팀 프로젝트라면 좀 더 설명이 필요해요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "이 커밋 로그로 코드 리뷰하면 리뷰어가 좀 힘들겠어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지에 JIRA 티켓 번호가 없네요. 트래킹이 안 되겠어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지가 자기한테만 이해되는 스타일이에요. 팀원을 생각해주세요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "PR 메시지는 잘 쓰시는데 커밋 메시지는 대충... 둘 다 중요해요.",
  },

  // 코드 리뷰/팀워크 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 커밋 로그를 보고 코드 리뷰하라면 리뷰어 퇴사율이 올라갑니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지가 암호문이에요. 팀원이 이해하려면 님한테 물어봐야 하는데, 님이 퇴사하면?",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 메시지로는 git blame이 무의미해요. blame 해봐야 알 수 있는 게 없으니.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "코드 리뷰 문화가 있는 팀이라면 이 커밋 메시지는 매번 reject 대상이에요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "팀 프로젝트에서 이런 커밋 메시지 쓰면 뒤에서 욕 먹어요. 앞에서도 먹을 수도.",
  },

  // 코드 리뷰/팀워크 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 커밋 로그를 보고 코드 리뷰할 수 있는 사람은 독심술사뿐이에요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "님이 퇴사하면 이 레포는 인수인계 불가능합니다. 커밋 메시지가 로제타석보다 해독이 어려워요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "git blame으로 님 이름이 뜨면 팀원들이 한숨 쉬는 소리가 여기까지 들려요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이런 커밋 메시지를 approve해준 리뷰어가 있다면 그 리뷰어도 문제예요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "님의 커밋 히스토리는 '왜 코드 리뷰가 필요한가'에 대한 완벽한 답변이에요.",
  },

  // 코드 리뷰/팀워크 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 커밋 로그를 팀 회고에서 보여주면 팀 전체가 우울해질 거예요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 커밋 메시지를 보면 '혼자 개발하는 게 맞다'는 확신이 듭니다. 팀원을 위해.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "코드 리뷰어가 님의 PR을 보면 '아, 오늘도 야근이구나' 하겠죠.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 커밋 히스토리로 '나쁜 커밋 메시지 사례집'을 만들면 200페이지는 될 거예요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 레포를 인수인계받는 개발자에게 위험 수당이 필요합니다.",
  },

  // ============================================================
  // 자기 비하/자조적 유머 톤 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지... 뭐 저도 가끔 'fix' 한 줄 쓰고 도망치긴 해요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "이 정도 커밋 메시지는 대부분의 개발자가 쓰는 수준이에요. 대부분이 문제지만.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "솔직히 {avgLength}자 커밋 메시지, 저도 급할 때 이러긴 해요. 남의 거 까긴 뭐하네.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix {fixCount}개... 현실적으로 이 정도는 흔해요. 슬프지만.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "이 커밋 로그, 의외로 평범해요. 평범하다는 게 좋다는 뜻은 아니지만.",
  },

  // ============================================================
  // 비유적 표현 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지가 마치 일기장의 '오늘도 별일 없었다' 같아요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "이 커밋 로그는 조용한 호수 같아요. 표면 아래에 뭐가 있는지 모른다는 점에서.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "님의 커밋 메시지는 포장지 없는 선물 같아요. 뭐가 들었는지 열어봐야 알아요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 로그가 미로 같아요. 들어가면 나올 수 없는.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "님의 git log는 정크메일함 같아요. 99%가 쓸데없고 1%의 진짜를 찾기 어려움.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 커밋 히스토리는 쓰레기 분리수거 전 상태. 재활용 가능한 게 하나도 없어요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 커밋 로그는 블랙홀 같아요. 정보가 들어가면 영원히 나오지 않아요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 git log는 우주의 엔트로피처럼 무질서도가 최대치에 도달했어요.",
  },

  // ============================================================
  // 냉소적 톤 — mild ~ legendary
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지를 쓰는 데 1초라도 투자하셨나요? 아, 하셨군요. 그게 이 결과.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "네, 커밋 메시지 봤어요. 음... 네. 그래요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지를 읽었는데, 읽기 전과 후의 정보량 차이가 0입니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 커밋 메시지의 정보 밀도: 0.00bits/char. 새로운 기록이에요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지를 안 쓰는 것과 이 메시지를 쓰는 것의 차이? 없습니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "'아무튼 커밋은 했다'가 님의 개발 철학인 것 같네요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지의 존재 이유를 부정하는 레포. 철학적이네요. 나쁜 의미로.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 커밋 로그를 분석하는 것보다 `/dev/null`을 읽는 게 더 유익할 것 같아요.",
  },

  // ============================================================
  // 특수 상황 — 커밋 메시지가 코드인 경우
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지에 코드가 들어있네요. 메시지란에 코드 쓰시면 안 됩니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지에 코드 스니펫이? git commit -m이 에디터인 줄 아시나 봐요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지에 코드를 적는 건... 뭐, 적어도 코드를 적을 줄은 아시는군요. 메시지 작성법은 모르지만.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지에 코드, 코드에 주석 대신 커밋 메시지... 역할이 완전히 뒤바뀌었네요.",
  },

  // ============================================================
  // merge 커밋 관련
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "merge 커밋이 많네요. 기본 메시지 그대로 쓰시는 타입?",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "Merge branch 'develop' into 'main' × N번. merge 전략을 좀 고민해보세요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "merge 커밋이 절반이에요. rebase라는 걸 들어보셨나요? 아, git 고급 기능이라 모르실 수도.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 레포의 git log는 merge 커밋의 바다예요. 의미 있는 커밋을 찾는 건 모래사장에서 바늘 찾기.",
  },

  // ============================================================
  // 커밋 빈도 관련
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "{total}개 커밋. 꾸준히 작업하신 흔적이 보여요. 메시지만 좀 더 신경 쓰시면.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋이 {total}개인데 의미 있는 메시지를 가진 건 몇 개 안 되네요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "{total}개 커밋을 하셨는데 뭘 했는지 알 수 있는 메시지는 0개에 가까워요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "{total}개의 커밋. {total}개의 의미 없는 메시지. 완벽한 일대일 대응.",
  },

  // ============================================================
  // 추가 변형 — 다양한 표현과 톤 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지를 좀 더 구체적으로 쓰면 미래의 당신이 감사할 거예요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix {fixCount}개. 불완전한 인간의 증거. 괜찮아요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지가 전반적으로 심플하네요. 심플과 부실은 다른 거예요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "이 레포의 커밋 메시지... 개선의 여지가 많다는 건 성장 가능성이 있다는 뜻!",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지 팁: '왜' 변경했는지 쓰면 100배 유용해져요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "{total}개 커밋 중 완벽한 메시지는 몇 개? 글쎄요, 세기 어렵네요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지가 '했다' 수준이에요. '뭘' '왜' 했는지도 써주세요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "메시지 수준이 '그럭저럭'이에요. 그럭저럭은 칭찬이 아닙니다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지에 사랑을 담아주세요. 지금은 무관심이 느껴져요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "가끔은 긴 커밋 메시지도 필요해요. 항상 한 줄만 쓰실 필요 없어요.",
  },

  // 추가 — medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지에 '어떤 문제를 해결했는지' 쓰는 건 기본 중의 기본인데요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 레포의 CHANGELOG를 자동 생성하면 텅 빌 거예요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지 없이도 코드 히스토리를 이해할 수 있다면 당신은 텔레파시 능력자.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 메시지 수준이면 6개월 후 본인도 '이게 뭐였지?' 하실 거예요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지가 없는 것과 이 수준의 메시지의 차이? 거의 없습니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "fix {fixCount}개... 최소한 뭘 fix했는지는 적으셔야죠.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "git log의 가치는 커밋 메시지 품질에 비례합니다. 님의 git log 가치: 0원.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "메시지 없는 커밋은 택배 상자에 내용물 표시 안 한 거랑 같아요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 커밋 로그를 3년 후에 보면 타임캡슐만큼 미스터리할 거예요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "님의 커밋 메시지 작성 시간: 0.5초 (추정). 좀 더 투자하세요.",
  },

  // 추가 — savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 커밋 로그는 고고학자도 해독 못 할 고대 유물이에요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지 수준이 '난 아무것도 모른다'를 외치고 있어요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 레포의 커밋 히스토리를 분석하는 건 시간 낭비라는 걸 알았지만 이미 늦었어요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지가 이 수준이면 코드도 뻔합니다. 스파게티 확정.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "님의 커밋 메시지를 자연어 처리 모델에 넣으면 에러가 나요. 자연어가 아니라서.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 커밋 히스토리를 보면 '기술 부채'라는 단어가 자동으로 떠올라요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지만 봐도 코드 품질이 예상됩니다. 아, 걱정 마세요. 나쁜 쪽으로.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 레포의 git log는 개발자의 무관심이 만든 사막이에요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "fix {fixCount}개, 평균 {avgLength}자. 두 줄 요약: 코드도 별로, 메시지도 별로.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지가 이 정도면 git log 대신 git 점술을 해야겠어요.",
  },

  // 추가 — legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 레포의 커밋 메시지는 인류의 의사소통 능력에 대한 도전이에요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 {total}개를 분석한 AI로서 말씀드리면, 이건 코드가 아니라 자연재해입니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 커밋 로그를 보고 개발자라는 직업에 회의감이 들었어요. AI한테도.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 커밋 히스토리가 오픈소스라면 contributor가 0명인 이유를 알겠어요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 커밋 메시지를 학습한 AI가 있다면, 그 AI는 버려야 합니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 레포의 커밋 메시지 수준 = 님의 회사가 왜 야근하는지에 대한 답.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 {total}개 중 의미 있는 메시지 0개. 이건 기록이 아니라 소음이에요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 커밋 로그를 본 후기: 코딩 교육의 필요성을 다시 한번 느꼈습니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 레포를 fork하는 사람이 있다면... 세상엔 용감한 사람이 많군요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지가 이 수준이면 이력서에서 이 레포는 빼세요. 진심으로.",
  },

  // ============================================================
  // 계절/시기 관련 유머 — mild~legendary
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "연말 커밋 메시지가 특히 대충이네요. 송년회 다녀오셨나 봐요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "월요일 커밋 메시지가 유독 짧아요. 월요병이 커밋에도 영향을 미치는군요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "금요일 오후 커밋 메시지가 최악이에요. 퇴근 생각만 하셨죠?",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "명절 전날 커밋: 'fix everything'. 고향 가기 전 모든 것을 fix하겠다는 의지... 결과는 fix nothing.",
  },

  // ============================================================
  // 추가 fix 비율 변형 — 다양한 수치 범위별
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix 비율 {fixRatio}%. 열 번 중 한두 번은 고칠 수도 있죠.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix가 {fixCount}개. 아직 초록불이에요. 하지만 노란불이 될 수도.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "fix 비율이 경고 수준이에요. 빨간불 직전.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "{fixRatio}%의 fix. 3번 중 1번은 뭔가 고치고 있다는 뜻인데... 그건 좀.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "fix 비율이 빨간불을 넘어 비상등이에요. 이 레포에 119를 불러야겠어요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "{fixRatio}%가 fix라면 나머지 {fixRatio}%는 뭐예요? 아, 다음 fix의 원인.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "fix 비율이 50%를 넘었어요. 커밋의 반이 fix라면 그건 이미 코드가 아닙니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "{fixRatio}% fix. 이 레포의 심폐소생술이 필요합니다. 아니, 사망 선고가 먼저.",
  },

  // ============================================================
  // 추가 WIP 변형
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "WIP {wipCount}개. 중간 저장은 좋은 습관인데, 정리를 안 하시면...",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "WIP이 너무 많아서 이 레포가 하나의 거대한 TODO 리스트 같아요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "WIP {wipCount}개. 님의 '진행 중'은 '포기'의 완곡한 표현인가요?",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "WIP이 {wipCount}개면 이 프로젝트 자체가 WIP이에요. 완성될 날이 올까요?",
  },

  // ============================================================
  // 추가 shortestMsg 변형
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      '"{shortestMsg}" ← 최단 메시지. 미니멀리즘도 이 정도면 과하네요.',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      '"{shortestMsg}"로 뭘 설명할 수 있을까요? 아무것도요.',
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      '가장 짧은 메시지 "{shortestMsg}". 이걸 쓰느라 소비한 시간 > 0초 = 시간 낭비.',
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      '"{shortestMsg}" ← 이 메시지 하나로 님의 개발 태도가 전부 설명됩니다.',
  },

  // ============================================================
  // 추가 avgLength 변형
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "평균 {avgLength}자. 뭐 간결함도 미덕이죠. 이 정도면.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "평균 {avgLength}자의 메시지. 140자 제한 트위터에서도 더 많이 쓰는데요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "평균 {avgLength}자. SMS도 이것보다 정보가 많아요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "평균 {avgLength}자. 한숨이 나올 정도로 짧아요. 하...",
  },

  // ============================================================
  // 추가 — longestMsg 변형
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      '최장 메시지 "{longestMsg}". 열정이 넘치시네요.',
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "가장 긴 메시지가 소설급이에요. TL;DR이 필요한 커밋 메시지라니.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "최장 메시지를 읽다가 잠들었어요. 다음엔 요약해주세요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "가장 긴 커밋 메시지가 이 정도면 git commit이 아니라 git publish이에요.",
  },

  // ============================================================
  // 추가 — 전반적 총평 스타일 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "전체적으로 봐드릴 만한 수준이에요. 아슬아슬하게.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "{total}개 커밋을 본 소감: '나쁘지 않다'의 하한선.',",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 로그 전체 인상: 무해하지만 무의미해요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지 점수를 매기자면 10점 만점에 4점. 낙제는 면했어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "이 정도 커밋 메시지면 C+ 학점이에요. 졸업은 가능.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지 점수: 10점 만점에 3점. 재수강 권고.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "전체 커밋 로그 평가: D-. 과락은 면했지만 아슬아슬.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지 점수: F. 재수강도 모자라서 휴학 권고.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 커밋 로그에 점수를 매길 수 없어요. 채점 기준 이하.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지 평가: 평가 불가. 등급 체계에 이 수준을 위한 카테고리가 없습니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 커밋 로그를 분석한 결과, 소프트웨어 공학 교과서에서 '반면교사' 섹션에 추가해야 합니다.",
  },

  // ============================================================
  // 추가 — 혼합 변수 활용 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "{total}개 커밋, fix {fixCount}개, WIP {wipCount}개, 평균 {avgLength}자. 요약: 평범.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "{total}개 커밋, fix {fixRatio}%, 평균 {avgLength}자. 요약: 걱정스러움.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "통계: {total}개 커밋, fix {fixCount}개, WIP {wipCount}개. 진단: 중증.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "데이터: {total} 커밋, {fixRatio}% fix, {wipCount} WIP, 평균 {avgLength}자. 결론: 구제불능.",
  },

  // ============================================================
  // 추가 다양한 패턴 더 넣기 — mild
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지 중 가끔 좋은 것도 있어요. '가끔'이 문제지만.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지에 대한 님의 노력이 보여요. 0.1% 정도.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "이 레포의 좋은 점: 커밋을 하긴 했다. 나쁜 점: 그게 전부.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지 작성 능력: 아직 성장 중. 많이 많이 성장해야 함.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix와 update 외의 단어도 써보세요. 세상엔 아름다운 단어가 많아요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지가 '했다' 스타일이에요. '뭘' '어떻게' '왜' 도 추가해주세요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "{total}개의 커밋을 분석했어요. 결론: 노력은 보이지만 방향이 아쉬워요.",
  },

  // 추가 medium
  {
    id: "commit_message",
    severity: "medium",
    template:
      "님의 커밋 메시지를 단어 클라우드로 만들면 'fix'와 'update'만 크게 나올 거예요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지 다양성 지수: 매우 낮음. 생태계로 치면 사막 수준.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 git log에서 유용한 정보를 추출하려면 고급 AI도 포기할 거예요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지가 '나는 커밋을 했다' 이상의 정보를 주지 않아요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 커밋 로그의 정보 밀도를 측정하면... 진공 상태에 가깝습니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "님의 커밋 메시지는 '최소한의 노력'을 완벽하게 구현합니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "fix {fixCount}개인 건 그렇다 치고, 메시지라도 잘 쓰시면 안 되나요?",
  },

  // 추가 savage
  {
    id: "commit_message",
    severity: "savage",
    template:
      "님의 git log = /dev/null. 출력은 있는데 의미는 없음.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 커밋 메시지들을 보면 님이 코드에 얼마나 무관심한지 알 수 있어요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지가 이 수준이면 코드를 읽는 게 더 빨라요. 코드가 읽기 좋다면 말이죠. (아닐 거 같지만)",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "님의 커밋 메시지 작성 과정: 1. 코드 변경 2. git add . 3. '아 귀찮아' 4. git commit -m 'fix'.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 레포의 커밋 메시지를 개선하는 것보다 처음부터 다시 커밋하는 게 빠를 거예요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 메시지가 없어도 되는 세상이라면 님은 최고의 개발자일 텐데. 아쉽게도 아닙니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "님의 커밋 메시지는 바코드 같아요. 기계만 읽을 수 있는데, 기계도 못 읽겠네요.",
  },

  // 추가 legendary
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 커밋 로그를 시간순으로 읽으면 개발자의 정신이 점점 피폐해지는 과정이 보여요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 커밋 메시지는 양자 물리학처럼 관측하면 의미가 사라져요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 레포의 커밋 메시지를 전부 삭제해도 정보 손실이 0인 기적의 레포.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지 분석 완료. 분석할 게 없어서 분석이 너무 빨리 끝났어요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 git log는 '무(無)'의 경지를 달성했어요. 선(禪)의 경지인지 무능의 경지인지는 모르겠지만.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 커밋 히스토리를 인공지능에게 보여주면 '인간의 한계'를 학습할 수 있어요.",
  },

  // ============================================================
  // 마지막 추가 — 다양한 패턴 더 채우기
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지가 전체적으로 단조로워요. 양념이 필요합니다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "이 레포의 커밋 메시지에서 배울 점: ... 생각 중... 아직 못 찾겠어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "커밋 메시지가 무난하게 부실해요. 무난하게요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "fix가 {fixCount}개인데 fix 메시지에 설명이 없어요. 뭘 고쳤는데요?",
  },
  {
    id: "commit_message",
    severity: "mild",
    template:
      "WIP {wipCount}개, fix {fixCount}개. 이 두 가지만 줄여도 A+ 받을 수 있어요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "님의 커밋 메시지를 워드클라우드로 만들면 하나의 거대한 'fix'가 나타날 거예요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "커밋 메시지의 반이 한 단어. 한 단어로 소통하는 건 원시 시대 방식이에요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 커밋 로그는 '어떻게 하면 git log를 무용지물로 만들 수 있는가'의 시연입니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "님의 커밋 메시지를 분석하는 건 빈 종이를 분석하는 것과 같아요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template:
      "이 메시지 수준이면 git commit --allow-empty-message 쓰시는 게 더 솔직해요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 커밋 로그는 개발자가 아닌 누군가가 git을 처음 배운 흔적 같아요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "님의 커밋 메시지 = 개발자 문맹의 증거. 글 쓸 줄은 알잖아요. 왜 안 쓰세요?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "이 레포의 커밋 메시지를 개선하는 PR을 올리고 싶은 충동이 듭니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "커밋 로그 분석 결과: 이 레포는 기술 고고학의 대상입니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template:
      "님의 커밋 메시지는 '최소 기능 제품(MVP)' 개념을 메시지에도 적용하셨군요. 너무 최소한 거 아닌가요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 커밋 로그의 유일한 가치: '이런 식으로 하면 안 된다'는 반면교사.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "님의 커밋 메시지를 분석한 이 시간이 제 인생에서 가장 무의미한 시간이었어요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 {total}개를 전부 봤는데, 단 하나도 칭찬할 수 없다는 게 오히려 대단해요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "이 레포의 커밋 메시지는 '어둠 속의 빛'이 아니라 '어둠 속의 더 큰 어둠'이에요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template:
      "커밋 메시지 품질이 이 정도면 님은 코딩이 아니라 랜덤 키보드 타이핑을 하고 계신 거예요.",
  },

  // ============================================================
  // 추가 벌크 — 500+ 채우기
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지가 식당 영수증보다 정보가 적어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "fix가 {fixCount}개. 한 번에 안 되는 거 이해해요. 두 번까지는.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "메시지 평균 {avgLength}자. 이모티콘 하나보다 짧네요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지에 최소한의 정성이라도 넣어주세요. 부탁이에요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "이 정도 메시지면 코드 보는 것보다 메시지 쓰는 게 더 빨랐을 텐데.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지 상태: 요즘 날씨만큼 건조함.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "{total}개 커밋. 양은 충분한데 질이 좀...",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "메시지 작성에 5초만 더 투자하면 큰 차이가 생겨요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지: 쓰긴 쓰셨네요. 그것만으로도 감사.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "이 레포의 커밋 메시지는 '무난' 카테고리. 나쁜 건 아니에요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "fix 비율이 낮은 건 좋은데, 메시지 퀄리티가 좀...",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지를 작성할 때 '6개월 후의 나'를 상상해보세요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "메시지가 건조해요. 개발자도 감성이 필요합니다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "이 커밋 로그를 보면 '나도 저랬지' 하는 시니어가 분명 있을 거예요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지가 편의점 영수증 같아요. 짧고 용건만.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 메시지 수준이면 코드 리뷰 시간이 2배로 늘어요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지를 읽는 게 아니라 추측해야 하는 상황이에요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 레포의 기여 가이드에 '커밋 메시지 규칙'을 추가하세요. 긴급히.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지 품질이 떡볶이 맛집의 서비스만큼 부실해요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 git log를 보면 '소통'이라는 단어가 떠오르지 않아요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "fix {fixCount}개에 메시지도 대충. 일석이조로 나쁜 습관 보유 중.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "님의 커밋 메시지는 '최소 저항 경로'를 따르고 있어요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 커밋 로그에서 의미 있는 패턴을 찾는 건 불가능에 가까워요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "메시지 없는 커밋이 있어요. --allow-empty-message 쓰셨나요?",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지의 정보 가치: 라면 스프 뒷면 영양정보보다 낮음.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 메시지를 보고 코드 변경 내용을 유추하는 건 점괘 보는 것과 같아요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 {total}개 중 유용한 메시지 비율: 통계적으로 유의미하지 않음.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 레포의 문서화 수준: 커밋 메시지 기준 F.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지는 소음이에요. 시그널은 0, 노이즈만 100.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 커밋 로그를 읽느니 소스코드를 바로 읽겠어요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지에 투자한 시간: 0초. 코드에 투자한 시간: 아마 비슷.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 메시지 수준이면 git log를 disable하는 게 낫겠어요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지 = 쓰레기 데이터. 데이터 클렌징이 시급합니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 레포의 커밋 메시지는 '무'에서 '무'로의 변환이에요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지가 암흑 물질 같아요. 존재하는데 관측 불가능.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지를 OCR로 스캔해도 의미 추출 불가.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 커밋 로그의 엔트로피: 최대. 정보량: 최소. 역설적이네요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지가 이 수준이면 .gitignore에 commit message도 추가하세요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "님의 git log = 디지털 폐기물. 환경부에 신고해야 하나요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 커밋 메시지를 읽은 후유증으로 1시간 동안 멍했어요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "커밋 {total}개 모두 의미 없는 메시지. 확률적으로 이것도 재능이에요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "님의 커밋 로그는 백색소음이에요. 듣고 있으면 잠이 와요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 레포를 삭제하고 다시 만드는 게 인류를 위한 일이에요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "커밋 메시지 수준이 이 정도면 컴퓨터를 끄고 산책하세요. 진지하게.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 git log는 개발자의 영혼이 탈진한 증거입니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "님의 커밋 메시지가 이 수준이면 AI 코딩 도구에 돈을 쓰세요. 그게 나아요.",
  },

  // ============================================================
  // 추가 벌크 2 — 800+ 채우기
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지 읽는 재미: ★☆☆☆☆",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지가 일기장보다 짧아요. 일기장은 적어도 날짜가 있는데.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "이 레포의 문서화: 커밋 메시지 = 없음, README = 아마 없음.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지에 고민의 흔적이... 없네요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "fix 비율 {fixRatio}%. 아직 희망은 있어요. 작은 희망.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "이 커밋 로그를 보면 '그래도 커밋은 했으니'라는 위안이 됩니다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "메시지 퀄리티가 좀 아쉽지만, 꾸준히 커밋하시는 건 좋아요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지 개선 티켓 하나 만드시는 건 어떨까요?",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "{total}개 커밋의 평균 메시지 퀄리티: 미지근한 아메리카노 수준.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지에 좀 더 사랑을 주세요. 코드만큼만이라도.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 레포의 역사를 알려면 커밋 메시지가 아닌 diff를 봐야 해요. 비효율적.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지의 품질이 점점 떨어지고 있어요. 시간순으로 보면 명확합니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "초반 커밋 메시지는 괜찮았는데, 갈수록 대충. 번아웃인가요?",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지가 알 수 없는 약어로 가득해요. 님만의 언어인가요?",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 레포의 git log는 미완성 교향곡이에요. 근데 교향곡은 원래 완성해야...",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지에 이슈 번호가 없어요. 트래커와 연동 안 하시나요?",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "님의 커밋 메시지 스타일: 스트림오브컨셔스니스(의식의 흐름).",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 커밋 메시지들을 시간순으로 읽으면 개발자의 의욕이 서서히 사라지는 게 보여요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지의 언어가 영어, 한국어, 미확인 언어로 섞여있어요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 레포에서 git bisect하면 메시지가 도움이 안 돼서 고생할 거예요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지는 '존재하지만 존재하지 않는' 양자 상태예요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 커밋 로그를 분석하는 것보다 점 보러 가는 게 더 정확할 것 같아요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지가 빈 껍데기예요. 내용물은 어디로 갔나요?",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지를 읽는 경험: 사막에서 물 찾기.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 레포의 git log는 정보의 블랙홀이에요. 들어가면 아무것도 나오지 않아요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지 수준으로 봤을 때, 코드 품질에 대한 기대치: 바닥.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지는 UX가 최악이에요. 사용자(동료)를 전혀 고려하지 않았네요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 메시지를 쓸 시간에 README라도 쓰시지.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지 없는 것보다 나쁜 게 있어요. 있는데 의미 없는 거. 지금 이거요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지 → 유니코드로 변환 → 해시값으로 변환 → 여전히 무의미.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 레포의 커밋 메시지를 전부 'placeholder'로 바꿔도 차이가 없을 거예요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "님의 커밋 메시지 역사 = 인류 문명의 퇴보 증거.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 git log를 외계인에게 보여주면 '지구인은 의사소통 능력이 부족하다'고 결론내릴 거예요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "커밋 메시지가 이 정도면 님 자체가 기술 부채예요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 레포의 커밋 메시지에 대한 유일한 적절한 반응: 긴 한숨.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "님의 커밋 로그를 보고 개발을 그만두고 싶어졌어요. 님의 영향력이 대단하네요.",
  },

  // ============================================================
  // 추가 벌크 3 — 1000개 채우기
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지가 알약처럼 작지만, 알약과 달리 효과가 없어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "이 정도 커밋 메시지는 '발전 가능성 있음' 카테고리에 넣을게요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지에 마음이 담겨있지 않아요. 마음을 담아주세요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "fix {fixCount}개는 괜찮은데, fix할 때 '뭘' fix했는지도 써주세요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 로그가 슬프도록 밋밋해요. 양념 좀 치세요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "이 레포의 커밋 메시지를 읽는 건 무설탕 사탕 먹는 것 같아요. 맛이 없어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지가 '냉장고에 뭐가 있으면 먹어' 수준의 구체성이에요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "{total}개 커밋의 메시지를 전부 읽었는데, 기억나는 건 없어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지가 디카페인 커피 같아요. 형태는 있는데 효과가 없어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "이 레포는 커밋 메시지 다이어트가 필요해요. 더 살찌우는 방향으로.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지가 레고 설명서 없이 조립하는 것 같아요. 결과가 불안해요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 git log는 네비게이션 없이 운전하는 것과 같아요. 목적지를 모르겠어요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지가 IKEA 조립 설명서보다 불친절해요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 레포의 커밋 로그로 회고를 하면 '기억나는 게 없다'가 결론일 거예요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지의 정보량 < 주간보고서 제목의 정보량.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 메시지 수준이면 git log 대신 git fortune을 쓰는 게 더 유용하겠어요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지에 컨텍스트가 완전히 없어요. ESP(초감각적 지각)가 필요합니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "님의 커밋 메시지는 '뭐 했는지는 나만 안다' 스타일이에요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 레포에 새로 합류하는 개발자가 있다면, 제일 먼저 고생할 부분: git log 이해.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지가 음식점 메뉴판보다 정보가 적어요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 커밋 로그는 개발 히스토리가 아니라 암호문이에요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지에 '의미'라는 단어를 추가하면 모순어법이 됩니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지가 화석 같아요. 한때 의미가 있었을 수도 있는데, 지금은 아무도 모릅니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 git log를 보면 개발자의 '무관심'이 코드 전체에 스며들어 있을 것 같아요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지 = 개발자의 일기. 님의 일기: 매일 같은 한 줄. 'fix'.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 레포의 git log를 ChatGPT에게 '의미 추출해줘'라고 했더니 '불가능합니다'래요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지로 팀빌딩하면 팀이 해체됩니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 커밋 히스토리를 읽는 건 벽에 대고 대화하는 것과 같아요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지가 거울 같아요. 님의 코딩 실력을 그대로 반영하고 있어요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 git log의 SEO 점수: 0. 검색 가능한 정보가 하나도 없어요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "님의 커밋 메시지는 '커밋 메시지를 왜 써야 하는가'에 대한 역설적 증명이에요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 레포의 커밋 히스토리를 학회에 발표하면 '안티패턴의 집대성'이라는 찬사(?)를 받을 거예요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "커밋 메시지 분석 AI로서 말씀드리면: 저도 이 분석 결과를 보고 우울해졌어요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 git log는 '디지털 고고학'의 새로운 분야를 개척할 수 있어요. 해독 불가능한 유물로.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "님의 커밋 로그를 읽는 건 매트릭스의 코드를 눈으로 해독하려는 것과 같아요. 불가능하죠.",
  },

  // ============================================================
  // 정말 마지막 벌크 — 1000+ 확보
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지가 '배민 주문내역'만큼 간결해요. 근데 배민은 뭘 시켰는지 보이잖아요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "fix {fixCount}개. 실수는 성장의 어머니라지만, 어머니가 좀 많으시네요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "WIP {wipCount}개. 일단 시작은 하셨네요. 반은 왔어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지가 카톡 읽씹 수준이에요. 내용이 없어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "이 레포의 커밋 메시지는 '읽을 필요 없음' 등급이에요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지가 '아이스 아메리카노 한 잔'보다 정보가 없어요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 git log를 보면 '왜 커밋 메시지를 잘 써야 하는가' 세미나가 필요하네요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지의 부재로 인해 이 레포의 역사는 구전으로만 전해질 것입니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "님의 커밋 메시지를 AI가 분석한 결과: '데이터 부족으로 분석 불가'.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 커밋 로그에서 패턴을 찾으려면 카오스 이론이 필요해요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지를 요약하면: '했다. 고쳤다. 또 했다. 또 고쳤다.'",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 레포의 git log는 개발자 번아웃의 타임라인이에요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지가 사이렌 소리 같아요. 경고만 있고 해결책은 없어요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지 스타일: 포스트모던. 의미를 해체했어요. 완전히.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 커밋 히스토리를 타임라인으로 만들면 '재앙의 연대기'가 됩니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "님의 커밋 로그를 분석한 결론: 개발을 멈추세요. 세상을 위해.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 레포의 커밋 메시지는 정보학적으로 완전한 무(無)입니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "커밋 {total}개, 정보량 0비트. 열역학 제2법칙보다 엔트로피가 높아요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "님의 커밋 메시지가 이 수준이면 20년 경력 시니어도 인수인계 불가합니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 git log를 UN에 제출하면 '인류의 커뮤니케이션 위기'로 인정받을 거예요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지 하나하나에 스토리가 있을 텐데... 그 스토리가 안 보여요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "fix {fixCount}개는 인생의 일부예요. 괜찮아요, 계속 가세요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지를 잘 쓰면 팀원이 커피 사줄지도 몰라요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 커밋 메시지 수준이면 코드 리뷰 속도가 50% 감소합니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지의 가독성: 0/10. 접근성을 고려해주세요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 로그를 읽는 건 안개 속 운전이에요. 사고 나기 전에 멈추세요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 커밋 메시지를 쓴 사람과 코드를 짠 사람이 같다는 게 무섭네요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "님의 커밋 로그를 보면 프로그래밍이라는 직업의 진입장벽이 너무 낮다는 걸 느껴요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 레포의 커밋 메시지가 이 수준이면 기업 가치를 깎아먹고 있는 거예요. 진심.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지에 버전 번호라도 넣으세요. 뭐라도.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 레포의 릴리스 노트를 만들 수 있을까요? 커밋 메시지로는 불가능해요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지 작성 능력은 '개발 연차 - 개발 연차 = 0'을 증명합니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 커밋 히스토리를 보면 유저스토리가 아니라 호러스토리가 연상됩니다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지가 공기 같아요. 있는데 안 느껴져요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 커밋 로그는 '개발자의 일지'가 아니라 '개발자의 한탄'이에요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지가 이 수준이면 git log를 봐도 아무 도움이 안 돼요. 시간 낭비 그 자체.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "님의 커밋 메시지의 최종 평가: 인류의 소통 역사에서 가장 비효율적인 사례 중 하나.",
  },

  // ============================================================
  // 추가 벌크 4 — 1000개 확실하게 돌파
  // ============================================================
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지에 정성이 조금만 더 들어가면 좋겠어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 {total}개를 분석했는데 깜짝 놀랄 만한 건 없네요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "fix {fixCount}개. 뭐 인생이 원래 fix의 연속 아니겠어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지에서 '노력'이 어렴풋이 느껴져요. 아주 어렴풋이.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "이 레포의 커밋 메시지, 별 3개 중 2개. 나쁘진 않아요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지를 읽으면 '아, 뭔가 했구나'는 알겠어요. 뭔지는 모르겠지만.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "fix가 {fixCount}개인 건 양심적이에요. 최소한 인지는 하셨으니.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지가 '밥 먹었어?' 수준의 정보량이에요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "WIP이 {wipCount}개지만 뭐, 로마도 하루 아침에 안 세워졌으니까.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "가장 짧은 메시지 '{shortestMsg}'. 짧지만 임팩트... 는 없네요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지 수준: 라면 조리법보다 간결해요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "이 레포의 커밋 메시지에서 '성장 가능성'을 봅니다. 지금은 씨앗 단계.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "평균 {avgLength}자 메시지. 하이쿠도 이것보단 길어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지에 힌트가 좀 있으면 좋겠어요. 지금은 수수께끼 수준.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "fix 비율 {fixRatio}%. 아직 구제 가능한 범위예요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "이 커밋 로그에서 유일하게 좋은 점: 커밋 횟수는 충분해요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지가 전체적으로 담백해요. 건강식 같은.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "메시지 스타일이 일관적이에요. 일관적으로 대충.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "이 레포의 커밋 메시지를 읽는 건 무색무취의 경험이에요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지가 존재한다는 것만으로도 감사합니다.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지가 추상화 수준이 너무 높아요. 구체적으로 써주세요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 레포의 git log는 '추상 미술'이에요. 이해하는 사람만 이해하는.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "fix {fixCount}개, WIP {wipCount}개. 이것만 줄여도 로그가 깨끗해져요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지가 '무엇'은 있는데 '왜'가 없어요. 반쪽짜리 정보.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 레포의 CHANGELOG를 자동 생성하면... 아무것도 안 나올 거예요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지에 맥락이 없어요. 다른 사람이 보면 미로에 빠진 기분.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "메시지가 기계적으로 작성된 느낌이에요. 봇이 쓴 건 아니죠?",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지가 '그래서 뭐가 바뀌었는데?'라는 질문에 답을 못 해요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 커밋 로그를 새 팀원에게 보여주면 '이 팀 괜찮은 건가' 의문을 품을 거예요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지의 평균 정보량: 1비트 미만.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 레포에서 git log의 존재 의미가 흔들리고 있어요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "fix 비율 {fixRatio}%에 메시지 길이 {avgLength}자. 둘 다 아쉬운 조합.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지가 검색 키워드도 못 될 수준이에요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 메시지로 git bisect하면 어떤 커밋이 범인인지 도저히 알 수 없어요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지: 존재하지만 없는 것과 같은.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "fix {fixCount}개. 그리고 fix 메시지에 설명이 없는 것이 {fixCount}개.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 레포의 커밋 메시지 수준으로는 오픈소스 PR이 통과 못 해요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "메시지가 있어도 의미가 없으면 --no-message와 다를 게 뭐예요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 커밋 로그는 '정보의 사막'이에요. 오아시스(좋은 메시지)가 보이지 않아요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지를 통해 코드 변경을 이해하는 건 불가능에 가까워요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 레포의 커밋 메시지를 보면 '소프트웨어 장인 정신'이라는 말이 허무해져요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지 수준이 '코드 원숭이'라는 표현을 정당화하고 있어요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 git log를 보면 개발자라는 직업에 자격 시험이 필요하다는 생각이 들어요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지가 이 수준이면 코드의 수준도 뻔해요. 스파게티 보나라.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "fix {fixCount}개의 커밋 중 제대로 fix된 건 몇 개일까요. 의문.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 레포의 기술 부채는 커밋 메시지부터 시작해요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지를 보면 '왜 개발자가 글쓰기를 배워야 하는가'가 명확해져요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지가 이 정도면 '프로'가 아니라 '아마추어'예요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 커밋 로그는 코드 품질의 바로미터예요. 그리고 기압이 최저입니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지에는 '의도'가 보이지 않아요. 코드에도 그렇겠죠.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "fix {fixRatio}%, 평균 {avgLength}자. 이 두 숫자가 님의 개발 수준을 요약해요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 레포의 커밋 메시지는 '커밋 메시지 안티패턴 도감'에 실려야 할 수준이에요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지가 이 정도면 린트(lint)를 메시지에도 적용해야 해요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 git log를 보고 얻을 수 있는 유일한 정보: '이 개발자는 메시지에 관심 없다'.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지 습관은 '코드 리뷰 문화가 없는 팀'에서 자란 흔적이에요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 커밋 로그를 개발자 교육 자료로 사용하겠습니다. '최악의 사례' 섹션에요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "님의 커밋 메시지 역사를 보면 인류 문명이 후퇴하고 있다는 확신이 들어요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "커밋 {total}개, 유의미한 메시지 0개. 이건 정보의 블랙아웃이에요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 레포의 커밋 메시지를 삭제하면 저장 공간은 절약되고 정보 손실은 없어요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "님의 커밋 로그에 '아름다운 메시지'라는 개념은 한 번도 존재한 적이 없어요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 커밋 히스토리를 보면 '소프트웨어 공학은 아직 갈 길이 멀다'는 결론이 나와요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "fix {fixRatio}%, WIP {wipCount}개. 이 레포는 개발의 무덤이에요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "커밋 메시지가 이 수준이면 앞으로 모든 커밋을 AI한테 맡기세요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 레포의 커밋 로그를 인쇄해서 벽에 걸면 '현대 미술: 무의미의 미학'이에요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "님의 커밋 메시지에 대한 AI의 감정 분석: 무(無). 아무것도 느낄 수 없어요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 커밋 로그의 정보 엔트로피: 최대치. 무질서의 극치. 열역학적 죽음.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지에 날짜나 버전이라도 넣으면 검색이 쉬워져요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "이 레포의 좋은 점: 커밋이 꾸준하다. 아쉬운 점: 메시지가 꾸준히 대충이다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "가장 짧은 메시지 '{shortestMsg}'. 하이쿠보다 짧은 시(詩).",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지가 미니멀리즘 디자인 같아요. 내용이 없어서.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "fix {fixCount}개는 '학습의 과정'이라고 생각할게요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지가 QR코드 같아요. 스캔해야 내용을 알 수 있는데 스캔도 안 돼요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 메시지 수준이면 git log는 장식이에요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지의 가치: 종이 한 장 위에 적힌 '.'과 동일.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 레포에서 git shortlog를 치면 세상에서 가장 지루한 목록이 나와요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "fix가 {fixCount}개인데 fix 메시지가 전부 'fix'. 뭘 fix했는지가 핵심인데요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 커밋 로그는 고문이에요. 읽는 사람에 대한.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지는 '개발자 윤리'에 반하는 수준이에요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 레포를 오픈소스로 공개하면 이슈에 '커밋 메시지 좀 제대로 써주세요'가 달릴 거예요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지의 부재는 팀워크의 부재를 의미합니다.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 git log를 분석하느라 제 AI 뉴런이 손상되었어요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "커밋 메시지 분석 결론: 님은 커밋 메시지라는 문화를 거부하는 반항아예요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 레포의 커밋 히스토리가 다큐멘터리가 되면 제목은: '메시지 없는 세계'.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "님의 커밋 메시지에 대한 최종 한 마디: 이 직업이 맞는지 다시 한번 생각해보세요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 {total}개 완주! 메시지 품질만 올리면 완벽해요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "이 레포에서 가장 좋은 커밋 메시지가 뭐였을까요? 찾기 어렵네요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "메시지가 짧은 건 괜찮은데, 내용이 있어야 짧은 거지.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지에 'why'가 없으면 3개월 후에 고고학자가 되어야 해요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "fix {fixRatio}%는 그렇다 쳐도, fix 메시지에 컨텍스트 좀 넣어주세요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 커밋 로그를 보면 '좋은 커밋 메시지'가 얼마나 소중한지 알게 돼요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "님의 커밋 로그 = 정보의 무(無). 선불교의 깨달음이 아니라 개발의 포기.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지 팁: 제목은 50자 이내, 본문은 72자 줄바꿈. 기억하세요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "이 레포의 커밋 메시지는 '발전 가능성 무한대'예요. 지금이 바닥이니까.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지 쓰는 데 30초만 투자하면 팀 생산성이 올라가요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 메시지 수준이면 코드 리뷰 시 리뷰어가 diff를 처음부터 끝까지 봐야 해요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지는 '왜 커밋 메시지 컨벤션이 필요한가'에 대한 논문의 근거 자료예요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 커밋 히스토리의 비문(碑文): '여기 의미 있는 메시지는 묻히지 않았다'.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "fix 비율이 낮으니 메시지 품질만 올리면 괜찮은 레포가 될 거예요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지 전반: '그럭저럭'. 조금만 더 노력하면 '괜찮음'이 될 수 있어요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 커밋 로그를 보면 'git blame'이 '누가 이 메시지를 썼냐'로 바뀌어요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지가 있는 것과 없는 것의 경계에서 아슬아슬하게 존재해요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "이 커밋 메시지를 AI한테 '좋은 메시지로 바꿔줘'라고 하면 전부 새로 써야 할 거예요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 커밋 로그를 보고 난 후, 저(AI)도 힐링이 필요해졌어요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "메시지 퀄리티가 조금 아쉽지만, 개선 의지만 있으면 금방 나아질 거예요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지에 최소한 동사 하나는 넣어주세요. '추가', '수정', '삭제' 중 하나라도.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 로그 = 정보 폐기물 처리장. 재활용 불가.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 레포의 커밋 메시지가 개선되는 날, 그날이 한국 IT 업계의 새로운 시작이 될 거예요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지가 간결한 건 좋지만 지나치면 부실이에요.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "이 레포의 가장 큰 기술 부채: 커밋 메시지.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지에 '변경 이유'를 쓰면 코드 리뷰 속도가 2배 빨라져요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 레포의 git log를 스크롤하면 끝없는 'update'의 바다가 펼쳐져요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지가 이 수준이면 'git commit --allow-empty-message'가 더 솔직해요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 레포의 커밋 메시지를 전부 지워도 아무도 모를 거예요. 정보량이 0이니까.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "WIP {wipCount}개와 fix {fixCount}개. 이 두 개만 관리하면 좋은 레포예요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지가 '아 맞다 적어야 하는데'하고 대충 적은 느낌이 역력해요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지 작성 과정 추정: Enter → git commit -m '' → 아 메시지 필요하구나 → 'fix'.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 커밋 로그를 읽고 느낀 점: 세상에는 아직도 커밋 메시지를 아무렇게나 쓰는 용감한 사람이 있다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 {total}개 분석 완료! 앞으로는 메시지에 조금 더 정성을 담아보세요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 레포의 커밋 메시지 개선 난이도: Easy. 지금보다 못 할 수가 없으니까요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지가 바닥이라서 오히려 편해요. 이보다 나빠질 수 없거든요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "님의 커밋 메시지 분석을 마치며: 이 분석에 소요된 시간이 아깝습니다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지에 조금만 더 정보를 담아주세요. 미래의 동료를 위해.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지 품질이 개선되면 팀 전체의 개발 속도가 올라가요. 사실이에요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지를 읽는 건 안개 속에서 보물찾기하는 것 같아요. 보물은 없지만.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 커밋 히스토리를 하나의 단어로 요약하면: '무(無)'.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지 상태: 살릴 수 있어요. 아직 늦지 않았어요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 레포의 커밋 메시지는 개선이 필요합니다. 시급하게.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지 개선이 시급합니다. 이건 선택이 아니라 필수예요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 커밋 히스토리를 본 결론: 개발자 교육에 '커밋 메시지 작성법'이 필수 과목이 되어야 합니다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지 분석 완료. 전반적으로 B-. 노력하면 A 가능!",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "커밋 메시지 분석 완료. C+. 더 분발하세요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지 분석 완료. D. 재수강을 권합니다.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "커밋 메시지 분석 완료. F. 이 레포는 구원이 필요합니다.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지를 잘 쓰는 것도 개발 실력이에요. 연습해보세요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "좋은 커밋 메시지 = 좋은 문서화의 시작. 지금은 시작도 안 했네요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "님의 커밋 메시지가 이 수준이면 문서화는 꿈도 못 꾸시겠네요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "이 레포의 문서화 수준은 커밋 메시지에서 이미 결정되었어요. 결론: 없음.",
  },
  {
    id: "commit_message",
    severity: "mild",
    template: "커밋 메시지에 'what'과 'why'를 넣으면 미래의 당신이 감사할 거예요.",
  },
  {
    id: "commit_message",
    severity: "medium",
    template: "이 메시지들로는 릴리스 노트를 쓸 수 없어요. 수동으로 쓰셔야 해요.",
  },
  {
    id: "commit_message",
    severity: "savage",
    template: "커밋 메시지 분석을 해봤지만 분석할 내용이 없어서 이 메시지가 가장 길어요.",
  },
  {
    id: "commit_message",
    severity: "legendary",
    template: "최종 결론: 이 레포의 커밋 메시지는 '존재하지만 없는 것'의 새로운 정의입니다.",
  },
];
