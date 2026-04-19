import type { RoastTemplate } from "../../types.ts";

export const streakTemplates: RoastTemplate[] = [
  // ============================================================
  // 최장 연속 커밋 — 1일 (mild)
  // ============================================================
  { id: "streak", severity: "mild", template: "최장 연속 커밋 {longestStreak}일... 하루요? 시작이 반이라고 했으니까 50% 달성입니다." },
  { id: "streak", severity: "mild", template: "{longestStreak}일 연속 커밋이라니. 그래도 커밋을 하긴 했네요." },
  { id: "streak", severity: "mild", template: "연속 커밋 {longestStreak}일. 매일 1개는 커밋하겠다는 결심, 하루 만에 포기하셨군요." },
  { id: "streak", severity: "mild", template: "잔디 연속 {longestStreak}일. 잔디밭이 아니라 화분 하나 수준이네요." },
  { id: "streak", severity: "mild", template: "최장 스트릭 {longestStreak}일. 출석체크도 하루는 하셨군요." },
  { id: "streak", severity: "mild", template: "{longestStreak}일 연속이면 '연속'이라는 단어를 쓰기도 민망하네요." },
  { id: "streak", severity: "mild", template: "연속 커밋 기록: {longestStreak}일. 최소한의 의지는 보여주셨습니다." },
  { id: "streak", severity: "mild", template: "{longestStreak}일 스트릭... '오늘부터 매일 커밋하겠다'고 선언한 그 날이 마지막이었나요?" },
  { id: "streak", severity: "mild", template: "최장 연속 {longestStreak}일. 일기도 하루 쓰고 안 쓰는 타입이시죠?" },
  { id: "streak", severity: "mild", template: "{longestStreak}일 스트릭이라... 헬스장 1일 체험권 느낌이네요." },
  { id: "streak", severity: "mild", template: "연속 커밋 {longestStreak}일. 잔디 심기? 잔디 구경하기 수준이에요." },
  { id: "streak", severity: "mild", template: "{longestStreak}일 연속 커밋. 내일은 2일이 될 수도 있었는데, 아쉽네요." },
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 매일 커밋은 내일부터 시작하는 거죠?" },
  { id: "streak", severity: "mild", template: "{longestStreak}일 연속이면 점심 먹다가 커밋 한 번 한 거 아닌가요?" },
  { id: "streak", severity: "mild", template: "연속 {longestStreak}일 커밋. 새해 첫날 딱 한 번 한 거 맞죠?" },

  // 최장 연속 커밋 — 7일 (mild)
  { id: "streak", severity: "mild", template: "최장 연속 커밋 {longestStreak}일. 일주일은 해봤다는 건 칭찬해야 하나..." },
  { id: "streak", severity: "mild", template: "{longestStreak}일 연속 커밋! 주간 미션 클리어 수준이네요." },
  { id: "streak", severity: "mild", template: "연속 커밋 {longestStreak}일. 월~일 다 했네요. 주말에도요? 대단한데 아쉬운..." },
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 일주일 개근은 했는데, 그 다음 주는 어디갔나요?" },
  { id: "streak", severity: "mild", template: "{longestStreak}일이면 딱 한 주. 그 다음은 여름 휴가 갔나 봐요." },
  { id: "streak", severity: "mild", template: "연속 {longestStreak}일. 일주일 동안의 열정, 감동적이었습니다(과거형)." },
  { id: "streak", severity: "mild", template: "최장 {longestStreak}일 스트릭. 주간 목표 달성! 월간은 실패!" },
  { id: "streak", severity: "mild", template: "{longestStreak}일 연속이면 Sprint 1만 살아남은 거네요." },
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 1주일 무료 체험판 쓰다가 유료 전환 안 한 느낌." },
  { id: "streak", severity: "mild", template: "{longestStreak}일... 한 주간의 불꽃 같은 열정, 그 후엔 재만 남았군요." },
  { id: "streak", severity: "mild", template: "연속 {longestStreak}일 커밋. 주간 과제 마감이었던 거 아닌가요?" },
  { id: "streak", severity: "mild", template: "{longestStreak}일 스트릭이면 딱 '이번 주만 열심히' 모드네요." },
  { id: "streak", severity: "mild", template: "최장 연속 {longestStreak}일. 교수님이 일주일 과제 내주셨나 봐요." },
  { id: "streak", severity: "mild", template: "연속 커밋 {longestStreak}일. 7일 후 '아 좀 쉬자' 하고 영원히 쉬셨네요." },

  // 최장 연속 커밋 — 30일 (medium)
  { id: "streak", severity: "medium", template: "최장 연속 {longestStreak}일! 한 달이나 매일 커밋하다니 대단합니다만, 그 뒤의 공백이..." },
  { id: "streak", severity: "medium", template: "{longestStreak}일 연속 커밋. 30일 챌린지 성공! 31일차에 바로 탈주하셨군요." },
  { id: "streak", severity: "medium", template: "스트릭 {longestStreak}일. 한 달 동안의 불꽃 같은 열정, 존경합니다." },
  { id: "streak", severity: "medium", template: "연속 커밋 {longestStreak}일이면 한 달 개근상감이네요. 그 뒤는 장기 결석이지만." },
  { id: "streak", severity: "medium", template: "{longestStreak}일 스트릭. 정기 구독 1개월 후 해지한 느낌이에요." },
  { id: "streak", severity: "medium", template: "한 달간 매일 커밋했다가 갑자기 사라진 당신, 번아웃이었나요?" },
  { id: "streak", severity: "medium", template: "최장 {longestStreak}일. 부트캠프 기간이랑 정확히 일치하는 것 같은데..." },
  { id: "streak", severity: "medium", template: "{longestStreak}일 연속이면 인상적이긴 한데, 그 뒤 {longestGap}일 공백은 뭔가요?" },
  { id: "streak", severity: "medium", template: "연속 커밋 {longestStreak}일. '매일 코딩' 다짐, 한 달은 버텼네요." },
  { id: "streak", severity: "medium", template: "스트릭 {longestStreak}일... 코딩 테스트 준비 기간이었나 봐요." },
  { id: "streak", severity: "medium", template: "{longestStreak}일 연속 후 증발. 전형적인 '의욕 충전 → 방전' 패턴이에요." },
  { id: "streak", severity: "medium", template: "최장 {longestStreak}일 스트릭. 월간 목표는 달성했으니 연간은... 글쎄요." },
  { id: "streak", severity: "medium", template: "{longestStreak}일. 한 달 동안 당신의 GitHub은 초록빛이었습니다. 지금은 사막이지만." },
  { id: "streak", severity: "medium", template: "연속 {longestStreak}일 커밋! 잔디가 한 줄만 예쁜 타입이시네요." },

  // 최장 연속 커밋 — 100일+ (medium/savage)
  { id: "streak", severity: "medium", template: "최장 연속 {longestStreak}일! 100일 넘게 매일 커밋하다니 존경스럽습니다." },
  { id: "streak", severity: "medium", template: "{longestStreak}일 스트릭이라고? 혹시 봇 아닌가요?" },
  { id: "streak", severity: "medium", template: "연속 {longestStreak}일 커밋. 이건 열정인지 강박인지 헷갈리네요." },
  { id: "streak", severity: "savage", template: "{longestStreak}일 연속 커밋... 진짜 사람이 맞나요? 크론잡 같은 당신." },
  { id: "streak", severity: "savage", template: "최장 {longestStreak}일. GitHub Actions보다 꾸준한 당신, 혹시 CI/CD인가요?" },
  { id: "streak", severity: "savage", template: "연속 {longestStreak}일이면 매일 README에 점 하나씩 찍은 거 아닌가요?" },
  { id: "streak", severity: "savage", template: "{longestStreak}일 스트릭... 잔디 밭이 아니라 잔디 정글이네요. 건강은 괜찮으시고요?" },
  { id: "streak", severity: "savage", template: "최장 연속 {longestStreak}일. 이렇게까지 해서 잔디를 채우고 싶었나요?" },
  { id: "streak", severity: "savage", template: "{longestStreak}일 연속 커밋이면 코드 품질보다 잔디 색깔이 더 중요한 타입이시죠." },
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일. 여자친구/남자친구가 없다는 걸 코드로 증명하셨네요." },
  { id: "streak", severity: "savage", template: "{longestStreak}일 연속이면 명절에도 커밋하신 거잖아요. 가족이 걱정하고 있어요." },
  { id: "streak", severity: "savage", template: "연속 {longestStreak}일... 주변 사람들한테 '나 {longestStreak}일 연속 커밋했어' 자랑하셨죠?" },
  { id: "streak", severity: "legendary", template: "{longestStreak}일 연속 커밋. 이건 개발자가 아니라 커밋 머신입니다. 012호 커밋봇." },
  { id: "streak", severity: "legendary", template: "최장 {longestStreak}일 스트릭. 이 정도면 GitHub에서 상 줘야 합니다. '인간 CI 상'." },

  // ============================================================
  // 최장 공백 — 7일 (mild)
  // ============================================================
  { id: "streak", severity: "mild", template: "최장 공백 {longestGap}일. 일주일 정도는 쉴 수 있죠. 아직은 건강한 수준입니다." },
  { id: "streak", severity: "mild", template: "{longestGap}일 공백이면 주말 포함 딱 한 주. 합리적인 휴식이에요." },
  { id: "streak", severity: "mild", template: "최장 공백 {longestGap}일. 코딩 외에도 삶이 있다는 증거네요." },
  { id: "streak", severity: "mild", template: "{longestGap}일 쉬었다고요? 재충전 시간은 필요하니까요." },
  { id: "streak", severity: "mild", template: "공백 {longestGap}일. 일주일은 '잠깐 쉬었다' 수준이에요." },
  { id: "streak", severity: "mild", template: "최장 {longestGap}일 공백. 워라밸을 지키시는군요. 아직까진." },
  { id: "streak", severity: "mild", template: "{longestGap}일 쉬다 돌아온 당신, 그래도 돌아왔으니 됐어요." },
  { id: "streak", severity: "mild", template: "공백 기록 {longestGap}일. 딱 한 번의 긴 주말이었나 봐요." },
  { id: "streak", severity: "mild", template: "{longestGap}일 동안 뭐 하셨나요? 여행? 아 그냥 쉬신 거군요." },
  { id: "streak", severity: "mild", template: "최장 공백 {longestGap}일. 이 정도는 '활발한 개발자' 카테고리에요." },

  // 최장 공백 — 30일 (medium)
  { id: "streak", severity: "medium", template: "최장 공백 {longestGap}일. 한 달이요? 코드가 당신을 기다렸을 텐데..." },
  { id: "streak", severity: "medium", template: "{longestGap}일 공백이면 한 달 넘게 코딩 안 한 거잖아요. 근황이 궁금해지네요." },
  { id: "streak", severity: "medium", template: "공백 {longestGap}일. 한 달 동안 뭐 하셨나요? 리얼 월드에서 사셨나요?" },
  { id: "streak", severity: "medium", template: "최장 {longestGap}일 공백. GitHub이 '이 사용자는 아직 살아있나요?' 팝업 띄울 뻔했네요." },
  { id: "streak", severity: "medium", template: "{longestGap}일이나 쉬시다니. 코드가 먼지 쌓였겠어요." },
  { id: "streak", severity: "medium", template: "공백 {longestGap}일. 시험 기간이었나요? 아니면 현생이 바빴나요?" },
  { id: "streak", severity: "medium", template: "{longestGap}일 공백 후 복귀. '아 코딩해야지' 하면서 한 달이 지나간 거죠?" },
  { id: "streak", severity: "medium", template: "최장 공백 {longestGap}일. 한 달 안식월이라고 하기엔 좀..." },
  { id: "streak", severity: "medium", template: "{longestGap}일 동안의 침묵. 프로젝트가 울고 있었을 거예요." },
  { id: "streak", severity: "medium", template: "공백 {longestGap}일. 패스워드 까먹으신 거 아니죠?" },
  { id: "streak", severity: "medium", template: "{longestGap}일 공백이면 '방학이었어요'가 유일한 변명이네요." },
  { id: "streak", severity: "medium", template: "최장 {longestGap}일 공백. 이 프로젝트 포기했다가 다시 시작한 거 맞죠?" },

  // 최장 공백 — 90일 (savage)
  { id: "streak", severity: "savage", template: "최장 공백 {longestGap}일. 3개월이요? 그건 휴식이 아니라 은퇴입니다." },
  { id: "streak", severity: "savage", template: "{longestGap}일 공백이면 분기가 바뀌었어요. 계절이 변했다고요." },
  { id: "streak", severity: "savage", template: "공백 {longestGap}일. 코드를 적에게 볼모로 잡힌 줄 알았어요." },
  { id: "streak", severity: "savage", template: "최장 {longestGap}일 공백. 3개월이면 프레임워크 메이저 버전이 올랐을 텐데..." },
  { id: "streak", severity: "savage", template: "{longestGap}일 동안 당신의 레포는 디지털 유령의 집이었습니다." },
  { id: "streak", severity: "savage", template: "공백 {longestGap}일. 그 사이 Node.js 버전이 두 개는 올랐어요." },
  { id: "streak", severity: "savage", template: "{longestGap}일 공백. 혹시 감옥에 다녀오신 건 아니죠?" },
  { id: "streak", severity: "savage", template: "최장 공백 {longestGap}일이면 인터넷이 끊겼었나요?" },
  { id: "streak", severity: "savage", template: "{longestGap}일 동안 코딩 안 하면 손가락이 퇴화됩니다." },
  { id: "streak", severity: "savage", template: "공백 {longestGap}일. 동면하고 오셨나요? 곰도 그렇게 오래 안 자요." },
  { id: "streak", severity: "savage", template: "{longestGap}일간의 공백. 그 동안 React 19가 나왔는데 아시나요?" },
  { id: "streak", severity: "savage", template: "최장 {longestGap}일 공백. 프로젝트가 '실종 신고' 대상이었네요." },

  // 최장 공백 — 180일+ (legendary)
  { id: "streak", severity: "legendary", template: "최장 공백 {longestGap}일. 반년이요? 프로젝트 부검 보고서 써야 하는 거 아닌가요?" },
  { id: "streak", severity: "legendary", template: "{longestGap}일 공백이면 계절이 두 번 바뀌었어요. 코드에 고고학적 가치가 생겼네요." },
  { id: "streak", severity: "legendary", template: "공백 {longestGap}일. 반년 넘게 방치된 레포... 이건 리포지토리가 아니라 타임캡슐이에요." },
  { id: "streak", severity: "legendary", template: "최장 {longestGap}일 공백. '나중에 할게'의 '나중'이 반년이었군요." },
  { id: "streak", severity: "legendary", template: "{longestGap}일 동안 커밋 없음. 프로젝트가 사망 선고를 받을 뻔했어요." },
  { id: "streak", severity: "legendary", template: "공백 {longestGap}일. 이 프로젝트를 고고학 발굴 현장처럼 다시 파내셨군요." },
  { id: "streak", severity: "legendary", template: "{longestGap}일 공백이면 `npm install`하는 데만 하루 걸렸겠네요. 의존성 전부 deprecated됐을 듯." },
  { id: "streak", severity: "legendary", template: "최장 공백 {longestGap}일. 돌아왔을 때 자기 코드 못 알아봤죠?" },
  { id: "streak", severity: "legendary", template: "{longestGap}일 공백. 이건 Git 히스토리가 아니라 방치 일지입니다." },
  { id: "streak", severity: "legendary", template: "공백 {longestGap}일. 코드가 빈티지가 됐네요. '레트로 코딩' 트렌드 선도자시군요." },
  { id: "streak", severity: "legendary", template: "{longestGap}일간 커밋 없음. README에 '이 프로젝트는 아직 살아있습니다'라고 적어야 할 것 같아요." },
  { id: "streak", severity: "legendary", template: "최장 {longestGap}일 공백. 당신이 없는 동안 JavaScript에 새 프레임워크가 47개 나왔어요." },

  // ============================================================
  // 잔디 밀도 (활동일/전체일)
  // ============================================================
  // 매우 낮은 밀도 (10% 이하)
  { id: "streak", severity: "savage", template: "잔디 밀도 {density}%. 10일에 한 번 커밋하시는 건가요?" },
  { id: "streak", severity: "savage", template: "활동일 {activeDays}일 / 전체 {totalDays}일. 밀도 {density}%라니... 사막에 선인장 하나 있는 느낌이에요." },
  { id: "streak", severity: "savage", template: "밀도 {density}%. 이건 잔디밭이 아니라 불모지입니다." },
  { id: "streak", severity: "savage", template: "{totalDays}일 중 {activeDays}일만 활동. 나머지 날은 뭐 하셨나요?" },
  { id: "streak", severity: "savage", template: "잔디 밀도 {density}%. GitHub 프로필이 황무지네요." },
  { id: "streak", severity: "savage", template: "밀도 {density}%면 1년에 30일 정도만 코딩한다는 건데... 취미 맞나요?" },
  { id: "streak", severity: "savage", template: "{density}% 밀도. 잔디가 아니라 이끼 수준이에요. 그것도 드문드문." },
  { id: "streak", severity: "savage", template: "활동일 {activeDays}일이면 한 달에 3일도 안 되는 거잖아요." },
  { id: "streak", severity: "savage", template: "잔디 밀도 {density}%. 회사에서 이런 출석률이면 해고감이에요." },
  { id: "streak", severity: "savage", template: "{density}% 밀도. 잔디 심기 게임에서 F등급입니다." },
  { id: "streak", severity: "legendary", template: "밀도 {density}%. 이건 개발자가 아니라 연 1회 방문하는 관광객이에요." },
  { id: "streak", severity: "legendary", template: "잔디 밀도 {density}%. GitHub을 클라우드 저장소로만 쓰시는 거죠?" },

  // 낮은 밀도 (10~30%)
  { id: "streak", severity: "medium", template: "잔디 밀도 {density}%. 3일에 한 번 정도 커밋하시는 거네요. 산책 수준의 코딩." },
  { id: "streak", severity: "medium", template: "활동일 {activeDays}일 / 전체 {totalDays}일. 밀도 {density}%. 듬성듬성 심은 잔디." },
  { id: "streak", severity: "medium", template: "{density}% 밀도. 잔디밭이라기보다는 텃밭에 가깝네요." },
  { id: "streak", severity: "medium", template: "밀도 {density}%면 가끔 생각날 때만 커밋하시는 타입이군요." },
  { id: "streak", severity: "medium", template: "{totalDays}일 중 {activeDays}일 활동. 나머지는 코드 '생각'만 한 날인가요?" },
  { id: "streak", severity: "medium", template: "잔디 밀도 {density}%. 비가 올 때만 자라는 잔디 같아요." },
  { id: "streak", severity: "medium", template: "밀도 {density}%... '시간 날 때 코딩'의 결과물이네요." },
  { id: "streak", severity: "medium", template: "{density}% 밀도. 주말 농장처럼 가끔만 오시는군요." },
  { id: "streak", severity: "medium", template: "활동 밀도 {density}%. 코딩이 본업은 아닌 것 같네요." },
  { id: "streak", severity: "medium", template: "잔디 밀도 {density}%. 열정이 있다 없다 반복하시는군요." },

  // 보통 밀도 (30~60%)
  { id: "streak", severity: "mild", template: "잔디 밀도 {density}%. 나쁘지 않아요. 절반은 코딩하고 절반은 쉬는 합리적인 삶." },
  { id: "streak", severity: "mild", template: "활동일 {activeDays}일 / 전체 {totalDays}일. {density}% 밀도면 괜찮은 편이에요." },
  { id: "streak", severity: "mild", template: "{density}% 밀도. 이틀에 한 번은 커밋하시네요. 건강한 루틴!" },
  { id: "streak", severity: "mild", template: "잔디 밀도 {density}%. 잔디가 반은 초록색, 반은 회색. 인생의 균형이네요." },
  { id: "streak", severity: "mild", template: "밀도 {density}%면 꽤 열심히 하시는 편이에요. 칭찬 한 스푼 드릴게요." },
  { id: "streak", severity: "mild", template: "{density}% 밀도. 완벽하진 않지만 나쁘지도 않은, 딱 한국인 평균." },
  { id: "streak", severity: "mild", template: "활동 밀도 {density}%. 주중에는 열심히, 주말에는 쉬시는 타입이시군요." },
  { id: "streak", severity: "mild", template: "잔디 밀도 {density}%. 반은 채웠으니 반은 성공이에요!" },

  // 높은 밀도 (60~90%)
  { id: "streak", severity: "medium", template: "잔디 밀도 {density}%. 거의 매일 커밋하시네요. 혹시 워커홀릭?" },
  { id: "streak", severity: "medium", template: "{density}% 밀도. 코딩이 취미인지 직업인지 인생인지 모르겠네요." },
  { id: "streak", severity: "medium", template: "활동일 {activeDays}일 / 전체 {totalDays}일. 쉬는 날이 거의 없네요." },
  { id: "streak", severity: "medium", template: "밀도 {density}%면 주말에도 커밋하시는 거잖아요. 쉬세요 좀." },
  { id: "streak", severity: "medium", template: "잔디 밀도 {density}%. 잔디밭이 울창하네요. 잔디깎이가 필요할 정도." },
  { id: "streak", severity: "medium", template: "{density}% 밀도. 이 정도면 코드가 인생이시네요. 건강 챙기세요." },
  { id: "streak", severity: "savage", template: "밀도 {density}%. 친구 만나는 날보다 커밋하는 날이 더 많죠?" },
  { id: "streak", severity: "savage", template: "잔디 밀도 {density}%. 잔디에 집착하시는 건 아닌지 걱정됩니다." },

  // 극도로 높은 밀도 (90%+)
  { id: "streak", severity: "savage", template: "잔디 밀도 {density}%. 거의 매일 커밋이라니... 크리스마스에도요?" },
  { id: "streak", severity: "savage", template: "{density}% 밀도면 1년에 쉬는 날이 한 달도 안 되는 거잖아요." },
  { id: "streak", severity: "legendary", template: "잔디 밀도 {density}%. 이건 사람이 아니라 GitHub Actions입니다." },
  { id: "streak", severity: "legendary", template: "밀도 {density}%. 당신의 잔디밭은 골프장보다 관리가 잘 되어 있네요." },
  { id: "streak", severity: "legendary", template: "{density}% 밀도. 한 해 내내 초록색이라니, 잔디의 신이시군요." },
  { id: "streak", severity: "legendary", template: "잔디 밀도 {density}%. 컴퓨터 끄는 법을 모르시는 건 아닌지..." },

  // ============================================================
  // 산발적 커밋 (매우 불규칙)
  // ============================================================
  { id: "streak", severity: "medium", template: "최장 스트릭 {longestStreak}일인데 최장 공백 {longestGap}일이라고요? 기복이 롤러코스터네요." },
  { id: "streak", severity: "medium", template: "연속 {longestStreak}일 커밋 후 {longestGap}일 잠수. 조울증인가요?" },
  { id: "streak", severity: "medium", template: "스트릭 {longestStreak}일, 공백 {longestGap}일. 달리다가 넘어진 느낌이에요." },
  { id: "streak", severity: "medium", template: "커밋 패턴이 심장 박동처럼 불규칙하네요. 밀도 {density}%." },
  { id: "streak", severity: "medium", template: "{activeDays}일 활동, {totalDays}일 중. 랜덤하게 코딩하시는 스타일이군요." },
  { id: "streak", severity: "savage", template: "커밋 패턴이 주식 차트 같아요. 급등하다가 폭락하고 다시 급등." },
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일 → 공백 {longestGap}일 → 반복. 이건 코딩이 아니라 간헐적 단식이에요." },
  { id: "streak", severity: "savage", template: "커밋 빈도가 날씨만큼 예측 불가능하네요. 기상청도 포기할 패턴." },
  { id: "streak", severity: "savage", template: "산발적 커밋의 달인. {density}% 밀도에 패턴도 없고. ADHD 코딩이네요." },
  { id: "streak", severity: "savage", template: "당신의 커밋 그래프를 주식 분석가한테 보여주면 '매수 금지'라고 할 거예요." },
  { id: "streak", severity: "savage", template: "불규칙한 커밋 패턴. 영감이 올 때만 코딩하시는 예술가 스타일이시군요." },
  { id: "streak", severity: "legendary", template: "커밋 패턴을 분석했는데 랜덤 넘버 제너레이터보다 예측 불가능합니다." },
  { id: "streak", severity: "legendary", template: "당신의 커밋 그래프는 카오스 이론의 완벽한 예시입니다." },

  // ============================================================
  // 번아웃 패턴 (열심히 하다가 갑자기 공백)
  // ============================================================
  { id: "streak", severity: "medium", template: "연속 {longestStreak}일 커밋 후 {longestGap}일 공백. 전형적인 번아웃 패턴이에요." },
  { id: "streak", severity: "medium", template: "열심히 하다 갑자기 사라진 당신. 스트릭 {longestStreak}일 → 공백 {longestGap}일." },
  { id: "streak", severity: "medium", template: "번아웃의 교과서적 사례네요. 매일 커밋하다가 어느 날 뚝 끊기는 패턴." },
  { id: "streak", severity: "savage", template: "가속 페달만 있고 브레이크가 없는 코딩 스타일. 결국 벽에 부딪혔죠?" },
  { id: "streak", severity: "savage", template: "열정 → 과로 → 번아웃 → 공백 → 반복. 당신의 코딩 라이프 사이클이에요." },
  { id: "streak", severity: "savage", template: "{longestStreak}일 스프린트 후 {longestGap}일 동면. 개발자판 다람쥐인가요?" },
  { id: "streak", severity: "savage", template: "전력 질주 후 탈진. 스트릭 {longestStreak}일이 찬란했지만, 그 후가 처참하네요." },
  { id: "streak", severity: "savage", template: "번아웃 3단계: 1) 매일 커밋 2) 갑자기 멈춤 3) 길고 긴 공백. 현재 3단계시군요." },
  { id: "streak", severity: "savage", template: "100미터 달리기처럼 코딩하시면 안 돼요. 마라톤으로 전환하세요." },
  { id: "streak", severity: "legendary", template: "초신성처럼 찬란하게 빛나다가 블랙홀처럼 사라지셨네요. 스트릭 {longestStreak}일 → 공백 {longestGap}일." },
  { id: "streak", severity: "legendary", template: "번아웃의 그랜드마스터. {longestStreak}일간의 불꽃 후 {longestGap}일간의 재. 피닉스는 되살아났지만 당신은..." },

  // ============================================================
  // 1일 커밋 후 긴 공백 반복
  // ============================================================
  { id: "streak", severity: "medium", template: "최장 스트릭 {longestStreak}일에 공백 {longestGap}일. 1일 커밋 → 긴 공백 패턴이시네요." },
  { id: "streak", severity: "medium", template: "하루 커밋하고 {longestGap}일 쉬기를 반복하시는군요. 점심시간에만 코딩?" },
  { id: "streak", severity: "savage", template: "커밋 1개 → {longestGap}일 공백. 이건 개발이 아니라 깜빡이 켠 거예요." },
  { id: "streak", severity: "savage", template: "1일 커밋 후 장기 공백의 반복. '내일부터 진짜 시작'이 매번 실패하는 패턴." },
  { id: "streak", severity: "savage", template: "가끔 한 번씩 나타나서 커밋 하나 던지고 사라지는 신출귀몰 개발자." },
  { id: "streak", severity: "savage", template: "커밋 하나 = 한 달치 코딩이신가요? 효율적이라고 해야 하나..." },
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일이면 연속이라는 게 없는 거잖아요. 산발적 커밋의 왕." },
  { id: "streak", severity: "savage", template: "가끔 커밋 하나씩 드롭하는 스타일. 앨범 발매하듯이 코딩하시네요." },
  { id: "streak", severity: "legendary", template: "전설의 1일 코더. 나타나면 커밋 하나, 사라지면 {longestGap}일. 도깨비인가요?" },
  { id: "streak", severity: "legendary", template: "연간 커밋 패턴: . . . . . . . . 모스 부호인 줄 알았어요." },
  { id: "streak", severity: "legendary", template: "1일 1커밋... 1달에 1일 1커밋. 해석이 달라지면 기분도 달라지죠." },

  // ============================================================
  // 시험 기간/방학 패턴 (학생)
  // ============================================================
  { id: "streak", severity: "mild", template: "시험 기간에만 공백이 생기시네요. 학생이시죠? 시험 잘 보셨나요?" },
  { id: "streak", severity: "mild", template: "중간고사, 기말고사 시기에 딱 공백. 교수님이 보시면 뿌듯하시겠네요." },
  { id: "streak", severity: "medium", template: "방학마다 커밋 폭발, 학기 중엔 조용. 전형적인 컴공 학생 패턴이에요." },
  { id: "streak", severity: "medium", template: "1~2월, 7~8월에만 잔디가 초록색이에요. 방학 = 코딩 시간인 거죠?" },
  { id: "streak", severity: "medium", template: "학기 중 밀도 vs 방학 밀도의 차이가 너무 극적이에요." },
  { id: "streak", severity: "medium", template: "시험 2주 전부터 커밋이 뚝 끊기시네요. 공부 열심히 하셨겠죠... 맞죠?" },
  { id: "streak", severity: "savage", template: "방학에만 코딩하시면 1년에 4개월만 개발자인 거예요." },
  { id: "streak", severity: "savage", template: "시험 기간 {longestGap}일 공백. 코딩보다 학점이 중요한 현실이 슬프네요." },
  { id: "streak", severity: "savage", template: "학기 중에는 잔디가 사막인데 방학에만 열대우림. 계절성 개발자시군요." },
  { id: "streak", severity: "savage", template: "방학 커밋 패턴: 첫 주 폭발 → 중간 적당 → 마지막 주 다시 폭발. 과제 마감이시죠?" },
  { id: "streak", severity: "legendary", template: "방학 첫날: 'This summer I'll build a full-stack app!' → 방학 마지막 날: 'npm init' 하나." },
  { id: "streak", severity: "legendary", template: "학기 중 커밋: 0. 방학 첫 주 커밋: 50. 방학 나머지: 다시 0. 뭐하신 거예요 진짜." },

  // ============================================================
  // 연초에만 커밋 (새해 결심)
  // ============================================================
  { id: "streak", severity: "mild", template: "1월에 커밋이 집중되어 있네요. 새해 결심: '매일 코딩하기'였나요?" },
  { id: "streak", severity: "mild", template: "매년 1월에만 활발하시네요. 새해 다짐의 유효기간이 한 달인 거죠." },
  { id: "streak", severity: "medium", template: "1월 커밋 폭발 → 2월부터 서서히 감소 → 3월 이후 사막. 새해 결심의 전형적 수명." },
  { id: "streak", severity: "medium", template: "새해 결심으로 시작한 프로젝트, 3월에 방치. 매년 반복되죠?" },
  { id: "streak", severity: "savage", template: "1월 1일: 'git init'. 1월 31일: 마지막 커밋. 12월 31일: '내년엔 진짜...' 무한 루프." },
  { id: "streak", severity: "savage", template: "매년 1월에만 번쩍하시네요. 새해 결심 리사이클러시군요." },
  { id: "streak", severity: "savage", template: "1월의 열정 vs 나머지 11개월의 냉담. 당신의 GitHub은 정월 대보름 불놀이예요." },
  { id: "streak", severity: "savage", template: "New Year Resolution: 'I will code every day!' → 1월 15일: 마지막 커밋." },
  { id: "streak", severity: "legendary", template: "매년 1월에만 살아나는 GitHub. 좀비 레포지토리의 부활절이 새해인 거죠." },
  { id: "streak", severity: "legendary", template: "당신의 커밋 그래프는 매년 1월에만 초록색. 크리스마스 트리처럼 연례 행사네요." },
  { id: "streak", severity: "legendary", template: "새해 결심 3연속 실패 기록 보유자. 내년엔 결심 자체를 안 하시는 게 나을 듯." },

  // ============================================================
  // 월초/월말에만 커밋
  // ============================================================
  { id: "streak", severity: "mild", template: "월초에 커밋이 몰려 있네요. 월간 계획을 세우시는 분이시군요." },
  { id: "streak", severity: "mild", template: "월말에 커밋 폭발. 마감의 힘을 아시는 분이시네요." },
  { id: "streak", severity: "medium", template: "월초에만 커밋하시는 패턴. '이번 달은 열심히...' 하고 3일 만에 포기하시죠?" },
  { id: "streak", severity: "medium", template: "월말 마감 러시 커밋. 스프린트 리뷰 때문이죠? 다 알아요." },
  { id: "streak", severity: "medium", template: "월초: 의욕 충만 커밋. 월중: 조용. 월말: 공포의 마감 커밋." },
  { id: "streak", severity: "savage", template: "매월 1일에만 커밋이 있어요. 월급날에만 일하시는 건가요?" },
  { id: "streak", severity: "savage", template: "월말에만 폭풍 커밋. PM이 '이번 달 KPI...' 하면 바로 커밋 시작하시죠?" },
  { id: "streak", severity: "savage", template: "월초: 'git init'. 월말: 'git push --force'. 중간 과정이 없네요." },
  { id: "streak", severity: "savage", template: "월간 커밋 패턴: ▁▁▁▁▁▁▁▁▁█. 마감일만 되면 각성하시는 타입." },
  { id: "streak", severity: "legendary", template: "월말 28~31일에만 커밋이 존재. 이건 개발이 아니라 월말 정산이에요." },

  // ============================================================
  // 특정 시즌에만 활동
  // ============================================================
  { id: "streak", severity: "mild", template: "여름에 커밋이 집중되어 있네요. 겨울엔 동면하시나요?" },
  { id: "streak", severity: "mild", template: "가을에 생산성이 최고네요. 코딩하기 좋은 날씨긴 하죠." },
  { id: "streak", severity: "medium", template: "특정 시즌에만 커밋이 집중됩니다. 철새 같은 개발자시네요." },
  { id: "streak", severity: "medium", template: "겨울에만 코딩하시네요. 밖에 나가기 싫을 때만 코딩?" },
  { id: "streak", severity: "medium", template: "봄에 커밋이 없어요. 봄날의 나른함에 코딩도 졸고 있나 봐요." },
  { id: "streak", severity: "savage", template: "해커톤 시즌에만 커밋 폭발. 나머지는 그냥 관전 모드시죠?" },
  { id: "streak", severity: "savage", template: "12월에만 활동적인 GitHub. Advent of Code 시즌인가요? 아니면 연말 실적 올리기?" },
  { id: "streak", severity: "savage", template: "여름에만 코딩하시면 반쪽짜리 개발자예요. 반년치 월급만 받으셔야죠." },
  { id: "streak", severity: "savage", template: "특정 달에만 초록색이에요. 마이그레이션 새 같은 개발자시군요." },
  { id: "streak", severity: "legendary", template: "Git 히스토리가 계절 달력처럼 규칙적이에요. 봄 0, 여름 MAX, 가을 0, 겨울 MAX. 기상 관측 데이터인 줄." },

  // ============================================================
  // 추가 streak 종합 로스트 — 다양한 톤과 표현
  // ============================================================
  // 스트릭 관련 추가 mild
  { id: "streak", severity: "mild", template: "{longestStreak}일 연속 커밋. 소소하지만 확실한 행복이네요." },
  { id: "streak", severity: "mild", template: "최장 스트릭 {longestStreak}일. 나쁘지 않은데 자랑할 정도는 아니에요." },
  { id: "streak", severity: "mild", template: "연속 {longestStreak}일이면 괜찮은 편이에요. 평균은 넘었습니다." },
  { id: "streak", severity: "mild", template: "{longestStreak}일 스트릭. 꾸준함의 맛을 알기 시작한 레벨이시네요." },
  { id: "streak", severity: "mild", template: "최장 연속 {longestStreak}일. 감기 한 번 걸리면 깨질 수준이지만 그래도 대단해요." },
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. '나름 열심히 했다'고 말할 수 있는 수준입니다." },
  { id: "streak", severity: "mild", template: "{longestStreak}일 연속 커밋이면 습관이 되기 직전에 멈추신 거네요." },
  { id: "streak", severity: "mild", template: "연속 커밋 {longestStreak}일. 잔디에 관심은 있지만 집착은 아닌 수준." },
  { id: "streak", severity: "mild", template: "{longestStreak}일 스트릭이라... 2주 정도? 설 연휴에 깨진 거겠죠." },
  { id: "streak", severity: "mild", template: "최장 {longestStreak}일. 시작은 좋았어요. 계속하시면 됩니다. 하하." },

  // 공백 관련 추가 medium
  { id: "streak", severity: "medium", template: "공백 {longestGap}일 동안 당신의 코드는 혼자 울고 있었어요." },
  { id: "streak", severity: "medium", template: "{longestGap}일이나 코딩을 안 하면 손이 근질근질하지 않나요? 안 하나요?" },
  { id: "streak", severity: "medium", template: "최장 공백 {longestGap}일. 복귀했을 때 IDE 업데이트만 1시간 걸렸겠네요." },
  { id: "streak", severity: "medium", template: "{longestGap}일 공백 후 커밋. 첫 커밋 메시지가 'fix: 뭐가 뭔지 모르겠음'이었을 것 같아요." },
  { id: "streak", severity: "medium", template: "공백 {longestGap}일. 이 동안 Stack Overflow에서 살았나요?" },
  { id: "streak", severity: "medium", template: "{longestGap}일 쉬셨다고요? 그 기간에 경쟁자는 100커밋 했을 텐데." },
  { id: "streak", severity: "medium", template: "최장 공백 {longestGap}일. '내일부터 코딩해야지'를 매일 반복한 결과." },
  { id: "streak", severity: "medium", template: "{longestGap}일 공백. 프로젝트를 사랑하지만 사랑 표현을 안 하는 타입이시죠?" },
  { id: "streak", severity: "medium", template: "공백 {longestGap}일. IDE를 열면 '오랜만이다'라고 인사하던가요?" },
  { id: "streak", severity: "medium", template: "{longestGap}일 동안의 공백. '바빴어요'라고 하실 건가요? 다들 그래요." },
  { id: "streak", severity: "medium", template: "최장 {longestGap}일 공백. 영어로 치면 'on hiatus'네요." },
  { id: "streak", severity: "medium", template: "공백 {longestGap}일. 그 사이 커피 몇 잔을 마셨을까요. 코드 대신." },

  // 밀도 관련 추가 savage
  { id: "streak", severity: "savage", template: "밀도 {density}%로 {totalDays}일 중 {activeDays}일만 활동. 알바보다 적게 출근하시네요." },
  { id: "streak", severity: "savage", template: "잔디 밀도 {density}%. 코딩 주 3회라도 하시면 감사하겠습니다." },
  { id: "streak", severity: "savage", template: "{density}% 밀도. 이 정도면 GitHub 프로필에 '파트타임 개발자'라고 쓰셔야죠." },
  { id: "streak", severity: "savage", template: "활동일 {activeDays}일... 전체 {totalDays}일 대비 좀 적지 않나요? 많이?" },
  { id: "streak", severity: "savage", template: "밀도 {density}%. 잔디밭이 아니라 달 표면 같아요. 크레이터만 가득." },
  { id: "streak", severity: "savage", template: "{density}% 밀도의 잔디밭. 가뭄에 콩 나듯이 커밋이 있네요." },
  { id: "streak", severity: "savage", template: "잔디 밀도 {density}%. 이 수치를 면접에서 보여주면 안 돼요. 절대로." },
  { id: "streak", severity: "savage", template: "밀도 {density}%면 10일에 한 번도 안 되는 거잖아요. 분기별 보고서 수준." },

  // 스트릭 + 공백 조합 legendary
  { id: "streak", severity: "legendary", template: "스트릭 {longestStreak}일, 공백 {longestGap}일. 양극성 코딩 장애인가요?" },
  { id: "streak", severity: "legendary", template: "최장 연속 {longestStreak}일 후 최장 공백 {longestGap}일. 이건 커밋 역사의 빅뱅과 빅크런치예요." },
  { id: "streak", severity: "legendary", template: "스트릭/공백 비율이 {longestStreak}:{longestGap}이라니. 균형이란 단어를 사전에서 찾아보세요." },
  { id: "streak", severity: "legendary", template: "{longestStreak}일간의 초인적 커밋 후 {longestGap}일간의 절대적 침묵. 영화 각본감이네요." },

  // ============================================================
  // 주말/평일 패턴
  // ============================================================
  { id: "streak", severity: "mild", template: "주말에도 커밋하시는 거 보면 코딩이 좋으신 거겠죠? 아니면 마감인가." },
  { id: "streak", severity: "mild", template: "주중에만 커밋이 있어요. 건강한 워라밸이시네요." },
  { id: "streak", severity: "medium", template: "주말 커밋 비율이 높으시네요. 회사에서 못한 걸 집에서 하시는 건가요?" },
  { id: "streak", severity: "medium", template: "금요일에 커밋이 뚝 끊기고 월요일에 다시 시작. 칼퇴의 민족이시군요." },
  { id: "streak", severity: "savage", template: "토요일 새벽 3시 커밋이 있네요. 금요일 밤에 뭔가 터진 거 아닌가요?" },
  { id: "streak", severity: "savage", template: "일요일 커밋이 월요일보다 많아요. 주말에 버그 만들고 평일에 고치는 패턴?" },
  { id: "streak", severity: "savage", template: "주말 커밋 100%. 평일에는 뭐 하시는 분이세요?" },
  { id: "streak", severity: "legendary", template: "365일 중 토/일에만 커밋. 주말 전사, 평일 관광객이시군요." },

  // ============================================================
  // 밤/새벽 패턴과 스트릭 연관
  // ============================================================
  { id: "streak", severity: "mild", template: "연속 {longestStreak}일이지만 전부 새벽 커밋이네요. 자정 넘겨서 억지로 하나씩?" },
  { id: "streak", severity: "medium", template: "스트릭 유지하려고 자정 직전에 커밋 하나씩 넣으신 거 다 보여요." },
  { id: "streak", severity: "medium", template: "23:58, 23:59 커밋이 많네요. 스트릭 사수를 위한 처절한 노력..." },
  { id: "streak", severity: "savage", template: "자정 직전 커밋으로 스트릭 유지. 잔디를 위한 최소한의 노력, 감동적이에요(비꼼)." },
  { id: "streak", severity: "savage", template: "11:59 PM 커밋의 달인. 잔디 사수를 위해 매일 떨리는 마음으로 커밋하시죠?" },
  { id: "streak", severity: "legendary", template: "매일 23:55~23:59 사이 커밋. 이건 코딩이 아니라 잔디 알바예요." },

  // ============================================================
  // 추가 다양한 표현 — mild 대량
  // ============================================================
  { id: "streak", severity: "mild", template: "전체 {totalDays}일 중 활동일 {activeDays}일. 시작은 하셨네요!" },
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 아직 초보지만 가능성은 있어요." },
  { id: "streak", severity: "mild", template: "연속 커밋 기록이 {longestStreak}일이라니. 내일부터 경신해보시죠!" },
  { id: "streak", severity: "mild", template: "{activeDays}일 활동. 조금씩이라도 하시는 게 안 하는 것보다 낫죠." },
  { id: "streak", severity: "mild", template: "잔디가 듬성듬성하지만 그래도 살아있는 잔디예요." },
  { id: "streak", severity: "mild", template: "최장 {longestStreak}일 연속이면 습관의 시작이에요. 계속해보세요!" },
  { id: "streak", severity: "mild", template: "밀도 {density}%. 나쁘지 않아요. 완벽하진 않지만 노력은 보여요." },
  { id: "streak", severity: "mild", template: "{longestGap}일 공백이 있지만 다시 돌아오셨잖아요. 그게 중요해요." },
  { id: "streak", severity: "mild", template: "스트릭보다 중요한 건 꾸준함인데... 일단 시작은 하셨네요." },
  { id: "streak", severity: "mild", template: "활동일 {activeDays}일. 0일보다는 훨씬 낫습니다!" },
  { id: "streak", severity: "mild", template: "잔디가 좀 허전하지만 빈 화분보다는 나아요." },
  { id: "streak", severity: "mild", template: "{totalDays}일 중 {activeDays}일 활동이면 아예 안 한 건 아니니까요." },
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 열심히 하셨어요! 좀 더 하시면 좋겠지만." },
  { id: "streak", severity: "mild", template: "커밋 패턴을 보면 의지는 있으신 것 같아요. 실행력은... 음..." },
  { id: "streak", severity: "mild", template: "최장 공백 {longestGap}일. 휴식도 개발의 일부니까요. 아마도." },
  { id: "streak", severity: "mild", template: "{density}% 밀도. 꽃이 피듯 간간이 커밋이 피어나네요." },
  { id: "streak", severity: "mild", template: "잔디 밀도가 낮지만 질은 좋을 수도 있죠. 양보다 질이니까!" },
  { id: "streak", severity: "mild", template: "스트릭은 짧지만 각 커밋에 진심이 담겨있길 바랍니다." },
  { id: "streak", severity: "mild", template: "{longestStreak}일 스트릭. 짧은 불꽃이지만 그래도 불꽃이에요." },
  { id: "streak", severity: "mild", template: "연속 {longestStreak}일. 마라톤은 아니지만 100미터 달리기도 운동이에요." },

  // ============================================================
  // 추가 medium 대량
  // ============================================================
  { id: "streak", severity: "medium", template: "잔디를 보면 열정의 흔적이 보이긴 하는데... 간간이." },
  { id: "streak", severity: "medium", template: "스트릭 {longestStreak}일, 공백 {longestGap}일. 기복이 있으시네요." },
  { id: "streak", severity: "medium", template: "{totalDays}일 동안 {activeDays}일 활동. 반절도 안 되네요." },
  { id: "streak", severity: "medium", template: "밀도 {density}%. 물 주기를 깜빡하는 화분 같은 레포예요." },
  { id: "streak", severity: "medium", template: "최장 공백이 {longestGap}일이면 뭔가 있었던 거겠죠. 물어보진 않을게요." },
  { id: "streak", severity: "medium", template: "{longestStreak}일 연속 후 뚝 끊기는 패턴. 뭔가에 방해받으셨나요?" },
  { id: "streak", severity: "medium", template: "활동 밀도 {density}%. 3일에 한 번 정도는 커밋하시는군요." },
  { id: "streak", severity: "medium", template: "커밋 패턴이 물결치듯 오르락내리락하네요." },
  { id: "streak", severity: "medium", template: "스트릭 기록 {longestStreak}일. 아쉽게도 그 이후가 문제." },
  { id: "streak", severity: "medium", template: "공백 {longestGap}일. '잠시만 쉴게요'가 길어진 거죠?" },
  { id: "streak", severity: "medium", template: "{activeDays}일 활동이면 한 주에 2~3일 정도? 파트타임 코딩." },
  { id: "streak", severity: "medium", template: "잔디가 체크무늬처럼 생겼어요. 하루 하고 하루 쉬기?" },
  { id: "streak", severity: "medium", template: "밀도 {density}%의 잔디밭. 관리가 필요해 보여요." },
  { id: "streak", severity: "medium", template: "최장 연속 {longestStreak}일. 더 길었으면 savage 안 먹었을 텐데." },
  { id: "streak", severity: "medium", template: "{longestGap}일 공백 후 복귀. 'git pull'하는데 conflict 백만 개였겠네요." },
  { id: "streak", severity: "medium", template: "커밋 빈도가 심전도 그래프 같아요. 살아는 있는 거 맞죠?" },
  { id: "streak", severity: "medium", template: "스트릭 {longestStreak}일. 좋아요. 하지만 공백 {longestGap}일. 나빠요." },
  { id: "streak", severity: "medium", template: "{density}% 밀도면 '가끔 코딩하는 사람'이에요. '개발자'가 아니라." },
  { id: "streak", severity: "medium", template: "전체 {totalDays}일 중 활동 {activeDays}일. 나머지는 코드 구경만?" },
  { id: "streak", severity: "medium", template: "잔디를 보면 '열정 있음, 단 간헐적'이라고 써야 할 것 같아요." },

  // ============================================================
  // 추가 savage 대량
  // ============================================================
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일이면 마라톤 완주가 아니라 100미터 달리기 중 넘어진 거예요." },
  { id: "streak", severity: "savage", template: "공백 {longestGap}일. 이 동안 세계 일주라도 다녀오셨나요?" },
  { id: "streak", severity: "savage", template: "밀도 {density}%. 이건 잔디가 아니라 이빨 빠진 빗 같아요." },
  { id: "streak", severity: "savage", template: "{activeDays}일 활동에 {totalDays}일 전체. 출석률로 치면 경고장 대상이에요." },
  { id: "streak", severity: "savage", template: "최장 스트릭 {longestStreak}일이라고 자랑하시면 안 돼요. 진짜로." },
  { id: "streak", severity: "savage", template: "공백 {longestGap}일 후 첫 커밋: 'fix: everything'. 처참하네요." },
  { id: "streak", severity: "savage", template: "잔디밭이 좀비 아포칼립스 이후 같아요. 여기저기 황폐." },
  { id: "streak", severity: "savage", template: "{density}% 밀도. 이 수치를 이력서에 쓰시면 서류 탈락입니다." },
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일 → 공백 {longestGap}일. 열정의 유효기간이 짧으시네요." },
  { id: "streak", severity: "savage", template: "커밋 패턴이 멸종 위기종 목격 기록 같아요. 아주 가끔, 우연히." },
  { id: "streak", severity: "savage", template: "활동일 {activeDays}일. 다른 개발자들이 '저 분 살아있나?' 할 수준." },
  { id: "streak", severity: "savage", template: "밀도 {density}%. 사하라 사막의 오아시스보다 드문 커밋." },
  { id: "streak", severity: "savage", template: "최장 연속 {longestStreak}일인데 자랑스러우세요? 정말로?" },
  { id: "streak", severity: "savage", template: "공백 {longestGap}일이면 프로젝트가 고인물이 됐겠네요. 말 그대로." },
  { id: "streak", severity: "savage", template: "잔디를 보면 '코딩은 제 취미가 아닙니다'라고 외치고 있어요." },
  { id: "streak", severity: "savage", template: "{longestStreak}일 스트릭. 다음 목표는 {longestStreak}+1일이죠? 저는 믿음이 없지만." },
  { id: "streak", severity: "savage", template: "커밋 그래프가 심폐소생술 필요한 환자 심전도 같아요." },
  { id: "streak", severity: "savage", template: "활동 밀도 {density}%. '나는 개발자다'라고 말하기 민망한 수준." },
  { id: "streak", severity: "savage", template: "스트릭 → 공백 → 스트릭 → 공백. 점멸하는 형광등 같은 코딩 패턴." },
  { id: "streak", severity: "savage", template: "{totalDays}일 중 {activeDays}일만 커밋. 나머지는 'git status'만 치신 건가요?" },

  // ============================================================
  // 추가 legendary 대량
  // ============================================================
  { id: "streak", severity: "legendary", template: "밀도 {density}%. 1년에 커밋 횟수가 손가락으로 셀 수 있을 정도." },
  { id: "streak", severity: "legendary", template: "최장 공백 {longestGap}일. 이건 프로젝트가 아니라 디지털 화석이에요." },
  { id: "streak", severity: "legendary", template: "스트릭 {longestStreak}일, 공백 {longestGap}일. 코딩의 빙하기와 간빙기를 경험하셨네요." },
  { id: "streak", severity: "legendary", template: "잔디가 QR코드처럼 생겼어요. 스캔하면 '이 개발자를 구조해주세요'가 나올 듯." },
  { id: "streak", severity: "legendary", template: "{density}% 밀도의 GitHub 프로필. 이걸 보여주면 면접관이 울어요." },
  { id: "streak", severity: "legendary", template: "커밋 그래프가 모스 부호로 'S.O.S'를 보내고 있어요." },
  { id: "streak", severity: "legendary", template: "공백 {longestGap}일. 그 사이 TypeScript 버전이 3번 올랐어요." },
  { id: "streak", severity: "legendary", template: "활동일 {activeDays}일. 유치원생 출석일보다 적어요." },
  { id: "streak", severity: "legendary", template: "잔디밭이 바코드 같아요. 계산대에 갖다 대면 '열정: 0원'이 찍힐 듯." },
  { id: "streak", severity: "legendary", template: "스트릭 기록을 보면 '이 분은 개발자가 맞나?'라는 철학적 질문이 떠올라요." },

  // ============================================================
  // 개발자 밈/유머 — 다양한 비유
  // ============================================================
  { id: "streak", severity: "mild", template: "잔디 심기 게임에서 '브론즈' 등급이시네요. 화이팅!" },
  { id: "streak", severity: "mild", template: "{longestStreak}일 스트릭. LOL로 치면 실버 정도?" },
  { id: "streak", severity: "medium", template: "잔디 밀도가 마인크래프트 슈퍼플랫 맵 같아요. 텅 비어있는." },
  { id: "streak", severity: "medium", template: "커밋 패턴이 와이파이 신호 같아요. 3칸 중 1칸." },
  { id: "streak", severity: "medium", template: "스트릭이 넷플릭스 무료 체험처럼 한 달만 빛났어요." },
  { id: "streak", severity: "savage", template: "GitHub 잔디가 테트리스 게임오버 화면 같아요. 구멍투성이." },
  { id: "streak", severity: "savage", template: "커밋 패턴이 라면 먹고 운동하는 패턴이랑 비슷하네요. 한 번 하고 한 달 쉬기." },
  { id: "streak", severity: "savage", template: "스트릭 기록이 다이어트 기록이랑 일치하는 것 같아요. 시작만 여러 번." },
  { id: "streak", severity: "savage", template: "잔디가 치아처럼 생겼어요. 충치(공백) 투성이인." },
  { id: "streak", severity: "savage", template: "커밋 패턴이 서울 날씨 같아요. 맑다가 갑자기 흐리다가 또 맑고." },
  { id: "streak", severity: "savage", template: "스트릭이 타이타닉 같아요. 빛나다가 침몰." },
  { id: "streak", severity: "legendary", template: "잔디밭이 월리를 찾아라 같아요. 커밋을 찾기가 어려워요." },
  { id: "streak", severity: "legendary", template: "커밋 그래프가 비트코인 차트 같아요. 급등 후 폭락, 다시는 안 올라옴." },
  { id: "streak", severity: "legendary", template: "스트릭이 올림픽 같아요. 4년에 한 번 빛남." },
  { id: "streak", severity: "legendary", template: "잔디 밀도가 위키피디아 '편집 중' 문서 같아요. 미완성." },

  // ============================================================
  // 한국 개발자 문화 특화
  // ============================================================
  { id: "streak", severity: "mild", template: "1일 1커밋 도전 {longestStreak}일 차에 실패. 다음엔 1주 1커밋부터 도전해보세요." },
  { id: "streak", severity: "mild", template: "잔디 심기 {activeDays}일. 네이버 블로그 출석체크보다는 하고 계시네요." },
  { id: "streak", severity: "medium", template: "SSAFY 끝나고 커밋이 뚝 끊기셨나요? 부트캠프 스트릭의 한계." },
  { id: "streak", severity: "medium", template: "잔디를 보면 '취업 준비 중'이 보여요. 포트폴리오 마감 전에만 초록색." },
  { id: "streak", severity: "medium", template: "커밋 패턴이 수능 공부 패턴이랑 비슷해요. 직전에 벼락치기." },
  { id: "streak", severity: "savage", template: "취업 성공 후 커밋 0. 취준 때의 열정은 어디 갔나요?" },
  { id: "streak", severity: "savage", template: "정보처리기사 시험 전에만 커밋 폭발. 자격증 따면 끝인 건가요?" },
  { id: "streak", severity: "savage", template: "42서울/부스트캠프 기간에만 잔디가 초록색. 자발적 코딩은 없으신 거죠?" },
  { id: "streak", severity: "savage", template: "코딩 테스트 시즌에만 GitHub이 살아나시네요. 일명 '취업 잔디'." },
  { id: "streak", severity: "savage", template: "잔디 심기를 SNS에 자랑하시려고 하루에 README만 수정하시죠? 다 보여요." },
  { id: "streak", severity: "legendary", template: "대학 4년간 커밋 총합이 졸업 작품 기간 1달보다 적어요. 교수님이 우시겠네요." },
  { id: "streak", severity: "legendary", template: "백준 풀이만 커밋하신 거 아니에요? 실제 프로젝트 커밋은 0이시죠?" },

  // ============================================================
  // 감정적 호소 스타일
  // ============================================================
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 짧지만 당신의 노력이 느껴져요." },
  { id: "streak", severity: "mild", template: "공백 {longestGap}일 동안 코드가 당신을 기다렸을 거예요." },
  { id: "streak", severity: "medium", template: "잔디가 듬성듬성한 건 당신의 마음도 듬성듬성했다는 뜻일까요?" },
  { id: "streak", severity: "medium", template: "매일 커밋하겠다는 약속, {longestStreak}일 만에 깨졌네요. 자신과의 약속도 약속이에요." },
  { id: "streak", severity: "savage", template: "당신의 레포가 나에게 말했어요. '주인이 날 버렸어'라고." },
  { id: "streak", severity: "savage", template: "공백 {longestGap}일. 코드가 울고 있어요. '왜 나를 만들어 놓고 방치하냐'고." },
  { id: "streak", severity: "savage", template: "잔디밭을 보면 마음이 아파요. 잔디도 관리가 필요해요." },
  { id: "streak", severity: "legendary", template: "이 레포의 마지막 커밋이 유언장 같아요. '다음에 계속...'이라고 쓰여있지만 다음은 없었죠." },

  // ============================================================
  // 짧고 임팩트 있는 한 줄
  // ============================================================
  { id: "streak", severity: "mild", template: "스트릭: {longestStreak}일. 나쁘진 않아요." },
  { id: "streak", severity: "mild", template: "공백: {longestGap}일. 쉴 때 쉬어야죠." },
  { id: "streak", severity: "mild", template: "밀도: {density}%. 평범합니다." },
  { id: "streak", severity: "medium", template: "스트릭 {longestStreak}일. 그게 최선이었나요?" },
  { id: "streak", severity: "medium", template: "공백 {longestGap}일. 좀 길었네요." },
  { id: "streak", severity: "medium", template: "밀도 {density}%. 아쉽습니다." },
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일. 한심합니다." },
  { id: "streak", severity: "savage", template: "공백 {longestGap}일. 실화인가요?" },
  { id: "streak", severity: "savage", template: "밀도 {density}%. 처참합니다." },
  { id: "streak", severity: "legendary", template: "스트릭 {longestStreak}일. 말이 필요 없네요." },
  { id: "streak", severity: "legendary", template: "공백 {longestGap}일. 이건 범죄입니다." },
  { id: "streak", severity: "legendary", template: "밀도 {density}%. 전설적인 게으름." },

  // ============================================================
  // 긴 서사형 로스트
  // ============================================================
  { id: "streak", severity: "medium", template: "옛날 옛적에 {longestStreak}일간 매일 커밋하는 개발자가 있었습니다. 그런데 어느 날 갑자기 사라졌죠. {longestGap}일 후에 돌아와서 한 말: '아 맞다 프로젝트'." },
  { id: "streak", severity: "savage", template: "당신의 커밋 히스토리는 3막 구조입니다. 1막: 희망찬 시작({longestStreak}일). 2막: 긴 침묵({longestGap}일). 3막: 허무한 복귀." },
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일의 전설이 있었습니다. 하지만 전설은 끝났고, {longestGap}일간의 암흑기가 시작됐죠. 지금은 고고학적 유물입니다." },
  { id: "streak", severity: "legendary", template: "2023년 1월 1일: '올해는 매일 코딩한다!' → 1월 {longestStreak}일: 마지막 커밋 → 12월 31일: '내년엔 진짜...' 이 사이클, 몇 년째인가요?" },
  { id: "streak", severity: "legendary", template: "당신의 GitHub 프로필에는 두 개의 계절만 있습니다. '코딩하는 계절'({longestStreak}일)과 '안 하는 계절'({longestGap}일). 불행히도 안 하는 계절이 훨씬 깁니다." },

  // ============================================================
  // 비교형 로스트
  // ============================================================
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일이면 평균 이상이에요. 세상엔 0일인 사람도 많으니까." },
  { id: "streak", severity: "medium", template: "스트릭 {longestStreak}일? Linus Torvalds는 매일 커밋해요. 비교하진 않을게요." },
  { id: "streak", severity: "medium", template: "밀도 {density}%면 중간은 가시네요. 최상위권은 아니지만." },
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일? 옆자리 동료는 100일 넘었다던데." },
  { id: "streak", severity: "savage", template: "밀도 {density}%면 하위 10% 수준이에요. 개발자 커뮤니티에서요." },
  { id: "streak", severity: "savage", template: "당신의 공백 {longestGap}일은 다른 사람의 전체 프로젝트 기간보다 길어요." },
  { id: "streak", severity: "legendary", template: "GPT-4 학습 데이터에도 당신 커밋은 없을 거예요. 너무 적어서." },
  { id: "streak", severity: "legendary", template: "GitHub Copilot이 당신보다 커밋을 많이 합니다." },

  // ============================================================
  // 질문형 로스트
  // ============================================================
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일인데, 다음 목표는 뭔가요?" },
  { id: "streak", severity: "mild", template: "공백 {longestGap}일 동안 뭐 하셨어요? 궁금해요." },
  { id: "streak", severity: "medium", template: "밀도 {density}%인데 이걸 보여주면서 '나 코딩 좀 해'라고 하신 건 아니죠?" },
  { id: "streak", severity: "medium", template: "스트릭이 왜 {longestStreak}일에서 끊겼나요? 뭐가 있었나요?" },
  { id: "streak", severity: "savage", template: "공백 {longestGap}일이면 존재 자체를 잊으신 건 아닌가요? 이 프로젝트를?" },
  { id: "streak", severity: "savage", template: "밀도 {density}%로 개발자라고 할 수 있나요? 진심으로 묻는 거예요." },
  { id: "streak", severity: "savage", template: "혹시 코딩이 취미가 아니라 꿈인 건가요? 꿈은 자다가 꾸는 거니까." },
  { id: "streak", severity: "legendary", template: "스트릭 {longestStreak}일, 공백 {longestGap}일. 이걸 보고 뭐라고 해야 하나요?" },
  { id: "streak", severity: "legendary", template: "GitHub 프로필에 개발자라고 적혀있는 거 맞나요? 확인 좀 해주세요." },

  // ============================================================
  // 충고형 로스트
  // ============================================================
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 10일까지만 늘려도 상위 50%예요. 해보세요." },
  { id: "streak", severity: "mild", template: "공백 {longestGap}일. 다음엔 알람 설정하고 매일 커밋해보세요." },
  { id: "streak", severity: "medium", template: "밀도 {density}%면 하루 5분이라도 코딩하면 올릴 수 있어요." },
  { id: "streak", severity: "medium", template: "스트릭이 짧으시면 작은 목표부터. 3일 연속 → 7일 → 30일. 단계별로!" },
  { id: "streak", severity: "savage", template: "솔직히 조언 드리면, 코딩 말고 다른 걸 하시는 게 나을 수도 있어요." },
  { id: "streak", severity: "savage", template: "이 패턴이면 습관 만들기 앱부터 써보세요. 코딩 앱 말고." },
  { id: "streak", severity: "legendary", template: "GitHub 프로필을 private으로 돌리시는 걸 추천합니다. 진심으로." },
  { id: "streak", severity: "legendary", template: "잔디 심기 포기하고 진짜 잔디나 심으세요. 그게 더 초록색일 거예요." },

  // ============================================================
  // 추가 패턴: 주기적 패턴
  // ============================================================
  { id: "streak", severity: "mild", template: "2주에 한 번씩 규칙적으로 커밋하시네요. 격주 개발자." },
  { id: "streak", severity: "medium", template: "매달 1일과 15일에만 커밋. 급여일 맞춰서 코딩하시나요?" },
  { id: "streak", severity: "medium", template: "커밋 패턴이 생리 주기보다 규칙적이에요. 28일마다 정확히." },
  { id: "streak", severity: "savage", template: "달의 위상에 따라 커밋하시는 건가요? 보름달에만 코딩?" },
  { id: "streak", severity: "savage", template: "3개월 주기로 커밋 → 공백 → 커밋 → 공백. 분기 보고서 작성이시죠?" },
  { id: "streak", severity: "legendary", template: "커밋 패턴이 조석(潮汐)처럼 밀물/썰물을 반복합니다. 달에 이끌리는 개발자." },

  // ============================================================
  // 추가 패턴: 이벤트 기반 커밋
  // ============================================================
  { id: "streak", severity: "mild", template: "해커톤 후에 커밋이 급증하시네요. 영감을 받으시는 타입이군요." },
  { id: "streak", severity: "medium", template: "컨퍼런스 직후에만 커밋 폭발. 동기부여의 유효기간: 1주일." },
  { id: "streak", severity: "medium", template: "남이 커밋하면 따라 커밋하시는 스타일이시죠? FOMO 코딩." },
  { id: "streak", severity: "savage", template: "누가 PR 보내면 그때만 커밋. 혼자서는 절대 안 하시는 수동적 코딩." },
  { id: "streak", severity: "savage", template: "이슈 할당받을 때만 커밋. 자발적 코딩이라는 걸 모르시나요?" },
  { id: "streak", severity: "legendary", template: "커밋 히스토리가 '누가 시켰을 때만 한다'를 증명합니다." },

  // ============================================================
  // 역설적 칭찬 (backhanded compliments)
  // ============================================================
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 짧지만 순수하네요. 억지 잔디보다 나아요." },
  { id: "streak", severity: "medium", template: "밀도 {density}%인 게 오히려 솔직하네요. 억지로 채운 잔디보다 나을 수도." },
  { id: "streak", severity: "medium", template: "공백 {longestGap}일. 최소한 빈 커밋으로 잔디 조작은 안 하셨으니 정직한 거예요." },
  { id: "streak", severity: "savage", template: "잔디가 비어있지만 적어도 'README.md 오타 수정'으로 채우진 않으셨네요. 정직한 공백." },
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일이 진짜 코딩한 날이라면 차라리 낫습니다. 잔디 농사꾼보다는." },
  { id: "streak", severity: "legendary", template: "이 처참한 잔디가 진짜 실력이라면, 적어도 거짓은 아니니까요. 정직하게 못 하는 것도 재능." },

  // ============================================================
  // 특수 상황 로스트
  // ============================================================
  { id: "streak", severity: "mild", template: "크리스마스에도 커밋이 있네요. 산타 대신 코딩을 선물하셨군요." },
  { id: "streak", severity: "mild", template: "설날에 커밋이라니. 세뱃돈 대신 코드를 드리셨나요." },
  { id: "streak", severity: "medium", template: "발렌타인데이에 커밋. 연인이 없다는 걸 Git이 증명합니다." },
  { id: "streak", severity: "medium", template: "추석에도 커밋이 있어요. 명절에도 코딩하시다니..." },
  { id: "streak", severity: "savage", template: "생일에도 커밋. 축하해주는 사람이 Git밖에 없었나요?" },
  { id: "streak", severity: "savage", template: "수능날에 커밋이 있어요. 수험생이 아니라 다행이지만, 수능날에 왜?" },
  { id: "streak", severity: "savage", template: "12월 25일 새벽 2시 커밋. 산타도 쉬는 시간에 코딩이라니." },
  { id: "streak", severity: "legendary", template: "1월 1일 00:00 커밋. 새해 카운트다운 대신 git push 카운트다운이었나요." },

  // ============================================================
  // 자학/자조형
  // ============================================================
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 나만 이런 건 아니겠지... 맞죠?" },
  { id: "streak", severity: "medium", template: "밀도 {density}%를 보고 반성하세요. 아, 이미 알고 계시겠군요." },
  { id: "streak", severity: "medium", template: "이 잔디를 보면서 '그래도 나름 했는데'라고 생각하시겠죠. 아닙니다." },
  { id: "streak", severity: "savage", template: "이 스트릭을 자랑스럽게 보여줄 수 있는 곳: 없음." },
  { id: "streak", severity: "savage", template: "잔디를 보면서 '아 열심히 해야겠다'고 매번 다짐하지만 안 하시는 거 알아요." },
  { id: "streak", severity: "legendary", template: "이 잔디밭을 보여드리면서 '개발자입니다'라고 소개하면 사기죄예요." },

  // ============================================================
  // IT 기업/회사 비유
  // ============================================================
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 스타트업 인턴의 열정이 느껴집니다." },
  { id: "streak", severity: "medium", template: "밀도 {density}%면 야후 말기 같은 생산성이에요." },
  { id: "streak", severity: "medium", template: "이 커밋 패턴은 '조용한 사직' 그 자체네요." },
  { id: "streak", severity: "savage", template: "구글이 이런 생산성이면 검색 한 번에 10초 걸렸을 거예요." },
  { id: "streak", severity: "savage", template: "이 밀도면 네카라쿠배 중 어디에도 못 들어가요. 배민 배달원이 더 자주 출근해요." },
  { id: "streak", severity: "savage", template: "스타트업에서 이런 스트릭이면 시리즈 A도 못 받아요." },
  { id: "streak", severity: "legendary", template: "이 커밋 밀도로 실리콘밸리 가면 첫날에 잘립니다. 아, 입사도 못 하겠네요." },
  { id: "streak", severity: "legendary", template: "이 GitHub 프로필을 가지고 네이버 면접 보면 '아 지원해주셔서 감사합니다(미소)'로 끝나요." },

  // ============================================================
  // 동물/자연 비유 로스트
  // ============================================================
  { id: "streak", severity: "mild", template: "커밋 패턴이 고양이 같아요. 하고 싶을 때만 하는." },
  { id: "streak", severity: "mild", template: "잔디 밀도가 선인장 같아요. 드물지만 살아있어요." },
  { id: "streak", severity: "medium", template: "스트릭이 나비 수명 같아요. 짧지만 아름다웠... 나요?" },
  { id: "streak", severity: "medium", template: "커밋 패턴이 철새 같아요. 계절이 바뀌면 사라지는." },
  { id: "streak", severity: "savage", template: "잔디밭이 북극 툰드라 같아요. 1년에 한 달만 초록색." },
  { id: "streak", severity: "savage", template: "코딩 패턴이 매미 같아요. 7년 땅속에 있다가 잠깐 나왔다 사라지는." },
  { id: "streak", severity: "savage", template: "스트릭이 하루살이 같아요. 하루 빛나고 사라지는." },
  { id: "streak", severity: "legendary", template: "커밋 패턴이 혜성 같아요. 76년에 한 번 나타나는 핼리 혜성." },
  { id: "streak", severity: "legendary", template: "잔디밭이 달 표면 같아요. 생명체의 흔적이 없는." },

  // ============================================================
  // 음식/요리 비유
  // ============================================================
  { id: "streak", severity: "mild", template: "커밋 밀도가 차(茶) 같아요. 연하지만 맛은 있는." },
  { id: "streak", severity: "medium", template: "스트릭이 컵라면 같아요. 3분(3일)이면 끝." },
  { id: "streak", severity: "medium", template: "잔디가 타코야끼 같아요. 겉은 그럴듯한데 속은 텅 비어있는." },
  { id: "streak", severity: "savage", template: "커밋 패턴이 편의점 도시락 같아요. 대충 때우는 느낌." },
  { id: "streak", severity: "savage", template: "밀도 {density}%의 잔디. 칼국수 면발처럼 듬성듬성." },
  { id: "streak", severity: "legendary", template: "이 잔디는 미슐랭이 아니라 백종원도 손 떠는 수준이에요." },

  // ============================================================
  // 영화/드라마 비유
  // ============================================================
  { id: "streak", severity: "mild", template: "스트릭이 단편 영화 같아요. 짧지만 의미가... 있었으면 좋겠어요." },
  { id: "streak", severity: "medium", template: "커밋 히스토리가 시즌 1만 있고 시즌 2가 취소된 드라마 같아요." },
  { id: "streak", severity: "medium", template: "스트릭이 '기생충'의 반지하처럼 오르다 말았어요." },
  { id: "streak", severity: "savage", template: "이 잔디는 '겨울왕국'이에요. 얼어붙은 채로 'Let It Go'." },
  { id: "streak", severity: "savage", template: "커밋 패턴이 '오징어 게임' 참가자 같아요. 시작은 많은데 끝까지 살아남지 못하는." },
  { id: "streak", severity: "savage", template: "스트릭이 MCU 페이즈4 같아요. 시작은 화려했는데 점점 흐지부지." },
  { id: "streak", severity: "legendary", template: "이 Git 히스토리는 '반지의 제왕' 확장판보다 길지만 내용은 '리프' 시즌1보다 적어요." },
  { id: "streak", severity: "legendary", template: "커밋 그래프가 '인터스텔라'의 시간 흐름 같아요. 지구에서 {longestGap}일이 당신에겐 하루같았나요?" },

  // ============================================================
  // 게임 비유
  // ============================================================
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 출석 보상 받을 수 있는 수준이에요." },
  { id: "streak", severity: "medium", template: "잔디가 마인크래프트 생존 모드 초반 같아요. 허허벌판에 블록 몇 개." },
  { id: "streak", severity: "medium", template: "커밋 패턴이 가챠 게임 같아요. 가끔 한 번씩 뽑기(커밋)." },
  { id: "streak", severity: "savage", template: "이 잔디밭은 '다크소울' 난이도예요. 보는 것만으로도 고통스러운." },
  { id: "streak", severity: "savage", template: "스트릭이 슈퍼마리오 1-1처럼 짧아요. 1-2로 못 넘어가시는." },
  { id: "streak", severity: "savage", template: "커밋 패턴이 배그 같아요. 시작은 100명인데 결국 혼자만 남는... 아 여기선 혼자만 사라지네요." },
  { id: "streak", severity: "legendary", template: "이 잔디밭은 게임으로 치면 '1시간 플레이 후 환불' 수준이에요." },
  { id: "streak", severity: "legendary", template: "GitHub 잔디 게임에서 당신의 랭크: Unranked. 판수가 부족합니다." },

  // ============================================================
  // 과학/수학 비유
  // ============================================================
  { id: "streak", severity: "mild", template: "커밋 밀도 {density}%. 수소 원자보다는 밀도가 높네요. 다행이에요." },
  { id: "streak", severity: "medium", template: "스트릭 패턴이 사인 파동 같아요. 올라갔다 내려갔다." },
  { id: "streak", severity: "medium", template: "커밋 빈도가 반감기를 따르네요. 시간이 갈수록 절반씩 줄어드는." },
  { id: "streak", severity: "savage", template: "잔디 밀도가 진공 상태에 가까워요. 분자 하나 없는." },
  { id: "streak", severity: "savage", template: "커밋 패턴의 엔트로피가 최대치예요. 완전한 무질서." },
  { id: "streak", severity: "savage", template: "스트릭이 양자역학적이에요. 관측하면 커밋이 있고, 안 하면 없는." },
  { id: "streak", severity: "legendary", template: "잔디 밀도 {density}%는 절대영도처럼 아무것도 없는 상태에 가깝습니다." },
  { id: "streak", severity: "legendary", template: "당신의 커밋 그래프를 수학적으로 분석하면 y = 0에 수렴합니다." },

  // ============================================================
  // 역사/문화 비유
  // ============================================================
  { id: "streak", severity: "mild", template: "커밋 패턴이 농경 사회 같아요. 파종기에만 활발한." },
  { id: "streak", severity: "medium", template: "스트릭이 로마 제국 같아요. 찬란하게 건설했다가 무너지는." },
  { id: "streak", severity: "medium", template: "공백 {longestGap}일. 코딩의 중세 암흑기를 겪으셨군요." },
  { id: "streak", severity: "savage", template: "잔디밭이 폼페이 같아요. 한때는 번성했지만 지금은 폐허." },
  { id: "streak", severity: "savage", template: "커밋 히스토리가 조선왕조실록 같아요. 오래됐지만 최근 기록은 없는." },
  { id: "streak", severity: "legendary", template: "이 레포는 디지털 마추픽추예요. 누가 왜 만들었는지, 왜 버렸는지 아무도 모르는." },

  // ============================================================
  // 날씨/기후 비유
  // ============================================================
  { id: "streak", severity: "mild", template: "잔디가 봄날 같아요. 간간이 꽃이 피는." },
  { id: "streak", severity: "medium", template: "커밋 패턴이 장마철 같아요. 한꺼번에 쏟아지다가 뚝 그치는." },
  { id: "streak", severity: "medium", template: "스트릭이 여름 소나기 같아요. 짧지만 강렬한." },
  { id: "streak", severity: "savage", template: "잔디밭이 가뭄 지역 같아요. 비(커밋)가 언제 올지 모르는." },
  { id: "streak", severity: "savage", template: "커밋 밀도가 사하라 사막 강수량 같아요. 연간 {activeDays}일." },
  { id: "streak", severity: "legendary", template: "이 잔디는 빙하기를 겪고 있어요. 다음 간빙기(커밋)는 언제인지 아무도 모릅니다." },

  // ============================================================
  // SNS/인터넷 문화 비유
  // ============================================================
  { id: "streak", severity: "mild", template: "잔디 관리가 인스타 피드 관리보다 못하시네요." },
  { id: "streak", severity: "medium", template: "커밋 패턴이 틱톡 트렌드 같아요. 잠깐 유행하다 사라지는." },
  { id: "streak", severity: "medium", template: "스트릭이 뉴스 알림 같아요. 가끔 한 번씩 울리는." },
  { id: "streak", severity: "savage", template: "GitHub 활동이 페이스북 로그인 빈도 같아요. 1년에 한 번, 생일 알림 때." },
  { id: "streak", severity: "savage", template: "잔디가 미투데이 같아요. 존재했지만 이제 아무도 기억 못하는." },
  { id: "streak", severity: "savage", template: "커밋 빈도가 싸이월드 방문 같아요. 추억팔이할 때만 가끔." },
  { id: "streak", severity: "legendary", template: "이 GitHub 프로필은 MySpace만큼이나 버려져 있어요." },

  // ============================================================
  // 교통/이동 비유
  // ============================================================
  { id: "streak", severity: "mild", template: "커밋 속도가 자전거 같아요. 느리지만 꾸준히... 가끔." },
  { id: "streak", severity: "medium", template: "스트릭이 KTX 타고 가다 대전에서 내린 것 같아요. 왜 거기서 멈추셨나요?" },
  { id: "streak", severity: "medium", template: "커밋 패턴이 서울 지하철 같아요. 러시아워에만 만원(커밋 폭주)." },
  { id: "streak", severity: "savage", template: "스트릭이 고속도로 졸음운전 같아요. 가다가 멈추고 가다가 멈추고." },
  { id: "streak", severity: "savage", template: "커밋 그래프가 비행기 착륙 같아요. 고도(커밋)가 뚝 떨어지는." },
  { id: "streak", severity: "legendary", template: "이 커밋 패턴은 타이타닉의 항로 같아요. 화려한 출발 후 침몰. 그리고 영원한 침묵." },

  // ============================================================
  // 음악 비유
  // ============================================================
  { id: "streak", severity: "mild", template: "커밋 리듬이 발라드 같아요. 느리지만 감성적인." },
  { id: "streak", severity: "medium", template: "스트릭 패턴이 K-POP 컴백 같아요. 한 번 빛나고 긴 공백." },
  { id: "streak", severity: "medium", template: "커밋 빈도가 원히트 원더 같아요. 한 번의 스트릭이 전부." },
  { id: "streak", severity: "savage", template: "잔디 패턴이 드럼 솔로 같아요. 갑자기 터지다가 갑자기 멈추는." },
  { id: "streak", severity: "savage", template: "커밋 그래프가 '강남스타일' 조회수 같아요. 한 번 폭발 후 평탄." },
  { id: "streak", severity: "legendary", template: "이 커밋 히스토리는 비틀즈 해체 후 멤버들의 솔로 앨범 같아요. 기대했는데 뭔가 부족한." },

  // ============================================================
  // 스포츠 비유
  // ============================================================
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 축구로 치면 전반전은 뛰신 거예요." },
  { id: "streak", severity: "medium", template: "커밋 패턴이 야구 타자 같아요. 삼진(공백) 아웃이 많은." },
  { id: "streak", severity: "medium", template: "스트릭이 마라톤 중 리타이어 같아요. 절반도 안 뛰고 포기." },
  { id: "streak", severity: "savage", template: "잔디가 풋살장 같아요. 작고, 관리 안 되어 있는." },
  { id: "streak", severity: "savage", template: "커밋 기록이 한국 축구 월드컵 성적 같아요. 가끔 빛나지만 대부분 아쉬운." },
  { id: "streak", severity: "legendary", template: "이 스트릭은 100미터 달리기에서 50미터 지점에서 앉아버린 것과 같아요." },

  // ============================================================
  // 결혼/연애 비유
  // ============================================================
  { id: "streak", severity: "mild", template: "코드와의 관계: '썸' 단계. 매일 연락하진 않지만 관심은 있는." },
  { id: "streak", severity: "medium", template: "코드와 {longestGap}일 연락 안 했으면 이미 이별한 거예요." },
  { id: "streak", severity: "medium", template: "스트릭이 연애 초반 같아요. 처음엔 매일 연락하다가 점점 뜸해지는." },
  { id: "streak", severity: "savage", template: "코드랑 장거리 연애하시는 건가요? {longestGap}일에 한 번 만남?" },
  { id: "streak", severity: "savage", template: "이 커밋 패턴으로 연애했으면 진작에 차였을 거예요." },
  { id: "streak", severity: "legendary", template: "코드와의 관계 상태: '읽씹'. {longestGap}일째 무응답." },

  // ============================================================
  // 추가 한국문화 특화 로스트
  // ============================================================
  { id: "streak", severity: "mild", template: "잔디 관리가 배달의민족 리뷰 쓰기 빈도 같아요. 가끔." },
  { id: "streak", severity: "medium", template: "커밋 패턴이 대학 MT 같아요. 가끔 한 번 폭발적으로 즐기는." },
  { id: "streak", severity: "medium", template: "스트릭이 다이어트 같아요. 월요일부터 열심히 → 수요일부터 폭식." },
  { id: "streak", severity: "savage", template: "잔디 밀도가 서울 미세먼지 좋은 날만큼 드물어요." },
  { id: "streak", severity: "savage", template: "커밋이 무궁화꽃이 피었습니다 같아요. 움직이다 멈추고 움직이다 멈추고." },
  { id: "streak", severity: "savage", template: "이 스트릭은 군대 전역 후 운동 패턴 같아요. 처음 한 달만 열심히." },
  { id: "streak", severity: "savage", template: "커밋 패턴이 한국 OTT 구독 같아요. 한 달 무료 체험 후 해지." },
  { id: "streak", severity: "legendary", template: "잔디가 DMZ 같아요. 아무도 들어가지 않는 비무장지대." },
  { id: "streak", severity: "legendary", template: "이 커밋 기록을 어머니가 보시면 '차라리 공무원 준비해라'고 하실 거예요." },

  // ============================================================
  // 추가 다양한 패턴 — 벌크 mild
  // ============================================================
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 소소한 기록이지만 의미 있어요." },
  { id: "streak", severity: "mild", template: "활동일 {activeDays}일. 적어도 시작은 하셨잖아요." },
  { id: "streak", severity: "mild", template: "밀도 {density}%. 은은한 잔디빛이 좋네요." },
  { id: "streak", severity: "mild", template: "공백 {longestGap}일이지만 돌아오셨으니 OK." },
  { id: "streak", severity: "mild", template: "잔디가 자라고 있어요. 느리지만 확실하게." },
  { id: "streak", severity: "mild", template: "{longestStreak}일 연속 커밋. 첫 걸음마치고 축하해요." },
  { id: "streak", severity: "mild", template: "커밋 패턴이 보입니다. 조금씩 나아지고 계시네요." },
  { id: "streak", severity: "mild", template: "밀도 {density}%로 시작. 다음엔 더 높아질 거예요. 아마도." },
  { id: "streak", severity: "mild", template: "전체 {totalDays}일 중 {activeDays}일 활동. 성장 중이시네요." },
  { id: "streak", severity: "mild", template: "스트릭이 짧아도 코딩을 했다는 사실이 중요해요." },
  { id: "streak", severity: "mild", template: "{longestStreak}일 스트릭은 초보 개발자에겐 훌륭해요." },
  { id: "streak", severity: "mild", template: "공백이 있어도 꾸준히 돌아오시는 게 대단해요." },
  { id: "streak", severity: "mild", template: "잔디 밀도 {density}%. 씨를 뿌렸으니 언젠간 자라겠죠." },
  { id: "streak", severity: "mild", template: "활동일 {activeDays}일. 내년엔 두 배로 만들어보세요." },
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 다음 목표: {longestStreak} x 2일!" },
  { id: "streak", severity: "mild", template: "커밋이 있다는 것 자체가 축하할 일이에요. 진심으로." },
  { id: "streak", severity: "mild", template: "밀도 {density}%면 100명 중 {density}번째. 괜찮아요!" },
  { id: "streak", severity: "mild", template: "느리더라도 전진하고 계시네요. 스트릭 {longestStreak}일의 증거." },
  { id: "streak", severity: "mild", template: "공백 {longestGap}일. 충분히 쉬셨으니 이제 달려볼까요?" },
  { id: "streak", severity: "mild", template: "잔디밭에 새싹이 보여요. 계속 물 주세요." },

  // ============================================================
  // 추가 다양한 패턴 — 벌크 medium
  // ============================================================
  { id: "streak", severity: "medium", template: "스트릭 {longestStreak}일 후 사라지셨네요. 외계인에게 납치된 건가요?" },
  { id: "streak", severity: "medium", template: "밀도 {density}%면 주 2~3일 코딩이에요. 아르바이트 수준." },
  { id: "streak", severity: "medium", template: "공백 {longestGap}일. 그 기간에 다른 언어로 이직하신 건 아니죠?" },
  { id: "streak", severity: "medium", template: "잔디가 패치워크 같아요. 여기저기 누더기처럼 이어붙인." },
  { id: "streak", severity: "medium", template: "활동일 {activeDays}일이면 1년에 딱 3개월 정도 코딩하시는 거네요." },
  { id: "streak", severity: "medium", template: "스트릭 {longestStreak}일. 기대를 갖게 했다가 실망시키시네요." },
  { id: "streak", severity: "medium", template: "커밋 패턴이 다이어트 일지 같아요. '오늘부터 시작' → 포기 → 반복." },
  { id: "streak", severity: "medium", template: "밀도 {density}%의 잔디밭. 조경 업체를 부를 수준은 아닌데 혼자 관리하기엔 넓은." },
  { id: "streak", severity: "medium", template: "공백 {longestGap}일 동안 다른 레포에서 활동하셨길 바랍니다." },
  { id: "streak", severity: "medium", template: "전체 {totalDays}일 중 {activeDays}일. 절반도 안 채우셨네요." },
  { id: "streak", severity: "medium", template: "스트릭이 뜨거운 물처럼 빨리 식으시네요." },
  { id: "streak", severity: "medium", template: "잔디를 보면 '의욕은 있는데 실행력이 부족'이 진단됩니다." },
  { id: "streak", severity: "medium", template: "활동 밀도 {density}%. 이메일 확인하는 것보다 드문 코딩." },
  { id: "streak", severity: "medium", template: "{longestStreak}일 연속 커밋 후 {longestGap}일 공백. 번아웃이 의심됩니다." },
  { id: "streak", severity: "medium", template: "커밋 기록이 편의점 도시락처럼 불규칙하네요." },
  { id: "streak", severity: "medium", template: "밀도 {density}%. 코딩하는 날보다 안 하는 날이 더 많아요." },
  { id: "streak", severity: "medium", template: "스트릭을 보면 '하다 말다'가 생활 패턴이신 것 같아요." },
  { id: "streak", severity: "medium", template: "활동일 {activeDays}일. 최소 {totalDays}일의 절반은 해야 하지 않을까요?" },
  { id: "streak", severity: "medium", template: "잔디가 WiFi 신호처럼 약해요. 멀리서 보면 없는 것 같은." },
  { id: "streak", severity: "medium", template: "공백 {longestGap}일. 기지개를 피신 건지 포기하신 건지 모르겠어요." },

  // ============================================================
  // 추가 다양한 패턴 — 벌크 savage
  // ============================================================
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일이 최고라니. 솔직히 놀랍습니다. 나쁜 의미로." },
  { id: "streak", severity: "savage", template: "밀도 {density}%면 100일에 {density}일만 코딩한 거예요. 나머지는 뭐?" },
  { id: "streak", severity: "savage", template: "공백 {longestGap}일 동안 코드가 죽어갔어요. 부활시킨 건 기적이에요." },
  { id: "streak", severity: "savage", template: "잔디밭이 체르노빌 같아요. 한때는 살아있었지만 지금은 방사능(공백)만 가득." },
  { id: "streak", severity: "savage", template: "활동일 {activeDays}일. 이걸로 포트폴리오 쓰시면 안 돼요." },
  { id: "streak", severity: "savage", template: "{longestStreak}일 스트릭 자랑하시면 옆에서 100일 넘는 사람이 피식 웃을 거예요." },
  { id: "streak", severity: "savage", template: "커밋 패턴이 지각하는 직장인 같아요. 가끔 출근하고 대부분 결근." },
  { id: "streak", severity: "savage", template: "밀도 {density}%의 잔디. 사파리 투어 하면 야생동물보다 커밋 찾기가 어려워요." },
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일. 이건 도전이 아니라 포기의 기록이에요." },
  { id: "streak", severity: "savage", template: "전체 {totalDays}일 중 {activeDays}일만 활동. 유급 출근이면 무단결근 사유서 쓰셔야 해요." },
  { id: "streak", severity: "savage", template: "공백 {longestGap}일이면 코드를 잊으셨을 텐데 어떻게 다시 시작하셨나요?" },
  { id: "streak", severity: "savage", template: "잔디 관리 상태: 긴급 조치 필요. 밀도 {density}%." },
  { id: "streak", severity: "savage", template: "커밋 그래프가 폐가 같아요. 사람이 살긴 사나 싶은." },
  { id: "streak", severity: "savage", template: "스트릭이 새벽 운동처럼 3일 만에 끝나네요. 매번." },
  { id: "streak", severity: "savage", template: "밀도 {density}%. 이건 개발자가 아니라 연극 엑스트라예요. 가끔 등장." },
  { id: "streak", severity: "savage", template: "활동 패턴이 유령 같아요. 있는 듯 없는 듯." },
  { id: "streak", severity: "savage", template: "공백이 {longestGap}일이면 복귀할 때 'git clone'부터 다시 하셨죠?" },
  { id: "streak", severity: "savage", template: "잔디가 사막의 신기루 같아요. 있는 것 같지만 가까이 가면 없는." },
  { id: "streak", severity: "savage", template: "스트릭 기록을 보면 '3일 천하'라는 말이 이해됩니다." },
  { id: "streak", severity: "savage", template: "커밋 밀도 {density}%. 당신의 코드는 멸종 위기종입니다. 보호해주세요." },

  // ============================================================
  // 추가 다양한 패턴 — 벌크 legendary
  // ============================================================
  { id: "streak", severity: "legendary", template: "스트릭 {longestStreak}일, 밀도 {density}%. 이 조합은 전설적으로 나쁩니다." },
  { id: "streak", severity: "legendary", template: "활동일 {activeDays}일. 이거 레포 만든 날이랑 같은 건 아니죠?" },
  { id: "streak", severity: "legendary", template: "공백 {longestGap}일. 이 기간에 AI가 개발자를 대체했을 수도 있어요." },
  { id: "streak", severity: "legendary", template: "잔디밭 상태: 사망. 사인: 방치. 밀도 {density}%." },
  { id: "streak", severity: "legendary", template: "이 커밋 기록은 '개발자의 비극'이라는 제목의 다큐멘터리로 만들어야 해요." },
  { id: "streak", severity: "legendary", template: "스트릭 {longestStreak}일, 공백 {longestGap}일. 비율이 1:{longestGap}이라니. 수학적으로 처참하네요." },
  { id: "streak", severity: "legendary", template: "밀도 {density}%면 연간 코딩 시간이 영화 한 편 보는 시간보다 적을 수도 있어요." },
  { id: "streak", severity: "legendary", template: "이 잔디밭에 '여기 개발자가 살았었다'라고 비석을 세워야 해요." },
  { id: "streak", severity: "legendary", template: "전체 {totalDays}일 중 {activeDays}일 활동. 이건 Git 로그가 아니라 유적 발굴 보고서예요." },
  { id: "streak", severity: "legendary", template: "커밋 그래프를 천문학자에게 보여줬더니 '미확인 비행물체 목격 기록이냐'고 물었어요." },
  { id: "streak", severity: "legendary", template: "스트릭 {longestStreak}일. 이건 기록이 아니라 전설입니다. 나쁜 전설." },
  { id: "streak", severity: "legendary", template: "밀도 {density}%. 이 수치는 우주의 물질 밀도보다 낮을 수 있어요." },
  { id: "streak", severity: "legendary", template: "공백 {longestGap}일. 이 레포의 가장 큰 기여는 '방치의 예술'이에요." },
  { id: "streak", severity: "legendary", template: "당신의 잔디밭은 NASA가 '생명체 존재 불가능'이라고 판정한 행성과 비슷해요." },
  { id: "streak", severity: "legendary", template: "이 커밋 히스토리를 보고 ChatGPT에게 분석을 맡겼더니 '데이터 부족'이라고 했어요." },
  { id: "streak", severity: "legendary", template: "스트릭/공백 비율을 보면 '인간의 의지는 유한하다'가 증명됩니다." },

  // ============================================================
  // 짧은 단문 로스트 추가 (다양한 severity)
  // ============================================================
  { id: "streak", severity: "mild", template: "코딩, 하고 계시죠? 가끔은?" },
  { id: "streak", severity: "mild", template: "잔디 상태: 생존 중." },
  { id: "streak", severity: "mild", template: "커밋은 있으니까요." },
  { id: "streak", severity: "mild", template: "최소한의 흔적은 남기셨어요." },
  { id: "streak", severity: "medium", template: "잔디 상태: 위기." },
  { id: "streak", severity: "medium", template: "스트릭이 너무 짧아서 웃음이 나와요." },
  { id: "streak", severity: "medium", template: "공백이 길어도 너무 길어요." },
  { id: "streak", severity: "medium", template: "커밋 좀 하세요. 진지하게." },
  { id: "streak", severity: "savage", template: "잔디 상태: 위독." },
  { id: "streak", severity: "savage", template: "이건 레포가 아니라 무덤이에요." },
  { id: "streak", severity: "savage", template: "코딩하세요. 제발." },
  { id: "streak", severity: "savage", template: "GitHub 삭제하시는 게 나을 수도..." },
  { id: "streak", severity: "legendary", template: "잔디 상태: 사망 확인." },
  { id: "streak", severity: "legendary", template: "이 프로필, 공개해도 되는 거예요?" },
  { id: "streak", severity: "legendary", template: "말이 안 나옵니다. 진짜로." },
  { id: "streak", severity: "legendary", template: "역대급입니다. 나쁜 쪽으로." },

  // ============================================================
  // 추가 밀도 + 스트릭 조합
  // ============================================================
  { id: "streak", severity: "mild", template: "밀도 {density}%에 스트릭 {longestStreak}일. 발전 가능성이 보여요." },
  { id: "streak", severity: "mild", template: "{activeDays}일 활동으로 {longestStreak}일 연속. 시작이 좋아요." },
  { id: "streak", severity: "medium", template: "밀도 {density}%인데 스트릭 {longestStreak}일이면 몰아서 하시는 타입이네요." },
  { id: "streak", severity: "medium", template: "활동일 {activeDays}일 중 연속은 {longestStreak}일. 분산 투자하시네요." },
  { id: "streak", severity: "savage", template: "밀도 {density}%, 스트릭 {longestStreak}일, 공백 {longestGap}일. 삼종 세트가 다 처참해요." },
  { id: "streak", severity: "savage", template: "{totalDays}일 중 {activeDays}일 활동인데 연속은 고작 {longestStreak}일? 매번 끊기시네요." },
  { id: "streak", severity: "legendary", template: "밀도 {density}%, 스트릭 {longestStreak}일, 공백 {longestGap}일. 이 삼위일체를 보고 울었습니다." },
  { id: "streak", severity: "legendary", template: "모든 지표가 바닥이에요. {density}%, {longestStreak}일, {longestGap}일. 완벽한 실패." },

  // ============================================================
  // 직업/진로 관련
  // ============================================================
  { id: "streak", severity: "mild", template: "이 잔디로 취업하시려면 좀 더 심어야 해요." },
  { id: "streak", severity: "medium", template: "면접관: '최근 프로젝트 활동은?' 당신: '...' (공백 {longestGap}일)" },
  { id: "streak", severity: "medium", template: "이력서에 GitHub 링크 넣으실 때 한 번 더 생각해보세요." },
  { id: "streak", severity: "savage", template: "이 잔디를 보면 헤드헌터가 뒤로가기를 누를 거예요." },
  { id: "streak", severity: "savage", template: "밀도 {density}%의 GitHub을 포트폴리오로 제출하면 역효과예요." },
  { id: "streak", severity: "savage", template: "면접에서 '꾸준히 코딩합니다'라고 하시면 이 잔디가 반박할 거예요." },
  { id: "streak", severity: "legendary", template: "이 GitHub으로 FAANG 지원하시면... 아 일단 서류는 통과 못 해요." },
  { id: "streak", severity: "legendary", template: "채용 담당자가 이 프로필 보면 '이분은 다른 분야가 맞을 것 같습니다'라고 할 거예요." },

  // ============================================================
  // 추가 신선한 표현 — 끝으로 가는 러시
  // ============================================================
  { id: "streak", severity: "mild", template: "잔디에 물을 좀 더 자주 주세요. 시들고 있어요." },
  { id: "streak", severity: "mild", template: "코딩 습관이 형성 중이시네요. 아직 완성은 안 됐지만." },
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 다이어리에 별표 붙일 수준은 돼요." },
  { id: "streak", severity: "mild", template: "천리길도 한 걸음부터. 당신은 세 걸음 정도 가셨어요." },
  { id: "streak", severity: "mild", template: "잔디가 조금씩 자라고 있어요. 인내심을 갖고 기다려볼게요." },
  { id: "streak", severity: "medium", template: "중간 점검: 스트릭 {longestStreak}일, 밀도 {density}%. 분발이 필요합니다." },
  { id: "streak", severity: "medium", template: "잔디 성적표: C+. 더 잘할 수 있는 학생인데 아쉽습니다." },
  { id: "streak", severity: "medium", template: "커밋 패턴 분석 결과: '의욕은 있으나 지속력 부족'." },
  { id: "streak", severity: "medium", template: "스트릭/공백 리포트: {longestStreak}일/{longestGap}일. 개선의 여지가 많습니다." },
  { id: "streak", severity: "medium", template: "잔디 건강 검진 결과: 주의 요망. 밀도 {density}%." },
  { id: "streak", severity: "savage", template: "잔디 응급실 입원 권고. 밀도 {density}%로 위중." },
  { id: "streak", severity: "savage", template: "커밋 히스토리 감사 결과: 부적격. 스트릭 {longestStreak}일." },
  { id: "streak", severity: "savage", template: "개발 활동 평가: F. 출석(밀도 {density}%), 성실성(스트릭 {longestStreak}일), 모두 미달." },
  { id: "streak", severity: "savage", template: "GitHub 건강 진단: 혈압(커밋 빈도) 낮음, 맥박(스트릭) 불규칙, 체온(열정) 저체온." },
  { id: "streak", severity: "savage", template: "잔디 신용등급: 최하위. 밀도 {density}%, 연체(공백) {longestGap}일." },
  { id: "streak", severity: "legendary", template: "이 잔디 프로필에 대한 최종 평가: 전설적 부진. 밀도 {density}%, 최장 스트릭 {longestStreak}일, 최장 공백 {longestGap}일. 역사에 남을 기록입니다." },
  { id: "streak", severity: "legendary", template: "축하합니다. 밀도 {density}%, 스트릭 {longestStreak}일, 공백 {longestGap}일로 '최악의 잔디' 명예의 전당에 입성하셨습니다." },
  { id: "streak", severity: "legendary", template: "잔디 부고: '{totalDays}일간 {activeDays}일 활동, 최장 연속 {longestStreak}일, 최장 공백 {longestGap}일. 밀도 {density}%. 잔디는 주인보다 먼저 떠났습니다.' R.I.P." },

  // ============================================================
  // 계절감 표현 추가
  // ============================================================
  { id: "streak", severity: "mild", template: "봄이 오면 잔디도 좀 더 자랄까요? 현재 밀도 {density}%." },
  { id: "streak", severity: "medium", template: "여름 해수욕장에서 모래성 쌓듯이 커밋하시네요. 곧 파도에 쓸려갈 운명." },
  { id: "streak", severity: "savage", template: "가을 낙엽처럼 커밋이 떨어지고 있어요. 겨울엔 완전히 사라지겠죠." },
  { id: "streak", severity: "legendary", template: "겨울 왕국의 잔디밭. 'Do you wanna build a commit?' 아무도 대답하지 않았다." },

  // ============================================================
  // 가상 대화형
  // ============================================================
  { id: "streak", severity: "medium", template: "잔디: '주인님, 물 주세요...' 당신: (읽씹). 공백 {longestGap}일." },
  { id: "streak", severity: "medium", template: "IDE: '오늘도 안 오시나요?' GitHub: '벌써 {longestGap}일째인데...'" },
  { id: "streak", severity: "savage", template: "노트북: '날 좀 켜줘...' 키보드: '먼지가 쌓이고 있어...' 잔디: '나 죽었어.'" },
  { id: "streak", severity: "savage", template: "Git: '이 레포를 아카이브 하시겠습니까?' 당신: '아직 진행 중이야!' Git: '...{longestGap}일 전에요?'" },
  { id: "streak", severity: "legendary", template: "GitHub Copilot: '제가 대신 커밋해드릴까요? 주인님보다 더 자주 할 수 있을 것 같은데...'" },

  // ============================================================
  // 한국어 속담/격언 패러디
  // ============================================================
  { id: "streak", severity: "mild", template: "'시작이 반이다' — 스트릭 {longestStreak}일이면 반의 반의 반은 하셨어요." },
  { id: "streak", severity: "medium", template: "'꾸준함이 천재를 이긴다' — 밀도 {density}%면 천재에게 지셨네요." },
  { id: "streak", severity: "medium", template: "'작심삼일'이라는 말 아시죠? 스트릭 {longestStreak}일이면 정확히 그거예요." },
  { id: "streak", severity: "savage", template: "'될 놈은 된다' — 이 잔디를 보면 안 될 놈도 있다는 걸 알겠어요." },
  { id: "streak", severity: "savage", template: "'소 잃고 외양간 고치기' — 스트릭 잃고 커밋 하나 더 하기." },
  { id: "streak", severity: "savage", template: "'티끌 모아 태산' — 밀도 {density}%면 티끌 모아 티끌이에요." },
  { id: "streak", severity: "legendary", template: "'하늘이 무너져도 솟아날 구멍이 있다' — 이 잔디밭에서 그 구멍을 찾고 있어요." },
  { id: "streak", severity: "legendary", template: "'세 살 버릇 여든까지' — 스트릭 {longestStreak}일의 버릇이면 여든까지 못 가요." },

  // ============================================================
  // 추가 마무리 로스트 (숫자 강조)
  // ============================================================
  { id: "streak", severity: "mild", template: "숫자로 보면: {longestStreak}일 연속, {longestGap}일 공백, {density}% 밀도. 보통이에요." },
  { id: "streak", severity: "medium", template: "데이터: 스트릭 {longestStreak}, 공백 {longestGap}, 밀도 {density}. 개선 필요." },
  { id: "streak", severity: "savage", template: "STAT — streak: {longestStreak}d, gap: {longestGap}d, density: {density}%. 처참한 스코어카드." },
  { id: "streak", severity: "legendary", template: "최종 보고: {totalDays}일간 {activeDays}일 활동, 밀도 {density}%, 최장 연속 {longestStreak}일, 최장 공백 {longestGap}일. 판결: 유죄(코딩 태만)." },

  // ============================================================
  // 완전 새로운 각도들
  // ============================================================
  { id: "streak", severity: "mild", template: "잔디에 자동 물 주기 시스템이 필요해요. 일명 CI/CD." },
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 처음에 강하고 나중에 약한 타입이시군요." },
  { id: "streak", severity: "medium", template: "GitHub Actions으로 매일 자동 커밋하면 안 되나요? 아 그건 사기인가." },
  { id: "streak", severity: "medium", template: "커밋 캘린더에 패턴이 있어요: '안 함, 안 함, 안 함, 한 번 함, 안 함, 안 함...'" },
  { id: "streak", severity: "medium", template: "스트릭 유지하려면 노력이 필요한데, 그 노력조차 {longestStreak}일 만에 포기하셨네요." },
  { id: "streak", severity: "savage", template: "매일 커밋 알람을 맞춰보세요. 아, 알람도 무시하시는 타입이시군요." },
  { id: "streak", severity: "savage", template: "'내일부터 매일 커밋'이 당신의 만트라죠? {longestGap}일째 내일을 기다리고 있어요." },
  { id: "streak", severity: "savage", template: "코딩 다이어리 쓰는 것도 추천드려요. 아 다이어리도 작심삼일이시겠네요." },
  { id: "streak", severity: "legendary", template: "이 잔디밭을 NFT로 만들면 '디지털 황무지'라는 이름으로 팔 수 있을 거예요." },
  { id: "streak", severity: "legendary", template: "AI에게 코딩 시키는 시대에 본인이 코딩 안 하시는 건 시대를 앞서간 거일 수도 있어요. 아닌데." },

  // ============================================================
  // 인생 비유 시리즈
  // ============================================================
  { id: "streak", severity: "mild", template: "인생은 마라톤이래요. 당신은 {longestStreak}일만 뛰고 쉬고 계시지만." },
  { id: "streak", severity: "medium", template: "커밋도 복리처럼 쌓여야 하는데, 계속 출금(공백)만 하시네요." },
  { id: "streak", severity: "medium", template: "코딩도 저축처럼 매일 조금씩 하면 되는데, {longestGap}일 동안 0원 적금이시네요." },
  { id: "streak", severity: "savage", template: "코딩 연금: 매일 커밋하면 은퇴 후 부자. 당신의 연금 잔고: 밀도 {density}%. 노후가 걱정됩니다." },
  { id: "streak", severity: "savage", template: "개발 실력도 주식처럼 장기 투자해야 하는데, {longestGap}일마다 손절하시네요." },
  { id: "streak", severity: "legendary", template: "인생 로드맵: 코딩 시작 → 열정 MAX → 번아웃 → 장기 공백 → '나 원래 문과야'. 현재 어디쯤이세요?" },

  // ============================================================
  // 절망적 상황 유머
  // ============================================================
  { id: "streak", severity: "savage", template: "밀도 {density}%의 잔디를 보고 식물도 울었어요." },
  { id: "streak", severity: "savage", template: "이 스트릭을 보여주면 후배들이 '저렇게 되면 안 돼'라고 할 거예요." },
  { id: "streak", severity: "savage", template: "공백 {longestGap}일. 이 동안 당신의 IDE는 먼지 속에서 울부짖었어요." },
  { id: "streak", severity: "legendary", template: "이 잔디밭을 고고학자가 발굴하면 '여기 문명이 있었다'고 논문을 쓸 거예요." },
  { id: "streak", severity: "legendary", template: "미래에서 온 역사학자: '이 GitHub은 21세기 디지털 유적지로 보존되어야 합니다.'" },
  { id: "streak", severity: "legendary", template: "이 잔디밭의 밀도({density}%)는 우주 공간의 물질 밀도와 비교 연구 대상입니다." },

  // ============================================================
  // 마지막 추가 배치 — 목표 1000 도달
  // ============================================================
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 빌드업이 되고 있어요. 아마." },
  { id: "streak", severity: "mild", template: "밀도 {density}%. 초보 농부의 첫 번째 수확 같아요." },
  { id: "streak", severity: "mild", template: "활동일 {activeDays}일. 안 한 날도 코드 생각은 하셨겠죠?" },
  { id: "streak", severity: "mild", template: "공백 {longestGap}일이지만 복귀했으니 이겼어요. 자기 자신에게." },
  { id: "streak", severity: "mild", template: "{longestStreak}일 스트릭이면 일주일은 넘기셨네요? 아니면 못 넘기셨나요?" },
  { id: "streak", severity: "medium", template: "전체 {totalDays}일 여정에서 {activeDays}일만 함께하신 당신." },
  { id: "streak", severity: "medium", template: "잔디에 비료가 필요해요. 비료 = 커밋." },
  { id: "streak", severity: "medium", template: "스트릭을 늘리고 싶으면 하루 1커밋부터. 그것도 어렵다면 주 1커밋." },
  { id: "streak", severity: "medium", template: "밀도 {density}%를 올리려면 하루에 한 줄이라도 커밋하세요." },
  { id: "streak", severity: "medium", template: "{longestGap}일 공백은 '전략적 휴식'이라고 하기엔 너무 길어요." },
  { id: "streak", severity: "savage", template: "스트릭과 공백의 비율이 역전되면 개발자 은퇴를 고려해보세요." },
  { id: "streak", severity: "savage", template: "잔디밭이 아니라 바코드예요. 스캔하면 '가격: 0원'이 나올 듯." },
  { id: "streak", severity: "savage", template: "밀도 {density}%의 커밋 히스토리. 이건 로그가 아니라 비상 신호예요." },
  { id: "streak", severity: "savage", template: "활동일 {activeDays}일 중 실제로 의미 있는 커밋은 몇 개나 될까요?" },
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일이 인생 최고 기록이라니 앞날이 걱정돼요." },
  { id: "streak", severity: "legendary", template: "결론: 밀도 {density}%, 스트릭 {longestStreak}일, 공백 {longestGap}일. 이 프로필은 '어떻게 하면 안 되는가'의 교과서입니다." },
  { id: "streak", severity: "legendary", template: "마지막 한 마디: {totalDays}일 중 {activeDays}일만 코딩한 당신, 이 로스트가 동기부여가 됐길 바랍니다. 안 되겠지만." },
  { id: "streak", severity: "legendary", template: "Git 히스토리 최종 판결: 유죄. 죄목: 잔디 학대, 스트릭 유기, 밀도 방치. 형량: 매일 1커밋 365일." },
  { id: "streak", severity: "legendary", template: "이 잔디의 DNA를 분석했더니 '게으름' 유전자가 {density}% 검출됐습니다." },
  { id: "streak", severity: "legendary", template: "최종 보고서를 마치며: 스트릭 {longestStreak}일, 공백 {longestGap}일, 밀도 {density}%. 할 말을 잃었습니다. 진짜로." },

  // ============================================================
  // 추가 배치 1 — 스트릭 길이별 상세 (260+ 추가)
  // ============================================================
  // 스트릭 2~5일 (mild)
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 이틀은 넘겼으니 작심이일은 면했네요." },
  { id: "streak", severity: "mild", template: "{longestStreak}일 연속이면 주말 없이 코딩한 적이 있다는 뜻이죠?" },
  { id: "streak", severity: "mild", template: "연속 {longestStreak}일. 3일은 넘겼으니 작심삼일보다는 나아요." },
  { id: "streak", severity: "mild", template: "{longestStreak}일 스트릭. 손가락 다섯 개로 셀 수 있는 수준." },
  { id: "streak", severity: "mild", template: "최장 연속 {longestStreak}일. 설 연휴 동안만 코딩한 거 아닌가요?" },
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일이면 추석 연휴보다 짧아요." },
  { id: "streak", severity: "mild", template: "{longestStreak}일 연속. 월요일부터 수요일까지 딱 3일?" },
  { id: "streak", severity: "mild", template: "연속 커밋 {longestStreak}일. 짧은 스프린트 느낌이네요." },
  { id: "streak", severity: "mild", template: "{longestStreak}일 스트릭. 택배 배송 기간보다 짧아요." },
  { id: "streak", severity: "mild", template: "최장 {longestStreak}일. 감기 걸리면 바로 끊기는 수준이에요." },

  // 스트릭 10~20일 (mild/medium)
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 2주 이상 매일 커밋한 건 나름 대단해요." },
  { id: "streak", severity: "mild", template: "{longestStreak}일이면 습관이 형성되기 시작하는 시점인데 아쉬워요." },
  { id: "streak", severity: "mild", template: "연속 {longestStreak}일. 21일의 법칙에 도전하셨군요. 아깝!" },
  { id: "streak", severity: "medium", template: "스트릭 {longestStreak}일. 3주 정도면 습관이 될 수 있었는데..." },
  { id: "streak", severity: "medium", template: "{longestStreak}일 연속 후 무슨 일이 있었나요? 갑자기 끊기셨네." },
  { id: "streak", severity: "medium", template: "2~3주 연속 커밋이면 칭찬할 만한데 그 뒤가 아쉽네요." },
  { id: "streak", severity: "medium", template: "{longestStreak}일 스트릭. 보름달 한 번 보는 동안만 코딩하셨네요." },
  { id: "streak", severity: "medium", template: "최장 {longestStreak}일. 한 달은 못 채우셨군요." },
  { id: "streak", severity: "medium", template: "연속 {longestStreak}일이면 잘하고 계셨는데 왜 멈추셨어요?" },
  { id: "streak", severity: "medium", template: "{longestStreak}일 스트릭. 급여일까지 버틴 건가요?" },

  // 공백 3~7일 (mild)
  { id: "streak", severity: "mild", template: "공백 {longestGap}일. 주말 쉬다 온 수준이에요." },
  { id: "streak", severity: "mild", template: "{longestGap}일 공백이면 감기 한 번 걸렸나 봐요." },
  { id: "streak", severity: "mild", template: "최장 공백 {longestGap}일. 건강한 수준의 휴식이에요." },
  { id: "streak", severity: "mild", template: "{longestGap}일 쉬셨다고요? 그 정도는 괜찮아요." },
  { id: "streak", severity: "mild", template: "공백 {longestGap}일. 짧은 휴가 다녀오셨나 봐요." },
  { id: "streak", severity: "mild", template: "최장 {longestGap}일 공백이면 아직 걱정할 수준은 아니에요." },
  { id: "streak", severity: "mild", template: "{longestGap}일 공백. 리프레시하고 오셨네요." },

  // 공백 10~20일 (medium)
  { id: "streak", severity: "medium", template: "공백 {longestGap}일. 2주면 좀 길긴 하지만 이해할 수 있어요." },
  { id: "streak", severity: "medium", template: "{longestGap}일 공백이면 휴가 갔다 온 걸로 치겠습니다." },
  { id: "streak", severity: "medium", template: "최장 공백 {longestGap}일. 시험 기간이었겠죠? 아마도." },
  { id: "streak", severity: "medium", template: "{longestGap}일간 안 코딩하면 IDE 사용법 까먹지 않았나요?" },
  { id: "streak", severity: "medium", template: "공백 {longestGap}일. 그 동안 뭐 하셨는지 모르지만 코딩은 아니었네요." },
  { id: "streak", severity: "medium", template: "최장 {longestGap}일 공백이면 스프린트 2개 건너뛴 거예요." },
  { id: "streak", severity: "medium", template: "{longestGap}일 쉬다 돌아오면 'git pull' 하는 게 무서웠겠네요." },

  // 공백 60일 (savage)
  { id: "streak", severity: "savage", template: "공백 {longestGap}일이면 2달이에요. 그건 휴식이 아니라 방학입니다." },
  { id: "streak", severity: "savage", template: "{longestGap}일 공백. 2개월이면 계절이 바뀌기 시작해요." },
  { id: "streak", severity: "savage", template: "최장 공백 {longestGap}일. 두 달이면 임시 저장한 코드도 잊으셨겠네요." },
  { id: "streak", severity: "savage", template: "{longestGap}일 동안 코딩 안 하면 근육(코딩력)이 퇴화돼요." },
  { id: "streak", severity: "savage", template: "공백 {longestGap}일. 이 기간에 프레임워크가 한 번은 업데이트됐을 거예요." },

  // 밀도 추가 세분화 (5% 이하)
  { id: "streak", severity: "legendary", template: "밀도 {density}%. 5% 미만이면 연간 20일도 안 코딩한 거예요." },
  { id: "streak", severity: "legendary", template: "{density}% 밀도. 100일에 5일 코딩이라니 전문직 아니시죠?" },
  { id: "streak", severity: "legendary", template: "잔디 밀도 {density}%. 이건 프로그래머가 아니라 프로그래밍 구경꾼이에요." },
  { id: "streak", severity: "savage", template: "밀도 {density}%면 한 달에 하루도 안 코딩하는 날이 있다는 거예요." },
  { id: "streak", severity: "savage", template: "{density}% 밀도의 GitHub. 인테리어용으로도 못 쓰겠네요." },

  // 밀도 추가 세분화 (40~50%)
  { id: "streak", severity: "mild", template: "밀도 {density}%. 절반은 코딩하고 절반은 쉬는 밸런스." },
  { id: "streak", severity: "mild", template: "{density}% 밀도면 격일제 코딩이네요. 규칙적이에요." },
  { id: "streak", severity: "mild", template: "잔디 밀도 {density}%. 하루는 일하고 하루는 쉬는 좋은 리듬." },
  { id: "streak", severity: "mild", template: "{density}%면 주중 5일 중 2~3일은 코딩하시는 거죠? 합리적." },
  { id: "streak", severity: "mild", template: "밀도 {density}%. 딱 반이면 나름 균형 잡힌 삶이에요." },

  // ============================================================
  // 미니 시리즈: "만약에" 시리즈
  // ============================================================
  { id: "streak", severity: "medium", template: "만약 매일 커밋했다면 스트릭이 {totalDays}일이었을 텐데. 현실: {longestStreak}일." },
  { id: "streak", severity: "medium", template: "만약 공백 없이 했다면 밀도가 100%였을 텐데. 현실: {density}%." },
  { id: "streak", severity: "savage", template: "만약 AI가 대신 커밋했다면 밀도가 100%였을 거예요. 고려해보세요." },
  { id: "streak", severity: "savage", template: "만약 강아지가 키보드에 앉았다면 이 잔디보다는 나았을 거예요." },
  { id: "streak", severity: "legendary", template: "만약 시간을 되돌릴 수 있다면, 이 공백 {longestGap}일을 채우시겠어요? 안 하실 것 같지만." },

  // ============================================================
  // 미니 시리즈: 숫자 놀이
  // ============================================================
  { id: "streak", severity: "mild", template: "{longestStreak} + {longestGap} = 코딩 인생의 요약." },
  { id: "streak", severity: "medium", template: "{activeDays} / {totalDays} = {density}%. 이 분수가 당신의 코딩 열정을 말해줘요." },
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일 × 밀도 {density}% = 처참한 곱셈." },
  { id: "streak", severity: "legendary", template: "{longestGap} > {longestStreak}인 게 이 프로필의 비극이에요." },

  // ============================================================
  // 미니 시리즈: if-else 코드 스타일
  // ============================================================
  { id: "streak", severity: "medium", template: "if (streak > 30) {{ 칭찬(); }} else {{ 로스트(); }} // 결과: 로스트()" },
  { id: "streak", severity: "savage", template: "while (motivated) {{ commit(); }} // 루프가 {longestStreak}일 만에 break됨." },
  { id: "streak", severity: "savage", template: "try {{ 매일커밋(); }} catch (게으름) {{ sleep({longestGap}일); }}" },
  { id: "streak", severity: "legendary", template: "git log --oneline | wc -l → {total}. 이 중 의미있는 것: 추정 불가." },
  { id: "streak", severity: "medium", template: "const 스트릭 = {longestStreak}; // TODO: 더 늘리기" },
  { id: "streak", severity: "savage", template: "const 공백 = {longestGap}; // BUG: 너무 김" },

  // ============================================================
  // 미니 시리즈: 리뷰 별점 스타일
  // ============================================================
  { id: "streak", severity: "mild", template: "잔디 평점: ★★★☆☆. 밀도 {density}%. '나쁘지 않음'." },
  { id: "streak", severity: "medium", template: "잔디 평점: ★★☆☆☆. 스트릭 {longestStreak}일. '개선 필요'." },
  { id: "streak", severity: "savage", template: "잔디 평점: ★☆☆☆☆. 밀도 {density}%. '비추'." },
  { id: "streak", severity: "legendary", template: "잔디 평점: ☆☆☆☆☆. 스트릭 {longestStreak}일, 공백 {longestGap}일. '환불 요청'." },

  // ============================================================
  // 미니 시리즈: 뉴스 헤드라인 스타일
  // ============================================================
  { id: "streak", severity: "mild", template: "[속보] 개발자, {longestStreak}일 연속 커밋 달성. '다음엔 더 하겠다' 포부." },
  { id: "streak", severity: "medium", template: "[단독] {longestGap}일간 커밋 실종 사건. 개발자 '바빴다'고 해명." },
  { id: "streak", severity: "savage", template: "[긴급] 잔디 밀도 {density}% 급락. 전문가 '심각한 수준' 경고." },
  { id: "streak", severity: "legendary", template: "[특종] 밀도 {density}%, 스트릭 {longestStreak}일 개발자 발견. 학계 '이게 가능한가' 충격." },

  // ============================================================
  // 미니 시리즈: 의사 진단서 스타일
  // ============================================================
  { id: "streak", severity: "mild", template: "진단: 경미한 코딩 불규칙. 처방: 1일 1커밋 30일. 예후: 양호." },
  { id: "streak", severity: "medium", template: "진단: 중등도 번아웃 의심. 증상: 스트릭 {longestStreak}일 후 {longestGap}일 공백. 처방: 휴식 후 점진적 복귀." },
  { id: "streak", severity: "savage", template: "진단: 심각한 코딩 기피증. 증상: 밀도 {density}%, 만성 공백. 처방: 코딩 재활 프로그램." },
  { id: "streak", severity: "legendary", template: "진단: 말기 코딩 포기증. 증상: 모든 지표 최하위. 처방: 없음. 존엄한 은퇴 권고." },

  // ============================================================
  // 미니 시리즈: 주식 리포트 스타일
  // ============================================================
  { id: "streak", severity: "mild", template: "종목: 잔디밭. 현재가: 밀도 {density}%. 투자의견: 중립. 목표가: 50%." },
  { id: "streak", severity: "medium", template: "종목: 스트릭. 52주 최고: {longestStreak}일. 현재: 하락세. 매수 시기 관망." },
  { id: "streak", severity: "savage", template: "종목: 코딩열정. 시가총액: 밀도 {density}%. 거래량: 급감. 투자의견: 매도." },
  { id: "streak", severity: "legendary", template: "종목: GitHub 프로필. 상장폐지 위기. 밀도 {density}%, 최장 공백 {longestGap}일. 관리종목 지정." },

  // ============================================================
  // 미니 시리즈: 부동산 매물 스타일
  // ============================================================
  { id: "streak", severity: "mild", template: "매물: 잔디밭 {totalDays}평. 조경 상태 보통. 밀도 {density}%. 즉시 입주 가능." },
  { id: "streak", severity: "medium", template: "매물: 잔디밭. 수리 필요. 스트릭 {longestStreak}일 지역 특화. 공백 {longestGap}일 구간 주의." },
  { id: "streak", severity: "savage", template: "매물: 황무지 {totalDays}평. 잔디 흔적 {activeDays}개소. 밀도 {density}%. 재개발 필요." },
  { id: "streak", severity: "legendary", template: "매물: 방치된 부지. 밀도 {density}%. 감정가 0원. 구매 비추천." },

  // ============================================================
  // 미니 시리즈: 학교 성적표 스타일
  // ============================================================
  { id: "streak", severity: "mild", template: "성적표 — 꾸준함: B-. 스트릭: C+. 밀도: B. 종합: 양호." },
  { id: "streak", severity: "medium", template: "성적표 — 꾸준함: C. 스트릭: D+. 밀도: C-. 종합: 개선 필요." },
  { id: "streak", severity: "savage", template: "성적표 — 꾸준함: F. 스트릭: F. 밀도: D. 종합: 유급 위기." },
  { id: "streak", severity: "legendary", template: "성적표 — 모든 과목 F. 보충 학습 필요. 학부모 면담 요청됨." },

  // ============================================================
  // 미니 시리즈: 날씨 예보 스타일
  // ============================================================
  { id: "streak", severity: "mild", template: "오늘의 잔디 날씨: 구름 조금, 가끔 초록. 밀도 {density}%." },
  { id: "streak", severity: "medium", template: "주간 잔디 예보: 커밋 확률 {density}%. 우산(백업)은 챙기세요." },
  { id: "streak", severity: "savage", template: "긴급 잔디 기상: 가뭄 경보. 최장 {longestGap}일 무강수(무커밋)." },
  { id: "streak", severity: "legendary", template: "특보: 잔디 대재앙 경보 발령. 밀도 {density}%, 역대 최장 공백 {longestGap}일." },

  // ============================================================
  // 미니 시리즈: RPG 캐릭터 시트
  // ============================================================
  { id: "streak", severity: "mild", template: "캐릭터: 코더. STR(스트릭): {longestStreak}. DEF(밀도): {density}. HP: 양호." },
  { id: "streak", severity: "medium", template: "스탯 — 근성: {longestStreak}/100. 체력: {density}/100. 레벨: 초급." },
  { id: "streak", severity: "savage", template: "캐릭터 시트 — 모든 스탯이 10 이하. 튜토리얼도 못 깬 수준." },
  { id: "streak", severity: "legendary", template: "캐릭터 사망. 부활 비용: 매일 1커밋 × {longestGap}일. 지불 의사: 의심됨." },

  // ============================================================
  // 미니 시리즈: 요리 레시피 스타일
  // ============================================================
  { id: "streak", severity: "mild", template: "레시피: 잔디밭. 재료: 커밋 {activeDays}개, 열정 약간, 꾸준함 부족. 결과: 밀도 {density}%." },
  { id: "streak", severity: "medium", template: "조리법: 스트릭 쿠키. 반죽 {longestStreak}일 후 오븐에서 꺼냄(포기). 완성도: 미흡." },
  { id: "streak", severity: "savage", template: "오늘의 메뉴: 잔디 샐러드. 재료 부족으로 빈 접시가 제공됩니다. 밀도 {density}%." },
  { id: "streak", severity: "legendary", template: "셰프 평가: 이 잔디는 맛이 없습니다. 재료({activeDays}일)가 부족하고 조리 시간(스트릭 {longestStreak}일)이 짧아요." },

  // ============================================================
  // 미니 시리즈: 여행 리뷰 스타일
  // ============================================================
  { id: "streak", severity: "mild", template: "여행지: 잔디밭. 평점 3/5. '볼 건 좀 있지만 많진 않음'." },
  { id: "streak", severity: "medium", template: "리뷰: 이 잔디밭은 관광 명소라기엔... 밀도 {density}%로 볼거리 부족." },
  { id: "streak", severity: "savage", template: "여행 리뷰: 평점 1/5. '여기 갈 바에 다른 데 가세요'. 잔디 없음." },
  { id: "streak", severity: "legendary", template: "트립어드바이저 리뷰: '이 잔디밭은 사기입니다. 잔디가 없어요.' ★☆☆☆☆" },

  // ============================================================
  // 미니 시리즈: 광고/마케팅 스타일
  // ============================================================
  { id: "streak", severity: "mild", template: "새로운 잔디밭 오픈! 밀도 {density}%! ※실제 잔디와 다를 수 있습니다." },
  { id: "streak", severity: "medium", template: "특가! 스트릭 {longestStreak}일 달성 기념 세일! ※재입고 미정." },
  { id: "streak", severity: "savage", template: "주의: 이 잔디밭은 광고와 다릅니다. 밀도 {density}%. 기대 금지." },
  { id: "streak", severity: "legendary", template: "사기 광고 신고: '매일 커밋합니다'라더니 밀도 {density}%. 과대 광고." },

  // ============================================================
  // 추가 세트: 잔디 관련 워드플레이
  // ============================================================
  { id: "streak", severity: "mild", template: "잔디에 물 주기: {activeDays}회 / {totalDays}일. 마른 잔디 주의보." },
  { id: "streak", severity: "medium", template: "잔디밭 관리 보고: 관리 상태 불량. 밀도 {density}%. 추가 관리 필요." },
  { id: "streak", severity: "savage", template: "잔디밭에 잡초(공백)가 너무 많아요. {longestGap}일짜리 잡초가 최대." },
  { id: "streak", severity: "legendary", template: "이 잔디밭은 골프장이 아니라 폐광이에요. 밀도 {density}%." },

  // 추가 공백 관련
  { id: "streak", severity: "medium", template: "공백 {longestGap}일은 넷플릭스 정주행 몇 편 분량인가요?" },
  { id: "streak", severity: "medium", template: "{longestGap}일 동안 코딩 대신 뭘 하셨는지 TIL 써주세요." },
  { id: "streak", severity: "savage", template: "공백 {longestGap}일. 이 기간에 Python 3.12가 나왔어요." },
  { id: "streak", severity: "savage", template: "{longestGap}일 공백이면 새 팀원이 들어와서 나간 시간이에요." },
  { id: "streak", severity: "legendary", template: "공백 {longestGap}일. 이 동안 스티브 잡스가 아이폰 만들었을 거예요." },

  // 추가 스트릭 관련
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 새싹반에서 올리브반으로 승급 가능." },
  { id: "streak", severity: "medium", template: "{longestStreak}일 연속이면 보상으로 커피 한 잔 사세요." },
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일로 자랑하시면 웃음 보유세 내셔야 해요." },
  { id: "streak", severity: "legendary", template: "{longestStreak}일 스트릭을 NFT로 만들면 0.0001 ETH도 안 할 거예요." },

  // 추가 밀도 관련
  { id: "streak", severity: "mild", template: "잔디 밀도 {density}%. 반은 채웠으니 반은 빈 거예요." },
  { id: "streak", severity: "medium", template: "밀도 {density}%의 잔디. 정원사로서 D등급이에요." },
  { id: "streak", severity: "savage", template: "{density}% 밀도. 이건 잔디가 아니라 대머리 잔디밭이에요." },
  { id: "streak", severity: "legendary", template: "밀도 {density}%. 잔디밭 인증 취소. 황무지로 재분류됩니다." },

  // ============================================================
  // 미니 시리즈: 타임라인 형식
  // ============================================================
  { id: "streak", severity: "medium", template: "타임라인: Day 1 - 의욕 충만. Day {longestStreak} - 마지막 커밋. Day {longestStreak}+1 ~ Day {longestStreak}+{longestGap} - 실종." },
  { id: "streak", severity: "savage", template: "프로젝트 타임라인: 시작({longestStreak}일간 열심) → 공백({longestGap}일간 방치) → 이 로스트." },
  { id: "streak", severity: "legendary", template: "인생 타임라인: 코딩 시작 → {longestStreak}일 열정 → {longestGap}일 방황 → '나 원래 코딩 안 해' 선언." },

  // ============================================================
  // 미니 시리즈: 택배/배송 스타일
  // ============================================================
  { id: "streak", severity: "mild", template: "커밋 배송 현황: {activeDays}건 배송 완료. {totalDays}건 중. 배송률 {density}%." },
  { id: "streak", severity: "medium", template: "커밋 배송 지연 알림: 최장 {longestGap}일 지연. 고객 불만 접수됨." },
  { id: "streak", severity: "savage", template: "커밋 배송 사고: {longestGap}일간 미배송. 택배 기사(개발자) 연락 두절." },
  { id: "streak", severity: "legendary", template: "커밋 배송 완전 중단. 택배 회사 부도. 밀도 {density}%로 폐업 수준." },

  // ============================================================
  // 미니 시리즈: 동화/우화 스타일
  // ============================================================
  { id: "streak", severity: "mild", template: "토끼와 거북이에서 당신은 거북이예요. 느리지만 가고 있어요. 밀도 {density}%." },
  { id: "streak", severity: "medium", template: "개미와 베짱이에서 당신은 베짱이. 여름({longestStreak}일)에 놀다가 겨울({longestGap}일 공백)에 후회." },
  { id: "streak", severity: "savage", template: "아기돼지 삼형제에서 당신은 짚으로 집 지은 첫째. 스트릭 {longestStreak}일 만에 무너짐." },
  { id: "streak", severity: "legendary", template: "이 잔디밭의 동화: '어느 날 개발자가 커밋을 시작했습니다. {longestStreak}일 후 영영 끝이었습니다. The End.'" },

  // ============================================================
  // 미니 시리즈: 상품 리뷰 스타일
  // ============================================================
  { id: "streak", severity: "mild", template: "상품명: 잔디밭. 구매자 리뷰: '기대했던 것보다 괜찮음. 밀도 {density}%.' 3.5/5" },
  { id: "streak", severity: "medium", template: "상품 리뷰: '배송은 빨랐는데 잔디가 듬성듬성함. 밀도 {density}%.' 2.5/5" },
  { id: "streak", severity: "savage", template: "리뷰: '사기당한 기분. 잔디가 거의 없음. 밀도 {density}%. 환불 원함.' 1/5" },
  { id: "streak", severity: "legendary", template: "리뷰: '최악의 잔디밭. 사진과 다름. 밀도 {density}%. 신고 완료.' 0/5" },

  // ============================================================
  // 미니 시리즈: 운세/점성술 스타일
  // ============================================================
  { id: "streak", severity: "mild", template: "오늘의 잔디 운세: 밀도 {density}%의 기운이 감지됩니다. 오늘 커밋하면 운이 올라갈 거예요." },
  { id: "streak", severity: "medium", template: "이번 주 코딩 운세: 스트릭 {longestStreak}일의 기운이 약해지고 있습니다. 분발하세요." },
  { id: "streak", severity: "savage", template: "올해 잔디 운세: 밀도 {density}%. 큰 공백({longestGap}일)이 예고됩니다. 조심하세요." },
  { id: "streak", severity: "legendary", template: "평생 코딩 운세: '코딩과 인연이 없습니다.' 밀도 {density}%가 증거." },

  // ============================================================
  // 추가 대량 mild
  // ============================================================
  { id: "streak", severity: "mild", template: "코딩 기록이 있다는 것만으로도 시작은 하신 거예요." },
  { id: "streak", severity: "mild", template: "잔디에 생명력이 조금씩 채워지고 있어요." },
  { id: "streak", severity: "mild", template: "{longestStreak}일이면 나름 꾸준하시네요." },
  { id: "streak", severity: "mild", template: "밀도 {density}%는 초보치고 나쁘지 않아요." },
  { id: "streak", severity: "mild", template: "적어도 git을 쓸 줄 아시잖아요. 그것만으로도." },
  { id: "streak", severity: "mild", template: "공백이 있어도 돌아오는 게 중요해요. 스트릭 {longestStreak}일로 다시 시작!" },
  { id: "streak", severity: "mild", template: "잔디밭이 조금씩 푸르러지고 있어요. 계속하세요." },
  { id: "streak", severity: "mild", template: "매일 안 해도 괜찮아요. {density}%면 충분한 노력이에요." },
  { id: "streak", severity: "mild", template: "커밋이 없는 날도 코딩 생각은 하셨겠죠? 그것도 코딩이에요(아닌데)." },
  { id: "streak", severity: "mild", template: "잔디 밀도가 낮아도 한 커밋 한 커밋에 진심이면 돼요." },
  { id: "streak", severity: "mild", template: "스트릭보다 코드의 질이 중요해요. 그렇죠? 네?" },
  { id: "streak", severity: "mild", template: "활동일 {activeDays}일. 0보다 훨씬 나은 숫자예요." },
  { id: "streak", severity: "mild", template: "잔디 심기는 마라톤이에요. 지금은 5km 지점." },
  { id: "streak", severity: "mild", template: "꾸준함은 타고나는 게 아니라 만드는 거예요. 아직 만드는 중이시네요." },
  { id: "streak", severity: "mild", template: "스트릭 {longestStreak}일. 작지만 확실한 성과." },

  // ============================================================
  // 추가 대량 medium
  // ============================================================
  { id: "streak", severity: "medium", template: "밀도 {density}%면 매일 출석부에 이름 안 적는 학생이에요." },
  { id: "streak", severity: "medium", template: "스트릭이 {longestStreak}일에서 끊긴 이유가 궁금하네요." },
  { id: "streak", severity: "medium", template: "공백 {longestGap}일이 여러 번이면 패턴이에요. 나쁜 패턴." },
  { id: "streak", severity: "medium", template: "잔디가 '도트 아트' 같아요. 점이 찍혀 있긴 한데 그림은 안 보이는." },
  { id: "streak", severity: "medium", template: "커밋 캘린더에 빈 칸이 가득하네요." },
  { id: "streak", severity: "medium", template: "스트릭이 불꽃놀이 같아요. 잠깐 빛나고 사라지는." },
  { id: "streak", severity: "medium", template: "밀도 {density}%. 반 이상을 쉬셨다는 뜻이에요." },
  { id: "streak", severity: "medium", template: "활동일 {activeDays}일이면 하루 평균 커밋 시간이 궁금해요." },
  { id: "streak", severity: "medium", template: "잔디가 모자이크 처리된 것 같아요. 군데군데 가려져 있는." },
  { id: "streak", severity: "medium", template: "스트릭 {longestStreak}일 후 무슨 변수가 생겼길래 끊기셨나요?" },
  { id: "streak", severity: "medium", template: "공백이 스트릭보다 길면 코딩 안 하는 게 일상인 거예요." },
  { id: "streak", severity: "medium", template: "잔디밭의 오아시스: 스트릭 {longestStreak}일. 주변은 사막." },
  { id: "streak", severity: "medium", template: "커밋 빈도를 주간으로 환산하면 주 {density}/14일 정도?" },
  { id: "streak", severity: "medium", template: "밀도가 {density}%인 건 반성의 시작이에요." },
  { id: "streak", severity: "medium", template: "스트릭을 {longestStreak}일 이상 유지하려면 알람이 필요해요." },

  // ============================================================
  // 추가 대량 savage
  // ============================================================
  { id: "streak", severity: "savage", template: "밀도 {density}%의 잔디를 보면서 '나 열심히 했다'고 자위하시면 안 돼요." },
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일이 인생 최고 기록이라니." },
  { id: "streak", severity: "savage", template: "공백 {longestGap}일을 '전략적 휴식'이라고 부르지 마세요." },
  { id: "streak", severity: "savage", template: "잔디가 이 정도면 제초제를 뿌린 건지 의심돼요." },
  { id: "streak", severity: "savage", template: "활동일 {activeDays}일로 뭘 만드셨나요? 진심으로 궁금해요." },
  { id: "streak", severity: "savage", template: "커밋 기록을 보면 '산소호흡기 같은 프로젝트'가 떠올라요. 간신히 살아있는." },
  { id: "streak", severity: "savage", template: "밀도 {density}%면 잔디를 '보유 중'이라고 하기 민망해요." },
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일이라고 자랑하시면 그 자리에서 로스팅당해요." },
  { id: "streak", severity: "savage", template: "공백 {longestGap}일 동안 이 프로젝트는 사실상 archived였어요." },
  { id: "streak", severity: "savage", template: "잔디 관리 점수: 25/100. 재시험 통보." },
  { id: "streak", severity: "savage", template: "{totalDays}일 중 {activeDays}일만 코딩이면 직업이 아니라 취미도 아닌 뭔가." },
  { id: "streak", severity: "savage", template: "커밋 그래프가 분실물 센터 같아요. 가끔 물건(커밋)이 들어오는." },
  { id: "streak", severity: "savage", template: "밀도 {density}%면 '비활성 계정' 워닝 메일 감이에요." },
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일. 다음 목표: 최소 두 배. 할 수 있죠? 아 못 하시겠군요." },
  { id: "streak", severity: "savage", template: "잔디에 '여기서부터 공백'이라는 비석이 {longestGap}일마다 서 있어요." },

  // ============================================================
  // 추가 대량 legendary
  // ============================================================
  { id: "streak", severity: "legendary", template: "이 잔디밭은 유네스코 자연유산으로 등록 불가. 자연이 없어서." },
  { id: "streak", severity: "legendary", template: "밀도 {density}%면 보험사에서 '코딩 활동 없음'으로 분류해요." },
  { id: "streak", severity: "legendary", template: "스트릭 {longestStreak}일의 전설은 끝나고, 공백 {longestGap}일의 암흑시대가 시작됐어요." },
  { id: "streak", severity: "legendary", template: "이 잔디밭에 '코딩했던 곳'이라는 기념 동판을 붙여야 해요. 과거형으로." },
  { id: "streak", severity: "legendary", template: "활동일 {activeDays}일. 이 숫자를 보면서 '충분하다'고 생각하시면 안 돼요." },
  { id: "streak", severity: "legendary", template: "공백 {longestGap}일. '언젠간 다시 코딩할 거야'의 '언젠간'이 영원인 듯." },
  { id: "streak", severity: "legendary", template: "밀도 {density}%의 잔디. 이건 잔디가 아니라 모래밭에 파란 점 몇 개예요." },
  { id: "streak", severity: "legendary", template: "스트릭 기록이 '인류 최단'으로 기네스북에 올라갈 수도 있어요." },
  { id: "streak", severity: "legendary", template: "이 잔디밭의 생물 다양성: 0. 밀도 {density}%에서 살아남은 잔디 없음." },
  { id: "streak", severity: "legendary", template: "코딩 은퇴식을 올리셔야 할 것 같아요. 이미 사실상 은퇴 상태인데 공식적으로." },

  // ============================================================
  // 미니 시리즈: 명언 패러디
  // ============================================================
  { id: "streak", severity: "mild", template: "'천재는 1%의 영감과 99%의 노력' — 당신은 {density}%의 노력. 나머지는 휴식." },
  { id: "streak", severity: "medium", template: "'포기하지 않으면 이미 이긴 것' — 공백 {longestGap}일이면 포기 의심." },
  { id: "streak", severity: "savage", template: "'실패는 성공의 어머니' — 밀도 {density}%면 성공의 외할머니 단계." },
  { id: "streak", severity: "legendary", template: "'갈 수 있는 곳까지 가보자' — {longestStreak}일이 그 한계였나요?" },

  // ============================================================
  // 미니 시리즈: 대선 결과 스타일
  // ============================================================
  { id: "streak", severity: "mild", template: "코딩 대선 결과: 커밋 후보 {density}% 득표. 공백 후보 나머지%. 접전." },
  { id: "streak", severity: "savage", template: "코딩 대선: 공백 후보 당선! 밀도 {density}%로 커밋 후보 참패." },
  { id: "streak", severity: "legendary", template: "코딩 대선 최종 결과: 공백 후보 압승. 밀도 {density}%. '코딩 안 함'이 국민의 선택." },

  // ============================================================
  // 추가 마무리
  // ============================================================
  { id: "streak", severity: "mild", template: "매일은 못 해도 매주 한 번이라도 커밋하세요. 밀도 {density}%보다는 나아질 거예요." },
  { id: "streak", severity: "mild", template: "코딩은 습관이에요. 스트릭 {longestStreak}일에서 시작해서 100일까지 가보세요." },
  { id: "streak", severity: "medium", template: "밀도를 올리는 법: 1) IDE를 열기 2) 한 줄이라도 쓰기 3) 커밋 4) 반복. 그게 안 되죠?" },
  { id: "streak", severity: "medium", template: "스트릭 {longestStreak}일이 한계라면 한 달 챌린지부터 도전하세요." },
  { id: "streak", severity: "savage", template: "이 잔디를 보고 바꾸지 않으면 내년에도 같은 로스트를 들으실 거예요." },
  { id: "streak", severity: "savage", template: "밀도 {density}%, 스트릭 {longestStreak}일. 변하고 싶다면 지금부터." },
  { id: "streak", severity: "legendary", template: "이 로스트가 동기부여가 될까요? 아마 3일 후엔 잊으시겠죠. 작심삼일처럼." },
  { id: "streak", severity: "legendary", template: "마지막 충고: 잔디 밀도 {density}%, 스트릭 {longestStreak}일, 공백 {longestGap}일. 이 숫자를 바꿀 힘은 당신에게 있어요. 아마도." },

  // ============================================================
  // 최종 추가 50+ — 1000 도달용
  // ============================================================
  { id: "streak", severity: "mild", template: "이번 달 목표: 스트릭 {longestStreak}일 경신!" },
  { id: "streak", severity: "mild", template: "{activeDays}일 활동은 충분히 의미있어요. 계속하세요." },
  { id: "streak", severity: "mild", template: "잔디가 조금씩 늘고 있어요. 느리지만 확실하게." },
  { id: "streak", severity: "mild", template: "스트릭이 짧아도 시작한 것 자체가 대단해요." },
  { id: "streak", severity: "mild", template: "밀도 {density}%면 아직 성장 중인 잔디밭이에요." },
  { id: "streak", severity: "mild", template: "공백 {longestGap}일 후 복귀한 당신은 전사입니다." },
  { id: "streak", severity: "mild", template: "매일 안 해도 돼요. 하지만 주 3회는 해주세요." },
  { id: "streak", severity: "mild", template: "잔디 심기 레벨: 초급. 다음 레벨까지 남은 커밋: 많음." },
  { id: "streak", severity: "mild", template: "{longestStreak}일 스트릭으로 출발! 목표: 두 자리 수!" },
  { id: "streak", severity: "mild", template: "잔디에 첫 번째 꽃이 피고 있어요. 계속 물 주세요." },
  { id: "streak", severity: "medium", template: "커밋 캘린더를 프린트해서 벽에 붙이세요. 동기부여가 될 수도." },
  { id: "streak", severity: "medium", template: "스트릭 챌린지를 해보세요. 7일 → 14일 → 30일 단계별로." },
  { id: "streak", severity: "medium", template: "공백 {longestGap}일을 줄이는 게 당면 과제예요." },
  { id: "streak", severity: "medium", template: "밀도를 올리려면 작은 커밋이라도 매일 하는 게 좋아요." },
  { id: "streak", severity: "medium", template: "잔디가 '패치워크'에서 '잔디밭'이 되려면 노력이 필요해요." },
  { id: "streak", severity: "medium", template: "{totalDays}일 여정에서 {activeDays}일 활동이면 아직 갈 길이 멀어요." },
  { id: "streak", severity: "medium", template: "스트릭 {longestStreak}일을 두 배로 늘려보세요. 할 수 있어요. 아마." },
  { id: "streak", severity: "medium", template: "공백을 줄이는 팁: 코딩 알람 설정, IDE 자동 실행, 목표 공유." },
  { id: "streak", severity: "medium", template: "잔디 밀도 {density}%에서 50%까지 올리는 게 첫 번째 마일스톤." },
  { id: "streak", severity: "medium", template: "커밋하기 싫을 때도 한 줄만 고치세요. 습관이 됩니다." },
  { id: "streak", severity: "savage", template: "스트릭 {longestStreak}일을 보고 안도하시면 안 돼요. 더 하셔야 해요." },
  { id: "streak", severity: "savage", template: "밀도 {density}%를 자랑하시면 주변에서 실망할 거예요." },
  { id: "streak", severity: "savage", template: "공백 {longestGap}일을 반복하시면 개발자로서 미래가 어두워요." },
  { id: "streak", severity: "savage", template: "잔디 관리는 개 관리보다 쉬운데 왜 이런 밀도인가요?" },
  { id: "streak", severity: "savage", template: "스트릭이 이 정도면 코딩 캠프라도 다녀오세요." },
  { id: "streak", severity: "savage", template: "이 잔디를 보면서 '나 개발자야'라고 하면 양심에 찔리지 않나요?" },
  { id: "streak", severity: "savage", template: "밀도 {density}%면 주변 개발자 친구들이 걱정할 수준이에요." },
  { id: "streak", severity: "savage", template: "커밋 대신 이 로스트 읽는 시간에 한 줄이라도 코딩하세요." },
  { id: "streak", severity: "savage", template: "{longestGap}일 공백이 자주 반복되면 습관적 방치예요." },
  { id: "streak", severity: "savage", template: "잔디밭을 보면 전문적인 코딩이 아니라 '간간이 하는 취미'가 보여요." },
  { id: "streak", severity: "legendary", template: "밀도 {density}%로 개발자를 자칭하면 직업윤리 위반이에요." },
  { id: "streak", severity: "legendary", template: "이 잔디를 면접관에게 보여주면 '다음 면접자 들어오세요'가 들릴 거예요." },
  { id: "streak", severity: "legendary", template: "스트릭 {longestStreak}일, 밀도 {density}%. 이 조합은 코딩 포기선언이에요." },
  { id: "streak", severity: "legendary", template: "공백 {longestGap}일. 이 동안 AI가 당신의 자리를 완전히 대체했어요." },
  { id: "streak", severity: "legendary", template: "잔디 밀도로 보면 이 레포는 '미완성 유적지'로 등록돼야 해요." },
  { id: "streak", severity: "legendary", template: "커밋 히스토리를 시간순으로 보면 '열정의 죽음'이 기록돼 있어요." },
  { id: "streak", severity: "legendary", template: "이 잔디밭의 마지막 말: '나를 잊지 마세요...' (공백 {longestGap}일)" },
  { id: "streak", severity: "legendary", template: "스트릭 vs 공백 = {longestStreak} vs {longestGap}. 공백의 압승. KO." },
  { id: "streak", severity: "mild", template: "꾸준함이 핵심이에요. 스트릭 {longestStreak}일에서 시작합시다." },
  { id: "streak", severity: "mild", template: "잔디는 하루아침에 완성되지 않아요. 매일 한 줄씩." },
  { id: "streak", severity: "mild", template: "활동일 {activeDays}일. 0이 아니라서 다행이에요." },
  { id: "streak", severity: "mild", template: "코딩 루틴 만들기: 1일 1커밋부터. 스트릭 목표: {longestStreak}+1일." },
  { id: "streak", severity: "medium", template: "잔디 리포트 종합: 밀도 {density}%, 스트릭 {longestStreak}일, 공백 {longestGap}일. C학점." },
  { id: "streak", severity: "medium", template: "스트릭 신기록 달성 시 자축 커밋 찍으세요. 동기부여가 됩니다." },
  { id: "streak", severity: "savage", template: "잔디 리포트 종합: 밀도 {density}%, 스트릭 {longestStreak}일, 공백 {longestGap}일. F학점." },
  { id: "streak", severity: "savage", template: "이 로스트가 동기부여가 안 되면 아무것도 안 될 거예요." },
  { id: "streak", severity: "legendary", template: "잔디 리포트 종합: 밀도 {density}%, 스트릭 {longestStreak}일, 공백 {longestGap}일. 등급: 전설적 실패." },
  { id: "streak", severity: "legendary", template: "이 로스트를 읽고 코딩을 시작하면 당신은 진짜 개발자. 안 하면... 안녕히 가세요." },
];
