/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {
  OurremoveFavAction,
  OursetFavAction,
  OursetCurrentProductAction,
} from '../OurReduxStore/OurActions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UseHeader from '../OurResuables/MyHeader';
import WrapperScreen from '../OurResuables/WrapperScreen';
import NavigationRef from '../OurResuables/RefNavigation';
import {NewArrivals} from './OurHome';
import {Measurements} from '../OurResuables/Measurement';
const OurFavourites = (props) => {
  const OurGoToSingleProduct = (item) => {
    props.OursetCurrentProductAction(item);
    NavigationRef.Navigate('OurSingleProduct');
  };

  const OurGoBack = () => NavigationRef.Navigate('OurHome');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <ScrollView bounces={false}>
        <UseHeader
          leftIcon={AntDesign}
          leftIconName="arrowleft"
          leftIconAction={OurGoBack}
          Title="Favourites"
        />
        <View style={styles.fav_SL1}>
          {props.ourFavs.length > 0 ? (
            props.ourFavs.map((item, index) => {
              return (
                <NewArrivals
                  key={item.id}
                  item={{...item}}
                  OurFavs={props.ourFavs}
                  OurRemoveFavAct={(i) => props.OurremoveFavAction(i)}
                  OurSetFavAct={(i) => props.OursetFavAction(i)}
                  OurGoToSingleProduct={OurGoToSingleProduct}
                />
              );
            })
          ) : (
            <Text style={styles.fav_SL2}>No Favourites...</Text>
          )}
        </View>
      </ScrollView>
    </WrapperScreen>
  );
};

const styles = StyleSheet.create({
  fav_SL2: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  fav_SL1: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingHorizontal: Measurements.width * 0.027,
    paddingTop: Measurements.height * 0.025,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
});

const mapStateToProps = (state) => {
  return {
    ourFavs: state.OurToggleFav,
  };
};

export default connect(mapStateToProps, {
  OursetFavAction,
  OursetCurrentProductAction,
  OurremoveFavAction,
})(OurFavourites);
