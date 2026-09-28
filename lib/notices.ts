export type Notice = {
  id: string
  title: string
  author: string
  content: string
  createdAt: string
}

const notices: Notice[] = [
  {
    id: '1',
    title: '웹서버보안프로그래밍 개강 안내',
    author: '이병천',
    content: '강의계획서를 참고해 주세요',
    createdAt: '2026-09-01',
  },
  {
    id: '2',
    title: 'Github organization 초대',
    author: '이병천',
    content: '초대메일을 확인하고 가입해주세요',
    createdAt: '2026-09-03',
  },
  {
    id: '3',
    title: '첫번째 과제 안내',
    author: '이병천',
    content: 'LMS를 확인 바랍니다.',
    createdAt: '2026-09-05',
  },
]

let nextId = 4

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getNotices(): Promise<Notice[]> {
  await delay(600)
  return [...notices].sort((a, b) => (a.id < b.id ? 1 : -1))
}

export async function getNotice(id: string): Promise<Notice | undefined> {
  await delay(400)
  return notices.find((n) => n.id === id)
}

export async function createNotice(input: {
  title: string
  author: string
  content: string
}): Promise<Notice> {
  await delay(300)
  const notice: Notice = {
    id: String(nextId++),
    title: input.title,
    author: input.author,
    content: input.content,
    createdAt: new Date().toISOString().slice(0, 10),
  }
  notices.push(notice)
  return notice
}
