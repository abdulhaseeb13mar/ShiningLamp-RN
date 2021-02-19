/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Measurements} from '../OurResuables/Measurement';
import WrapperScreen from '../OurResuables/WrapperScreen';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../OurResuables/frequentColors';
import NavigationRef from '../OurResuables/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {OurremoveFavAction, OursetFavAction} from '../OurReduxStore/OurActions';

function SingleProduct(props) {
  useEffect(() => {
    checkIfFav();
  }, []);

  const [fav, setFav] = useState(false);
  const OurProduct = props.OurProduct;

  const checkIfFav = () => {
    for (let i = 0; i < props.OurFavs.length; i++) {
      if (props.OurFavs[i].id === OurProduct.id) {
        setFav(true);
        break;
      }
    }
  };

  const OurGoToInfo = () => NavigationRef.Navigate('PersonalInfoShiningLamp');

  const toggleFav = () => {
    fav
      ? props.OurremoveFavAction(OurProduct.id)
      : props.OursetFavAction(OurProduct);
    setFav(!fav);
  };

  const OurGoBack = () => NavigationRef.Navigate('OurHome');

  return (
    <WrapperScreen style={{backgroundColor: colors.primary}}>
      <View style={styles.singleProduct_SL20}>
        <View style={styles.singleProduct_SL19}>
          <ImageBackground
            resizeMode="contain"
            source={OurProduct.images}
            style={styles.singleProduct_SL18}>
            <TouchableOpacity
              style={styles.singleProduct_SL17}
              onPress={toggleFav}>
              <Ionicons
                name={fav ? 'ios-heart' : 'ios-heart-outline'}
                color={'white'}
                size={Measurements.width * 0.08}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.singleProduct_SL16}>
          <View style={styles.singleProduct_SL15}>
            <View style={styles.singleProduct_SL14} />
            <View style={styles.singleProduct_SL13}>
              <Text style={styles.singleProduct_SL12}>
                {OurProduct.productName}
              </Text>
              <Text style={styles.singleProduct_SL11}>${OurProduct.price}</Text>
            </View>
            <View style={styles.singleProduct_SL10}>
              {[OurProduct.consumption, OurProduct.watt, OurProduct.height].map(
                (i, index) => (
                  <View key={index} style={styles.singleProduct_SL9}>
                    <FontAwesome5
                      name={
                        index === 0
                          ? 'plug'
                          : index === 1
                          ? 'lightbulb'
                          : 'ruler-vertical'
                      }
                      size={Measurements.width * 0.05}
                    />
                    <Text style={styles.singleProduct_SL8}>{i}</Text>
                    <Text style={styles.singleProduct_SL7}>
                      {index === 0 ? 'KW' : index === 1 ? 'watt' : 'meters'}
                    </Text>
                  </View>
                ),
              )}
            </View>
          </View>
          <ScrollView
            contentContainerStyle={styles.singleProduct_SL6}
            style={styles.singleProduct_SL5}>
            <Text style={styles.singleProduct_SL4}>
              {OurProduct.discription}
            </Text>
          </ScrollView>
          <View style={styles.singleProduct_SL3}>
            <TouchableOpacity
              onPress={OurGoBack}
              style={styles.singleProduct_SL2}>
              <Entypo name="cross" color={colors.darkGray} size={20} />
            </TouchableOpacity>
            <Button
              title="Buy Now"
              onPress={OurGoToInfo}
              buttonStyle={styles.singleProduct_SL1}
              containerStyle={{width: '78%'}}
            />
          </View>
        </View>
      </View>
    </WrapperScreen>
  );
}

const styles = StyleSheet.create({
  singleProduct_SL20: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  singleProduct_SL19: {
    width: Measurements.width,
    height: Measurements.height * 0.4,
    paddingHorizontal: Measurements.width * 0.05,
  },
  singleProduct_SL18: {width: '100%', height: '100%'},
  singleProduct_SL17: {zIndex: 3, marginTop: Measurements.height * 0.02},
  singleProduct_SL16: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: Measurements.height * 0.52,
    width: Measurements.width,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Measurements.height * 0.01,
    paddingHorizontal: Measurements.width * 0.035,
    paddingBottom: Measurements.height * 0.02,
  },
  singleProduct_SL15: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: Measurements.height * 0.01,
  },
  singleProduct_SL14: {
    width: Measurements.width * 0.25,
    height: Measurements.width * 0.0095,
    backgroundColor: colors.darkGray,
    opacity: 0.5,
  },
  singleProduct_SL13: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: Measurements.height * 0.02,
  },
  singleProduct_SL12: {
    width: '75%',
    fontWeight: 'bold',
    fontSize: Measurements.width * 0.05,
    color: colors.darkGray,
  },
  singleProduct_SL11: {
    fontWeight: 'bold',
    fontSize: Measurements.width * 0.058,
  },
  singleProduct_SL10: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: Measurements.height * 0.02,
  },
  singleProduct_SL9: {
    width: Measurements.width * 0.2,
    paddingVertical: Measurements.height * 0.005,
    borderRadius: 10,
    backgroundColor: colors.lightGrey2,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  singleProduct_SL8: {
    fontWeight: 'bold',
    marginVertical: Measurements.height * 0.002,
    fontSize: Measurements.width * 0.04,
  },
  singleProduct_SL7: {
    fontSize: Measurements.width * 0.03,
    color: colors.lightGrey3,
    fontWeight: 'bold',
  },
  singleProduct_SL6: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleProduct_SL5: {
    width: '100%',
    maxHeight: Measurements.height * 0.15,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 10,
    paddingHorizontal: Measurements.width * 0.015,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  singleProduct_SL4: {
    fontSize: Measurements.width * 0.037,
    lineHeight: Measurements.height * 0.027,
    color: colors.lightGrey3,
    fontWeight: 'bold',
  },
  singleProduct_SL3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: Measurements.height * 0.008,
  },
  singleProduct_SL2: {
    borderColor: colors.lightBackground2,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '20%',
    height: Measurements.height * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleProduct_SL1: {
    height: Measurements.height * 0.07,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    OurProduct: state.OurCrntPrdtReducer,
    OurFavs: state.OurToggleFav,
  };
};

export default connect(mapStateToProps, {
  OursetFavAction,
  OurremoveFavAction,
})(React.memo(SingleProduct));
