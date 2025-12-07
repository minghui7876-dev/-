import { GradeLevel, ScienceUnit, EnvIssue, Mapping } from './types';

// Data extracted from the provided PDF for Technical High School (Physics, Chemistry, Biology)
export const SCIENCE_UNITS: ScienceUnit[] = [
  // Physics B (物理 B)
  {
    id: 'PB-01',
    grade: GradeLevel.SeniorHigh,
    subject: '物理 (Physics)',
    topic: '能量的形式與轉換',
    code: 'PBa-V.2-3',
    description: '能量間的轉換。舉例說明各種能量間的轉換，以及能量守恆的觀念。',
  },
  {
    id: 'PB-02',
    grade: GradeLevel.SeniorHigh,
    subject: '物理 (Physics)',
    topic: '電磁現象',
    code: 'PKc-V.2-17',
    description: '發電機與交流電。探討發電原理與能源轉換。',
  },
  {
    id: 'PB-03',
    grade: GradeLevel.SeniorHigh,
    subject: '物理 (Physics)',
    topic: '波動、光及聲音',
    code: 'PKa-V.2-1',
    description: '振動與波。介紹波的傳播、特徵以及波動現象在生活中的應用。',
  },
  
  // Chemistry B (化學 B)
  {
    id: 'CB-01',
    grade: GradeLevel.SeniorHigh,
    subject: '化學 (Chemistry)',
    topic: '資源與永續發展',
    code: 'CNa-V.2-1',
    description: '綠色化學（化工）與環境及永續發展（含資源的保育、利用與再利用）。說明碳足跡的概念。',
  },
  {
    id: 'CB-02',
    grade: GradeLevel.SeniorHigh,
    subject: '化學 (Chemistry)',
    topic: '能源的開發與利用',
    code: 'CNc-V.2-7',
    description: '替代能源。介紹太陽能、風力、水力、地熱、生質能等替代能源的原理與應用。',
  },
  {
    id: 'CB-03',
    grade: GradeLevel.SeniorHigh,
    subject: '化學 (Chemistry)',
    topic: '物質的反應與平衡',
    code: 'CJe-V.2-1',
    description: '反應速率的定義與影響因素。探討溫度、濃度、催化劑對反應速率的影響，並連結燃燒與爆炸。',
  },

  // Biology B (生物 B)
  {
    id: 'BB-01',
    grade: GradeLevel.SeniorHigh,
    subject: '生物 (Biology)',
    topic: '生物與環境',
    code: 'BLb-V.2-2',
    description: '生態系。介紹生態系內碳、氮元素的循環及生態平衡間的關係。',
  },
  {
    id: 'BB-02',
    grade: GradeLevel.SeniorHigh,
    subject: '生物 (Biology)',
    topic: '資源與永續發展',
    code: 'BNc-V.2-1',
    description: '能源的開發與利用。探討生物資源（如生質能源）的開發利用與環境永續的關係。',
  },
  {
    id: 'BB-03',
    grade: GradeLevel.SeniorHigh,
    subject: '生物 (Biology)',
    topic: '生物多樣性',
    code: 'BGc-V.2-1',
    description: '生物多樣性。介紹遺傳、物種及生態系多樣性，並探討人類活動對生物多樣性的影響。',
  }
];

// Environmental Education Issues (Expanded with Disaster, Marine, SDGs)
export const ENV_ISSUES: EnvIssue[] = [
  {
    id: 'E001',
    theme: '氣候變遷 (Climate Change)',
    subTheme: '減緩與調適',
    code: '環 U6',
    content: '探究國際與國內對氣候變遷的應對措施，了解因應氣候變遷的國際公約的精神。',
  },
  {
    id: 'E002',
    theme: '能源資源永續利用',
    subTheme: '能源流動與循環',
    code: '環 U12',
    content: '了解循環型社會的涵意與執行策略，實踐綠色消費與友善環境的生活模式。',
  },
  {
    id: 'E003',
    theme: '環境倫理',
    subTheme: '生態正義',
    code: '環 U2',
    content: '理解人為破壞對其他物種與棲地所帶來的生態不正義，進而支持相關環境保護政策。',
  },
  {
    id: 'E004',
    theme: '災害防救 (Disaster Prevention)',
    subTheme: '風險管理與實作',
    code: '防 U4',
    content: '應用政府提供的各種防災資訊進行災害風險管理，如繪製防災地圖、規劃避難路線，並了解化學災害應變。',
  },
  {
    id: 'E005',
    theme: '海洋教育 (Marine Edu)',
    subTheme: '海洋科學與技術',
    code: '海 U11',
    content: '了解海浪、海嘯、與黑潮等海洋的物理特性，以及鹽度、礦物質等海洋的化學成分。',
  },
  {
    id: 'E006',
    theme: '海洋教育 (Marine Edu)',
    subTheme: '海洋資源與永續',
    code: '海 U18',
    content: '了解海洋環境汙染造成海洋生物與環境累積的後果，並提出因應對策(如減塑、保育)。',
  },
  {
    id: 'E007',
    theme: 'SDGs 永續發展目標',
    subTheme: 'SDG 7 & 13',
    code: 'SDGs',
    content: 'SDG 7：確保所有的人都可取得負擔得起、可靠、永續及現代的能源。SDG 13：完備減緩調適行動，以因應氣候變遷及其影響。',
  },
  {
    id: 'E008',
    theme: 'SDGs 永續發展目標',
    subTheme: 'SDG 14 水下生命',
    code: 'SDGs',
    content: 'SDG 14：保育及永續利用海洋與海洋資源，以確保永續發展。',
  }
];

