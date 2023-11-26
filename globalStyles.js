import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import colors from './assets/colors/colors';
import { block } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const {height:SCREEN_HEIGHT} = Dimensions.get('window');
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
  // 배경색 일괄적용 안되는 경우   
  bgDarkGray: {
    backgroundColor: "#333"
  },
  showGroup: {//개발용
    backgroundColor: "#333",
  },
  // 패딩 설정
  pd5: {
    padding: 5
  },
  pd15: {
    padding: 15
  },
  pdHrzn15: {
    paddingHorizontal: 15,
  },
  pdHrzn20: {
    paddingHorizontal: 20,
  },
  pdR10: { paddingRight: 10, },
  pdVrtcl10: {
    paddingVertical: 10
  },
  pdVrtcl15: {
    paddingVertical: 15
  },
  pdVrtcl20: {
    paddingVertical: 20
  },
  // 마진 설정
  mgTop5: {
    marginTop: 5
  },
  mgR20: {
    marginRight: 20
  },
  mgBt5: {
    marginBottom: 5
  },
  mgbt10: {
    marginBottom: 10
  },
  mgbt20: {
    marginBottom: 20
  },
  mgVrtcl20: {
    marginVertical: 20
  },
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
  flexRowBtwnCntr: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexRowStrt: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  flexRowStrtCntr: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  flexRowEnd: {
    flexDirection: "row",
    justifyContent: "flex-end",
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
  //grow 설정
  flexGrow1: { flexGrow: 1, },
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
  txtAlignCntr: { textAlign: "center" },
  // 버튼 설정
  btnBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  mdBtn: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  smBtn: {
    width: "30%",
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  xsmBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  basicItemImgLg: {
    width: 84,
    height: 84,
  },
  basicItemImgSm: {
    width: "20%",
    height: "100%",
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

  // 프랜즈 모달
  modalView: {
    margin: 20,
    height: SCREEN_HEIGHT-100,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    top: 0,
    bottom: 100,
    left: 20,
    right: 20,
  },
  modalImgView: {
    height: "30%",
  },
  modalImg: {
    borderRadius: 45,
    height: "100%",
    width: "100%",
  },
});

