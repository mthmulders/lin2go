import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  attempt: {
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  attemptLetter: {
    fontSize: 18,
    height: 40,
    justifyContent: 'space-between',
    textAlign: 'center',
    width: 40
  },
  attemptLetterOnOtherLocation: {
    backgroundColor: 'yellow',
    fontSize: 18,
    height: 40,
    justifyContent: 'space-between',
    overflow: 'hidden',
    textAlign: 'center',
    width: 40
  },
  attemptLetterOnRightLocation: {
    backgroundColor: 'red',
    fontSize: 18,
    height: 40,
    justifyContent: 'space-between',
    textAlign: 'center',
    width: 40
  },
  attempts: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonLabel: {
    fontSize: 18,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  endGame: {
    marginTop: 40,
  },
  guess: {
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  letterInput: {
    height: 60,
    textAlign: 'center',
    width: 40
  },
  logo: {
     marginBottom: 40,
  }
});
