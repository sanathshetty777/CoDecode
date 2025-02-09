import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
    letterSpacing: 2,
  },
  formContainer: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: "white",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    color: "white",
  },
  button: {
    backgroundColor: "#ff5f6d",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchText: {
    marginTop: 15,
    color: "white",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    padding: 10,
    borderRadius: 5,
  },
});

export default styles;