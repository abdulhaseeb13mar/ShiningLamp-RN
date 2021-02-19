/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import WrapperScreen from '../OurResuables/WrapperScreen';
import {colors} from '../OurResuables/frequentColors';
import {Measurements} from '../OurResuables/Measurement';
import Data from '../OurDummyData';
import Loop from '../OurResuables/looping';
import RefNavigation from '../OurResuables/RefNavigation';
import {connect} from 'react-redux';
import {
  OursetCurrentProductAction,
  OurremoveFavAction,
  OursetFavAction,
} from '../OurReduxStore/OurActions';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

function OurHome(props) {
  useEffect(() => {
    fill_Popular_Arrival();
  }, []);
  const [mostPopular, setMostPopular] = useState([]);
  const [newArrival, setNewArrival] = useState([]);

  const fill_Popular_Arrival = () => {
    let popularLamps = [];
    let newArrivals = [];
    let len = Data.product.length;
    for (let i = 0; i < 10; i++) {
      popularLamps.push(Data.product[i]);
    }
    for (let x = 0; x < 10; x++) {
      newArrivals.push(Data.product[len - 1]);
      len--;
    }
    setMostPopular(popularLamps);
    setNewArrival(newArrivals);
  };

  const OurGotoFavourites = () =>
    RefNavigation.NavigateAndReset('OurFavourites');
  const OurGotoSearch = () => RefNavigation.Navigate('SearchShiningLamp');
  const OurGoToSingleProduct = (item) => {
    props.OursetCurrentProductAction(item);
    RefNavigation.NavigateAndReset('OurSingleProduct');
  };
  return (
    <WrapperScreen style={{backgroundColor: colors.lightGrey4}}>
      <ScrollView bounces={false} style={{flex: 1}}>
        <View style={styles.OurHome_SL9}>
          <Text style={styles.OurHome_SL8}>
            Pendant <Text style={styles.OurHome_SL7}>lamp</Text>
          </Text>
          <TouchableOpacity
            onPress={OurGotoFavourites}
            style={styles.OurHome_SL6}>
            <Feather
              name="heart"
              color="black"
              size={Measurements.width * 0.055}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.OurHome_SL5}>
          <Text
            style={{fontWeight: 'bold', fontSize: Measurements.width * 0.045}}>
            Most Popular
          </Text>
          <TouchableOpacity onPress={OurGotoSearch}>
            <Text style={styles.OurHome_SL4}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listingWrapper}>
          <Loop
            data={mostPopular}
            renderItem={({item}) => (
              <MostPopular
                item={item}
                OurGoToSingleProduct={OurGoToSingleProduct}
                OurFavs={props.ourFavs}
                OurRemoveFavAct={(i) => props.OurremoveFavAction(i)}
                OurSetFavAct={(i) => props.OursetFavAction(i)}
              />
            )}
          />
        </View>
        <View style={styles.OurHome_SL3}>
          <Text style={styles.OurHome_SL2}>New Arrival</Text>
          <TouchableOpacity onPress={OurGotoSearch}>
            <Text style={styles.OurHome_SL1}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: Measurements.height * 0.015}}>
          {newArrival.length > 0 &&
            newArrival.map((item, index) => {
              return (
                <NewArrivals
                  key={index}
                  item={item}
                  OurGoToSingleProduct={OurGoToSingleProduct}
                  OurFavs={props.ourFavs}
                  OurRemoveFavAct={(i) => props.OurremoveFavAction(i)}
                  OurSetFavAct={(i) => props.OursetFavAction(i)}
                />
              );
            })}
        </View>
      </ScrollView>
    </WrapperScreen>
  );
}

