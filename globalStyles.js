import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import colors from './assets/colors/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const glStyles = StyleSheet.create({
  // 광고
  adver: {
    height: 80,
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  adverText: {
    color: colors.fontWh,
    fontSize: 14,
    textAlign: "right"
  },

  // flexbox 설정
  flexContainer: { flex: 1 },
  flexCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  // 글자설정
  titleBox: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  titleText: {
    fontSize: SCREEN_WIDTH > 500 ? 20 : 16,
    color: colors.fontWh,
  },
  basicText: {
    color: colors.fontWh,
    fontSize: 14
  },

  // 버튼 설정
  btnBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 4,
  },
  mdBtn: {
    marginTop: 30,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: colors.fontWh,
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnBlue: {
    backgroundColor: colors.lightBlue,
  },

  // 메인 화면 슬라이드
  slideList: {
    marginBottom: 20,
    // backgroundColor: '#000',
  },
  slideItems: {
    marginTop: 10,
    // width: SCREEN_WIDTH,
    justifyContent: "center",
  },
  slideImgBox: {
    width: SCREEN_WIDTH * 0.43,
    height: SCREEN_WIDTH * 0.43,
    alignItems: "center",
  },
  slideImg: {
    width: '100%',
    height: "100%",
  },

  // 카드 리스트
  cardList: {
    width: SCREEN_WIDTH,
  },
  cardItems: {
    borderRadius: 45,
    width: 180,
    height: 180,
    marginBottom: 9,
    backgroundColor: "#333",
  },
  cardLabel: {
    paddingTop: 5,
    paddingRight: 5,
    textAlign: "right",
    color: colors.fontWh,
  },
  cardInfo: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 3,
  },
  cardIcon: {
    color: colors.fontWh,
  },

  // 기본 리스트 스타일
  basicList: {
    width: SCREEN_WIDTH,
  },
  basicItem: {
    paddingHorizontal: 20,
    height: 180,
    marginBottom: 9,
  },
  image: {
    width: 50,
    height: 50,
  },
  basicItemInfo: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 3,
  },



});