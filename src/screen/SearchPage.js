import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import DropDownPicker from 'react-native-dropdown-picker';
import { SelectList } from 'react-native-dropdown-select-list';

const SearchPage = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = React.useState("");
  const [selected1, setSelected1] = React.useState("");
  
  const data = [
      {key:'1', value:'Action'},
      {key:'2', value:'Adventure'},
      {key:'3', value:'Sports'},
      {key:'4', value:'RPG'},
      {key:'5', value:'FPS'},
      {key:'6', value:'Simulation'},
  ]
  const data1 = [
    {key:'1', value:'Xbox'},
    {key:'2', value:'Playstation'},
    {key:'3', value:'Nintendo'},
    {key:'4', value:'Sega'},
    {key:'5', value:'PC'},
    {key:'6', value:'Arcade'},
    {key:'7', value:'GameBoy'},
]


  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 8 }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ color: 'black', fontSize: 24, fontFamily: 'OCR A Extended Regular' }}>
            Search
          </Text>
        </View>
        <TouchableOpacity>
          {/* Removed the MagnifyingGlassIcon here */}
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 20 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: 'black', borderRadius:30, paddingHorizontal: 10, paddingVertical: 8 }}
          placeholder="Search..."
          onChangeText={(text) => {}}
        />
        <TouchableOpacity style={{ marginLeft: 8 }}>
          <MagnifyingGlassIcon size={24} strokeWidth={2} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 16, marginTop: 20 , width: 330, borderRadius:30 }}>
        
        {/* Additional content for search results can be added here */}
        <Text>Select Genre</Text>
        <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
    />
    
        {/* Additional content for search results can be added here */}
        <View style={{flexDirection:'column', gap: 2 }}>
  <View />
  <View />
  <View />
  <View />
  <View />
  <View />
</View>
<Text>Select Platform</Text>
      <SelectList 
        setSelected={(val) => setSelected1(val)} 
        data={data1} 
        save="value"
      />
      </View>
    </View>
  );
};

export default SearchPage;