const MostPopular = ({
  item,
  OurGoToSingleProduct,
  OurFavs,
  OurRemoveFavAct,
  OurSetFavAct,
}) => {
  useEffect(() => {
    checkIfFav();
  }, []);

  const [fav, setFav] = useState(false);

  const checkIfFav = () => {
    for (let i = 0; i < OurFavs.length; i++) {
      if (OurFavs[i].id === item.id) {
        setFav(true);
        break;
      }
    }
  };
  const toggleFav = () => {
    fav ? OurRemoveFavAct(item.id) : OurSetFavAct(item);
    setFav(!fav);
  };
  return (
    <TouchableOpacity
      onPress={() => OurGoToSingleProduct(item)}
      style={styles.ExploreTileWrapper}>
      <View style={styles.EP_1}>
        <View style={styles.EP_2}>
          <ImageBackground
            source={item.images}
            style={styles.EP_3}
            resizeMode="contain">
            <TouchableOpacity style={styles.EP_7} onPress={toggleFav}>
              <Ionicons
                name="ios-heart"
                color={fav ? colors.primary : 'white'}
                size={Measurements.width * 0.055}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
      <View style={styles.EP_4}>
        <Text style={styles.EP_5}>{item.productName}</Text>
        <Text style={styles.EP_6}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const NewArrivals = ({
  item,
  OurGoToSingleProduct,
  OurFavs,
  OurRemoveFavAct,
  OurSetFavAct,
}) => {
  useEffect(() => {
    checkIfFav();
  }, []);

  const [fav, setFav] = useState(false);

  const checkIfFav = () => {
    for (let i = 0; i < OurFavs.length; i++) {
      if (OurFavs[i].id === item.id) {
        setFav(true);
        break;
      }
    }
  };
  const toggleFav = () => {
    fav ? OurRemoveFavAct(item.id) : OurSetFavAct(item);
    setFav(!fav);
  };
  return (
    <View style={styles.home_TE8}>
      <TouchableOpacity
        onPress={() => OurGoToSingleProduct(item)}
        style={styles.home_TE9}>
        <View style={styles.home_TE7}>
          <Text style={styles.home_TE6}>New</Text>
        </View>
        <View style={styles.home_TE14}>
          <ImageBackground
            source={item.images}
            style={styles.home_TE15}
            resizeMode="contain">
            <TouchableOpacity style={styles.EP_7_2} onPress={toggleFav}>
              <Ionicons
                name="ios-heart"
                color={fav ? colors.primary : 'white'}
                size={Measurements.width * 0.045}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.home_TE10}>
          <Text style={styles.home_TE11}>{item.productName}</Text>
          <Text style={styles.home_TE13}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  OurHome_SL9: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Measurements.width * 0.05,
    paddingVertical: Measurements.height * 0.02,
  },
  OurHome_SL8: {
    fontSize: Measurements.width * 0.08,
    color: 'rgba(0,0,0,0.8)',
  },
  OurHome_SL7: {
    color: 'rgba(0,0,0,1)',
    fontSize: Measurements.width * 0.08,
    fontWeight: 'bold',
  },
  OurHome_SL6: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: Measurements.width * 0.015,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  OurHome_SL5: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Measurements.width * 0.05,
    marginTop: Measurements.height * 0.01,
    marginBottom: Measurements.height * 0.008,
  },
  OurHome_SL4: {
    color: colors.lightGrey3,
    fontSize: Measurements.width * 0.039,
    fontWeight: 'bold',
    borderBottomColor: colors.lightGrey3,
    borderBottomWidth: 2,
  },
  OurHome_SL3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Measurements.width * 0.05,
    marginTop: Measurements.height * 0.01,
    marginBottom: Measurements.height * 0.008,
  },
  OurHome_SL2: {fontWeight: 'bold', fontSize: Measurements.width * 0.045},
  OurHome_SL1: {
    color: colors.lightGrey3,
    fontSize: Measurements.width * 0.039,
    fontWeight: 'bold',
    borderBottomColor: colors.lightGrey3,
    borderBottomWidth: 2,
  },
  home_TE6: {fontWeight: 'bold', color: 'rgba(255,91,92, 0.8)'},
  home_TE7: {
    position: 'absolute',
    bottom: Measurements.height * 0.02,
    right: -1,
    paddingHorizontal: Measurements.width * 0.04,
    paddingVertical: Measurements.height * 0.003,
    backgroundColor: 'rgba(255,91,92, 0.3)',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  home_TE15: {
    width: '100%',
    height: '100%',
  },
  home_TE14: {
    width: '34%',
    height: Measurements.height * 0.15,
    borderRadius: 20,
    paddingBottom: Measurements.height * 0.015,
    backgroundColor: `rgba(${colors.rgb_Primary}, 0.45)`,
  },
  home_TE13: {
    width: '100%',
    fontSize: Measurements.width * 0.04,
    color: 'black',
    fontWeight: 'bold',
  },
  home_TE11: {
    fontSize: Measurements.width * 0.045,
    textAlignVertical: 'center',
    color: colors.lightGrey3,
    fontWeight: 'bold',
  },
  home_TE10: {
    width: '64%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  home_TE9: {
    borderWidth: 1,
    width: Measurements.width * 0.9,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    elevation: 4,
    borderColor: colors.lightBackground,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  home_TE8: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Measurements.height * 0.02,
  },
  EP_7: {
    zIndex: 3,
    marginTop: Measurements.height * 0.012,
  },
  EP_7_2: {
    zIndex: 3,
    marginTop: Measurements.height * 0.012,
    marginLeft: Measurements.width * 0.02,
  },
  EP_6: {
    fontSize: Measurements.width * 0.05,
    color: 'black',
    fontWeight: 'bold',
  },
  EP_5: {
    width: '100%',
    fontSize: Measurements.width * 0.038,
    fontWeight: 'bold',
    color: colors.lightGrey3,
  },
  EP_4: {
    width: Measurements.width * 0.38,
    marginTop: Measurements.height * 0.015,
  },
  EP_3: {
    overflow: 'hidden',
    width: Measurements.width * 0.42,
    height: '100%',
  },
  EP_2: {
    backgroundColor: `rgba(${colors.rgb_Primary}, 0.45)`,
    paddingBottom: Measurements.height * 0.045,
    paddingHorizontal: Measurements.width * 0.02,
    height: Measurements.width * 0.55,
    borderRadius: 15,
  },
  EP_1: {
    backgroundColor: colors.lightGrey4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderRadius: 20,
  },
  ExploreTileWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 20,
    marginVertical: Measurements.height * 0.008,
    marginHorizontal: Measurements.width * 0.05,
  },
});

const mapStateToProps = (state) => {
  return {
    ourFavs: state.OurToggleFav,
  };
};

export default connect(mapStateToProps, {
  OursetCurrentProductAction,
  OurremoveFavAction,
  OursetFavAction,
})(OurHome);
