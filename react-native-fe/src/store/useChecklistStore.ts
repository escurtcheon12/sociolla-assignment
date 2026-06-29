import { create } from "zustand";

export type ChecklistType = "new_moms" | "hospital_bag" | null;
export type TabType = "new_moms" | "lil_ones";

export interface ChecklistItem {
  id: string;
  name: string;
  subtext?: string;
  checked: boolean;
}

export interface ChecklistGroup {
  id: string;
  title: string;
  items: ChecklistItem[];
  isHidden: boolean;
}

interface ChecklistStore {
  selectedChecklistType: ChecklistType;
  setSelectedChecklistType: (type: ChecklistType) => void;

  // Data for tabs
  newMomsGroups: ChecklistGroup[];
  lilOnesGroups: ChecklistGroup[];

  // Actions
  addGroup: (tab: TabType, title: string) => void;
  editGroup: (tab: TabType, groupId: string, newTitle: string) => void;
  deleteGroup: (tab: TabType, groupId: string) => void;
  hideGroup: (tab: TabType, groupId: string) => void;

  addItem: (
    tab: TabType,
    groupId: string,
    itemName: string,
    subtext?: string,
  ) => void;
  editItem: (
    tab: TabType,
    groupId: string,
    itemId: string,
    newName: string,
  ) => void;
  toggleItem: (tab: TabType, groupId: string, itemId: string) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const initialNewMoms: ChecklistGroup[] = [
  {
    id: "1",
    title: "Pregnancy",
    isHidden: false,
    items: [
      {
        id: "1-1",
        name: "Pregnancy Milk",
        subtext: "5 products",
        checked: false,
      },
      {
        id: "1-2",
        name: "Stretch Mark Care",
        subtext: "5 products",
        checked: false,
      },
      { id: "1-3", name: "Moisturizer", subtext: "5 products", checked: false },
      {
        id: "1-4",
        name: "Maternity Bra",
        subtext: "8 products",
        checked: false,
      },
    ],
  },
  {
    id: "2",
    title: "Breastfeeding",
    isHidden: false,
    items: [],
  },
  {
    id: "3",
    title: "Postpartum",
    isHidden: false,
    items: [],
  },
];

export const useChecklistStore = create<ChecklistStore>((set) => ({
  selectedChecklistType: null,
  setSelectedChecklistType: (type) => set({ selectedChecklistType: type }),

  newMomsGroups: initialNewMoms,
  lilOnesGroups: [], // Could have similar initial data

  addGroup: (tab, title) =>
    set((state) => {
      const key = tab === "new_moms" ? "newMomsGroups" : "lilOnesGroups";
      return {
        [key]: [
          ...state[key],
          { id: generateId(), title, items: [], isHidden: false },
        ],
      };
    }),

  editGroup: (tab, groupId, newTitle) =>
    set((state) => {
      const key = tab === "new_moms" ? "newMomsGroups" : "lilOnesGroups";
      return {
        [key]: state[key].map((g) =>
          g.id === groupId ? { ...g, title: newTitle } : g,
        ),
      };
    }),

  deleteGroup: (tab, groupId) =>
    set((state) => {
      const key = tab === "new_moms" ? "newMomsGroups" : "lilOnesGroups";
      return {
        [key]: state[key].filter((g) => g.id !== groupId),
      };
    }),

  hideGroup: (tab, groupId) =>
    set((state) => {
      const key = tab === "new_moms" ? "newMomsGroups" : "lilOnesGroups";
      return {
        [key]: state[key].map((g) =>
          g.id === groupId ? { ...g, isHidden: true } : g,
        ),
      };
    }),

  addItem: (tab, groupId, itemName, subtext) =>
    set((state) => {
      const key = tab === "new_moms" ? "newMomsGroups" : "lilOnesGroups";
      return {
        [key]: state[key].map((g) =>
          g.id === groupId
            ? {
                ...g,
                items: [
                  ...g.items,
                  { id: generateId(), name: itemName, subtext, checked: false },
                ],
              }
            : g,
        ),
      };
    }),

  editItem: (tab, groupId, itemId, newName) =>
    set((state) => {
      const key = tab === "new_moms" ? "newMomsGroups" : "lilOnesGroups";
      return {
        [key]: state[key].map((g) =>
          g.id === groupId
            ? {
                ...g,
                items: g.items.map((i) =>
                  i.id === itemId ? { ...i, name: newName } : i,
                ),
              }
            : g,
        ),
      };
    }),

  toggleItem: (tab, groupId, itemId) =>
    set((state) => {
      const key = tab === "new_moms" ? "newMomsGroups" : "lilOnesGroups";
      return {
        [key]: state[key].map((g) =>
          g.id === groupId
            ? {
                ...g,
                items: g.items.map((i) =>
                  i.id === itemId ? { ...i, checked: !i.checked } : i,
                ),
              }
            : g,
        ),
      };
    }),
}));
