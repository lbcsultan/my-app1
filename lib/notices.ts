import { Notice as NoticeModel } from '@/models/Notice'
import { connectDB } from './mongodb'

export type Notice = {
  id: string
  title: string
  author: string
  content: string
  createdAt: string
}

type NoticeDocLike = {
  _id: unknown
  title: string
  author: string
  content: string
  createdAt?: Date
}

function toNotice(doc: NoticeDocLike): Notice {
  return {
    id: String(doc._id),
    title: doc.title,
    author: doc.author,
    content: doc.content,
    createdAt: (doc.createdAt ?? new Date()).toISOString().slice(0, 10),
  }
}

async function seedIfEmpty() {
  const count = await NoticeModel.countDocuments()
  if (count > 0) return

  await NoticeModel.insertMany([
    {
      title: '웹서버보안프로그래밍 개강 안내',
      author: '이병천',
      content: '강의계획서를 참고해 주세요',
    },
    {
      title: 'Github organization 초대',
      author: '이병천',
      content: '초대메일을 확인하고 가입해주세요',
    },
    {
      title: '첫번째 과제 안내',
      author: '이병천',
      content: 'LMS를 확인 바랍니다.',
    },
  ])
}

export async function getNotices(): Promise<Notice[]> {
  await connectDB()
  await seedIfEmpty()
  const docs = await NoticeModel.find().sort({ createdAt: -1 }).lean()
  return docs.map((doc) => toNotice(doc as NoticeDocLike))
}

export async function getNotice(id: string): Promise<Notice | undefined> {
  await connectDB()
  try {
    const doc = await NoticeModel.findById(id).lean()
    return doc ? toNotice(doc as NoticeDocLike) : undefined
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export async function createNotice(input: {
  title: string
  author: string
  content: string
}): Promise<Notice> {
  await connectDB()
  const doc = await NoticeModel.create(input)
  return toNotice(doc)
}
