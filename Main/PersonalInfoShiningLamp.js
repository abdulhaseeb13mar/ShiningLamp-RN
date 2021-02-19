/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../OurResuables/WrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Measurements} from '../OurResuables/Measurement';
import {colors} from '../OurResuables/frequentColors';
import {Button} from 'react-native-elements';
import UseHeader from '../OurResuables/MyHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {isFormValid} from '../OurResuables/validation';
import NavigationRef from '../OurResuables/RefNavigation';
import {UserAction} from '../OurReduxStore/OurActions';
import Toast from 'react-native-root-toast';

const ConfirmOrder = (props) => {
  const [firstName, setFirstName] = useState('');
  const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameErrMsg, setLastNameErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');
  const [address, setAddress] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const ConfirmTakenEasy = () => {
    const formValidResponse = isFormValid(
      firstName,
      lastName,
      email,
      phone,
      address,
    );
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      CallApi();
      UserAction({
        firstName: firstName,
        phone: phone,
        email: email,
        lastName: lastName,
        address: address,
      });
    }
  };

  const ShowToast = (msg) => {
    Toast.show(msg, {
      backgroundColor: colors.secondary,
      textColor: colors.primary,
      opacity: 1,
      position: -60,
      duration: Toast.durations.SHORT,
      onHidden: () => NavigationRef.Push('OurHome'),
    });
  };

  const CallApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://reactnativeapps.herokuapp.com/customers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            phonenumber: phone,
            email: email,
            appname: 'Shining Light',
            address: address,
          }),
        },
      );
      const response = await res.json();
      setLoading(false);
      response.status
        ? ShowToast('Your Order has been recieved')
        : ShowToast('Some error occurred');
    } catch (error) {
      console.log(error);
    }
  };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrMsg(errMsg);
      setLastNameErrMsg('');
      setAddressErrMsg('');
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
    } else if (errCategory === 'firstname') {
      setFirstNameErrMsg(errMsg);
      setPhoneErrMsg('');
      setEmailErrMsg('');
      setLastNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'lastname') {
      setPhoneErrMsg('');
      setEmailErrMsg('');
      setLastNameErrMsg(errMsg);
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'phone') {
      setPhoneErrMsg(errMsg);
      setFirstNameErrMsg('');
      setAddressErrMsg('');
      setLastNameErrMsg('');
      setEmailErrMsg('');
    } else if (errCategory === 'address') {
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg(errMsg);
      setLastNameErrMsg('');
      setEmailErrMsg('');
    }
  };

  const changeLastName = (t) => setLastName(t);
  const changeAddress = (t) => setAddress(t);
  const changeEmail = (t) => setEmail(t);
  const goBack = () => NavigationRef.GoBack();
  const changeFirstName = (t) => setFirstName(t);
  const changePhone = (t) => setPhone(t);

  return (
    <WrapperScreen style={{backgroundColor: colors.primary}}>
      <UseHeader
        leftIcon={Ionicons}
        leftIconName="chevron-back"
        leftIconAction={goBack}
        Title="Contact Information"
        titleStyle={{fontSize: Measurements.width * 0.06, color: 'white'}}
        leftIconColor="white"
      />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.summaryOverlay}>
          <View style={styles.EP_2}>
            <ImageBackground
              source={props.OurProduct.images}
              style={styles.EP_3}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.EP_4}>{props.OurProduct.productName}</Text>
          <View style={styles.sm1}>
            <View style={styles.sm2}>
              <Text>Total:</Text>
              <Text style={{fontWeight: 'bold'}}>
                ${props.OurProduct.price}
              </Text>
            </View>
            <View style={styles.sm3}>
              <Text style={styles.sm4}>Payment Mode:</Text>
              <Text style={styles.sm4}>Payment on delivery</Text>
            </View>
          </View>
        </View>
        <View style={styles.PersonalInfoWrapper}>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: firstNameErrMsg ? 'white' : colors.primary,
                backgroundColor: firstNameErrMsg ? 'red' : colors.primary,
              }}>
              FIRST NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="user"
                size={Measurements.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="First Name"
                style={styles.Input}
                onChangeText={changeFirstName}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: lastNameErrMsg ? 'white' : colors.primary,
                backgroundColor: lastNameErrMsg ? 'red' : colors.primary,
              }}>
              LAST NAME <Text> {lastNameErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="user"
                size={Measurements.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Last Name"
                style={styles.Input}
                onChangeText={changeLastName}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: emailErrMsg ? 'white' : colors.primary,
                backgroundColor: emailErrMsg ? 'red' : colors.primary,
              }}>
              EMAIL<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="mail"
                size={Measurements.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Email"
                style={styles.Input}
                onChangeText={changeEmail}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: phoneErrMsg ? 'white' : colors.primary,
                backgroundColor: phoneErrMsg ? 'red' : colors.primary,
              }}>
              PHONE<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="phone"
                size={Measurements.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Phone Number"
                keyboardType="number-pad"
                style={styles.Input}
                onChangeText={changePhone}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: addressErrMsg ? 'white' : colors.primary,
                backgroundColor: addressErrMsg ? 'red' : colors.primary,
              }}>
              ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <Feather
                name="map-pin"
                size={Measurements.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Address"
                style={styles.Input}
                onChangeText={changeAddress}
              />
            </View>
          </View>
        </View>
        <View style={styles.ConfirmButtonWrapper}>
          <Button
            title="CONFIRM ORDER"
            raised
            buttonStyle={styles.confirmButton}
            titleStyle={{color: colors.primary, fontWeight: 'bold'}}
            containerStyle={styles.confirmButtonContainer}
            onPress={ConfirmTakenEasy}
            loading={loading}
            loadingProps={{color: colors.primary}}
          />
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    OurProduct: state.OurCrntPrdtReducer,
  };
};

export default connect(mapStateToProps, {UserAction})(React.memo(ConfirmOrder));

const styles = StyleSheet.create({
  EP_4: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    marginVertical: Measurements.height * 0.01,
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
  sm4: {fontSize: Measurements.width * 0.03, fontWeight: 'bold'},
  sm3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sm2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sm1: {
    width: '75%',
    backgroundColor: 'white',
    borderRadius: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    padding: Measurements.width * 0.04,
  },
  summaryOverlay: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Measurements.height * 0.02,
  },

  confirmButtonContainer: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmButton: {
    backgroundColor: 'white',
    padding: Measurements.height * 0.018,
  },
  ConfirmButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Measurements.width * 0.035,
    marginBottom: Measurements.height * 0.02,
  },
  Input: {
    width: Measurements.width * 0.81,
    height: Measurements.height * 0.065,
  },
  inputIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: Measurements.width * 0.09,
    color: colors.primary,
  },
  personalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: Measurements.width * 0.02,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.lightGrey2,
  },
  personalInfoHeadingName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 6,
    textAlign: 'center',
    borderRadius: 50,
  },
  singlePersonalInfoWrapper: {
    marginVertical: 10,
  },
  PersonalInfoWrapper: {
    marginHorizontal: Measurements.width * 0.035,
  },
  container: {flex: 1},
});
