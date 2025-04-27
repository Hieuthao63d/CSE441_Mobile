/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import styles from './style';
import type { PropsWithChildren } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Employee from './component/Employee';
import Sum from './component/Sumfirst_last';
import Minimum from './component/Minimum';
import Hailstone from './component/Hailstone';
const App = () => {
  return (
    <ScrollView style={styles.container}>
      <Employee fullName='Phanthao' age='22' occupation='Student' />
      <Sum/>
      <Minimum/>
      <Hailstone/>
    </ScrollView>
  );
};

export default App;