import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";

export default function HomeScreen() {
  const router = useRouter();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    // If no checklist type is selected, show the bottom sheet
  }, []);

  const handleSelectChecklist = (type: "new_moms" | "hospital_bag") => {
    bottomSheetModalRef.current?.dismiss();
    router.push("/checklist");
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText style={styles.greeting}>Hi, Moms!</ThemedText>

        <TouchableOpacity
          style={styles.openChecklistBtn}
          onPress={() => {
            console.log("selectedChecklistType");

            bottomSheetModalRef.current?.present();
          }}
        >
          <ThemedText style={styles.openChecklistBtnText}>
            Select Checklist
          </ThemedText>
        </TouchableOpacity>
      </SafeAreaView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={["40%"]}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
        handleIndicatorStyle={{ backgroundColor: "#E0E0E0", width: 40 }}
        backgroundStyle={{ borderRadius: 24 }}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          <View style={styles.bsHeader}>
            <ThemedText style={styles.bsTitle}>Select Checklist</ThemedText>
            <TouchableOpacity
              onPress={() => bottomSheetModalRef.current?.dismiss()}
            >
              <ThemedText style={styles.closeBtn}>✕</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.banner}>
            <ThemedText style={styles.bannerText}>
              Yuk, siapkan checklist untuk mempermudah persiapan kelahiran si
              Kecil!
            </ThemedText>
          </View>

          <TouchableOpacity
            style={styles.checklistOption}
            onPress={() => handleSelectChecklist("new_moms")}
          >
            <View style={styles.optionIconContainer}>
              <Image
                source={require("@/assets/icons/label_mom.png")}
                style={styles.optionIcon}
              />
            </View>
            <ThemedText style={styles.optionText}>
              New Moms Checklist
            </ThemedText>
            <Image
              source={require("@/assets/icons/next.png")}
              style={styles.nextIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checklistOption}
            onPress={() => handleSelectChecklist("hospital_bag")}
          >
            <View style={styles.optionIconContainer}>
              <Image
                source={require("@/assets/icons/label_bag.png")}
                style={styles.optionIcon}
              />
            </View>
            <ThemedText style={styles.optionText}>
              Hospital Bag Checklist
            </ThemedText>
            <Image
              source={require("@/assets/icons/next.png")}
              style={styles.nextIcon}
            />
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0E5",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
  },
  headerTitle: {
    fontFamily: "SatoshiBold",
    fontSize: 20,
    marginBottom: Spacing.four,
  },
  greeting: {
    fontFamily: "SatoshiBlack",
    fontSize: 28,
    textAlign: "center",
    marginTop: Spacing.six,
    color: "#A775C8",
  },
  openChecklistBtn: {
    backgroundColor: "#9B7BB5",
    padding: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: "center",
    marginTop: Spacing.six,
  },
  openChecklistBtnText: {
    color: "#FFF",
    fontFamily: "SatoshiBold",
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
  },
  bsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.four,
  },
  bsTitle: {
    fontFamily: "SatoshiBold",
    fontSize: 18,
    color: "#25182E",
  },
  closeBtn: {
    fontSize: 20,
    color: "#000",
  },
  banner: {
    backgroundColor: "#FFF2E8",
    padding: Spacing.three,
    borderRadius: Spacing.two,
    marginBottom: Spacing.four,
  },
  bannerText: {
    fontFamily: "SatoshiMedium",
    color: "#A775C8",
    textAlign: "center",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "700",
    gap: 12,
  },
  checklistOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBE1F5",
    padding: Spacing.three,
    borderRadius: Spacing.three,
    marginBottom: Spacing.three,
  },
  optionIconContainer: {
    marginRight: Spacing.three,
    backgroundColor: "#FFE6D5",
  },
  optionIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  optionText: {
    fontFamily: "SatoshiBold",
    color: "#4A3B5C",
    flex: 1,
    fontSize: 15,
  },
  nextIcon: {
    width: 20,
    height: 20,
    tintColor: "#9B7BB5",
  },
});
