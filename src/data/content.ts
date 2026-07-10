// 여기 있는 값들만 수정하면 사이트 전체 내용이 바뀝니다.

export const profile = {
  name: "Jinmok",
  role: "Game Developer",
  tagline: "코드와 비주얼로 아이디어를 만듭니다.",
  location: "Seoul, South Korea",
  email: "jinmok0317@gmail.com",
  about: `안녕하세요, 게임과 인터랙티브 경험을 만드는 것을 좋아하는 개발자입니다. C/C++와 언리얼 엔진으로
게임을 만들고, 포토샵·일러스트레이터·애프터이펙트로 비주얼 작업까지 직접 다룹니다. 코드와
비주얼 양쪽을 오가며 아이디어를 실제로 눈에 보이는 결과물로 만드는 과정을 즐깁니다.`,
  highlights: [
    { label: "Years Coding", value: "3+" },
    { label: "Projects Shipped", value: "10+" },
    { label: "Cups of Coffee", value: "∞" },
  ],
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "프로젝트에 대한 간단한 설명을 여기에 적어주세요. 어떤 문제를 해결했는지, 어떤 기술을 썼는지 한두 문장으로 요약합니다.",
    tags: ["React", "TypeScript", "Node.js"],
    link: "#",
    repo: "#",
  },
  {
    title: "Project Two",
    description:
      "두 번째 프로젝트 설명입니다. 실제 작업물로 교체해주세요.",
    tags: ["Next.js", "Tailwind"],
    link: "#",
    repo: "#",
  },
  {
    title: "Project Three",
    description:
      "세 번째 프로젝트 설명입니다. 링크와 레포지토리 주소도 함께 채워주세요.",
    tags: ["Python", "FastAPI"],
    link: "#",
    repo: "#",
  },
];

// level: 1~5. 실제 숙련도에 맞게 자유롭게 조정하세요.
export type Skill = { name: string; level: number };

export const skills: { category: string; items: Skill[] }[] = [
  {
    category: "Languages",
    items: [
      { name: "C", level: 4 },
      { name: "C++", level: 5 },
      { name: "TypeScript", level: 4 },
      { name: "JavaScript", level: 4 },
      { name: "Python", level: 3 },
      { name: "Java", level: 3 },
    ],
  },
  {
    category: "Game Dev",
    items: [{ name: "Unreal Engine", level: 5 }],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", level: 4 },
      { name: "Next.js", level: 3 },
      { name: "Vite", level: 3 },
      { name: "Tailwind CSS", level: 4 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 3 },
      { name: "Express", level: 3 },
      { name: "FastAPI", level: 2 },
      { name: "PostgreSQL", level: 2 },
    ],
  },
  {
    category: "Creative Tools",
    items: [
      { name: "Photoshop", level: 3 },
      { name: "Illustrator", level: 3 },
      { name: "After Effects", level: 3 },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", level: 4 },
      { name: "Docker", level: 2 },
      { name: "Figma", level: 3 },
      { name: "Notion", level: 4 },
    ],
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/jinmok0317-hue" },
  { label: "Email", href: "mailto:jinmok0317@gmail.com" },
  { label: "LinkedIn", href: "#" },
];
