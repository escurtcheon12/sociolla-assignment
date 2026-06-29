import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import {
  ChecklistGroup,
  TabType,
  useChecklistStore,
} from "@/store/useChecklistStore";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
  tab: TabType;
  group: ChecklistGroup;
  onEdit: () => void;
  onDelete: () => void;
}

export function ChecklistGroupItem({ tab, group, onEdit, onDelete }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const { toggleItem, hideGroup } = useChecklistStore();

  const totalItems = group.items.length;
  const doneItems = group.items.filter((i) => i.checked).length;
  const progressPercent = totalItems === 0 ? 0 : (doneItems / totalItems) * 100;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => {
          if (showActions) setShowActions(false);
          else setExpanded(!expanded);
        }}
      >
        <View style={styles.headerTop}>
          <ThemedText style={styles.title}>
            {group.title} ({doneItems}/{totalItems})
          </ThemedText>
          <TouchableOpacity onPress={() => setShowActions(!showActions)}>
            <ThemedText style={styles.dots}>•••</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarBg}>
          <View
            style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
          />
        </View>
      </TouchableOpacity>

      {/* Action Row */}
      {showActions && (
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={onDelete}>
            <Image
              source={require("@/assets/icons/trash.png")}
              style={styles.actionIcon}
            />
            <ThemedText style={styles.actionText}>Delete</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => hideGroup(tab, group.id)}
          >
            <Image
              source={require("@/assets/icons/visibility.png")}
              style={styles.actionIcon}
            />
            <ThemedText style={styles.actionText}>Hide</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={onEdit}>
            <Image
              source={require("@/assets/icons/edit_white.png")}
              style={styles.actionIcon}
            />
            <ThemedText style={styles.actionText}>Edit</ThemedText>
          </TouchableOpacity>
        </View>
      )}

      {/* Expanded Items */}
      {expanded && !showActions && (
        <View style={styles.itemsContainer}>
          {group.items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemRow}
              onPress={() => toggleItem(tab, group.id, item.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  item.checked && styles.checkboxChecked,
                ]}
              />
              <View style={styles.itemTextContainer}>
                <ThemedText
                  style={[
                    styles.itemName,
                    item.checked && styles.itemTextChecked,
                  ]}
                >
                  {item.name}
                </ThemedText>
                {item.subtext && (
                  <ThemedText style={styles.itemSubtext}>
                    {item.subtext}
                  </ThemedText>
                )}
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.addItemBtn} onPress={onEdit}>
            <ThemedText style={styles.addItemText}>+ Add new item</ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFE6D5",
    borderRadius: Spacing.three,
    marginBottom: Spacing.three,
    overflow: "hidden",
  },
  header: {
    padding: Spacing.three,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.two,
  },
  title: {
    fontFamily: "SatoshiBold",
    fontSize: 16,
    color: "#4A3B5C",
  },
  dots: {
    color: "#9B7BB5",
    fontSize: 20,
    fontWeight: "bold",
  },
  progressBarBg: {
    height: 4,
    backgroundColor: "#FFBC8F",
    borderRadius: 2,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#E8A571",
    borderRadius: 2,
  },
  actionRow: {
    flexDirection: "row",
    backgroundColor: "#9B7BB5",
    justifyContent: "flex-end",
    padding: Spacing.three,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: Spacing.four,
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFF",
    marginRight: 4,
  },
  actionText: {
    color: "#FFF",
    fontFamily: "SatoshiMedium",
    fontSize: 14,
  },
  itemsContainer: {
    backgroundColor: "#FFF",
    borderBottomLeftRadius: Spacing.three,
    borderBottomRightRadius: Spacing.three,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#9B7BB5",
    marginRight: Spacing.three,
  },
  checkboxChecked: {
    backgroundColor: "#9B7BB5",
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    fontFamily: "SatoshiBold",
    fontSize: 14,
    color: "#000",
  },
  itemTextChecked: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  itemSubtext: {
    fontFamily: "SatoshiRegular",
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  addItemBtn: {
    backgroundColor: "#B598CB",
    margin: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: "center",
  },
  addItemText: {
    color: "#FFF",
    fontFamily: "SatoshiBold",
    fontSize: 14,
  },
});
