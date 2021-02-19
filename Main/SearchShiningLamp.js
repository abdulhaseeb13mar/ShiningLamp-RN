/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import WrapperScreen from '../OurResuables/WrapperScreen';
import {Measurements} from '../OurResuables/Measurement';
import NavigationRef from '../OurResuables/RefNavigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SearchBar from '../OurResuables/searchingBar';
import Data from '../OurDummyData';
import {NewArrivals} from './OurHome';
import {connect} from 'react-redux';
import {
  OursetCurrentProductAction,
  OurremoveFavAction,
  OursetFavAction,
} from '../OurReduxStore/OurActions';
import UseHeader from '../OurResuables/MyHeader';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.productName.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        No Lamp Found...
      </Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const OurGoToSingleProduct = (item) => {
    props.OursetCurrentProductAction(item);
    NavigationRef.Navigate('OurSingleProduct');
  };

  const CardRender = (Arr) => {
    return Arr.map((item) => (
      <NewArrivals
        key={item.id}
        item={{...item}}
        OurGoToSingleProduct={OurGoToSingleProduct}
        OurFavs={props.ourFavs}
        OurRemoveFavAct={(i) => props.OurremoveFavAction(i)}
        OurSetFavAct={(i) => props.OursetFavAction(i)}
      />
    ));
  };
  const OurGoBack = () => NavigationRef.GoBack();

  const changeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={AntDesign}
        Title="All Lamps"
        leftIconName="arrowleft"
        leftIconAction={OurGoBack}
      />
      <View style={styles.SearchBarWrapper}>
        <SearchBar changeSearchText={changeSearchText} />
      </View>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={{marginTop: Measurements.height * 0.03}}>
          {searchText !== ''
            ? RenderSearchedResult()
            : CardRender(Data.product)}
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  ourFavs: state.OurToggleFav,
});

export default connect(mapStateToProps, {
  OursetCurrentProductAction,
  OurremoveFavAction,
  OursetFavAction,
})(Search);

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: Measurements.width * 0.03,
    paddingVertical: Measurements.height * 0.018,
  },
  TilesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  SearchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Measurements.height * 0.003,
  },
  container: {flex: 1},
});
