import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import colors from './assets/colors/colors';
import { block } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// const fontSize = {
//   xlg: SCREEN_WIDTH > 500 ? 26 : 24,
//   lg: SCREEN_WIDTH > 500 ? 24 : 22,
//   md: SCREEN_WIDTH > 500 ? 20 : 16,
//   sm: SCREEN_WIDTH > 500 ? 14 : 13,
//   xsm: SCREEN_WIDTH > 500 ? 13 : 12,
// };

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

  // 패딩 설정
  pdHrzn15: {
    paddingHorizontal: 15,
  },
  pdR10: { paddingRight: 10, },

  // flexbox 설정
  flexContainer: { flex: 1 },
  flexCenter: {
    justifyContent: "center",
    alignItems: "center"
  },
  flexRow: {
    flexDirection: "row",
  },
  flexRowBtwn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexRowStrt: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  flexRowEven: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  flexRowEvenCntr: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  // 글자설정
  pageTit: {
    fontWeight: "bold",
    fontSize: 22,
    color: colors.fontWh,
  },
  titleBox: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  titleBoxIcon: {
    paddingLeft: 20,
    paddingBottom: 20,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 16,
    color: colors.fontWh,
  },
  basicText: {
    fontSize: 14,
    color: colors.fontWh,
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
    width: SCREEN_WIDTH * 1,
    height: SCREEN_WIDTH * 0.43,
    alignItems: "center",
    flexDirection: "row",
  },
  slideImgBox2: {
    width: SCREEN_WIDTH * 1,
    height: SCREEN_WIDTH * 0.43,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  slideImg: {
    width: '100%',
    height: "100%",
  },
  slideImg2: {
    width: '100%',
    height: "100%",
    opacity: 0.6,
    position: 'absolute',
    borderRadius: 45,
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
    paddingTop: 15,
    paddingHorizontal: 15
  },
  basicItem: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addPartLine: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: colors.fontWh
  },
  basicItemImg: {
    width: 52,
    height: 52,
  },
  basicItemInfo: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 3,
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  basicInfoTit: {
    fontSize: 16,
    color: colors.fontWh,
    fontWeight: 'bold',
    paddingBottom: 6,
  },
  basicInfoDttm: {
    color: colors.fontWh,
    fontSize: 13,
  },
  basicInfoCntn: {
    width: "100%",
    color: colors.fontWh,
    fontSize: 14
  },

  // 마진 view 스타일
  justMarginLeft: {
    marginLeft: "3%",
  },
  // flexDirection: 'row', view 스타일
  justFlexDirectionRow: {
    marginLeft: "3%",
    flexDirection: 'row',
  },


});

