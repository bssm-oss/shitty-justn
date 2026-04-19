import type { RoastTemplate } from "../../types.ts";

export const contributorTemplates: RoastTemplate[] = [
  // ============================================================
  // 솔로 개발자 (100% 혼자) — mild
  // ============================================================
  { id: "contributor", severity: "mild", template: "기여자 {totalContributors}명. 혼자서 다 하셨네요. 대단합니다." },
  { id: "contributor", severity: "mild", template: "솔로 비율 {soloRatio}%. 1인 개발의 외로운 길을 걷고 계시군요." },
  { id: "contributor", severity: "mild", template: "기여자가 {topContributor}님 한 분뿐이네요. 올스타 원맨쇼!" },
  { id: "contributor", severity: "mild", template: "전체 {total}개 커밋을 혼자 하셨다니. 독립 정신이 대단해요." },
  { id: "contributor", severity: "mild", template: "솔로 개발자 {topContributor}님. 자신만의 세계를 구축하셨군요." },
  { id: "contributor", severity: "mild", template: "기여자 1명, 커밋 {total}개. 혼자서도 잘 해요 그 자체." },
  { id: "contributor", severity: "mild", template: "100% 솔로 프로젝트. 자유로운 영혼의 코딩이시네요." },
  { id: "contributor", severity: "mild", template: "{topContributor}님의 원맨 프로젝트. PR 리뷰는 셀프로?" },
  { id: "contributor", severity: "mild", template: "솔로 개발이라 머지 충돌 걱정이 없으시겠네요. 축하드려요." },
  { id: "contributor", severity: "mild", template: "기여자 {totalContributors}명(=나). 가장 효율적인 팀 구성이에요." },
  { id: "contributor", severity: "mild", template: "혼자서 {total}커밋. 모든 영광도 모든 버그도 당신의 것." },
  { id: "contributor", severity: "mild", template: "1인 체제의 프로젝트. 의사결정이 빠르시겠어요. 유일한 의사결정권자니까." },
  { id: "contributor", severity: "mild", template: "솔로 비율 100%. 팀워크? 그게 뭔가요?" },
  { id: "contributor", severity: "mild", template: "{total}개 커밋 중 100%가 {topContributor}님. 이건 프로젝트가 아니라 일기장이에요." },
  { id: "contributor", severity: "mild", template: "홀로 개발의 미학. {total}커밋의 주인공은 당신 한 명." },

  // 솔로 개발자 — medium
  { id: "contributor", severity: "medium", template: "혼자서 {total}커밋이라니. 친구가 없는 건지 실력이 좋은 건지 모르겠네요." },
  { id: "contributor", severity: "medium", template: "솔로 비율 {soloRatio}%. 코드 리뷰는 거울 보면서 하시나요?" },
  { id: "contributor", severity: "medium", template: "기여자 {totalContributors}명. 이 프로젝트에 관심 있는 사람이 지구에 1명이군요." },
  { id: "contributor", severity: "medium", template: "{topContributor}님 혼자 {total}커밋. 팀 프로젝트라고 속이면 안 돼요." },
  { id: "contributor", severity: "medium", template: "솔로 개발이면 모든 버그가 당신 책임이라는 뜻이에요." },
  { id: "contributor", severity: "medium", template: "기여자 1명. 'Works on my machine'이 항상 통하는 환경이시네요." },
  { id: "contributor", severity: "medium", template: "100% 혼자 개발. 코드 리뷰 없이 main에 바로 푸시하시죠?" },
  { id: "contributor", severity: "medium", template: "솔로 {total}커밋. 이 고독한 여정에 동행할 사람은 없었나요?" },
  { id: "contributor", severity: "medium", template: "{topContributor}님만의 프로젝트. 다른 사람이 보면 이해할 수 있는 코드인가요?" },
  { id: "contributor", severity: "medium", template: "기여자가 자신 뿐이면 PR이란 걸 만들어본 적 없으시겠네요." },
  { id: "contributor", severity: "medium", template: "혼자서 모든 걸 하시는 풀스택 전사. 외로운 전쟁이네요." },
  { id: "contributor", severity: "medium", template: "솔로 개발의 장점: 충돌 없음. 단점: 리뷰 없음, 피드백 없음, 성장 없음." },
  { id: "contributor", severity: "medium", template: "{total}개 커밋 중 다른 사람 커밋: 0개. 이건 오픈소스가 아니라 클로즈드소스." },
  { id: "contributor", severity: "medium", template: "이 레포에서 가장 활발한 기여자: {topContributor}. 가장 게으른 기여자: 역시 {topContributor}." },

  // 솔로 개발자 — savage
  { id: "contributor", severity: "savage", template: "기여자 {totalContributors}명. 이건 프로젝트가 아니라 혼잣말이에요." },
  { id: "contributor", severity: "savage", template: "솔로 비율 100%. 아무도 이 프로젝트에 관심이 없다는 증거." },
  { id: "contributor", severity: "savage", template: "{topContributor}님 혼자 {total}커밋. 방에서 혼자 코딩하는 모습이 눈에 선해요." },
  { id: "contributor", severity: "savage", template: "기여자 1명이면 버스 팩터가 1이에요. 당신이 쓰러지면 프로젝트도 죽어요." },
  { id: "contributor", severity: "savage", template: "100% 솔로. 아무도 함께하고 싶지 않은 프로젝트라는 뜻이기도 하죠." },
  { id: "contributor", severity: "savage", template: "혼자서 개발, 혼자서 리뷰, 혼자서 배포, 혼자서 장애 대응. 소시오패스 개발자." },
  { id: "contributor", severity: "savage", template: "기여자가 1명이면 이건 오픈소스가 아니라 '열린 일기장'이에요." },
  { id: "contributor", severity: "savage", template: "솔로 비율 100%인데 'Contributions welcome'이라고 README에 쓰셨죠? 아무도 안 와요." },
  { id: "contributor", severity: "savage", template: "{total}커밋 중 100%가 본인. 가장 큰 팬: 자기 자신. 유일한 사용자: 자기 자신." },
  { id: "contributor", severity: "savage", template: "혼자 개발하면 코드 스타일이 일관적이라는 장점이... 아 그것도 아니군요." },
  { id: "contributor", severity: "savage", template: "기여자 {totalContributors}명. 이 레포의 가치를 알아보는 사람: 0명 (본인 제외)." },
  { id: "contributor", severity: "savage", template: "솔로 프로젝트의 슬픈 진실: 아무도 안 쓰고, 아무도 모르고, 아무도 안 알아줘요." },

  // 솔로 개발자 — legendary
  { id: "contributor", severity: "legendary", template: "기여자 1명, 커밋 {total}개. 이건 개발자가 아니라 디지털 히키코모리에요." },
  { id: "contributor", severity: "legendary", template: "솔로 비율 100%. GitHub에서 가장 외로운 레포 어워드 수상 후보입니다." },
  { id: "contributor", severity: "legendary", template: "{topContributor}님 혼자 전체 커밋. 이분이 사라지면 프로젝트의 모든 지식도 사라집니다. 인류의 손실." },
  { id: "contributor", severity: "legendary", template: "이 레포는 {topContributor}님의 독백입니다. 관객: 0명." },
  { id: "contributor", severity: "legendary", template: "100% 솔로 개발자. 팀 프로젝트 경험란에 뭐라고 쓰실 건가요?" },
  { id: "contributor", severity: "legendary", template: "기여자가 본인 뿐인 레포를 포트폴리오에 넣으시면 면접관이 '팀워크' 질문을 건너뛸 거예요. 물어볼 게 없으니까." },

  // ============================================================
  // 거의 혼자 (95%+) — mild
  // ============================================================
  { id: "contributor", severity: "mild", template: "{topContributor}님이 {topContributorRatio}% 기여. 거의 혼자 하셨네요." },
  { id: "contributor", severity: "mild", template: "기여자 {totalContributors}명이지만 실질적으로는 {topContributor}님의 프로젝트." },
  { id: "contributor", severity: "mild", template: "솔로 비율 {soloRatio}%. 다른 사람들은 구경만 하셨나 봐요." },
  { id: "contributor", severity: "mild", template: "{topContributorRatio}%가 한 사람이라면 나머지는 장식이에요." },
  { id: "contributor", severity: "mild", template: "실질적 1인 프로젝트. {topContributor}님의 열정이 대단하세요." },
  { id: "contributor", severity: "mild", template: "{totalContributors}명이 참여했지만 95% 이상이 {topContributor}님이시네요." },
  { id: "contributor", severity: "mild", template: "거의 솔로 프로젝트. 다른 사람들은 인사치레로 커밋 하나씩 한 듯." },
  { id: "contributor", severity: "mild", template: "{topContributor}님이 대부분 하시고 나머지는 이름만 올린 수준." },
  { id: "contributor", severity: "mild", template: "사실상 1인 개발인데 기여자 {totalContributors}명이라고 적으면 팀 프로젝트 같아 보이긴 하죠." },
  { id: "contributor", severity: "mild", template: "{soloRatio}% 솔로. 나머지 {totalContributors}명은 응원단인가요?" },

  // 거의 혼자 — medium
  { id: "contributor", severity: "medium", template: "{topContributor}님 {topContributorRatio}%. 나머지 기여자들은 README에 이름만 올린 거죠?" },
  { id: "contributor", severity: "medium", template: "기여자 {totalContributors}명인데 한 사람이 95%면 나머지는 존재감이 없어요." },
  { id: "contributor", severity: "medium", template: "솔로 비율 {soloRatio}%. 팀 프로젝트라고 쓰셨는데 팀이 맞나요?" },
  { id: "contributor", severity: "medium", template: "{topContributor}님이 거의 다 하시는데 다른 사람들은 왜 기여자 목록에 있나요?" },
  { id: "contributor", severity: "medium", template: "95%+ 기여율이면 팀원들에게 '그냥 내가 할게'라고 말씀하셨겠네요." },
  { id: "contributor", severity: "medium", template: "{totalContributors}명 참여, 실질 기여자 1명. 나머지는 유령 회원." },
  { id: "contributor", severity: "medium", template: "팀 프로젝트인데 {topContributor}님만 일하시는 전형적인 조별과제 패턴." },
  { id: "contributor", severity: "medium", template: "{topContributorRatio}% 기여면 다른 사람들은 '존재'만 한 거예요." },
  { id: "contributor", severity: "medium", template: "기여자 목록에 이름이 있는 것만으로 감사해야 하나요?" },
  { id: "contributor", severity: "medium", template: "실질적 솔로 프로젝트를 '팀 프로젝트'라고 부르는 건 사기예요." },
  { id: "contributor", severity: "medium", template: "{topContributor}님이 거의 다 하셨는데, 나머지 {totalContributors}명은 PR 하나씩만 날린 거죠?" },
  { id: "contributor", severity: "medium", template: "솔로 비율 {soloRatio}%. '같이 하자'고 해놓고 혼자 다 한 거네요." },

  // 거의 혼자 — savage
  { id: "contributor", severity: "savage", template: "{topContributor}님 {topContributorRatio}%. 다른 기여자들은 관광객이에요. 잠깐 들렀다 간." },
  { id: "contributor", severity: "savage", template: "95%+ 솔로. 나머지 기여자들의 커밋을 'pity commit'이라고 부릅니다." },
  { id: "contributor", severity: "savage", template: "기여자 목록에 이름 올리려고 README 오타 하나 고친 사람들 있죠? 그게 나머지에요." },
  { id: "contributor", severity: "savage", template: "{topContributor}님이 프로젝트이고 나머지는 부록이에요." },
  { id: "contributor", severity: "savage", template: "솔로 비율 {soloRatio}%. 팀원들에게 '너네 없어도 돼'가 통보된 상태." },
  { id: "contributor", severity: "savage", template: "{totalContributors}명이 기여자인데 한 사람이 95%+ 하면 나머지는 이력서용이에요." },
  { id: "contributor", severity: "savage", template: "다른 기여자들의 총 커밋이 {topContributor}님의 하루치보다 적어요." },
  { id: "contributor", severity: "savage", template: "팀 프로젝트인데 혼자 다 하는 사람. 조별과제 A+ 받던 그 사람이시죠?" },
  { id: "contributor", severity: "savage", template: "{topContributorRatio}% 기여. 나머지 기여자들은 '참여했다'는 인증만 받으러 온 거예요." },
  { id: "contributor", severity: "savage", template: "이 레포의 진짜 주인: {topContributor}. 나머지: 세입자(이사 예정)." },

  // 거의 혼자 — legendary
  { id: "contributor", severity: "legendary", template: "{topContributor}님 {topContributorRatio}% 기여. 이건 팀이 아니라 {topContributor}님의 백업 댄서들이에요." },
  { id: "contributor", severity: "legendary", template: "기여자 {totalContributors}명인데 실질 기여자 1명. 나머지는 엔딩 크레딧에 이름 올리기용." },
  { id: "contributor", severity: "legendary", template: "솔로 비율 {soloRatio}%. 이 레포는 '{topContributor}의 일기장 feat. 엑스트라 {totalContributors}명'." },
  { id: "contributor", severity: "legendary", template: "{topContributor}님이 없으면 이 레포는 README 하나 달랑 있는 빈 껍데기예요." },

  // ============================================================
  // 한 사람이 대부분 하고 나머지는 장식
  // ============================================================
  { id: "contributor", severity: "mild", template: "{topContributor}님이 {topContributorRatio}% 기여. 팀의 에이스시네요." },
  { id: "contributor", severity: "mild", template: "기여 분포가 한쪽으로 치우쳐 있네요. {topContributor}님이 핵심이시군요." },
  { id: "contributor", severity: "medium", template: "{topContributor}님이 {topContributorRatio}%라면 나머지 팀원들은 뭐 했나요?" },
  { id: "contributor", severity: "medium", template: "한 사람이 80%+면 팀이 아니라 외주 맡긴 거예요." },
  { id: "contributor", severity: "medium", template: "{topContributor}님: 짐을 지는 사람. 나머지: 짐이 되는 사람들." },
  { id: "contributor", severity: "savage", template: "{topContributor}님이 {topContributorRatio}% 했는데 성과는 나눠 갖죠? 공산주의 프로젝트." },
  { id: "contributor", severity: "savage", template: "기여 불균형이 심합니다. {topContributor}님은 아틀라스처럼 세계를 짊어지고 계세요." },
  { id: "contributor", severity: "savage", template: "나머지 팀원들은 {topContributor}님이 다 해줄 거라고 믿고 있었죠? 맞았네요." },
  { id: "contributor", severity: "savage", template: "{topContributorRatio}% 기여한 {topContributor}님. 나머지 팀원들은 무임승차 중이에요." },
  { id: "contributor", severity: "legendary", template: "{topContributor}님은 프로젝트의 엔진이고, 나머지는 장식용 스포일러에요. 없어도 달려요." },
  { id: "contributor", severity: "legendary", template: "이 팀의 실체: {topContributor}님 + NPC {totalContributors}명." },

  // ============================================================
  // 기여자 수 — 1명
  // ============================================================
  { id: "contributor", severity: "mild", template: "기여자 수: 1명. 심플하고 깔끔한 구조네요." },
  { id: "contributor", severity: "medium", template: "기여자가 1명이면 PR이 뭔지 모르시겠네요." },
  { id: "contributor", severity: "medium", template: "1명이 모든 걸 합니다. 개발, 테스트, 배포, QA, PM. 만능인." },
  { id: "contributor", severity: "savage", template: "기여자 1명. 세상에서 가장 작은 개발팀." },
  { id: "contributor", severity: "savage", template: "혼자 하시면 코드 리뷰는 어떻게 하세요? '내가 짠 코드는 완벽해' 모드?" },
  { id: "contributor", severity: "legendary", template: "기여자 1명. 이 레포는 당신의 정신 세계를 담은 모놀리스입니다." },

  // 기여자 수 — 2~3명
  { id: "contributor", severity: "mild", template: "기여자 {totalContributors}명. 소규모 팀이지만 알찬 구성이네요." },
  { id: "contributor", severity: "mild", template: "{totalContributors}명이서 {total}커밋. 소수 정예!" },
  { id: "contributor", severity: "mild", template: "2~3명의 기여자. 스타트업 초기 멤버 느낌이에요." },
  { id: "contributor", severity: "medium", template: "기여자 {totalContributors}명인데 {topContributor}님이 {topContributorRatio}%면 나머지는 이름만..." },
  { id: "contributor", severity: "medium", template: "{totalContributors}명이서 하는데 기여 비율이 편향적이네요." },
  { id: "contributor", severity: "savage", template: "기여자 {totalContributors}명. 그 중 실질적 개발자: 1명. 나머지: 정신적 지원." },
  { id: "contributor", severity: "savage", template: "{totalContributors}명이서 이 정도 커밋이면 각자 뭐 했는지 궁금하네요." },

  // 기여자 수 — 5~10명
  { id: "contributor", severity: "mild", template: "기여자 {totalContributors}명! 꽤 활발한 프로젝트네요." },
  { id: "contributor", severity: "mild", template: "{totalContributors}명이 참여했다니. 관심받는 프로젝트군요." },
  { id: "contributor", severity: "medium", template: "기여자 {totalContributors}명인데 한 사람이 {topContributorRatio}%면 나머진 뭐 했나요?" },
  { id: "contributor", severity: "medium", template: "{totalContributors}명이나 있는데 커밋 분포가 이래서야..." },
  { id: "contributor", severity: "savage", template: "기여자 {totalContributors}명 중 실제로 코드 쓴 사람: 2명. 나머지: 감상자." },
  { id: "contributor", severity: "savage", template: "{totalContributors}명이나 모여서 {total}커밋이면 1인당 생산성이 심각해요." },

  // 기여자 수 — 10명+
  { id: "contributor", severity: "mild", template: "기여자 {totalContributors}명! 대규모 프로젝트네요. 대단합니다." },
  { id: "contributor", severity: "mild", template: "{totalContributors}명이 참여한 오픈소스 프로젝트. 커뮤니티의 힘!" },
  { id: "contributor", severity: "medium", template: "기여자 {totalContributors}명인데 {topContributor}님이 {topContributorRatio}%라니. 나머지는 별 따러 온 건가요?" },
  { id: "contributor", severity: "medium", template: "{totalContributors}명의 기여자. 하지만 핵심은 상위 3명이에요." },
  { id: "contributor", severity: "savage", template: "기여자 {totalContributors}명 중 커밋 10개 이상: 아마 3명. 나머지는 'Good first issue' 클리어만." },
  { id: "contributor", severity: "legendary", template: "{totalContributors}명이나 모였는데 한 사람이 {topContributorRatio}%. 이건 오픈소스가 아니라 독재 체제." },

  // ============================================================
  // 팀 프로젝트인데 혼자 다 하는 사람
  // ============================================================
  { id: "contributor", severity: "mild", template: "팀에 {totalContributors}명이 있는데 {topContributor}님이 리드하시는군요." },
  { id: "contributor", severity: "mild", template: "{topContributor}님의 헌신이 돋보이는 팀 프로젝트." },
  { id: "contributor", severity: "medium", template: "팀 프로젝트인데 {topContributor}님이 {topContributorRatio}%라면 팀원들 반성 좀 하세요." },
  { id: "contributor", severity: "medium", template: "대학 조별과제 느낌이 물씬 나요. {topContributor}님만 고생하시는." },
  { id: "contributor", severity: "medium", template: "{topContributor}님: '나 다 했는데?' 팀원들: '고마워~'" },
  { id: "contributor", severity: "medium", template: "팀 프로젝트 기여도: {topContributor} {topContributorRatio}%, 나머지 전부 합쳐서 나머지%." },
  { id: "contributor", severity: "savage", template: "이건 팀 프로젝트가 아니라 {topContributor}님의 과제에 이름 올린 사람들이에요." },
  { id: "contributor", severity: "savage", template: "조별과제 트라우마가 여기서 재현되고 있네요. {topContributor}님 힘내세요." },
  { id: "contributor", severity: "savage", template: "{topContributor}님이 {topContributorRatio}% 하는 동안 나머지는 카톡으로 '화이팅!' 보내고 있었죠." },
  { id: "contributor", severity: "savage", template: "팀원들은 {topContributor}님에게 기생 중이에요. 기생충도 이 정도는 안 합니다." },
  { id: "contributor", severity: "savage", template: "발표 자료에서 '팀원 전원 기여'라고 쓰셨죠? Git 로그가 거짓말이라고 합니다." },
  { id: "contributor", severity: "savage", template: "{totalContributors}명의 팀인데 {topContributor}님만 불타고 있어요. 나머진 소화기도 안 들어요." },
  { id: "contributor", severity: "legendary", template: "{topContributor}님: 모든 코드의 저자. 팀원들: PPT의 저자. 이것이 한국 조별과제의 현실." },
  { id: "contributor", severity: "legendary", template: "팀원 {totalContributors}명의 기여: README 작성, .gitignore 추가, 오타 수정. {topContributor}님: 나머지 전부." },
  { id: "contributor", severity: "legendary", template: "이 팀의 구조: {topContributor}(CEO, CTO, 개발자, QA) + 나머지(관객)." },

  // ============================================================
  // 기여 불균형 (한 사람 80%+)
  // ============================================================
  { id: "contributor", severity: "mild", template: "{topContributor}님이 {topContributorRatio}% 기여하셨네요. 팀의 기둥." },
  { id: "contributor", severity: "mild", template: "기여 분포가 좀 치우쳐 있지만, {topContributor}님이 열심히 하신 거잖아요." },
  { id: "contributor", severity: "medium", template: "기여 불균형 감지! {topContributor}님 {topContributorRatio}%. 로드밸런싱이 필요해요." },
  { id: "contributor", severity: "medium", template: "한 사람에게 80% 이상 의존하는 건 위험해요. 버스 팩터 1." },
  { id: "contributor", severity: "medium", template: "{topContributorRatio}%가 한 사람이면 그 사람이 휴가 가면 프로젝트도 휴가." },
  { id: "contributor", severity: "medium", template: "기여 그래프가 기울어진 운동장처럼 한쪽으로 쏠려있어요." },
  { id: "contributor", severity: "savage", template: "{topContributor}님 {topContributorRatio}%. 나머지는 산소 같은 존재. 있어도 못 느끼는." },
  { id: "contributor", severity: "savage", template: "기여 불균형이 빈부격차보다 심해요. 코딩계의 지니계수 0.9." },
  { id: "contributor", severity: "savage", template: "80%+ 기여율이면 나머지 팀원들은 '거들 뿐'이에요." },
  { id: "contributor", severity: "savage", template: "{topContributor}님이 빠지면 이 프로젝트는 README만 남아요." },
  { id: "contributor", severity: "savage", template: "기여 비율: {topContributor}님 {topContributorRatio}%. 이건 불균형이 아니라 독점이에요." },
  { id: "contributor", severity: "legendary", template: "기여 분포가 북한 경제 구조 같아요. 한 명이 다 가지고 나머지는 아사 직전." },
  { id: "contributor", severity: "legendary", template: "{topContributor}님: 프로젝트의 태양. 나머지: 태양이 없으면 죽는 행성들." },

  // ============================================================
  // 고스트 기여자 (커밋 1-2개만 있는 사람)
  // ============================================================
  { id: "contributor", severity: "mild", template: "커밋 1~2개짜리 기여자가 있네요. 발만 담근 사람들." },
  { id: "contributor", severity: "mild", template: "고스트 기여자들이 보여요. 한 번 커밋하고 사라진 영혼들." },
  { id: "contributor", severity: "medium", template: "기여자 중 커밋 1개만 있는 사람들. '여기 왔다 간다' 흔적만 남기셨네요." },
  { id: "contributor", severity: "medium", template: "유령 기여자들이 여럿 보여요. 한 번 나타나서 오타 고치고 사라진." },
  { id: "contributor", severity: "medium", template: "커밋 1개 기여자들. 'first contribution' 뱃지만 받으러 온 거죠?" },
  { id: "contributor", severity: "medium", template: "이 레포에 유령이 많아요. 커밋 하나만 남기고 떠난 영혼들." },
  { id: "contributor", severity: "savage", template: "고스트 기여자들의 무덤. 여기서 커밋 1개씩 남기고 다들 성불하셨어요." },
  { id: "contributor", severity: "savage", template: "커밋 1개 기여자들은 이 프로젝트를 체험판으로 즐긴 거예요. '아 별로네' 하고 떠난." },
  { id: "contributor", severity: "savage", template: "유령 기여자 수가 실제 기여자보다 많아요. 이 레포는 귀신의 집이에요." },
  { id: "contributor", severity: "savage", template: "1커밋 기여자들의 공통점: 들어와서 뭔가 고치고, '아 이 코드 뭐야' 하고 도망감." },
  { id: "contributor", severity: "legendary", template: "이 레포에는 고스트 기여자가 너무 많아서 공포 영화 배경으로 쓸 수 있어요. '커밋 1개의 저주'." },
  { id: "contributor", severity: "legendary", template: "기여자들이 한 번 커밋하고 도망간 이유: 이 코드를 보고 현실 도피한 거예요." },

  // ============================================================
  // 다인 프로젝트의 장점/단점
  // ============================================================
  { id: "contributor", severity: "mild", template: "기여자 {totalContributors}명! 다양한 시각이 들어간 프로젝트네요." },
  { id: "contributor", severity: "mild", template: "{totalContributors}명의 기여자가 만든 {total}커밋. 협업의 결과물!" },
  { id: "contributor", severity: "mild", template: "여러 명이 함께 만든 프로젝트. 코드 스타일이 다양하겠네요." },
  { id: "contributor", severity: "medium", template: "기여자 {totalContributors}명이면 코드 스타일이 {totalContributors}개겠네요." },
  { id: "contributor", severity: "medium", template: "{totalContributors}명이 기여하면 누가 뭘 했는지 추적이 어려워요." },
  { id: "contributor", severity: "medium", template: "다인 프로젝트의 현실: 머지 충돌 지옥. 기여자 {totalContributors}명이면..." },
  { id: "contributor", severity: "medium", template: "{totalContributors}명의 코딩 스타일이 섞인 코드. 퓨전 요리 같은 코드베이스." },
  { id: "contributor", severity: "savage", template: "기여자 {totalContributors}명. 요리사가 많으면 국이 쓰다더니, 코드가 쓰네요." },
  { id: "contributor", severity: "savage", template: "{totalContributors}명이 기여했는데 일관성이라곤 찾아볼 수 없어요." },
  { id: "contributor", severity: "savage", template: "기여자마다 코딩 스타일이 달라서 이 코드를 읽는 건 다국어 사전을 읽는 거예요." },
  { id: "contributor", severity: "legendary", template: "{totalContributors}명의 기여자가 만든 프랑켄슈타인 코드. 살아는 있는데 아름답진 않아요." },

  // ============================================================
  // 페어 프로그래밍 흔적
  // ============================================================
  { id: "contributor", severity: "mild", template: "페어 프로그래밍의 흔적이 보이네요. 둘이서 {total}커밋!" },
  { id: "contributor", severity: "mild", template: "기여자 2명이 비슷한 비율로 기여. 찰떡 궁합 페어!" },
  { id: "contributor", severity: "mild", template: "두 사람의 하모니. 코딩 듀엣이시네요." },
  { id: "contributor", severity: "medium", template: "페어 프로그래밍인데 한 사람이 드라이버만 하시는 건 아니죠?" },
  { id: "contributor", severity: "medium", template: "2명이 함께했지만 커밋 비율을 보면 한 사람이 더 열심히..." },
  { id: "contributor", severity: "medium", template: "페어 프로그래밍의 현실: 한 사람은 코딩, 한 사람은 유튜브." },
  { id: "contributor", severity: "savage", template: "페어 프로그래밍이라더니 한 사람은 {topContributorRatio}%, 한 사람은 나머지. 이건 관전이에요." },
  { id: "contributor", severity: "savage", template: "페어 프로그래밍인 줄 알았는데 한 사람만 타이핑한 흔적이 역력하네요." },
  { id: "contributor", severity: "savage", template: "듀오 프로젝트인데 {topContributor}님이 {topContributorRatio}%면 파트너는 네비게이터가 아니라 관광객이에요." },
  { id: "contributor", severity: "legendary", template: "이건 페어 프로그래밍이 아니라 '한 명이 코딩하고 한 명이 커피 타오기'에요." },

  // ============================================================
  // Co-authored-by 패턴
  // ============================================================
  { id: "contributor", severity: "mild", template: "Co-authored-by가 보이네요. 함께 만든 코드, 아름다워요." },
  { id: "contributor", severity: "mild", template: "공동 작성 커밋이 있네요. 협업의 모범 사례!" },
  { id: "contributor", severity: "medium", template: "Co-authored-by가 많은데 실제로 같이 코딩한 건 맞나요?" },
  { id: "contributor", severity: "medium", template: "공동 작성 표시가 있지만 기여도를 나누기 위한 꼼수는 아닌지..." },
  { id: "contributor", severity: "medium", template: "Co-authored-by로 이름 올리기. 교수님한테 팀 기여도 증명하려는 거죠?" },
  { id: "contributor", severity: "savage", template: "Co-authored-by 넣었다고 같이 한 게 되는 건 아니에요. 옆에서 지켜본 건 기여가 아닙니다." },
  { id: "contributor", severity: "savage", template: "공동 작성이라면서 코드는 한 사람 스타일이에요. Co-authored-by가 아니라 Co-watched-by." },
  { id: "contributor", severity: "savage", template: "Co-authored-by: 옆에서 의견 내주신 분. 실제 코드: {topContributor}님 작성." },
  { id: "contributor", severity: "legendary", template: "Co-authored-by의 진실: 한 명은 코딩, 한 명은 '야 여기 세미콜론 빠졌어' 이것만 한 거예요." },
  { id: "contributor", severity: "legendary", template: "모든 커밋에 Co-authored-by가 있네요. 화장실 갈 때도 같이 가시나요?" },

  // ============================================================
  // 추가 솔로 개발자 로스트 — 다양한 톤
  // ============================================================
  { id: "contributor", severity: "mild", template: "1인 개발이라 결정이 빠르시죠? 회의할 사람이 없으니까." },
  { id: "contributor", severity: "mild", template: "혼자서 {total}커밋. 고독한 코더의 길을 걷고 계시네요." },
  { id: "contributor", severity: "mild", template: "솔로 프로젝트의 매력: 누구한테도 설명 안 해도 되는 것." },
  { id: "contributor", severity: "mild", template: "1인 체제라 git branch가 필요 없으시겠네요. main에 바로 푸시!" },
  { id: "contributor", severity: "medium", template: "혼자 개발하면 테스트도 혼자, 디버깅도 혼자, 야근도 혼자." },
  { id: "contributor", severity: "medium", template: "1인 개발자의 슬픈 현실: Star 0개, Fork 0개, Issues 0개." },
  { id: "contributor", severity: "medium", template: "혼자라서 코드 리뷰가 없죠? 'LGTM'을 자기한테 보내시나요?" },
  { id: "contributor", severity: "savage", template: "솔로 개발자의 코드 리뷰: 거울 앞에서 '이거 맞나?'라고 묻기." },
  { id: "contributor", severity: "savage", template: "혼자 하는 프로젝트. 결국 자기 자신과의 싸움이에요. 이기고 계신가요?" },
  { id: "contributor", severity: "legendary", template: "1인 개발의 궁극기: 자기가 짠 코드를 3일 후에 못 알아보고 '누가 이렇게 짰어?' 하기." },

  // ============================================================
  // 한국 개발 문화 특화
  // ============================================================
  { id: "contributor", severity: "mild", template: "조별과제 팀 구성이시네요. {totalContributors}명 중 에이스: {topContributor}님." },
  { id: "contributor", severity: "mild", template: "기여자 {totalContributors}명. K-팀워크의 정석이시네요." },
  { id: "contributor", severity: "medium", template: "한국 조별과제의 전통: 한 사람이 다 하기. {topContributor}님 {topContributorRatio}%." },
  { id: "contributor", severity: "medium", template: "대학교 조별과제 PTSD 유발하는 기여 비율이네요." },
  { id: "contributor", severity: "medium", template: "{topContributor}님의 카톡: '야 너네 언제 해?' 팀원들의 카톡: '읽씹'." },
  { id: "contributor", severity: "medium", template: "기여자 {totalContributors}명. 발표는 누가 하시나요? {topContributor}님이요? 당연하죠." },
  { id: "contributor", severity: "savage", template: "교수님이 Git 로그 보시면 '이건 팀 프로젝트가 아닙니다'라고 하실 거예요." },
  { id: "contributor", severity: "savage", template: "조별과제 무임승차의 증거가 Git에 고스란히 남아있어요." },
  { id: "contributor", severity: "savage", template: "이 Git 로그를 교수님께 제출하면 {topContributor}님만 A+ 나머지 F." },
  { id: "contributor", severity: "savage", template: "한국 조별과제의 3법칙: 1) 한 명이 다 한다 2) 나머지는 이름만 올린다 3) 성적은 같이 받는다." },
  { id: "contributor", severity: "savage", template: "'팀 프로젝트'라는 말 대신 '{topContributor} + 부양가족'이라고 하는 게 정확해요." },
  { id: "contributor", severity: "legendary", template: "한국 IT 기업 현실: 10명의 팀인데 1명이 80% 하는 것. 여기서도 재현되었군요." },
  { id: "contributor", severity: "legendary", template: "이 기여 비율을 보면 한국 교육의 조별과제 시스템에 대한 회의가 듭니다." },

  // ============================================================
  // IT 기업/회사 비유
  // ============================================================
  { id: "contributor", severity: "mild", template: "{topContributor}님은 이 프로젝트의 CTO이자 주니어 개발자이자 인턴이에요." },
  { id: "contributor", severity: "medium", template: "이 팀의 로드밸런서가 고장났어요. 모든 트래픽이 {topContributor}님에게 가고 있어요." },
  { id: "contributor", severity: "medium", template: "기여 분포가 SPOF(Single Point of Failure)예요. {topContributor}님이 아프면 끝." },
  { id: "contributor", severity: "savage", template: "이 팀에서 {topContributor}님을 빼면 스타트업이 아니라 빈 사무실이에요." },
  { id: "contributor", severity: "savage", template: "기여 비율 보면 {topContributor}님 연봉이 나머지 합친 것보다 높아야 해요." },
  { id: "contributor", severity: "savage", template: "이 팀의 버스 팩터: 1. {topContributor}님이 버스에 치이면 회사도 같이." },
  { id: "contributor", severity: "legendary", template: "HR이 이 Git 로그 보면 나머지 팀원들 전원 해고감이에요." },
  { id: "contributor", severity: "legendary", template: "{topContributor}님의 기여도를 보면 이 분이 퇴사하면 프로젝트 사망 확정이에요." },

  // ============================================================
  // 동물/자연 비유
  // ============================================================
  { id: "contributor", severity: "mild", template: "{topContributor}님은 이 프로젝트의 여왕벌이에요. 나머지는 일벌들." },
  { id: "contributor", severity: "medium", template: "기여 패턴이 사자 무리 같아요. 한 마리가 사냥하고 나머지는 누워있는." },
  { id: "contributor", severity: "medium", template: "{topContributor}님은 개미 여왕. 나머지는... 일개미라고 하기엔 안 일해요." },
  { id: "contributor", severity: "savage", template: "이 팀은 기러기 떼가 아니라 펭귄 무리예요. {topContributor}님만 물에 뛰어들고 나머지는 구경." },
  { id: "contributor", severity: "savage", template: "기여 생태계: {topContributor}님(포식자) vs 나머지(먹이... 아 기여가 먹힘)." },
  { id: "contributor", severity: "legendary", template: "이 프로젝트는 {topContributor}라는 거대한 나무와 그 그늘 아래 기생하는 덩굴들로 이루어져 있습니다." },

  // ============================================================
  // 영화/드라마 비유
  // ============================================================
  { id: "contributor", severity: "mild", template: "{topContributor}님이 주연, 나머지는 조연. 이 프로젝트의 영화." },
  { id: "contributor", severity: "medium", template: "이 레포는 원맨쇼예요. {topContributor}님 제외하면 엑스트라만 남아요." },
  { id: "contributor", severity: "medium", template: "기여자 크레딧: 주연 {topContributor} / 까메오 출연 나머지 전원." },
  { id: "contributor", severity: "savage", template: "이건 어벤져스가 아니라 아이언맨 단독 영화예요. 나머지는 배경." },
  { id: "contributor", severity: "savage", template: "{topContributor}님이 스파이더맨이면 나머지는 '같은 동네 사는 사람들'이에요." },
  { id: "contributor", severity: "savage", template: "드라마로 치면 {topContributor}님이 주연, 나머지는 회상신에만 나오는 인물." },
  { id: "contributor", severity: "legendary", template: "이 프로젝트의 캐스팅: {topContributor}(전 캐릭터 1인 다역) / 나머지(단역, 대사 없음)." },

  // ============================================================
  // 게임 비유
  // ============================================================
  { id: "contributor", severity: "mild", template: "기여자 파티: {totalContributors}명. {topContributor}님이 탱커/딜러/힐러 올인원." },
  { id: "contributor", severity: "medium", template: "이 레포는 MMO가 아니라 싱글 플레이어 게임이에요." },
  { id: "contributor", severity: "medium", template: "{topContributor}님이 캐리하시는 중. 나머지는 버스 태워주기." },
  { id: "contributor", severity: "savage", template: "LOL로 치면 {topContributor}님이 1v9 하시는 거예요. 팀은 다 물먹고." },
  { id: "contributor", severity: "savage", template: "기여도 보면 {topContributor}님이 보스급인데 나머지는 잡몹이에요." },
  { id: "contributor", severity: "savage", template: "이 팀은 에이스 한 명과 트롤 {totalContributors}명으로 구성되어 있습니다." },
  { id: "contributor", severity: "legendary", template: "{topContributor}님이 다크소울을 솔로 클리어하는 동안 나머지는 캐릭터 생성 화면에 있었어요." },

  // ============================================================
  // 음식/요리 비유
  // ============================================================
  { id: "contributor", severity: "mild", template: "이 프로젝트의 셰프: {topContributor}님. 나머지: 시식 담당." },
  { id: "contributor", severity: "medium", template: "{topContributor}님이 요리하고 나머지는 그릇 들고 기다리는 중." },
  { id: "contributor", severity: "savage", template: "요리사가 {totalContributors}명인데 하나만 요리하고 나머지는 맛만 봐요. 그래도 '우리가 만든 요리'라고 해요." },
  { id: "contributor", severity: "savage", template: "{topContributor}님은 백종원, 나머지는 백종원 유튜브 보는 시청자." },
  { id: "contributor", severity: "legendary", template: "이 프로젝트의 레시피: {topContributor}님의 피와 땀과 코드 + 나머지의 '맛있겠다~'." },

  // ============================================================
  // 스포츠 비유
  // ============================================================
  { id: "contributor", severity: "mild", template: "{topContributor}님은 이 팀의 에이스 스트라이커. {topContributorRatio}% 골 기록." },
  { id: "contributor", severity: "medium", template: "축구로 치면 {topContributor}님이 전 포지션 뛰시는 거예요. 나머진 벤치." },
  { id: "contributor", severity: "medium", template: "야구 팀인데 {topContributor}님이 투수, 포수, 타자 다 하시네요." },
  { id: "contributor", severity: "savage", template: "이건 릴레이가 아니라 {topContributor}님의 개인전이에요. 팀원들은 바톤도 안 받아요." },
  { id: "contributor", severity: "savage", template: "농구로 치면 {topContributor}님이 르브론이고 나머지는 응원석이에요." },
  { id: "contributor", severity: "legendary", template: "이 팀은 마이클 조던({topContributor}) + 동네 아저씨들이에요. 점수는 다 조던이 넣어요." },

  // ============================================================
  // 역사/문화 비유
  // ============================================================
  { id: "contributor", severity: "mild", template: "{topContributor}님은 이 왕국의 왕이자 장군이자 농부입니다." },
  { id: "contributor", severity: "medium", template: "이 프로젝트의 권력 구조: {topContributor}(황제) > 나머지(평민)." },
  { id: "contributor", severity: "savage", template: "{topContributor}님의 1인 왕정. 기여자 {totalContributors}명은 신하지만 조공(커밋)은 안 바쳐요." },
  { id: "contributor", severity: "savage", template: "프로젝트의 역사: {topContributor}의 시대 (나머지는 역사에 기록되지 않음)." },
  { id: "contributor", severity: "legendary", template: "이건 민주주의 프로젝트가 아니라 {topContributor}님의 전제 군주제예요. 의회(팀원)는 해산됨." },

  // ============================================================
  // 질문형 로스트
  // ============================================================
  { id: "contributor", severity: "mild", template: "기여자 {totalContributors}명인데 왜 한 사람이 대부분인가요?" },
  { id: "contributor", severity: "mild", template: "다른 기여자들은 요즘 뭐 하나요? 안 보이던데." },
  { id: "contributor", severity: "medium", template: "{topContributor}님, 팀원들한테 일 좀 시키시는 건 어떤가요?" },
  { id: "contributor", severity: "medium", template: "나머지 기여자들은 살아있나요? 마지막 커밋이 언제예요?" },
  { id: "contributor", severity: "medium", template: "팀 {totalContributors}명인데 왜 {topContributor}님만 코딩하시나요?" },
  { id: "contributor", severity: "savage", template: "혹시 나머지 팀원들은 존재하기는 하나요? 유령 계정은 아니죠?" },
  { id: "contributor", severity: "savage", template: "{topContributor}님이 {topContributorRatio}% 하시는데 연봉 협상 안 하셨나요?" },
  { id: "contributor", severity: "savage", template: "이 기여 비율로 팀 프로젝트라고 할 수 있나요? 진심으로 묻습니다." },
  { id: "contributor", severity: "legendary", template: "나머지 기여자들에게 묻고 싶어요: 양심은 있나요?" },

  // ============================================================
  // 충고형 로스트
  // ============================================================
  { id: "contributor", severity: "mild", template: "기여 비율을 좀 더 균등하게 분배하면 좋겠어요." },
  { id: "contributor", severity: "mild", template: "다른 기여자들도 참여하면 프로젝트가 더 좋아질 거예요." },
  { id: "contributor", severity: "medium", template: "CODEOWNERS 파일 만들어서 리뷰 강제하세요. 팀원들이 움직일 수도 있어요." },
  { id: "contributor", severity: "medium", template: "페어 프로그래밍 도입을 추천합니다. 혼자 하시면 성장이 제한적이에요." },
  { id: "contributor", severity: "savage", template: "팀원 교체를 고려해보세요. 이 기여 비율은 팀이 아니에요." },
  { id: "contributor", severity: "savage", template: "솔직히 혼자 하시는 게 나을 수도 있어요. 어차피 혼자 다 하시잖아요." },
  { id: "contributor", severity: "legendary", template: "조언: 팀을 해체하고 솔로로 가세요. 이미 솔로나 마찬가지니까 행정만 정리하시면 됩니다." },

  // ============================================================
  // 감정적 호소 스타일
  // ============================================================
  { id: "contributor", severity: "mild", template: "{topContributor}님의 헌신이 느껴집니다. 나머지 분들도 좀..." },
  { id: "contributor", severity: "medium", template: "{topContributor}님이 이 프로젝트를 사랑하는 만큼 팀원들도 사랑해주면 좋겠어요." },
  { id: "contributor", severity: "medium", template: "혼자 코딩하는 밤이 외롭지 않으세요? 팀원들은 자고 있는데." },
  { id: "contributor", severity: "savage", template: "{topContributor}님의 등에 업혀 사는 기여자들. 양심이 있으면 커밋 좀 하세요." },
  { id: "contributor", severity: "savage", template: "이 기여 비율을 보면 {topContributor}님이 불쌍해요. 진심으로." },
  { id: "contributor", severity: "legendary", template: "{topContributor}님, 이 프로젝트에서 가장 슬픈 사람은 당신이에요. 혼자 다 하고 있으니까." },

  // ============================================================
  // 역설적 칭찬 (backhanded compliments)
  // ============================================================
  { id: "contributor", severity: "mild", template: "솔로 비율 {soloRatio}%지만 그만큼 코드 일관성은 좋겠네요!" },
  { id: "contributor", severity: "medium", template: "기여자가 적으면 버그도 적겠네요. 아무도 안 고치니까 새 버그도 안 생기고." },
  { id: "contributor", severity: "medium", template: "혼자 다 하시니까 최소한 'blame'할 때 편하시겠어요. 다 본인이니까." },
  { id: "contributor", severity: "savage", template: "기여자가 1명이라 merge conflict가 없겠네요. 축하드려야 하나... 아니네요." },
  { id: "contributor", severity: "savage", template: "솔로라서 코드 리뷰 시간 절약! 리뷰할 사람이 없어서!" },
  { id: "contributor", severity: "legendary", template: "한 사람이 100% 하면 적어도 비전은 일관적이겠네요. 비전이 있다면요." },

  // ============================================================
  // 짧고 임팩트 있는 한 줄
  // ============================================================
  { id: "contributor", severity: "mild", template: "기여자: {totalContributors}명. 괜찮아요." },
  { id: "contributor", severity: "mild", template: "혼자 잘하고 계세요." },
  { id: "contributor", severity: "mild", template: "솔로지만 멋져요." },
  { id: "contributor", severity: "medium", template: "팀? 무슨 팀이요?" },
  { id: "contributor", severity: "medium", template: "기여 불균형 심각." },
  { id: "contributor", severity: "medium", template: "{topContributor}님만의 쇼." },
  { id: "contributor", severity: "savage", template: "팀워크: 0점." },
  { id: "contributor", severity: "savage", template: "무임승차 감지됨." },
  { id: "contributor", severity: "savage", template: "이건 팀이 아니에요." },
  { id: "contributor", severity: "legendary", template: "혼자입니다. 완전히." },
  { id: "contributor", severity: "legendary", template: "말이 필요 없는 기여도." },
  { id: "contributor", severity: "legendary", template: "레전드급 솔로." },

  // ============================================================
  // 긴 서사형 로스트
  // ============================================================
  { id: "contributor", severity: "medium", template: "옛날 옛적에 {totalContributors}명의 개발자가 있었습니다. 그 중 {topContributor}님만 코딩을 했고, 나머지는 '좋아요'를 눌렀습니다. 끝." },
  { id: "contributor", severity: "savage", template: "이 프로젝트의 역사: Chapter 1: {topContributor}가 코드를 짬. Chapter 2: 팀원들이 구경함. Chapter 3: {topContributor}가 또 짬. The End." },
  { id: "contributor", severity: "savage", template: "팀 프로젝트 일지 — Day 1: '다 같이 열심히 하자!' Day 7: '나만 하고 있는데?' Day 30: '{topContributor}님 혼자 {topContributorRatio}%'." },
  { id: "contributor", severity: "legendary", template: "학기 초: '이번엔 공평하게 분배하자!' → 중간: '야 너네 언제 해?' → 기말: '{topContributor} {topContributorRatio}%, 나머지 전부 합쳐서 나머지%'. 한국 대학 조별과제 국룰." },
  { id: "contributor", severity: "legendary", template: "이 레포의 기여자 이야기: {topContributor}는 매일 밤 코딩했다. 나머지는 매일 밤 잠을 잤다. 결과: {topContributorRatio}% vs 나머지. 교훈: 없음. 세상은 불공평하다." },

  // ============================================================
  // 비교형 로스트
  // ============================================================
  { id: "contributor", severity: "mild", template: "Linux 커널은 기여자가 수천 명인데 여기는 {totalContributors}명이네요." },
  { id: "contributor", severity: "medium", template: "{topContributorRatio}% 기여율이면 오픈소스 메인테이너 수준이에요. 근데 팀 프로젝트라며요?" },
  { id: "contributor", severity: "savage", template: "리누스 토르발즈도 혼자 다 안 해요. 근데 당신은 혼자 {topContributorRatio}%." },
  { id: "contributor", severity: "savage", template: "다른 팀 프로젝트는 기여가 분산되는데 여긴 {topContributor}님에게 집중. 중앙 집중형 시스템." },
  { id: "contributor", severity: "legendary", template: "마이크로소프트의 VS Code는 수천 명이 기여하는데 이 레포는 실질적으로 1명. 규모의 차이? 아뇨, 팀워크의 차이." },

  // ============================================================
  // 수학/과학 비유
  // ============================================================
  { id: "contributor", severity: "mild", template: "기여 분포의 표준편차가 너무 큽니다. {topContributor}님이 이상치." },
  { id: "contributor", severity: "medium", template: "기여도의 지니 계수가 0.9에 가깝네요. 코딩계의 불평등." },
  { id: "contributor", severity: "medium", template: "파레토 법칙: 20%의 기여자가 80% 기여. 여기는 그것도 안 돼요. 한 명이 {topContributorRatio}%." },
  { id: "contributor", severity: "savage", template: "기여 분포가 지수함수 같아요. {topContributor}님만 급상승, 나머지는 0에 수렴." },
  { id: "contributor", severity: "savage", template: "기여 히스토그램: {topContributor}님 ████████████ | 나머지 전부 ▏" },
  { id: "contributor", severity: "legendary", template: "기여 분포를 정규 분포로 만들려면 {topContributor}님의 커밋을 80% 삭제해야 해요." },

  // ============================================================
  // SNS/인터넷 문화 비유
  // ============================================================
  { id: "contributor", severity: "mild", template: "{topContributor}님의 인스타: 코딩 사진. 나머지의 인스타: 놀러간 사진." },
  { id: "contributor", severity: "medium", template: "이 팀의 슬랙: {topContributor}님 - '커밋했어요'. 나머지 - '👍'. 매일 반복." },
  { id: "contributor", severity: "medium", template: "팀 카톡방에서 {topContributor}님만 코드 얘기하고 나머지는 '읽씹'하죠?" },
  { id: "contributor", severity: "savage", template: "이 팀의 GitHub 활동: {topContributor}님 - 매일 커밋. 나머지 - 연 1회 프로필 방문." },
  { id: "contributor", severity: "savage", template: "나머지 기여자들의 GitHub 활동 = '좋아요'만 누르는 인스타 유령 팔로워." },
  { id: "contributor", severity: "legendary", template: "이 레포의 기여자들은 트위터의 '유령 팔로워'와 같은 존재입니다. 숫자만 채워주는." },

  // ============================================================
  // 가상 대화형
  // ============================================================
  { id: "contributor", severity: "medium", template: "{topContributor}: '이번 스프린트 할당량 확인하세요.' 팀원A: (퇴장). 팀원B: (읽씹)." },
  { id: "contributor", severity: "medium", template: "PM: '기여 비율이 좀 편중됐네요.' {topContributor}: '네, 제가 다 했으니까요.'" },
  { id: "contributor", severity: "savage", template: "면접관: '팀 프로젝트 경험 말씀해주세요.' 나머지 팀원: '네, {topContributor}님이 다 해줬어요.' 면접관: '...'" },
  { id: "contributor", severity: "savage", template: "Git blame 결과: {topContributor} {topContributor} {topContributor}... 어 이 줄만 다르네? 아 이것도 {topContributor}." },
  { id: "contributor", severity: "legendary", template: "신입 개발자: '이 코드 누가 짰어요?' 선배: '{topContributor}님이요.' 신입: '이것도요?' 선배: '네.' 신입: '이것도?' 선배: '...전부 다요.'" },

  // ============================================================
  // 한국어 속담/격언 패러디
  // ============================================================
  { id: "contributor", severity: "mild", template: "'백지장도 맞들면 낫다' — 근데 {topContributor}님 혼자 들고 계시네요." },
  { id: "contributor", severity: "medium", template: "'뭉치면 살고 흩어지면 죽는다' — 근데 뭉쳐도 한 명만 살아요." },
  { id: "contributor", severity: "medium", template: "'함께하면 행복이 두 배' — 기여도는 절반도 안 나뉘었지만." },
  { id: "contributor", severity: "savage", template: "'열 번 찍어 안 넘어가는 나무 없다' — 팀원들은 한 번도 안 찍었어요." },
  { id: "contributor", severity: "savage", template: "'사공이 많으면 배가 산으로 간다' — 여기는 사공이 1명이라 배가 어디로 가든 상관없어요." },
  { id: "contributor", severity: "savage", template: "'개같이 벌어서 정승같이 쓴다' — {topContributor}님이 개같이 코딩해서 팀이 정승같이 성적 받아요." },
  { id: "contributor", severity: "legendary", template: "'우물 안 개구리' — 이 레포의 기여자들은 우물에 {topContributor}님만 넣고 위에서 구경하는 중." },
  { id: "contributor", severity: "legendary", template: "'하늘은 스스로 돕는 자를 돕는다' — {topContributor}님만 돕고 나머지는 안 도와요." },

  // ============================================================
  // 추가 다양한 표현 — mild 대량
  // ============================================================
  { id: "contributor", severity: "mild", template: "기여자 패턴이 흥미롭네요. {topContributor}님 중심이지만." },
  { id: "contributor", severity: "mild", template: "{totalContributors}명이 모였다는 건 이 프로젝트에 가치가 있다는 뜻이에요." },
  { id: "contributor", severity: "mild", template: "솔로 비율 {soloRatio}%. 독립적인 개발 스타일이시군요." },
  { id: "contributor", severity: "mild", template: "기여자 수는 적지만 커밋의 질이 좋을 수도 있어요." },
  { id: "contributor", severity: "mild", template: "{topContributor}님이 프로젝트를 이끌고 계시네요. 리더십!" },
  { id: "contributor", severity: "mild", template: "소수 정예 기여자 {totalContributors}명. 양보다 질이죠." },
  { id: "contributor", severity: "mild", template: "기여자가 많지 않아도 좋은 프로젝트는 만들 수 있어요." },
  { id: "contributor", severity: "mild", template: "{totalContributors}명의 기여자. 각자의 역할이 있겠죠." },
  { id: "contributor", severity: "mild", template: "혼자 하든 팀이 하든 결과물이 중요한 거니까요." },
  { id: "contributor", severity: "mild", template: "기여자 {totalContributors}명. 시작은 이 정도면 충분해요." },
  { id: "contributor", severity: "mild", template: "솔로 개발이라도 의미 있는 프로젝트면 됐어요." },
  { id: "contributor", severity: "mild", template: "{topContributor}님의 열정이 프로젝트를 살리고 있어요." },
  { id: "contributor", severity: "mild", template: "기여자가 적어도 활발하면 괜찮아요. 활발한 거 맞죠?" },
  { id: "contributor", severity: "mild", template: "{total}개 커밋을 {totalContributors}명이서. 나쁘지 않아요." },
  { id: "contributor", severity: "mild", template: "프로젝트 기여자 수가 중요한 게 아니라 코드의 질이 중요해요." },
  { id: "contributor", severity: "mild", template: "1인 프로젝트의 장점도 있어요. 의사소통 비용이 0이니까." },
  { id: "contributor", severity: "mild", template: "기여자 {totalContributors}명, 커밋 {total}개. 깔끔한 프로젝트." },
  { id: "contributor", severity: "mild", template: "{topContributor}님이 중심이 되어 프로젝트를 이끄시는군요." },
  { id: "contributor", severity: "mild", template: "소규모 기여자 그룹이지만 응집력이 있어 보여요." },
  { id: "contributor", severity: "mild", template: "기여자가 {totalContributors}명이면 관리하기 편하겠네요." },

  // ============================================================
  // 추가 다양한 표현 — medium 대량
  // ============================================================
  { id: "contributor", severity: "medium", template: "기여 분포를 보면 뭔가 찜찜해요. {topContributor}님 {topContributorRatio}%." },
  { id: "contributor", severity: "medium", template: "{totalContributors}명이 참여했다는데 증거가 부족해요." },
  { id: "contributor", severity: "medium", template: "기여자 목록은 화려한데 실제 기여는 {topContributor}님만." },
  { id: "contributor", severity: "medium", template: "팀 커밋의 {topContributorRatio}%가 한 사람이면 밸런스 패치가 필요해요." },
  { id: "contributor", severity: "medium", template: "기여자 {totalContributors}명인데 활성 기여자는 몇 명인지 궁금하네요." },
  { id: "contributor", severity: "medium", template: "{topContributor}님 빼면 이 프로젝트의 깃 히스토리가 텅 비겠네요." },
  { id: "contributor", severity: "medium", template: "기여 편중도가 높습니다. {topContributorRatio}%는 좀 과해요." },
  { id: "contributor", severity: "medium", template: "팀 프로젝트의 이상과 현실의 격차가 {topContributorRatio}%만큼 벌어져 있어요." },
  { id: "contributor", severity: "medium", template: "기여자가 {totalContributors}명이면 충분한데 분배가 문제예요." },
  { id: "contributor", severity: "medium", template: "{topContributor}님이 메인 기여자시네요. 서브 기여자들은 잠수 중?" },
  { id: "contributor", severity: "medium", template: "기여 비율을 파이 차트로 그리면 {topContributor}님이 팩맨이에요." },
  { id: "contributor", severity: "medium", template: "{total}개 커밋의 {topContributorRatio}%가 한 사람이면 편향적이에요." },
  { id: "contributor", severity: "medium", template: "기여자 다양성이 부족합니다. {topContributor}님 독주 체제." },
  { id: "contributor", severity: "medium", template: "팀에 {totalContributors}명이 있지만 깃 로그는 1인 프로젝트 같아요." },
  { id: "contributor", severity: "medium", template: "{topContributor}님의 커밋과 나머지의 커밋을 비교하면 중량급 vs 플라이급이에요." },
  { id: "contributor", severity: "medium", template: "기여 불균형 레포트: 상위 1명이 {topContributorRatio}%. 조치 필요." },
  { id: "contributor", severity: "medium", template: "프로젝트 건강 체크: 기여 분산도 — 낮음. {topContributor}님 의존도 — 높음." },
  { id: "contributor", severity: "medium", template: "{totalContributors}명의 기여자 중 절반은 커밋 1개 이하. 유령 기여자들." },
  { id: "contributor", severity: "medium", template: "기여자가 많은 것 같지만 실질적으로는 {topContributor}님의 원맨쇼." },
  { id: "contributor", severity: "medium", template: "이 프로젝트의 SPOF: {topContributor}님. 백업 계획 세우세요." },

  // ============================================================
  // 추가 다양한 표현 — savage 대량
  // ============================================================
  { id: "contributor", severity: "savage", template: "기여자 {totalContributors}명이라고 하지만 실질 인원: 1.5명." },
  { id: "contributor", severity: "savage", template: "{topContributor}님의 기여도 {topContributorRatio}%. 나머지는 숫자 채우기용." },
  { id: "contributor", severity: "savage", template: "이 레포의 Contributors 탭은 픽션이에요. 논픽션은 {topContributor}님 한 명." },
  { id: "contributor", severity: "savage", template: "기여 비율이 이러면 나머지 팀원들의 존재 이유가 뭔가요?" },
  { id: "contributor", severity: "savage", template: "{topContributor}님 외의 기여자들은 프로젝트의 영양제 같아요. 없어도 살아요." },
  { id: "contributor", severity: "savage", template: "팀 크기: {totalContributors}명. 실제 작업 인원: 1명. 효율: 마이너스." },
  { id: "contributor", severity: "savage", template: "기여자 목록에 이름이 있다고 기여한 건 아니에요. 카페에서 와이파이 쓴 것처럼." },
  { id: "contributor", severity: "savage", template: "나머지 기여자들의 커밋 합계가 {topContributor}님의 월요일 커밋보다 적어요." },
  { id: "contributor", severity: "savage", template: "이 팀의 기여 구조: 피라미드. 꼭대기에 {topContributor}님, 아래에 아무도 없음." },
  { id: "contributor", severity: "savage", template: "{topContributorRatio}% 기여한 {topContributor}님. 이건 기여가 아니라 혈액 공급이에요. 끊기면 죽어요." },
  { id: "contributor", severity: "savage", template: "기여자 수 {totalContributors}명은 통계적 착시예요. 유효 표본: 1." },
  { id: "contributor", severity: "savage", template: "이 프로젝트에서 {topContributor}님을 빼면? README.md와 .gitignore만 남아요." },
  { id: "contributor", severity: "savage", template: "기여 불균형이 사회 문제 수준이에요. 코딩계 양극화." },
  { id: "contributor", severity: "savage", template: "나머지 기여자들의 GitHub 활동: 이 레포에 별 하나 남기기(그것도 안 함)." },
  { id: "contributor", severity: "savage", template: "{totalContributors}명이서 {total}커밋이면 1인당 평균이 슬퍼요. {topContributor}님 빼면 더 슬퍼요." },
  { id: "contributor", severity: "savage", template: "이 레포의 git log --oneline | sort | uniq -c: {topContributor} 999999, others 3." },
  { id: "contributor", severity: "savage", template: "기여자들의 커밋 메시지 분석: {topContributor}님 - 의미있는 기능 추가. 나머지 - 'fix typo', 'Update README.md'." },
  { id: "contributor", severity: "savage", template: "{topContributor}님은 프로젝트의 심장이고 나머지는... 맹장? 없어도 살아요." },
  { id: "contributor", severity: "savage", template: "이 팀의 회고: {topContributor} '다음엔 분배 좀...' 팀원들 '네~(무시)'. 다음 스프린트: 반복." },
  { id: "contributor", severity: "savage", template: "기여 그래프의 Y축을 로그 스케일로 바꿔야 나머지 기여자들이 보여요." },

  // ============================================================
  // 추가 다양한 표현 — legendary 대량
  // ============================================================
  { id: "contributor", severity: "legendary", template: "기여자 {totalContributors}명 중 의미있는 기여: 1명. 이건 팀이 아니라 공연이에요. {topContributor}님의 독주회." },
  { id: "contributor", severity: "legendary", template: "이 레포를 영화로 만들면: '{topContributor}: 혼자 싸우다' — 어드벤처/비극 장르." },
  { id: "contributor", severity: "legendary", template: "기여 비율 최종 판결: {topContributor}님 {topContributorRatio}%. 이건 기여가 아니라 독식이에요. 코딩계의 재벌." },
  { id: "contributor", severity: "legendary", template: "이 프로젝트의 신화: 태초에 {topContributor}가 있었고, 코드를 창조했다. 다른 기여자들은 7일째에도 쉬고 있었다." },
  { id: "contributor", severity: "legendary", template: "기여자 통계가 북한 선거 결과 같아요. {topContributor}님 {topContributorRatio}% 득표!" },
  { id: "contributor", severity: "legendary", template: "이 레포의 기여자를 자연 다큐에 비유하면: {topContributor}(지구를 떠받치는 거인) vs 나머지(먼지)." },
  { id: "contributor", severity: "legendary", template: "미래의 고고학자가 이 레포를 발견하면 '이건 1인 문명이었다'고 기록할 거예요." },
  { id: "contributor", severity: "legendary", template: "기여 분포도를 UN 인권이사회에 보내야 할 수준. {topContributor}님에 대한 노동 착취." },
  { id: "contributor", severity: "legendary", template: "GitHub Wrapped가 있다면: '{topContributor}님, 올해 이 레포의 {topContributorRatio}%를 기여하셨습니다. 다른 기여자들은... 아무것도 안 했습니다.'" },
  { id: "contributor", severity: "legendary", template: "이 기여 비율로 회사 다니면 연봉: {topContributor}님 10억, 나머지 합쳐서 100만원이 맞아요." },
  { id: "contributor", severity: "legendary", template: "결론: 이건 오픈소스가 아니라 {topContributor}소스예요. 기여자는 1명이고 나머지는 관광객입니다." },
  { id: "contributor", severity: "legendary", template: "최종 보고: 기여자 {totalContributors}명, 실질 기여자 1명, 커밋 {total}개 중 {topContributorRatio}%가 {topContributor}님. 팀 해체 권고." },

  // ============================================================
  // 추가 벌크 — 무임승차 테마
  // ============================================================
  { id: "contributor", severity: "medium", template: "무임승차 의심 기여자가 {totalContributors}명 중 여럿 보여요." },
  { id: "contributor", severity: "medium", template: "팀 프로젝트 무임승차 방지법이 필요해요. 이 레포에는 특히." },
  { id: "contributor", severity: "savage", template: "무임승차 올림픽이 있다면 이 팀이 금메달이에요." },
  { id: "contributor", severity: "savage", template: "이 팀의 기여 분석: 무임승차 비율 {topContributorRatio}%... 아 이건 {topContributor}님 비율이었네요. 무임승차는 나머지." },
  { id: "contributor", severity: "savage", template: "지하철 무임승차는 벌금이 나오는데, 코드 무임승차는 학점이 나오네요." },
  { id: "contributor", severity: "legendary", template: "무임승차의 끝판왕을 봤습니다. {topContributor}님만 달리는 버스에 나머지가 타고 있어요." },

  // ============================================================
  // 추가 벌크 — 리더십/매니지먼트 테마
  // ============================================================
  { id: "contributor", severity: "mild", template: "{topContributor}님의 리더십 아래 프로젝트가 진행 중이네요." },
  { id: "contributor", severity: "medium", template: "리더가 너무 많이 하면 팀원들이 안 해요. 위임하세요." },
  { id: "contributor", severity: "medium", template: "매니저의 실패: 업무 분배를 안 하면 이렇게 됩니다." },
  { id: "contributor", severity: "savage", template: "리더십이 아니라 독재예요. {topContributor}님이 다 하시면 팀원 왜 뽑았나요?" },
  { id: "contributor", severity: "savage", template: "이 프로젝트의 매니지먼트 점수: F. 기여 분배: F. {topContributor}님 고생 점수: A+." },
  { id: "contributor", severity: "legendary", template: "Agile이라면서 스프린트 플래닝을 안 하시죠? 어차피 {topContributor}님이 다 할 건데." },

  // ============================================================
  // 추가 벌크 — 오픈소스 문화 테마
  // ============================================================
  { id: "contributor", severity: "mild", template: "오픈소스인데 기여자가 {totalContributors}명이면 아직 성장 중이에요." },
  { id: "contributor", severity: "mild", template: "CONTRIBUTING.md를 작성하시면 기여자가 늘 수도 있어요." },
  { id: "contributor", severity: "medium", template: "오픈소스라면서 기여 가이드가 없으시죠? 그래서 아무도 안 온 거예요." },
  { id: "contributor", severity: "medium", template: "Issues 탭이 비어있으면 기여할 거리가 없으니 사람이 안 와요." },
  { id: "contributor", severity: "savage", template: "오픈소스인데 기여자가 본인뿐이면 'Open'만 맞고 'Source'는 혼자예요." },
  { id: "contributor", severity: "savage", template: "GitHub에 공개했다고 오픈소스가 아니에요. 기여자가 있어야 오픈소스죠." },
  { id: "contributor", severity: "legendary", template: "이 레포의 Contributors 그래프: ═══════════════════ ({topContributor}) ... (나머지는 점)" },

  // ============================================================
  // 추가 벌크 — 직업/커리어 테마
  // ============================================================
  { id: "contributor", severity: "mild", template: "이력서에 '팀 프로젝트'라고 쓸 수 있어요. 기술적으로는." },
  { id: "contributor", severity: "medium", template: "면접에서 '팀 프로젝트 기여도'를 물으면 {topContributor}님만 당당할 거예요." },
  { id: "contributor", severity: "medium", template: "이 기여 비율로 포트폴리오 발표하면 질문이 많을 거예요." },
  { id: "contributor", severity: "savage", template: "면접관이 Git 로그 보면 누가 일했는지 3초 만에 알아요." },
  { id: "contributor", severity: "savage", template: "{topContributor}님만 채용할 가치가 있는 팀이네요." },
  { id: "contributor", severity: "savage", template: "이 팀의 나머지 기여자들이 이력서에 이 프로젝트를 쓰면 경력 사칭이에요." },
  { id: "contributor", severity: "legendary", template: "취업 면접에서 이 Git 로그를 보여주면: {topContributor}님 → 합격. 나머지 → '다른 프로젝트도 있으시죠?'" },

  // ============================================================
  // 추가 벌크 — 통계/데이터 강조
  // ============================================================
  { id: "contributor", severity: "mild", template: "기여 통계: {totalContributors}명 참여, {total}커밋, 상위 기여자 {topContributor}님 {topContributorRatio}%." },
  { id: "contributor", severity: "medium", template: "DATA: Contributors={totalContributors}, TopContributor={topContributor}({topContributorRatio}%), TotalCommits={total}. 불균형 감지." },
  { id: "contributor", severity: "savage", template: "기여 리포트: {topContributor}={topContributorRatio}%, Others=나머지. 진단: 심각한 의존성." },
  { id: "contributor", severity: "legendary", template: "최종 기여 분석: {totalContributors}명 / {total}커밋 / Top1={topContributor}({topContributorRatio}%). 결론: 이건 팀이 아닙니다." },

  // ============================================================
  // 추가 벌크 — 심리/성격 분석 스타일
  // ============================================================
  { id: "contributor", severity: "mild", template: "{topContributor}님은 ISTJ 타입이시겠네요. 혼자 묵묵히 하시는." },
  { id: "contributor", severity: "medium", template: "기여 패턴으로 성격 분석: {topContributor}님 - 책임감 강한 장녀/장남 타입." },
  { id: "contributor", severity: "medium", template: "나머지 기여자들의 성격 분석: 눈치 보면서 안 하는 타입." },
  { id: "contributor", severity: "savage", template: "{topContributor}님은 '아 내가 해야 되는구나' 타입. 나머지는 '아 걔가 해주겠지' 타입." },
  { id: "contributor", severity: "savage", template: "MBTI로 분석하면 {topContributor}님은 J(계획적), 나머지는 P(즉흥적... 으로 안 하기)." },
  { id: "contributor", severity: "legendary", template: "이 팀의 심리 분석: {topContributor}(분노의 코딩), 나머지(무관심의 읽씹). 집단 역학의 비극." },

  // ============================================================
  // 추가 벌크 — 결혼/연애 비유
  // ============================================================
  { id: "contributor", severity: "mild", template: "{topContributor}님과 코드의 관계: 열렬한 사랑. 나머지와 코드의 관계: 소개팅 1번." },
  { id: "contributor", severity: "medium", template: "이 프로젝트와의 관계: {topContributor}님은 결혼, 나머지는 아직 썸." },
  { id: "contributor", severity: "savage", template: "{topContributor}님은 이 프로젝트와 사실혼 관계. 나머지는 이미 이혼 서류 제출." },
  { id: "contributor", severity: "savage", template: "기여자들의 프로젝트 충성도: {topContributor}님(영원히 함께), 나머지(바람 핌)." },
  { id: "contributor", severity: "legendary", template: "이건 팀 프로젝트가 아니라 {topContributor}님의 편애 프로젝트에 나머지가 이름만 올린 서류상 관계예요." },

  // ============================================================
  // 추가 벌크 — 경제/금융 비유
  // ============================================================
  { id: "contributor", severity: "mild", template: "기여 자본: {topContributor}님 {topContributorRatio}% 지분. 과반수 주주시군요." },
  { id: "contributor", severity: "medium", template: "이 레포의 경제 구조: {topContributor}님 = GDP의 {topContributorRatio}%. 나머지 = 미경활인구." },
  { id: "contributor", severity: "medium", template: "기여 시장의 독과점: {topContributor}님이 {topContributorRatio}%. 공정위 신고감." },
  { id: "contributor", severity: "savage", template: "기여 주가: {topContributor}님 급등, 나머지 상장폐지." },
  { id: "contributor", severity: "savage", template: "이 팀의 경제: {topContributor}님이 99% 생산, 나머지가 99% 소비. 사회주의의 실패." },
  { id: "contributor", severity: "legendary", template: "기여 경제 보고서: {topContributor}님은 삼성, 나머지는 동네 구멍가게. GDP 차이가 이 정도면 국가가 분리됩니다." },

  // ============================================================
  // 추가 마무리 벌크 — 1000 도달
  // ============================================================
  { id: "contributor", severity: "mild", template: "기여자 {totalContributors}명이 함께한 여정. 길고도 짧은." },
  { id: "contributor", severity: "mild", template: "{topContributor}님의 노력에 박수를. 나머지의 노력에는... 음." },
  { id: "contributor", severity: "mild", template: "프로젝트의 핵심은 사람이에요. 여기는 핵심이 {topContributor}님." },
  { id: "contributor", severity: "mild", template: "{total}개 커밋의 이야기. 주인공: {topContributor}." },
  { id: "contributor", severity: "mild", template: "기여자가 적어도 사랑이 있으면 되죠. {topContributor}님의 사랑." },
  { id: "contributor", severity: "medium", template: "기여 분석 결론: 재분배 필요. {topContributor}님 과로 위험." },
  { id: "contributor", severity: "medium", template: "다음 스프린트에는 기여 비율을 좀 맞춰주세요." },
  { id: "contributor", severity: "medium", template: "팀 건강 지표: 기여 분산도 낮음. 개선 필요." },
  { id: "contributor", severity: "medium", template: "{totalContributors}명의 기여자가 있지만 힘은 {topContributor}님에게 집중." },
  { id: "contributor", severity: "medium", template: "기여자 다양성 점수: 낮음. {topContributor}님 의존도: 높음." },
  { id: "contributor", severity: "savage", template: "이 프로젝트의 기여 지도: {topContributor}님 = 대륙. 나머지 = 점." },
  { id: "contributor", severity: "savage", template: "기여 보고서 요약: 불공평, 편향적, 한쪽에 치우침. 즉, 한국 조별과제." },
  { id: "contributor", severity: "savage", template: "기여자 통계가 선거 결과처럼 편향적이에요. 99% 독점." },
  { id: "contributor", severity: "savage", template: "팀 기여 분석 결과: 위험. {topContributor}님 탈퇴 시 프로젝트 소멸 확률 99%." },
  { id: "contributor", severity: "savage", template: "이 레포를 인수하려면 {topContributor}님만 영입하면 끝. 나머지는 필요 없음." },
  { id: "contributor", severity: "legendary", template: "기여 비율 최종 진단: {topContributor}님 {topContributorRatio}%, 나머지 합계 나머지%. 이건 프로젝트가 아니라 {topContributor}님의 작품이에요." },
  { id: "contributor", severity: "legendary", template: "마지막 한 마디: 기여자 {totalContributors}명이라고 했지만 실체는 1명. 이 숫자의 괴리가 이 프로젝트의 비극입니다." },
  { id: "contributor", severity: "legendary", template: "축하합니다. 기여자 {totalContributors}명, 커밋 {total}개, {topContributor}님 {topContributorRatio}%로 '최악의 팀 분배' 명예의 전당에 입성하셨습니다." },
  { id: "contributor", severity: "legendary", template: "이 레포의 부검 보고서: 사인 - 기여 불균형. 주범 - 나머지 기여자들의 무관심. 유일한 생존자 - {topContributor}님." },
  { id: "contributor", severity: "legendary", template: "최종 결론: {totalContributors}명이 모여서 만든 결과 = {topContributor}님이 혼자 만든 결과. 나머지의 기여 = 정신적 지지(그것도 의심됨)." },

  // ============================================================
  // 기여자별 커밋 수 로스트
  // ============================================================
  { id: "contributor", severity: "mild", template: "총 {total}커밋 중 {topContributor}님이 대부분. 꾸준히 하셨네요." },
  { id: "contributor", severity: "medium", template: "{total}커밋이면 적지 않은데, 대부분 한 사람이라는 게 문제." },
  { id: "contributor", severity: "savage", template: "{total}커밋인데 기여자가 {totalContributors}명이면 1인당 평균이 슬퍼요." },
  { id: "contributor", severity: "legendary", template: "{total}커밋 / {totalContributors}명 = 인당 {total}/{totalContributors}커밋인데 {topContributor}님 빼면 인당 1-2개. 통계의 함정." },

  // ============================================================
  // 특수 상황 — 기여자가 정확히 2명
  // ============================================================
  { id: "contributor", severity: "mild", template: "듀오 프로젝트! {totalContributors}명이서 함께하시는군요." },
  { id: "contributor", severity: "mild", template: "2인 체제. 서로 코드 리뷰할 수 있어서 좋겠네요." },
  { id: "contributor", severity: "medium", template: "2명인데 한 사람이 {topContributorRatio}%면 나머지 한 명은 뭐 했나요?" },
  { id: "contributor", severity: "medium", template: "듀오인데 밸런스가 안 맞아요. 한쪽이 너무 무거워요." },
  { id: "contributor", severity: "savage", template: "2명 프로젝트인데 비율이 {topContributorRatio}%:{soloRatio}%라니. 이건 듀엣이 아니라 솔로에요." },
  { id: "contributor", severity: "savage", template: "페어 프로그래밍이 아니라 '한 명은 코딩, 한 명은 구경'이에요." },
  { id: "contributor", severity: "legendary", template: "2인 팀인데 한 사람이 95%+면 나머지 한 명은 도대체... 월급 루팡인가요?" },

  // ============================================================
  // 특수 상황 — 기여자가 아주 많음 (20명+)
  // ============================================================
  { id: "contributor", severity: "mild", template: "기여자 {totalContributors}명! 대규모 오픈소스 프로젝트의 면모가 보여요." },
  { id: "contributor", severity: "mild", template: "{totalContributors}명이나 기여했다니 인기 있는 프로젝트시네요!" },
  { id: "contributor", severity: "medium", template: "{totalContributors}명이나 있는데 {topContributor}님이 {topContributorRatio}%면 메인테이너 번아웃 주의보." },
  { id: "contributor", severity: "medium", template: "기여자가 많지만 활성 기여자는 몇 명 안 되는 전형적인 오픈소스 패턴." },
  { id: "contributor", severity: "savage", template: "{totalContributors}명이 기여했지만 핵심 인물은 3명도 안 돼요. 나머지는 이슈만 올리는 사람들." },
  { id: "contributor", severity: "legendary", template: "{totalContributors}명의 기여자가 있는데 {topContributor}님이 {topContributorRatio}%라니. 민주주의의 실패를 코드로 증명하셨어요." },

  // ============================================================
  // 교통 비유 추가
  // ============================================================
  { id: "contributor", severity: "mild", template: "{topContributor}님이 운전대를 잡고 나머지는 뒷좌석이시네요." },
  { id: "contributor", severity: "medium", template: "이 프로젝트는 {topContributor}님이 모는 택시예요. 나머지는 승객." },
  { id: "contributor", severity: "savage", template: "{topContributor}님이 기관차이고 나머지는 빈 객차예요. 짐도 안 실려있는." },
  { id: "contributor", severity: "legendary", template: "이건 팀 드라이브가 아니라 {topContributor}님의 독주. 나머지는 하이패스만 찍으러 온 거예요." },

  // ============================================================
  // 건물/건축 비유
  // ============================================================
  { id: "contributor", severity: "mild", template: "{topContributor}님이 이 프로젝트의 기초부터 지붕까지 다 지으셨네요." },
  { id: "contributor", severity: "medium", template: "{topContributor}님이 건물 짓고 나머지는 페인트칠만 한 수준." },
  { id: "contributor", severity: "savage", template: "이 레포의 건축 보고서: 시공 {topContributor}님, 감리 없음, 인부 없음, 1인 건축." },
  { id: "contributor", severity: "legendary", template: "이 프로젝트는 {topContributor}님이 홀로 지은 바벨탑이에요. 곧 무너질 수 있어요(버스 팩터 1)." },

  // ============================================================
  // 날씨/자연현상 비유
  // ============================================================
  { id: "contributor", severity: "mild", template: "{topContributor}님은 이 프로젝트의 태양이에요. 나머지는 구름." },
  { id: "contributor", severity: "medium", template: "기여 분포가 태풍 같아요. 중심({topContributor}님)에 모든 에너지가 집중." },
  { id: "contributor", severity: "savage", template: "{topContributor}님은 폭풍의 눈. 나머지는 폭풍에 날아간 잔해." },
  { id: "contributor", severity: "legendary", template: "이 프로젝트의 기후: {topContributor}님 = 지구 온난화(뜨겁게 활동). 나머지 = 빙하기(얼어붙은 기여)." },

  // ============================================================
  // 최종 추가 — 목표 달성
  // ============================================================
  { id: "contributor", severity: "mild", template: "기여 패턴이 보이네요. {topContributor}님이 핵심." },
  { id: "contributor", severity: "mild", template: "{totalContributors}명이 함께한 프로젝트. 아름다워요." },
  { id: "contributor", severity: "mild", template: "각자의 속도로 기여하시면 됩니다. 강요는 없어요." },
  { id: "contributor", severity: "mild", template: "기여자가 있다는 것 자체가 축하할 일이에요." },
  { id: "contributor", severity: "medium", template: "기여 분석 중간 보고: {topContributor}님 의존도 높음." },
  { id: "contributor", severity: "medium", template: "팀의 기여 밸런스를 맞추는 게 다음 목표입니다." },
  { id: "contributor", severity: "medium", template: "{totalContributors}명의 기여자 중 활성: 추정 불가. 의심: 다수." },
  { id: "contributor", severity: "savage", template: "기여자 분석 완료. 진단: 심각한 불균형. 처방: 팀 회고." },
  { id: "contributor", severity: "savage", template: "이 프로젝트의 기여자는 양이 아니라 질이 문제예요. 질도 {topContributor}님만." },
  { id: "contributor", severity: "legendary", template: "최종 판결: 기여자 {totalContributors}명은 허수. 실수: {topContributor}님 1명. 이것이 진실입니다." },
  { id: "contributor", severity: "legendary", template: "마지막으로: 이 로스트는 나머지 기여자들에게 바치는 겁니다. 커밋 좀 하세요." },
  { id: "contributor", severity: "legendary", template: "기여 분석 최종 결론: {topContributor}님은 영웅, 나머지는 무관심, 이 레포는 비극. 막 내립니다." },

  // ============================================================
  // 추가 배치 1 — 500+ 추가
  // ============================================================

  // === 뉴스 헤드라인 스타일 ===
  { id: "contributor", severity: "mild", template: "[속보] 기여자 {totalContributors}명 프로젝트, {topContributor}님이 MVP로 선정." },
  { id: "contributor", severity: "medium", template: "[단독] 팀 프로젝트 기여 불균형 심화. {topContributor}님 {topContributorRatio}% 독주." },
  { id: "contributor", severity: "savage", template: "[긴급] 팀 프로젝트 위기. {totalContributors}명 중 실제 코딩한 사람 1명뿐." },
  { id: "contributor", severity: "legendary", template: "[특종] '기여자' 타이틀의 인플레이션. {totalContributors}명 등록, 실제 기여 1명." },
  { id: "contributor", severity: "medium", template: "[속보] {topContributor}님, 기여율 {topContributorRatio}%로 사상 최고치 경신." },
  { id: "contributor", severity: "savage", template: "[단독] 나머지 기여자 전원 '커밋 안 한 이유' 해명 요구받아." },
  { id: "contributor", severity: "legendary", template: "[긴급] '{topContributor}님 없이는 불가능' — 프로젝트 의존성 분석 결과 충격." },

  // === 의사 진단서 스타일 ===
  { id: "contributor", severity: "mild", template: "진단: 경미한 기여 편중. 처방: 다른 팀원 참여 독려. 예후: 양호." },
  { id: "contributor", severity: "medium", template: "진단: 중등도 무임승차. 증상: {topContributor}님만 활동. 처방: 팀 회고." },
  { id: "contributor", severity: "savage", template: "진단: 심각한 팀 기능 장애. 증상: {topContributorRatio}% 독점. 처방: 팀 해체 후 재편성." },
  { id: "contributor", severity: "legendary", template: "진단: 말기 팀워크 부재. 처방: 없음. 완화치료(솔로 전환) 권고." },

  // === 주식 리포트 스타일 ===
  { id: "contributor", severity: "mild", template: "종목: 팀워크. 현재가: 보통. 투자의견: 관망. {topContributor}님 실적 양호." },
  { id: "contributor", severity: "medium", template: "종목: 기여분배. 시가총액: {total}커밋. 리스크: {topContributor}님 의존도 높음." },
  { id: "contributor", severity: "savage", template: "종목: 협업. 투자의견: 매도. {topContributorRatio}% 집중 리스크. 분산 투자 필요." },
  { id: "contributor", severity: "legendary", template: "종목: 이 팀. 상장폐지 임박. 유일한 자산: {topContributor}님." },

  // === 학교 성적표 스타일 ===
  { id: "contributor", severity: "mild", template: "성적표 — 협업: B. 기여 분배: B-. 팀워크: B+. 종합: 양호." },
  { id: "contributor", severity: "medium", template: "성적표 — 협업: C. 기여 분배: D+. {topContributor}님 성적: A+. 나머지: F." },
  { id: "contributor", severity: "savage", template: "성적표 — 팀워크: F. 무임승차: A+. {topContributor}님 고생: S급. 나머지: 퇴학." },
  { id: "contributor", severity: "legendary", template: "학교에서 이런 기여 비율이면 교수님이 '이거 팀 프로젝트 맞아?'라고 하실 거예요." },

  // === 날씨 예보 스타일 ===
  { id: "contributor", severity: "mild", template: "기여 날씨: {topContributor}님 지역 맑음. 나머지 지역 흐림." },
  { id: "contributor", severity: "medium", template: "기여 기상: {topContributor}님 폭풍 커밋 경보. 나머지 지역 무풍." },
  { id: "contributor", severity: "savage", template: "기여 특보: {topContributor}님 태풍급 활동. 나머지 지역 커밋 가뭄." },
  { id: "contributor", severity: "legendary", template: "기여 기상 재난: {topContributor}님 단독 폭풍. 나머지 기여자 전원 동사." },

  // === RPG 스타일 ===
  { id: "contributor", severity: "mild", template: "파티원 {totalContributors}명. 탱커: {topContributor}. 나머지: 버프/디버프 담당." },
  { id: "contributor", severity: "medium", template: "레이드 결과: {topContributor}님 DPS 1위({topContributorRatio}%). 나머지 바닥 구르기." },
  { id: "contributor", severity: "savage", template: "파티 와이프: {topContributor}님 솔로 레이드 중. 파티원 {totalContributors}명은 던전 밖에서 대기." },
  { id: "contributor", severity: "legendary", template: "랭크: {topContributor}님 SSS급. 나머지 전원 F급. 파티 밸런스 최하위." },

  // === 요리 레시피 스타일 ===
  { id: "contributor", severity: "mild", template: "레시피: 팀 프로젝트. 주재료: {topContributor}님의 커밋 {topContributorRatio}%. 양념: 나머지." },
  { id: "contributor", severity: "medium", template: "오늘의 메뉴: {topContributor} 스페셜. 재료: 혼자 만든 {total}커밋. 팀원: 시식단." },
  { id: "contributor", severity: "savage", template: "조리 평가: {topContributor}님이 모든 요리를 하고 나머지는 설거지도 안 함." },
  { id: "contributor", severity: "legendary", template: "셰프 심사: '이 요리는 한 사람이 만든 거 맞죠?' 네, {topContributor}님이요." },

  // === 영화 평론 스타일 ===
  { id: "contributor", severity: "mild", template: "영화 리뷰: '{topContributor}의 코딩 여행'. 주연 1인, 조연 {totalContributors}명. 감동적." },
  { id: "contributor", severity: "medium", template: "평론: 스토리(코드)는 좋으나 캐스팅(기여 분배)이 편향적. {topContributor}님 원톱." },
  { id: "contributor", severity: "savage", template: "영화 평점: 2/5. '주연만 열연하고 나머지 배우는 대기실에 있었던 듯.'" },
  { id: "contributor", severity: "legendary", template: "영화 후기: '이건 영화가 아니라 {topContributor}님의 독백극이었다.' 라지 트러스트." },

  // === 상품 리뷰 스타일 ===
  { id: "contributor", severity: "mild", template: "상품: 팀 프로젝트. 리뷰: '{topContributor}님 덕분에 쓸 만합니다.' 3.5/5" },
  { id: "contributor", severity: "medium", template: "리뷰: '기대에 못 미침. 기여 분배가 불균형.' 2/5" },
  { id: "contributor", severity: "savage", template: "리뷰: '1인 프로젝트를 팀 프로젝트라고 속여 팔았음. 환불.' 1/5" },
  { id: "contributor", severity: "legendary", template: "리뷰: '사기 상품. {totalContributors}명이라더니 실제론 1명. 소비자원 신고.' 0/5" },

  // === 부동산 매물 스타일 ===
  { id: "contributor", severity: "mild", template: "매물: 팀 프로젝트. 건축주: {topContributor}. 면적: {total}커밋. 상태: 양호." },
  { id: "contributor", severity: "medium", template: "매물: 협업 레포. 1인 시공({topContributor}). 나머지 인부 무단 이탈." },
  { id: "contributor", severity: "savage", template: "매물: 방치된 팀 프로젝트. 실질 관리인: {topContributor}님 1명. 재건축 필요." },
  { id: "contributor", severity: "legendary", template: "매물: 기여자 {totalContributors}명 공동 소유... 라고 쓰고 {topContributor}님 단독 소유라고 읽습니다." },

  // === 택배/배송 스타일 ===
  { id: "contributor", severity: "mild", template: "배송 현황: {total}건 중 {topContributor}님이 {topContributorRatio}% 배송 완료." },
  { id: "contributor", severity: "medium", template: "배송 불균형: {topContributor}님이 거의 모든 택배를 배달. 나머지 배달원은 쉬는 중." },
  { id: "contributor", severity: "savage", template: "택배 회사 감사: {topContributor}님만 일하고 나머지 직원은 출근만 함." },
  { id: "contributor", severity: "legendary", template: "배송 사고 보고: {totalContributors}명의 배달원 중 {topContributor}님만 실제 배송. 나머지: 무단 결근." },

  // === 동화 스타일 ===
  { id: "contributor", severity: "mild", template: "옛날에 {totalContributors}명의 개발자가 있었는데, {topContributor}님이 가장 열심히 했어요." },
  { id: "contributor", severity: "medium", template: "개미와 베짱이: {topContributor}님(개미) vs 나머지(베짱이). 결말은 아시죠?" },
  { id: "contributor", severity: "savage", template: "토끼와 거북이? 아뇨, 여기는 {topContributor}(거북이)님만 뛰고 나머지(토끼)는 영원히 잠." },
  { id: "contributor", severity: "legendary", template: "동화: '{topContributor}와 {totalContributors}명의 난쟁이'. 난쟁이들은 노래만 부르고 일은 {topContributor}님이." },

  // === 타임라인 스타일 ===
  { id: "contributor", severity: "medium", template: "프로젝트 타임라인: Day 1 '다 같이 하자!' → Day 7 '나만 하고 있는데?' → 현재: {topContributor}님 독주." },
  { id: "contributor", severity: "savage", template: "기여 타임라인: 시작 — 팀원 전원 활발. 중간 — 한 명씩 이탈. 현재 — {topContributor}님만 남음." },
  { id: "contributor", severity: "legendary", template: "협업의 타임라인: 약속 → 기대 → 실망 → 분노 → 체념 → {topContributor}님 혼자 다 함." },

  // === 명언 패러디 ===
  { id: "contributor", severity: "mild", template: "'함께하면 멀리 간다' — {topContributor}님은 혼자서도 멀리 가고 계시네요." },
  { id: "contributor", severity: "medium", template: "'세 사람이 걸으면 반드시 스승이 있다' — 여기서 스승은 {topContributor}님." },
  { id: "contributor", severity: "savage", template: "'노력은 배신하지 않는다' — {topContributor}님의 노력은 팀에게 배신당했어요." },
  { id: "contributor", severity: "savage", template: "'위대한 것은 혼자 이루어지지 않는다' — 이 레포가 반례." },
  { id: "contributor", severity: "legendary", template: "'인생은 혼자 와서 혼자 간다' — 이 프로젝트도 {topContributor}님이 혼자 와서 혼자 하고 있어요." },

  // === 운세/점성술 스타일 ===
  { id: "contributor", severity: "mild", template: "기여 운세: {topContributor}님의 코딩 운이 상승 중. 나머지: 운세 해당 없음." },
  { id: "contributor", severity: "medium", template: "팀 운세: 기여 불균형의 기운이 감지됩니다. 밸런스가 필요해요." },
  { id: "contributor", severity: "savage", template: "올해 팀 운세: '한 사람이 짊어진다'. {topContributor}님의 어깨가 걱정됩니다." },
  { id: "contributor", severity: "legendary", template: "사주 분석: 이 팀은 태어날 때부터 불균형. {topContributor}님만 일하는 팔자." },

  // === 대선/투표 스타일 ===
  { id: "contributor", severity: "mild", template: "기여 투표: {topContributor}님 {topContributorRatio}% 득표로 1위." },
  { id: "contributor", severity: "medium", template: "기여 대선 결과: {topContributor}님 압승. 나머지 후보 전원 낙선." },
  { id: "contributor", severity: "savage", template: "기여 선거: {topContributor}님 독재... 아 민주적 독주. 야당(나머지) 부재." },
  { id: "contributor", severity: "legendary", template: "기여 국민투표: '{topContributor}님 없이 프로젝트 존속 가능?' → 부결 99%." },

  // === 여행 리뷰 스타일 ===
  { id: "contributor", severity: "mild", template: "여행지: 이 레포. 가이드: {topContributor}님. 평점 3.5/5. '가이드 덕분에 볼 만함.'" },
  { id: "contributor", severity: "medium", template: "여행 리뷰: '가이드({topContributor})는 좋았으나 다른 스태프가 없음.' 2.5/5" },
  { id: "contributor", severity: "savage", template: "리뷰: '가이드 1명이 모든 걸 하는 영세 여행사.' 1.5/5" },
  { id: "contributor", severity: "legendary", template: "트립어드바이저: '이 레포는 {topContributor}님의 원맨 투어입니다.' ★☆☆☆☆" },

  // === 광고/마케팅 스타일 ===
  { id: "contributor", severity: "mild", template: "팀 프로젝트! 기여자 {totalContributors}명! ※실제 기여 인원과 다를 수 있습니다." },
  { id: "contributor", severity: "medium", template: "NEW! {totalContributors}명의 협업! ※{topContributor}님 {topContributorRatio}% 기여." },
  { id: "contributor", severity: "savage", template: "과대 광고 주의: '팀 프로젝트'라 했지만 1인 프로젝트입니다." },
  { id: "contributor", severity: "legendary", template: "허위 광고 신고: '{totalContributors}명의 협업'이라 했으나 실제론 {topContributor}님 혼자." },

  // === if-else 코드 스타일 ===
  { id: "contributor", severity: "medium", template: "if (contributor === '{topContributor}') {{ doAllWork(); }} else {{ watchAndChill(); }}" },
  { id: "contributor", severity: "savage", template: "const team = contributors.filter(c => c.commits > 1); // 결과: [{topContributor}]" },
  { id: "contributor", severity: "savage", template: "git shortlog -sn | head -1 → {topContributor}: {topContributorRatio}% of all commits." },
  { id: "contributor", severity: "legendary", template: "SELECT * FROM contributors WHERE commits > 0 AND name != '{topContributor}'; -- 0 rows returned." },
  { id: "contributor", severity: "medium", template: "const 무임승차자 = team.filter(c => c.ratio < 5); // {totalContributors}명 중 대다수" },
  { id: "contributor", severity: "savage", template: "// TODO: 팀원들 커밋 좀 하게 만들기\n// FIXME: 안 될 것 같음" },

  // === 별점 스타일 ===
  { id: "contributor", severity: "mild", template: "팀워크 평점: ★★★☆☆. {topContributor}님의 노력이 돋보임." },
  { id: "contributor", severity: "medium", template: "팀워크 평점: ★★☆☆☆. 기여 분배 불균형." },
  { id: "contributor", severity: "savage", template: "팀워크 평점: ★☆☆☆☆. 팀이라 하기 어려운 수준." },
  { id: "contributor", severity: "legendary", template: "팀워크 평점: ☆☆☆☆☆. 이건 팀이 아닙니다." },

  // === 추가 솔로 변형 ===
  { id: "contributor", severity: "mild", template: "솔로 개발의 미덕: 모든 결정이 빠르고 모든 책임도 내 것." },
  { id: "contributor", severity: "mild", template: "혼자 하면 회의가 없어요. 최고의 생산성 환경!" },
  { id: "contributor", severity: "medium", template: "솔로라서 PR 리뷰가 self-approve. 품질 보장 불가." },
  { id: "contributor", severity: "medium", template: "1인 개발의 함정: 자기 코드의 문제를 못 보는 것." },
  { id: "contributor", severity: "savage", template: "혼자 하면 기술 부채가 쌓여도 아무도 모름. 나중에 폭발." },
  { id: "contributor", severity: "savage", template: "솔로 개발자의 git log: 모든 blame이 자기 자신을 가리킴." },
  { id: "contributor", severity: "legendary", template: "git blame 결과: 이 파일의 모든 줄을 작성한 사람 — {topContributor}. 무서울 정도로 완벽한 독점." },

  // === 추가 팀 불균형 변형 ===
  { id: "contributor", severity: "mild", template: "팀에서 {topContributor}님의 존재감이 큽니다. {topContributorRatio}%니까요." },
  { id: "contributor", severity: "medium", template: "팀 밸런스가 기울어져 있어요. {topContributor}님 쪽으로 90도." },
  { id: "contributor", severity: "medium", template: "{topContributor}님의 워크로드가 비정상적이에요. 나눠 가지세요." },
  { id: "contributor", severity: "savage", template: "팀의 기여 분포가 재벌 그룹의 지분 구조 같아요." },
  { id: "contributor", severity: "savage", template: "{topContributor}님: 전투력 {topContributorRatio}. 나머지 합: 나머지. 팀 해산 검토." },
  { id: "contributor", severity: "legendary", template: "이 팀은 {topContributor}님의 1인 기업에 무급 인턴이 {totalContributors}명 있는 구조예요." },

  // === 추가 무임승차 변형 ===
  { id: "contributor", severity: "medium", template: "무임승차 감지 시스템 작동 중... 대상: 나머지 기여자 전원." },
  { id: "contributor", severity: "savage", template: "이 팀의 무임승차율: ({totalContributors}-1)/{totalContributors} × 100%." },
  { id: "contributor", severity: "savage", template: "기여하지 않는 기여자들. 모순의 교과서적 사례." },
  { id: "contributor", severity: "legendary", template: "무임승차의 사전적 정의: '이 프로젝트의 나머지 기여자들'을 참고하세요." },

  // === 추가 고스트 기여자 변형 ===
  { id: "contributor", severity: "medium", template: "유령 기여자 비율이 높아요. 나타났다 사라진 사람들." },
  { id: "contributor", severity: "medium", template: "커밋 1개 후 소리소문 없이 사라진 기여자들. 미스터리." },
  { id: "contributor", severity: "savage", template: "고스트 기여자들의 공통 패턴: 와서 README 고치고 떠남." },
  { id: "contributor", severity: "savage", template: "유령 기여자들은 'Hacktoberfest' 때만 나타나요." },
  { id: "contributor", severity: "legendary", template: "이 레포에는 실체 없는 기여자가 더 많아요. 유령의 숲." },

  // === 추가 Co-authored 변형 ===
  { id: "contributor", severity: "mild", template: "Co-authored-by가 있으면 최소한 옆에서 봤다는 뜻이에요." },
  { id: "contributor", severity: "medium", template: "Co-authored-by: 'AI'. 솔직히 Copilot이 파트너인 거죠?" },
  { id: "contributor", severity: "savage", template: "Co-authored-by에 'ChatGPT'가 있으면 그게 진짜 팀원이에요." },
  { id: "contributor", severity: "legendary", template: "가장 성실한 Co-author: GitHub Copilot. 인간 기여자보다 더 많이 기여." },

  // === 교육/학교 테마 확장 ===
  { id: "contributor", severity: "mild", template: "조별과제 A조. 조장: {topContributor}. 조원: {totalContributors}명." },
  { id: "contributor", severity: "medium", template: "교수님의 코멘트: '기여 비율이 좀 편중됐네요. {topContributor}님 수고 많았어요.'" },
  { id: "contributor", severity: "medium", template: "조별과제 동료평가: {topContributor}님 → 5점. 나머지 → 1점." },
  { id: "contributor", severity: "savage", template: "교수님이 Git 로그를 확인하신다면: '{topContributor}님만 A+, 나머지는 F입니다.'" },
  { id: "contributor", severity: "savage", template: "조별과제 자유라이더 검출 알고리즘: git shortlog -sn → 결과: 적발." },
  { id: "contributor", severity: "legendary", template: "이 조별과제를 교수님에게 제출하면 {topContributor}님만 A+, 나머지 전원 수강 취소당해야 해요." },

  // === 시트콤/예능 비유 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 이 팀의 유재석. 나머지는 게스트 출연." },
  { id: "contributor", severity: "medium", template: "이 팀은 '나 혼자 산다'가 아니라 '{topContributor} 혼자 코딩한다'에요." },
  { id: "contributor", severity: "savage", template: "이 팀은 '런닝맨'인데 {topContributor}님만 뛰고 나머지는 벤치에 앉아있어요." },
  { id: "contributor", severity: "savage", template: "이건 '무한도전'이 아니라 '{topContributor}의 유한도전'. 나머지는 관람석." },
  { id: "contributor", severity: "legendary", template: "예능으로 치면: MC {topContributor} + 방청객 {totalContributors}명. 방청객은 박수만 치면 됨." },

  // === 군대/조직 비유 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 이 부대의 대장. 나머지는 이등병." },
  { id: "contributor", severity: "medium", template: "군 조직도: 사령관({topContributor}) — 졸병(나머지). 중간 간부 없음." },
  { id: "contributor", severity: "savage", template: "이 팀은 1인 특공대예요. {topContributor}님이 혼자 적진(코드) 돌파." },
  { id: "contributor", severity: "savage", template: "군기 빠진 부대. {topContributor}님만 전투하고 나머지는 탈영." },
  { id: "contributor", severity: "legendary", template: "전쟁터에서 {topContributor}님 혼자 싸우고 나머지는 후방에서 자고 있었어요. 무공훈장은 {topContributor}님에게." },

  // === 음악/밴드 비유 ===
  { id: "contributor", severity: "mild", template: "이 팀은 밴드예요. {topContributor}님이 보컬+기타+드럼+베이스." },
  { id: "contributor", severity: "medium", template: "밴드 구성: {topContributor}(모든 악기) + 나머지(매니저... 아니 관객)." },
  { id: "contributor", severity: "savage", template: "원맨 밴드 {topContributor}. 나머지 멤버는 앨범 재킷 사진에만 등장." },
  { id: "contributor", severity: "legendary", template: "이건 그룹이 아니라 {topContributor}님의 솔로 데뷔작이에요. 나머지는 피처링도 안 함." },

  // === 우주/SF 비유 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 이 우주의 항성. 나머지는 위성들." },
  { id: "contributor", severity: "medium", template: "이 레포의 중력: {topContributor}님에게 모든 것이 끌려갑니다." },
  { id: "contributor", severity: "savage", template: "{topContributor}님은 블랙홀. 모든 커밋을 빨아들이는." },
  { id: "contributor", severity: "legendary", template: "우주에서 이 레포를 관측하면 {topContributor}님만 빛나고 나머지는 암흑 물질." },

  // === 법률 스타일 ===
  { id: "contributor", severity: "medium", template: "기여 불균형 사건 — 원고: {topContributor}. 피고: 나머지 팀원 전원. 죄명: 무임승차." },
  { id: "contributor", severity: "savage", template: "판결: 나머지 기여자들은 '코딩 태만'으로 유죄. 형량: 커밋 500개." },
  { id: "contributor", severity: "savage", template: "변호인: '제 의뢰인은 코딩을 못 하는 게 아니라 안 한 겁니다.' 판사: '더 나빠요.'" },
  { id: "contributor", severity: "legendary", template: "대법원 최종 판결: 이 팀의 '기여자' 칭호는 {topContributor}님에게만 인정. 나머지: 기각." },

  // === 의료 드라마 스타일 ===
  { id: "contributor", severity: "mild", template: "수술실에서: {topContributor}(집도의) + 나머지(간호사... 아 관전자)." },
  { id: "contributor", severity: "medium", template: "응급실 상황: {topContributor}님만 환자(프로젝트) 살리고 나머지는 휴게실." },
  { id: "contributor", severity: "savage", template: "의학 드라마: {topContributor}(천재 의사) vs 나머지(의대 1학년도 안 된 수준)." },
  { id: "contributor", severity: "legendary", template: "이 프로젝트의 심폐소생술을 {topContributor}님 혼자 하고 있어요. 나머지는 '영안실 안내' 담당." },

  // === 추가 벌크 mild ===
  { id: "contributor", severity: "mild", template: "{topContributor}님 고생 많으셨어요. 기여율 {topContributorRatio}%." },
  { id: "contributor", severity: "mild", template: "팀원 {totalContributors}명이 각자의 방식으로 기여했겠죠." },
  { id: "contributor", severity: "mild", template: "기여 비율은 완벽할 수 없어요. 자연스러운 거예요." },
  { id: "contributor", severity: "mild", template: "핵심 기여자가 있는 건 좋은 거예요. {topContributor}님처럼." },
  { id: "contributor", severity: "mild", template: "기여자 {totalContributors}명의 조화. 나름 아름다워요." },
  { id: "contributor", severity: "mild", template: "모든 기여는 소중해요. 크든 작든." },
  { id: "contributor", severity: "mild", template: "팀의 중심에 {topContributor}님이 계시네요." },
  { id: "contributor", severity: "mild", template: "{total}커밋의 역사에 {totalContributors}명이 참여했어요." },
  { id: "contributor", severity: "mild", template: "솔로 비율 {soloRatio}%. 리더십의 표현일 수도 있어요." },
  { id: "contributor", severity: "mild", template: "기여 패턴이 자연스러워요. 누군가는 더 하게 되는 법이죠." },
  { id: "contributor", severity: "mild", template: "프로젝트를 이끄는 건 쉽지 않아요. {topContributor}님 감사합니다." },
  { id: "contributor", severity: "mild", template: "팀에 {topContributor}님이 있어서 다행이에요." },
  { id: "contributor", severity: "mild", template: "기여가 적어도 참여한 것 자체가 의미 있어요." },
  { id: "contributor", severity: "mild", template: "{totalContributors}명이 모인 것만으로도 가치가 있어요." },
  { id: "contributor", severity: "mild", template: "코드의 양보다 방향이 중요해요. {topContributor}님이 방향을 잡으셨겠죠." },

  // === 추가 벌크 medium ===
  { id: "contributor", severity: "medium", template: "{topContributor}님이 너무 많이 하시면 번아웃 위험이에요." },
  { id: "contributor", severity: "medium", template: "기여 분배가 좀 더 균등했으면 좋겠어요." },
  { id: "contributor", severity: "medium", template: "팀원들의 참여를 독려할 방법을 찾아보세요." },
  { id: "contributor", severity: "medium", template: "{topContributorRatio}% 기여율은 건강하지 않아요." },
  { id: "contributor", severity: "medium", template: "나머지 기여자들도 좀 더 활발했으면 좋겠네요." },
  { id: "contributor", severity: "medium", template: "기여 편중이 프로젝트 리스크가 될 수 있어요." },
  { id: "contributor", severity: "medium", template: "{topContributor}님의 부담을 줄여주는 게 팀의 역할이에요." },
  { id: "contributor", severity: "medium", template: "코드 리뷰라도 적극적으로 하면 기여가 되는데..." },
  { id: "contributor", severity: "medium", template: "기여자 수는 {totalContributors}명인데 활성도가 아쉬워요." },
  { id: "contributor", severity: "medium", template: "팀 문화 개선이 필요해 보여요. 기여 참여도가 낮아요." },
  { id: "contributor", severity: "medium", template: "{topContributor}님 빼면 최근 기여자가 없어요." },
  { id: "contributor", severity: "medium", template: "기여 그래프가 한 사람에게 치우친 건 좋은 신호가 아니에요." },
  { id: "contributor", severity: "medium", template: "나머지 팀원들의 마지막 커밋은 언제인가요?" },
  { id: "contributor", severity: "medium", template: "{total}커밋 중 대부분이 한 사람이면 코드 리뷰가 부실할 수 있어요." },
  { id: "contributor", severity: "medium", template: "기여자 다양성 부족. 다양한 관점이 필요해요." },

  // === 추가 벌크 savage ===
  { id: "contributor", severity: "savage", template: "팀에서 {topContributor}님만 불타고 있어요. 나머지는 소화기예요. 안 쓰는." },
  { id: "contributor", severity: "savage", template: "기여 비율로 연봉 책정하면 나머지 팀원은 최저임금도 못 받아요." },
  { id: "contributor", severity: "savage", template: "{totalContributors}명의 팀인데 실질적으로 페이크 팀이에요." },
  { id: "contributor", severity: "savage", template: "나머지 기여자들의 총 커밋을 세면 한 손으로 셀 수 있어요." },
  { id: "contributor", severity: "savage", template: "{topContributor}님이 빠지면 이 레포는 404 Not Found." },
  { id: "contributor", severity: "savage", template: "기여자 목록을 정리하면: {topContributor}(전부), 나머지(관전)." },
  { id: "contributor", severity: "savage", template: "이 팀의 Daily Standup: '{topContributor}: 어제 코딩함. 나머지: 어제... 음...'." },
  { id: "contributor", severity: "savage", template: "기여 불균형이 심해서 Jira 보드가 의미 없어요. 어차피 {topContributor}님이 다 하니까." },
  { id: "contributor", severity: "savage", template: "나머지 팀원들의 기여: . . . (확대해도 안 보임)." },
  { id: "contributor", severity: "savage", template: "팀 회고 시간: {topContributor}님 '더 분배하고 싶어요'. 팀원들: (카메라 OFF)." },
  { id: "contributor", severity: "savage", template: "이 팀에서 {topContributor}님의 역할: Everything. 나머지의 역할: Nothing." },
  { id: "contributor", severity: "savage", template: "기여 히스토리를 보면 나머지 팀원들이 '존재하는지' 의심이 돼요." },
  { id: "contributor", severity: "savage", template: "{topContributor}님의 기여: 코드, 테스트, 문서, 배포. 나머지의 기여: Slack 이모지." },
  { id: "contributor", severity: "savage", template: "나머지 기여자들에게 질문: '이 프로젝트가 뭐하는 건지 알고 계신가요?'" },
  { id: "contributor", severity: "savage", template: "팀 역량 분석: {topContributor}님 ████████████████ / 나머지 ▏ (비율 그대로)." },

  // === 추가 벌크 legendary ===
  { id: "contributor", severity: "legendary", template: "이 프로젝트의 고고학적 발견: '{topContributor}라는 단일 문명이 존재했다.'" },
  { id: "contributor", severity: "legendary", template: "기여 분석 최종본: {topContributor}님 = 이 프로젝트. 나머지 = 주석(//처럼 무시됨)." },
  { id: "contributor", severity: "legendary", template: "우주의 법칙: E = mc². 이 레포의 법칙: 프로젝트 = {topContributor}님." },
  { id: "contributor", severity: "legendary", template: "이 레포를 가장 잘 설명하는 단어: 독재. 가장 성실한 독재자: {topContributor}님." },
  { id: "contributor", severity: "legendary", template: "Wikipedia 편집: '{topContributor}님' — 이 레포의 유일한 생산자." },
  { id: "contributor", severity: "legendary", template: "이 팀의 실체를 한 줄로: '기여자'란 이름의 장식품들과 {topContributor}님이라는 엔진." },
  { id: "contributor", severity: "legendary", template: "인공지능 분석 결과: 이 레포의 핵심 인물 — {topContributor}님. 신뢰도: 99.{topContributorRatio}%." },
  { id: "contributor", severity: "legendary", template: "만약 이 프로젝트가 국가라면: 대통령 {topContributor}, 국민 0명. 나머지는 불법 체류자." },
  { id: "contributor", severity: "legendary", template: "최종 결산: {total}커밋, {totalContributors}명, {topContributor}님 {topContributorRatio}%. 이게 팀인가요? 아뇨, 이건 {topContributor}님이에요." },
  { id: "contributor", severity: "legendary", template: "이 로스트의 결론: 기여는 양이 아니라 질이라지만, 양도 질도 {topContributor}님 독식. 나머지는 그냥... 있었어요." },

  // === 추가 한국 문화 변형 ===
  { id: "contributor", severity: "medium", template: "이 팀의 카톡방: {topContributor}님 혼자 코드 공유, 나머지 '수고~' 스티커만." },
  { id: "contributor", severity: "medium", template: "조별과제에서 PPT 맡은 사람이 제일 적게 하죠? 여기서도 마찬가지." },
  { id: "contributor", severity: "savage", template: "학식 먹으면서 '야 오늘 밤에 코딩하자' → 당일 밤 {topContributor}님만 코딩." },
  { id: "contributor", severity: "savage", template: "조별과제 단톡방: '{topContributor}: PR 올렸어요.' 읽음 {totalContributors}. 반응 0." },
  { id: "contributor", severity: "legendary", template: "한국 대학 조별과제 역사에 이 Git 로그를 남겨야 합니다. '이것이 불평등이다'." },

  // === 추가 기술 용어 비유 ===
  { id: "contributor", severity: "mild", template: "이 팀의 아키텍처: {topContributor}님(서버) + 나머지(클라이언트, 가끔 요청)." },
  { id: "contributor", severity: "medium", template: "로드 밸런서 없는 시스템. 모든 요청이 {topContributor}님 서버로." },
  { id: "contributor", severity: "medium", template: "이 팀의 마이크로서비스: {topContributor}님(모놀리식으로 다 하는 서비스 1개)." },
  { id: "contributor", severity: "savage", template: "분산 시스템이라더니 단일 노드({topContributor})가 전부. 장애 시 전체 다운." },
  { id: "contributor", severity: "savage", template: "이 레포의 CI/CD: {topContributor}님이 코드 쓰고, 리뷰하고, 머지하고, 배포. 파이프라인 = 1인." },
  { id: "contributor", severity: "legendary", template: "Kubernetes 클러스터에 비유하면: Pod {totalContributors}개인데 실행 중인 건 1개({topContributor}). 나머지: CrashLoopBackOff." },

  // === 추가 감정/관계 비유 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 이 프로젝트를 사랑하시네요. {topContributorRatio}%의 사랑." },
  { id: "contributor", severity: "medium", template: "이 프로젝트와의 관계: {topContributor}님 — 열애. 나머지 — 이별." },
  { id: "contributor", severity: "savage", template: "나머지 기여자들은 이 프로젝트를 바람피운 거예요. 다른 데서 코딩하고." },
  { id: "contributor", severity: "savage", template: "{topContributor}님의 헌신적 사랑 vs 나머지의 식은 관심. 커플 상담 필요." },
  { id: "contributor", severity: "legendary", template: "이 프로젝트는 {topContributor}님에게만 충성합니다. 나머지? 이미 결별 통보됨." },

  // === 마지막 추가 마무리 ===
  { id: "contributor", severity: "mild", template: "기여자 분석 완료. {topContributor}님의 노력에 경의를 표합니다." },
  { id: "contributor", severity: "mild", template: "이 프로젝트에 참여한 모든 분들 감사합니다. 특히 {topContributor}님." },
  { id: "contributor", severity: "medium", template: "기여 리포트를 마치며: 밸런스 개선이 필요합니다." },
  { id: "contributor", severity: "medium", template: "다음 스프린트에서는 기여가 더 고르게 분배되길 바랍니다." },
  { id: "contributor", severity: "savage", template: "로스트 끝. {topContributor}님은 대단하시고 나머지는 반성하세요." },
  { id: "contributor", severity: "savage", template: "이 기여 비율이 바뀌지 않으면 다음 로스트도 같을 거예요." },
  { id: "contributor", severity: "legendary", template: "로스트 최종: {topContributor}님 {topContributorRatio}%, 기여자 {totalContributors}명, 커밋 {total}개. 이건 팀워크가 아니라 {topContributor}워크입니다." },
  { id: "contributor", severity: "legendary", template: "이 로스트가 끝나면 {topContributor}님은 다시 코딩하러 가시겠지만, 나머지는 이 로스트도 안 읽을 거예요. 그게 현실." },

  // ============================================================
  // 최종 추가 280+ — 1000 도달용
  // ============================================================

  // === 미니 시리즈: IT 밈 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님: 'It works on my machine.' 팀원: '우리는 기계도 안 켰어요.'" },
  { id: "contributor", severity: "medium", template: "나머지 기여자들의 모토: 'Talk is cheap. Show me the... 아 코드 안 짜요.'" },
  { id: "contributor", severity: "savage", template: "'There are no bad teams, only bad leaders' — 이 팀은 리더가 좋은데 팀이 나빠요." },
  { id: "contributor", severity: "legendary", template: "'Move fast and break things' — {topContributor}님만 move하고 나머지는 stay." },

  // === 미니 시리즈: 다이어리 형식 ===
  { id: "contributor", severity: "mild", template: "1월 1일: '팀원 {totalContributors}명으로 시작!' — 1월 31일: '결국 {topContributor}님만 남음.'" },
  { id: "contributor", severity: "medium", template: "월요일: '이번 주 목표 공유합시다.' 금요일: '{topContributor}님만 달성. 나머지: 미달.'" },
  { id: "contributor", severity: "savage", template: "데일리 일지 — {topContributor}: '기능 구현 완료.' 팀원A: '회의 참석.' 팀원B: '(기록 없음).' 팀원C: '(존재 확인 불가).'" },
  { id: "contributor", severity: "legendary", template: "프로젝트 사망 일지: '기여자 {totalContributors}명으로 시작. 실제 활동 1명. 나머지 전원 행방불명. 수색 중단.'" },

  // === 미니 시리즈: 면접 시뮬레이션 ===
  { id: "contributor", severity: "mild", template: "면접관: '이 프로젝트에서 맡은 역할은?' {topContributor}: '전부요.'" },
  { id: "contributor", severity: "medium", template: "면접관: '팀 프로젝트에서 갈등은 어떻게 해결?' 나머지: '갈등이요? 저는 아무것도 안 했는데...'." },
  { id: "contributor", severity: "savage", template: "면접관: '기여도를 증명할 수 있나요?' 나머지: (침묵). 면접관: 'git shortlog 돌려볼게요.' 나머지: (퇴장)." },
  { id: "contributor", severity: "legendary", template: "면접 시나리오: 면접관이 git log를 열었다. {topContributor}님 외 기여자의 이름이 안 보인다. 면접 종료." },

  // === 미니 시리즈: 지도/GPS 스타일 ===
  { id: "contributor", severity: "mild", template: "기여 지도: {topContributor}님 = 서울. 나머지 = 섬(접근 불가)." },
  { id: "contributor", severity: "medium", template: "네비게이션: '목적지(프로젝트 완성)까지 {topContributor}님만 운전 중. 나머지: 탑승 거부.'" },
  { id: "contributor", severity: "savage", template: "기여 GPS: '{topContributor}님의 위치 - 코드 에디터. 나머지 - 넷플릭스.'" },
  { id: "contributor", severity: "legendary", template: "기여 위성 사진: {topContributor}님의 활동 = 밝은 도시. 나머지 = 어둠의 대륙." },

  // === 미니 시리즈: 백과사전 스타일 ===
  { id: "contributor", severity: "mild", template: "기여자 [명사]: 프로젝트에 코드를 기여하는 사람. 이 레포에서는 {topContributor}님을 지칭." },
  { id: "contributor", severity: "medium", template: "무임승차 [명사]: 다른 사람의 노력에 편승하는 행위. 예시: 이 레포의 나머지 기여자들." },
  { id: "contributor", severity: "savage", template: "팀워크 [명사]: 팀이 함께 일하는 것. 반례: 이 프로젝트." },
  { id: "contributor", severity: "legendary", template: "기여 불균형 [명사]: 한 사람이 대부분을 하는 상태. 교과서적 예시: 이 레포({topContributor}님 {topContributorRatio}%)." },

  // === 미니 시리즈: 설문조사 결과 스타일 ===
  { id: "contributor", severity: "mild", template: "팀 만족도 조사: {topContributor}님 — '더 도와줬으면.' 나머지 — '만족합니다(웃음).'" },
  { id: "contributor", severity: "medium", template: "기여 의향 조사: '다음 스프린트에 기여하시겠습니까?' 결과: {topContributor}님만 '예'." },
  { id: "contributor", severity: "savage", template: "팀 설문: '가장 기여한 사람?' 100%가 {topContributor}님 선택. 투표 참여: {topContributor}님만." },
  { id: "contributor", severity: "legendary", template: "팀 해체 찬반 투표: 찬성 {totalContributors}표, 반대 0표. 만장일치로 해체." },

  // === 추가 건물/건축 변형 ===
  { id: "contributor", severity: "medium", template: "이 프로젝트의 건축: {topContributor}님이 설계, 시공, 감리, 입주까지." },
  { id: "contributor", severity: "savage", template: "건물로 치면 {topContributor}님이 1층부터 옥탑까지 혼자 올렸어요. 나머지는 분양 대기." },
  { id: "contributor", severity: "legendary", template: "이 코드베이스는 {topContributor}님이 혼자 지은 만리장성이에요. 역사적이지만 힘들었을 거예요." },

  // === 추가 동물 변형 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 부지런한 비버. 나머지는 나무늘보." },
  { id: "contributor", severity: "medium", template: "이 팀은 늑대 무리인데 {topContributor}님만 사냥해요." },
  { id: "contributor", severity: "savage", template: "기여 생태계: {topContributor}님(일꾼개미), 나머지(기생충). 공생이 아니에요." },
  { id: "contributor", severity: "legendary", template: "이 팀을 동물의 왕국에 출연시키면 '{topContributor}: 혼자 사냥하는 고독한 치타' 편이에요." },

  // === 추가 결혼/관계 변형 ===
  { id: "contributor", severity: "medium", template: "{topContributor}님과 코드는 사실혼 관계. 나머지 기여자와 코드는 만난 적도 없음." },
  { id: "contributor", severity: "savage", template: "이 팀의 관계도: {topContributor}님 ─ 코드 (♥). 나머지 ─ 코드 (읽씹)." },
  { id: "contributor", severity: "legendary", template: "커플 매칭: {topContributor}님 + 코드 = 천생연분. 나머지 + 코드 = 소개팅 1차에서 끝." },

  // === 추가 금융/투자 변형 ===
  { id: "contributor", severity: "mild", template: "기여 포트폴리오: {topContributor}님 {topContributorRatio}% 투자. 고위험 고수익." },
  { id: "contributor", severity: "medium", template: "기여 펀드: {topContributor}님이 대부분 투자. 나머지는 원금도 안 넣음." },
  { id: "contributor", severity: "savage", template: "기여 파산 위기: {topContributor}님이 빠지면 자산(코드) 가치 제로." },
  { id: "contributor", severity: "legendary", template: "기여 감사 보고: 부실 기업 판정. 실질 자산: {topContributor}님의 커밋만." },

  // === 추가 날씨 변형 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 이 팀의 햇살. 나머지는 안개." },
  { id: "contributor", severity: "savage", template: "기여 기온: {topContributor}님 쪽 36.5°C(정상 활동), 나머지 -40°C(동결)." },
  { id: "contributor", severity: "legendary", template: "기여 재난: {topContributor}님의 번아웃 가뭄 시 전체 프로젝트 기근 확정." },

  // === 추가 커밋 분석 변형 ===
  { id: "contributor", severity: "mild", template: "커밋 분석: {topContributor}님의 커밋이 프로젝트의 뼈대예요." },
  { id: "contributor", severity: "medium", template: "git shortlog를 돌리면 {topContributor}님만 길게 나와요." },
  { id: "contributor", severity: "medium", template: "{total}커밋의 절대 다수가 {topContributor}님이면 코드 스타일이 일관적이겠네요. 장점?" },
  { id: "contributor", severity: "savage", template: "커밋 분석 결과: {topContributor}님 — 기능 추가, 버그 수정, 리팩토링. 나머지 — 오타 수정." },
  { id: "contributor", severity: "savage", template: "git log --author='{topContributor}': 수백 개. git log --author='나머지': Not found." },
  { id: "contributor", severity: "legendary", template: "이 레포에서 {topContributor}님의 커밋을 빼면 .gitignore와 LICENSE만 남아요." },

  // === 추가 SNS 변형 ===
  { id: "contributor", severity: "medium", template: "이 팀의 GitHub 활동 알림: '{topContributor}님이 커밋했습니다' × 매일. 나머지: 알림 없음." },
  { id: "contributor", severity: "savage", template: "나머지 기여자들의 GitHub 프로필 상태: '🟢 Online' — 하지만 이 레포에서는 '⚫ Offline'." },
  { id: "contributor", severity: "legendary", template: "트위터 트렌드: #{topContributor}님_고생 #나머지_기여자_반성해 #팀워크_실종사건" },

  // === 추가 일상/생활 비유 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 매일 아침 운동하는 사람. 나머지는 '내일부터'." },
  { id: "contributor", severity: "medium", template: "이 팀은 같이 살인데 {topContributor}님만 집안일 해요. 나머지는 방에서 게임." },
  { id: "contributor", severity: "savage", template: "룸메이트로 치면: {topContributor}님(설거지+청소+요리) vs 나머지(짐만 있음)." },
  { id: "contributor", severity: "savage", template: "가족 비유: {topContributor}님(맏이, 모든 짐), 나머지(막내, 용돈만 받음)." },
  { id: "contributor", severity: "legendary", template: "이 팀의 가사 분담: {topContributor}님 100%, 나머지 0%. 이혼 사유 충분." },

  // === 추가 교통 변형 ===
  { id: "contributor", severity: "medium", template: "이 팀은 자전거인데 {topContributor}님만 페달 밟아요. 나머지는 뒷자리에 앉음." },
  { id: "contributor", severity: "savage", template: "버스 비유: 운전사 {topContributor}님, 승객 {totalContributors}명. 승객은 요금도 안 냈음." },
  { id: "contributor", severity: "legendary", template: "이 프로젝트는 {topContributor}님이 모는 자동차에 나머지가 무단 탑승한 거예요." },

  // === 추가 비즈니스 변형 ===
  { id: "contributor", severity: "mild", template: "이 프로젝트의 CEO이자 CTO이자 인턴: {topContributor}님." },
  { id: "contributor", severity: "medium", template: "팀 OKR: {topContributor}님만 달성. 나머지: Key Result 0%." },
  { id: "contributor", severity: "savage", template: "이 팀의 주주총회: {topContributor}님(대주주 {topContributorRatio}%) 독단 결의." },
  { id: "contributor", severity: "savage", template: "팀 KPI: {topContributor}님 150%, 나머지 5%. 성과급은 {topContributor}님만." },
  { id: "contributor", severity: "legendary", template: "비즈니스 분석: 이 회사의 전체 매출(커밋)이 한 직원에게 의존. IPO 불가." },

  // === 추가 교육 변형 ===
  { id: "contributor", severity: "mild", template: "이 팀의 모범생: {topContributor}님. 나머지: 결석/지각 상습범." },
  { id: "contributor", severity: "medium", template: "학급 활동 보고: {topContributor}님만 발표, 질문, 과제 제출. 나머지: 꿈나라." },
  { id: "contributor", severity: "savage", template: "학교 상담: '팀원들이 안 해요.' 교사: 'Git 로그 봤습니다. 맞네요.'" },
  { id: "contributor", severity: "legendary", template: "졸업 시상: {topContributor}님 — 공로상, 근면상, 성실상. 나머지 — 개근상도 못 받음." },

  // === 추가 게임 변형 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 MVP. 나머지는 '참여에 의의를 둔' 플레이어." },
  { id: "contributor", severity: "medium", template: "이 팀의 게임 스탯: {topContributor}님 — 올킬. 나머지 — 0킬 0데스(안 들어감)." },
  { id: "contributor", severity: "savage", template: "매칭 시스템 오류: {topContributor}님(다이아)이 나머지(아이언)와 매칭됨." },
  { id: "contributor", severity: "savage", template: "게임 결과: {topContributor}님 캐리 실패. 원인: 팀원 전원 AFK." },
  { id: "contributor", severity: "legendary", template: "게임 후 로비: '{topContributor}님이 나감. 이유: 팀이 없어서.' 나머지: (봇이었음)." },

  // === 추가 음식 변형 ===
  { id: "contributor", severity: "mild", template: "이 프로젝트는 {topContributor}님이 빚은 떡. 나머지는 먹기만 함." },
  { id: "contributor", severity: "medium", template: "치킨 시켰는데 {topContributor}님만 돈 내고 나머지는 먹기만 한 상황." },
  { id: "contributor", severity: "savage", template: "이 팀의 밥상: {topContributor}님(요리), 나머지(수저만 들고 대기)." },
  { id: "contributor", severity: "legendary", template: "프로젝트 = 뷔페. {topContributor}님 = 셰프(모든 음식 조리). 나머지 = 손님(먹기만 함)." },

  // === 추가 시즌/계절 변형 ===
  { id: "contributor", severity: "medium", template: "기여의 사계절: {topContributor}님(사계절 활동). 나머지(사계절 동면)." },
  { id: "contributor", severity: "savage", template: "기여 캘린더: {topContributor}님 — 365일 활동. 나머지 — 0일(윤년에도 0일)." },
  { id: "contributor", severity: "legendary", template: "나머지 기여자들의 활동 시즌: 없음. 비시즌: 365일." },

  // === 추가 기술 스택 농담 ===
  { id: "contributor", severity: "mild", template: "이 팀의 기술 스택: {topContributor}님(풀스택). 나머지(노스택)." },
  { id: "contributor", severity: "medium", template: "프론트엔드, 백엔드, 인프라 — 전부 {topContributor}님이 담당." },
  { id: "contributor", severity: "savage", template: "마이크로서비스 아키텍처라더니 {topContributor}님이라는 모놀리스 하나로 운영 중." },
  { id: "contributor", severity: "savage", template: "DevOps = {topContributor}님. Dev도 Ops도 다 혼자. DevOps의 참 의미." },
  { id: "contributor", severity: "legendary", template: "이 팀의 CI/CD: {topContributor}님이 Continuously Integration하고 Continuously Delivery. 나머지: Continuously 하지않음." },

  // === 추가 상황극 ===
  { id: "contributor", severity: "medium", template: "스프린트 플래닝: PM '이 티켓 누가 할래요?' (침묵) {topContributor}: '...제가 하죠.'" },
  { id: "contributor", severity: "savage", template: "코드 리뷰 시간: {topContributor}님이 올린 PR에 나머지가 LGTM 원클릭." },
  { id: "contributor", severity: "savage", template: "레트로: {topContributor} '다음엔 같이 해요.' 팀원 '네~' (3달 연속 같은 대화)." },
  { id: "contributor", severity: "legendary", template: "팀 회식: {topContributor} '오늘 커밋 얘기 좀 하자.' 팀원 '아 그건 좀...' (자리 이탈)." },

  // === 추가 잡다한 비유 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 프로젝트의 배터리. 에너지의 원천." },
  { id: "contributor", severity: "medium", template: "이 레포는 {topContributor}님이라는 전구로만 밝혀지는 방이에요." },
  { id: "contributor", severity: "savage", template: "{topContributor}님은 산소. 나머지는 이산화탄소. 팀의 공기질 나쁨." },
  { id: "contributor", severity: "savage", template: "이 팀에서 {topContributor}님은 WiFi. 나머지는 비밀번호 모르는 사람들." },
  { id: "contributor", severity: "legendary", template: "이 레포는 {topContributor}님이라는 태양계. 나머지 기여자는 외행성 — 존재하지만 아무도 신경 안 씀." },

  // === 최종 마무리 ===
  { id: "contributor", severity: "mild", template: "기여자 분석 끝! {topContributor}님, 수고하셨습니다." },
  { id: "contributor", severity: "mild", template: "모든 기여에 감사드립니다. 크든 작든." },
  { id: "contributor", severity: "mild", template: "다음 커밋은 팀 전체가 함께하길 바랍니다." },
  { id: "contributor", severity: "medium", template: "이 로스트를 팀원들과 공유하세요. 변화가 생길 수도 있어요." },
  { id: "contributor", severity: "medium", template: "기여 불균형은 팀의 건강을 해칩니다. 개선해주세요." },
  { id: "contributor", severity: "medium", template: "다음 분기에는 기여 비율이 더 고르길 바랍니다." },
  { id: "contributor", severity: "savage", template: "이 로스트를 읽고도 커밋 안 하면 진짜 무임승차 확정이에요." },
  { id: "contributor", severity: "savage", template: "나머지 기여자들에게 마지막 경고: 커밋하세요. 아니면 기여자 목록에서 삭제." },
  { id: "contributor", severity: "savage", template: "이 로스트가 끝나면 행동으로 보여주세요. 말고 커밋으로." },
  { id: "contributor", severity: "legendary", template: "마지막: {topContributor}님에게 금메달, 나머지에게 경고장. 이 로스트를 명심하세요." },
  { id: "contributor", severity: "legendary", template: "에필로그: 그리하여 {topContributor}님은 오늘도 혼자 코딩합니다. 나머지는 어디 갔을까요? 아무도 모릅니다." },
  { id: "contributor", severity: "legendary", template: "THE END. 기여자 {totalContributors}명, 실질 기여자 1명. 이것이 이 레포의 전부입니다." },

  // === 추가 숫자 강조 변형 ===
  { id: "contributor", severity: "mild", template: "기여 수치: {totalContributors}명 / {total}커밋 / 상위 1인 {topContributorRatio}%. 기록됨." },
  { id: "contributor", severity: "medium", template: "통계 요약: Contributors={totalContributors}, Top={topContributor}({topContributorRatio}%). 불균형 경고." },
  { id: "contributor", severity: "savage", template: "기여 지수: {topContributor}님={topContributorRatio}, 나머지=나머지. 차이: 하늘과 땅." },
  { id: "contributor", severity: "legendary", template: "FINAL STAT: {totalContributors} contributors, {total} commits, {topContributor} owns {topContributorRatio}%. 이건 팀이 아닌 독백이었습니다." },

  // === 추가 변형 — 팀원 수별 세분화 ===
  { id: "contributor", severity: "mild", template: "기여자 {totalContributors}명이면 작지만 강한 팀이 될 수 있어요." },
  { id: "contributor", severity: "medium", template: "{totalContributors}명의 기여자가 있지만 시너지가 부족해요." },
  { id: "contributor", severity: "savage", template: "{totalContributors}명이나 있는데 이 정도 기여 분배라니 충격이에요." },
  { id: "contributor", severity: "legendary", template: "{totalContributors}명이 모여서 이런 결과라니. 1명이 하는 게 나았을 거예요. 아, 이미 그렇군요." },

  // === 추가 변형 — 기여자 성장 ===
  { id: "contributor", severity: "mild", template: "기여자 수를 늘리려면 Good First Issue를 만들어보세요." },
  { id: "contributor", severity: "medium", template: "CONTRIBUTING.md와 ISSUE_TEMPLATE을 추가하면 기여자가 늘 수 있어요." },
  { id: "contributor", severity: "savage", template: "기여자 늘리기 전에 기존 {totalContributors}명이라도 활성화시키세요." },
  { id: "contributor", severity: "legendary", template: "기여자 늘리기? 기존 팀원도 안 하는데 누가 와서 하겠어요." },

  // === 마지막 마무리 라운드 ===
  { id: "contributor", severity: "mild", template: "기여자 {totalContributors}명의 이야기. 주인공: {topContributor}님. 끝." },
  { id: "contributor", severity: "mild", template: "프로젝트의 심장인 {topContributor}님. 오래오래 건강하세요." },
  { id: "contributor", severity: "medium", template: "기여 비율 개선 계획을 세우시고 다음 로스트 때 보여주세요." },
  { id: "contributor", severity: "medium", template: "팀워크는 연습이 필요해요. 다음엔 나아지길 바랍니다." },
  { id: "contributor", severity: "savage", template: "이 로스트 이후에도 기여 비율이 안 바뀌면 기여자 목록 자체가 무의미해요." },
  { id: "contributor", severity: "savage", template: "나머지 기여자들: 이 로스트를 읽었으면 커밋 하나만이라도 해주세요. 한 개만." },
  { id: "contributor", severity: "legendary", template: "최후의 로스트: {topContributor}님 {topContributorRatio}%. {totalContributors}명의 팀. {total}개의 커밋. 1명의 전사와 나머지 관전자들의 이야기. 감사합니다." },
  { id: "contributor", severity: "legendary", template: "기여 분석 종료. {topContributor}님에게 경의를, 나머지에게 각성을, 이 레포에게 평화를." },

  // ============================================================
  // 최종 보강 — 150+ 추가하여 1000 도달
  // ============================================================

  // === 프로그래밍 언어 비유 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 Python처럼 다재다능. 나머지는 COBOL처럼 레거시." },
  { id: "contributor", severity: "medium", template: "이 팀의 언어: {topContributor}님(TypeScript — 타입 안전). 나머지(Any — 무타입, 무기여)." },
  { id: "contributor", severity: "savage", template: "{topContributor}님은 Rust 수준의 안정성. 나머지는 undefined." },
  { id: "contributor", severity: "legendary", template: "이 팀을 코드로 표현: {topContributor} = async function*() {{ yield* allCommits; }}; others = null;" },

  // === 자동차 비유 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 엔진, 나머지는 범퍼 스티커." },
  { id: "contributor", severity: "medium", template: "이 팀은 자동차인데 {topContributor}님만 연료를 넣어요." },
  { id: "contributor", severity: "savage", template: "{topContributor}님이 F1 드라이버면 나머지는 관중석이에요." },
  { id: "contributor", severity: "legendary", template: "이 자동차의 부품: 엔진({topContributor}), 에어프레셔너 향(나머지). 없어도 달려요." },

  // === 학교 과목 비유 ===
  { id: "contributor", severity: "mild", template: "이 팀의 과목: {topContributor}님(국영수사과 올 A+). 나머지(결석)." },
  { id: "contributor", severity: "medium", template: "기여 성적: {topContributor} A+, 나머지 F. 반 평균을 혼자 올리는 중." },
  { id: "contributor", severity: "savage", template: "학급 석차: 1등 {topContributor}님. 꼴찌: 나머지 전원(공동)." },
  { id: "contributor", severity: "legendary", template: "전교 1등 {topContributor}님과 전교 꼴찌(나머지)가 같은 반. 교육의 비극." },

  // === 미술/디자인 비유 ===
  { id: "contributor", severity: "mild", template: "이 프로젝트는 {topContributor}님의 작품이에요. 나머지는 액자." },
  { id: "contributor", severity: "medium", template: "{topContributor}님은 화가, 나머지는 미술관 관람객." },
  { id: "contributor", severity: "savage", template: "이 코드는 {topContributor}님의 걸작이에요. 나머지는 서명도 못 함." },
  { id: "contributor", severity: "legendary", template: "이 레포는 피카소({topContributor})의 작품에 유치원생(나머지)이 낙서한 느낌." },

  // === 음료/카페 비유 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 에스프레소 샷. 나머지는 물." },
  { id: "contributor", severity: "medium", template: "이 팀의 커피 비율: {topContributor}님(아메리카노 진하게). 나머지(설탕물)." },
  { id: "contributor", severity: "savage", template: "카페 비유: {topContributor}님(바리스타+서빙+계산). 나머지(매장에서 콘센트만 쓰는 손님)." },
  { id: "contributor", severity: "legendary", template: "이 팀은 카페인데 {topContributor}님만 일하고 나머지는 와이파이 프리로더." },

  // === 파티/행사 비유 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님이 파티 준비를 다 하고 나머지는 즐기러 왔어요." },
  { id: "contributor", severity: "medium", template: "이 팀의 생일파티: {topContributor}님(케이크 만들기+장식+초대). 나머지(촛불 불기)." },
  { id: "contributor", severity: "savage", template: "파티 기여도: {topContributor}님(기획+준비+진행+정리). 나머지(셀카만 찍고 감)." },
  { id: "contributor", severity: "legendary", template: "이 프로젝트는 {topContributor}님이 준비한 파티에 초대받지도 않은 사람들이 와서 먹고 간 격." },

  // === 추가 코딩 유머 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님의 커밋이 이 레포의 master(main) 브랜치 그 자체예요." },
  { id: "contributor", severity: "medium", template: ".gitignore에 나머지 기여자들의 이름을 추가해야 할 것 같아요." },
  { id: "contributor", severity: "savage", template: "git revert로 나머지 기여자들의 커밋을 되돌려도 프로젝트에 영향 없음." },
  { id: "contributor", severity: "savage", template: "이 레포의 진짜 .env: TOP_CONTRIBUTOR={topContributor}, TEAM_EFFORT=false." },
  { id: "contributor", severity: "legendary", template: "이 레포의 404 에러: '팀워크를 찾을 수 없습니다. {topContributor}님의 독주만 감지됨.'" },

  // === 추가 한국 특화 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 이 팀의 에이스. 학원에서 말하는 '반 전체 평균을 올리는 아이'." },
  { id: "contributor", severity: "medium", template: "대학교 조별과제에서 항상 혼자 하던 그 사람. {topContributor}님이시죠?" },
  { id: "contributor", severity: "medium", template: "수행평가 팀 프로젝트에서 혼자 A 받는 패턴. {topContributor}님." },
  { id: "contributor", severity: "savage", template: "이 Git 로그를 교수님 앞에서 열면 나머지 팀원들이 자퇴할 거예요." },
  { id: "contributor", severity: "savage", template: "한국 개발자 커뮤니티에서 이 기여 비율 공유하면 나머지 팀원들이 인터넷 장례식 당함." },
  { id: "contributor", severity: "legendary", template: "이 조별과제의 교훈: '사람은 바뀌지 않는다.' {topContributor}님만 바뀌지 않을 뿐." },

  // === 추가 생물/과학 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 미토콘드리아. 이 프로젝트의 에너지 생산 담당." },
  { id: "contributor", severity: "medium", template: "기여 DNA 분석: {topContributor}님 유전자만 활성. 나머지: 비활성(정크 DNA)." },
  { id: "contributor", severity: "savage", template: "진화론으로 보면: {topContributor}님(적자생존). 나머지(자연 도태)." },
  { id: "contributor", severity: "legendary", template: "생물학적 분석: 이 팀은 공생이 아니라 기생. {topContributor}님(숙주), 나머지(기생충)." },

  // === 추가 밈/인터넷 문화 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님: '이 커밋은 제가 했어요.' 나머지: '좋아요👍' (유일한 기여)" },
  { id: "contributor", severity: "medium", template: "나머지 기여자들의 GitHub 잔디: 이 레포에서는 사하라 사막." },
  { id: "contributor", severity: "savage", template: "나머지 기여자들의 상태: '온라인'이지만 이 레포에서는 '오프라인'." },
  { id: "contributor", severity: "savage", template: "Stack Overflow에서 질문은 하면서 여기서 코드는 안 짜는 나머지 기여자들." },
  { id: "contributor", severity: "legendary", template: "나머지 기여자들의 GitHub 활동: 'GitHub에서 가장 많이 하는 것: 다른 레포에 Star 누르기.'" },

  // === 추가 가전/기기 비유 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 충전기. 이 프로젝트의 배터리를 채우는 유일한 장치." },
  { id: "contributor", severity: "medium", template: "이 팀은 스마트 홈인데 {topContributor}님만 작동하고 나머지는 '연결 끊김'." },
  { id: "contributor", severity: "savage", template: "{topContributor}님은 CPU, 나머지는 먼지. 둘 다 PC 안에 있지만 역할이 다름." },
  { id: "contributor", severity: "legendary", template: "이 팀은 컴퓨터인데 {topContributor}님 = CPU+GPU+RAM+SSD, 나머지 = 케이스(겉모습만)." },

  // === 추가 수학 비유 ===
  { id: "contributor", severity: "mild", template: "기여 비율 수식: {topContributor} / 전체 = {topContributorRatio}%. 높은 분자." },
  { id: "contributor", severity: "medium", template: "파레토 법칙도 80:20인데 여기는 {topContributorRatio}:{soloRatio}. 파레토도 놀랄 수준." },
  { id: "contributor", severity: "savage", template: "기여 분산: σ² = 매우 높음. 평균 기여 = {topContributor}님 때문에 왜곡됨." },
  { id: "contributor", severity: "legendary", template: "기여 함수: f(x) = {topContributor}. 다른 변수는 상수 0." },

  // === 추가 계절/시간 비유 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 이 프로젝트의 여름 태양. 나머지는 겨울 밤." },
  { id: "contributor", severity: "medium", template: "기여 시계: {topContributor}님은 24시간 작동. 나머지는 멈춤." },
  { id: "contributor", severity: "savage", template: "기여 달력: {topContributor}님 — 매일 표시. 나머지 — 공휴일만(그마저도 안 함)." },
  { id: "contributor", severity: "legendary", template: "시간 비유: {topContributor}님은 현재. 나머지 기여자들은 과거(이미 활동 종료)." },

  // === 추가 유튜브/콘텐츠 비유 ===
  { id: "contributor", severity: "mild", template: "이 레포의 유튜브 채널: 크리에이터 {topContributor}님. 구독자: {totalContributors}명." },
  { id: "contributor", severity: "medium", template: "{topContributor}님의 코딩 채널: 영상 {total}개. 나머지: 댓글도 안 달아줌." },
  { id: "contributor", severity: "savage", template: "유튜브로 치면 {topContributor}님이 영상 기획+촬영+편집+업로드. 나머지: '좋아요' 안 누름." },
  { id: "contributor", severity: "legendary", template: "이 레포의 콘텐츠 제작자: {topContributor}님(1인 크리에이터). 나머지: 유령 구독자(무반응)." },

  // === 추가 생활체육 비유 ===
  { id: "contributor", severity: "mild", template: "이 팀의 헬스장: {topContributor}님(매일 운동). 나머지(등록만 하고 안 감)." },
  { id: "contributor", severity: "medium", template: "러닝 크루인데 {topContributor}님만 달리고 나머지는 응원 문자만." },
  { id: "contributor", severity: "savage", template: "PT 결과: {topContributor}님(근육 증가). 나머지(결석으로 환불 처리)." },
  { id: "contributor", severity: "legendary", template: "이 팀의 운동 기록: {topContributor}님(마라톤 완주). 나머지(출발선에서 셀카 후 퇴장)." },

  // === 추가 철학적 비유 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 '존재'하고 '행동'하는 기여자. 나머지는 '존재'만." },
  { id: "contributor", severity: "medium", template: "데카르트: '나는 생각한다, 고로 존재한다.' 나머지 기여자: '나는 커밋 안 한다, 고로 무존재.'" },
  { id: "contributor", severity: "savage", template: "니체: '신은 죽었다.' 이 레포: '팀워크는 죽었다.'" },
  { id: "contributor", severity: "legendary", template: "사르트르: '타인은 지옥이다.' {topContributor}님: '팀원은 지옥이다.'" },

  // === 추가 뉴스/신문 변형 ===
  { id: "contributor", severity: "mild", template: "[사설] 기여자 {totalContributors}명 프로젝트, {topContributor}님의 헌신에 박수를." },
  { id: "contributor", severity: "medium", template: "[논설] 팀 프로젝트의 기여 불균형, 해결책은 있는가?" },
  { id: "contributor", severity: "savage", template: "[기고] '나는 왜 팀에서 혼자 코딩하는가' — {topContributor}님의 고백." },
  { id: "contributor", severity: "legendary", template: "[부고] 이 레포의 팀워크가 사망했습니다. 향년 {total}커밋. 유가족: {topContributor}님." },

  // === 추가 격투기/대회 비유 ===
  { id: "contributor", severity: "mild", template: "기여 챔피언: {topContributor}님! 챌린저: 없음. 부전승." },
  { id: "contributor", severity: "medium", template: "기여 복싱: {topContributor}님 TKO 승. 상대(나머지) 전원 불참." },
  { id: "contributor", severity: "savage", template: "기여 대전: {topContributor}님 vs 나머지 {totalContributors}명. 결과: {topContributor}님 압승. 나머지 리타이어." },
  { id: "contributor", severity: "legendary", template: "기여 올림픽 결과: 금메달 {topContributor}님, 은메달 해당 없음, 동메달 해당 없음. 다른 참가자 전원 기권." },

  // === 추가 최종 ===
  { id: "contributor", severity: "mild", template: "이 프로젝트를 지켜주셔서 감사합니다, {topContributor}님." },
  { id: "contributor", severity: "mild", template: "기여자가 적어도 프로젝트의 가치는 사람 수로 정해지지 않아요." },
  { id: "contributor", severity: "mild", template: "{total}커밋이면 적지 않아요. {topContributor}님의 땀이 담겨있어요." },
  { id: "contributor", severity: "medium", template: "기여 개선을 위해: 이슈 분배, 코드 리뷰 의무화, 스프린트 목표 설정을 추천해요." },
  { id: "contributor", severity: "medium", template: "팀 빌딩이 필요해요. 코드만큼 사람도 중요합니다." },
  { id: "contributor", severity: "savage", template: "나머지 기여자들에게: 커밋 한 개도 안 하는 건 팀이 아니에요." },
  { id: "contributor", severity: "savage", template: "이 기여 패턴이 계속되면 {topContributor}님이 떠나는 날 프로젝트도 끝이에요." },
  { id: "contributor", severity: "legendary", template: "이 로스트의 핵심: {topContributor}님은 영웅. 나머지는 무임승차. Git은 거짓말하지 않아요." },
  { id: "contributor", severity: "legendary", template: "CONCLUSION: {totalContributors} names in the contributor list. 1 real contributor: {topContributor}. The rest? Digital ghosts." },

  // ============================================================
  // 최최종 보강 — 60+ 추가
  // ============================================================
  { id: "contributor", severity: "mild", template: "{topContributor}님의 열정은 진짜예요. 커밋이 증명합니다." },
  { id: "contributor", severity: "mild", template: "솔로든 팀이든 결과물이 있으면 됐어요." },
  { id: "contributor", severity: "mild", template: "기여자가 적어도 코드가 돌아가면 성공이에요." },
  { id: "contributor", severity: "mild", template: "{totalContributors}명의 시작. 앞으로 더 늘어나길." },
  { id: "contributor", severity: "mild", template: "혼자 해도 대단해요. {total}커밋이나 하셨잖아요." },
  { id: "contributor", severity: "mild", template: "기여 비율은 완벽할 수 없어요. 중요한 건 프로젝트가 살아있다는 것." },
  { id: "contributor", severity: "mild", template: "{topContributor}님 덕분에 이 프로젝트가 존재해요." },
  { id: "contributor", severity: "mild", template: "팀원 수보다 팀원의 질이 중요해요. {topContributor}님은 A급." },
  { id: "contributor", severity: "mild", template: "기여자 {totalContributors}명. 더 성장할 프로젝트이길 바랍니다." },
  { id: "contributor", severity: "mild", template: "프로젝트의 시작은 한 사람의 커밋부터. {topContributor}님이 그 한 사람." },
  { id: "contributor", severity: "medium", template: "기여가 한쪽으로 쏠리면 코드의 다양성이 떨어져요." },
  { id: "contributor", severity: "medium", template: "버스 팩터 1은 위험해요. 백업 기여자를 키우세요." },
  { id: "contributor", severity: "medium", template: "{topContributor}님이 모든 걸 알고 있으면 지식 공유가 필요해요." },
  { id: "contributor", severity: "medium", template: "코드 오너십이 한 사람에게 집중되면 리뷰 품질이 떨어져요." },
  { id: "contributor", severity: "medium", template: "기여 분산은 프로젝트 건강의 척도예요." },
  { id: "contributor", severity: "medium", template: "나머지 기여자들이 활발해지면 프로젝트가 두 배로 좋아질 거예요." },
  { id: "contributor", severity: "medium", template: "팀원 교육에 시간을 투자하세요. 장기적으로 이익이에요." },
  { id: "contributor", severity: "medium", template: "기여 비율 {topContributorRatio}%는 리더의 부담이 크다는 신호예요." },
  { id: "contributor", severity: "medium", template: "코드 리뷰만 잘 해도 기여도가 올라가요. 나머지 팀원들에게 전해주세요." },
  { id: "contributor", severity: "medium", template: "이슈 트래킹을 잘 하면 기여 기회가 명확해져요." },
  { id: "contributor", severity: "savage", template: "기여 안 하는 팀원은 기여자가 아니라 관찰자예요." },
  { id: "contributor", severity: "savage", template: "나머지 {totalContributors}명에게: README 수정도 기여지만 그것만 하면 안 돼요." },
  { id: "contributor", severity: "savage", template: "기여자 목록에서 비활성 기여자를 정리하면 {topContributor}님만 남아요." },
  { id: "contributor", severity: "savage", template: "이 팀에서 유일하게 git push 권한이 필요한 사람: {topContributor}님." },
  { id: "contributor", severity: "savage", template: "나머지 기여자들의 최근 활동: '이 레포를 구경함.' 끝." },
  { id: "contributor", severity: "savage", template: "팀 회의에서 기여 비율 공유하면 나머지 팀원들이 고개를 숙일 거예요." },
  { id: "contributor", severity: "savage", template: "기여하지 않으면 기여자가 아니에요. 이름만 올려놓은 거예요." },
  { id: "contributor", severity: "savage", template: "이 레포의 active contributors: 1명. inactive: {totalContributors}명." },
  { id: "contributor", severity: "savage", template: "나머지 팀원들의 커밋 메시지 예상: 'initial commit', 'Update README.md'. 그게 전부." },
  { id: "contributor", severity: "savage", template: "기여율로 팀 평가하면 {topContributor}님만 패스. 나머지 전원 불합격." },
  { id: "contributor", severity: "legendary", template: "이 레포의 진짜 기여자 수: 1. 공식 기여자 수: {totalContributors}. 괴리: {totalContributors}-1명." },
  { id: "contributor", severity: "legendary", template: "만약 이 레포가 사람이라면 {topContributor}님이 심장이에요. 나머지는 부록(맹장)." },
  { id: "contributor", severity: "legendary", template: "이 팀의 역사를 기록한다면: '제1장: {topContributor}가 시작하다. 제2장~제끝장: {topContributor}가 혼자 하다.'" },
  { id: "contributor", severity: "legendary", template: "기여 비율을 보면 이건 오픈소스가 아니라 {topContributor}님의 개인 블로그예요." },
  { id: "contributor", severity: "legendary", template: "이 레포에 대한 한 줄 평: '{topContributor}님의 피, 땀, 그리고 커밋으로 만들어진 작품.'" },

  // === 추가 대화체 ===
  { id: "contributor", severity: "mild", template: "'{topContributor}님, 혼자 하기 힘들지 않아요?' '네, 근데 아무도 안 도와줘서요.'" },
  { id: "contributor", severity: "medium", template: "'왜 기여 안 해요?' '바빠서요.' '뭐가 바빠요?' '...'" },
  { id: "contributor", severity: "savage", template: "'커밋 좀 해주세요.' '아 네 다음 주에요.' (3개월 후) '아 네 다음 주에요.'" },
  { id: "contributor", severity: "legendary", template: "'이 프로젝트 같이 해요!' '좋아요!' (1년 후) 기여: {topContributor} 99%, 나머지 1%." },

  // === 추가 독특한 비유 ===
  { id: "contributor", severity: "mild", template: "{topContributor}님은 프로젝트의 GPS. 방향을 제시하고 길을 안내하는." },
  { id: "contributor", severity: "medium", template: "이 레포는 {topContributor}님의 정원이에요. 나머지는 정원을 지나가는 행인." },
  { id: "contributor", severity: "savage", template: "{topContributor}님이 의사면 나머지는 환자가 아니라 대기실 의자. 앉혀만 있는." },
  { id: "contributor", severity: "legendary", template: "이 프로젝트는 {topContributor}님이라는 별과 그 주위를 도는 먼지들(나머지)의 이야기." },

  // === 최종 한 줄 마무리 ===
  { id: "contributor", severity: "mild", template: "기여는 수치가 아니라 마음이에요. 하지만 수치도 좀 올려주세요." },
  { id: "contributor", severity: "medium", template: "이 팀의 키워드: {topContributor}, 불균형, 개선 필요." },
  { id: "contributor", severity: "savage", template: "기여 한 줄 요약: {topContributor}님 = ALL, 나머지 = NOTHING." },
  { id: "contributor", severity: "legendary", template: "THE FINAL ROAST: {topContributor}님 혼자 {topContributorRatio}%. 이 숫자가 모든 걸 말해요." },

  // === 보너스 추가 ===
  { id: "contributor", severity: "mild", template: "솔로 비율 {soloRatio}%면 이 프로젝트의 색깔은 {topContributor}님의 색깔이에요." },
  { id: "contributor", severity: "medium", template: "{soloRatio}% 솔로 비율. 나머지의 색깔은 투명색." },
  { id: "contributor", severity: "savage", template: "솔로 비율 {soloRatio}%. 팀의 존재 이유를 재고해보세요." },
  { id: "contributor", severity: "legendary", template: "솔로 비율 {soloRatio}%. '팀'이라는 단어가 이 레포에서 퇴출당해야 해요." },
  { id: "contributor", severity: "mild", template: "{total}개의 커밋이 하나의 이야기를 만들었어요. 주인공: {topContributor}님." },
  { id: "contributor", severity: "medium", template: "커밋 {total}개. 기여자 {totalContributors}명. 현실: 1인 프로젝트." },
  { id: "contributor", severity: "savage", template: "{total}커밋의 무게를 {topContributor}님 혼자 지고 있어요." },
  { id: "contributor", severity: "legendary", template: "{total}커밋, {totalContributors}기여자, {topContributor}님 {topContributorRatio}%. 숫자는 거짓말하지 않습니다." },
  { id: "contributor", severity: "legendary", template: "이 로스트를 {totalContributors}명의 기여자 전원이 읽어야 합니다. 특히 나머지. {topContributor}님은 이미 아시니까." },
];
