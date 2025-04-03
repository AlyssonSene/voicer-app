import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

import Voice, { SpeechResultsEvent } from "@react-native-voice/voice";

export default function App() {
  const [search, setSearch] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { height } = Dimensions.get("window");

  function onSpeechResults({ value }: SpeechResultsEvent) {
    const text = value ?? [];
    setSearch(text.join().replace(",", " "));
  }

  async function handleListening() {
    try {
      if (isListening) {
        await Voice.stop();
        setIsListening(false);
      } else {
        setSearch("");
        await Voice.start("pt-BR");
        setIsListening(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      <View style={styles.header}>
        <Text style={[styles.input, { height: height * 0.7 }]}>
          {isListening ? "Gravando..." : search}
        </Text>
      </View>
      <Pressable style={styles.button} onPress={handleListening}>
        <Feather name={isListening ? "pause" : "mic"} color="#FFF" size={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 52,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    borderRadius: 12,
    backgroundColor: "#D9E6EB",
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: "#0096FF",
    justifyContent: "center",
    alignItems: "center",
  },
});
