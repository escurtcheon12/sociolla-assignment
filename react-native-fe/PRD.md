# PRD — Flow System (Checklist)

## 1) Overview

### Goal

Build a simple “Checklist” system with two tabs (“New Moms” and “Lil’ Ones”) that have the same behavior: users can view checklist groups, expand a group to see items, and manage groups/items (add, edit, delete, hide).

### Why

Help users prepare for pregnancy/baby needs by giving them a structured checklist they can customize.

### References (UI)

- Home → Select Checklist: `assets/ui/LA23 - HomeScreen - Select Checklist.png`
- Checklist (default): `assets/ui/LA23 - Checklist - Before Click.png`
- Checklist (action row shown): `assets/ui/LA23 - Checklist - After Click.png`
- Checklist (expanded group): `assets/ui/LA23 - Checklist (1).png`
- Delete confirmation: `assets/ui/LA23 - Delete Checklist - confirmation.png`
- Edit checklist modal: `assets/ui/LA23 - Edit Checklist.png`
- Add checklist modal: `assets/ui/LA23 - Add Checklist - edit item.png`
- Full flow: `assets/ui/flow_app.png`

## 2) Scope

### In Scope (MVP)

- Home screen opens “Select Checklist” bottom sheet if user has not selected a checklist yet.
- User selects a checklist type:
  - “New Moms Checklist”
  - “Hospital Bag Checklist”
- Checklist screen:
  - Two tabs: “New Moms” and “Lil’ Ones” (same behavior, different data set).
  - List of checklist groups (e.g., Pregnancy, Breastfeeding, Postpartum).
  - Each group shows:
    - Group title
    - Progress text `(done/total)` like `Pregnancy (0/5)`
    - 3-dots button to open action row (Delete / Hide / Edit)
    - Progress bar line
  - Expand/collapse a group to show its items.
  - Group items list:
    - Check/Uncheck item
    - Show item name and optional “X products” subtext
    - “+ Add new item” button inside expanded group
  - Add new checklist group (button at bottom: “Add New Checklist”)
  - Edit checklist group name + edit items (modal)
  - Delete checklist group (confirmation dialog)
  - Hide checklist group (behavior defined in section 5.3)
- Responsive UI across phone sizes (future-proof for tablets).

### Out of Scope (for MVP)

- Backend sync, login-specific cloud storage, multi-device sync.
- Product catalog integration (real product list inside “X products”).
- Push notifications, reminders, calendar integration.
- Complex permissions or sharing.

## 3) Success Metrics (simple)

- User can select a checklist and see the Checklist screen without crashes.
- User can add/edit/delete groups and add/check items with correct UI updates.
- UI matches the provided screenshots (layout + interactions).

## 4) Users & Use Cases

### Primary User

- A user who wants a pregnancy/baby preparation checklist.

### Key Use Cases

- Choose checklist type from Home.
- Switch between “New Moms” and “Lil’ Ones” tabs.
- Expand a group and check items.
- Add a new group and add items to it.
- Edit a group name and edit item names.
- Delete a group after confirmation.
- Hide a group to reduce clutter.

## 5) Functional Requirements

### 5.1 Home → Select Checklist (Bottom Sheet)

**Trigger**

- On entering the default page (Home/Tracker), if `selectedChecklistType` is not set, open a bottom sheet “Select Checklist”.

**UI**

- Title: “Select Checklist”
- Description banner text (from image):
  - “Yuk, siapkan checklist untuk mempermudah persiapan kelahiran si Kecil!”
- Options (tappable cards):
  - New Moms Checklist
  - Hospital Bag Checklist
- Close (X) on top-right of the sheet.

**Behavior**

- Tap an option:
  - Persist selection (`selectedChecklistType`)
  - Navigate to Checklist screen for that type
  - Close the bottom sheet
- Tap X:
  - Close sheet (user stays on Home)
  - Next time user opens Home again, sheet should still appear until a selection is made (unless product decides otherwise).

**Acceptance Criteria**

- If no selection exists, bottom sheet appears automatically.
- If selection exists, bottom sheet does not appear.

### 5.2 Checklist Screen (Tabs + Groups)

**Header**

- Back button (top-left)
- Screen title: based on selected checklist type, example: “New Mom Checklist”

**Tabs**

- Two tabs, same behavior:
  - “New Moms”
  - “Lil’ Ones”
