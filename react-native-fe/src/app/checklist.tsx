import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChecklistGroupItem } from "@/components/checklist/ChecklistGroupItem";
import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import {
  ChecklistGroup,
  TabType,
  useChecklistStore,
} from "@/store/useChecklistStore";

export default function ChecklistScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("new_moms");

  const {
    newMomsGroups,
    lilOnesGroups,
    addGroup,
    editGroup,
    deleteGroup,
    addItem,
    editItem,
  } = useChecklistStore();
  const groups = activeTab === "new_moms" ? newMomsGroups : lilOnesGroups;

  // Modals state
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<string | null>(null);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState<ChecklistGroup | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [newItemName, setNewItemName] = useState("");

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newGroupTitle, setNewGroupTitle] = useState("");
  const [newGroupItemName, setNewGroupItemName] = useState("");

  const handleConfirmDelete = () => {
    if (groupToDelete) {
      deleteGroup(activeTab, groupToDelete);
    }
    setDeleteModalVisible(false);
    setGroupToDelete(null);
  };

  const handleSaveEdit = () => {
    if (groupToEdit) {
      if (editTitle.trim()) {
        editGroup(activeTab, groupToEdit.id, editTitle);
      }
      if (newItemName.trim()) {
        addItem(activeTab, groupToEdit.id, newItemName);
      }
    }
    setEditModalVisible(false);
    setGroupToEdit(null);
    setEditTitle("");
    setNewItemName("");
  };

  const handleAddNewGroup = () => {
    if (newGroupTitle.trim()) {
      addGroup(activeTab, newGroupTitle);
      // If we wanted to immediately add the item, we'd need the new group ID.
      // For simplicity, we just add the group.
    }
    setAddModalVisible(false);
    setNewGroupTitle("");
    setNewGroupItemName("");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ThemedText style={styles.backIcon}>←</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>New Mom Checklist</ThemedText>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "new_moms" && styles.activeTab]}
          onPress={() => setActiveTab("new_moms")}
        >
          <View style={styles.tabIconContainer}>
            <Image
              source={require("@/assets/icons/tab_mom.png")}
              style={[styles.tabIcon]}
            />
          </View>
          <ThemedText
            style={[
              styles.tabText,
              activeTab === "new_moms" && styles.activeTabText,
            ]}
          >
            New Moms
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "lil_ones" && styles.activeTab]}
          onPress={() => setActiveTab("lil_ones")}
        >
          <View style={styles.tabIconContainer}>
            <Image
              source={require("@/assets/icons/tab_lil.png")}
              style={[styles.tabIcon]}
            />
          </View>
          <ThemedText
            style={[
              styles.tabText,
              activeTab === "lil_ones" && styles.activeTabText,
            ]}
          >
            Lil' Ones
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerIconContainer}>
            <Image
              source={require("@/assets/icons/paper.png")}
              style={styles.bannerIcon}
            />
          </View>
          <ThemedText style={styles.bannerText}>
            Yuk, siapkan checklist untuk mempermudah persiapan kelahiran si
            Kecil!
          </ThemedText>
        </View>

        {/* Checklist Groups */}
        {groups
          .filter((g) => !g.isHidden)
          .map((group) => (
            <ChecklistGroupItem
              key={group.id}
              tab={activeTab}
              group={group}
              onEdit={() => {
                setGroupToEdit(group);
                setEditTitle(group.title);
                setEditModalVisible(true);
              }}
              onDelete={() => {
                setGroupToDelete(group.id);
                setDeleteModalVisible(true);
              }}
            />
          ))}

        {/* Add New Checklist Button */}
        <TouchableOpacity
          style={styles.addNewChecklistBtn}
          onPress={() => setAddModalVisible(true)}
        >
          <ThemedText style={styles.addNewChecklistText}>
            Add New Checklist
          </ThemedText>
          <ThemedText style={styles.addNewChecklistPlus}>+</ThemedText>
        </TouchableOpacity>
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal visible={deleteModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Delete Checklist</ThemedText>
            <ThemedText style={styles.modalMessage}>
              Kamu yakin ingin menghapus checklist ini?
            </ThemedText>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalBtnOutline}
                onPress={() => setDeleteModalVisible(false)}
              >
                <ThemedText style={styles.modalBtnOutlineText}>
                  Cancel
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtnSolid}
                onPress={handleConfirmDelete}
              >
                <ThemedText style={styles.modalBtnSolidText}>Delete</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal visible={editModalVisible} transparent animationType="slide">
        <View style={styles.bottomModalOverlay}>
          <View style={styles.bottomModalContent}>
            <View style={styles.bottomModalHeader}>
              <ThemedText style={styles.modalTitle}>Edit Checklist</ThemedText>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <ThemedText style={styles.closeBtn}>✕</ThemedText>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Persiapan Melahirkan"
            />

            {/* List of existing items to edit would go here. For MVP, we just allow adding a new one */}
            <View style={styles.editItemRow}>
              <TextInput
                style={styles.itemInput}
                value={newItemName}
                onChangeText={setNewItemName}
                placeholder="Your checklist item"
              />
              <TouchableOpacity style={styles.saveItemBtn}>
                <ThemedText style={styles.saveItemText}>Save</ThemedText>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addItemRowBtn}>
              <ThemedText style={styles.addItemRowText}>
                + Add new item
              </ThemedText>
            </TouchableOpacity>

            <View style={styles.divider} />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalBtnOutline}
                onPress={() => setEditModalVisible(false)}
              >
                <ThemedText style={styles.modalBtnOutlineText}>
                  Cancel
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtnSolid}
                onPress={handleSaveEdit}
              >
                <ThemedText style={styles.modalBtnSolidText}>Save</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Modal */}
      <Modal visible={addModalVisible} transparent animationType="slide">
        <View style={styles.bottomModalOverlay}>
          <View style={styles.bottomModalContent}>
            <View style={styles.modalDragHandle} />
            <View style={styles.bottomModalHeader}>
              <ThemedText style={styles.modalTitle}>
                Add New Checklist
              </ThemedText>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                <ThemedText style={styles.closeBtn}>✕</ThemedText>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              value={newGroupTitle}
              onChangeText={setNewGroupTitle}
              placeholder="Persiapan Melahirkan"
              placeholderTextColor="#ACA7AF"
            />

            <View style={styles.itemsSection}>
              {/* Active Item Input */}
              <View style={[styles.editItemRow, styles.activeItemRow]}>
                <TextInput
                  style={[styles.itemInput, styles.activeItemInput]}
                  value={newGroupItemName}
                  onChangeText={setNewGroupItemName}
                  placeholder="Your checklist item"
                  placeholderTextColor="#ACA7AF"
                  autoFocus
                />
                <TouchableOpacity style={styles.saveItemBtn}>
                  <ThemedText style={styles.saveItemText}>Save</ThemedText>
                </TouchableOpacity>
              </View>

              {/* Inactive Item Input */}
              <View style={styles.editItemRow}>
                <View style={styles.dragIcon}>
                  <View style={styles.dragLine} />
                  <View style={styles.dragLine} />
                </View>
                <TextInput
                  style={styles.itemInput}
                  placeholder="Your checklist item"
                  placeholderTextColor="#25182E"
                  editable={false}
                />
                <Image
                  source={require("@/assets/icons/edit.png")}
                  style={styles.editIconLine}
                />
              </View>

              <TouchableOpacity style={styles.addItemRowBtn}>
                <ThemedText style={styles.addItemRowText}>
                  + Add new item
                </ThemedText>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalBtnOutline}
                onPress={() => setAddModalVisible(false)}
              >
                <ThemedText style={styles.modalBtnOutlineText}>
                  Cancel
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtnSolid, styles.modalBtnDisabled]}
                onPress={handleAddNewGroup}
                disabled={!newGroupTitle}
              >
                <ThemedText
                  style={[
                    styles.modalBtnSolidText,
                    styles.modalBtnDisabledText,
                  ]}
                >
                  Add
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Purple background for top
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  backBtn: {
    marginRight: Spacing.three,
  },
  backIcon: {
    fontSize: 24,
    color: "#000",
  },
  headerTitle: {
    fontFamily: "SatoshiBold",
    fontSize: 18,
    color: "#000",
  },
  tabsContainer: {
    flexDirection: "row",
    marginTop: Spacing.two,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.three,
    backgroundColor: "transparent",
    borderTopLeftRadius: Spacing.three,
    borderTopRightRadius: Spacing.three,
  },
  activeTab: {
    backgroundColor: "#D4B1EF", // Make it match the content background perfectly
  },
  tabIconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#F4EEF8",
  },
  tabIcon: {
    width: 22,
    height: 17,
    // Removed marginRight as it's now on the container
  },
  tabText: {
    fontFamily: "SatoshiMedium",
    color: "#ACA7AF", // light purple text for inactive
  },
  activeTabText: {
    color: "#FFFFFF", // white text for active tab as per design
    fontFamily: "SatoshiBold",
  },
  content: {
    flex: 1,
    backgroundColor: "#D4B1EF", // Unified Light purple bg so it blends with active tab
  },
  contentContainer: {
    padding: Spacing.four,
    paddingBottom: Spacing.six * 2,
  },
  banner: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: Spacing.two,
    marginBottom: Spacing.four,
    alignItems: "stretch", // Ensures the icon container fills the height
    overflow: "hidden", // Ensures the rounded corners apply to children
  },
  bannerIconContainer: {
    backgroundColor: "#FFE6D5", // The peach/orange color behind the icon
    paddingHorizontal: Spacing.three,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerIcon: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
  bannerText: {
    flex: 1,
    fontFamily: "SatoshiMedium",
    color: "#8A7A9A",
    fontSize: 14,
    fontWeight: "700",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    lineHeight: 20,
    marginVertical: 4, // To give a little extra vertical breathing room like the image
  },
  addNewChecklistBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: Spacing.four,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
  addNewChecklistText: {
    fontFamily: "SatoshiBold",
    color: "#9B7BB5",
    fontSize: 16,
  },
  addNewChecklistPlus: {
    fontFamily: "SatoshiBold",
    color: "#9B7BB5",
    fontSize: 24,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFF",
    width: "85%",
    padding: Spacing.four,
    borderRadius: Spacing.three,
  },
  modalTitle: {
    fontFamily: "SatoshiBold",
    fontSize: 18,
    marginBottom: Spacing.two,
    color: "#25182E",
  },
  modalMessage: {
    fontFamily: "SatoshiRegular",
    color: "#666",
    marginBottom: Spacing.five,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBtnOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#9B7BB5",
    borderRadius: Spacing.two,
    paddingVertical: Spacing.three,
    alignItems: "center",
    marginRight: Spacing.two,
  },
  modalBtnOutlineText: {
    color: "#9B7BB5",
    fontFamily: "SatoshiBold",
  },
  modalBtnSolid: {
    flex: 1,
    backgroundColor: "#9B7BB5",
    borderRadius: Spacing.two,
    paddingVertical: Spacing.three,
    alignItems: "center",
    marginLeft: Spacing.two,
  },
  modalBtnSolidText: {
    color: "#FFF",
    fontFamily: "SatoshiBold",
  },

  // Bottom Modal
  bottomModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  bottomModalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: Spacing.four,
    borderTopRightRadius: Spacing.four,
    padding: Spacing.four,
  },
  bottomModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.four,
  },
  closeBtn: {
    fontSize: 24,
    color: "#000",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    fontFamily: "SatoshiBold",
    fontSize: 18,
    paddingVertical: Spacing.two,
    marginBottom: Spacing.four,
    color: "#25182E",
  },
  itemsSection: {
    marginBottom: Spacing.two,
  },
  editItemRow: {
    flexDirection: "row",
    backgroundColor: "#F7F4F9",
    borderRadius: Spacing.two,
    padding: Spacing.two,
    alignItems: "center",
    marginBottom: Spacing.three,
  },
  activeItemRow: {
    backgroundColor: "#FAF5FE", // Slight purple tint for the active one
    borderWidth: 1,
    borderColor: "#EBE1F5",
  },
  itemInput: {
    flex: 1,
    fontFamily: "SatoshiMedium",
    fontSize: 14,
    color: "#25182E",
  },
  activeItemInput: {
    color: "#25182E",
  },
  dragIcon: {
    marginRight: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 14,
  },
  dragLine: {
    width: 2,
    height: 12,
    backgroundColor: "#ACA7AF",
    marginHorizontal: 1,
    borderRadius: 1,
  },
  editIconLine: {
    width: 16,
    height: 16,
    tintColor: "#ACA7AF",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginBottom: Spacing.four,
  },
  modalBtnDisabled: {
    backgroundColor: "#EBE1F5",
  },
  modalBtnDisabledText: {
    color: "#FFFFFF",
  },
  modalDragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: Spacing.four,
  },
  saveItemBtn: {
    backgroundColor: "#A775C8",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 16,
    paddingLeft: 16,
    gap: 10,
    // minWidth: 64,
    width: 64,
    height: 28,
    // paddingHorizontal: Spacing.three,
    // paddingVertical: Spacing.one,
    borderRadius: 14,
  },
  saveItemText: {
    color: "#FFF",
    fontSize: 12,
    fontFamily: "SatoshiMedium",
    fontWeight: "700",
    lineHeight: 18,
    textAlign: "center",
    verticalAlign: "middle",
  },
  addItemRowBtn: {
    alignItems: "center",
    // paddingVertical: Spacing.three,
    // marginBottom: Spacing.four,
  },
  addItemRowText: {
    color: "#9B7BB5",
    fontFamily: "SatoshiBold",
  },
});
