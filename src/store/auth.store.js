import { create } from "zustand";


export const useAuthStore = create(set => ({
    news: [],
    setNews: (news) => set(state => ({...state, news: news})),
    subjects: [],
    setSubjects: (subjects) => set(state => ({...state, subjects: subjects})),
}))


