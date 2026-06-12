// 報表
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export default function RecordScreen() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>報表</Text>
      <Text style={styles.subtitle}>查看營養攝取報告</Text>
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