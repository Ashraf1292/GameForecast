// Settings.js
import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SettingItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  padding-vertical: 10px;
`;

const SettingLabel = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const SettingValue = styled.Text`
  font-size: 18px;
`;

const Settings = () => {
  return (
    <Container>
      <Title>Settings</Title>
      <SettingItem>
        <SettingLabel>Notification</SettingLabel>
        <SettingValue>Enabled</SettingValue>
      </SettingItem>
      <SettingItem>
        <SettingLabel>Dark Mode</SettingLabel>
        <SettingValue>Enabled</SettingValue>
      </SettingItem>
      <SettingItem>
        <SettingLabel>Language</SettingLabel>
        <SettingValue>English (UK)</SettingValue>
      </SettingItem>
    </Container>
  );
};

export default Settings;
