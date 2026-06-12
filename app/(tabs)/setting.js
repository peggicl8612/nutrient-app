// 設定
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export default function RecordScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>設定</Text>
      <Text style={styles.subtitle}>調整應用程式設定</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 24,
    color: colors.textTitle,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.textSecondary,
  },
});