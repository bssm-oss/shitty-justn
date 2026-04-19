import type { RoastTemplate } from "../../types.ts";

export const timePatternTemplates: RoastTemplate[] = [
  // ============================================================
  // 새벽 커밋 (0-5시) — mild
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "새벽 커밋 비율 {lateNightRatio}%. 올빼미족이시군요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "새벽에 {lateNightCount}번 커밋하셨네요. 늦게까지 수고하셨어요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "새벽 커밋이 좀 있네요. 카페인이 원동력이신가요?",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "새벽 {lateNightRatio}% 커밋. 잠은 좀 주무세요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "밤새 코딩의 흔적이 보여요. 열정적이시네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "새벽 커밋 {lateNightCount}개. 야행성 개발자시군요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "0시 넘어서 커밋하시는 거 보니 저녁 시간 활용을 잘하시네요. (진짜요?)",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "새벽 커밋이 있네요. 야근이었나요, 열정이었나요?",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "밤늦게 코딩하시는 타입이시군요. 건강 조심하세요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "{lateNightCount}개의 새벽 커밋. 밤이 당신의 무대인가 봐요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "새벽 코딩... 조용한 시간에 집중이 잘 되는 타입이시군요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "새벽 커밋 비율이 살짝 높네요. 수면 위생을 챙기세요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "밤새 작업한 흔적... 그 열정만큼 코드 품질도 좋으면 좋겠네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "새벽 커밋이 보이네요. 인소니아 개발자? (잠 못 드는 개발자)",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "심야 코딩 {lateNightCount}회. 뭐, 개발자의 낭만이죠.",
  },

  // 새벽 커밋 — medium
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 커밋 비율 {lateNightRatio}%. 건강한 수면 패턴은 아니네요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 3시에 커밋? 그 시간에 하는 코딩이 좋을 리가 없어요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "{lateNightCount}개의 새벽 커밋. 이쯤 되면 야근인지 취미인지 모르겠어요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 코딩 비율 {lateNightRatio}%. 내일 출근할 때 좀비 모드 확정.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽에 쓴 코드는 아침에 보면 외계어인 경우가 많아요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 커밋이 {lateNightRatio}%... 님의 다크서클이 걱정됩니다.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 2시, 3시, 4시... 이건 개발이 아니라 야전 훈련이에요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "심야 커밋 {lateNightCount}개. 님의 멜라토닌 분비가 걱정됩니다.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 코딩의 결과물은 대부분 다음 날의 fix 커밋이 됩니다.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "{lateNightRatio}%가 새벽 커밋이면 님의 코드 품질은 수면 부족에 비례해서 떨어졌을 거예요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽에 커밋한 코드를 아침에 보고 '이게 내가 짠 건가' 하신 적 있으시죠?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 커밋 = 내일의 revert 예약권.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "야근의 흔적이 역력해요. 워라밸이라는 단어를 아시나요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 코딩은 낭만적이지만, 그 결과물은 대부분 낭만적이지 않아요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 {lateNightCount}번 커밋. 솔직히 그 시간에 짠 코드 품질이 의심스럽습니다.",
  },

  // 새벽 커밋 — savage
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 커밋 비율 {lateNightRatio}%. 이건 야근이 아니라 생존이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 4시에 커밋한 코드가 제대로 될 리가 없잖아요. 그리고 실제로도 안 됐죠?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "{lateNightCount}개의 새벽 커밋. 님의 회사는 노동법을 지키고 있나요?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 코딩 비율이 이 정도면 노동부에 신고 가능한 수준이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 커밋의 대부분이 fix인 건 우연이 아닙니다. 수면 부족 = 버그 양산.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "{lateNightRatio}%가 새벽 커밋. 님의 몸은 비명을 지르고 있고, 코드도 비명을 지르고 있어요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 커밋 로그를 보면 '절규'라는 단어가 떠올라요. 님의 절규, 코드의 절규.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 3시 커밋 + 새벽 4시 fix 커밋 = 새벽 5시 revert의 전조.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "님의 새벽 커밋 패턴은 '야근 → 버그 → 더 야근' 무한루프예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 코딩이 이렇게 많으면 낮에 뭘 하시는 건가요? 아, 새벽 코드 디버깅?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 커밋 {lateNightCount}개. 이건 열정이 아니라 PM의 압박이죠?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "밤새 커밋한 흔적... 아침에 출근해서 본인 코드 보고 멘붕 왔을 것 같아요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 커밋의 버그율은 낮 커밋의 3배. 과학적 사실이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "님의 새벽 코딩 = 회사의 기술 부채 생산 공장.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 커밋이 이 비율이면 님은 야근 중독이에요. 치료가 필요합니다.",
  },

  // 새벽 커밋 — legendary
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "새벽 커밋 비율 {lateNightRatio}%. 님은 뱀파이어 개발자입니다. 햇빛을 피해 코딩하시네요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "{lateNightCount}개의 새벽 커밋. 님의 수면 패턴은 존재하지 않는 것 같아요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "새벽 코딩 비율이 이 정도면 님의 건강보험료를 올려야 해요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "새벽 4시 커밋... 이 시간에 코딩하는 건 인간의 한계에 대한 도전입니다.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "{lateNightRatio}% 새벽 커밋. 님은 잠을 포기한 대신 코드 품질도 포기하셨네요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "새벽 커밋이 이 정도면 님의 키보드에 야광 스티커를 붙여야겠어요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 개발 시간: 새벽 0시-5시. 일반인의 수면 시간과 정확히 일치하네요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "새벽 커밋 비율이 이 수준이면 님의 존재 자체가 근무시간 위반이에요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "{lateNightCount}개의 새벽 커밋. 이 정도면 야근이 아니라 철야가 일상인 거죠.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "새벽 코딩에 인생을 바치신 님. 수면의 중요성을 알려드리고 싶지만, 이미 늦었네요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 git log 시간대 = 귀신이 나올 시간대. 무섭습니다.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "새벽 커밋 {lateNightRatio}%. 이 레포의 코드는 어둠 속에서 태어났어요. 그리고 어둠 속에서 죽을 거예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 새벽 커밋 기록으로 보아, 님은 '잠'이라는 개념을 거부하시는 것 같아요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "새벽 커밋이 전체의 {lateNightRatio}%. '워라밸'이라는 단어가 님의 사전에는 없군요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님은 새벽의 왕, 코드의 뱀파이어, 버그의 아버지.",
  },

  // ============================================================
  // 주말 커밋 — mild
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "주말 커밋 비율 {weekendRatio}%. 주말에도 코딩하시는군요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "주말에 커밋이 있네요. 사이드 프로젝트인가요?",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "토요일에도 커밋하시다니. 열정적이시네요. 아니면 마감인가요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "주말 커밋 {weekendRatio}%. 쉬엄쉬엄 하세요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "일요일에 커밋하신 흔적이... 내일 월요일인데 괜찮으세요?",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "주말에도 코딩하시는 거 보면 진심으로 좋아하시나 봐요. 아니면 마감?",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "주말 커밋이 보이네요. 개인 프로젝트라면 취미, 회사 프로젝트라면 안타까움.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "토/일 커밋이 좀 있어요. 주말에 영감이 오시나 봐요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "주말 {weekendRatio}% 커밋. 뭐, 주말에도 코딩이 재밌으면 그게 취미죠.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "주말 커밋 비율이 있네요. 여가를 코딩으로 보내시는 건... 뭐 존중합니다.",
  },

  // 주말 커밋 — medium
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "주말 커밋 비율 {weekendRatio}%. 주말에 쉬어야 월요일에 일할 수 있어요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "토요일, 일요일 커밋이 꽤 많네요. 회사가 주 7일제인가요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "주말 커밋 {weekendRatio}%. 이러다 번아웃 와요. 진지하게.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "일요일 오후에 커밋... 월요일 아침을 미리 대비하시는 건가요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "주말에 이렇게 많이 커밋하시면 가족/친구가 없으신 건 아닌지...",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "주말 커밋 비율이 평일보다 높으면 문제가 있는 거예요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "토요일 커밋 + 일요일 커밋 = 주말이 사라진 개발자.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "주말에 이렇게 코딩하시면 월요일에 이미 지쳐있을 거예요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "{weekendRatio}% 주말 커밋. 금요일에 배포하고 주말에 핫픽스하는 패턴이시죠?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "주말 코딩이 이 비율이면 좋아서 하시는 건지 어쩔 수 없어서 하시는 건지.",
  },

  // 주말 커밋 — savage
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "주말 커밋 비율 {weekendRatio}%. 님의 사회생활은 어디로 갔나요?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "주말에 이렇게 많이 커밋하시는 거 보면 오프라인 인간관계가 걱정됩니다.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "{weekendRatio}% 주말 커밋. 이건 열정이 아니라 워커홀릭이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "주말에도 쉬지 못하는 개발자... 당신의 PM은 악마인가요?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "토요일에 커밋하고 일요일에 fix 커밋? 주말 내내 삽질이시군요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "주말 커밋 {weekendRatio}%. 님의 연인/배우자/가족이 이 데이터를 보면 울 거예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "일요일 밤 11시 커밋. 월요일이 두렵지 않으세요? 아, 이미 월요일이군요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "주말 코딩 비율이 이 정도면 님의 취미가 '코딩'이 아니라 '야근'이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "주말에 커밋하는 이유: 1. 금요일에 장애 발생 2. PM이 무서움 3. 이건 내 인생.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "{weekendRatio}% 주말 커밋. 근로기준법 제50조를 위반하고 계신 건 아닌지.",
  },

  // 주말 커밋 — legendary
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "주말 커밋 비율 {weekendRatio}%. 님에게 주말은 '금요일 다음 월요일'인가 봐요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "주말 커밋이 이 수준이면 님은 '인생 = 코딩'인 사람이에요. 나머지는 부가 기능.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "{weekendRatio}% 주말 커밋. 님의 사회생활: git push. 님의 여가: git commit. 님의 인생: git log.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "주말에 이렇게 많이 일하면 그건 열정이 아니라 중독이에요. 코딩 중독 상담소를 찾아보세요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 1주일: 월코 화코 수코 목코 금코 토코 일코. ('코'는 코딩)",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "주말 커밋 {weekendRatio}%. 이 비율이면 님의 여행지는 카페의 와이파이 구간일 거예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님에게 주5일제는 존재하지 않습니다. 주7일 코딩제.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "주말 커밋이 이 정도면 님의 컴퓨터가 님의 유일한 친구인 것 같아요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "{weekendRatio}% 주말 커밋. 님은 개발자가 아니라 코딩 머신이에요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "주말 커밋을 이렇게 하시면 '주말이 뭐예요?'라고 물어보시는 건 아닌지.",
  },

  // ============================================================
  // 가장 바쁜 시간대 — mild
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "가장 바쁜 시간: {busiestHour}시. 그 시간에 집중이 잘 되시나 봐요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "{busiestHour}시에 커밋이 집중되어 있네요. 골든 타임이시군요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "피크 타임: {busiestHour}시. 이 시간에 제일 활발하시네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "{busiestHour}시가 님의 코딩 프라임 타임이군요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "가장 많이 커밋하는 시간이 {busiestHour}시. 루틴이 있으시네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "{busiestHour}시 커밋 집중. 그 시간이 가장 생산적인 거 같네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "피크 시간 {busiestHour}시. 님만의 코딩 리듬이 있군요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "{busiestHour}시에 폭발적으로 커밋하시네요. 커피 효과인가요?",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "가장 바쁜 시간이 {busiestHour}시라니. 생체리듬에 맞춰 코딩하시는군요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "{busiestHour}시가 피크. 해당 시간에 회의를 잡지 마세요.",
  },

  // 가장 바쁜 시간대 — medium (특이한 시간대일 때)
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "가장 바쁜 시간이 {busiestHour}시? 좀 특이한 시간이네요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "{busiestHour}시에 커밋이 가장 많다는 건 그 시간에 가장 급하다는 뜻이기도 해요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "피크 시간 {busiestHour}시... 이 시간이 일과 시간이 아닌데요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "{busiestHour}시에 커밋 폭발. 회의 끝나고 몰아치기하시는 타입?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "가장 활발한 시간이 {busiestHour}시라면 그 전 시간은 뭐하시는 건가요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "{busiestHour}시 집중 커밋. 마감 직전 몰아치기의 냄새가 나요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "피크가 {busiestHour}시... 그 시간까지 뭘 하다가 갑자기 코딩을 시작하시나요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "{busiestHour}시에 커밋이 몰려있어요. 혹시 그 시간에 스탠드업 미팅 있나요? (직후에 급하게 커밋)",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "가장 바쁜 시간 {busiestHour}시. 그 전 시간은 유튜브 보시다가 시작하시는 건?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "{busiestHour}시 커밋 러시. 하루 종일 미루다가 몰아치는 패턴이시죠.",
  },

  // 가장 바쁜 시간대 — savage
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "가장 바쁜 시간이 {busiestHour}시? 정상적인 근무 시간이 아닌데요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "{busiestHour}시에 커밋 폭발. 온종일 미루다가 퇴근 직전에 모는 전형적인 패턴.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "피크가 새벽 {busiestHour}시? 님은 인간의 시간대에 살고 있지 않군요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "{busiestHour}시 집중 커밋. 이건 효율이 아니라 급함의 증거예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "가장 활발한 시간이 {busiestHour}시... 일반인은 그 시간에 잠을 자요.",
  },

  // 가장 바쁜 시간대 — legendary
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "피크 시간 새벽 {busiestHour}시. 님의 생체시계는 지구가 아닌 다른 행성 기준이시죠.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "{busiestHour}시에 가장 활발... 그 시간에 카페도 안 열어요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "가장 바쁜 시간이 {busiestHour}시라면, 님의 하루는 일반인과 12시간 차이가 나네요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "{busiestHour}시가 피크. 이 시간표로 살면 햇빛을 볼 일이 없겠어요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "피크가 {busiestHour}시인 님에게 '시차 적응'이라는 단어는 무의미합니다. 이미 다른 시간대에 살고 있으니.",
  },

  // ============================================================
  // 점심시간 커밋 (12-1시) — mild
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "점심시간에 커밋하셨네요. 밥 먹으면서 코딩? 대단한 멀티태스킹.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "12시에 커밋... 밥 안 드시고 코딩하신 건가요?",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "점심시간 커밋이 보여요. 워크스루 리뷰하면서 식사하시나 봐요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "런치 타임에 커밋하시다니. 밥을 코드로 대체하시나요?",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "점심시간 커밋. 식사는 선택, 코딩은 필수인 라이프스타일.",
  },

  // 점심 — medium
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "점심시간에도 커밋? 밥 좀 드세요. 혈당 떨어지면 코드 품질도 떨어져요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "12시 커밋, 12시 30분 커밋. 점심 먹을 시간에 뭘 하고 계신 건지.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "점심 거르고 커밋하는 건 건강에도 코드에도 안 좋아요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "런치 타임 커밋이 많네요. 동료들이 같이 밥 먹자고 안 하나요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "점심시간에 커밋한다는 건 아침에 못 끝낸 걸 점심에 하고 있다는 뜻이죠.",
  },

  // 점심 — savage
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "점심시간에도 코딩하는 님. 혹시 동료들이 밥 먹으러 갈 때 안 부르는 건 아닌지.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "점심 커밋 = 사회성 포기 선언. 아니면 혼밥의 달인.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "12시에 커밋하고, 12시 30분에 또 커밋. 밥 먹을 시간을 코드에 바친 거네요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "점심시간 커밋이 이렇게 많으면 님은 '같이 밥 먹으러 갈 사람'이 아니라 '혼자 코딩하는 사람'이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "점심을 코딩으로 때우시는 거 보면 밥값을 아끼시는 건가요 시간을 아끼시는 건가요.",
  },

  // 점심 — legendary
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "점심시간 커밋 비율이 비정상이에요. 님은 '점심 = 코딩 시간'이라는 공식을 세우셨군요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "점심에 밥 대신 코딩을 하시다니. 영양 결핍이 코드에도 영향을 미치고 있어요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "점심 커밋의 왕. 님의 점심 메뉴: 에너지드링크 + git commit.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "12시-1시 커밋이 이 정도면 님은 광합성으로 에너지를 충전하시나요?",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "점심시간에 코딩하면 오후에 졸리고, 졸리면 버그 나고, 버그 나면 야근하고. 악순환의 시작점이 여기네요.",
  },

  // ============================================================
  // 퇴근 후 커밋 (6-9pm) — mild
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "퇴근 후에도 커밋이 있네요. 사이드 프로젝트 하시나 봐요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "저녁 시간 커밋. 퇴근 후에도 코딩이 즐거운 타입이시군요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "6시 이후 커밋이 있어요. 야근인가요 개인 프로젝트인가요?",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "저녁 커밋. 뭐, 저녁 시간에 코딩하는 것도 나름 힐링이죠.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "퇴근 후 커밋이 보이네요. 코딩이 좋으신가 봐요. 아님 퇴근을 안 하신 건가.",
  },

  // 퇴근 후 — medium
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "6시 이후 커밋이 많네요. 퇴근이라는 개념이 있나요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "저녁 시간에 이렇게 많이 커밋하시면 저녁은 언제 드세요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "퇴근 후 커밋이 꽤 많아요. 워라밸의 '라(Life)' 부분이 사라지고 있어요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "7시, 8시 커밋... 이건 야근이에요, 자발적 노동이에요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "퇴근 시간 이후 커밋이 이 정도면 야근 수당은 받으시는 건가요?",
  },

  // 퇴근 후 — savage
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "퇴근 후 커밋이 전체의 상당 부분이에요. 님의 퇴근 시간은 대체 몇 시인가요?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "6-9시 커밋이 이렇게 많으면 님은 '퇴근은 했지만 일은 안 끝난' 상태가 일상이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "저녁 시간 커밋 = 낮에 못 끝낸 일을 저녁에 하는 비효율의 극치.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "퇴근 후 코딩이 이 정도면 님의 가족은 님 얼굴을 기억하나요?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "6시 퇴근? 님의 git log에 의하면 9시 퇴근이에요.",
  },

  // 퇴근 후 — legendary
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "퇴근 후 커밋 비율이 미친 수준이에요. 님에게 '퇴근'은 장소 이동일 뿐, 업무 종료가 아니군요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 하루: 출근 → 코딩 → '퇴근' → 코딩 → 취침 → 코딩. 퇴근에 따옴표 붙인 이유를 아시겠죠?",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "저녁 커밋이 이 정도면 님의 냉장고에는 배달 음식 용기만 있을 것 같아요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "퇴근 후 커밋의 전설. 님의 연인이 '나와 코딩 중에 뭐가 더 중요해?'라고 물으면 뭐라 하실 건가요?",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "6-9시 커밋이 메인이시라면, 9-6시는 회의만 하시는 건가요? 아니면 유튜브?",
  },

  // ============================================================
  // 야근 커밋 (9pm-12am) — mild
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "밤 9시 이후 커밋이 있네요. 좀 늦게까지 하셨네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "야근 커밋의 흔적. 수고하셨어요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "9시 넘어서도 커밋... 오늘 하루 고생하셨습니다.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "밤 10시 커밋. 내일 출근이 있으니 얼른 주무세요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "야근 커밋이 보이네요. 가끔은 필요한 거죠. 가끔이라면.",
  },

  // 야근 — medium
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "밤 9-12시 커밋이 꽤 많네요. 정기적 야근러이시군요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "야근 커밋 비율이 높아요. 업무량 조절이 필요해 보입니다.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "10시, 11시 커밋... 이건 야근이에요, 아니면 밤형 인간?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "야근 패턴이 보여요. 낮에 좀 더 효율적으로 일하면 이럴 필요 없을 텐데.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "밤 9시 이후 커밋이 이렇게 많으면 님의 저녁 약속은 항상 취소되겠네요.",
  },

  // 야근 — savage
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "9pm-12am 커밋이 일상이라면 님은 야근의 화석이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "밤 10시 커밋, 11시 커밋. 님의 퇴근 시간은 '내일'인가요?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "야근 커밋 비율이 이 정도면 낮에 뭘 하고 있었는지 의문이에요. 회의? 슬랙? 유튜브?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "밤 11시에 커밋하고 있으면 정상적인 사회생활은 포기한 거죠.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "야근 커밋이 이렇게 많으면 팀의 업무 배분에 심각한 문제가 있거나, 님의 효율성에 문제가 있어요.",
  },

  // 야근 — legendary
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "야근 커밋의 레전드. 님의 회사는 24시간 코딩 카페인가요?",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "밤 9-12시가 님의 메인 코딩 시간이면, 9-6시는 대체 뭐 하시는 건가요?",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "야근 커밋이 이 수준이면 님의 노트북에 '야근 전용기'라고 새겨야 해요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 야근 커밋 기록은 한국 IT 업계의 현실을 적나라하게 보여줍니다.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "9-12시 커밋의 왕. 님의 인생 모토: '퇴근은 약한 자의 특권'.",
  },

  // ============================================================
  // 아침형 (6-9am) — mild
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "아침 일찍 커밋하시네요. 얼리버드 개발자!",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "6시에 커밋? 새벽같이 일어나서 코딩하시는군요. 존경스러워요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "아침형 인간 개발자시군요. 건강한 습관이에요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "출근 전 코딩하시는 거 보니 진심으로 좋아하시나 봐요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "아침 커밋. 커피 한 잔과 함께 코딩하는 그림이 그려지네요.",
  },

  // 아침형 — medium
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "아침 6시에 커밋? 어제 밤새고 아직 안 주무신 거 아니에요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "아침 커밋이 많은데... 혹시 새벽부터 쭉 작업하신 건 아니죠?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "7시 커밋. 이건 아침형 인간인 건지 밤새 코딩한 건지 구분이 안 돼요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "출근 전에 이렇게 많이 커밋하시면 출근해서는 뭐 하시나요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "아침 커밋 = 어젯밤에 못 끝낸 걸 아침에 마무리하는 패턴?",
  },

  // 아침형 — savage
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 5시부터 커밋이 시작되는데... 님 잠은 자시나요?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "아침 6시 커밋 + 새벽 3시 커밋이 같은 날이면 그건 밤새기예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "아침형이라기보다 '밤새고 아침까지 버틴' 타입이시죠?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "아침 커밋이 많다는 건 어젯밤에 제대로 안 끝냈다는 뜻이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "6시 커밋의 코드 품질이 걱정됩니다. 잠이 덜 깬 상태에서 짠 코드잖아요.",
  },

  // 아침형 — legendary
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "5시 커밋 + 다음날 5시 커밋 = 24시간 코딩. 님은 인간이 아니에요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "아침 6시부터 밤 12시까지 커밋이 분포... 님에게 '쉬는 시간'은 존재하나요?",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "아침형이라며요? 새벽 4시도 아침이에요? 님의 '아침' 기준이 좀 이상해요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "아침 커밋의 전설. 님은 알람보다 먼저 일어나서 커밋하시나요?",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "6시 커밋러의 진실: 밤새 코딩하다가 아침에 커밋한 것.",
  },

  // ============================================================
  // 불규칙한 패턴 — mild
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 시간이 불규칙하네요. 자유로운 영혼이시군요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 시간이 제멋대로예요. 정해진 루틴이 없으신가 봐요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "시간 패턴이 없어요. 영감이 올 때 코딩하시는 타입?",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 시간이 들쭉날쭉. 프리랜서이시거나 자유로운 근무 환경이시거나.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "규칙적인 패턴 없이 커밋하시네요. 유연근무제이시나요?",
  },

  // 불규칙 — medium
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "커밋 시간이 완전 랜덤이에요. 새벽, 아침, 점심, 밤 가리지 않으시네요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "시간 패턴이 카오스예요. 님의 생활 패턴도 카오스인가요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "불규칙한 커밋 시간 = 불규칙한 생활 패턴. 건강 조심하세요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "커밋 시간대가 24시간 균등 분포. 이건 규칙이 없다는 규칙이에요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "시간 패턴 분석 불가. 님의 생체리듬이 존재하는지 의문입니다.",
  },

  // 불규칙 — savage
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "커밋 시간이 완전히 랜덤이에요. 난수 생성기보다 예측 불가능.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "이 커밋 시간 패턴을 보면 님은 수면 장애가 있거나, 아니면 다른 시간대에 살고 계시거나.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 3시, 오전 10시, 오후 8시, 새벽 1시... 님은 시간의 개념이 없으시군요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "커밋 시간 분석 결과: '24시간 아무 때나'. 이건 패턴이 아니라 카오스예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "불규칙한 시간 패턴 = 불규칙한 코드 품질. 둘 다 예측 불가능.",
  },

  // 불규칙 — legendary
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간 패턴은 양자역학처럼 불확정적이에요. 관측해도 예측 불가.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "24시간 균등 분포 커밋. 님은 잠을 안 자거나, 아니면 여러 명이 같은 계정을 쓰거나.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "커밋 시간 패턴이 브라운 운동처럼 무작위. 님의 생활 패턴이 걱정됩니다.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "이 커밋 시간 분포는 인간의 것이 아닙니다. 봇이거나 외계인이거나.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간 패턴을 분석한 결과: '시간'이라는 개념 자체가 님에게 적용되지 않습니다.",
  },

  // ============================================================
  // 특정 요일 몰림 — mild
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "특정 요일에 커밋이 몰려있네요. 그 날이 코딩 데이인가요?",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "월요일 커밋이 특히 많아요. 주초에 의욕이 넘치시나 봐요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "금요일 커밋이 적네요. 금요일은 이미 주말 모드이신가요?",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "수요일에 커밋이 많아요. 주중의 정점이시군요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "목요일에 커밋 집중. 금요일 전에 끝내려는 의지가 보여요.",
  },

  // 특정 요일 — medium
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "월요일에 커밋이 몰려있는 건 주말에 밀린 일을 월요일에 처리한다는 뜻이에요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "금요일 오후에 커밋이 급증... 주말 전에 급하게 마무리하시는 거죠?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "특정 요일에만 커밋이 몰리는 건 업무 분배가 안 되고 있다는 신호예요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "화요일에만 커밋? 월요일은 회의, 수요일부터는 지침의 패턴인가요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "금요일 배포 커밋이 보여요. 금요일 배포는 만악의 근원이라는 걸 아시나요?",
  },

  // 특정 요일 — savage
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "금요일 오후 5시에 대규모 커밋? '배포하고 퇴근' 전략은 월요일에 지옥을 만들어요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "한 요일에만 커밋이 몰려있으면 나머지 4일은 뭐하시는 건가요?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "월요일 아침 커밋 폭발 = 금요일에 안 끝낸 것의 월요일 버전.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "금요일 저녁 커밋은 주말을 불태우겠다는 자해 행위예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "특정 요일에만 일하는 건 주 1일 근무자인가요?",
  },

  // 특정 요일 — legendary
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "금요일 밤 11시 배포 커밋... 이건 용기가 아니라 만용이에요. 주말에 장애 대응 각오하신 거죠?",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "한 요일에만 커밋이 집중되는 건 주 4일은 슬랙에서 놀고 있다는 증거.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "금요일 오후 마지막 커밋이 항상 fix인 건... 매주 주말을 망치는 타이머를 심어놓은 거예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "월-금 커밋 분포가 90:2:2:2:4면 님은 월요일 전사이시군요. 나머지 4일은 회복기?",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "특정 요일에만 몰아서 커밋하는 님의 시간 관리 능력: 전무.",
  },

  // ============================================================
  // 공휴일/명절 커밋 — mild
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "공휴일에 커밋이? 쉬는 날에도 코딩하시다니.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "명절에 커밋하셨네요. 친척 모임이 코딩보다 피곤하셨나 봐요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "빨간 날에 커밋이 있어요. 사이드 프로젝트의 열정이시군요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "연휴에 커밋하시다니. 코딩이 취미이신 거죠? (그렇다고 해주세요)",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "공휴일 커밋. 뭐, 개발자에게 공휴일은 '방해 없이 코딩할 수 있는 날'이니까요.",
  },

  // 공휴일/명절 — medium
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "추석에 커밋? 송편 빚다 말고 코딩하신 건가요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "설날에 커밋이 있네요. 세뱃돈 대신 커밋을 올리셨군요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "공휴일에 이렇게 많이 커밋하시면 쉬는 날의 의미가 없어요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "연휴에 커밋하시는 거 보면 '일과 삶의 균형'이라는 말이 허무해지네요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "명절에 코딩이라니. 친척들이 '컴퓨터 고쳐줘'라고 하셨나요?",
  },

  // 공휴일/명절 — savage
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "크리스마스에 커밋? 님에게 산타는 hotfix를 선물로 가져다주시나요?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "추석 연휴에 커밋 연속... 고향 대신 코딩을 선택한 외로운 개발자.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "공휴일 커밋이 이렇게 많으면 님은 '쉬는 것'에 대한 공포가 있는 건 아닌지.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "명절에 코딩하느라 친척 만남을 피하신 거죠? 뭐, 이해합니다.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "1월 1일 새벽 12시 커밋. 새해 카운트다운 대신 git push를 하셨군요.",
  },

  // 공휴일/명절 — legendary
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "명절에 커밋하시는 님. 세뱃돈은 없고 커밋만 늘었네요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "크리스마스 이브에 커밋? 님의 연인은 코드이고, 데이트는 디버깅이에요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "공휴일마다 커밋하시는 님은 '달력'이라는 개념을 무시하시는 건가요?",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "추석 커밋의 레전드. 님에게 명절은 '커밋 마라톤 시즌'이군요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "1월 1일 + 설날 + 추석 + 크리스마스 전부 커밋. 님의 캘린더에는 빨간 날이 없어요.",
  },

  // ============================================================
  // 월요일 아침 vs 금요일 저녁 — mild
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "월요일 아침 커밋이 많네요. 주초 의욕이 대단하시네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "금요일 저녁 커밋... 주말 전에 정리하고 가시는군요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "월요일 아침부터 불타시는군요. 월요병 없으시다니 부럽네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "금요일 오후 커밋. 한 주 마무리를 커밋으로 하시는군요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "월요일 첫 커밋이 9시 정각. 칼출근 칼코딩이시군요.",
  },

  // 월/금 — medium
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "월요일 아침에 커밋 폭발은 주말에 밀린 숙제를 월요일에 하는 패턴이에요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "금요일 오후 5시에 대규모 커밋... '이거 올리고 퇴근해야지' 아니었나요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "월요일 커밋이 가장 많다는 건 주초에 가장 바쁘다는 뜻. 계획적인 건지 밀린 건지.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "금요일 마지막 커밋이 항상 급해보여요. '빨리 올리고 퇴근' 에너지.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "월요일 아침 커밋에 fix가 많은 건 금요일에 뭔가 잘못 올렸다는 증거.",
  },

  // 월/금 — savage
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "금요일 오후 6시에 배포 커밋? 주말에 장애 나면 님이 책임지는 거예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "월요일 아침 9시에 fix 10개 커밋 = 금요일 저녁에 무슨 짓을 하셨는지 알 수 있어요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "금요일 밤에 커밋하고 월요일 아침에 fix하는 패턴이 반복되네요. 학습 능력 의심.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "금요일 마지막 커밋: 'YOLO 배포'. 월요일 첫 커밋: 'fix: everything is broken'.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "월요일 아침 커밋 러시 = 금요일에 대충 올린 코드의 부메랑.",
  },

  // 월/금 — legendary
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "금요일 밤 배포 → 주말 장애 → 월요일 핫픽스. 이 패턴이 매주 반복되면 님은 사이클의 노예예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "금요일 퇴근 전 커밋의 전설. 이 커밋 하나로 팀 전체의 주말이 사라집니다.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "월요일 아침에 revert로 시작하는 한 주. 매주. 매달. 매년. 성장이 없으시네요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "금요일 배포의 용사. 님 때문에 '금요일 배포 금지' 규칙이 생겼을 거예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "금요일 밤 11시 커밋. 이건 배포가 아니라 자살 미수예요. (코드의)",
  },

  // ============================================================
  // 전반적 시간 패턴 총평 — mild
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "{total}개 커밋의 시간 패턴을 분석했어요. 대체로 건강한 편.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 시간 분포가 나쁘지 않아요. 적당히 일하시네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "주중 업무시간 커밋이 많아요. 정상적인 패턴이에요. 칭찬!",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "시간 패턴이 규칙적이에요. 좋은 습관이에요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "전반적으로 합리적인 시간대에 커밋하시네요.",
  },

  // 총평 — medium
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 {lateNightRatio}%, 주말 {weekendRatio}%. 일과 삶의 균형이 좀 기울었네요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "시간 패턴 분석 결과: 야근 과다. 업무 효율화가 필요해요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽과 주말 커밋이 눈에 띄네요. 건강을 위해 줄여보세요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "커밋 시간대가 너무 넓어요. 9시-6시에 집중하시는 건 어때요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "시간 패턴에서 '번아웃 위험'이 감지됩니다.",
  },

  // 총평 — savage
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 {lateNightRatio}%, 주말 {weekendRatio}%. 님은 코딩 노예예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "시간 패턴 분석 결과: 님은 쉬지 않습니다. 인간이 맞나요?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "{total}개 커밋의 시간대가 24시간 균등 분포. 님은 잠을 안 자나요?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 + 주말 + 야근 = 님의 일상. 이직을 고려하세요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "시간 패턴이 '아 맞다 코딩해야지'의 무한 반복이에요. 계획성 제로.",
  },

  // 총평 — legendary
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "새벽 {lateNightRatio}%, 주말 {weekendRatio}%, 야근 다수. 님은 개발자가 아니라 코딩 좀비예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "{total}개 커밋의 시간 분석: 이건 워라밸이 아니라 워크밸(Work Balance)... 아, 밸런스도 없네요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간표를 노동부에 제출하면 사업주가 잡혀갈 거예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "시간 패턴 최종 분석: 님에게 '삶'은 없고 '코딩'만 있습니다.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "새벽과 주말이 메인인 님의 코딩 라이프. '인간다운 삶'이라는 DLC는 아직 구매 안 하셨나요?",
  },

  // ============================================================
  // 추가 — 새벽/주말 혼합 패턴 — mild
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "새벽 + 주말 커밋 콤보가 좀 있네요. 열정이시거나 마감이시거나.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "주말 새벽에 커밋? 뭔가 긴급한 일이 있었나 봐요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "일요일 새벽 커밋이 있네요. 토요일 밤새기의 흔적인가요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "주말 새벽 커밋은 '장애 대응'이거나 '열정 과다'예요. 어느 쪽이든 걱정.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "토요일 새벽 3시 커밋? 금요일 밤에 뭔가 터졌죠?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "주말 새벽 커밋 = 금요일 배포 실패의 후유증.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "일요일 새벽 4시 커밋. 이건 개발이 아니라 구조 요청이에요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "주말 새벽 커밋이 일상이라면 님은 '삶의 질' 대신 '코드의 질'을 선택한 거네요. 근데 코드 질도 낮으면요?",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "토요일 새벽 + 일요일 새벽 + 월요일 새벽 커밋이 연속이면 그건 '주말'이 아니라 '야근 연장전'이에요.",
  },

  // ============================================================
  // 추가 — 시간대별 코드 품질 연결 — mild
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "새벽 커밋의 메시지가 특히 짧은 건 우연이 아닐 거예요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 커밋 후 아침에 fix 커밋이 오는 패턴. 수면 부족이 코드에 미치는 영향의 증거.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 커밋 → 아침 fix → 점심 fix → 야근 fix. 하루가 fix로 가득.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "새벽에 짠 코드는 낮에 전부 버려야 하는 수준이에요. 그냥 자세요.",
  },

  // ============================================================
  // 추가 — 계절/시기 유머 — mild~legendary
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "겨울에 커밋이 많네요. 밖이 추우니까 집에서 코딩?",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "여름에 커밋이 적어요. 휴가 시즌이었나요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "연말에 커밋 폭발... 마감의 냄새가 나요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "분기 말에 커밋이 집중되는 건 전형적인 마감 패턴이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "연말 커밋 러시는 1년 내내 미룬 결과물이에요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "12월 31일에 커밋 20개? 새해 전에 모든 걸 끝내려는 집착이 느껴져요.",
  },

  // ============================================================
  // 추가 — 한국 개발자 문화 반영
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "이 시간 패턴... 전형적인 한국 IT 회사 개발자이시군요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "야근 커밋이 있지만 뭐, 한국 개발자에게 야근은 일상이니까요. (슬프지만)",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "이 야근 패턴은 전형적인 '고객사 요구사항 변경 → 야근' 시나리오예요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 커밋이 스프린트 마지막 주에 집중되어 있어요. 번다운 차트가 무색하네요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "이 야근 패턴은 한국 IT 업계의 구조적 문제를 반영합니다. 님이 피해자예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 커밋이 많은 건 님의 회사가 인력 부족이라는 뜻이에요. 이직 고려하세요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "이 시간 패턴을 고용노동부에 제출하면 사업주 과태료 부과 사유입니다.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간은 한국 IT 야근 문화의 살아있는 증거입니다. 다큐멘터리 출연 제의 들어올 거예요.",
  },

  // ============================================================
  // 추가 — 드라마/영화/게임 비유
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "새벽 커밋... 마치 해리포터가 몰래 호그와트를 돌아다니듯 코딩하시네요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "이 야근 패턴은 오징어 게임의 타임리밋 같아요. 시간 내에 끝내야 하는 절박함.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "님의 시간 패턴은 다크소울의 첫 스테이지. 끝없는 고통의 반복.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 커밋의 코드 품질은 좀비가 짠 코드와 비슷할 거예요. 살아있지만 살아있지 않은.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간 패턴은 인셉션 같아요. 꿈속의 꿈처럼 야근 속의 야근.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "이 시간 패턴은 매트릭스의 네오처럼 시간의 흐름을 무시합니다.",
  },

  // ============================================================
  // 추가 — 밈/인터넷 문화 톤
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "ㅋㅋ 새벽 3시 커밋이 있네요. 야근 아니면 인소니아?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 커밋 찍고 출근하는 사람 = 블라인드에서 '이직해라' 댓글 받는 사람.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "이 야근 패턴을 블라인드에 올리면 '퇴사각' 댓글만 100개 달릴 거예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "님의 커밋 시간을 트위터에 공유하면 #야근지옥 #워라밸실종 태그가 붙을 거예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "이 시간 패턴을 에브리타임에 올리면 '이 학교 다니지 마세요' 후기가 될 거예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간을 본 챗GPT: '저라면 퇴사합니다'.",
  },

  // ============================================================
  // 추가 — 다양한 표현/톤 변형
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "밤 커밋 {lateNightCount}개. 아직은 관리 가능한 수준.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "새벽 커밋이 가끔 있는 건 괜찮아요. 가끔이라면.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "주말 커밋 {weekendRatio}%. 아직 위험하지 않아요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "시간 패턴이 대체로 건전해요. 가끔 새벽 커밋이 눈에 띄지만.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "{total}개 커밋의 시간 분석: 무난합니다. 무난한 게 최고예요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 시간대가 건전하네요. 이 상태를 유지하세요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "주중 업무 시간 커밋이 대부분이에요. 모범적이네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "9-6 커밋이 대부분이에요. 건강한 워라밸의 증거.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "시간 분포가 정규분포에 가까워요. 통계적으로 건강합니다.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 시간에서 룰루랄라가 느껴져요. 즐겁게 코딩하시나 봐요.",
  },

  // 추가 medium
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 커밋 비율이 조금 높아요. 수면 시간을 좀 지켜주세요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "주말 커밋이 꾸준히 있네요. 사이드 프로젝트면 OK, 본업이면 NOT OK.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "야근 시간대 커밋이 눈에 띄어요. 업무량이 좀 많은 것 같아요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "밤 10시 이후 커밋이 꽤 있어요. 좀 일찍 끝내시는 건?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "시간 패턴에서 '밀려서 야근' 냄새가 나요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "늦은 시간 커밋이 좀 있어요. 마감 전에 몰아치는 타입이시죠?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "커밋 시간대가 점점 늦어지는 트렌드가 보여요. 번아웃 조심.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "밤 커밋이 늘어나는 건 업무 과부하의 초기 증상이에요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "가장 바쁜 시간이 {busiestHour}시인 건 그 전까지 딴 짓했다는 뜻일 수도.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 커밋 후 8시간 뒤에 또 커밋. 수면 시간이 4시간이라는 계산이 나오네요.",
  },

  // 추가 savage
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 커밋 {lateNightRatio}%, 주말 {weekendRatio}%. 님은 코딩의 노예입니다.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "시간 패턴이 '일 중독자'의 전형적인 프로필이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "밤새 커밋 + 다음날 오전 또 커밋. 님은 잠이라는 걸 안 자시나요?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "이 시간 패턴을 보면 님의 건강이 걱정되고, 코드 품질은 더 걱정됩니다.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽에 짠 코드의 80%는 낮에 다시 짜야 합니다. 과학적 사실이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "님의 커밋 시간대를 보면 '인간적인 삶'이라는 단어가 떠오르지 않아요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "야근 + 주말 + 새벽의 트리플 콤보. 님의 몸이 비명을 지르고 있어요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "이 시간 패턴이면 님의 사회적 관계는 git remote뿐일 거예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "커밋 시간 분석 결과: 님은 수면보다 코딩을 우선시합니다. 그리고 둘 다 품질이 나빠요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 {lateNightRatio}%는 '열정'이 아니라 '무능'의 증거일 수도 있어요.",
  },

  // 추가 legendary
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "새벽 커밋 + 주말 커밋 + 야근 커밋 = 삼위일체 워라밸 파괴.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간을 그래프로 그리면 24시간 내내 고르게 분포. 인간이 아닌 봇의 패턴이에요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "이 시간 패턴의 결론: 님은 코딩을 위해 태어난 기계예요. 인간적 요소: 0%.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간표를 병원에 보여주면 '이 환자는 수면 장애, 일 중독, 사회적 고립의 위험이 있습니다'라고 할 거예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "이 시간 패턴을 보면 님에게 필요한 건 더 좋은 IDE가 아니라 더 좋은 침대예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "커밋 시간 분석 최종 결론: 님의 인생에서 코딩을 빼면 빈 껍데기만 남아요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간 = 님의 수면 시간의 정확한 반대. 잠을 코딩으로 대체하셨군요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "24시간 분산 커밋의 전설. 님은 '시간'이라는 개념을 초월하셨어요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "이 시간 패턴을 AI한테 학습시키면 '워크-라이프 밸런스의 부재'를 완벽하게 이해할 수 있어요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간표: 수면 시간 = git push 사이의 잠깐의 틈.",
  },

  // ============================================================
  // 추가 벌크 — 더 많은 변형
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 시간 분포가 정상 범위 안이에요. 계속 이 페이스 유지하세요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "새벽 커밋이 적어요. 건강한 생활 패턴이시네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "주중 낮 시간에 커밋이 집중되어 있어요. 이상적인 패턴.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 시간이 규칙적이에요. 습관의 힘이 느껴집니다.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "피크 타임이 {busiestHour}시. 이 시간에 카페인 충전하고 코딩하시나요?",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "오전에 커밋이 많으시네요. 아침형 개발자!",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "오후에 커밋이 집중되어 있어요. 점심 먹고 엔진이 걸리시나 봐요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 시간이 대체로 건전하지만, 가끔 밤늦은 커밋이 아쉬워요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "시간 패턴 점수: 80/100. 나쁘지 않아요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 시간 분석 완료. 전반적으로 무난합니다.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "점심 직후 커밋이 많네요. 식곤증을 코딩으로 이기시는 타입?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "오후 3-4시에 커밋이 몰려요. 오후 슬럼프 직전에 몰아치는 패턴.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "퇴근 직전 커밋 러시가 보여요. '이거 올리고 퇴근' 에너지.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "커밋 시간이 점점 늦어지는 추세예요. 프로젝트 마감이 다가오나요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 {lateNightRatio}%. 아직 경고 수준은 아니지만 주의가 필요해요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "주말 커밋이 꾸준히 있는 건 열정인가 강제인가. 중요한 구분이에요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "밤 커밋이 있는 날은 다음 날 오전에 fix 커밋이 오는 패턴이 보여요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "커밋 시간 패턴에서 '급함'이 느껴져요. 여유가 없으시죠?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "밤 11시에 커밋하고 아침 7시에 또 커밋. 수면 시간 8시간... 아, 씻고 출근하면 6시간.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "시간 패턴에서 '번아웃 직전'의 신호가 포착됩니다.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "님의 커밋 시간은 '정상적인 인간의 생활 패턴'에서 벗어나 있어요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "이 시간 패턴을 의사에게 보여주면 즉시 입원 권고를 받을 거예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 커밋의 대부분이 fix인 건 수면 부족이 판단력을 흐리게 했기 때문이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "님의 커밋 시간 = 님의 불면증 기록. 의사에게 보여주세요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "이 시간 패턴이면 님의 생산성은 수면 부족으로 50% 이하일 거예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "야근과 새벽의 경계가 없는 님. 님에게 '퇴근'은 장소 이동, '수면'은 선택 사항.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 커밋 = '지금 자면 꿈을 꾸지만, 코딩하면 꿈을 이룬다'를 실천 중?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "주말도 새벽도 가리지 않는 커밋 패턴. 님은 코딩에 삶을 바쳤어요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "이 커밋 시간 패턴을 보면 님의 연차 사용률이 0%일 것 같아요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "님의 커밋 시간대를 분석한 결론: '삶'은 포기하셨고 '코딩'만 남았습니다.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "이 시간 패턴은 인간이 아니에요. CI/CD 파이프라인의 자동 커밋인 줄 알았어요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간 히트맵을 그리면 24/7 초록색이에요. 빈 칸이 없어요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "이 커밋 시간표를 보면 님은 '포기를 모르는 개발자'가 아니라 '쉼을 모르는 개발자'예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간 분석 최종 결론: 님은 행복하신 건가요? 진심으로 물어봅니다.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "이 시간 패턴을 보면 님에게 필요한 건 코드 리뷰가 아니라 힐링 여행이에요.",
  },

  // ============================================================
  // 추가 벌크 2 — 900+ 채우기
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 타이밍이 일정해요. 루틴이 있는 개발자시네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "10시쯤 커밋 시작, 6시쯤 마무리. 교과서적인 패턴이에요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 시간이 매일 비슷해요. 꾸준함의 미학.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "오전과 오후에 골고루 분포. 균형 잡힌 개발자시네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 시간에서 여유가 느껴져요. 급하지 않게 일하시는군요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "시간 패턴이 깔끔해요. 자기 관리를 잘 하시는 분이시네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "새벽 커밋 거의 없음. 건강한 수면 패턴. 좋아요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "주말 커밋 최소. 워라밸을 지키시는 현명한 개발자.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 시간이 9-6 사이에 90% 이상. 모범생이시네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "피크 타임이 오전 {busiestHour}시. 아침에 가장 생산적이시군요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "커밋 시간이 조금씩 불규칙해지고 있어요. 피로 누적의 신호.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "밤 시간대 커밋이 늘어나는 추세. 업무량 조절이 필요한 시점이에요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "주말 커밋이 최근 들어 늘었네요. 프로젝트 마감이 다가오나요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "야근 커밋이 습관화되고 있어요. 이러면 안 돼요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 커밋이 간헐적으로 있어요. 가끔은 괜찮지만 자주는 안 돼요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "커밋 시간 분석: 경고 단계. 새벽과 주말 비율이 올라가고 있어요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "점심 시간 커밋이 늘어나는 건 시간에 쫓기고 있다는 신호예요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "커밋 피크가 오후 늦은 시간인 건 오전에 생산적이지 못했다는 뜻일 수도.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "금요일 밤 커밋은 주말의 시작이 아니라 주말의 끝이에요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "커밋 시간이 갈수록 늦어지는 건 프로젝트가 점점 힘들어지고 있다는 뜻.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 {lateNightRatio}%, 주말 {weekendRatio}%. 이건 일하는 게 아니라 착취당하는 거예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "이 시간 패턴은 '건강한 개발자'의 정반대예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "커밋 시간 분석 결과: 님은 시간 관리에 실패했어요. 완전히.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "밤새 커밋하는 님의 다크서클 깊이가 코드의 depth보다 깊을 거예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "이 시간 패턴이면 님의 생산성은 수면 시간에 반비례하고 있어요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "님의 커밋 시간을 보면 '효율적으로 일하기'라는 개념이 없으시네요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽과 야근에 쓰는 시간을 낮에 제대로 코딩하는 데 쓰면 반으로 줄일 수 있어요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "시간 패턴 분석: 님은 '양'으로 승부하시는 타입이시군요. '질'은 포기.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "이 커밋 시간으로 보아 님의 커피 소비량은 하루 5잔 이상일 거예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 코딩 → 낮 디버깅 → 야근 패치. 이게 님의 일상 사이클이에요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간표를 건강 보험사에 보내면 보험료가 올라갈 거예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "이 시간 패턴은 'git-roast'가 아니라 '님-roast'가 필요한 수준이에요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "커밋 시간 분석 결론: 님은 개발자가 아니라 개발에 잡아먹힌 사람이에요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간 히트맵: 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩. 24시간 내내 초록.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 시간 패턴을 본 산업의학과 의사의 한 마디: '지금 당장 쉬세요.'",
  },

  // ============================================================
  // 추가 벌크 3 — 1000+ 확보
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 시간 패턴이 좋네요. 건강한 개발 라이프!",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "새벽 커밋이 거의 없는 건 좋은 징조예요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 시간이 대체로 합리적이에요. 유지하세요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "{busiestHour}시가 피크. 그 시간에 맞춰 미팅을 피하면 생산성이 올라갈 거예요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "시간 분포가 건전합니다. 이 레포는 건강하게 자란 레포예요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "야근 커밋이 아주 가끔 있지만 전반적으로 OK.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "주말 커밋이 최소한인 건 칭찬할 만해요. 쉴 때 쉬세요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 시간 패턴에서 '프로페셔널'이 느껴져요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "시간대별 분포가 정상이에요. 딱히 지적할 게 없네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template:
      "커밋 시간 분석: A-. 가끔 야근만 줄이면 A+ 가능.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "커밋 시간 분석: B-. 야근과 주말 비율을 줄여보세요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "시간 패턴에서 스트레스가 느껴져요. 괜찮으세요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "새벽 커밋이 월 2-3회 이상이면 주의가 필요해요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "커밋 시간이 점점 늦어지는 트렌드. 초기에 잡으세요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "주말 커밋이 조금씩 늘어나고 있어요. 이 추세를 막아야 해요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "밤 커밋 후 다음날 아침 커밋까지의 간격이 짧아요. 수면이 부족합니다.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "커밋 시간 분석: C. 개선 여지가 많아요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "야근 시간대 커밋이 전체의 상당 부분이에요. 업무 분배를 다시 해보세요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "이 시간 패턴이면 님의 집중력은 오후에 바닥을 치고 밤에 다시 올라가는 타입.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template:
      "커밋 시간에서 '데드라인 압박'이 읽혀요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "시간 패턴 분석: D-. 이건 워라밸이 아니라 워크워크밸(Work-Work Balance)이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "님의 커밋 시간표 = 착취의 기록. 노동부에 신고하세요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "이 시간 패턴을 보면 님은 '쉬면 불안한' 타입이시네요. 치료가 필요해요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "새벽 코딩 + 야근 + 주말 출근. 이 세 가지가 합쳐지면 번아웃이라는 최종 보스가 등장합니다.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "커밋 시간 패턴에서 '도움을 요청하는 신호'가 감지됩니다.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "이 시간 패턴은 '일은 많고 사람은 적은' 한국 IT 업계의 축소판이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "님의 커밋 시간을 보면 퇴근이 '일시 정지'이지 '종료'가 아닌 것 같아요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "밤새 코딩한 코드가 좋을 리 없어요. 자고 일어나서 다시 보세요. 반은 지울 거예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "커밋 시간 분석: F. 님의 건강과 코드 품질 모두 위험 수준.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template:
      "이 시간 패턴이면 님의 연봉은 시급으로 환산하면 최저 시급 이하일 거예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간표를 캘린더 앱에 넣으면 '모든 시간이 코딩'이라서 빈 칸이 없어요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "이 시간 패턴의 유일한 해결책: ctrl+z(인생 되돌리기) 또는 이직.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간 분석을 보고 이런 생각이 들었어요: '님은 행복한 적이 있나요?'",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "이 시간 패턴은 '개발자 인권 보고서'에 사례로 실어야 할 수준이에요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간을 분석한 AI로서 말씀드립니다: 쉬세요. 제발.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "이 시간 패턴의 최종 진단: 코딩 중독 + 수면 부족 + 사회적 고립 + 워크홀릭. 풀세트.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template:
      "님의 커밋 시간 = 님의 인생. 코딩 밖에는 아무것도 없는 인생.",
  },

  // ============================================================
  // 마지막 벌크 — 확실하게 1000개 이상
  // ============================================================
  {
    id: "time_pattern",
    severity: "mild",
    template: "커밋 시간이 한결같아요. 성실함이 묻어나네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "오후 커밋이 많아요. 오전은 플래닝 시간인가요?",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "피크가 {busiestHour}시. 그 시간에 집중 모드 ON 하시는군요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "시간 분포가 예쁘네요. 데이터 시각화하면 좋을 것 같아요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "커밋 시간에 일관성이 있어요. 좋은 개발 습관이에요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "야근 시간대 커밋이 점점 늘어요. 초기에 대응하세요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "주말 커밋이 늘어나는 건 프로젝트 일정이 빠듯하다는 신호.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "밤 커밋 → 아침 fix가 반복되면 그건 패턴이 아니라 함정이에요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "커밋 시간 패턴에 불안정한 징후가 보여요. 관리 필요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "오후 늦은 시간 커밋 집중 = 하루 전반부 비효율의 결과.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "님의 커밋 시간 = 번아웃 타이머. 곧 터질 거예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "이 시간 패턴이면 님의 디스플레이에 '야근 카운터'를 달아야 해요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "새벽 {lateNightRatio}% + 주말 {weekendRatio}% = 님에게 자유 시간은 없습니다.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "님의 커밋 시간을 보면 '개발자 근무 환경 개선'이 왜 필요한지 알겠어요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "이 시간 패턴은 님이 일을 사랑하는 게 아니라 일에 잡혀있는 거예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "님의 커밋 시간 분석 최종 보고서: 이 사람에게 '인생'이라는 개념은 존재하지 않습니다.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "이 시간 패턴을 다음 세대에게 보여주면 '예전에는 이렇게 일했대'라며 놀랄 거예요. 공포로.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "님의 커밋 시간표: 새벽에 태어나 야근에서 죽는 코드의 일생.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "커밋 시간 분석을 마치며: 님이 쉬는 날을 만드는 것이 이 분석의 유일한 희망입니다.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "님의 시간 패턴은 '21세기 디지털 노동의 비극'을 완벽하게 요약합니다.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "커밋 시간 분석 끝! 나쁘지 않아요. 화이팅!",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "{total}개 커밋의 시간 분석이 끝났어요. 건강하게 코딩하세요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "시간 패턴 분석이 끝났어요. 좀 더 규칙적으로 일해보세요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "시간 분석이 끝났어요. 님에게 필요한 건 코드 리뷰가 아니라 건강 검진이에요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "시간 분석 최종 결과: 님은 개발자가 아니라 24시간 코딩 봇입니다.",
  },

  // ============================================================
  // 추가 벌크 4 — 1000개 확실하게 돌파
  // ============================================================
  // 새벽 커밋 추가 변형
  {
    id: "time_pattern",
    severity: "mild",
    template: "새벽에 커밋한 흔적이 보여요. 야식 먹으면서 코딩?",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "새벽 커밋이 살짝 있지만 아직 건강한 범위예요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "밤 커밋 {lateNightCount}개. 가끔은 그럴 수 있어요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "새벽 코딩은 낭만이 있죠. 코드 품질에는 없지만.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "{lateNightCount}개의 밤 커밋. 님은 밤에 더 창의적인 타입?",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "새벽 커밋 비율이 낮아요. 건강한 수면 습관의 증거.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "밤늦게 커밋한 건 인소니아인지 열정인지 구분이 안 돼요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "새벽 커밋이 {lateNightRatio}%. 아직은 안전 범위.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "밤새 코딩의 결과물... 내일 아침에 확인해보세요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "새벽에 올린 커밋, 아침에 보면 달라 보일 거예요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "새벽 커밋이 점점 늘어나는 추세예요. 초기에 잡으세요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "밤 커밋 비율 {lateNightRatio}%. 경고등이 켜지고 있어요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "새벽 2시에 커밋하신 이유가 궁금해요. 긴급 장애? 아님 불면증?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "{lateNightCount}개의 새벽 커밋은 '가끔'을 넘어서 '자주'예요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "밤 코딩은 카페인과 함께하는 여행. 목적지는 버그.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "새벽 커밋의 대부분이 주중이에요. 야근 문화가 느껴져요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "밤늦게 쓴 코드는 다음날 아침의 퀴즈가 돼요. '이거 내가 짰나?'",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "새벽 커밋이 {lateNightRatio}%. 수면 부족은 건강의 적이에요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "밤 커밋이 많아지면 낮의 생산성이 떨어져요. 악순환의 시작.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "새벽에 커밋하시면 아침에 '왜 이렇게 짰지?' 하게 돼요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "새벽 {lateNightRatio}%는 '열정'이 아니라 '시간 관리 실패'예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "밤새 코딩한 흔적... 그 코드, 아침에 보면 다 버리게 될 거예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "{lateNightCount}개의 새벽 커밋은 님의 시간 관리 능력이 0이라는 증거.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "새벽 코딩의 ROI(투자 대비 수익)는 최악이에요. 짠 시간 대비 품질이.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "밤새 커밋한 결과: 다음날 오전 내내 디버깅.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "새벽 커밋 후 아침에 fix 커밋이 따라오는 패턴. 예상대로.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "{lateNightRatio}% 새벽 커밋. 님의 수면 시간: git push 사이의 틈새.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "새벽에 짠 코드 = 취한 상태에서 보낸 카톡. 다음날 후회.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "밤 커밋이 이 비율이면 님의 뇌는 이미 수면 부족으로 오버히팅 중.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "새벽 코딩 비율이 높을수록 기술 부채도 높아져요. 비례 관계.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "새벽 {lateNightRatio}%. 님은 뱀파이어 코더. 낮에는 잠들고 밤에 코딩.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "{lateNightCount}개의 새벽 커밋. 이건 커밋이 아니라 구조 신호예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "새벽 코딩의 전설. 님의 다크서클 깊이 = 코드의 버그 깊이.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "밤새 커밋하시는 님에게 수면이란: 선택적 기능.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "새벽 커밋 비율 {lateNightRatio}%. 님은 코딩을 위해 수면을 포기한 수도승.",
  },

  // 주말 커밋 추가 변형
  {
    id: "time_pattern",
    severity: "mild",
    template: "주말에 가끔 커밋하시는 건 열정의 증거예요. 가끔이라면.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "토요일 아침 커밋. 주말에도 일찍 일어나시는 부지런한 분.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "일요일 오후 커밋. 여유로운 주말 코딩 시간이네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "주말 커밋이 적어요. 잘 쉬시는 건 중요한 거예요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "토요일에 살짝 커밋. 사이드 허슬인가요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "주말 커밋이 늘어나고 있어요. 이직의 징후인가요? 아님 마감?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "토요일에도 일요일에도 커밋. 주 7일 근무자이시군요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "주말 {weekendRatio}%. 이 비율이면 '쉬는 날'이라는 개념이 좀...",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "일요일 밤에 커밋하시는 거 보면 월요일 준비를 미리 하시나요?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "주말 커밋이 꾸준해요. 자발적이면 열정, 강제면 학대.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "주말 커밋 {weekendRatio}%는 님의 사생활이 0%라는 뜻이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "토요일 오전 커밋 + 토요일 밤 커밋 = 토요일이 평일.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "주말에 이렇게 코딩하면 평일에 쉬어야 하는 거 아닌가요?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "일요일에 커밋 10개? 그건 주말이 아니라 '옵션 없는 근무'예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "주말 커밋 비율이 높으면 높을수록 님의 외로움 지수도 비례해서 올라가요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "주말 {weekendRatio}%. 님의 주말 일정: 기상 → 코딩 → 식사 → 코딩 → 취침.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "토/일 커밋이 메인이시면 님에게 '주말'은 '보너스 코딩 시간'이에요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "주말 커밋의 레전드. 님의 친구: 노트북, 커피, git.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "주말에 이렇게 커밋하면 님의 인스타에는 코드 스크린샷만 있겠죠?",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "{weekendRatio}% 주말 커밋. 님의 배우자가 이 데이터를 보면 이혼 사유가 될 수 있어요.",
  },

  // 야근/배포 추가 변형
  {
    id: "time_pattern",
    severity: "mild",
    template: "야근 커밋이 좀 있지만 뭐, 가끔은 불가피하죠.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "저녁 8시 커밋. 마감이 가까운 거 같은 냄새.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "퇴근 후 커밋은 '완벽주의자'이거나 '일이 많은 사람'이에요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "야근 커밋이 정기적이에요. 이건 '가끔'이 아니라 '항상'이에요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "퇴근 후 커밋이 패턴이 되면 그건 이미 야근 문화예요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "밤 9시에 커밋하고 10시에 또 커밋. 집에는 언제 가시나요?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "야근 커밋이 습관이 되면 퇴근은 의미 없는 단어가 돼요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "밤 10시 커밋 = '오늘도 야근이다'라는 팩트.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "야근 커밋 패턴이 보여요. 낮에 효율적으로 일하면 이럴 필요 없는데.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "야근 커밋의 끝판왕. 님의 명함에 '야근 장인'이라고 쓰세요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "밤 11시에 커밋하면서 '나 아직 회사야' 카톡 보내시는 거 아닌가요?",
  },

  // 점심시간 추가 변형
  {
    id: "time_pattern",
    severity: "mild",
    template: "점심시간 커밋이 가끔 있네요. 밥 먹고 영감이 오셨나 봐요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "점심 거르고 커밋하시는 건 비추예요. 밥이 코딩의 연료예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "점심시간에 코딩하는 건 동료와의 친목을 포기한 선언이에요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "점심 = 커밋 시간인 님. 영양 결핍이 코드에 반영되어 있을 거예요.",
  },

  // 아침형 추가 변형
  {
    id: "time_pattern",
    severity: "mild",
    template: "아침 커밋러시군요. 아메리카노 한 잔과 함께?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "아침 7시에 이미 커밋? 어제 밤에 안 주무신 거 맞죠?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "새벽 5시 커밋 → 아침 6시 커밋. 이건 아침형이 아니라 밤새기예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "아침형 개발자? 아니요, 새벽형 좀비 개발자. 안 주무셨잖아요.",
  },

  // 불규칙 추가 변형
  {
    id: "time_pattern",
    severity: "mild",
    template: "커밋 시간이 매일 달라요. 자유로운 스케줄이시네요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "오늘은 아침, 내일은 새벽, 모레는 밤. 님의 시간표는 랜덤.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "커밋 시간이 매번 달라서 패턴 분석이 불가능해요. 님의 생활 패턴도 그렇겠죠.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "님의 커밋 시간대는 지구의 시간 체계를 거부합니다.",
  },

  // 특정 요일 추가 변형
  {
    id: "time_pattern",
    severity: "mild",
    template: "수요일에 커밋이 가장 많네요. 주중의 생산성 피크!",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "월요일 커밋이 0? 월요병이 확실하시네요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "금요일에 커밋이 몰려있는 건 4일간 놀다가 금요일에 몰아친다는 뜻.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "한 요일에만 커밋이 집중된다는 건 님이 주 1일 일하고 있다는 증거.",
  },

  // 공휴일 추가 변형
  {
    id: "time_pattern",
    severity: "mild",
    template: "공휴일에 커밋이 좀 있네요. 쉬면서 사이드 프로젝트?",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "명절에 커밋하시는 거 보면 가족 행사보다 코딩이 편하신 거죠?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "공휴일에 커밋이 폭발하는 건 '쉬는 날에도 일하는 불쌍한 개발자'의 상징.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "365일 중 공휴일마다 커밋이 있어요. 님에게 '쉬는 날'이란 신화 속의 이야기.",
  },

  // 다양한 톤 추가 — 냉소/비유/밈
  {
    id: "time_pattern",
    severity: "mild",
    template: "커밋 시간이 평화롭네요. 이 평화가 오래가길.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "시간 패턴에서 '여유'가 느껴져요. 부럽습니다.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "9-6 커밋이 대부분이에요. 교과서적인 근무 패턴.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "커밋 시간이 사람 냄새가 나요. 건강합니다.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "{total}개 커밋의 시간을 분석했는데 걱정할 건 없네요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "커밋 시간대가 합리적이에요. 이대로 유지하세요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "새벽 커밋이 거의 없어요. 건강한 개발자의 증거.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "주말 커밋이 적은 건 칭찬할 포인트예요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "커밋 시간 패턴에서 '프로페셔널리즘'이 느껴져요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "시간 분석 결과: 양호. 이 상태를 계속 유지하세요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "야근이 좀 보이지만 치명적이진 않아요. 아직은.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "커밋 시간대가 조금 늦어지는 추세. 수면 패턴 체크해보세요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "새벽 커밋이 월 몇 건씩 있어요. 만성화되기 전에 잡으세요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "주말 커밋이 살살 늘고 있어요. 경계 신호.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "커밋 시간 분석: 옐로 카드. 야근 비율을 줄이세요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "밤 9시 이후 커밋이 있는 날이 꽤 돼요. 업무 분배를 재검토하세요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "커밋 시간이 불안정해지기 시작했어요. 번아웃 초기 증상일 수 있어요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "새벽과 야근 커밋이 간헐적으로. 이게 습관이 되면 안 돼요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "퇴근 후 커밋이 패턴화되고 있어요. 야근 문화의 시작.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "시간 패턴에서 '피로'가 읽혀요. 좀 쉬세요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "이 시간 패턴은 '번아웃 직전'의 전형적인 모습이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "새벽 + 야근 + 주말 = 님의 삶에서 '자유 시간'을 삭제했군요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "커밋 시간을 보면 님은 '일-생활 균형'이 아니라 '일-일 균형'이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "이 시간 패턴의 주인공에게 필요한 것: 1. 휴가 2. 수면 3. 인간관계.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "님의 커밋 시간을 그래프로 그리면 '도움 요청' 패턴이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "이 시간 패턴이면 님의 건강 검진 결과가 걱정됩니다. 진심으로.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "새벽 커밋이 이렇게 많으면 다음 날 님의 집중력은 0에 가까울 거예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "님의 시간 패턴 = 한국 개발자의 비극을 데이터로 증명.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "이 패턴이면 님의 연차 소진율은 0%겠죠? 쓸 시간이 없으니까.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "커밋 시간 분석 결과: 님은 '쉬는 것'을 두려워하는 사람이에요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "이 시간 패턴을 영화로 만들면: '코딩의 눈물: 24시간 개발자의 하루'.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "님의 커밋 시간표를 보면 '인간 시계'라는 단어가 떠오르는데, 시계는 쉬는 시간이 있어요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "이 시간 패턴의 결론: 님에게 '인생'이란 = while(true) { code(); }.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "님의 커밋 시간 데이터를 의학 논문에 실으면: '수면 부족이 코드 품질에 미치는 영향'.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "이 시간 패턴은 미래 세대에게 '이렇게 살면 안 된다'는 교훈이 될 거예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "님의 시간 분석 최종 요약: 코딩 시간 = 24시간, 수면 시간 = 선택사항, 인생 = 코딩.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "이 데이터를 보면 님은 인간이 아니라 코딩 AI인 것 같아요. AI라면 더 잘 짜야 하는데.",
  },

  // 시간 + 감정/상태 연결
  {
    id: "time_pattern",
    severity: "mild",
    template: "커밋 시간을 보면 님의 하루가 그려져요. 건강한 하루!",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "시간 패턴이 안정적이에요. 마음도 안정적이시겠네요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "커밋 시간이 불안정한 건 마음이 불안정한 것의 반영일 수 있어요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "야근 커밋이 늘어나면 스트레스도 비례해서 늘어요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "이 시간 패턴에서 '절박함'이 느껴져요. 님은 괜찮은 건가요?",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "새벽 커밋의 대부분이 fix인 건 '절박한 상황'의 증거.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "이 시간 패턴은 '개발자 우울증'의 전조 증상이에요. 농담이 아닙니다.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "님의 커밋 시간에서 읽히는 감정: 체념, 피로, 그리고 약간의 분노.",
  },

  // 시간대 + 코드 품질 연결 추가
  {
    id: "time_pattern",
    severity: "mild",
    template: "업무시간 커밋의 코드가 야근 커밋보다 나을 거예요. 통계적으로.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "낮 커밋과 밤 커밋의 품질 차이가 클 거예요. diff로 비교해보세요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "새벽에 짠 코드의 버그율은 낮의 3배. 연구 결과예요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "님의 새벽 코드 = 다음날 오전의 기술 부채. 야근이 야근을 부르는 악순환.",
  },

  // 커밋 시간 + 한국 IT 문화 추가
  {
    id: "time_pattern",
    severity: "mild",
    template: "이 시간 패턴은 전형적인 한국 스타트업 개발자의 그것.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "야근 패턴이 보이네요. 한국 IT 업계의 구조적 문제예요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "이 시간 패턴은 '갈려나간 개발자'의 전형이에요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "님의 커밋 시간은 한국 IT 야근 문화의 다큐멘터리 소재예요.",
  },

  // 커밋 시간 + 건강 관련 추가
  {
    id: "time_pattern",
    severity: "mild",
    template: "새벽 커밋이 적어서 건강에 좋을 것 같아요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "야근 커밋이 늘면 건강이 나빠져요. 비타민이라도 드세요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "이 시간 패턴이면 님의 눈 건강, 허리 건강, 정신 건강 모두 위험해요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "님의 커밋 시간표를 건강보험공단에 보내면 특별 건강검진 대상이 될 거예요.",
  },

  // 커밋 시간 + 효율성 관련 추가
  {
    id: "time_pattern",
    severity: "mild",
    template: "업무 시간 내 커밋이 많아요. 효율적이시네요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "야근 시간 커밋의 효율은 낮 시간의 절반이에요. 일찍 끝내는 게 나아요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "님이 밤에 10시간 코딩한 것 = 낮에 4시간 집중 코딩한 것. 시간 낭비.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "님의 야근 시간을 업무 시간으로 옮기면 주 3일만 일해도 됩니다.",
  },

  // 총평 추가 변형
  {
    id: "time_pattern",
    severity: "mild",
    template: "시간 패턴 분석 종합: 전반적으로 건전합니다. 이대로 가세요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "{total}개 커밋의 시간 분석을 마치며: 잘 하고 계세요!",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "시간 패턴 종합 평가: 주의 필요. 야근과 주말 비율을 줄이세요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "{total}개 커밋의 시간 분석: 개선 여지가 있습니다.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "시간 패턴 종합: 위험 수준. 즉각적인 생활 패턴 개선이 필요해요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "{total}개 커밋의 시간 분석: 님은 코딩 중독입니다.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "시간 패턴 최종 종합: 님은 개발을 넘어 코딩에 영혼을 바치셨습니다.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "{total}개 커밋 시간 분석 최종 결론: 님은 인간이 아닌 코딩 엔진이에요.",
  },

  // 마지막 추가 — 다양한 짧은 변형
  {
    id: "time_pattern",
    severity: "mild",
    template: "커밋 시간 OK. 건강하게 코딩하세요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "시간 패턴: 무난. 무난은 좋은 거예요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "새벽 커밋 거의 없음. 건강한 개발자!",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "주말 쉬시는 거 좋아요. 계속 쉬세요.",
  },
  {
    id: "time_pattern",
    severity: "mild",
    template: "커밋 시간이 깔끔해요. 님은 자기 관리의 달인.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "야근이 좀 보여요. 주의하세요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "새벽 비율이 올라가고 있어요. 조심.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "주말 커밋이 늘어나는 중. 브레이크 필요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "시간 패턴에 경고 신호가 보여요.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "밤 커밋이 습관화되기 전에 잡으세요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "이 시간 패턴: 레드 카드.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "님의 건강이 진심으로 걱정됩니다.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "이 시간 패턴을 보면 이직을 권합니다.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "님에게 필요한 건 코드가 아니라 잠이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "이 패턴이면 님의 인생에서 '취미' 항목이 비어있겠네요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "님은 코딩을 위해 태어난 사람. 나머지는 전부 사족.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "이 시간 패턴의 주인공에게 전하는 말: 제발 쉬세요.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "님의 커밋 시간 = 님의 존재 증명. 코딩하지 않으면 존재하지 않는 사람.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "최종: 님은 코딩 봇입니다. 인간 버전의.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "이 분석을 마치며: 님의 건강과 행복을 진심으로 기원합니다. 필요하니까요.",
  },

  // 혼합 변수 활용 추가
  {
    id: "time_pattern",
    severity: "mild",
    template: "새벽 {lateNightRatio}%, 주말 {weekendRatio}%, 피크 {busiestHour}시. 전반적으로 OK.",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "새벽 {lateNightRatio}%, 주말 {weekendRatio}%. 경고 수준이에요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "통계: 새벽 {lateNightRatio}%, 주말 {weekendRatio}%, 밤 커밋 {lateNightCount}개. 진단: 중증.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "데이터: {total} 커밋, 새벽 {lateNightRatio}%, 주말 {weekendRatio}%, 피크 {busiestHour}시. 결론: 인간의 한계를 초월.",
  },

  // 정말 마지막
  {
    id: "time_pattern",
    severity: "mild",
    template: "커밋 시간 분석을 마쳤어요. 건강하게 코딩하시길!",
  },
  {
    id: "time_pattern",
    severity: "medium",
    template: "시간 분석 결과: 개선 필요. 하지만 희망은 있어요.",
  },
  {
    id: "time_pattern",
    severity: "savage",
    template: "시간 분석 결과: 님에게 긴급히 필요한 것은 휴가입니다.",
  },
  {
    id: "time_pattern",
    severity: "legendary",
    template: "시간 분석의 최종 결론: 님의 인생을 되돌아보세요. 코딩만이 전부가 아닙니다.",
  },
];