- Default active tab: “New Moms” (as in images).
- Switching tabs updates the displayed group list (tab-specific data).

**Group Row UI (collapsed)**

- Group title with progress: `Group Name (done/total)`
- 3-dots menu button on right
- Progress bar under the title (thin line)

**Group Row Behavior**

- Tap group row (or dedicated area): toggle expand/collapse.
- Tap 3-dots: show action row under that group (see 5.3).

**Acceptance Criteria**

- Tabs work and show independent group lists.
- Expand/collapse works per group.
- Progress text updates based on checked items.

### 5.3 Group Action Row (Delete / Hide / Edit)

**UI**

- Appears below a group after tapping 3-dots.
- Contains three actions with icon + label:
  - Delete
  - Hide
  - Edit

**Behavior**

- Delete: opens confirmation dialog (5.4).
- Edit: opens edit modal bottom sheet (5.5).
- Hide: hides the group from the list (default behavior below).

**Hide Definition (MVP)**

- When user taps “Hide”, the group is removed from the visible list for the current tab only.
- Provide a recovery mechanism:
  - Option A (simple): Show a “Hidden checklists” section/button at bottom that lists hidden groups and allows “Unhide”.
  - Option B (simpler UI): Add a filter toggle “Show hidden” on screen.

For MVP, use Option A because it is clearer for junior implementation and avoids adding a global filter state.

**Acceptance Criteria**

- Only one group’s action row is visible at a time.
- Hide removes group from list and it can be unhidden.

### 5.4 Delete Checklist Group (Confirmation Dialog)

**UI**

- Title: “Delete Checklist”
- Body: “Kamu yakin ingin menghapus checklist ini?”
- Buttons:
  - “Delete” (outlined)
  - “Cancel” (filled/primary)

**Behavior**

- Delete: removes the group and all its items.
- Cancel: closes dialog without changes.

**Acceptance Criteria**

- Delete is not accidental (requires confirmation).
- After deletion, UI updates immediately and progress recalculates.

### 5.5 Edit Checklist Group (Bottom Sheet Modal)

Reference: `assets/ui/LA23 - Edit Checklist.png`

**UI**

- Title: “Edit Checklist”
- Close (X) top-right
- Text input for checklist group name (prefilled)
- List of items with:
  - Drag handle icon on left (visual only for MVP unless reordering is implemented)
  - Item name
  - Edit icon on right (pencil)
- Bottom buttons:
  - Cancel
  - Save (disabled until changes exist)

**Behavior**

- Edit group name:
  - Enable Save if name changed and not empty.
- Edit an item:
  - Tapping pencil opens inline edit (or a small modal) to update the item name.
  - Save updates the group items list.
- Cancel closes without changes.
- Save persists changes and closes modal.

**Validation Rules**

- Group name required (min 1 non-space char).
- Item name required (min 1 non-space char).
- Trim leading/trailing spaces before saving.

**Acceptance Criteria**

- Save button state matches changes.
- Invalid empty names are prevented.

### 5.6 Add New Checklist Group (Bottom Sheet Modal)

Reference: `assets/ui/LA23 - Add Checklist - edit item.png`

**Trigger**

- Tap “Add New Checklist” button on Checklist screen.

**UI**

- Title: “Add New Checklist”
- Close (X)
- Text input: checklist group name
- Item editor area:
  - Input row to type an item name
  - Small “Save” button to add it into the item list
  - “+ Add new item” secondary action
  - Each added item shows in a list with an edit icon
- Bottom buttons:
  - Cancel
  - Add (disabled until group name + at least 1 item exist)

**Behavior**

- Add item:
  - Adds an item to the new group list and clears the input.
- Edit item:
  - Update item name.
- Add:
  - Creates a new group in the current active tab.
  - New group is collapsed by default.
  - Close modal.

**Acceptance Criteria**

- Cannot add group with empty name.
- Cannot add group with zero items.

### 5.7 Checklist Items (Inside Expanded Group)

Reference: `assets/ui/LA23 - Checklist (1).png`

**UI**

- Each item row contains:
  - Circular checkbox indicator on left
  - Item name (e.g., “Pregnancy Milk”)
  - Optional subtitle “X products” (if available)
- A button inside expanded section: “+ Add new item”

**Behavior**

- Tapping item checkbox toggles `checked`.
- Progress updates in the group row: `(checkedCount/totalCount)`.
- “+ Add new item” adds a new item to that specific group (can reuse the item editor pattern).

