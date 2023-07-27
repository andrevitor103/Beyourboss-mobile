import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { LogBox } from 'react-native';

import Routes from './src/routes';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Routes/>
  );
}
