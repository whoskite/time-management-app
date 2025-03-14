import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeBlock {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  description?: string;
  status: 'planned' | 'in-progress' | 'completed';
  actualStartTime?: Date;
  actualEndTime?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface StoreState {
  tasks: Record<string, Task>;
  notes: Record<string, Note>;
  timeBlocks: Record<string, TimeBlock>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteTask: (id: string) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateNote: (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteNote: (id: string) => void;
  addTimeBlock: (timeBlock: Omit<TimeBlock, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateTimeBlock: (id: string, updates: Partial<Omit<TimeBlock, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteTimeBlock: (id: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      tasks: {},
      notes: {},
      timeBlocks: {},
      
      addTask: (task) => {
        const id = Math.random().toString(36).substring(2, 9);
        const now = new Date();
        
        set((state) => ({
          tasks: {
            ...state.tasks,
            [id]: {
              ...task,
              id,
              createdAt: now,
              updatedAt: now,
            },
          },
        }));
        
        return id;
      },
      
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: {
            ...state.tasks,
            [id]: {
              ...state.tasks[id],
              ...updates,
              updatedAt: new Date(),
            },
          },
        }));
      },
      
      deleteTask: (id) => {
        set((state) => {
          const { [id]: _, ...rest } = state.tasks;
          return { tasks: rest };
        });
      },
      
      addNote: (note) => {
        const id = Math.random().toString(36).substring(2, 9);
        const now = new Date();
        
        set((state) => ({
          notes: {
            ...state.notes,
            [id]: {
              ...note,
              id,
              createdAt: now,
              updatedAt: now,
            },
          },
        }));
        
        return id;
      },
      
      updateNote: (id, updates) => {
        set((state) => ({
          notes: {
            ...state.notes,
            [id]: {
              ...state.notes[id],
              ...updates,
              updatedAt: new Date(),
            },
          },
        }));
      },
      
      deleteNote: (id) => {
        set((state) => {
          const { [id]: _, ...rest } = state.notes;
          return { notes: rest };
        });
      },
      
      addTimeBlock: (timeBlock) => {
        const id = Math.random().toString(36).substring(2, 9);
        const now = new Date();
        
        set((state) => ({
          timeBlocks: {
            ...state.timeBlocks,
            [id]: {
              ...timeBlock,
              id,
              createdAt: now,
              updatedAt: now,
            },
          },
        }));
        
        return id;
      },
      
      updateTimeBlock: (id, updates) => {
        set((state) => ({
          timeBlocks: {
            ...state.timeBlocks,
            [id]: {
              ...state.timeBlocks[id],
              ...updates,
              updatedAt: new Date(),
            },
          },
        }));
      },
      
      deleteTimeBlock: (id) => {
        set((state) => {
          const { [id]: _, ...rest } = state.timeBlocks;
          return { timeBlocks: rest };
        });
      },
    }),
    {
      name: 'time-management-store',
      partialize: (state) => ({
        tasks: state.tasks,
        notes: state.notes,
        timeBlocks: state.timeBlocks,
      }),
    }
  )
);