**Acceptance Criteria**

- Check/uncheck persists and updates progress instantly.

## 6) Data Model (local-first)

Store locally (AsyncStorage/MMKV/etc. depending on existing project standard).

### Entities

**ChecklistType**

- `NEW_MOMS`
- `HOSPITAL_BAG`

**ChecklistTab**

- `MOMS`
- `LIL_ONES`

**ChecklistGroup**

- `id: string`
- `name: string`
- `hidden: boolean`
- `items: ChecklistItem[]`

**ChecklistItem**

- `id: string`
- `name: string`
- `checked: boolean`
- `productsCount?: number` (optional; can be omitted in MVP)

### Storage Shape (suggestion)

- `selectedChecklistType: ChecklistType | null`
- `checklistsByTypeAndTab: { [type]: { [tab]: ChecklistGroup[] } }`

## 7) UI Specs (Font, Icons, Colors)

### Typography

- Use Satoshi font from `assets/fonts/` for all screens in this feature.
- Suggested weights:
  - Title: Satoshi-Bold
  - Body: Satoshi-Regular
  - Secondary text: Satoshi-Medium or Regular with lower opacity

### Icons

Use icons from `assets/icons/` (match usage to screenshots):

- Tabs: `tab_mom.png`, `tab_lil.png`
- Select checklist labels: `label_mom.png`, `label_bag.png`, `next.png`
- Group header / illustration: `paper.png` or `list.png` (match screenshot)
- Actions: `trash.png`, `visibility.png`, `edit_white.png` / `edit.png`
- Add: `add_label.png`, `add_item.png`, `add_item_inside.png`

### Color Palette (match screenshots)

These are approximate values. Adjust to visually match the UI images exactly.

| Token           | Usage                                      | Hex (approx.) |
| --------------- | ------------------------------------------ | ------------- |
| `primaryPurple` | Active tab, primary buttons, action row bg | `#9B6AD6`     |
| `lavenderBg`    | Screen background                          | `#D9C1F3`     |
| `surfaceWhite`  | Bottom sheets, cards, modals               | `#FFFFFF`     |
| `peachCard`     | Checklist group cards                      | `#F7D7C2`     |
| `divider`       | Lines / separators                         | `#E9E3F2`     |
| `textPrimary`   | Main text                                  | `#1B1B1F`     |
| `textSecondary` | Subtitle text                              | `#6B6B76`     |
| `disabled`      | Disabled buttons                           | `#E6DDF3`     |

## 8) Responsiveness & Layout Rules

- Use Safe Area (top and bottom) for iOS notches/home indicators.
- No fixed heights for bottom sheets; content scrolls when needed.
- Checklist list is scrollable; keep “Add New Checklist” visible at bottom when possible, but allow it to scroll on small screens.
- Modals should support keyboard:
  - Inputs remain visible when keyboard is open.
  - Use keyboard avoiding behavior (platform-specific).
- Support at minimum:
  - Small phone (iPhone SE size)
  - Standard phone
  - Large phone / tablet (no broken layout)

## 9) Empty / Error States

- If a tab has zero visible groups:
  - Show a friendly empty state and “Add New Checklist”.
- If all groups are hidden:
  - Show “Hidden checklists (N)” section and allow unhide.
- If local storage fails:
  - Keep UI usable for the session (in-memory) and show a lightweight error message (toast/snackbar) if available in the app.

## 10) Non-Functional Requirements

- Performance: smooth scrolling for 50+ items (use virtualization if needed).
- Accessibility:
  - Touch targets at least 44x44 px.
  - Buttons and icons have accessible labels.
- Localization:
  - Text in screenshots is Indonesian; keep strings centralized for future translation.

## 11) QA Checklist (Acceptance Tests)

- First launch (no selection): “Select Checklist” sheet appears.
- Selecting “New Moms Checklist” navigates to Checklist screen and persists.
- Tabs switch correctly and keep independent data.
- Expand/collapse works, only the tapped group expands.
- 3-dots shows action row; Delete prompts confirmation.
- Delete removes group and recalculates progress.
- Edit group name + items; Save disabled until change; validations work.
- Add new group requires name + ≥1 item; created group appears in current tab.
- Hide removes group and it can be unhidden via “Hidden checklists”.
- Layout works on small + large screens; modals usable with keyboard.