// Mapping Logic
export const MAPPINGS: Mapping[] = [
  {
    scienceUnitId: 'PB-01',
    envIssueId: 'E002',
    relevance: '物理課的能量守恆定律是理解能源效率與資源循環的科學基礎。',
    exampleActivity: '計算家庭電器的能源轉換效率，設計「校園節能減碳」方案，分析能源流失的環節。',
  },
  {
    scienceUnitId: 'PB-02',
    envIssueId: 'E007',
    relevance: '發電機原理直接連結到能源生產方式 (SDG 7)，可探討綠色能源技術如何達成永續目標。',
    exampleActivity: '製作簡易發電機模型，比較風力發電與火力發電的碳排放差異，討論 SDG 7 可負擔能源的實現路徑。',
  },
  {
    scienceUnitId: 'PB-03',
    envIssueId: 'E005',
    relevance: '波動原理可用於解釋海浪與海嘯的形成與傳播，連結海洋科學知識。',
    exampleActivity: '利用水波槽模擬海嘯的傳播過程，探討海底地形對波高的影響，並連結防災教育中的海嘯警報機制。',
  },
  {
    scienceUnitId: 'CB-01',
    envIssueId: 'E001',
    relevance: '化學中的綠色化學原則與碳足跡計算，是減緩氣候變遷的技術核心。',
    exampleActivity: '選定一種生活產品（如寶特瓶），計算其生命週期的碳足跡，並提出符合綠色化學原則的改良製程。',
  },
  {
    scienceUnitId: 'CB-02',
    envIssueId: 'E007',
    relevance: '化學課介紹替代能源的化學原理，直接對應 SDG 7 清潔能源與 SDG 13 氣候行動。',
    exampleActivity: '實驗製作「染料敏化太陽能電池」或「氫燃料電池」，探討化學能在綠色能源中的應用潛力。',
  },
  {
    scienceUnitId: 'CB-03',
    envIssueId: 'E004',
    relevance: '反應速率與燃燒原理是理解火災爆炸等化學災害的基礎，連結災害防救教育。',
    exampleActivity: '探討粉塵爆炸的化學原理（反應表面積），並設計實驗室或工廠的防災安全規範與逃生路線。',
  },
  {
    scienceUnitId: 'BB-01',
    envIssueId: 'E003',
    relevance: '生態系的物質循環（碳、氮循環）受阻是環境問題的根源，連結到生態正義。',
    exampleActivity: '調查校園生態池的氮循環，討論人類活動（如施肥、廢水）如何破壞平衡，並提出棲地復育計畫。',
  },
  {
    scienceUnitId: 'BB-02',
    envIssueId: 'E002',
    relevance: '生物質能的開發涉及生物資源的利用，需考量糧食安全與生態平衡的永續議題。',
    exampleActivity: '辯論「種植能源作物（如玉米生質油）是否符合永續發展」，探討生質能源與糧食爭地的倫理問題。',
  },
  {
    scienceUnitId: 'BB-03',
    envIssueId: 'E006',
    relevance: '生物多樣性直接對應海洋資源保育，探討過度捕撈與塑膠微粒對海洋生態的影響。',
    exampleActivity: '進行「海洋廢棄物」對海洋生物多樣性影響的專題探究，並響應 SDG 14 提出減塑行動方案。',
  },
  {
    scienceUnitId: 'BB-03',
    envIssueId: 'E008',
    relevance: '探討海洋生態系的多樣性，呼應 SDG 14 保育及永續利用海洋生態資源。',
    exampleActivity: '分析台灣周邊海域（如珊瑚礁、紅樹林）的生態危機，並設計一個「海洋保護區」的規劃草案。',
  }
];