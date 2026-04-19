import type { RoastTemplate } from "../../types.ts";

export const languageTemplates: RoastTemplate[] = [
  // ============================================================
  // 설정 파일(config) 비율이 높은 경우 — mild
  // ============================================================
  { id: "language", severity: "mild", template: "설정 파일 비율 {configRatio}%. 코드보다 설정이 좀 많긴 하네요." },
  { id: "language", severity: "mild", template: "config 파일이 {configRatio}%를 차지하네요. 설정도 코딩이죠, 뭐." },
  { id: "language", severity: "mild", template: "{configRatio}%가 설정 파일이라니. 정리 좀 하면 깔끔해질 거예요." },
  { id: "language", severity: "mild", template: "설정 파일 비율이 {configRatio}%... 설정 장인의 시작인가요?" },
  { id: "language", severity: "mild", template: "JSON, YAML이 좀 보이긴 하네요. {configRatio}%면 아직 괜찮아요." },
  { id: "language", severity: "mild", template: "설정 비율 {configRatio}%. 프로젝트 세팅에 정성을 쏟으셨군요." },
  { id: "language", severity: "mild", template: "config 파일 {configRatio}%. 기반을 탄탄히 하는 스타일이시네요." },
  { id: "language", severity: "mild", template: "설정 파일이 {configRatio}%... 아직은 프로젝트 초기 세팅 중이시죠?" },
  { id: "language", severity: "mild", template: "{configRatio}%의 설정 파일. 꼼꼼한 성격이 느껴집니다." },
  { id: "language", severity: "mild", template: "설정 파일이 좀 있긴 하지만 {configRatio}%면 봐줄 만해요." },
  { id: "language", severity: "mild", template: "config {configRatio}%. 프로젝트 설정에 신경을 좀 쓰시는 편이군요." },
  { id: "language", severity: "mild", template: "설정 파일 비율이 {configRatio}%네요. 개발 환경에 투자하는 타입?" },
  { id: "language", severity: "mild", template: "{configRatio}% 설정이면 아직 건전한 수준입니다." },
  { id: "language", severity: "mild", template: "설정 파일 좀 있네요. {configRatio}%면 나쁘지 않아요." },
  { id: "language", severity: "mild", template: "config 비율 {configRatio}%. .rc 파일 수집가의 시작점이에요." },

  // 설정 파일(config) 비율이 높은 경우 — medium
  { id: "language", severity: "medium", template: "설정 파일 {configRatio}%... 코드 쓰러 온 건지 설정하러 온 건지 모르겠네요." },
  { id: "language", severity: "medium", template: "{configRatio}%가 설정이라니. 본업이 DevOps이신 건 아닌지?" },
  { id: "language", severity: "medium", template: "설정 파일이 {configRatio}%. 코드보다 설정이 많으면 뭘 개발하는 거죠?" },
  { id: "language", severity: "medium", template: "config 파일 비율 {configRatio}%. eslint, prettier, tsconfig... 다 모으셨네요." },
  { id: "language", severity: "medium", template: "{configRatio}%의 설정 파일. 설정하느라 코딩할 시간이 없으셨겠어요." },
  { id: "language", severity: "medium", template: "설정 파일이 {configRatio}%... rc 파일 수집이 취미이신가요?" },
  { id: "language", severity: "medium", template: "config 비율 {configRatio}%. 프로젝트 루트에 점(.) 파일이 몇 개예요?" },
  { id: "language", severity: "medium", template: "설정 {configRatio}%... 이 프로젝트의 진짜 언어는 JSON인 것 같아요." },
  { id: "language", severity: "medium", template: "{configRatio}% 설정이면 이건 코드 저장소가 아니라 설정 저장소예요." },
  { id: "language", severity: "medium", template: "설정 파일 비율 {configRatio}%. 레포 이름을 dotfiles로 바꾸시는 건 어떨까요?" },
  { id: "language", severity: "medium", template: "config {configRatio}%. 설정 파일에 설정하는 설정이 있는 수준이네요." },
  { id: "language", severity: "medium", template: "설정 비율 {configRatio}%. package.json 하나면 될 걸 왜 이렇게 많이?" },
  { id: "language", severity: "medium", template: "{configRatio}% 설정... 프로젝트 세팅만 3일 걸리셨겠어요." },
  { id: "language", severity: "medium", template: "설정 파일이 {configRatio}%. 설정 파일끼리 의존성 생기는 건 아닌지 걱정됩니다." },
  { id: "language", severity: "medium", template: "config 비율 {configRatio}%... 이 정도면 설정 러시안 인형이에요." },

  // 설정 파일(config) 비율이 높은 경우 — savage
  { id: "language", severity: "savage", template: "설정 파일 {configRatio}%! 코드는 어디 있나요? 설정 사이에 숨어있나요?" },
  { id: "language", severity: "savage", template: "{configRatio}%가 설정이라니... 이건 개발이 아니라 설정 놀이예요." },
  { id: "language", severity: "savage", template: "설정 파일 비율 {configRatio}%. 레포의 절반이 JSON/YAML이네요. 코드 쓰세요 코드." },
  { id: "language", severity: "savage", template: "config {configRatio}%. 이 프로젝트는 실행되는 게 아니라 설정되는 거군요." },
  { id: "language", severity: "savage", template: "설정 {configRatio}%... '설정하다가 번아웃'이 이력서에 적혀도 놀랍지 않겠어요." },
  { id: "language", severity: "savage", template: "{configRatio}% 설정. 프로젝트가 아니라 rc 파일 박물관이에요." },
  { id: "language", severity: "savage", template: "설정 파일 비율 {configRatio}%... 이 정도면 코드보다 설정 디버깅에 시간 더 쓰시겠네요." },
  { id: "language", severity: "savage", template: "config {configRatio}%. 설정 파일 하나 지울 때마다 빌드 깨지는 스타일?" },
  { id: "language", severity: "savage", template: "{configRatio}%가 설정... 당신의 진짜 스킬은 'YAML 엔지니어링'이군요." },
  { id: "language", severity: "savage", template: "설정 {configRatio}%. 이력서에 '설정 파일 장인' 추가하세요." },
  { id: "language", severity: "savage", template: "config 비율 {configRatio}%... 코드 한 줄 쓰려면 설정 열 줄이 필요한 구조?" },
  { id: "language", severity: "savage", template: "설정 파일이 {configRatio}%. 이건 마치 이케아 가구처럼 설명서가 본체보다 큰 격이에요." },
  { id: "language", severity: "savage", template: "{configRatio}% 설정이면 git clone 후 설정하는 데 반나절이겠네요." },
  { id: "language", severity: "savage", template: "설정 비율 {configRatio}%... 설정 파일들이 서로 참조하면서 생태계를 이루고 있겠네요." },
  { id: "language", severity: "savage", template: "config {configRatio}%. 새 팀원이 오면 설정 파악에만 일주일 걸리겠어요." },

  // 설정 파일(config) 비율이 높은 경우 — legendary
  { id: "language", severity: "legendary", template: "설정 파일 {configRatio}%! 축하합니다, 이건 코드 저장소가 아니라 설정 지옥이에요." },
  { id: "language", severity: "legendary", template: "{configRatio}%가 설정... 이 레포는 config 파일이 독립 선언을 했어요." },
  { id: "language", severity: "legendary", template: "config {configRatio}%! 코드를 설정으로 감싸고 설정을 코드로 감싸는 무한루프." },
  { id: "language", severity: "legendary", template: "설정 {configRatio}%... 당신은 개발자가 아니라 설정의 화신이에요." },
  { id: "language", severity: "legendary", template: "{configRatio}% 설정! 이 레포를 열면 JSON 파일이 쏟아져 나오겠네요." },
  { id: "language", severity: "legendary", template: "설정 파일 {configRatio}%. 설정으로 설정을 설정하는 설정 인셉션." },
  { id: "language", severity: "legendary", template: "config {configRatio}%! DevOps 팀에서 당신을 영입하고 싶어할 거예요... 아니, 무서워할 거예요." },
  { id: "language", severity: "legendary", template: "설정 비율 {configRatio}%... 이 프로젝트의 README는 '설정 가이드'이자 소설이겠네요." },
  { id: "language", severity: "legendary", template: "{configRatio}%가 설정이면 나머지 코드가 설정 파싱하는 코드인 건 아닌지..." },
  { id: "language", severity: "legendary", template: "config {configRatio}%! 이 정도면 설정 파일에 대한 설정 파일이 있을 듯." },

  // ============================================================
  // .md 파일만 많은 경우 (문서 개발자) — mild
  // ============================================================
  { id: "language", severity: "mild", template: "마크다운 비율 {mdRatio}%. 문서화에 신경 쓰시는군요." },
  { id: "language", severity: "mild", template: ".md 파일 {mdRatio}%. 좋은 문서는 좋은 프로젝트의 시작이죠." },
  { id: "language", severity: "mild", template: "마크다운 {mdRatio}%. README를 열심히 쓰시는 타입이시네요." },
  { id: "language", severity: "mild", template: "md 비율 {mdRatio}%... 문서화 좋아하시는 분이군요!" },
  { id: "language", severity: "mild", template: "{mdRatio}%가 마크다운이라니. 개발자 중 문서화 챔피언이시네요." },
  { id: "language", severity: "mild", template: "마크다운 파일 {mdRatio}%. 팀원들이 감사해하겠어요." },
  { id: "language", severity: "mild", template: ".md {mdRatio}%. 문서가 코드만큼 중요하다는 걸 아시는 분." },
  { id: "language", severity: "mild", template: "마크다운 비율 {mdRatio}%... 기술 블로그 하시면 잘하실 듯." },
  { id: "language", severity: "mild", template: "md 파일 {mdRatio}%. 깃허브 프로필이 초록초록하겠네요." },
  { id: "language", severity: "mild", template: "{mdRatio}% 마크다운. 문서화의 중요성을 아는 개발자!" },
  { id: "language", severity: "mild", template: "마크다운 {mdRatio}%. README 맛집이시네요." },
  { id: "language", severity: "mild", template: ".md 비율 {mdRatio}%. 코드만큼 글도 잘 쓰시나 봐요." },
  { id: "language", severity: "mild", template: "마크다운 파일이 {mdRatio}%. 문서 작성도 개발의 일부죠." },

  // .md 파일만 많은 경우 — medium
  { id: "language", severity: "medium", template: "마크다운 {mdRatio}%... 코드보다 문서가 많으면 뭘 개발하는 거예요?" },
  { id: "language", severity: "medium", template: ".md 파일 비율 {mdRatio}%. 혹시 테크 블로거이신가요?" },
  { id: "language", severity: "medium", template: "마크다운 비율 {mdRatio}%. 문서화를 넘어서 문학의 경지에 올랐네요." },
  { id: "language", severity: "medium", template: "md {mdRatio}%... 이 레포는 위키인가요 코드인가요?" },
  { id: "language", severity: "medium", template: "{mdRatio}%가 마크다운이면 개발보다 글쓰기를 더 좋아하시는 듯." },
  { id: "language", severity: "medium", template: "마크다운 {mdRatio}%. 코드는 안 짜도 문서는 꼬박꼬박 쓰시네요." },
  { id: "language", severity: "medium", template: ".md 비율 {mdRatio}%... 프로젝트 이름을 '나의 개발 일기'로 바꾸실 건가요?" },
  { id: "language", severity: "medium", template: "마크다운 파일 {mdRatio}%. README가 소설 분량이겠어요." },
  { id: "language", severity: "medium", template: "md {mdRatio}%... TODO.md, PLAN.md, IDEA.md 다 있으시죠?" },
  { id: "language", severity: "medium", template: "{mdRatio}% 마크다운. 문서 개발자 타이틀 달아드릴까요?" },
  { id: "language", severity: "medium", template: "마크다운 비율 {mdRatio}%. 깃허브를 노션처럼 쓰시는 건가요?" },
  { id: "language", severity: "medium", template: ".md {mdRatio}%... 코드 커밋보다 문서 커밋이 더 많은 건 아닌지." },
  { id: "language", severity: "medium", template: "마크다운 {mdRatio}%. 이 정도면 출판사에 원고 넣어도 되겠어요." },

  // .md 파일만 많은 경우 — savage
  { id: "language", severity: "savage", template: "마크다운 {mdRatio}%! 이건 코드 저장소가 아니라 위키피디아 분점이에요." },
  { id: "language", severity: "savage", template: ".md 비율 {mdRatio}%... 코딩 대신 기술 블로그 창업하세요." },
  { id: "language", severity: "savage", template: "마크다운 비율 {mdRatio}%. 실행되는 코드가 있긴 한 건가요?" },
  { id: "language", severity: "savage", template: "md {mdRatio}%! 이 프로젝트의 주 언어는 English(Markdown)이군요." },
  { id: "language", severity: "savage", template: "{mdRatio}%가 마크다운... '기획만 하고 구현은 안 하는 사람' 아시죠?" },
  { id: "language", severity: "savage", template: "마크다운 {mdRatio}%. README가 코드베이스보다 큰 전설적인 레포." },
  { id: "language", severity: "savage", template: ".md 파일 {mdRatio}%... '아이디어는 많은데 구현은...' 이런 느낌이에요." },
  { id: "language", severity: "savage", template: "마크다운 비율 {mdRatio}%. 문서로 세상을 바꾸려는 의지가 느껴지네요." },
  { id: "language", severity: "savage", template: "md {mdRatio}%... git log가 전부 'docs:' 프리픽스이겠네요." },
  { id: "language", severity: "savage", template: "{mdRatio}% 마크다운! 이건 개발자가 아니라 기술 작가예요." },
  { id: "language", severity: "savage", template: "마크다운 {mdRatio}%. 코드 리뷰 대신 문서 교정을 해야 하는 건가요?" },
  { id: "language", severity: "savage", template: ".md {mdRatio}%... 프로젝트를 실행하면 README가 실행되나요?" },

  // .md 파일만 많은 경우 — legendary
  { id: "language", severity: "legendary", template: "마크다운 {mdRatio}%! 축하합니다, 당신은 세계 최고의 마크다운 엔지니어입니다." },
  { id: "language", severity: "legendary", template: ".md {mdRatio}%! 이 레포를 열면 소설이 시작됩니다." },
  { id: "language", severity: "legendary", template: "마크다운 {mdRatio}%! 이건 깃허브가 아니라 미디엄이에요." },
  { id: "language", severity: "legendary", template: "md 비율 {mdRatio}%! 프로젝트명: '코딩 대신 글쓰기'." },
  { id: "language", severity: "legendary", template: "{mdRatio}%가 마크다운! 당신의 풀스택은 Markdown + 더 많은 Markdown이군요." },
  { id: "language", severity: "legendary", template: "마크다운 {mdRatio}%! 이력서에 '주력 언어: Markdown' 적으시면 됩니다." },
  { id: "language", severity: "legendary", template: ".md 파일 {mdRatio}%! 깃허브가 아니라 Notion으로 이사하세요." },
  { id: "language", severity: "legendary", template: "마크다운 {mdRatio}%! README에 목차가 3단계이고 부록까지 있는 거 아니에요?" },

  // ============================================================
  // 한 가지 언어만 쓰는 경우 — mild
  // ============================================================
  { id: "language", severity: "mild", template: "{topLang} 비율 {topLangRatio}%. 한 우물을 파시는군요." },
  { id: "language", severity: "mild", template: "전체의 {topLangRatio}%가 {topLang}이라니. 전문가 느낌 물씬." },
  { id: "language", severity: "mild", template: "{topLang}만 {topLangRatio}%. 다른 언어도 맛보시면 세계가 넓어질 거예요." },
  { id: "language", severity: "mild", template: "주력 언어 {topLang} {topLangRatio}%. 전문성은 인정합니다." },
  { id: "language", severity: "mild", template: "{topLangRatio}%가 {topLang}... 충성도가 높으시네요!" },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%. 한 가지를 깊게 파는 장인 스타일." },
  { id: "language", severity: "mild", template: "{topLang}이 {topLangRatio}%를 차지하네요. 사랑하는 언어가 있다는 건 좋은 거예요." },
  { id: "language", severity: "mild", template: "전체 {topLangRatio}%가 {topLang}. T자형 인재의 세로 부분이시군요." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%... 이 정도면 {topLang} 마스터라 불러도 되겠네요." },
  { id: "language", severity: "mild", template: "주 언어가 {topLang}({topLangRatio}%). 심플한 스택이 최고죠." },
  { id: "language", severity: "mild", template: "{topLangRatio}% {topLang}. 집중력 하나는 대단하세요." },
  { id: "language", severity: "mild", template: "{topLang} 비율이 {topLangRatio}%. 흔들리지 않는 편이시네요." },
  { id: "language", severity: "mild", template: "거의 {topLang} 일색이네요({topLangRatio}%). 프로 의식이 느껴집니다." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%. 이 레포는 {topLang}의 성지군요." },
  { id: "language", severity: "mild", template: "메인 언어 {topLang} {topLangRatio}%. 꽤 일관된 기술 스택이에요." },

  // 한 가지 언어만 쓰는 경우 — medium
  { id: "language", severity: "medium", template: "{topLang}이 {topLangRatio}%라니. 다른 언어도 존재하는 거 아시죠?" },
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%... 이건 전문성이 아니라 편식이에요." },
  { id: "language", severity: "medium", template: "전체의 {topLangRatio}%가 {topLang}. 다른 언어는 듣보잡인가요?" },
  { id: "language", severity: "medium", template: "{topLang}만 {topLangRatio}%. 이력서 기술 스택란이 한 줄이겠네요." },
  { id: "language", severity: "medium", template: "{topLangRatio}%가 {topLang}이면 이건 모노글랏(monoglot)이에요." },
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%. 다른 언어를 쓰면 손이 거부하시나요?" },
  { id: "language", severity: "medium", template: "주력이 {topLang} {topLangRatio}%... 유연성이라는 단어를 아시나요?" },
  { id: "language", severity: "medium", template: "{topLang}에 올인({topLangRatio}%). 주식처럼 분산투자 좀 하세요." },
  { id: "language", severity: "medium", template: "{topLangRatio}% {topLang}. 다른 언어 튜토리얼이라도 한번 보시는 건?" },
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%. 이 정도면 다른 언어를 쓰면 알러지가 나오시나요?" },
  { id: "language", severity: "medium", template: "거의 전부가 {topLang}({topLangRatio}%). 세상에는 수백 개의 언어가 있어요." },
  { id: "language", severity: "medium", template: "{topLang}만 {topLangRatio}%. 마치 한 가지 음식만 먹는 것 같아요." },
  { id: "language", severity: "medium", template: "{topLangRatio}%의 {topLang}... 컴포트 존에서 나오실 생각은 없으신가요?" },
  { id: "language", severity: "medium", template: "{topLang} 올인 {topLangRatio}%. 리스크 관리가 0이시군요." },
  { id: "language", severity: "medium", template: "{topLang}이 {topLangRatio}%. 면접에서 '다양한 언어 경험'은 어떻게 답하시나요?" },

  // 한 가지 언어만 쓰는 경우 — savage
  { id: "language", severity: "savage", template: "{topLang} {topLangRatio}%! {topLang} 빼면 시체인 레포네요." },
  { id: "language", severity: "savage", template: "{topLangRatio}%가 {topLang}이라니! 세상에 언어가 하나인 줄 아시나요?" },
  { id: "language", severity: "savage", template: "{topLang}만 {topLangRatio}%. '못 하는 게 아니라 안 하는 거'라고요? 확인이 안 되는데요." },
  { id: "language", severity: "savage", template: "{topLang} {topLangRatio}%... 이건 충성이 아니라 감금이에요." },
  { id: "language", severity: "savage", template: "전체 {topLangRatio}%가 {topLang}! 다른 언어를 봤을 때 문화 충격 받으실 듯." },
  { id: "language", severity: "savage", template: "{topLang} {topLangRatio}%. 당신의 기술 스택: {topLang}. 끝. 마침표." },
  { id: "language", severity: "savage", template: "{topLangRatio}% {topLang}! {topLang}이 없어지면 개발자 은퇴하시는 건가요?" },
  { id: "language", severity: "savage", template: "{topLang}만 {topLangRatio}%... 이건 개발이 아니라 {topLang} 신앙 생활이에요." },
  { id: "language", severity: "savage", template: "{topLang} {topLangRatio}%. 면접관: '다른 언어는요?' 당신: '...'." },
  { id: "language", severity: "savage", template: "{topLangRatio}%가 {topLang}. 편식도 이 정도면 영양실조예요." },
  { id: "language", severity: "savage", template: "{topLang} {topLangRatio}%! 이력서에 '주력: {topLang}, 부력: {topLang}'이라 적겠네요." },
  { id: "language", severity: "savage", template: "{topLang}만 {topLangRatio}%. 이건 한 우물이 아니라 우물에 갇힌 거예요." },

  // 한 가지 언어만 쓰는 경우 — legendary
  { id: "language", severity: "legendary", template: "{topLang} {topLangRatio}%! 당신은 {topLang}의 육신화(化身)입니다." },
  { id: "language", severity: "legendary", template: "{topLangRatio}%가 {topLang}! 이건 개발자가 아니라 {topLang} 포교사에요." },
  { id: "language", severity: "legendary", template: "{topLang}만 {topLangRatio}%... 나머지 언어들이 당신에게 무슨 잘못을 한 건가요?" },
  { id: "language", severity: "legendary", template: "{topLang} {topLangRatio}%! 바벨탑 무너져도 당신은 상관없겠네요. 어차피 {topLang}만 아니까." },
  { id: "language", severity: "legendary", template: "{topLangRatio}% {topLang}! 당신의 뇌가 {topLang} 인터프리터인 건 아닌지 의심됩니다." },
  { id: "language", severity: "legendary", template: "{topLang} {topLangRatio}%! DNA에 {topLang}이 새겨져 있으신 듯." },
  { id: "language", severity: "legendary", template: "{topLang}만 {topLangRatio}%! 유서도 {topLang}으로 쓰실 거 아니에요?" },
  { id: "language", severity: "legendary", template: "{topLangRatio}%의 {topLang}! 이건 인간이 아니라 {topLang} 컴파일러가 커밋한 거 아닌가요?" },

  // ============================================================
  // 10개+ 언어 사용 (폴리글랏) — mild
  // ============================================================
  { id: "language", severity: "mild", template: "사용 언어 {totalLangs}개! 폴리글랏이시네요." },
  { id: "language", severity: "mild", template: "{totalLangs}개 언어를 쓰시다니. 호기심이 많으시군요." },
  { id: "language", severity: "mild", template: "무려 {totalLangs}개 언어... 다재다능한 개발자시네요!" },
  { id: "language", severity: "mild", template: "{totalLangs}개의 언어를 다루시네요. 풀스택 그 이상이시군요." },
  { id: "language", severity: "mild", template: "언어 {totalLangs}개 사용. 배움에 끝이 없으신 분이에요." },
  { id: "language", severity: "mild", template: "{totalLangs}개 언어라니. 이력서가 화려하시겠어요." },
  { id: "language", severity: "mild", template: "사용 언어가 {totalLangs}개... 언어 수집가이시네요!" },
  { id: "language", severity: "mild", template: "{totalLangs}개 언어 사용자. 다양성은 힘이죠." },
  { id: "language", severity: "mild", template: "언어가 {totalLangs}개나! 어떤 문제든 해결할 도구가 있으시겠네요." },
  { id: "language", severity: "mild", template: "{totalLangs}개 언어... 학습 능력이 뛰어나신 게 분명합니다." },
  { id: "language", severity: "mild", template: "사용 언어 {totalLangs}개. T자형 인재의 가로가 아주 넓으시네요." },
  { id: "language", severity: "mild", template: "{totalLangs}개 언어 사용 중! 개발 세계의 세계 여행자시군요." },

  // 10개+ 언어 (폴리글랏) — medium
  { id: "language", severity: "medium", template: "{totalLangs}개 언어... 이건 폴리글랏이 아니라 결정장애 아닌가요?" },
  { id: "language", severity: "medium", template: "사용 언어 {totalLangs}개. 하나라도 제대로 하시는 건 있나요?" },
  { id: "language", severity: "medium", template: "{totalLangs}개 언어를 쓴다고요? 잡학다식도 정도가 있어요." },
  { id: "language", severity: "medium", template: "무려 {totalLangs}개 언어... 'Hello World' 수집가이시죠?" },
  { id: "language", severity: "medium", template: "{totalLangs}개 언어 사용. 넓고 얕은 지식의 표본이시네요." },
  { id: "language", severity: "medium", template: "언어가 {totalLangs}개라니. 튜토리얼만 끝내고 넘어가시는 타입?" },
  { id: "language", severity: "medium", template: "{totalLangs}개 언어... 면접에서 '주력 언어가 뭔가요?'에 뭐라고 답하시나요?" },
  { id: "language", severity: "medium", template: "사용 언어 {totalLangs}개. 한 우물 대신 수십 개의 웅덩이를 파시는 전략?" },
  { id: "language", severity: "medium", template: "{totalLangs}개 언어 사용 중... 일주일마다 새 언어 배우시나요?" },
  { id: "language", severity: "medium", template: "무려 {totalLangs}개 언어. 이건 풀스택이 아니라 오버플로우 스택이에요." },
  { id: "language", severity: "medium", template: "{totalLangs}개 언어라니. 프로젝트마다 다른 언어 쓰시는 건가요?" },
  { id: "language", severity: "medium", template: "사용 언어 {totalLangs}개... 기술 면접 볼 때 준비할 게 너무 많으시겠어요." },
  { id: "language", severity: "medium", template: "{totalLangs}개 언어 사용자. 잭 오브 올 트레이드, 마스터 오브 논?" },

  // 10개+ 언어 (폴리글랏) — savage
  { id: "language", severity: "savage", template: "{totalLangs}개 언어?! 이건 포트폴리오가 아니라 언어 동물원이에요." },
  { id: "language", severity: "savage", template: "사용 언어 {totalLangs}개! 하나도 못하는 게 {totalLangs}개인 건 아닌지..." },
  { id: "language", severity: "savage", template: "{totalLangs}개 언어를 쓴다고 자랑하지 마세요. 그중 제대로 아는 건 0개일 수 있으니까요." },
  { id: "language", severity: "savage", template: "무려 {totalLangs}개 언어! 새 프로젝트 = 새 언어 공식이시군요." },
  { id: "language", severity: "savage", template: "{totalLangs}개 언어 사용... 코드가 로제타 스톤처럼 생겼겠네요." },
  { id: "language", severity: "savage", template: "언어 {totalLangs}개! 이 레포에서 모든 Hello World를 볼 수 있겠어요." },
  { id: "language", severity: "savage", template: "{totalLangs}개 언어라니. 디버깅할 때 지금 어떤 언어인지 기억은 하시나요?" },
  { id: "language", severity: "savage", template: "사용 언어 {totalLangs}개... 이건 개발이 아니라 언어 올림픽이에요." },
  { id: "language", severity: "savage", template: "{totalLangs}개 언어! 각 언어로 '변수 선언하는 법'만 아시는 건 아니죠?" },
  { id: "language", severity: "savage", template: "{totalLangs}개 언어 사용 중. Stack Overflow에서 {totalLangs}개 태그를 구독하시겠네요." },
  { id: "language", severity: "savage", template: "무려 {totalLangs}개 언어! 당신의 IDE에는 플러그인이 몇 개 설치되어 있나요?" },
  { id: "language", severity: "savage", template: "{totalLangs}개 언어를 쓰시다니. 코드 리뷰어가 울겠어요." },

  // 10개+ 언어 (폴리글랏) — legendary
  { id: "language", severity: "legendary", template: "{totalLangs}개 언어! 당신은 프로그래밍 언어의 노아의 방주예요." },
  { id: "language", severity: "legendary", template: "사용 언어 {totalLangs}개! 새로운 언어가 나오면 반사적으로 배우시는 건가요?" },
  { id: "language", severity: "legendary", template: "{totalLangs}개 언어?! 당신의 뇌는 멀티 런타임 VM이시군요." },
  { id: "language", severity: "legendary", template: "무려 {totalLangs}개 언어! 이건 개발자가 아니라 언어학자예요." },
  { id: "language", severity: "legendary", template: "{totalLangs}개 언어 사용! 파워포인트에 'Known Languages' 슬라이드만 3장이겠네요." },
  { id: "language", severity: "legendary", template: "{totalLangs}개 언어! 당신의 .gitignore가 유엔 총회 명단보다 길겠어요." },
  { id: "language", severity: "legendary", template: "사용 언어 {totalLangs}개! 바벨탑의 건축가가 현대에 환생하셨군요." },
  { id: "language", severity: "legendary", template: "{totalLangs}개 언어를 다루시다니. 혹시 언어마다 인격이 다르신 건 아니죠?" },

  // ============================================================
  // JSON/YAML/TOML 설정 지옥 — mild
  // ============================================================
  { id: "language", severity: "mild", template: "JSON 파일이 좀 보이네요. 데이터 관리에 신경 쓰시는군요." },
  { id: "language", severity: "mild", template: "YAML 파일이 몇 개 있네요. CI/CD 설정이시죠?" },
  { id: "language", severity: "mild", template: "설정 파일 JSON/YAML이 좀 있네요. 프로젝트 기반이 탄탄하군요." },
  { id: "language", severity: "mild", template: "TOML도 쓰시네요. 세련된 설정 취향이시군요." },
  { id: "language", severity: "mild", template: "JSON/YAML 파일이 보입니다. 구조화된 데이터를 좋아하시는 듯." },
  { id: "language", severity: "mild", template: "설정 파일이 깔끔하게 정리되어 있네요. 좋은 습관이에요." },
  { id: "language", severity: "mild", template: "JSON, YAML 파일들... 체계적인 프로젝트의 증거." },
  { id: "language", severity: "mild", template: "YAML로 설정을 관리하시는군요. 현대적인 스타일이에요." },
  { id: "language", severity: "mild", template: "JSON 설정이 몇 개 보여요. 적당한 수준이에요." },
  { id: "language", severity: "mild", template: "TOML 파일이 있네요. Rust 아니면 Python 프로젝트?" },

  // JSON/YAML/TOML 설정 지옥 — medium
  { id: "language", severity: "medium", template: "JSON/YAML 파일이 좀 많네요. 설정 지옥의 입구에 서 계신 건 아닌지..." },
  { id: "language", severity: "medium", template: "YAML 파일이 이렇게 많으면 들여쓰기 실수로 밤새신 적 있으시죠?" },
  { id: "language", severity: "medium", template: "JSON 설정이 많네요. 중괄호 지옥에 오신 걸 환영합니다." },
  { id: "language", severity: "medium", template: "YAML이 많으시네요... 들여쓰기 하나 틀려서 CI 깨진 적 몇 번이에요?" },
  { id: "language", severity: "medium", template: "JSON/YAML/TOML... 설정 포맷도 결정 못하시는 건가요?" },
  { id: "language", severity: "medium", template: "YAML 파일들... 이거 하나 수정하려면 문서 3개를 읽어야 하죠." },
  { id: "language", severity: "medium", template: "JSON 설정이 넘쳐나요. package.json의 devDependencies가 본체보다 큰 건 아닌지." },
  { id: "language", severity: "medium", template: "설정 파일 포맷이 JSON, YAML, TOML 전부 있네요. 통일 좀 하세요." },
  { id: "language", severity: "medium", template: "YAML 파일 다수 발견. GitHub Actions workflow 파일만 10개?" },
  { id: "language", severity: "medium", template: "JSON 중첩이 7단계를 넘는 파일이 있을 것 같은 느낌이에요." },

  // JSON/YAML/TOML 설정 지옥 — savage
  { id: "language", severity: "savage", template: "JSON/YAML/TOML 삼중 설정 지옥! 이건 프로젝트가 아니라 설정 던전이에요." },
  { id: "language", severity: "savage", template: "YAML 파일이 너무 많아서 들여쓰기가 인생의 목적이 되셨겠어요." },
  { id: "language", severity: "savage", template: "JSON 파일이 코드보다 많으면 개발자가 아니라 데이터 입력 사원이에요." },
  { id: "language", severity: "savage", template: "설정 파일 포맷 3종 세트... 하나로 통일하면 레포 크기가 반으로 줄겠네요." },
  { id: "language", severity: "savage", template: "YAML 지옥에 오신 걸 환영합니다. 탈출구는 없습니다." },
  { id: "language", severity: "savage", template: "JSON 중첩이 마리아나 해구보다 깊은 레포. 바닥이 보이지 않아요." },
  { id: "language", severity: "savage", template: "설정 파일만 모아도 별도 저장소가 필요한 수준이에요." },
  { id: "language", severity: "savage", template: "TOML + YAML + JSON + INI... 설정 포맷 수집이 취미이신가요?" },
  { id: "language", severity: "savage", template: "이 프로젝트의 진짜 보스는 설정 파일이에요. 코드는 그냥 졸병." },
  { id: "language", severity: "savage", template: "JSON/YAML이 코드를 잡아먹었어요. 설정 파일의 반란이 시작됐습니다." },

  // JSON/YAML/TOML 설정 지옥 — legendary
  { id: "language", severity: "legendary", template: "설정 파일의 왕국! JSON, YAML, TOML이 삼국지를 펼치고 있어요." },
  { id: "language", severity: "legendary", template: "설정 지옥의 최하층에 도달하셨습니다. 단테의 인페르노가 여기였군요." },
  { id: "language", severity: "legendary", template: "YAML 들여쓰기 지옥 + JSON 중괄호 지옥 + TOML 섹션 지옥 = 당신의 레포." },
  { id: "language", severity: "legendary", template: "이 레포를 clone하면 설정 파일이 하드디스크를 잡아먹습니다." },
  { id: "language", severity: "legendary", template: "설정 파일의 신전! 고대 문명의 유적처럼 설정이 층층이 쌓여 있어요." },

  // ============================================================
  // .env 파일 많은 경우 — mild
  // ============================================================
  { id: "language", severity: "mild", template: ".env 파일이 보이네요. 환경 변수 관리를 하시는군요." },
  { id: "language", severity: "mild", template: ".env가 있네요. 12-Factor App 원칙을 따르시나 봐요." },
  { id: "language", severity: "mild", template: "환경 변수 파일이 있군요. 설정 분리를 잘 하시네요." },
  { id: "language", severity: "mild", template: ".env 파일 발견. 시크릿 관리에 신경 쓰시는 듯." },
  { id: "language", severity: "mild", template: ".env가 보여요. .gitignore에 잘 추가해두셨겠죠?" },
  { id: "language", severity: "mild", template: "환경 변수 파일이 좀 있네요. 환경별 분리를 하시는군요." },
  { id: "language", severity: "mild", template: ".env 파일이 있습니다. 배포 환경을 구분하시는 타입이시네요." },
  { id: "language", severity: "mild", template: ".env.local, .env.development... 체계적이시네요." },

  // .env 파일 많은 경우 — medium
  { id: "language", severity: "medium", template: ".env 파일이 좀 많네요... .env, .env.local, .env.dev, .env.staging, .env.prod 다 있으시죠?" },
  { id: "language", severity: "medium", template: ".env 파일 다수 발견. 혹시 이거 git에 커밋하신 건 아니죠?" },
  { id: "language", severity: "medium", template: "환경 변수 파일이 이렇게 많으면 어떤 게 진짜인지 헷갈리지 않나요?" },
  { id: "language", severity: "medium", template: ".env가 여러 개... 환경이 그렇게 많으신 건가요, 아니면 정리를 안 하신 건가요?" },
  { id: "language", severity: "medium", template: ".env 파일 컬렉션이 꽤 되시네요. 비밀번호 관리자보다 .env가 더 많은 건 아닌지." },
  { id: "language", severity: "medium", template: ".env.example은 있는데... 진짜 .env가 git에 있으면 안 되는 거 아시죠?" },
  { id: "language", severity: "medium", template: "환경 변수 파일이 많네요. API 키가 몇 개나 되시길래..." },
  { id: "language", severity: "medium", template: ".env 파일들... 이거 전부 다른 시크릿인 건가요, 복사본인 건가요?" },

  // .env 파일 많은 경우 — savage
  { id: "language", severity: "savage", template: ".env 파일이 코드보다 많으면 이건 프로젝트가 아니라 시크릿 저장소예요!" },
  { id: "language", severity: "savage", template: ".env를 git에 커밋하셨으면... 지금 당장 히스토리 정리하세요. 제발." },
  { id: "language", severity: "savage", template: "환경 변수 파일이 이렇게 많으면 Vault나 SSM 좀 쓰세요!" },
  { id: "language", severity: "savage", template: ".env 지옥! 시크릿이 평문으로 돌아다니고 있을 확률 99%." },
  { id: "language", severity: "savage", template: ".env 파일 다수... 보안팀이 보면 심장마비 올 수준이에요." },
  { id: "language", severity: "savage", template: "환경 변수 파일이 너무 많아서 어떤 게 진짜 프로덕션 키인지 당신도 모르시죠?" },
  { id: "language", severity: "savage", template: ".env를 git에 올리는 건 비밀번호를 포스트잇에 적어 모니터에 붙이는 거랑 같아요." },
  { id: "language", severity: "savage", template: ".env 파일 수 > 실제 코드 파일 수. 이건 심각한 문제예요." },

  // .env 파일 많은 경우 — legendary
  { id: "language", severity: "legendary", template: ".env 파일이 git 히스토리에! 해커들이 파티 준비 중이에요!" },
  { id: "language", severity: "legendary", template: ".env 지옥의 끝판왕! AWS 키가 공개 레포에 있으면 요금 폭탄 각이에요." },
  { id: "language", severity: "legendary", template: "환경 변수를 이렇게 관리하시면... 보안 사고는 시간문제입니다." },
  { id: "language", severity: "legendary", template: ".env를 커밋한 당신, GitHub에서 보안 경고 메일 받으신 적 있으시죠?" },
  { id: "language", severity: "legendary", template: ".env 파일의 신전! 당신의 시크릿은 이미 전 세계에 공개되었을 수 있어요." },

  // ============================================================
  // test 파일 비율 — mild
  // ============================================================
  { id: "language", severity: "mild", template: "테스트 파일이 보이네요. TDD를 실천하시는군요!" },
  { id: "language", severity: "mild", template: "test 파일이 좀 있네요. 테스트를 쓰시다니 훌륭합니다." },
  { id: "language", severity: "mild", template: "테스트 코드가 있다는 것만으로도 상위 30% 개발자예요." },
  { id: "language", severity: "mild", template: "spec/test 파일 발견. 품질에 신경 쓰시는 분이시네요." },
  { id: "language", severity: "mild", template: "테스트 파일이 있네요! 프로덕션 코드에 자신감이 있으시겠어요." },
  { id: "language", severity: "mild", template: "test 디렉토리가 있군요. 좋은 개발 문화예요." },
  { id: "language", severity: "mild", template: "테스트를 쓰시는군요. '코드 커버리지'를 아시는 분이시네요." },
  { id: "language", severity: "mild", template: "테스트 파일 발견! CI에서 초록불이 반겨주겠네요." },
  { id: "language", severity: "mild", template: "spec 파일이 몇 개 있네요. 테스트 습관이 좋으시군요." },
  { id: "language", severity: "mild", template: "테스트 코드가 있다니... 감동입니다." },

  // test 파일 비율 — medium (테스트 없는 경우)
  { id: "language", severity: "medium", template: "테스트 파일이... 없네요? YOLO 개발이시군요." },
  { id: "language", severity: "medium", template: "test 파일 0개. '내 코드는 테스트가 필요 없다'는 자신감이시군요." },
  { id: "language", severity: "medium", template: "테스트 없이 배포하시는 건가요? 프로덕션이 테스트 환경이시네요." },
  { id: "language", severity: "medium", template: "테스트 코드 0%. 사용자가 QA 팀인 프로젝트군요." },
  { id: "language", severity: "medium", template: "spec도 test도 없네요. '수동 테스트'가 당신의 CI/CD?" },
  { id: "language", severity: "medium", template: "테스트 파일이 없어요. '새벽 3시 핫픽스'가 일상이시겠네요." },
  { id: "language", severity: "medium", template: "test 디렉토리가 비어있네요. 용기가 대단하십니다." },
  { id: "language", severity: "medium", template: "테스트 없는 코드... '동작하면 건드리지 마'가 모토이신가요?" },
  { id: "language", severity: "medium", template: "테스트 0개. 'It works on my machine' 스티커 갖고 계시죠?" },
  { id: "language", severity: "medium", template: "테스트 코드가 없으면 모든 코드가 레거시입니다." },

  // test 파일 비율 — savage (테스트 전혀 없음)
  { id: "language", severity: "savage", template: "테스트 0%! 이건 코딩이 아니라 도박이에요. 매 배포가 룰렛." },
  { id: "language", severity: "savage", template: "테스트 파일 없음. 프로덕션에서 직접 디버깅하시는 전설의 개발자?" },
  { id: "language", severity: "savage", template: "test 파일 0개! 고객이 버그 리포트하면 '사양입니다'라고 하시나요?" },
  { id: "language", severity: "savage", template: "테스트 없이 이 규모의 코드를... 간이 배 밖으로 나오셨네요." },
  { id: "language", severity: "savage", template: "테스트 코드 0%. '컴파일되면 출시'가 당신의 품질 기준이에요." },
  { id: "language", severity: "savage", template: "테스트 없는 코드는 지뢰밭이에요. 그리고 당신은 눈 감고 뛰어다니는 중." },
  { id: "language", severity: "savage", template: "test 파일 0개. 리팩토링? 그건 당신에게 '처음부터 다시 만들기'와 같은 말이죠." },
  { id: "language", severity: "savage", template: "테스트 없음. 새벽에 장애 문자 받고 식은땀 흘리신 적 있으시죠?" },
  { id: "language", severity: "savage", template: "테스트 코드 0%! 'git push origin main --force'도 거침없이 하시는 분이겠네요." },
  { id: "language", severity: "savage", template: "테스트가 없어요. 모든 변경사항이 프로덕션 실험이군요." },

  // test 파일 비율 — legendary
  { id: "language", severity: "legendary", template: "테스트 0%! 이건 코드가 아니라 기도 메타예요. '제발 동작해라' 아멘." },
  { id: "language", severity: "legendary", template: "테스트 없이 프로덕션 운영 중! 당신은 개발계의 무모한 모험가입니다." },
  { id: "language", severity: "legendary", template: "test 파일 0개에 코드 수천 줄. 이건 용기가 아니라 만용이에요." },
  { id: "language", severity: "legendary", template: "테스트 코드 없음. 매일 배포할 때마다 주사위를 굴리시는 건가요?" },
  { id: "language", severity: "legendary", template: "테스트 0%! 당신의 모니터링 대시보드가 유일한 테스트인 거 맞죠?" },

  // ============================================================
  // CSS/SCSS 비율이 코드보다 높은 경우 — mild
  // ============================================================
  { id: "language", severity: "mild", template: "CSS 비율이 꽤 되네요. 디자인에 신경 쓰시는군요." },
  { id: "language", severity: "mild", template: "스타일 파일이 좀 있네요. UI에 정성을 쏟으시는 분." },
  { id: "language", severity: "mild", template: "SCSS/CSS가 보이네요. 예쁜 앱을 만드시나 봐요." },
  { id: "language", severity: "mild", template: "CSS 파일이 많네요. 픽셀 퍼펙트 추구자이시군요." },
  { id: "language", severity: "mild", template: "스타일시트가 꽤 되네요. 프론트엔드 장인이시군요." },
  { id: "language", severity: "mild", template: "CSS 비율이 높으시네요. 디자이너 출신이신가요?" },
  { id: "language", severity: "mild", template: "SCSS 파일이 있군요. 전처리기까지 쓰시는 프로." },
  { id: "language", severity: "mild", template: "스타일 코드가 많네요. UI/UX에 투자를 많이 하시는 편." },

  // CSS/SCSS 비율이 높은 경우 — medium
  { id: "language", severity: "medium", template: "CSS가 JS보다 많으면... 이건 웹앱이 아니라 패션쇼인가요?" },
  { id: "language", severity: "medium", template: "SCSS 파일이 이렇게 많으면 nesting 지옥에 빠지신 거 아니에요?" },
  { id: "language", severity: "medium", template: "CSS 비율이 높네요. !important 몇 번이나 쓰셨어요?" },
  { id: "language", severity: "medium", template: "스타일 코드가 로직보다 많으면 개발자인지 디자이너인지 모르겠어요." },
  { id: "language", severity: "medium", template: "CSS가 메인 언어시군요. Tailwind 쓰시면 반으로 줄텐데..." },
  { id: "language", severity: "medium", template: "SCSS 중첩이 5단계 이상인 파일이 있을 것 같은 예감." },
  { id: "language", severity: "medium", template: "CSS 파일이 이렇게 많으면 클래스명 충돌이 일상이시겠네요." },
  { id: "language", severity: "medium", template: "스타일시트가 넘쳐나요. CSS-in-JS 들어보셨나요?" },
  { id: "language", severity: "medium", template: "CSS 비율이 코드를 압도해요. 이 앱의 본질은 스타일이군요." },
  { id: "language", severity: "medium", template: "SCSS 파일 다수 발견. @extend와 @mixin의 전쟁터겠네요." },

  // CSS/SCSS 비율 높은 경우 — savage
  { id: "language", severity: "savage", template: "CSS가 전체 코드의 대부분! 이건 앱이 아니라 CSS 아트 전시회예요." },
  { id: "language", severity: "savage", template: "SCSS가 이렇게 많으면 컴파일 시간이 빌드 시간보다 길겠네요." },
  { id: "language", severity: "savage", template: "CSS > JS 비율... 혹시 모든 로직을 CSS 애니메이션으로 구현하신 건 아니죠?" },
  { id: "language", severity: "savage", template: "스타일 코드가 비즈니스 로직보다 많으면 우선순위에 문제가 있는 거예요." },
  { id: "language", severity: "savage", template: "CSS 파일이 코드를 삼켰어요. !important가 100개는 넘을 듯." },
  { id: "language", severity: "savage", template: "SCSS 지옥! 변수만 500개에 믹스인이 200개인 거 아니에요?" },
  { id: "language", severity: "savage", template: "CSS가 메인 언어인 레포. 혹시 flex와 grid만으로 게임을 만드신 건가요?" },
  { id: "language", severity: "savage", template: "스타일시트가 이 정도면 CSS specificity 전쟁에서 PTSD 오셨겠어요." },

  // CSS/SCSS 비율 높은 경우 — legendary
  { id: "language", severity: "legendary", template: "CSS가 코드의 90%! 이건 프로젝트가 아니라 CSS Zen Garden이에요." },
  { id: "language", severity: "legendary", template: "SCSS만으로 이 세상을 지배하려는 야망이 느껴집니다." },
  { id: "language", severity: "legendary", template: "CSS 비율이 이 정도면 HTML은 div 하나에 CSS로 모든 걸 그리신 거죠?" },
  { id: "language", severity: "legendary", template: "스타일시트의 왕좌에 앉으셨습니다. !important의 화신이시여." },
  { id: "language", severity: "legendary", template: "CSS가 전부! 프로그래밍 언어? 아니요, 당신에겐 CSS만 있으면 됩니다." },

  // ============================================================
  // 특정 언어 디스 (재밌게) — JavaScript
  // ============================================================
  { id: "language", severity: "mild", template: "{topLang}이 {topLangRatio}%... JavaScript 개발자시군요. undefined와 친한 분." },
  { id: "language", severity: "mild", template: "JavaScript {topLangRatio}%. 'this'가 뭔지는 알고 계시죠?" },
  { id: "language", severity: "medium", template: "JavaScript {topLangRatio}%... == 대신 === 쓰시는 거 맞죠? 맞죠?!" },
  { id: "language", severity: "medium", template: "JS {topLangRatio}%. typeof null === 'object'가 합리적이라고 생각하시나요?" },
  { id: "language", severity: "medium", template: "JavaScript {topLangRatio}%. callback 지옥에서 아직 탈출 못하신 건 아니죠?" },
  { id: "language", severity: "medium", template: "JS가 {topLangRatio}%... 'use strict'는 쓰시죠? 설마 안 쓰시는 건 아니죠?" },
  { id: "language", severity: "savage", template: "JavaScript {topLangRatio}%! 0.1 + 0.2 !== 0.3인 세계에서 사시는 군요." },
  { id: "language", severity: "savage", template: "JS {topLangRatio}%. NaN !== NaN이 당연한 세상의 주민이시네요." },
  { id: "language", severity: "savage", template: "JavaScript {topLangRatio}%! [] + [] = '' 이 합리적인 세계에 오신 걸 환영합니다." },
  { id: "language", severity: "savage", template: "JS 올인! 'undefined is not a function'이 당신의 일상 인사이겠네요." },
  { id: "language", severity: "legendary", template: "JavaScript {topLangRatio}%! 타입 시스템이 없는 세상에서 용감하게 사시는군요." },
  { id: "language", severity: "legendary", template: "JS {topLangRatio}%! WAT?! 이 분은 JavaScript의 기이함을 사랑하시는 분입니다." },

  // 특정 언어 디스 — TypeScript
  { id: "language", severity: "mild", template: "TypeScript {topLangRatio}%. 타입 안전성을 추구하시는 분이시네요." },
  { id: "language", severity: "mild", template: "TS {topLangRatio}%. any를 안 쓰시는 거 맞죠?" },
  { id: "language", severity: "medium", template: "TypeScript {topLangRatio}%... any 타입 몇 개나 쓰셨어요? 솔직히 말해보세요." },
  { id: "language", severity: "medium", template: "TS {topLangRatio}%. as any로 타입 에러를 해결하는 건 타입 안전성이 아니에요." },
  { id: "language", severity: "medium", template: "TypeScript {topLangRatio}%. // @ts-ignore 주석이 몇 개인지 세어볼까요?" },
  { id: "language", severity: "savage", template: "TypeScript {topLangRatio}%! 근데 any가 50%면 그냥 JavaScript 쓰세요." },
  { id: "language", severity: "savage", template: "TS {topLangRatio}%. tsconfig.json의 strict: false는 범죄예요." },
  { id: "language", severity: "savage", template: "TypeScript {topLangRatio}%! 'as unknown as SomeType' 쓰시는 분 아니시죠?" },
  { id: "language", severity: "legendary", template: "TypeScript {topLangRatio}%! 제네릭 중첩이 5단계를 넘으면 그건 암호예요." },
  { id: "language", severity: "legendary", template: "TS {topLangRatio}%! 타입 정의만 500줄인 파일이 있을 것 같은 느낌." },

  // 특정 언어 디스 — Python
  { id: "language", severity: "mild", template: "Python {topLangRatio}%. 가독성의 나라에 사시는군요." },
  { id: "language", severity: "mild", template: "Python이 {topLangRatio}%. 들여쓰기가 생명인 세계." },
  { id: "language", severity: "medium", template: "Python {topLangRatio}%... requirements.txt 관리는 잘 하시죠?" },
  { id: "language", severity: "medium", template: "Python {topLangRatio}%. pip install 할 때마다 가상환경 쓰시는 거 맞죠?" },
  { id: "language", severity: "medium", template: "Python {topLangRatio}%. import antigravity 해보셨나요?" },
  { id: "language", severity: "savage", template: "Python {topLangRatio}%! GIL 때문에 멀티스레딩 포기하신 적 있으시죠?" },
  { id: "language", severity: "savage", template: "Python {topLangRatio}%. 속도가 필요할 때 '...Cython 쓰면 되지'라고 하시죠?" },
  { id: "language", severity: "savage", template: "Python {topLangRatio}%! 배포할 때 Python 버전 지옥 경험하신 적 있으시죠?" },
  { id: "language", severity: "legendary", template: "Python {topLangRatio}%! pip freeze > requirements.txt가 의존성 관리의 전부이신 분." },
  { id: "language", severity: "legendary", template: "Python {topLangRatio}%! '느리면 C로 바인딩하면 되지'라며 Python 옹호하시는 분." },

  // 특정 언어 디스 — Java
  { id: "language", severity: "mild", template: "Java {topLangRatio}%. 엔터프라이즈의 세계에 계시는군요." },
  { id: "language", severity: "mild", template: "Java가 {topLangRatio}%. AbstractSingletonProxyFactoryBean 아시죠?" },
  { id: "language", severity: "medium", template: "Java {topLangRatio}%... 클래스 파일 하나에 코드 3줄인 거 아니에요?" },
  { id: "language", severity: "medium", template: "Java {topLangRatio}%. 보일러플레이트 작성이 주업무이시겠네요." },
  { id: "language", severity: "medium", template: "Java {topLangRatio}%. getter/setter 자동 생성이 없으면 손목이 나갈 듯." },
  { id: "language", severity: "savage", template: "Java {topLangRatio}%! 클래스명이 파일 경로보다 긴 건 아닌지 걱정됩니다." },
  { id: "language", severity: "savage", template: "Java {topLangRatio}%. System.out.println이 디버깅 도구의 전부이신 건 아니죠?" },
  { id: "language", severity: "savage", template: "Java {topLangRatio}%! NullPointerException이 당신의 오랜 친구이시겠네요." },
  { id: "language", severity: "savage", template: "Java {topLangRatio}%. public static void main이 꿈에 나오시죠?" },
  { id: "language", severity: "legendary", template: "Java {topLangRatio}%! Enterprise Java Bean Factory Builder Manager Adapter Pattern의 신이시군요." },
  { id: "language", severity: "legendary", template: "Java {topLangRatio}%! '코드가 길면 유지보수가 쉽다'고 자기 최면 중이시죠?" },

  // 특정 언어 디스 — Go
  { id: "language", severity: "mild", template: "Go {topLangRatio}%. 심플함의 미학을 추구하시는군요." },
  { id: "language", severity: "mild", template: "Go가 {topLangRatio}%. if err != nil의 세계에 오신 걸 환영합니다." },
  { id: "language", severity: "medium", template: "Go {topLangRatio}%... if err != nil을 하루에 몇 번 쓰시나요?" },
  { id: "language", severity: "medium", template: "Go {topLangRatio}%. 제네릭 없이 얼마나 고생하셨어요? (아, 이제 있죠)" },
  { id: "language", severity: "savage", template: "Go {topLangRatio}%! 에러 핸들링 코드가 비즈니스 로직보다 많으시죠?" },
  { id: "language", severity: "savage", template: "Go {topLangRatio}%. if err != nil { return err }가 코드의 60%일 듯." },
  { id: "language", severity: "legendary", template: "Go {topLangRatio}%! 간결한 언어라면서 에러 처리 코드가 이렇게 긴 건 아이러니죠." },
  { id: "language", severity: "legendary", template: "Go {topLangRatio}%! 'less is more'라면서 err 체크 코드가 more인 건요?" },

  // 특정 언어 디스 — Rust
  { id: "language", severity: "mild", template: "Rust {topLangRatio}%. 안전한 코드의 세계에 계시는군요." },
  { id: "language", severity: "mild", template: "Rust가 {topLangRatio}%. borrow checker와 친해지셨나요?" },
  { id: "language", severity: "medium", template: "Rust {topLangRatio}%... 컴파일 통과시키는 데 시간의 절반을 쓰시죠?" },
  { id: "language", severity: "medium", template: "Rust {topLangRatio}%. lifetime annotation이 꿈에 나오시나요?" },
  { id: "language", severity: "savage", template: "Rust {topLangRatio}%! .unwrap()을 쓰시면 Rust 쓰는 의미가 없어요." },
  { id: "language", severity: "savage", template: "Rust {topLangRatio}%. unsafe 블록이 몇 개인지 고백하세요." },
  { id: "language", severity: "savage", template: "Rust {topLangRatio}%! '컴파일되면 안전하다'면서 unsafe 쓰시는 거 아니죠?" },
  { id: "language", severity: "legendary", template: "Rust {topLangRatio}%! 'borrow checker 때문에 포기한 기능' 목록이 길겠네요." },
  { id: "language", severity: "legendary", template: "Rust {topLangRatio}%! 컴파일 한번에 커피 한 잔씩 드시겠네요." },

  // 특정 언어 디스 — PHP
  { id: "language", severity: "mild", template: "PHP {topLangRatio}%. 클래식한 선택이시네요." },
  { id: "language", severity: "medium", template: "PHP {topLangRatio}%... 2024년에도 PHP를 쓰시다니 대단하세요." },
  { id: "language", severity: "medium", template: "PHP {topLangRatio}%. '개발자 밈의 주인공' 되신 기분 어떠세요?" },
  { id: "language", severity: "savage", template: "PHP {topLangRatio}%! '세계에서 가장 좋은 언어'라고 아직도 믿고 계시죠?" },
  { id: "language", severity: "savage", template: "PHP {topLangRatio}%. 함수 이름 규칙이 랜덤인 언어를 쓰시다니 존경스럽습니다." },
  { id: "language", severity: "savage", template: "PHP {topLangRatio}%! WordPress 플러그인 개발자이시거나 레거시 유지보수 중이시죠?" },
  { id: "language", severity: "legendary", template: "PHP {topLangRatio}%! PHP는 죽지 않는다... 당신 같은 분이 계시니까요!" },
  { id: "language", severity: "legendary", template: "PHP {topLangRatio}%! 이 정도면 PHP 문신을 새기실 분이시네요." },

  // 특정 언어 디스 — Ruby
  { id: "language", severity: "mild", template: "Ruby {topLangRatio}%. 개발자의 행복을 추구하시는군요." },
  { id: "language", severity: "medium", template: "Ruby {topLangRatio}%... Rails 없이도 Ruby 쓰시나요?" },
  { id: "language", severity: "medium", template: "Ruby {topLangRatio}%. '마법 같은' 코드가 많으시겠네요." },
  { id: "language", severity: "savage", template: "Ruby {topLangRatio}%! 2015년에서 오신 분 같아요." },
  { id: "language", severity: "savage", template: "Ruby {topLangRatio}%. monkey patching이 당신의 디버깅 방법이시죠?" },
  { id: "language", severity: "legendary", template: "Ruby {topLangRatio}%! DHH가 당신의 영웅이시고 HEY가 최고의 앱이시죠?" },

  // 특정 언어 디스 — C/C++
  { id: "language", severity: "mild", template: "C/C++ {topLangRatio}%. 하드코어 개발자시군요." },
  { id: "language", severity: "medium", template: "C++ {topLangRatio}%... 메모리 누수와 친하신 분이시네요." },
  { id: "language", severity: "medium", template: "C {topLangRatio}%. malloc/free를 손으로 관리하시는 장인이시군요." },
  { id: "language", severity: "savage", template: "C++ {topLangRatio}%! segfault가 일상인 세계에 사시는군요." },
  { id: "language", severity: "savage", template: "C {topLangRatio}%! 포인터 산술 연산이 취미이시죠?" },
  { id: "language", severity: "savage", template: "C++ {topLangRatio}%. 컴파일 에러 메시지가 소설보다 긴 건 아닌지..." },
  { id: "language", severity: "legendary", template: "C {topLangRatio}%! 당신은 메모리의 주인이자 메모리 누수의 창조자." },
  { id: "language", severity: "legendary", template: "C++ {topLangRatio}%! template 에러 메시지 한 줄이 터미널을 가득 채우는 경험..." },

  // 특정 언어 디스 — Swift/Kotlin
  { id: "language", severity: "mild", template: "Swift {topLangRatio}%. Apple 생태계의 시민이시군요." },
  { id: "language", severity: "mild", template: "Kotlin {topLangRatio}%. 모던 안드로이드 개발자시네요." },
  { id: "language", severity: "medium", template: "Swift {topLangRatio}%. Xcode와의 전쟁은 매일이시죠?" },
  { id: "language", severity: "medium", template: "Kotlin {topLangRatio}%. 코루틴 디버깅에 시간 다 쓰시겠네요." },
  { id: "language", severity: "savage", template: "Swift {topLangRatio}%! Apple이 API 바꿀 때마다 코드의 반이 빨간줄이시죠?" },
  { id: "language", severity: "savage", template: "Kotlin {topLangRatio}%! Java와의 호환성 지옥을 겪어보셨겠네요." },
  { id: "language", severity: "legendary", template: "Swift {topLangRatio}%! SwiftUI가 매년 바뀌어서 작년 코드가 안 돌아가는 경험..." },
  { id: "language", severity: "legendary", template: "Kotlin {topLangRatio}%! Multiplatform이라면서 플랫폼별 분기가 반인 거 아니죠?" },

  // 특정 언어 디스 — Shell/Bash
  { id: "language", severity: "mild", template: "Shell {topLangRatio}%. 자동화의 달인이시군요." },
  { id: "language", severity: "medium", template: "Bash {topLangRatio}%... 이 정도면 시스템 관리자이시거나 DevOps이시거나." },
  { id: "language", severity: "medium", template: "Shell {topLangRatio}%. set -e 쓰시는 거 맞죠?" },
  { id: "language", severity: "savage", template: "Shell {topLangRatio}%! 이걸 프로그래밍 언어라고 하기엔 좀..." },
  { id: "language", severity: "savage", template: "Bash {topLangRatio}%! 2000줄짜리 .sh 파일이 있을 것 같은 불길한 예감." },
  { id: "language", severity: "legendary", template: "Shell {topLangRatio}%! 'Perl보다는 낫다'고 스스로 위안하시죠?" },
  { id: "language", severity: "legendary", template: "Bash {topLangRatio}%! 셸 스크립트로 웹서버를 만드신 건 아니시죠?" },

  // ============================================================
  // 레거시 파일 확장자 (.jsp, .asp, .cgi) — mild
  // ============================================================
  { id: "language", severity: "mild", template: ".jsp 파일이 보이네요. 레거시 시스템을 관리하시는군요." },
  { id: "language", severity: "mild", template: ".asp 파일이 있네요. 역사가 있는 프로젝트." },
  { id: "language", severity: "mild", template: "레거시 파일이 좀 보여요. 유지보수의 고충이 느껴집니다." },
  { id: "language", severity: "mild", template: ".cgi 파일... 오래된 프로젝트를 돌보시는 분이시군요." },
  { id: "language", severity: "mild", template: ".jsp가 있으시네요. Java EE 시절의 유산이로군요." },
  { id: "language", severity: "mild", template: "레거시 확장자가 보입니다. 역사의 수호자이시네요." },
  { id: "language", severity: "mild", template: ".asp 파일... Classic ASP의 향수가 느껴지시겠네요." },
  { id: "language", severity: "mild", template: "오래된 파일 확장자들... 프로젝트의 역사가 깊군요." },

  // 레거시 파일 확장자 — medium
  { id: "language", severity: "medium", template: ".jsp 파일이 아직 살아있다니... 2024년 맞죠?" },
  { id: "language", severity: "medium", template: ".asp 파일을 유지보수 중이시라니. 동정합니다." },
  { id: "language", severity: "medium", template: ".cgi가 아직 있으시다고요? 이건 고고학 발굴이에요." },
  { id: "language", severity: "medium", template: "레거시 확장자들... 리팩토링 계획은 있으시죠?" },
  { id: "language", severity: "medium", template: ".jsp가 아직... 톰캣 서버가 아직 살아있는 건가요?" },
  { id: "language", severity: "medium", template: ".asp 파일이 여러 개... IIS 관리자이시군요?" },
  { id: "language", severity: "medium", template: "레거시 파일 확장자 발견. 마이그레이션 일정은 언제인가요?" },
  { id: "language", severity: "medium", template: ".cgi 스크립트... 이건 웹 개발의 석기시대 유물이에요." },

  // 레거시 파일 확장자 — savage
  { id: "language", severity: "savage", template: ".jsp 파일 다수! 이건 레거시가 아니라 디지털 화석이에요." },
  { id: "language", severity: "savage", template: ".asp 파일이 주력이시라니! 타임머신을 타고 2003년에서 오셨나요?" },
  { id: "language", severity: "savage", template: ".cgi가 프로덕션에서 돌아가고 있으면 지금 당장 119에 전화하세요." },
  { id: "language", severity: "savage", template: "레거시 확장자들... 이 레포는 IT 역사 박물관에 기증하셔야 해요." },
  { id: "language", severity: "savage", template: ".jsp + .asp + .cgi... 레거시 올스타 팀 구성이시네요." },
  { id: "language", severity: "savage", template: ".asp 파일들... VBScript가 아직 살아있다니 기적이에요." },
  { id: "language", severity: "savage", template: "레거시 파일이 이렇게 많으면 새 기능 추가할 때마다 공포를 느끼시겠네요." },
  { id: "language", severity: "savage", template: ".cgi 스크립트가 아직 현역! Perl CGI가 꿈에 나오시겠네요." },

  // 레거시 파일 확장자 — legendary
  { id: "language", severity: "legendary", template: ".jsp + .asp + .cgi! 이 레포는 웹 개발 역사 교과서에요!" },
  { id: "language", severity: "legendary", template: "레거시 파일의 끝판왕! 이 코드가 살아있다는 건 기적이에요." },
  { id: "language", severity: "legendary", template: ".asp 파일이 주력 코드! 당신은 20년 전 코드를 지키는 최후의 파수꾼." },
  { id: "language", severity: "legendary", template: ".cgi가 메인! 이건 고대 유적이에요. 국보급 레거시." },
  { id: "language", severity: "legendary", template: "레거시 확장자의 박물관! 인디아나 존스가 발굴하러 올 수준이에요." },

  // ============================================================
  // lock 파일/generated 파일 커밋 — mild
  // ============================================================
  { id: "language", severity: "mild", template: "lock 파일이 커밋되어 있네요. 의존성 고정은 좋은 습관이에요." },
  { id: "language", severity: "mild", template: "package-lock.json이 있군요. 의존성 관리를 하시는 분." },
  { id: "language", severity: "mild", template: "yarn.lock 파일이 있네요. Yarn 사용자시군요." },
  { id: "language", severity: "mild", template: "lock 파일 커밋 = 안정적인 빌드. 좋습니다." },
  { id: "language", severity: "mild", template: "Gemfile.lock이 보이네요. Ruby 의존성 관리를 잘 하시는군요." },
  { id: "language", severity: "mild", template: "lock 파일이 있어요. 재현 가능한 빌드를 추구하시는 분." },
  { id: "language", severity: "mild", template: "pnpm-lock.yaml이 있네요. pnpm 쓰시는 트렌디한 분." },
  { id: "language", severity: "mild", template: "lock 파일 커밋은 기본 중의 기본이죠. 잘하고 계세요." },

  // lock 파일/generated 파일 — medium
  { id: "language", severity: "medium", template: "lock 파일 충돌 해결하느라 고생하신 적 많으시죠?" },
  { id: "language", severity: "medium", template: "generated 파일이 커밋에 있네요. 빌드 결과물은 .gitignore에 넣으세요." },
  { id: "language", severity: "medium", template: "lock 파일 diff가 PR의 90%인 적 있으시죠?" },
  { id: "language", severity: "medium", template: "자동 생성 파일이 git에 있으면 리뷰할 때 눈이 아프잖아요." },
  { id: "language", severity: "medium", template: "lock 파일 merge conflict... 개발자의 영혼을 갈아먹는 작업." },
  { id: "language", severity: "medium", template: "generated 코드가 커밋에 포함되어 있어요. 빌드 산출물은 빼주세요." },
  { id: "language", severity: "medium", template: "lock 파일 변경사항이 코드 변경보다 많을 때의 허무함..." },
  { id: "language", severity: "medium", template: ".min.js 파일이 커밋에? 빌드 결과물은 CI에서 만들어야죠." },

  // lock 파일/generated 파일 — savage
  { id: "language", severity: "savage", template: "node_modules를 커밋하신 건 아니시죠?! 설마요?!" },
  { id: "language", severity: "savage", template: "generated 파일이 전체의 상당수! 실제 코드가 뭔지 찾기가 보물찾기예요." },
  { id: "language", severity: "savage", template: "빌드 결과물이 git에! clone하면 용량이 우주급이겠네요." },
  { id: "language", severity: "savage", template: ".min.js, .map, dist/ 다 커밋하셨네요. .gitignore가 텅텅 비어있겠어요." },
  { id: "language", severity: "savage", template: "lock 파일 + generated 파일이 레포의 반! 실제 코드를 찾아 삼만리." },
  { id: "language", severity: "savage", template: "자동 생성 파일이 너무 많아서 git diff가 의미를 잃었어요." },
  { id: "language", severity: "savage", template: "빌드 산출물 커밋은 디스크 공간에 대한 테러예요." },
  { id: "language", severity: "savage", template: "vendor/ 디렉토리를 통째로 커밋하신 건 아니시죠? 아... 하셨군요." },

  // lock 파일/generated 파일 — legendary
  { id: "language", severity: "legendary", template: "node_modules 커밋 확인! 이건 전설이에요. 전설." },
  { id: "language", severity: "legendary", template: "generated 파일이 99%! 이 레포에서 사람이 쓴 코드는 10줄이에요." },
  { id: "language", severity: "legendary", template: "빌드 결과물 + vendor + node_modules! git clone에 30분 걸리겠네요." },
  { id: "language", severity: "legendary", template: ".gitignore가 텅 비어있고 모든 것이 커밋! 이건 git의 무덤이에요." },
  { id: "language", severity: "legendary", template: "자동 생성 파일의 무덤! 이 레포는 하드디스크의 블랙홀이에요." },

  // ============================================================
  // 일반적인 {topLang} 비율 관련 — mild
  // ============================================================
  { id: "language", severity: "mild", template: "주력 언어가 {topLang}이시군요({topLangRatio}%). 좋은 선택이에요." },
  { id: "language", severity: "mild", template: "{topLang}이 {topLangRatio}%. 꽤 정리가 잘 된 프로젝트네요." },
  { id: "language", severity: "mild", template: "총 {totalLangs}개 언어 사용 중. 적절한 다양성이에요." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%에 {totalLangs}개 언어. 균형 잡힌 스택이에요." },
  { id: "language", severity: "mild", template: "언어 분포가 나쁘지 않아요. {topLang}이 메인이시군요." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%. 이 정도면 건강한 프로젝트예요." },
  { id: "language", severity: "mild", template: "메인 언어 {topLang}({topLangRatio}%), 총 {totalLangs}개 언어. 깔끔하네요." },
  { id: "language", severity: "mild", template: "{topLang}이 주력({topLangRatio}%)이시군요. 무난한 선택이에요." },
  { id: "language", severity: "mild", template: "언어 비율이 균형 잡혀 있어요. {topLang}이 리드하는 건 당연하고." },
  { id: "language", severity: "mild", template: "{totalLangs}개 언어 중 {topLang}이 {topLangRatio}%. 합리적이에요." },

  // 일반적인 — medium
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%인데 나머지가 다 잡다하네요." },
  { id: "language", severity: "medium", template: "언어가 {totalLangs}개인데 {topLang}이 {topLangRatio}%면 나머지는 장식인가요?" },
  { id: "language", severity: "medium", template: "{topLang} 빼면 볼 게 없는 레포네요({topLangRatio}%)." },
  { id: "language", severity: "medium", template: "총 {totalLangs}개 언어라는데... 의미 있는 건 {topLang} 하나뿐이에요." },
  { id: "language", severity: "medium", template: "{topLang}이 {topLangRatio}%. 나머지 언어들은 눈치만 보고 있겠네요." },
  { id: "language", severity: "medium", template: "메인 언어 {topLang}({topLangRatio}%)에 잡다한 언어 {totalLangs}개. 정리 좀 하세요." },
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%. 이 정도면 다른 언어는 실수로 들어온 거 아닌가요?" },
  { id: "language", severity: "medium", template: "{totalLangs}개 언어를 쓰신다고 하기엔 {topLang}이 {topLangRatio}%라 좀 애매해요." },
  { id: "language", severity: "medium", template: "{topLang}이 독점({topLangRatio}%). 다른 언어들은 인턴인가요?" },
  { id: "language", severity: "medium", template: "언어 분포를 보니 {topLang}이 왕이고 나머지는 백성이네요." },

  // 일반적인 — savage
  { id: "language", severity: "savage", template: "{topLang} {topLangRatio}%! 이 프로젝트에서 {topLang} 빼면 빈 폴더예요." },
  { id: "language", severity: "savage", template: "{totalLangs}개 언어라는데 의미 있는 코드는 {topLang}뿐! 나머진 먼지." },
  { id: "language", severity: "savage", template: "{topLang}이 {topLangRatio}%면 나머지 언어들은 왜 존재하는 건가요?" },
  { id: "language", severity: "savage", template: "언어 분포가 독재 체제예요. {topLang} 일당독재({topLangRatio}%)." },
  { id: "language", severity: "savage", template: "{topLang}만 {topLangRatio}%. 나머지 {totalLangs}개 언어: '저희도 있어요...'." },
  { id: "language", severity: "savage", template: "{topLang} {topLangRatio}%! 이건 {topLang} 모노레포가 아니라 {topLang} 감옥이에요." },
  { id: "language", severity: "savage", template: "{totalLangs}개 언어 중 {topLang}이 {topLangRatio}%. 다양성? 그런 건 없어요." },
  { id: "language", severity: "savage", template: "{topLang} 빼면 README밖에 안 남는 레포({topLangRatio}% {topLang})." },

  // 일반적인 — legendary
  { id: "language", severity: "legendary", template: "{topLang} {topLangRatio}%! 이 레포는 {topLang}의 독재정권이에요. 반란의 여지가 없습니다." },
  { id: "language", severity: "legendary", template: "{totalLangs}개 언어라고 했지만 {topLang}이 {topLangRatio}%면 나머진 유령이에요." },
  { id: "language", severity: "legendary", template: "{topLang} {topLangRatio}%! '{topLang}으로 모든 것을 할 수 있다'를 몸소 증명 중이시군요." },
  { id: "language", severity: "legendary", template: "{topLang}이 {topLangRatio}%! 이 정도면 {topLang}이 의식을 가지고 다른 언어를 쫓아낸 거예요." },
  { id: "language", severity: "legendary", template: "{topLang} {topLangRatio}%에 {totalLangs}개 언어! 나머지 언어들은 {topLang}에게 잡아먹힌 거예요." },

  // ============================================================
  // 추가 Mild 템플릿들 (다양한 주제)
  // ============================================================
  { id: "language", severity: "mild", template: "파일 확장자가 다양하네요. 호기심 많은 개발자시군요." },
  { id: "language", severity: "mild", template: "코드베이스가 깔끔하게 정리되어 있어요. {topLang} 중심으로." },
  { id: "language", severity: "mild", template: "{topLang}을 주력으로 {totalLangs}개 언어. 나쁘지 않은 구성이에요." },
  { id: "language", severity: "mild", template: "언어 선택이 실용적이에요. {topLang}이 메인인 이유가 있겠죠." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%. 집중과 선택을 잘 하시는 분." },
  { id: "language", severity: "mild", template: "프로젝트의 언어 구성이 합리적이에요." },
  { id: "language", severity: "mild", template: "{topLang}을 선택하신 안목이 있으시네요({topLangRatio}%)." },
  { id: "language", severity: "mild", template: "코드 구성을 보니 체계적인 분이시네요." },
  { id: "language", severity: "mild", template: "{totalLangs}개 언어를 적절히 활용하고 계시네요." },
  { id: "language", severity: "mild", template: "언어 분포가 건강합니다. {topLang} {topLangRatio}%." },
  { id: "language", severity: "mild", template: "깔끔한 기술 스택이에요. {topLang} 위주로." },
  { id: "language", severity: "mild", template: "{topLang}이 리드하는 프로젝트. 방향성이 명확하네요." },
  { id: "language", severity: "mild", template: "언어 선택에 고민의 흔적이 보여요. 좋은 결과예요." },
  { id: "language", severity: "mild", template: "{topLang}으로 통일된 코드베이스. 일관성이 좋아요." },
  { id: "language", severity: "mild", template: "기술 스택이 심플해서 좋네요. {topLang} 중심." },
  { id: "language", severity: "mild", template: "{totalLangs}개 언어, {topLang} {topLangRatio}%. 균형 잡힌 편이에요." },
  { id: "language", severity: "mild", template: "파일 구조가 정돈되어 있어요. {topLang} 프로젝트답네요." },
  { id: "language", severity: "mild", template: "{topLang}이 메인이시군요. 시장성 있는 선택이에요." },
  { id: "language", severity: "mild", template: "언어 구성이 트렌디하네요. {topLang} 좋은 선택이에요." },
  { id: "language", severity: "mild", template: "코드베이스가 일관적이에요. {topLang} {topLangRatio}%." },

  // ============================================================
  // 추가 Medium 템플릿들
  // ============================================================
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%인데... 이 선택 확신하시는 건가요?" },
  { id: "language", severity: "medium", template: "언어 분포를 보니 좀 혼란스럽네요. {totalLangs}개나 쓰시다니." },
  { id: "language", severity: "medium", template: "{topLang}이 메인이시라면서 왜 다른 언어가 {totalLangs}개나 있나요?" },
  { id: "language", severity: "medium", template: "코드베이스가 좀 산만해요. {topLang} 외에 잡다한 게 많네요." },
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%... 나머지는 실험용인가요?" },
  { id: "language", severity: "medium", template: "언어가 {totalLangs}개면 빌드 시스템이 복잡하시겠어요." },
  { id: "language", severity: "medium", template: "{topLang}이 주력이신데 설정 파일이 {configRatio}%... 좀 많네요." },
  { id: "language", severity: "medium", template: "이 프로젝트 온보딩하려면 {totalLangs}개 언어를 다 알아야 하나요?" },
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%에 설정 {configRatio}%. 실제 코드 비율이 걱정되네요." },
  { id: "language", severity: "medium", template: "언어 다양성은 좋지만 {totalLangs}개는 좀 과한 것 같아요." },
  { id: "language", severity: "medium", template: "{topLang}이 {topLangRatio}%면 좀 더 다양하게 해보시는 건 어떨까요?" },
  { id: "language", severity: "medium", template: "코드 리뷰하려면 {totalLangs}개 언어를 다 읽을 줄 알아야 하는 건가요?" },
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%... 기술 부채가 느껴지는 비율이네요." },
  { id: "language", severity: "medium", template: "이 프로젝트의 기술 스택을 설명하려면 10분은 걸리겠네요." },
  { id: "language", severity: "medium", template: "{topLang}을 메인으로 {totalLangs}개 언어... 좀 정리가 필요해 보여요." },
  { id: "language", severity: "medium", template: "언어 구성이 프랑켄슈타인 같아요. 이것저것 다 붙여놓으셨네요." },
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%. 이 정도 비율이면 다른 언어는 왜 있는 거예요?" },
  { id: "language", severity: "medium", template: "매 Sprint마다 새 언어를 도입하시는 건 아니시죠?" },
  { id: "language", severity: "medium", template: "{totalLangs}개 언어... 기술 스택 다이어그램이 복잡하시겠어요." },
  { id: "language", severity: "medium", template: "이 레포의 기술 스택을 한 줄로 설명 못하시겠죠?" },

  // ============================================================
  // 추가 Savage 템플릿들
  // ============================================================
  { id: "language", severity: "savage", template: "이 레포의 언어 분포는 카오스 그 자체예요." },
  { id: "language", severity: "savage", template: "{topLang} {topLangRatio}%에 설정 {configRatio}%면 실제 유의미한 코드는 뭔가요?" },
  { id: "language", severity: "savage", template: "{totalLangs}개 언어를 쓰면서 하나도 마스터 못한 느낌이에요." },
  { id: "language", severity: "savage", template: "언어 구성이 프랑켄슈타인이에요. 이것저것 짜깁기." },
  { id: "language", severity: "savage", template: "{topLang}이 {topLangRatio}%... 나머지 언어들은 버림받은 실험의 잔해." },
  { id: "language", severity: "savage", template: "코드베이스를 보면 기술 결정에 일관성이 없어요." },
  { id: "language", severity: "savage", template: "{totalLangs}개 언어! 새 팀원이 울면서 나갈 수준의 복잡도." },
  { id: "language", severity: "savage", template: "언어 분포를 보니 '이번엔 이걸로 해볼까?'의 연속이었겠네요." },
  { id: "language", severity: "savage", template: "{topLang} {topLangRatio}%에 마크다운 {mdRatio}%... 코딩보다 글쓰기를 하셨네요." },
  { id: "language", severity: "savage", template: "이 레포는 기술 부채의 박물관이에요." },
  { id: "language", severity: "savage", template: "{totalLangs}개 언어를 쓰는데 CI가 통과하면 기적이에요." },
  { id: "language", severity: "savage", template: "언어가 너무 많아서 Dockerfile이 소설이겠네요." },
  { id: "language", severity: "savage", template: "{topLang} 중심이라면서 {configRatio}%가 설정이면 코드는 어디에?" },
  { id: "language", severity: "savage", template: "이 프로젝트의 기술 스택 = 개발자의 변심 히스토리." },
  { id: "language", severity: "savage", template: "{totalLangs}개 언어! 풀스택이 아니라 카오스 스택이에요." },
  { id: "language", severity: "savage", template: "코드 리뷰어에게 {totalLangs}개 언어를 요구하는 건 인권 침해예요." },
  { id: "language", severity: "savage", template: "{topLang}이 왕이고 나머지는 노예인 이 지옥 같은 레포." },
  { id: "language", severity: "savage", template: "기술 스택이 뷔페처럼 쌓여있네요. 소화는 되시나요?" },
  { id: "language", severity: "savage", template: "이 레포에서 일하면 '어떤 언어로 짜야 하죠?'가 매일의 질문이겠네요." },
  { id: "language", severity: "savage", template: "{topLang} {topLangRatio}%! 나머지는 다 '나중에 정리할게' 상태인 거죠?" },

  // ============================================================
  // 추가 Legendary 템플릿들
  // ============================================================
  { id: "language", severity: "legendary", template: "이 레포의 언어 분포는 프로그래밍 언어의 묘지예요." },
  { id: "language", severity: "legendary", template: "{totalLangs}개 언어! 바벨탑을 코드로 재현하셨군요!" },
  { id: "language", severity: "legendary", template: "{topLang} {topLangRatio}%에 설정 {configRatio}%면 이건 코드가 아니라 설정에 코드가 붙은 거예요." },
  { id: "language", severity: "legendary", template: "이 프로젝트의 기술 스택을 이해하려면 석사 학위가 필요해요." },
  { id: "language", severity: "legendary", template: "{totalLangs}개 언어의 혼돈! 이건 개발이 아니라 언어 실험실이에요." },
  { id: "language", severity: "legendary", template: "코드베이스가 프로그래밍 언어의 동물원이에요. 우리에서 탈출한 것도 있겠네요." },
  { id: "language", severity: "legendary", template: "이 레포를 이해할 수 있는 사람은 세상에 당신뿐이에요. 아, 당신도 못하시죠?" },
  { id: "language", severity: "legendary", template: "{topLang}이 {topLangRatio}%인데 마크다운이 {mdRatio}%면... 이건 개발이 아니라 창작이에요." },
  { id: "language", severity: "legendary", template: "언어 분포가 정규분포가 아니라 카오스 분포예요." },
  { id: "language", severity: "legendary", template: "이 레포를 fork하면 컴퓨터가 혼란에 빠질 거예요." },

  // ============================================================
  // Dart/Flutter 디스
  // ============================================================
  { id: "language", severity: "mild", template: "Dart {topLangRatio}%. Flutter 개발자시군요! 핫리로드의 행복." },
  { id: "language", severity: "medium", template: "Dart {topLangRatio}%... Google이 Dart를 버리면 어쩌시려고요?" },
  { id: "language", severity: "savage", template: "Dart {topLangRatio}%! 세상에 Dart 개발자가 있다니 깜짝 놀랐어요." },
  { id: "language", severity: "legendary", template: "Dart {topLangRatio}%! 'Flutter로 다 만들 수 있어요'가 인생 모토이시죠?" },

  // Lua 디스
  { id: "language", severity: "mild", template: "Lua {topLangRatio}%. 게임 개발이시거나 Neovim 설정 중이시거나." },
  { id: "language", severity: "medium", template: "Lua {topLangRatio}%... Roblox 개발자이시거나 Neovim 플러그인 장인이시거나." },
  { id: "language", severity: "savage", template: "Lua {topLangRatio}%! 인덱스가 1부터 시작하는 세계에 살고 계시네요." },
  { id: "language", severity: "legendary", template: "Lua {topLangRatio}%! 배열이 1부터 시작하는 게 정상이라고 믿는 분." },

  // Perl 디스
  { id: "language", severity: "mild", template: "Perl {topLangRatio}%. 전설의 언어를 쓰시는군요." },
  { id: "language", severity: "medium", template: "Perl {topLangRatio}%... 정규식의 달인이시겠네요." },
  { id: "language", severity: "savage", template: "Perl {topLangRatio}%! 코드를 쓴 본인도 내일이면 못 읽으실 거예요." },
  { id: "language", severity: "legendary", template: "Perl {topLangRatio}%! 이건 코드가 아니라 상형문자예요. 해독이 불가능합니다." },

  // R 디스
  { id: "language", severity: "mild", template: "R {topLangRatio}%. 데이터 사이언티스트시군요!" },
  { id: "language", severity: "medium", template: "R {topLangRatio}%... <- 대입 연산자에 적응하셨나요?" },
  { id: "language", severity: "savage", template: "R {topLangRatio}%! 이건 프로그래밍이 아니라 통계 분석이에요." },
  { id: "language", severity: "legendary", template: "R {topLangRatio}%! 인덱스 1부터 시작 + <- 연산자 = 프로그래머의 멘탈 붕괴." },

  // Scala 디스
  { id: "language", severity: "mild", template: "Scala {topLangRatio}%. 함수형 프로그래밍을 추구하시는군요." },
  { id: "language", severity: "medium", template: "Scala {topLangRatio}%... 빌드 시간이 점심시간보다 긴 건 아니시죠?" },
  { id: "language", severity: "savage", template: "Scala {topLangRatio}%! implicit이 너무 많으면 마법 코드가 됩니다." },
  { id: "language", severity: "legendary", template: "Scala {topLangRatio}%! sbt 빌드 한 번에 명상 수련이 가능하시겠네요." },

  // Haskell 디스
  { id: "language", severity: "mild", template: "Haskell {topLangRatio}%. 수학적 순수함을 추구하시는군요." },
  { id: "language", severity: "medium", template: "Haskell {topLangRatio}%... 모나드가 뭔지 설명할 수 있으시죠?" },
  { id: "language", severity: "savage", template: "Haskell {topLangRatio}%! 이론은 아름답지만 현실은 잔인하죠." },
  { id: "language", severity: "legendary", template: "Haskell {topLangRatio}%! '모나드는 자기 함자 범주의 모노이드'라고 설명하시는 분." },

  // Elixir/Erlang 디스
  { id: "language", severity: "mild", template: "Elixir {topLangRatio}%. 동시성 프로그래밍의 세계에 계시네요." },
  { id: "language", severity: "medium", template: "Elixir {topLangRatio}%... 'Let it crash' 철학을 프로덕션에서도 적용하시나요?" },
  { id: "language", severity: "savage", template: "Elixir {topLangRatio}%! Erlang VM 위에서 사는 희귀 개발자시군요." },
  { id: "language", severity: "legendary", template: "Elixir {topLangRatio}%! 팀원 구하기가 유니콘 찾기보다 어렵겠네요." },

  // Clojure 디스
  { id: "language", severity: "mild", template: "Clojure {topLangRatio}%. 리스프의 후예시군요." },
  { id: "language", severity: "medium", template: "Clojure {topLangRatio}%... 괄호 세다가 인생의 반이 지나가셨겠네요." },
  { id: "language", severity: "savage", template: "Clojure {topLangRatio}%! ((((이 정도면)))) 괄호가 코드보다 많겠어요." },
  { id: "language", severity: "legendary", template: "Clojure {topLangRatio}%! 괄호의 신전에 사시는 분. 리스프의 화신이시여!" },

  // SQL 디스
  { id: "language", severity: "mild", template: "SQL {topLangRatio}%. 데이터베이스에 능숙하신 분이시네요." },
  { id: "language", severity: "medium", template: "SQL {topLangRatio}%... SELECT * FROM 습관은 버리셨죠?" },
  { id: "language", severity: "savage", template: "SQL {topLangRatio}%! 비즈니스 로직이 전부 저장 프로시저에 있는 건 아니시죠?" },
  { id: "language", severity: "legendary", template: "SQL {topLangRatio}%! 이건 어플리케이션이 아니라 데이터베이스가 본체인 프로젝트." },

  // HTML 디스
  { id: "language", severity: "mild", template: "HTML {topLangRatio}%. 웹의 기본을 잘 지키시는군요." },
  { id: "language", severity: "medium", template: "HTML {topLangRatio}%... HTML은 프로그래밍 언어인가 아닌가 논쟁은 피할게요." },
  { id: "language", severity: "savage", template: "HTML {topLangRatio}%! 주력 언어가 HTML이면 프로그래머가 맞나요?" },
  { id: "language", severity: "legendary", template: "HTML {topLangRatio}%! '나는 HTML 프로그래머다'라고 자신 있게 말씀하시는 분." },

  // Objective-C 디스
  { id: "language", severity: "mild", template: "Objective-C {topLangRatio}%. iOS 레거시의 수호자시군요." },
  { id: "language", severity: "medium", template: "Objective-C {topLangRatio}%... Swift로 마이그레이션 계획은 있으시죠?" },
  { id: "language", severity: "savage", template: "Objective-C {topLangRatio}%! 대괄호 지옥에서 아직도 사시는 군요." },
  { id: "language", severity: "legendary", template: "Objective-C {topLangRatio}%! [self migration:@'Swift'로] 언제 하실 건가요?" },

  // COBOL 디스
  { id: "language", severity: "medium", template: "COBOL이 보이네요... 은행에서 일하시나요?" },
  { id: "language", severity: "savage", template: "COBOL 파일 발견! 이건 레거시가 아니라 국보급 유물이에요." },
  { id: "language", severity: "legendary", template: "COBOL이 주력 언어! 당신 없이 세계 금융 시스템이 돌아가지 않아요." },

  // Assembly 디스
  { id: "language", severity: "mild", template: "어셈블리가 보이네요. 하드코어 중의 하드코어시군요." },
  { id: "language", severity: "medium", template: "Assembly {topLangRatio}%... 21세기에 어셈블리를 쓰시다니 존경스럽습니다." },
  { id: "language", severity: "savage", template: "Assembly {topLangRatio}%! 컴파일러를 믿지 못하시는 건가요?" },
  { id: "language", severity: "legendary", template: "Assembly {topLangRatio}%! 기계와 대화하시는 분이시군요. 인간과도 대화하세요." },

  // ============================================================
  // 혼합 주제 추가 템플릿들 — mild
  // ============================================================
  { id: "language", severity: "mild", template: "프로젝트가 {topLang} 기반이군요. 흔들림 없는 선택." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%. 안정적인 기술 스택이에요." },
  { id: "language", severity: "mild", template: "코드의 대부분이 {topLang}이시군요. 명확한 방향성." },
  { id: "language", severity: "mild", template: "{totalLangs}개 언어 중 {topLang}이 메인. 적절한 구성이에요." },
  { id: "language", severity: "mild", template: "기술 스택이 깔끔해요. {topLang} 중심의 프로젝트." },
  { id: "language", severity: "mild", template: "언어 선택이 현명해요. {topLang}이 잘 맞는 프로젝트군요." },
  { id: "language", severity: "mild", template: "{topLang}으로 통일된 코드. 유지보수가 편하시겠어요." },
  { id: "language", severity: "mild", template: "깔끔한 언어 구성. {topLang} {topLangRatio}%." },
  { id: "language", severity: "mild", template: "{topLang} 프로젝트시군요. 좋은 출발점이에요." },
  { id: "language", severity: "mild", template: "언어 비율이 건강해요. {topLang}이 주력으로 {topLangRatio}%." },
  { id: "language", severity: "mild", template: "{topLang}을 잘 활용하고 계시네요." },
  { id: "language", severity: "mild", template: "기술 선택이 무난해요. 나쁘지 않습니다." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%. 꽤 일관된 코드베이스." },
  { id: "language", severity: "mild", template: "프로젝트 구조가 보기 좋아요. {topLang} 중심." },
  { id: "language", severity: "mild", template: "코드가 정돈되어 있네요. {topLang} 위주." },
  { id: "language", severity: "mild", template: "{topLang}이 리드하는 괜찮은 프로젝트예요." },
  { id: "language", severity: "mild", template: "언어 분포가 합리적이에요. 무난무난." },
  { id: "language", severity: "mild", template: "{topLang}으로 잘 굴러가는 프로젝트군요." },
  { id: "language", severity: "mild", template: "기술 스택이 단순해서 좋아요. {topLang} 중심." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%. 심플 이즈 베스트." },

  // 혼합 주제 추가 — medium
  { id: "language", severity: "medium", template: "이 레포, {topLang}만 빼면 텅 비네요." },
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%에 설정 {configRatio}%... 비즈니스 로직은 어디에?" },
  { id: "language", severity: "medium", template: "설정이 {configRatio}%이고 문서가 {mdRatio}%면 코드는 대체 뭐예요?" },
  { id: "language", severity: "medium", template: "{topLang}이 아닌 파일들은 전부 보조 역할이시군요." },
  { id: "language", severity: "medium", template: "코드 비율보다 비-코드 비율이 높은 건 아닌지 걱정이에요." },
  { id: "language", severity: "medium", template: "{totalLangs}개 언어인데 체계가 없어 보여요." },
  { id: "language", severity: "medium", template: "이 프로젝트에서 의미 있는 코드를 찾기가 어렵네요." },
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%... 좀 더 다양하게 시도해보세요." },
  { id: "language", severity: "medium", template: "언어 구성을 보니 리팩토링이 필요해 보여요." },
  { id: "language", severity: "medium", template: "이 레포는 기술적 결정이 좀 혼란스럽네요." },
  { id: "language", severity: "medium", template: "{topLang} 외에 쓸데없는 파일이 많아 보여요." },
  { id: "language", severity: "medium", template: "코드 정리를 좀 하시면 레포가 반으로 줄겠어요." },
  { id: "language", severity: "medium", template: "{configRatio}% 설정에 {mdRatio}% 문서... 코드는 보너스인가요?" },
  { id: "language", severity: "medium", template: "파일 구조를 보니 '일단 넣고 보자'의 결과물 같아요." },
  { id: "language", severity: "medium", template: "{topLang} 프로젝트라면서 왜 이렇게 잡다한 게 많죠?" },
  { id: "language", severity: "medium", template: "이 레포는 주인이 {topLang}인지 설정인지 모르겠어요." },
  { id: "language", severity: "medium", template: "기술 부채가 언어 분포에서 느껴지네요." },
  { id: "language", severity: "medium", template: "{topLang} 외의 파일들... 언제 정리하실 건가요?" },
  { id: "language", severity: "medium", template: "이 프로젝트의 기술 스택 회의에 3시간 걸리겠네요." },
  { id: "language", severity: "medium", template: "코드베이스가 좀 복잡해요. 심플하게 가보시는 건 어떨까요?" },

  // 혼합 주제 추가 — savage
  { id: "language", severity: "savage", template: "이 레포의 언어 분포는 개발자의 방황을 보여줘요." },
  { id: "language", severity: "savage", template: "{topLang} {topLangRatio}%에 설정 {configRatio}%에 문서 {mdRatio}%... 코드가 삼중 포위당했어요." },
  { id: "language", severity: "savage", template: "이 프로젝트를 인수인계 받으면 울면서 퇴사할 수준이에요." },
  { id: "language", severity: "savage", template: "{totalLangs}개 언어! 이건 기술 스택이 아니라 기술 쓰레기장이에요." },
  { id: "language", severity: "savage", template: "코드 한 줄 쓰려면 설정 10줄 + 문서 5줄이 필요한 레포." },
  { id: "language", severity: "savage", template: "이 레포에서 실행 가능한 코드를 찾는 건 보물찾기예요." },
  { id: "language", severity: "savage", template: "{topLang}이 주력이라면서 왜 이렇게 혼돈이죠?" },
  { id: "language", severity: "savage", template: "이 프로젝트의 README에 '여기는 위험합니다'라고 써야 해요." },
  { id: "language", severity: "savage", template: "코드베이스가 이렇게 혼란스러우면 AI도 이해 못해요." },
  { id: "language", severity: "savage", template: "{totalLangs}개 언어의 카오스! 이건 코드가 아니라 기술 실험의 잔해." },
  { id: "language", severity: "savage", template: "이 레포에 새 언어를 추가하면 아무도 눈치 못 챌 거예요." },
  { id: "language", severity: "savage", template: "기술 스택이 정신분열적이에요. 통일성이라곤 없네요." },
  { id: "language", severity: "savage", template: "{topLang} {topLangRatio}%? 이 비율을 보면 방황의 흔적이에요." },
  { id: "language", severity: "savage", template: "이 코드베이스를 유지보수하려면 정신력 수련이 필요해요." },
  { id: "language", severity: "savage", template: "설정 {configRatio}% + 문서 {mdRatio}%... 코드보다 메타데이터가 많은 레포." },
  { id: "language", severity: "savage", template: "이 프로젝트에 새 개발자가 합류하면 첫 주는 이해하는 데 쓰겠네요." },
  { id: "language", severity: "savage", template: "{topLang} {topLangRatio}%에 나머지가 너무 파편화됐어요." },
  { id: "language", severity: "savage", template: "이 레포의 기술 결정은 동전 던지기로 한 것 같아요." },
  { id: "language", severity: "savage", template: "코드 고고학자가 필요한 레포. 발굴 작업이 필요해요." },
  { id: "language", severity: "savage", template: "이 프로젝트의 onboarding 문서가 필요한 이유: {totalLangs}개 언어." },

  // 혼합 주제 추가 — legendary
  { id: "language", severity: "legendary", template: "이 레포는 프로그래밍 언어의 무덤이에요. 여기서 많은 언어가 죽었습니다." },
  { id: "language", severity: "legendary", template: "{topLang} {topLangRatio}%! 이 언어가 레포를 지배하고 나머지를 노예로 부리고 있어요." },
  { id: "language", severity: "legendary", template: "설정 {configRatio}% + 문서 {mdRatio}% = 코드 없는 프로젝트의 전설." },
  { id: "language", severity: "legendary", template: "이 레포를 이해하려면 로제타 스톤과 고대 문서 해독 능력이 필요해요." },
  { id: "language", severity: "legendary", template: "{totalLangs}개 언어의 지옥! 이건 코드가 아니라 바벨탑의 잔해예요." },
  { id: "language", severity: "legendary", template: "이 프로젝트를 인수인계 받은 사람의 퇴사율: 100%." },
  { id: "language", severity: "legendary", template: "코드베이스가 이렇게 혼돈이면 차라리 처음부터 다시 만드는 게 나아요." },
  { id: "language", severity: "legendary", template: "이 레포에는 고대 문명의 코드와 현대 코드가 공존해요. 시공간을 초월한 레포." },
  { id: "language", severity: "legendary", template: "{topLang}이 {topLangRatio}%인 이 레포는 기술 결정의 실패 사례로 교과서에 실릴 수준이에요." },
  { id: "language", severity: "legendary", template: "이 프로젝트의 기술 스택 다이어그램을 그리면 추상화 작품이 완성돼요." },

  // ============================================================
  // 추가 대량 템플릿: 각 severity별 다양한 변형
  // ============================================================

  // 프로젝트 크기/복잡도 관련 — mild
  { id: "language", severity: "mild", template: "코드가 {topLang}으로 잘 정리되어 있네요. 보기 좋습니다." },
  { id: "language", severity: "mild", template: "{topLang} 프로젝트, {topLangRatio}% 비율. 깔끔한 구성." },
  { id: "language", severity: "mild", template: "기술 스택이 명확해요. {topLang}이 중심이시군요." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%. 좋은 언어 좋은 프로젝트." },
  { id: "language", severity: "mild", template: "언어 선택에서 실용주의가 느껴져요." },
  { id: "language", severity: "mild", template: "{topLang} 개발자시군요. 요즘 인기 있는 언어죠." },
  { id: "language", severity: "mild", template: "코드베이스가 {topLang}으로 일관되어 있어 좋네요." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%. 다른 개발자가 합류하기 좋은 구성." },
  { id: "language", severity: "mild", template: "언어 분포가 심플해요. {topLang} 중심." },
  { id: "language", severity: "mild", template: "{topLang}이 메인인 건 좋은 선택이에요." },
  { id: "language", severity: "mild", template: "깔끔한 {topLang} 프로젝트. 유지보수하기 좋겠어요." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%. 기본에 충실한 프로젝트." },
  { id: "language", severity: "mild", template: "코드 구성이 직관적이에요. {topLang} 위주." },
  { id: "language", severity: "mild", template: "{totalLangs}개 언어, {topLang}이 리드. 자연스러운 구성." },
  { id: "language", severity: "mild", template: "{topLang} 프로젝트시군요. 취업 시장에서도 인기 있는 스택." },

  // 프로젝트 크기/복잡도 관련 — medium
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%면 나머지 파일들은 장식품인가요?" },
  { id: "language", severity: "medium", template: "이 프로젝트, 좀 정리가 필요해 보여요." },
  { id: "language", severity: "medium", template: "{topLang} 외에 의미 없는 파일이 좀 있네요." },
  { id: "language", severity: "medium", template: "코드보다 설정+문서가 많은 느낌이에요." },
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%... 좀 더 깔끔하게 정리하면 좋겠어요." },
  { id: "language", severity: "medium", template: "이 레포에서 불필요한 파일을 정리하면 크기가 반으로 줄겠네요." },
  { id: "language", severity: "medium", template: "{topLang}이 주력이시면 나머지 언어 파일들은 삭제하시는 게..." },
  { id: "language", severity: "medium", template: "프로젝트 구조에 일관성이 좀 부족해요." },
  { id: "language", severity: "medium", template: "{totalLangs}개 언어를 유지하느라 빌드 설정이 복잡하시겠어요." },
  { id: "language", severity: "medium", template: "코드 정리의 시간이 필요한 레포예요." },

  // 개발 문화 관련 — medium
  { id: "language", severity: "medium", template: "린터 설정 파일은 많은데... 린트를 돌리시긴 하시나요?" },
  { id: "language", severity: "medium", template: ".prettierrc, .eslintrc, .editorconfig... 설정은 많은데 코드 품질은?" },
  { id: "language", severity: "medium", template: "CI/CD 설정은 화려한데 테스트 파일이 없으면 의미가 없어요." },
  { id: "language", severity: "medium", template: "Dockerfile은 있는데 docker-compose.yml이 없으면 반쪽이에요." },
  { id: "language", severity: "medium", template: ".github 디렉토리가 실제 코드보다 알찬 레포." },

  // 개발 문화 관련 — savage
  { id: "language", severity: "savage", template: "린터 설정 파일 10개에 eslint-disable 주석 100개. 의미가 있나요?" },
  { id: "language", severity: "savage", template: "Prettier 설정은 있는데 코드 포맷이 엉망이면 돌리시기나 하시는 건지." },
  { id: "language", severity: "savage", template: "CI 설정은 화려한데 항상 빨간불이면 장식이에요." },
  { id: "language", severity: "savage", template: ".gitignore에 넣어야 할 파일이 커밋되어 있어요. 기본부터 하세요." },
  { id: "language", severity: "savage", template: "husky + lint-staged 설정은 있는데 --no-verify로 커밋하시죠?" },

  // 빌드/번들 관련 — medium
  { id: "language", severity: "medium", template: "webpack.config.js가 500줄 넘을 것 같은 불길한 예감." },
  { id: "language", severity: "medium", template: "빌드 설정 파일이 너무 많아요. webpack + babel + rollup 전부 쓰시나요?" },
  { id: "language", severity: "medium", template: "번들러 설정이 복잡해 보여요. Vite로 옮기시면 편할텐데." },
  { id: "language", severity: "medium", template: "tsconfig가 3개 이상이면 좀 복잡한 거예요." },
  { id: "language", severity: "medium", template: "빌드 설정 파일이 코드보다 복잡한 프로젝트." },

  // 빌드/번들 관련 — savage
  { id: "language", severity: "savage", template: "webpack 설정이 본체보다 복잡하면 이건 webpack 프로젝트예요." },
  { id: "language", severity: "savage", template: "빌드 설정만 이해하는 데 3일 걸리는 프로젝트." },
  { id: "language", severity: "savage", template: "babel + webpack + rollup + esbuild... 번들러도 결정 못하시네요." },
  { id: "language", severity: "savage", template: "tsconfig.json이 5개?! extends 체인이 미로 같겠네요." },
  { id: "language", severity: "savage", template: "빌드 파이프라인이 루브 골드버그 머신이에요." },

  // 모노레포 관련 — medium
  { id: "language", severity: "medium", template: "모노레포에 {totalLangs}개 언어... 패키지 매니저가 고생하겠네요." },
  { id: "language", severity: "medium", template: "모노레포에서 {topLang}이 {topLangRatio}%. 나머지 패키지는 방치 중?" },
  { id: "language", severity: "medium", template: "lerna.json + turbo.json + nx.json... 모노레포 도구도 결정 못하셨네요." },

  // 모노레포 관련 — savage
  { id: "language", severity: "savage", template: "모노레포에 {totalLangs}개 언어! CI가 매번 30분 걸리겠네요." },
  { id: "language", severity: "savage", template: "모노레포라면서 패키지 간 의존성이 스파게티인 건 아닌지." },
  { id: "language", severity: "savage", template: "이 모노레포에서 '한 패키지만 수정'하면 전체 빌드가 깨지는 거 아니에요?" },

  // 개발 트렌드 관련 — mild
  { id: "language", severity: "mild", template: "{topLang} 쓰시는 거 보니 트렌드를 잘 따라가시네요." },
  { id: "language", severity: "mild", template: "최신 기술을 잘 활용하시는 것 같아요." },
  { id: "language", severity: "mild", template: "기술 선택이 시대에 맞아요. {topLang} 좋은 선택." },

  // 개발 트렌드 관련 — medium
  { id: "language", severity: "medium", template: "이 기술 스택... 2년 전에는 핫했는데 지금은 좀..." },
  { id: "language", severity: "medium", template: "트렌디한 기술만 쫓으시면 안정성이 걱정돼요." },
  { id: "language", severity: "medium", template: "Hype Driven Development(유행 기반 개발)이신 건 아닌지..." },

  // 개발 트렌드 관련 — savage
  { id: "language", severity: "savage", template: "이 기술 스택은 2019년에 멈춰있어요. 타임캡슐인가요?" },
  { id: "language", severity: "savage", template: "기술 트렌드를 따라가다 지쳐서 포기하신 흔적이 보여요." },
  { id: "language", severity: "savage", template: "Hacker News에서 뜨는 거 다 가져다 쓰시는 건 아닌지." },

  // Notebook/Jupyter 관련
  { id: "language", severity: "mild", template: ".ipynb 파일이 보이네요. 데이터 분석을 하시는군요." },
  { id: "language", severity: "medium", template: "Jupyter Notebook이 git에... 머지 충돌이 지옥이시겠네요." },
  { id: "language", severity: "savage", template: ".ipynb 파일을 git으로 관리하시다니! JSON diff를 즐기시나요?" },
  { id: "language", severity: "legendary", template: "Jupyter Notebook이 프로젝트의 메인! 이건 개발이 아니라 실험 노트예요." },

  // Makefile 관련
  { id: "language", severity: "mild", template: "Makefile이 있네요. 빌드 자동화를 하시는군요." },
  { id: "language", severity: "medium", template: "Makefile이 1000줄이 넘으면 그건 Makefile이 아니라 운영체제예요." },
  { id: "language", severity: "savage", template: "Makefile 안에 모든 것이 다 들어가 있는 올인원 레시피!" },
  { id: "language", severity: "legendary", template: "Makefile이 프로젝트의 핵심! make install 하면 인생이 설치되나요?" },

  // Docker 관련
  { id: "language", severity: "mild", template: "Dockerfile이 있네요. 컨테이너화를 하시는군요." },
  { id: "language", severity: "medium", template: "Dockerfile이 여러 개... 멀티스테이지 빌드는 하시죠?" },
  { id: "language", severity: "savage", template: "Docker 이미지 크기가 우주급이 아닐까 걱정돼요." },
  { id: "language", severity: "legendary", template: "Dockerfile이 100줄이 넘으면 그건 Dockerfile이 아니라 서사시예요." },

  // GraphQL/Proto 관련
  { id: "language", severity: "mild", template: ".graphql 파일이 보이네요. API 설계를 깔끔하게 하시는군요." },
  { id: "language", severity: "medium", template: "Proto 파일이 많네요. gRPC 세계의 시민이시군요." },
  { id: "language", severity: "savage", template: "GraphQL 스키마가 코드보다 복잡한 프로젝트!" },
  { id: "language", severity: "legendary", template: ".proto + .graphql + OpenAPI spec... API 정의만으로 레포가 가득!" },

  // Terraform/IaC 관련
  { id: "language", severity: "mild", template: ".tf 파일이 보이네요. Infrastructure as Code를 하시는군요." },
  { id: "language", severity: "medium", template: "Terraform 파일이 많네요. 인프라 관리에 열정적이시군요." },
  { id: "language", severity: "savage", template: "Terraform 코드가 애플리케이션 코드보다 많으면 이건 인프라 프로젝트예요." },
  { id: "language", severity: "legendary", template: ".tf 파일이 전체의 대부분! 이건 앱이 아니라 인프라가 본체예요." },

  // 기타 재미있는 패턴
  { id: "language", severity: "mild", template: "다양한 파일 형식이 보여요. 호기심 많은 개발자." },
  { id: "language", severity: "mild", template: "코드가 깔끔하게 구성되어 있어요. 칭찬합니다." },
  { id: "language", severity: "mild", template: "{topLang}을 선택하신 건 현명한 결정이었어요." },
  { id: "language", severity: "mild", template: "프로젝트 구조를 보니 경험이 느껴지네요." },
  { id: "language", severity: "mild", template: "기술 스택이 실용적이에요. 잘하고 계세요." },

  { id: "language", severity: "medium", template: "이 프로젝트... 기술 부채를 안고 가시는군요." },
  { id: "language", severity: "medium", template: "코드 구조에 좀 손을 대야 할 것 같아요." },
  { id: "language", severity: "medium", template: "파일 정리를 하시면 레포가 훨씬 깨끗해질 거예요." },
  { id: "language", severity: "medium", template: "이 기술 스택으로 팀원을 구하려면 좀 힘들겠네요." },
  { id: "language", severity: "medium", template: "프로젝트 구조가 좀 독특하네요. 좋게 말하면." },

  { id: "language", severity: "savage", template: "이 코드베이스는 고고학적 가치가 있어요." },
  { id: "language", severity: "savage", template: "새 개발자가 이 레포를 보면 도망칠 거예요." },
  { id: "language", severity: "savage", template: "이 프로젝트의 기술 스택은 '일단 되게 해'의 결과물이에요." },
  { id: "language", severity: "savage", template: "코드 리뷰를 하려면 폴리글랏이어야 하는 레포." },
  { id: "language", severity: "savage", template: "이 레포는 기술 결정의 무덤이에요." },

  { id: "language", severity: "legendary", template: "이 프로젝트를 이해할 수 있는 사람은 신만이 존재해요." },
  { id: "language", severity: "legendary", template: "코드베이스가 이렇게 카오스한데 돌아가는 게 기적이에요." },
  { id: "language", severity: "legendary", template: "이 레포에 불을 지르고 처음부터 다시 만드는 게 나을 수 있어요." },
  { id: "language", severity: "legendary", template: "당신의 코드베이스는 전설이 될 것입니다... 나쁜 의미로." },
  { id: "language", severity: "legendary", template: "이 프로젝트의 유일한 문서: '여기에 들어오는 자, 모든 희망을 버려라'." },

  // ============================================================
  // 한국 개발 문화 관련 추가 템플릿
  // ============================================================
  { id: "language", severity: "mild", template: "{topLang}이시군요. 국비 교육원 출신이시면 Java, 현직이시면 뭐든 가능." },
  { id: "language", severity: "mild", template: "한국 개발자의 정석: {topLang} {topLangRatio}%." },
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%... 학원에서 배운 거 그대로 쓰시는 건 아니시죠?" },
  { id: "language", severity: "medium", template: "이 기술 스택, 한국 SI 프로젝트 향기가 나요." },
  { id: "language", severity: "medium", template: "네이버 검색으로 {topLang} 공부하신 흔적이 보여요." },
  { id: "language", severity: "savage", template: "이 레포에서 '야근의 흔적'이 언어 분포에서 느껴져요." },
  { id: "language", severity: "savage", template: "SI 프로젝트 납품 후 유지보수 안 하면 이렇게 되는 거예요." },
  { id: "language", severity: "savage", template: "이 코드베이스는 '빨리빨리' 문화의 산물이에요." },
  { id: "language", severity: "legendary", template: "이 레포는 한국 IT 역사의 암흑기를 증언하고 있어요." },
  { id: "language", severity: "legendary", template: "납기일에 맞추느라 기술 부채를 전부 떠안으신 게 보여요." },

  // ============================================================
  // 마지막 대량 추가: 변형 표현들
  // ============================================================
  { id: "language", severity: "mild", template: "{topLang}과 함께하는 코딩 생활. 즐거우시죠?" },
  { id: "language", severity: "mild", template: "코드의 {topLangRatio}%가 {topLang}. 충실한 개발자." },
  { id: "language", severity: "mild", template: "{topLang} 러버이시군요. 좋은 취향이에요." },
  { id: "language", severity: "mild", template: "언어 분포를 보니 정리를 잘하시는 분이에요." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%. 이 프로젝트에 딱 맞는 선택." },
  { id: "language", severity: "mild", template: "코드가 {topLang}으로 통일되어 있어 일관적이에요." },
  { id: "language", severity: "mild", template: "{totalLangs}개 언어. 적절한 수준이에요." },
  { id: "language", severity: "mild", template: "{topLang}이 메인인 깔끔한 레포. 보기 좋아요." },
  { id: "language", severity: "mild", template: "기술 선택이 깔끔해요. {topLang} 중심." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%. 브라보." },
  { id: "language", severity: "mild", template: "코드 구성이 체계적이에요. 좋습니다." },
  { id: "language", severity: "mild", template: "{topLang} 프로젝트. 기본기에 충실하시네요." },
  { id: "language", severity: "mild", template: "정돈된 코드베이스. {topLang} {topLangRatio}%." },
  { id: "language", severity: "mild", template: "{topLang}이 리딩하는 건강한 프로젝트." },
  { id: "language", severity: "mild", template: "코드가 깨끗하고 {topLang}으로 일관돼 있어요." },

  { id: "language", severity: "medium", template: "코드와 설정의 비율이 좀 아슬아슬해요." },
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%... 좀 더 효율적으로 쓸 수 있을 것 같아요." },
  { id: "language", severity: "medium", template: "이 프로젝트, 기술 부채가 눈에 보여요." },
  { id: "language", severity: "medium", template: "파일 구조가 좀 지저분해요. 정리 좀 하시죠." },
  { id: "language", severity: "medium", template: "{topLang} 외의 파일들이 산만해요." },
  { id: "language", severity: "medium", template: "이 레포, 대청소가 필요해 보여요." },
  { id: "language", severity: "medium", template: "{totalLangs}개 언어 중 절반은 필요 없어 보여요." },
  { id: "language", severity: "medium", template: "코드베이스에 군살이 좀 있네요." },
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%에 잡다한 파일이 너무 많아요." },
  { id: "language", severity: "medium", template: "이 프로젝트는 다이어트가 필요해요." },

  { id: "language", severity: "savage", template: "이 레포의 파일 목록만 봐도 머리가 아파요." },
  { id: "language", severity: "savage", template: "코드베이스가 정크 푸드 같아요. 건강하지 않습니다." },
  { id: "language", severity: "savage", template: "{topLang} {topLangRatio}%인데 나머지가 전부 쓰레기 같은 건 왜죠?" },
  { id: "language", severity: "savage", template: "이 프로젝트에는 '기술 부채 파산 선고'가 필요해요." },
  { id: "language", severity: "savage", template: "파일 정리를 하면 이 레포의 가치가 올라갈 거예요." },
  { id: "language", severity: "savage", template: "{totalLangs}개 언어의 무법 지대. 규칙이라곤 없네요." },
  { id: "language", severity: "savage", template: "이 코드베이스를 보면 개발자의 고통이 느껴져요." },
  { id: "language", severity: "savage", template: "{topLang}이 울고 있어요. 이 레포에서 해방시켜 주세요." },
  { id: "language", severity: "savage", template: "기술 선택의 일관성이 주식 차트 같아요. 롤러코스터." },
  { id: "language", severity: "savage", template: "이 레포는 '어떻게 하면 안 되는지'의 교본이에요." },

  { id: "language", severity: "legendary", template: "이 레포를 열어본 사람들의 공통 반응: '...(무언의 비명)'." },
  { id: "language", severity: "legendary", template: "코드베이스의 혼돈이 예술의 경지에 달했어요." },
  { id: "language", severity: "legendary", template: "이 프로젝트는 '다시는 이렇게 하지 말자'의 살아있는 예시." },
  { id: "language", severity: "legendary", template: "{topLang} {topLangRatio}%! 이 언어마저 이 레포에서 탈출하고 싶어해요." },
  { id: "language", severity: "legendary", template: "이 레포의 README 첫 줄: '여기서 일하는 모든 이에게 경의를 표합니다'." },
  { id: "language", severity: "legendary", template: "코드베이스가 이렇게 혼란스러운 건 처음 봐요. 진심으로." },
  { id: "language", severity: "legendary", template: "이 프로젝트를 리팩토링하면 노벨 평화상 감이에요." },
  { id: "language", severity: "legendary", template: "당신의 레포는 전설이 될 것입니다. 미래 개발자들의 '절대 하면 안 되는 것' 교재로." },
  { id: "language", severity: "legendary", template: "이 코드베이스 앞에서는 모든 lint 도구가 무릎을 꿇어요." },
  { id: "language", severity: "legendary", template: "이 레포에 AI 코드 분석을 돌리면 AI가 정신 건강 상담을 요청할 거예요." },

  // ============================================================
  // Wasm/Zig/V/Nim 등 신생 언어
  // ============================================================
  { id: "language", severity: "mild", template: "Zig가 보이네요! 최신 시스템 프로그래밍에 관심이 있으시군요." },
  { id: "language", severity: "medium", template: "Zig/V/Nim... 아직 생태계가 성숙하지 않은 언어를 쓰시다니 모험가시네요." },
  { id: "language", severity: "savage", template: "아직 1.0도 안 된 언어를 프로덕션에 쓰시는 건가요?!" },
  { id: "language", severity: "legendary", template: "이 레포에서 쓰는 언어의 GitHub 스타가 100개 미만인 건 아닌지..." },

  // WebAssembly 관련
  { id: "language", severity: "mild", template: ".wasm 파일이 보이네요. 웹 성능에 진심이시군요." },
  { id: "language", severity: "medium", template: "WebAssembly를 쓰시다니... 최적화에 집착하시는 분." },
  { id: "language", severity: "savage", template: "Wasm으로 Hello World를 만드셨나요? 오버 엔지니어링의 정석." },
  { id: "language", severity: "legendary", template: "웹에서 Wasm으로 C 코드를 돌리시다니. 왜 그냥 네이티브로 안 만드세요?" },

  // Solidity/블록체인
  { id: "language", severity: "mild", template: "Solidity가 보이네요. Web3 세계의 시민이시군요." },
  { id: "language", severity: "medium", template: "Solidity {topLangRatio}%... 스마트 컨트랙트 취약점 조심하세요." },
  { id: "language", severity: "savage", template: "Solidity {topLangRatio}%! 해킹당하면 코드는 불변인데 돈은 사라지죠." },
  { id: "language", severity: "legendary", template: "Solidity {topLangRatio}%! '탈중앙화'라면서 당신 혼자 커밋하시는 거 아니에요?" },

  // 마지막 보충: 다양한 각도의 mild
  { id: "language", severity: "mild", template: "코드가 정돈되어 있어요. 좋은 습관이에요." },
  { id: "language", severity: "mild", template: "프로젝트 구조가 보기 좋네요." },
  { id: "language", severity: "mild", template: "{topLang} 개발자시군요. 반갑습니다." },
  { id: "language", severity: "mild", template: "깔끔한 코드베이스. 유지보수하기 좋겠어요." },
  { id: "language", severity: "mild", template: "기술 스택 선택이 합리적이에요." },
  { id: "language", severity: "mild", template: "{topLang}으로 잘 만들어진 프로젝트군요." },
  { id: "language", severity: "mild", template: "언어 비율이 적절해요. 잘하고 계세요." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%. 집중력이 느껴지는 레포." },
  { id: "language", severity: "mild", template: "코드 구성이 논리적이에요." },
  { id: "language", severity: "mild", template: "{topLang} 프로젝트의 좋은 예시." },
  { id: "language", severity: "mild", template: "프로젝트가 잘 관리되고 있어요." },
  { id: "language", severity: "mild", template: "기술 선택에서 경험이 느껴집니다." },
  { id: "language", severity: "mild", template: "{topLang}을 잘 다루시는 것 같아요." },
  { id: "language", severity: "mild", template: "언어 구성이 실용적이에요." },
  { id: "language", severity: "mild", template: "코드가 일관적이라 읽기 좋아요." },
  { id: "language", severity: "mild", template: "{topLang} 생태계를 잘 활용하시네요." },
  { id: "language", severity: "mild", template: "프로젝트의 방향성이 명확해요." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%. 한 길만 걸으시는 분." },
  { id: "language", severity: "mild", template: "좋은 기술 스택이에요. 유지하세요." },
  { id: "language", severity: "mild", template: "{topLang} 중심의 깔끔한 구성. 좋습니다." },

  // ============================================================
  // 추가 대량 보충 — 1000개 이상 달성을 위한 추가 템플릿
  // ============================================================

  // 다양한 파일 패턴 관련 — mild
  { id: "language", severity: "mild", template: "README가 잘 작성되어 있네요. 좋은 첫인상이에요." },
  { id: "language", severity: "mild", template: ".gitignore가 잘 설정되어 있어요. 기본에 충실하시네요." },
  { id: "language", severity: "mild", template: "라이선스 파일이 있네요. 오픈소스 정신이시군요." },
  { id: "language", severity: "mild", template: "CHANGELOG가 있으시네요. 버전 관리에 신경 쓰시는 분." },
  { id: "language", severity: "mild", template: "CONTRIBUTING.md가 있네요. 커뮤니티를 생각하시는군요." },
  { id: "language", severity: "mild", template: "{topLang}으로 만든 깔끔한 프로젝트. 존경합니다." },
  { id: "language", severity: "mild", template: "코드 품질이 느껴지는 레포예요. {topLang} {topLangRatio}%." },
  { id: "language", severity: "mild", template: "언어 선택이 시장 트렌드에 맞아요." },
  { id: "language", severity: "mild", template: "{topLang} 프로젝트의 표준을 잘 따르고 계세요." },
  { id: "language", severity: "mild", template: "기술적 결정이 합리적이에요. 잘하고 계세요." },
  { id: "language", severity: "mild", template: "{topLang} 생태계의 베스트 프랙티스를 따르시네요." },
  { id: "language", severity: "mild", template: "프로젝트 구조가 표준적이에요. 다른 개발자가 이해하기 쉬워요." },
  { id: "language", severity: "mild", template: "{topLang}으로 잘 만들어진 소프트웨어. 감사합니다." },
  { id: "language", severity: "mild", template: "이 프로젝트는 {topLang}의 좋은 활용 사례예요." },
  { id: "language", severity: "mild", template: "코드 품질이 보통 이상이에요. 칭찬합니다." },

  // 코드 복잡도 관련 — medium
  { id: "language", severity: "medium", template: "{topLang} 파일이 거대한 게 있을 것 같은 느낌이에요." },
  { id: "language", severity: "medium", template: "코드 파일 하나가 1000줄이 넘으면 분할하셔야 해요." },
  { id: "language", severity: "medium", template: "god class가 있을 것 같은 프로젝트 구조예요." },
  { id: "language", severity: "medium", template: "utils.ts 파일이 전체의 30%일 것 같은 불길한 예감." },
  { id: "language", severity: "medium", template: "index.ts가 500줄이 넘으면 리팩토링이 필요해요." },
  { id: "language", severity: "medium", template: "{topLang} 파일 수는 적은데 파일당 줄 수가 많으실 것 같아요." },
  { id: "language", severity: "medium", template: "코드 구조를 보니 순환 참조가 있을 것 같은 느낌." },
  { id: "language", severity: "medium", template: "폴더 구조가 플랫하면 파일 찾기가 지옥이에요." },
  { id: "language", severity: "medium", template: "src/ 아래에 파일이 100개 이상이면 하위 폴더를 만드세요." },
  { id: "language", severity: "medium", template: "{topLang} 코드에 주석이 거의 없을 것 같아요. 맞죠?" },

  // 코드 복잡도 관련 — savage
  { id: "language", severity: "savage", template: "god file이 존재할 것 같아요. 3000줄짜리 하나의 파일에 모든 것이." },
  { id: "language", severity: "savage", template: "utils.ts가 프로젝트의 심장이면 그건 아키텍처가 아니에요." },
  { id: "language", severity: "savage", template: "폴더 구조 없이 모든 파일이 루트에? 이건 정리가 아니라 방치." },
  { id: "language", severity: "savage", template: "index.ts에서 모든 것을 export하면 그건 barrel file이 아니라 쓰레기통." },
  { id: "language", severity: "savage", template: "순환 참조가 있으면 번들러가 울어요. 당신의 아키텍처도 울고 있고요." },
  { id: "language", severity: "savage", template: "한 파일에 함수 50개? 이건 파일이 아니라 전화번호부예요." },
  { id: "language", severity: "savage", template: "코드에 주석이 0개면 '코드가 자기 설명적'인 게 아니라 설명할 게 없는 거예요." },
  { id: "language", severity: "savage", template: "any로 가득 찬 TypeScript는 JavaScript보다 못해요." },
  { id: "language", severity: "savage", template: "console.log가 디버깅 도구의 전부이신 것 같아요." },
  { id: "language", severity: "savage", template: "TODO 주석이 코드보다 많으면 그건 할 일 목록이지 코드가 아니에요." },

  // 기술 스택 조합 — medium
  { id: "language", severity: "medium", template: "React + Vue + Angular이 한 레포에 있으면 이건 프레임워크 전쟁이에요." },
  { id: "language", severity: "medium", template: "Express + Koa + Hono + Fastify... 서버 프레임워크도 결정 못하시네요." },
  { id: "language", severity: "medium", template: "Jest + Mocha + Vitest가 공존하면 테스트 프레임워크 정체성 혼란이에요." },
  { id: "language", severity: "medium", template: "npm + yarn + pnpm lock 파일이 전부 있으면 패키지 매니저도 결정 못하신 거예요." },
  { id: "language", severity: "medium", template: "Prettier + ESLint + Rome이 다 있으면 포맷터도 통일 못하신 거예요." },

  // 기술 스택 조합 — savage
  { id: "language", severity: "savage", template: "React + Vue + Svelte가 한 레포에! 이건 프론트엔드 동물원이에요." },
  { id: "language", severity: "savage", template: "3개의 패키지 매니저 lock 파일이 공존! 이건 전쟁이에요." },
  { id: "language", severity: "savage", template: "테스트 프레임워크가 3개면 테스트를 안 하는 것보다 혼란스러워요." },
  { id: "language", severity: "savage", template: "CJS + ESM이 혼재된 프로젝트. import와 require가 싸우고 있어요." },
  { id: "language", severity: "savage", template: "CommonJS와 ESM의 전쟁터! 이건 모듈 시스템의 내전이에요." },

  // 한국 개발자 밈 — medium/savage
  { id: "language", severity: "medium", template: "{topLang} {topLangRatio}%... 코딩 테스트용으로만 쓰시는 건 아닌지." },
  { id: "language", severity: "medium", template: "이 기술 스택으로 코딩 테스트 보시면 좀 힘드실 수도." },
  { id: "language", severity: "medium", template: "정보처리기사 시험 코드 같은 프로젝트 구조." },
  { id: "language", severity: "savage", template: "이 레포는 '네카라쿠배' 코딩 테스트에 불합격 수준이에요." },
  { id: "language", severity: "savage", template: "이 코드베이스를 포트폴리오로 내시면 면접관이 울 거예요." },
  { id: "language", severity: "savage", template: "깃허브 잔디밭은 푸른데 코드 품질은 사막이에요." },

  // 파일 확장자 관련 추가
  { id: "language", severity: "mild", template: ".tsx 파일이 많네요. React + TypeScript 조합이시군요." },
  { id: "language", severity: "mild", template: ".vue 파일이 보여요. Vue.js 개발자시네요." },
  { id: "language", severity: "mild", template: ".svelte 파일이 있네요. 트렌디한 선택이에요." },
  { id: "language", severity: "mild", template: ".astro 파일이 보여요. 최신 프레임워크를 쓰시는군요." },
  { id: "language", severity: "medium", template: ".tsx와 .jsx가 혼용되어 있으면 TypeScript를 완전히 도입하신 게 아니에요." },
  { id: "language", severity: "medium", template: ".js와 .ts가 혼재하면 마이그레이션이 덜 끝난 거예요." },
  { id: "language", severity: "savage", template: ".js, .jsx, .ts, .tsx가 전부 있으면 이건 마이그레이션이 아니라 카오스." },
  { id: "language", severity: "savage", template: "TypeScript 마이그레이션을 시작만 하고 안 끝내신 거 맞죠?" },

  // 패키지/의존성 관련 — medium
  { id: "language", severity: "medium", template: "package.json의 dependencies가 100개 넘으면 좀 무거워요." },
  { id: "language", severity: "medium", template: "devDependencies가 dependencies보다 많으면 뭔가 좀..." },
  { id: "language", severity: "medium", template: "의존성이 이렇게 많으면 보안 취약점도 많겠네요." },
  { id: "language", severity: "medium", template: "node_modules 크기가 우주만 할 것 같아요." },
  { id: "language", severity: "savage", template: "dependencies 100개+! npm install에 5분 걸리겠네요." },
  { id: "language", severity: "savage", template: "leftpad 사건을 기억하세요? 의존성이 많을수록 위험해요." },
  { id: "language", severity: "savage", template: "is-even, is-odd 같은 패키지까지 설치하신 건 아니시죠?" },
  { id: "language", severity: "legendary", template: "의존성이 이렇게 많으면 당신의 코드보다 남의 코드가 더 많은 프로젝트예요." },

  // 추가 마지막 보충
  { id: "language", severity: "mild", template: "{topLang}이 주력이시군요. 확신을 가지고 가세요." },
  { id: "language", severity: "mild", template: "코드베이스에서 성실함이 느껴져요." },
  { id: "language", severity: "mild", template: "{topLang} 개발자로서의 경험이 느껴지는 레포." },
  { id: "language", severity: "mild", template: "기술 스택이 안정적이에요. 좋은 선택하셨어요." },
  { id: "language", severity: "mild", template: "이 레포는 잘 관리되고 있어요. 브라보." },
  { id: "language", severity: "mild", template: "{topLang} 프로젝트의 모범 사례에 가까워요." },
  { id: "language", severity: "mild", template: "코드 구성이 보기 좋아요. 계속 이렇게 하세요." },
  { id: "language", severity: "mild", template: "{topLang}을 잘 활용하시는 프로." },
  { id: "language", severity: "mild", template: "깔끔한 프로젝트 구조. 인상적이에요." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%. 안정적인 기술 기반." },
  { id: "language", severity: "medium", template: "이 프로젝트의 복잡도가 좀 높아 보여요." },
  { id: "language", severity: "medium", template: "코드 리뷰를 받으시면 더 좋아질 거예요." },
  { id: "language", severity: "medium", template: "리팩토링의 시간이 다가오고 있어요." },
  { id: "language", severity: "medium", template: "코드 품질에 좀 더 투자하시면 좋겠어요." },
  { id: "language", severity: "medium", template: "{topLang} 코드의 일관성이 좀 떨어져요." },
  { id: "language", severity: "savage", template: "이 코드베이스에서 패턴을 찾으려고 했는데 안티패턴만 발견했어요." },
  { id: "language", severity: "savage", template: "코드 리뷰 없이 성장한 프로젝트의 전형적인 모습이에요." },
  { id: "language", severity: "savage", template: "이 레포의 코드 품질은 기대 이하예요." },
  { id: "language", severity: "savage", template: "{topLang}으로 이런 코드를 쓸 수 있다니 놀랍네요. 나쁜 의미로." },
  { id: "language", severity: "savage", template: "이 프로젝트는 기술 부채의 이자가 복리로 늘어나고 있어요." },
  { id: "language", severity: "legendary", template: "이 레포의 코드 품질 점수: 측정 불가. 스케일을 벗어났어요." },
  { id: "language", severity: "legendary", template: "{topLang}으로 이 정도 혼돈을 만들 수 있다니 재능이에요. 나쁜 재능." },
  { id: "language", severity: "legendary", template: "이 코드베이스를 보면 {topLang}이 울어요. 진심으로." },
  { id: "language", severity: "legendary", template: "이 프로젝트의 언어 분포는 개발의 아픔을 대변합니다." },
  { id: "language", severity: "legendary", template: "{topLang} {topLangRatio}%! 이 언어가 이 레포에서 겪고 있는 고통이 느껴져요." },

  // 추가 마무리 보충
  { id: "language", severity: "mild", template: "기술 스택이 현대적이에요. 좋습니다." },
  { id: "language", severity: "mild", template: "{topLang} 생태계를 제대로 활용하시는 분." },
  { id: "language", severity: "mild", template: "코드가 잘 구조화되어 있어요. 유지보수성이 좋겠네요." },
  { id: "language", severity: "mild", template: "이 레포는 기술적으로 건강해요." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%. 합리적인 언어 분포." },
  { id: "language", severity: "medium", template: "파일 구조를 개선하면 개발 속도가 빨라질 거예요." },
  { id: "language", severity: "medium", template: "코드 구조가 좀 복잡해요. 단순화를 고려하세요." },
  { id: "language", severity: "medium", template: "이 프로젝트에 아키텍처 리뷰가 필요해 보여요." },
  { id: "language", severity: "savage", template: "이 코드베이스의 아키텍처를 '아키텍처'라고 부르기 어려워요." },
  { id: "language", severity: "savage", template: "코드 구조가 없는 게 구조인 프로젝트." },
  { id: "language", severity: "legendary", template: "이 레포의 아키텍처: 카오스. 설계 철학: 무(無)." },

  // ============================================================
  // 최종 보충: 1000개 달성
  // ============================================================
  { id: "language", severity: "mild", template: "{topLang} 프로젝트가 잘 돌아가고 있는 것 같아요." },
  { id: "language", severity: "mild", template: "기술 선택이 프로젝트에 잘 맞아요. 좋은 결정." },
  { id: "language", severity: "mild", template: "{topLang}으로 안정적인 서비스를 만드셨네요." },
  { id: "language", severity: "mild", template: "코드 품질이 느껴지는 {topLang} 프로젝트." },
  { id: "language", severity: "mild", template: "{topLang} {topLangRatio}%. 이 정도면 좋은 레포예요." },
  { id: "language", severity: "mild", template: "프로젝트의 기술적 기반이 탄탄해요." },
  { id: "language", severity: "mild", template: "{topLang} 생태계를 잘 이해하고 계시네요." },
  { id: "language", severity: "mild", template: "이 프로젝트는 {topLang}의 강점을 잘 살렸어요." },
  { id: "language", severity: "mild", template: "코드가 읽기 쉽게 작성되어 있어요. {topLang} 답네요." },
  { id: "language", severity: "mild", template: "{topLang} 커뮤니티의 베스트 프랙티스를 따르시는 분." },
  { id: "language", severity: "medium", template: "코드에 TODO가 많으면 '나중에 하겠다'가 영원이 돼요." },
  { id: "language", severity: "medium", template: "FIXME 주석이 있으면 지금 당장 고치세요. 나중은 없어요." },
  { id: "language", severity: "medium", template: "HACK 주석을 발견하면 리팩토링 신호예요." },
  { id: "language", severity: "medium", template: "deprecated 함수를 아직 쓰시면 업데이트가 필요해요." },
  { id: "language", severity: "medium", template: "코드 복사-붙여넣기가 많으면 DRY 원칙을 위반하는 거예요." },
  { id: "language", severity: "savage", template: "TODO 주석이 100개면 그건 TODO가 아니라 NEVER-DO예요." },
  { id: "language", severity: "savage", template: "FIXME가 2년째면 그건 WONT-FIX예요." },
  { id: "language", severity: "savage", template: "복사-붙여넣기 코드가 50%면 이건 코딩이 아니라 클리핑이에요." },
  { id: "language", severity: "legendary", template: "이 코드에서 TODO를 다 해결하면 새 프로젝트가 완성돼요." },
  { id: "language", severity: "legendary", template: "FIXME 주석의 나이가 프로젝트 나이와 같으면 희망이 없어요." },
];
